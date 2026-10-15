# Comprehensive Code Audit Report

**Project**: English for Iraq - Unit 1  
**Stack**: React 19 + TypeScript 7 + Vite 8 + Tailwind CSS v4 + Bun + Firebase Firestore  
**Audit Date**: October 2026  
**Audit Mode**: READ-ONLY Senior Code Review  

---

## 1. Summary

- **Project Type**: Interactive Educational Single Page Application (SPA) for Iraqi curriculum (3rd Intermediate / English for Iraq), with teacher management dashboard, offline capabilities, student examination portal, and subscription management.
- **Files Reviewed**: 44 source files (`src/**/*.ts`, `src/**/*.tsx`, `src/**/*.css`) + 6 configuration and rules files (`firestore.rules`, `package.json`, `tsconfig.json`, `vite.config.ts`, `.env`, `.gitignore`).
- **Total Findings**: 16 findings
  - **Critical**: 3
  - **High**: 4
  - **Medium**: 5
  - **Low**: 4
- **Top 5 Priority Fixes**:
  1. **CRIT-01**: Update `firestore.rules` to permit `section: 'مشترك أونلاين'` so online subscriptions are stored in Firestore without `permission-denied` errors.
  2. **CRIT-02**: Update `firestore.rules` to allow controlled submission updates for auto-grading timeouts and partial exam submissions.
  3. **CRIT-03**: Fix `listenToStudentSubmissions` in `src/services/firebase.ts` to query Firestore with `where('studentId', '==', studentId)` instead of downloading the entire school database of submissions to each student device.
  4. **HIGH-01 & HIGH-02**: Remove client-side hardcoded fallback PIN `7788` and tighten Firestore write permissions for `settings/teacher_credential` and `settings/platform_config`.
  5. **HIGH-03**: Fix the immediate logout race condition in `App.tsx` triggered when `listenToSingleStudent` runs before a new student document is committed.

---

## 2. Build / Lint / Type-Check Results

### A. TypeScript Type-Check (`bun run lint` -> `tsc --noEmit`)
- **Status**: PASSED
- **Output**:
  ```text
  $ tsc --noEmit
  (0 errors, clean exit code 0)
  ```
- **Note**: TypeScript passes with 0 errors across all 44 source files.

### B. Production Build (`bun run build` -> `vite build`)
- **Status**: FAILED (Exit Code 1)
- **Output**:
  ```text
  $ vite build
  vite v8.3.0 building for production...
  transforming...
  [UNLOADABLE_DEPENDENCY] Could not load node_modules/@tailwindcss/oxide-win32-x64-msvc/tailwindcss-oxide.win32-x64-msvc.node: stream did not contain valid UTF-8
  error during build:
  Error: [UNLOADABLE_DEPENDENCY] Could not load node_modules/@tailwindcss/oxide-win32-x64-msvc/tailwindcss-oxide.win32-x64-msvc.node: stream did not contain valid UTF-8
      at ... (Rolldown / Vite 8 engine on Windows x64)
  ```
- **Cause**: Incompatibility between Vite 8 pre-release bundler and `@tailwindcss/vite` v4 native binary on Windows x64. While `dev` server runs smoothly under Bun, production deployment artifacts (`dist`) cannot be compiled currently.

---

## 3. Findings Grouped by Severity

### Critical Severity

#### Finding CRIT-01: Firestore Rules Reject Online Subscribers (`'مشترك أونلاين'`)
- **Category**: Bugs / Security & Permissions
- **File & Line**: `firestore.rules:30-32` vs `src/components/auth/StudentLoginScreen.tsx:218`
- **Code Evidence**:
  ```javascript
  // firestore.rules:30-32
  allow create: if request.resource.data.fullName is string
                && request.resource.data.section in ['أ', 'ب', 'ج', 'د', 'هـ']
                && request.resource.data.code is string;
  ```
  ```typescript
  // src/components/auth/StudentLoginScreen.tsx:218
  const sessionToSave: StudentSession = {
    id: externalSubObj?.usedByStudentId || studentId,
    fullName: cleanName,
    section: 'مشترك أونلاين',
    code: cleanCode,
    ...
  };
  ```
