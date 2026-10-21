import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, CONFIG_DOC_PATH, CONFIG_CACHE_KEY } from './client';
import { PlatformConfig, DEFAULT_PLATFORM_CONFIG } from './types';

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
        // Safe read-only fallback to local cache. NEVER write defaults to Firestore from a listener!
        callback(getCachedPlatformConfig());
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
  // Update local cache immediately to prevent UI lag
  const currentCached = getCachedPlatformConfig();
  const updatedCache = { ...currentCached, ...partialConfig };
  setCachedPlatformConfig(updatedCache);

  const docRef = doc(db, CONFIG_DOC_PATH);
  try {
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      // First time initialization only with merge
      await setDoc(docRef, { ...DEFAULT_PLATFORM_CONFIG, ...partialConfig }, { merge: true });
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

      // Safe merge: ONLY modify the keys present in partialConfig, never overwrite other fields!
      await setDoc(
        docRef,
        {
          ...partialConfig,
          allowedCodes: mergedAllowed,
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.error('Failed to update platform config in Firestore:', err);
    // Last resort fallback with merge
    await setDoc(docRef, partialConfig, { merge: true }).catch(console.error);
  }
};
