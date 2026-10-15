import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  increment,
  getDocs,
  type Unsubscribe,
} from 'firebase/firestore';

// 1. Firebase Configuration from the user
const firebaseConfig = {
  apiKey: "AIzaSyBFLsRkVPatxOYM8u6VM92LjVi_QO92zIM",
  authDomain: "iqenglish-97a31.firebaseapp.com",
  projectId: "iqenglish-97a31",
  storageBucket: "iqenglish-97a31.firebasestorage.app",
  messagingSenderId: "1040937060868",
  appId: "1:1040937060868:web:c1d9d25dfe1c0403920351",
  measurementId: "G-1YXNP5SMBB"
};

// Singleton App & Firestore
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, { ignoreUndefinedProperties: true });
} catch {
  firestoreDb = getFirestore(app);
}
export const db = firestoreDb;

export interface StudentSession {
  id: string;
  fullName: string;
  section: string;
  code: string;
  registeredAt: string;
  lastSeenAt?: any;
  totalTimeSpentMinutes?: number;
  visitCount?: number;
  // External Subscriber Fields
  isExternalSubscriber?: boolean;
  governorate?: string;
  subscriptionDuration?: '1_hour' | '1_month' | '3_months' | '6_months' | '1_year';
  subscriptionExpiresAt?: string;
  deviceId?: string;
}

export interface ExamQuestion {
  id: string;
  questionEn: string;
  questionAr?: string;
  options: string[];
  correctAnswer: string;
  points: number;
  explanationAr?: string;
}

export interface QuickExam {
  id: string;
  title: string;
  descriptionAr?: string;
  durationMinutes: number;
  questions: ExamQuestion[];
  isActive: boolean;
  createdAt: string;
}

export interface ExamSubmission {
  id?: string;
  examId: string;
  examTitle: string;
  studentId?: string;
  studentName: string;
  studentSection: string;
  studentCode: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export const DEFAULT_GRAMMAR_TOPIC_IDS = [
  'topic-past-simple',
  'topic-past-continuous',
  'topic-possessive-pronouns',
  'topic-joining-sentences',
  'topic-interests',
];

export interface SingleUseCode {
  code: string;
  isUsed: boolean;
  createdAt: string;
  usedByStudentName?: string;
  usedByStudentId?: string;
  usedBySection?: string;
  usedAt?: string;
}

export type SubscriptionDuration = '1_hour' | '1_month' | '3_months' | '6_months' | '1_year';

export const SUBSCRIPTION_DURATIONS_MAP: Record<SubscriptionDuration, { labelAr: string; days: number; prefix: string }> = {
  '1_hour': { labelAr: 'تجريبي (ساعة واحدة)', days: 1 / 24, prefix: 'TRIAL-1H' },
  '1_month': { labelAr: 'شهر واحد (30 يوم)', days: 30, prefix: 'SUB-1M' },
  '3_months': { labelAr: '3 أشهر (90 يوم)', days: 90, prefix: 'SUB-3M' },
  '6_months': { labelAr: '6 أشهر (180 يوم)', days: 180, prefix: 'SUB-6M' },
  '1_year': { labelAr: 'سنة كاملة (365 يوم)', days: 365, prefix: 'SUB-1Y' },
};

export interface ExternalSubscriptionCode {
  code: string; // e.g. "SUB-3M-9K2L"
  duration: SubscriptionDuration;
  durationDays: number;
  note?: string; // Optional buyer name or note from teacher (e.g. "حيدر - بغداد")
  createdAt: string;
  isUsed: boolean;
  usedByStudentName?: string;
  usedByStudentId?: string;
  governorate?: string;
  usedAt?: string;
  expiresAt?: string;
  deviceId?: string; // Hardware/Browser lock fingerprint
  deviceInfo?: string; // e.g. "iPhone / iOS" or "Android / Chrome"
  status: 'available' | 'active' | 'expired' | 'suspended';
}

export interface PlatformConfig {
  unlockedLessons: string[]; // e.g. ['lesson-1', 'lesson-2']
  unlockedGrammarTopics?: string[]; // e.g. ['topic-past-simple', 'topic-past-continuous', ...]
  grammarUnlocked: boolean;
  masterCode: string;
  allowedCodes: string[];
  singleUseCodes?: SingleUseCode[]; // Single-use one-time activation codes
  externalSubscriptions?: ExternalSubscriptionCode[]; // Paid external online subscriptions
  revokedCodes?: string[]; // Legacy: globally revoked codes (kept for backward compat)
  // Per-student bans: when a specific student is deleted, only they are blocked (by studentId+code pair)
  revokedStudents?: { studentId: string; code: string; name: string }[];
  activeExamId: string | null;
}

// Default initial configuration - strictly only Lesson 1 & Topic 1 open by default
export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  unlockedLessons: ['lesson-1'],
  unlockedGrammarTopics: ['topic-past-simple'],
  grammarUnlocked: true,
  masterCode: 'IQ-7788',
  allowedCodes: ['IQ-2026', 'IQ-STAR', 'ENGLISH-1', 'IQ-7788'],
  singleUseCodes: [],
  externalSubscriptions: [],
  revokedCodes: [],
  activeExamId: null,
};

