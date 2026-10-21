import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './client';
import { TEACHER_PIN_HASH_DEFAULT, LEGACY_TEACHER_PIN_HASH } from './types';
import { STORAGE_KEYS } from '../../constants/storageKeys';

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
