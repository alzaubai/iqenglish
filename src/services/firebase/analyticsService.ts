import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './client';

export const ANALYTICS_DOC_PATH = 'settings/platform_analytics';

export const recordSiteVisit = async (): Promise<void> => {
  if (!db) return;
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
    console.warn('Failed to record site visit:', err);
  }
};

export const listenToPlatformAnalytics = (
  callback: (analytics: { totalVisits: number }) => void
): Unsubscribe => {
  if (!db) {
    callback({ totalVisits: 0 });
    return () => {};
  }
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