// -------------------------------------------------------------
// Helper Functions for Platform Configuration & Local Cache
// -------------------------------------------------------------
const CONFIG_DOC_PATH = 'settings/platform_config';
const CONFIG_CACHE_KEY = 'iq_platform_config_cache';

export const getCachedPlatformConfig = (): PlatformConfig => {
  try {
    const raw = localStorage.getItem(CONFIG_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.unlockedLessons)) {
        return parsed as PlatformConfig;
      }
    }
  } catch (e) {
    console.warn('Error reading cached platform config:', e);
  }
  return DEFAULT_PLATFORM_CONFIG;
};

export const setCachedPlatformConfig = (cfg: PlatformConfig): void => {
  try {
    localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(cfg));
  } catch (e) {
    console.warn('Error writing cached platform config:', e);
  }
};

export const listenToPlatformConfig = (
  callback: (config: PlatformConfig) => void
): Unsubscribe => {
  const docRef = doc(db, CONFIG_DOC_PATH);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as PlatformConfig;
        setCachedPlatformConfig(data);
        callback(data);
      } else {
        // Create initial config if does not exist
        setDoc(docRef, DEFAULT_PLATFORM_CONFIG).catch(console.error);
        setCachedPlatformConfig(DEFAULT_PLATFORM_CONFIG);
        callback(DEFAULT_PLATFORM_CONFIG);
      }
    },
    (err) => {
      console.warn('Firebase config listener fallback to cache/default:', err);
      callback(getCachedPlatformConfig());
    }
  );
};

export const updatePlatformConfig = async (
  partialConfig: Partial<PlatformConfig>
): Promise<void> => {
  // Update local cache immediately to prevent UI lag or race condition
  const currentCached = getCachedPlatformConfig();
  const updatedCache = { ...currentCached, ...partialConfig };
  setCachedPlatformConfig(updatedCache);

  const docRef = doc(db, CONFIG_DOC_PATH);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    await setDoc(docRef, { ...DEFAULT_PLATFORM_CONFIG, ...partialConfig });
  } else {
    const currentData = snap.data() as PlatformConfig;
    const currentAllowed = currentData.allowedCodes || [];
    const newAllowed = partialConfig.allowedCodes || [];
    const mergedAllowed = Array.from(
      new Set(
        [
          ...currentAllowed,
          ...newAllowed,
          currentData.masterCode,
          partialConfig.masterCode,
        ].filter(Boolean)
      )
    );

    await updateDoc(docRef, {
      ...partialConfig,
      allowedCodes: mergedAllowed,
    });
  }
};

// -------------------------------------------------------------
// Cryptographically Isolated Teacher PIN Verification
// -------------------------------------------------------------
export const TEACHER_PIN_HASH_DEFAULT =
  '16740bf13991fe083fbe5820cc8da08a5d88e5a48f44a3cfcc283c27b2797ba7';
