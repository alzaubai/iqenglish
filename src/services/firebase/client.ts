import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  Firestore,
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

let firestoreDb: Firestore;
try {
  firestoreDb = initializeFirestore(app, { ignoreUndefinedProperties: true });
} catch {
  firestoreDb = getFirestore(app);
}

export const db: Firestore = firestoreDb;

export const CONFIG_DOC_PATH = 'settings/platform_config';
export const CONFIG_CACHE_KEY = 'iq_platform_config_cache';

// Device identification and summary helpers
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
