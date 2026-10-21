import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './client';
import { QuickExam, ExamSubmission } from './types';

export const ALL_SUBMISSIONS_CACHE_KEY = 'iq_all_submissions_cache';
export const ALL_EXAMS_CACHE_KEY = 'iq_all_exams_cache';

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