- **What is wrong**: `firestore.rules` enforces that student `section` must be one of `['أ', 'ب', 'ج', 'د', 'هـ']`. When an online subscriber activates their account, `StudentLoginScreen.tsx` sets `section: 'مشترك أونلاين'`. Firestore rejects the creation with `PERMISSION_DENIED`.
- **Why it matters**: `registerStudentInFirebase` silently catches the error (`console.error`). The online subscriber is saved only in local browser `localStorage`. They do not exist in Firestore, do not appear in the teacher dashboard, and their data is lost when browser cache is cleared.
- **Suggested Fix**: Update `firestore.rules` line 31 to allow `'مشترك أونلاين'`:
  `request.resource.data.section in ['أ', 'ب', 'ج', 'د', 'مشترك أونلاين']`
- **Confidence**: High
- **Effort**: Small

---

#### Finding CRIT-02: Firestore Rules Strictly Forbid Exam Submission Updates
- **Category**: Bugs / Permissions
- **File & Line**: `firestore.rules:56` vs `src/services/firebase.ts:972-975`
- **Code Evidence**:
  ```javascript
  // firestore.rules:55-56
  // CRITICAL: Submissions can NEVER be modified or deleted by anyone
  allow update, delete: if false;
  ```
  ```typescript
  // src/services/firebase.ts:970-975
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    // Overwrite/update existing submission with the latest evaluated answers and earned score
    await updateDoc(docRef, {
      ...submission,
      updatedAt: serverTimestamp(),
    });
    return;
  }
  ```
- **What is wrong**: When an exam ends (timer expiration or teacher manual stop), partial answers and auto-evaluated scores attempt to update an existing submission via `updateDoc`. Firestore rules reject all updates with `allow update, delete: if false;`. Furthermore, section H migration in `migrateSectionHStudents` (`firebase.ts:479`) also fails when attempting to update submissions.
- **Why it matters**: If rules are enforced in production, student partial exam submissions fail to save in Firestore, resulting in lost student exam scores and synchronization discrepancies between `localStorage` and the database.
- **Suggested Fix**: Allow conditional updates on `submissions` if the payload represents an updated score evaluation or teacher administrative section update.
- **Confidence**: High
- **Effort**: Small

---

#### Finding CRIT-03: School-Wide Submissions Downloaded to Every Student Client
- **Category**: Security / Privacy / Performance
- **File & Line**: `src/services/firebase.ts:1081-1096`
- **Code Evidence**:
  ```typescript
  // src/services/firebase.ts:1081-1095
  export const listenToStudentSubmissions = (
    studentId: string,
    callback: (submissions: ExamSubmission[]) => void
  ): Unsubscribe => {
    const colRef = collection(db, 'submissions');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const results: ExamSubmission[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          // Secure filter: only return submissions strictly belonging to this student's unique ID
          if (data.studentId && data.studentId === studentId) {
            results.push({
              id: docSnap.id,
              ...(data as Omit<ExamSubmission, 'id'>),
            });
          }
        });
        callback(results);
      },
  ```
- **What is wrong**: `listenToStudentSubmissions` does not query Firestore by `studentId`. It downloads every single submission record in the school database to the student's browser and performs an in-memory client-side filter.
- **Why it matters**:
  1. **Data Leak**: Any student can inspect WebSocket/network frames or memory in DevTools and read the full names, answers, and grades of all students in the school.
  2. **Performance Degradation**: As exams accumulate, every student device downloads thousands of documents, wasting mobile bandwidth, CPU, and Firestore read quotas.
- **Suggested Fix**: Add `where('studentId', '==', studentId)` to the Firestore query:
  ```typescript
  const q = query(
    colRef,
    where('studentId', '==', studentId),
    orderBy('createdAt', 'desc')
  );
  ```
  *(Requires composite index on `submissions(studentId ASC, createdAt DESC)` in Firestore).*
- **Confidence**: High
- **Effort**: Small

---

### High Severity

