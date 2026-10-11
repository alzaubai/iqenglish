import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
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
  studentName: string;
  studentSection: string;
  studentCode: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export interface PlatformConfig {
  unlockedLessons: string[]; // e.g. ['lesson-1', 'lesson-2']
  grammarUnlocked: boolean;
  masterCode: string;
  allowedCodes: string[];
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
  grammarUnlocked: true,
  masterCode: 'IQ-2026',
  allowedCodes: ['IQ-2026', 'IQ-STAR', 'ENGLISH-1'],
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
    await updateDoc(docRef, partialConfig);
  }
};

// -------------------------------------------------------------
// Helper Functions for Students
// -------------------------------------------------------------
const STUDENT_STORAGE_KEY = 'iq_student_profile';

export const getStoredStudentSession = (): StudentSession | null => {
  try {
    const raw = localStorage.getItem(STUDENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredStudentSession = (session: StudentSession | null) => {
  if (session) {
    localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STUDENT_STORAGE_KEY);
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
        lastSeenAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Failed to register student in Firebase:', err);
  }
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
  studentName: string,
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
        if (data.studentName === studentName) {
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

