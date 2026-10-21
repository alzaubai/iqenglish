import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocs,
  increment,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, CONFIG_DOC_PATH } from './client';
import { StudentSession, PlatformConfig } from './types';
import { STORAGE_KEYS } from '../../constants/storageKeys';

export const STUDENTS_CACHE_KEY = 'iq_students_cache';

export const getStoredStudentSession = (): StudentSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredStudentSession = (session: StudentSession | null) => {
  if (session) {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEYS.STUDENT_PROFILE);
  }
};

// Direct Firestore verification for student codes (guarantees student codes never fail)
export const verifyStudentCodeOnline = async (code: string): Promise<boolean> => {
  if (!code) return false;
  const clean = code.trim().toUpperCase();
  try {
    const cfgSnap = await getDoc(doc(db, CONFIG_DOC_PATH));
    if (cfgSnap.exists()) {
      const cfg = cfgSnap.data() as PlatformConfig;
      if (cfg.revokedCodes && cfg.revokedCodes.some((c) => c.toUpperCase() === clean)) {
        return false;
      }
      if (cfg.masterCode && cfg.masterCode.toUpperCase() === clean) return true;
      if (cfg.allowedCodes && cfg.allowedCodes.some((c) => c.toUpperCase() === clean)) return true;
      if (cfg.singleUseCodes && cfg.singleUseCodes.some((c) => c.code.toUpperCase() === clean)) return true;
      if (cfg.externalSubscriptions && cfg.externalSubscriptions.some((c) => c.code.toUpperCase() === clean)) return true;
    }
    // Also check if any existing student in Firestore is registered with this code
    const stdCol = collection(db, 'students');
    const stdSnaps = await getDocs(stdCol);
    for (const d of stdSnaps.docs) {
      const dCode = d.data().code;
      if (dCode && dCode.trim().toUpperCase() === clean) {
        return true;
      }
    }
  } catch (err) {
    console.warn('Online code verify error:', err);
  }
  return false;
};

// Look up existing student in Firebase to prevent duplicates upon re-entry
export const findExistingStudent = async (
  fullName: string,
  section: string
): Promise<StudentSession | null> => {
  try {
    const colRef = collection(db, 'students');
    const snapshot = await getDocs(colRef);
    const cleanTargetName = fullName.trim().toLowerCase();
    const cleanTargetSection = section.trim();

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as Omit<StudentSession, 'id'>;
      if (
        data.fullName &&
        data.fullName.trim().toLowerCase() === cleanTargetName &&
        data.section &&
        data.section.trim() === cleanTargetSection
      ) {
        return {
          id: docSnap.id,
          ...data,
        };
      }
    }
    return null;
  } catch (err) {
    console.warn('Error looking up existing student in Firebase:', err);
    return null;
  }
};