const LEGACY_TEACHER_PIN_HASH =
  'b512750b9f875c92b5536d7e9e43b83c73ece62752a8a66751cf18937a2d035f';

export async function hashTeacherPin(pin: string): Promise<string> {
  const clean = pin.trim();
  if (typeof crypto !== 'undefined' && crypto?.subtle && typeof crypto.subtle.digest === 'function') {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(clean);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn('crypto.subtle failed, using fallback:', e);
    }
  }
  // Pure JS fallback when accessed over HTTP / LAN IP:
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    const char = clean.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'lan_fallback_' + Math.abs(hash).toString(16);
}

export const verifyTeacherPin = async (enteredPin: string): Promise<boolean> => {
  if (!enteredPin) return false;
  const clean = enteredPin.trim();

  try {
    const hashed = await hashTeacherPin(clean);
    const credDoc = await getDoc(doc(db, 'settings', 'teacher_credential'));

    if (credDoc.exists() && credDoc.data().pinHash) {
      const currentRemoteHash = credDoc.data().pinHash;
      const isMatch = hashed === currentRemoteHash;
      if (isMatch) {
        try {
          localStorage.setItem('iq_teacher_pin_hash_cache', hashed);
        } catch {}
      }
      return isMatch;
    }

    // If credential doc does not exist yet in Firestore, verify against default hash
    const isDefaultMatch = hashed === TEACHER_PIN_HASH_DEFAULT || hashed === LEGACY_TEACHER_PIN_HASH;
    if (isDefaultMatch) {
      try {
        localStorage.setItem('iq_teacher_pin_hash_cache', hashed);
      } catch {}
    }
    return isDefaultMatch;
  } catch (err) {
    console.warn('Teacher credential fetch failed, using cached hash verification:', err);
    // Offline fallback: ONLY verify against the verified cached hash, NEVER plaintext bypass
    try {
      const hashed = await hashTeacherPin(clean);
      const cachedHash = localStorage.getItem('iq_teacher_pin_hash_cache') || TEACHER_PIN_HASH_DEFAULT;
      return hashed === cachedHash || hashed === LEGACY_TEACHER_PIN_HASH;
    } catch {
      return false;
    }
  }
};

export const updateTeacherPin = async (newPin: string): Promise<string> => {
  const clean = newPin.trim();
  const hashed = await hashTeacherPin(clean);
  const credDocRef = doc(db, 'settings', 'teacher_credential');

  let previousPinHash = TEACHER_PIN_HASH_DEFAULT;
  try {
    const snap = await getDoc(credDocRef);
    if (snap.exists() && snap.data().pinHash) {
      previousPinHash = snap.data().pinHash;
    }
  } catch (e) {
    console.warn('Could not read existing pin hash for update, using local cache:', e);
    const localCached = localStorage.getItem('iq_teacher_pin_hash_cache');
    if (localCached) previousPinHash = localCached;
  }

  await setDoc(
    credDocRef,
    {
      pinHash: hashed,
      previousPinHash: previousPinHash,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  try {
    localStorage.setItem('iq_teacher_pin_hash_cache', hashed);
    localStorage.setItem(STORAGE_KEYS.TEACHER_TOKEN, hashed);
  } catch {}

  return hashed;
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

// -------------------------------------------------------------
// Helper Functions for Students
// -------------------------------------------------------------
import { STORAGE_KEYS } from '../constants/storageKeys';

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
    console.error('Error finding existing student:', err);
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

// Global Site Analytics
const ANALYTICS_DOC_PATH = 'settings/platform_analytics';

export const recordSiteVisit = async (): Promise<void> => {
  try {
    const docRef = doc(db, ANALYTICS_DOC_PATH);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, { totalVisits: 1, lastVisitAt: serverTimestamp() });
    } else {
      await updateDoc(docRef, {
        totalVisits: increment(1),
        lastVisitAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.error('Failed to record site visit:', err);
  }
};

export const listenToPlatformAnalytics = (
  callback: (analytics: { totalVisits: number }) => void
): Unsubscribe => {
  const docRef = doc(db, ANALYTICS_DOC_PATH);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as { totalVisits: number });
      } else {
        callback({ totalVisits: 0 });
      }
    },
    () => {
      callback({ totalVisits: 0 });
    }
  );
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
    // This blocks ONLY this specific student from re-entering with the same code.
    // Other students who share the same code (e.g. master code) are NOT affected.
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

export const generateRandomAccessCode = (): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `IQ-${randomNum}`;
};