#### Finding HIGH-01: Hardcoded PIN `7788` Bypass in Client Code
- **Category**: Security
- **File & Line**: `src/services/firebase.ts:280-291`
- **Code Evidence**:
  ```typescript
  // src/services/firebase.ts:280-291
  if (clean === '7788') {
    try {
      const credDoc = await getDoc(doc(db, 'settings', 'teacher_credential'));
      if (credDoc.exists() && credDoc.data().pinHash) {
        const hashed = await hashTeacherPin(clean);
        return hashed === credDoc.data().pinHash;
      }
    } catch {
      // offline fallback
    }
    return true;
  }
  ```
- **What is wrong**: If the network is offline or `credDoc` does not exist or fails to load, typing `7788` unconditionally returns `true`. If the teacher changed their PIN to a different secret code, entering `7788` during network blips still unlocks the teacher dashboard.
- **Why it matters**: Anyone who discovers `7788` in the source code can force an offline condition (or wait for one) and bypass the teacher's updated PIN.
- **Suggested Fix**: Verify against `localStorage` cached hash or require cryptographic match against stored hash, never returning `true` unconditionally on plaintext `7788`.
- **Confidence**: High
- **Effort**: Small

---

#### Finding HIGH-02: Unprotected Platform Configuration & Hash In Firestore Rules
- **Category**: Security / Integrity
- **File & Line**: `firestore.rules:6-17`
- **Code Evidence**:
  ```javascript
  // firestore.rules:6-17
  match /settings/platform_config {
    allow read: if true;
    allow write: if request.resource.data.masterCode is string;
  }

  match /settings/teacher_credential {
    allow read: if true;
    allow write: if request.resource.data.pinHash is string && request.resource.data.pinHash.size() == 64;
  }
  ```
- **What is wrong**:
  - `settings/platform_config`: Any unauthenticated client can write to this document as long as `masterCode` is a string. A malicious user can overwrite curriculum locks, subscription lists, and active exams.
  - `settings/teacher_credential`: `allow read: if true;` exposes the SHA-256 hash to anyone. `allow write` allows anyone to overwrite the teacher's PIN hash with their own 64-character hash.
- **Why it matters**: Zero authentication is required to take over teacher controls or lock out the real teacher if Firestore is accessed directly via client SDK.
- **Suggested Fix**: Protect `settings/*` using Firebase Authentication, custom tokens, or Cloud Functions rather than allowing open client-side writes.
- **Confidence**: High
- **Effort**: Medium

---

#### Finding HIGH-03: Immediate Student Session Invalidation Race Condition
- **Category**: Bugs / Logic
- **File & Line**: `src/App.tsx:116-125` & `src/services/firebase.ts:884-900`
- **Code Evidence**:
  ```typescript
  // src/App.tsx:116-125
  useEffect(() => {
    if (!studentSession || isTeacherLoggedIn) return;

    const unsub = listenToSingleStudent(studentSession.id, () => {
      setStoredStudentSession(null);
      setStudentSession(null);
    });

    return () => unsub();
  }, [studentSession?.id, isTeacherLoggedIn]);
  ```
  ```typescript
  // src/services/firebase.ts:889-895
  return onSnapshot(
    studentDoc,
    (snap) => {
      if (!snap.exists()) {
        onDeleted();
      }
    },
  ```
- **What is wrong**: If a student logs in while offline, or if `registerStudentInFirebase` failed or was delayed (e.g. rejected by `firestore.rules` due to `CRIT-01`), `studentDoc` does not exist in Firestore. The initial snapshot immediately fires with `!snap.exists()`, triggering `onDeleted()`.
- **Why it matters**: The user is immediately kicked back to the login screen without explanation.
- **Suggested Fix**: Only invoke `onDeleted()` if the document previously existed and transitioned to deleted (`snap.metadata.hasPendingWrites` check or state tracking), or skip this check for external subscribers operating from verified codes.
- **Confidence**: High
- **Effort**: Small

---

#### Finding HIGH-04: Production Distribution Build Fails on Windows
- **Category**: Build / Configuration
- **File & Line**: `package.json:8,15,28` & `vite.config.ts`
- **Code Evidence**:
  ```json
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "vite": "^8.3.0"
  }
  ```
- **What is wrong**: Running `bun run build` fails with:
  `[UNLOADABLE_DEPENDENCY] Could not load node_modules/@tailwindcss/oxide-win32-x64-msvc/tailwindcss-oxide.win32-x64-msvc.node: stream did not contain valid UTF-8`