export const registerStudentInFirebase = async (
  student: StudentSession
): Promise<void> => {
  try {
    const studentDoc = doc(db, 'students', student.id);
    await setDoc(
      studentDoc,
      {
        ...student,
        visitCount: increment(1),
        lastSeenAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Failed to register student in Firebase:', err);
  }
};

// Map Arabic name to 4 sections (أ، ب، ج، د) based on alphabetical order of the first letter
export const mapArabicNameToSection = (fullName: string): 'أ' | 'ب' | 'ج' | 'د' => {
  if (!fullName || typeof fullName !== 'string') return 'أ';
  const clean = fullName.trim();
  if (!clean) return 'أ';

  let firstChar = clean.charAt(0);

  // If student entered "ال" at the start, check the character after "ال" (e.g. "المهدي" -> "م")
  if (clean.startsWith('ال') && clean.length > 2) {
    firstChar = clean.charAt(2);
  }

  // Group أ: أ, إ, آ, ا, ء, ب, ت, ث, ج, ح, خ
  const groupA = ['أ', 'إ', 'آ', 'ا', 'ء', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ'];
  // Group ب: د, ذ, ر, ز, س, ش
  const groupB = ['د', 'ذ', 'ر', 'ز', 'س', 'ش'];
  // Group ج: ص, ض, ط, ظ, ع, غ, ف
  const groupC = ['ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف'];
  // Group د: ق, ك, ل, م, ن, ه, هـ, و, ؤ, ى, ئ, ي
  const groupD = ['ق', 'ك', 'ل', 'م', 'ن', 'ه', 'هـ', 'و', 'ؤ', 'ى', 'ئ', 'ي'];

  if (groupA.includes(firstChar)) return 'أ';
  if (groupB.includes(firstChar)) return 'ب';
  if (groupC.includes(firstChar)) return 'ج';
  if (groupD.includes(firstChar)) return 'د';

  return 'أ';
};

export const getCachedStudents = (): StudentSession[] => {
  try {
    const raw = localStorage.getItem(STUDENTS_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Migrate any students and submissions in Section H to sections (أ، ب، ج، د) automatically
export const migrateSectionHStudents = async (): Promise<{
  migratedStudents: number;
  migratedSubmissions: number;
}> => {
  let migratedStudents = 0;
  let migratedSubmissions = 0;
  try {
    // 1. Migrate in students collection
    const studentsCol = collection(db, 'students');
    const stdSnaps = await getDocs(studentsCol);
    for (const d of stdSnaps.docs) {
      const data = d.data();
      const sec = (data.section || '').trim();
      if (sec === 'هـ' || sec === 'ه' || sec === 'هاء') {
        const newSec = mapArabicNameToSection(data.fullName || '');
        await updateDoc(doc(db, 'students', d.id), {
          section: newSec,
        });
        migratedStudents++;
      }
    }

    // 2. Migrate in submissions collection
    const subCol = collection(db, 'submissions');
    const subSnaps = await getDocs(subCol);
    for (const d of subSnaps.docs) {
      const data = d.data();
      const sec = (data.studentSection || '').trim();
      if (sec === 'هـ' || sec === 'ه' || sec === 'هاء') {
        const newSec = mapArabicNameToSection(data.studentName || '');
        await updateDoc(doc(db, 'submissions', d.id), {
          studentSection: newSec,
        });
        migratedSubmissions++;
      }
    }

    // 3. Migrate student session in localStorage if current student was in Section H
    const storedSession = getStoredStudentSession();
    if (
      storedSession &&
      (storedSession.section === 'هـ' ||
        storedSession.section === 'ه' ||
        storedSession.section === 'هاء')
    ) {
      const newSec = mapArabicNameToSection(storedSession.fullName);
      setStoredStudentSession({
        ...storedSession,
        section: newSec,
      });
    }

    // 4. Migrate local cached students
    const cachedStudents = getCachedStudents();
    let cacheUpdated = false;
    const updatedCache = cachedStudents.map((s) => {
      if (s.section === 'هـ' || s.section === 'ه' || s.section === 'هاء') {
        cacheUpdated = true;
        return { ...s, section: mapArabicNameToSection(s.fullName) };
      }
      return s;
    });
    if (cacheUpdated) {
      try {
        localStorage.setItem(STUDENTS_CACHE_KEY, JSON.stringify(updatedCache));
      } catch {}
    }
  } catch (err) {
    console.warn('Migration of Section H error:', err);
  }
  return { migratedStudents, migratedSubmissions };
};

// Record periodic student heartbeat to track actual learning time
export const recordStudentHeartbeat = async (
  studentId: string,
  durationMinutes: number = 1
): Promise<void> => {
  if (!studentId) return;
  try {
    const studentDoc = doc(db, 'students', studentId);
    await updateDoc(studentDoc, {
      totalTimeSpentMinutes: increment(durationMinutes),
      lastSeenAt: serverTimestamp(),
    });
  } catch (err) {
    // Silently catch if document is missing
  }
};

export const deleteStudentFromFirebase = async (
  studentId: string,
  studentCode?: string,
  studentName?: string
): Promise<void> => {
  try {
    // 1. Delete student document from Firestore
    const studentDoc = doc(db, 'students', studentId);
    await deleteDoc(studentDoc);

    // 2. Add a per-student ban record (not a global code ban!)
    if (studentCode) {
      const cleanCode = studentCode.trim().toUpperCase();
      const configDoc = doc(db, CONFIG_DOC_PATH);
      const snap = await getDoc(configDoc);
      if (snap.exists()) {
        const currentData = snap.data() as PlatformConfig;
        const currentRevoked = currentData.revokedStudents || [];
        // Only add if not already in the list
        const alreadyRevoked = currentRevoked.some(
          (r) => r.studentId === studentId
        );
        if (!alreadyRevoked) {
          await updateDoc(configDoc, {
            revokedStudents: [
              ...currentRevoked,
              { studentId, code: cleanCode, name: studentName || '' },
            ],
          });
        }
      }
    }
  } catch (err) {
    console.error('Failed to delete student from Firebase:', err);
    throw err;
  }
};

export const listenToSingleStudent = (
  studentId: string,
  onDeleted: () => void
): Unsubscribe => {
  if (!studentId) return () => {};
  const studentDoc = doc(db, 'students', studentId);
  // Track whether the document was ever confirmed to exist during this session
  let hasExistedInSession = false;

  return onSnapshot(
    studentDoc,
    (snap) => {
      // 1. If document exists, confirm its presence in this active session
      if (snap.exists()) {
        hasExistedInSession = true;
        return;
      }

      // 2. Only log out if it previously existed and is now deleted with no pending local writes
      if (!snap.metadata.hasPendingWrites) {
        onDeleted();
      }
    },
    (err) => {
      // Do not log out on transient network errors
      console.warn('Error listening to student session doc:', err);
    }
  );
};

export const listenToAllStudents = (
  callback: (students: StudentSession[]) => void
): Unsubscribe => {
  const colRef = collection(db, 'students');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const results: StudentSession[] = [];
      snapshot.forEach((docSnap) => {
        results.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<StudentSession, 'id'>),
        });
      });
      try {
        localStorage.setItem(STUDENTS_CACHE_KEY, JSON.stringify(results));
      } catch (e) {
        console.warn('Failed to cache students:', e);
      }
      callback(results);
    },
    (err) => {
      console.warn('Error listening to all students, using cached fallback:', err);
      callback(getCachedStudents());
    }
  );
};