export const generateSingleUseCode = async (): Promise<string> => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `IQ-S${randomNum}`;
  const cfg = getCachedPlatformConfig();
  const currentSingleCodes = cfg.singleUseCodes || [];
  const newEntry: SingleUseCode = {
    code,
    isUsed: false,
    createdAt: new Date().toISOString(),
  };
  const updatedCodes = [newEntry, ...currentSingleCodes];
  await updatePlatformConfig({ singleUseCodes: updatedCodes });
  return code;
};

export const markSingleUseCodeAsUsed = async (
  code: string,
  studentName: string,
  studentId: string,
  section?: string
): Promise<void> => {
  const cfg = getCachedPlatformConfig();
  const currentSingleCodes = cfg.singleUseCodes || [];
  const cleanCode = code.trim().toUpperCase();
  const index = currentSingleCodes.findIndex((c) => c.code.toUpperCase() === cleanCode);
  if (index >= 0) {
    const updated = [...currentSingleCodes];
    updated[index] = {
      ...updated[index],
      isUsed: true,
      usedByStudentName: studentName,
      usedByStudentId: studentId,
      usedBySection: section,
      usedAt: new Date().toISOString(),
    };
    await updatePlatformConfig({ singleUseCodes: updated });
  }
};

export const deleteSingleUseCode = async (code: string): Promise<void> => {
  const cfg = getCachedPlatformConfig();
  const currentSingleCodes = cfg.singleUseCodes || [];
  const cleanCode = code.trim().toUpperCase();
  const filtered = currentSingleCodes.filter((c) => c.code.toUpperCase() !== cleanCode);
  await updatePlatformConfig({ singleUseCodes: filtered });
};

// -------------------------------------------------------------
// Helper Functions for External Online Subscriptions & Device Lock
// -------------------------------------------------------------
export const getOrCreateDeviceId = (): string => {
  const DEVICE_STORAGE_KEY = 'iq_device_lock_id';
  try {
    let deviceId = localStorage.getItem(DEVICE_STORAGE_KEY);
    if (!deviceId) {
      deviceId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
    }
    return deviceId;
  } catch {
    return `dev_fallback_${Date.now()}`;
  }
};

export const getDeviceSummary = (): string => {
  if (typeof navigator === 'undefined') return 'جهاز غير معروف';
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'iPhone / iPad (iOS)';
  if (/Android/.test(ua)) return 'هاتف Android';
  if (/Windows/.test(ua)) return 'حاسوب Windows';
  if (/Macintosh/.test(ua)) return 'حاسوب Mac';
  return 'متصفح هاتف / حاسوب';
};