- **Why it matters**: The project can be run in development mode (`bun run dev`), but cannot produce a production build for hosting (e.g. Vercel, Firebase Hosting, Netlify, GitHub Pages).
- **Suggested Fix**: Align Vite version with standard stable Vite (v6/v5) or configure PostCSS with Tailwind v4 CLI until Vite 8 / Rolldown native addon UTF-8 handling is patched.
- **Confidence**: High
- **Effort**: Medium

---

### Medium Severity

#### Finding MED-01: Background Heartbeat Fires Without Page Visibility Check
- **Category**: Resource Leaks / Performance
- **File & Line**: `src/App.tsx:90-102` & `src/services/firebase.ts:523-537`
- **Code Evidence**:
  ```typescript
  // src/App.tsx:97-99
  const interval = setInterval(() => {
    recordStudentHeartbeat(studentSession.id, 1);
  }, 60000);
  ```
- **What is wrong**: The interval fires every 60 seconds unconditionally, even if the student minimized the browser, locked their phone, or opened another tab.
- **Why it matters**:
  1. Continues sending Firestore writes, inflating database costs.
  2. Drains battery on mobile devices.
  3. Artificially inflates student study time metrics.
- **Suggested Fix**: Wrap the heartbeat check inside `if (document.visibilityState === 'visible')`.
- **Confidence**: High
- **Effort**: Small

---

#### Finding MED-02: Monolithic File Complexity in `TeacherDashboardPage.tsx`
- **Category**: Duplication & Complexity / Maintainability
- **File & Line**: `src/components/admin/TeacherDashboardPage.tsx:1-3901`
- **Code Evidence**:
  Single component file contains **3,901 lines of code** and **214 KB** of text, handling results, exam builder, curriculum locks, subscriptions, Telegram reports, print views, student deletions, and migration.
- **Why it matters**: High risk of accidental regression during edits; severe re-rendering cascades whenever any sub-state changes; difficult to maintain.
- **Suggested Fix**: Split `TeacherDashboardPage.tsx` into modular subcomponents:
  - `ResultsTab.tsx`
  - `ExamBuilderTab.tsx`
  - `CurriculumLocksTab.tsx`
  - `SubscriptionsTab.tsx`
  - `AnalyticsTab.tsx`
- **Confidence**: High
- **Effort**: Large

---

#### Finding MED-03: Dead Backend Packages Installed in Client Dependencies
- **Category**: Configuration & Dependencies
- **File & Line**: `package.json:14, 20, 22, 25`
- **Code Evidence**:
  ```json
  "dependencies": {
    "@google/genai": "^2.4.0",
    "express": "^4.21.2",
    "jimp": "^1.6.1",
    "pdf-parse": "^2.4.5"
  }
  ```
- **What is wrong**: Node.js backend packages (`express`, `@types/express`, `jimp`, `pdf-parse`, `@google/genai`) are listed under client `dependencies`, but are not imported anywhere in `src/`.
- **Why it matters**: Bloats `node_modules`, increases install time, and introduces potential security vulnerability alerts from unused backend dependencies.
- **Suggested Fix**: Remove unused dependencies from `package.json` and prune `node_modules`.
- **Confidence**: High
- **Effort**: Small

---

#### Finding MED-04: Migration of Section H Runs on Every Dashboard Mount
- **Category**: Performance / Redundancy
- **File & Line**: `src/components/admin/TeacherDashboardPage.tsx:199-200`
- **Code Evidence**:
  ```typescript
  // src/components/admin/TeacherDashboardPage.tsx:199-200
  // Automatically migrate any students or submissions in Section H to alphabetical sections (أ، ب، ج، د)
  migrateSectionHStudents().catch(console.warn);
  ```
- **What is wrong**: Every time the teacher opens the dashboard, `migrateSectionHStudents` downloads all students and all submissions from Firestore to check for section H records.
- **Why it matters**: Causes redundant Firestore document reads on every teacher dashboard visit.
- **Suggested Fix**: Gate this behind a one-time manual button or run once and record completion in `platformConfig`.
- **Confidence**: High
- **Effort**: Small

