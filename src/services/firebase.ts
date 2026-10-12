import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
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
export const db = getFirestore(app);

// Data Types
export interface StudentSession {
  id: string;
  fullName: string;
  section: string;
  code: string;
  registeredAt: string;
  lastSeenAt?: any;
  totalTimeSpentMinutes?: number;
  visitCount?: number;
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

export interface PlatformConfig {
  unlockedLessons: string[]; // e.g. ['lesson-1', 'lesson-2']
  unlockedGrammarTopics?: string[]; // e.g. ['topic-past-simple', 'topic-past-continuous', ...]
  grammarUnlocked: boolean;
  masterCode: string;
  allowedCodes: string[];
  revokedCodes?: string[]; // Legacy: globally revoked codes (kept for backward compat)
  // Per-student bans: when a specific student is deleted, only they are blocked (by studentId+code pair)
  revokedStudents?: { studentId: string; code: string; name: string }[];
  teacherPin: string;
  activeExamId: string | null;
}

// Default initial configuration
export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  unlockedLessons: [
    'lesson-1',
    'lesson-2',
    'lesson-3',
    'lesson-4',
    'lesson-5',
    'lesson-6',
    'lesson-7',
    'lesson-8',
    'lesson-9',
    'lesson-10',
  ],
  unlockedGrammarTopics: DEFAULT_GRAMMAR_TOPIC_IDS,
  grammarUnlocked: true,
  masterCode: 'IQ-2026',
  allowedCodes: ['IQ-2026', 'IQ-STAR', 'ENGLISH-1'],
  revokedCodes: [],
  teacherPin: '2026', // Teacher Master PIN
  activeExamId: null,
};

// -------------------------------------------------------------
// Helper Functions for Platform Configuration
// -------------------------------------------------------------
const CONFIG_DOC_PATH = 'settings/platform_config';

export const listenToPlatformConfig = (
  callback: (config: PlatformConfig) => void
): Unsubscribe => {
  const docRef = doc(db, CONFIG_DOC_PATH);
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as PlatformConfig);
      } else {
        // Create initial config if does not exist
        setDoc(docRef, DEFAULT_PLATFORM_CONFIG).catch(console.error);
        callback(DEFAULT_PLATFORM_CONFIG);
      }
    },
    (err) => {
      console.warn('Firebase config listener fallback to default:', err);
      callback(DEFAULT_PLATFORM_CONFIG);
    }
  );
};

export const updatePlatformConfig = async (
  partialConfig: Partial<PlatformConfig>
): Promise<void> => {
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

export const listenToSingleStudent = (
  studentId: string,
  onDeleted: () => void
): Unsubscribe => {
  const studentDoc = doc(db, 'students', studentId);
  return onSnapshot(
    studentDoc,
    (snap) => {
      if (!snap.exists()) {
        onDeleted();
      }
    },
    (err) => {
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

export const submitStudentExamResult = async (
  submission: Omit<ExamSubmission, 'id'>
): Promise<void> => {
  const colRef = collection(db, 'submissions');
  await addDoc(colRef, {
    ...submission,
    createdAt: serverTimestamp(),
  });
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
      console.warn('Error listening to submissions:', err);
      callback([]);
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
      callback(results);
    },
    (err) => {
      console.warn('Error listening to all students:', err);
      callback([]);
    }
  );
};

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
    (err) => {
      console.warn('Error listening to student submissions:', err);
      callback([]);
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
      callback(results);
    },
    (err) => {
      console.warn('Error listening to all submissions:', err);
      callback([]);
    }
  );
};