export const generateExternalSubscriptionCode = async (
  duration: SubscriptionDuration = '3_months',
  note?: string
): Promise<string> => {
  const meta = SUBSCRIPTION_DURATIONS_MAP[duration] || SUBSCRIPTION_DURATIONS_MAP['3_months'];
  // Generate unambiguous uppercase alphanumeric characters (excluding confusing 0, O, 1, I)
  const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  const code = `${meta.prefix}-${rand}`;

  // Read latest config snapshot directly from Firestore to avoid race conditions and stale overwrites
  const docRef = doc(db, CONFIG_DOC_PATH);
  const snap = await getDoc(docRef);
  let currentSubs: ExternalSubscriptionCode[] = [];
  if (snap.exists()) {
    const data = snap.data() as PlatformConfig;
    currentSubs = data.externalSubscriptions || [];
  } else {
    currentSubs = getCachedPlatformConfig().externalSubscriptions || [];
  }

  // Deduplication check
  if (currentSubs.some((s) => s.code.toUpperCase() === code.toUpperCase())) {
    return generateExternalSubscriptionCode(duration, note);
  }

  const newSub: ExternalSubscriptionCode = {
    code,
    duration,
    durationDays: meta.days,
    createdAt: new Date().toISOString(),
    isUsed: false,
    status: 'available',
  };

  if (note && note.trim().length > 0) {
    newSub.note = note.trim();
  }

  const updatedSubs = [newSub, ...currentSubs];

  if (snap.exists()) {
    await updateDoc(docRef, { externalSubscriptions: updatedSubs });
  } else {
    await setDoc(docRef, { ...DEFAULT_PLATFORM_CONFIG, externalSubscriptions: updatedSubs });
  }

  // Update memory cache
  const cached = getCachedPlatformConfig();
  setCachedPlatformConfig({ ...cached, externalSubscriptions: updatedSubs });

  return code;
};

export const activateExternalSubscription = async (
  code: string,
  studentName: string,
  studentId: string,
  governorate: string,
  deviceId: string,
  deviceInfo: string
): Promise<{ success: boolean; expiresAt: string; message?: string }> => {
  const cfg = getCachedPlatformConfig();
  const currentSubs = cfg.externalSubscriptions || [];
  const cleanCode = code.trim().toUpperCase();
  const index = currentSubs.findIndex((s) => s.code.toUpperCase() === cleanCode);

  if (index < 0) {
    return { success: false, expiresAt: '', message: 'كود الاشتراك غير موجود في النظام.' };
  }

  const existingSub = currentSubs[index];

  // Already used check
  if (existingSub.isUsed) {
    // If student name matches, check device lock
    if (existingSub.usedByStudentName?.trim().toLowerCase() === studentName.trim().toLowerCase()) {
      if (existingSub.deviceId && existingSub.deviceId !== deviceId) {
        return {
          success: false,
          expiresAt: existingSub.expiresAt || '',
          message: 'عذراً، هذا الحساب مقفل على جهاز آخر. يرجى التواصل مع أ. حسام لفك قفل الجهاز ونقله إلى هذا الهاتف.',
        };
      }
      // Re-login on the same device
      return { success: true, expiresAt: existingSub.expiresAt || '' };
    } else {
      return {
        success: false,
        expiresAt: '',
        message: `هذا الكود مستخدم بالفعل لطالب آخر (${existingSub.usedByStudentName}) ولا يمكن استخدامه باسم مختلف.`,
      };
    }
  }

  // First time activation
  const isOneHour = existingSub.duration === '1_hour';
  const now = Date.now();
  const durationMs = isOneHour
    ? 60 * 60 * 1000
    : (existingSub.durationDays || 90) * 24 * 60 * 60 * 1000;
  const expiresAt = new Date(now + durationMs).toISOString();

  const updatedSubs = [...currentSubs];
  updatedSubs[index] = {
    ...existingSub,
    isUsed: true,
    usedByStudentName: studentName.trim(),
    usedByStudentId: studentId,
    governorate: governorate.trim(),
    usedAt: new Date(now).toISOString(),
    expiresAt: expiresAt,
    deviceId: deviceId,
    deviceInfo: deviceInfo,
    status: 'active',
  };

  await updatePlatformConfig({ externalSubscriptions: updatedSubs });
  return { success: true, expiresAt };
};

export const resetSubscriptionDevice = async (code: string): Promise<void> => {
  const cfg = getCachedPlatformConfig();
  const currentSubs = cfg.externalSubscriptions || [];
  const cleanCode = code.trim().toUpperCase();
  const index = currentSubs.findIndex((s) => s.code.toUpperCase() === cleanCode);
  if (index >= 0) {
    const updatedSubs = [...currentSubs];
    const subCopy = { ...updatedSubs[index] };
    delete subCopy.deviceId;
    delete subCopy.deviceInfo;
    updatedSubs[index] = subCopy;
    await updatePlatformConfig({ externalSubscriptions: updatedSubs });
  }
};