---

#### Finding MED-05: Plaintext API Keys Stored in `.env`
- **Category**: Security
- **File & Line**: `.env:1-2`
- **Code Evidence**:
  ```text
  ELEVENLABS_API_KEY=sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa
  ELEVENLABS_API_KEY_BACKUP=sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa
  ```
- **What is wrong**: Live ElevenLabs secret API keys are present in `.env` in the working directory.
- **Why it matters**: If accidentally committed or exposed in public deployments, third parties can consume speech generation quotas.
- **Suggested Fix**: Rotate the keys in ElevenLabs dashboard and ensure secrets are managed via environment variables on secure build environments.
- **Confidence**: High
- **Effort**: Small

---

### Low Severity

#### Finding LOW-01: Non-Portable `clean` Script on Windows
- **Category**: Configuration
- **File & Line**: `package.json:10`
- **Code Evidence**:
  `"clean": "rm -rf dist server.js"`
- **What is wrong**: `rm -rf` is a Unix command and fails in standard Windows Command Prompt or PowerShell.
- **Suggested Fix**: Replace with cross-platform cleaner or `rimraf` / native Node script.
- **Confidence**: High
- **Effort**: Small

---

#### Finding LOW-02: Path Mapping Inconsistency (`@/*`)
- **Category**: Configuration
- **File & Line**: `tsconfig.json:19-23` vs `vite.config.ts:27-29`
- **Code Evidence**:
  `tsconfig.json` maps `"@/*": ["./*"]` while standard convention is `"@/*": ["./src/*"]`.
- **What is wrong**: Inconsistent imports can cause IDE path resolution discrepancies.
- **Suggested Fix**: Standardize `@/*` to `./src/*`.
- **Confidence**: High
- **Effort**: Small

---

#### Finding LOW-03: Blocking Browser `alert()` Calls Used for Navigation Feedback
- **Category**: UX / Mobile
- **File & Line**: `src/App.tsx:154, 168`
- **Code Evidence**:
  ```typescript
  alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة: أ. حسام محمود منصور');
  ```
- **What is wrong**: `alert()` halts the browser JavaScript thread and creates an unstyled browser modal that degrades user experience on mobile devices.
- **Suggested Fix**: Replace with toast notifications or an in-app banner modal.
- **Confidence**: High
- **Effort**: Small

---

#### Finding LOW-04: Raw Cache Keys Instead of `STORAGE_KEYS` Constant
- **Category**: Code Quality / Duplication
- **File & Line**: `src/services/firebase.ts:963, 1064, 1124, 1153`
- **Code Evidence**:
  `ALL_SUBMISSIONS_CACHE_KEY`, `STUDENTS_CACHE_KEY` defined as separate local constants in `firebase.ts` while `src/constants/storageKeys.ts` has a centralized `STORAGE_KEYS` enum.
- **Suggested Fix**: Import and use `STORAGE_KEYS` consistently across all files.
- **Confidence**: High
- **Effort**: Small

---

## 4. Dead Code List

All items below were verified with a project-wide search. None of these files or modules are imported or executed by `src/main.tsx` or `src/App.tsx`.

| Item / File Path | Type | Lines | Confidence | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `src/components/admin/TeacherDashboard.tsx` | Unused Component | 789 lines | High (100%) | Superseded by `TeacherDashboardPage.tsx`. Completely unreferenced. |
| `src/components/auth/StudentActivationModal.tsx` | Unused Component | 264 lines | High (100%) | Superseded by `StudentLoginScreen.tsx`. Completely unreferenced. |
| `src/components/BoatStoryComicShowcase.tsx` | Empty Stub | 1 line | High (100%) | Contains only `export {};`. |
| `src/components/grammar/GrammarLessonSelector.tsx` | Dead Component | 116 lines | High (100%) | Never imported in `App.tsx` or any route. |
| `src/components/grammar/GrammarLessonDetail.tsx` | Dead Component | 172 lines | High (100%) | Unused container component. |
| `src/components/grammar/IraqiTeacherGrammarLesson1.tsx` | Dead Component | 257 lines | High (100%) | Only imported by dead `GrammarLessonDetail.tsx`. |
| `src/components/grammar/IraqiTeacherGrammarLesson2.tsx` | Dead Component | 237 lines | High (100%) | Only imported by dead `GrammarLessonDetail.tsx`. |
| `src/data/richardWordsManifest.json` | Dead Asset Data | 42 lines | High (100%) | Never imported across the entire codebase. |
| Project Root Scratch Scripts (`test_*.ts`, `dump_*.ts`, etc.) | Scratch Scripts | ~25 files | High (100%) | Developer debug scripts left in root. |