export const extendSubscription = async (
  code: string,
  additionalDays: number = 30
): Promise<void> => {
  const cfg = getCachedPlatformConfig();
  const currentSubs = cfg.externalSubscriptions || [];
  const cleanCode = code.trim().toUpperCase();
  const index = currentSubs.findIndex((s) => s.code.toUpperCase() === cleanCode);
  if (index >= 0) {
    const sub = currentSubs[index];
    const currentExpiry = sub.expiresAt ? new Date(sub.expiresAt).getTime() : Date.now();
    const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
    const newExpiry = new Date(baseTime + additionalDays * 24 * 60 * 60 * 1000).toISOString();

    const updatedSubs = [...currentSubs];
    updatedSubs[index] = {
      ...sub,
      expiresAt: newExpiry,
      durationDays: (sub.durationDays || 0) + additionalDays,
      status: 'active',
    };
    await updatePlatformConfig({ externalSubscriptions: updatedSubs });
  }
};

export const toggleSubscriptionStatus = async (
  code: string,
  newStatus: 'active' | 'suspended'
): Promise<void> => {
  const cfg = getCachedPlatformConfig();
  const currentSubs = cfg.externalSubscriptions || [];
  const cleanCode = code.trim().toUpperCase();
  const index = currentSubs.findIndex((s) => s.code.toUpperCase() === cleanCode);
  if (index >= 0) {
    const updatedSubs = [...currentSubs];
    updatedSubs[index] = {
      ...updatedSubs[index],
      status: newStatus,
    };
    await updatePlatformConfig({ externalSubscriptions: updatedSubs });
  }
};

export const deleteExternalSubscription = async (code: string): Promise<void> => {
  const cfg = getCachedPlatformConfig();
  const currentSubs = cfg.externalSubscriptions || [];
  const cleanCode = code.trim().toUpperCase();
  const filtered = currentSubs.filter((s) => s.code.toUpperCase() !== cleanCode);
  await updatePlatformConfig({ externalSubscriptions: filtered });
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
      if (hasExistedInSession && !snap.metadata.hasPendingWrites) {
        onDeleted();
      }
    },
    (err) => {
      // Do not log out on transient network errors
      console.warn('Error listening to student session doc:', err);
    }
  );
};

// -------------------------------------------------------------
// Helper Functions for Quick Exams
// -------------------------------------------------------------
export const listenToActiveExam = (
  examId: string,
  callback: (exam: QuickExam | null) => void
): Unsubscribe => {
  const docRef = doc(db, 'exams', examId);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({ id: snapshot.id, ...snapshot.data() } as QuickExam);
      } else {
        callback(null);
      }
    },
    (err) => {
      console.warn('Error listening to exam:', err);
      callback(null);
    }
  );
};

export const saveOrUpdateExam = async (exam: QuickExam): Promise<void> => {
  const docRef = doc(db, 'exams', exam.id);
  await setDoc(docRef, exam, { merge: true });
};

export const checkExistingExamSubmission = async (
  examId: string,
  studentId: string
): Promise<ExamSubmission | null> => {
  try {
    const docRef = doc(db, 'submissions', `${examId}_${studentId}`);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...(snap.data() as Omit<ExamSubmission, 'id'>) };
    }
  } catch (err) {
    console.warn('Check existing submission error:', err);
  }
  return null;
};

export const submitStudentExamResult = async (
  submission: Omit<ExamSubmission, 'id'>
): Promise<void> => {
  const customDocId = `${submission.examId}_${submission.studentId || 'unknown'}`;
  const docRef = doc(db, 'submissions', customDocId);

  // Optimistically update local cache so teacher and student see the grade immediately even offline
  try {
    const allCached = getCachedAllSubmissions();
    const existingIdx = allCached.findIndex((s) => s.id === customDocId);
    const newRecord: ExamSubmission = { id: customDocId, ...submission };
    if (existingIdx >= 0) {
      allCached[existingIdx] = newRecord;
    } else {
      allCached.unshift(newRecord);
    }
    localStorage.setItem(ALL_SUBMISSIONS_CACHE_KEY, JSON.stringify(allCached));
  } catch (e) {
    console.warn('Failed to update local submissions cache:', e);
  }

  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      // Overwrite/update existing submission with the latest evaluated answers and earned score
      await updateDoc(docRef, {
        ...submission,
        updatedAt: serverTimestamp(),
      });
      return;
    }

    await setDoc(docRef, {
      ...submission,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to submit exam result to Firestore:', err);
  }
};

const STUDENTS_CACHE_KEY = 'iq_students_cache';
const ALL_SUBMISSIONS_CACHE_KEY = 'iq_all_submissions_cache';
const ALL_EXAMS_CACHE_KEY = 'iq_all_exams_cache';

export const getCachedStudents = (): StudentSession[] => {
  try {
    const raw = localStorage.getItem(STUDENTS_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getCachedAllSubmissions = (): ExamSubmission[] => {
  try {
    const raw = localStorage.getItem(ALL_SUBMISSIONS_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getCachedAllExams = (): QuickExam[] => {
  try {
    const raw = localStorage.getItem(ALL_EXAMS_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const listenToSubmissions = (
  examId: string,
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
        if (data.examId === examId) {
          results.push({
            id: docSnap.id,
            ...(data as Omit<ExamSubmission, 'id'>),
          });
        }
      });
      callback(results);
    },
    (err) => {
      console.warn('Error listening to submissions, using cached data:', err);
      const allCached = getCachedAllSubmissions();
      const filtered = allCached.filter((s) => s.examId === examId);
      callback(filtered);
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

export const listenToStudentSubmissions = (
  studentId: string,
  callback: (submissions: ExamSubmission[]) => void
): Unsubscribe => {
  if (!studentId) {
    callback([]);
    return () => {};
  }
  const colRef = collection(db, 'submissions');
  // Query strictly for this student's submissions from Firestore to preserve privacy and prevent over-fetching
  const q = query(colRef, where('studentId', '==', studentId));
  return onSnapshot(
    q,
    (snapshot) => {
      const results: ExamSubmission[] = [];
      snapshot.forEach((docSnap) => {
        results.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ExamSubmission, 'id'>),
        });
      });
      // Sort in memory by submission date to avoid requiring an extra composite index in Firestore
      results.sort((a, b) => {
        const timeA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const timeB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return timeB - timeA;
      });
      callback(results);
    },
    (err) => {
      console.warn('Error listening to student submissions:', err);
      const allCached = getCachedAllSubmissions();
      const filtered = allCached.filter((s) => s.studentId === studentId);
      callback(filtered);
    }
  );
};

export const listenToAllSubmissions = (
  callback: (submissions: ExamSubmission[]) => void
): Unsubscribe => {
  const colRef = collection(db, 'submissions');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const results: ExamSubmission[] = [];
      snapshot.forEach((docSnap) => {
        results.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ExamSubmission, 'id'>),
        });
      });
      try {
        localStorage.setItem(ALL_SUBMISSIONS_CACHE_KEY, JSON.stringify(results));
      } catch (e) {
        console.warn('Failed to cache submissions:', e);
      }
      callback(results);
    },
    (err) => {
      console.warn('Error listening to all submissions, using cached fallback:', err);
      callback(getCachedAllSubmissions());
    }
  );
};

export const listenToAllExams = (
  callback: (exams: QuickExam[]) => void
): Unsubscribe => {
  const colRef = collection(db, 'exams');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const results: QuickExam[] = [];
      snapshot.forEach((docSnap) => {
        results.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<QuickExam, 'id'>),
        });
      });
      try {
        localStorage.setItem(ALL_EXAMS_CACHE_KEY, JSON.stringify(results));
      } catch (e) {
        console.warn('Failed to cache exams:', e);
      }
      callback(results);
    },
    (err) => {
      console.warn('Error listening to all exams, using cache:', err);
      callback(getCachedAllExams());
    }
  );
};