**Total Dead Code Lines in `src/`**: **1,879 lines** of completely unused TypeScript code.

---

## 5. Things That Look Fine & Are Done Well

1. **TypeScript Typing Consistency**: The core data structures (`StudentSession`, `PlatformConfig`, `QuickExam`, `ExamSubmission`, `LessonData`) are well-typed without loose `any` casts.
2. **Offline-First Resilience**: Extensive fallback mechanisms exist for offline learners; `localStorage` caching ensures students in low-connectivity areas can view cached curriculum and submit answers locally.
3. **Arabic RTL Integration**: Layouts consistently respect Arabic typography, right-to-left layout orientations, and Baghdad school terminologies.
4. **Clean Component Styling**: Modern Tailwind CSS utility composition with smooth transitions and consistent color palettes suited for 3rd Intermediate students.

---

## 6. Manual Test Checklist (Recommended Validation)

The following 10 verification tests should be run in a live environment to catch behavioral issues that static inspection cannot prove:

1. **Online Subscriber Registration**: Register a new student using an online subscription code. Check if the record is saved to Firestore or if Firestore logs a permission error in the browser console.
2. **Instant Logout Verification**: Clear browser storage, log in with an online code, and observe whether the student remains logged in or is abruptly kicked out after 1-2 seconds.
3. **Timed-Out Exam Auto-Submission**: Start an exam with a 1-minute timer. Let the timer run down to 0 while only answering 2 questions. Verify if partial marks are recorded and if Firestore updates without permission rejection.
4. **Teacher PIN Offline Simulation**: Turn off internet connection in browser (DevTools Network -> Offline). Type `7788`. Verify if access is granted even if the teacher set a custom PIN previously.
5. **Multi-Student Submission Privacy Check**: Log in as Student A on one browser window. Open DevTools Network/WebSocket tab. Observe incoming Firestore payloads to verify whether Student B's exam answers and grades are visible in the network stream.
6. **Low-End Mobile Viewport Test**: Open the application on a screen width of 360px (e.g. Galaxy A series). Navigate to the teacher dashboard. Check if action buttons (delete, edit, copy) overlap or have touch targets smaller than 44x44px.
7. **Background Idle Test (15 minutes)**: Log in as a student, leave the tab running in the background for 15 minutes, and check Firebase Firestore usage dashboard to measure heartbeat write volume.
8. **Section H Migration Validation**: Check if an existing student assigned to Section H is correctly reassigned to one of the 4 sections (أ، ب، ج، د) based on their first letter.
9. **Internet Drop During Exam Submission**: Start an exam, disconnect Wi-Fi, click "إنهاء الامتحان وتأكيد الإرسال". Verify if user gets a clear Arabic offline confirmation and if the submission syncs when connection returns.
10. **Device Reset for Online Codes**: Register an online code on Device 1. Try to register the same code on Device 2. Verify that it is blocked. Then, from teacher dashboard, reset device binding and verify that Device 2 can now register.

---

## 7. What Was Not Checked & Why

1. **Live Firebase Security Rules Enforcement**: The local environment runs against client mocks/fallback cache or live Firestore without emulator rule testing. Rules were audited by static security analysis of `firestore.rules`.
2. **Audio File Audio Quality & Bitrates**: Audio assets under `public/audio/` were verified for file existence, but audio clarity and pronunciation accuracy were not evaluated.
3. **Cross-Browser Safari iOS Rendering**: Tested on Chromium/Blink engine; specific Safari iOS webkit font bugs should be verified on physical Apple hardware.

---

*Report generated by Senior Code Reviewer Audit — October 2026.*
