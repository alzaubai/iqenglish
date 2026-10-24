import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db, CONFIG_DOC_PATH } from './client';
import {
  PlatformConfig,
  SingleUseCode,
  SubscriptionDuration,
  SUBSCRIPTION_DURATIONS_MAP,
  ExternalSubscriptionCode,
} from './types';
import {
  getCachedPlatformConfig,
  setCachedPlatformConfig,
  updatePlatformConfig,
} from './platformConfigService';

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

export const generateExternalSubscriptionCode = async (
  duration: SubscriptionDuration = '3_months',
  note?: string,
  isGroupCode?: boolean,
  customCodeInput?: string
): Promise<string> => {
  const meta = SUBSCRIPTION_DURATIONS_MAP[duration] || SUBSCRIPTION_DURATIONS_MAP['3_months'];
  // Generate unambiguous uppercase alphanumeric characters (excluding confusing 0, O, 1, I)
  const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  let code = '';
  if (customCodeInput && customCodeInput.trim().length > 0) {
    code = customCodeInput.trim().toUpperCase().replace(/\s+/g, '-');
  } else if (isGroupCode) {
    const groupPrefix = duration === '1_hour' ? 'GRP-1H' : duration === '1_day' ? 'GRP-1D' : duration === '3_days' ? 'GRP-3D' : duration === '1_week' ? 'GRP-1W' : 'GRP';
    code = `${groupPrefix}-${rand}`;
  } else {
    code = `${meta.prefix}-${rand}`;
  }

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
    status: isGroupCode ? 'active' : 'available',
    isGroupCode: Boolean(isGroupCode),
    usedCount: 0,
  };

  if (note && note.trim().length > 0) {
    newSub.note = note.trim();
  }

  const updatedSubs = [newSub, ...currentSubs];

  if (snap.exists()) {
    await updateDoc(docRef, { externalSubscriptions: updatedSubs });
  } else {
    await setDoc(docRef, { externalSubscriptions: updatedSubs }, { merge: true });
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

  if (existingSub.status === 'suspended') {
    return { success: false, expiresAt: '', message: 'عذراً، هذا الكود موقوف مؤقتاً من قبل أستاذ المادة.' };
  }

  // Calculate expiration time based on duration
  const isOneHour = existingSub.duration === '1_hour';
  const isOneDay = existingSub.duration === '1_day';
  const isThreeDays = existingSub.duration === '3_days';
  const isOneWeek = existingSub.duration === '1_week';
  const now = Date.now();
  const durationMs = isOneHour
    ? 60 * 60 * 1000
    : isOneDay
    ? 24 * 60 * 60 * 1000
    : isThreeDays
    ? 3 * 24 * 60 * 60 * 1000
    : isOneWeek
    ? 7 * 24 * 60 * 60 * 1000
    : (existingSub.durationDays || 90) * 24 * 60 * 60 * 1000;
  const calculatedExpiresAt = new Date(now + durationMs).toISOString();

  // ==========================================
  // CASE A: GROUP TRIAL CODE (Multi-Student)
  // ==========================================
  if (existingSub.isGroupCode) {
    const newCount = (existingSub.usedCount || 0) + 1;
    const updatedSubs = currentSubs.map((s, idx) => {
      if (idx !== index) return s;
      return {
        ...s,
        isUsed: true,
        status: 'active' as const,
        usedCount: newCount,
      };
    });

    try {
      await updatePlatformConfig({ externalSubscriptions: updatedSubs });
      setCachedPlatformConfig({ ...cfg, externalSubscriptions: updatedSubs });
    } catch (err) {
      console.warn('Failed to update group code usage in Firestore:', err);
    }

    return {
      success: true,
      expiresAt: calculatedExpiresAt,
    };
  }

  // Already used check
  if (existingSub.isUsed) {
    // If student name matches, check device lock
    if (existingSub.usedByStudentName?.trim().toLowerCase() === studentName.trim().toLowerCase()) {
      if (existingSub.deviceId && existingSub.deviceId !== deviceId) {
        return {
          success: false,
          expiresAt: existingSub.expiresAt || '',
          message: 'عذراً، هذا الحساب مقفل على جهاز آخر. يرجى التواصل مع مدرس المادة لفك قفل الجهاز ونقله إلى هذا الهاتف.',
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

  // First time activation for single-user code
  const updatedSubs = [...currentSubs];
  updatedSubs[index] = {
    ...existingSub,
    isUsed: true,
    usedByStudentName: studentName.trim(),
    usedByStudentId: studentId,
    governorate: governorate.trim(),
    usedAt: new Date(now).toISOString(),
    expiresAt: calculatedExpiresAt,
    deviceId: deviceId,
    deviceInfo: deviceInfo,
    status: 'active',
  };

  await updatePlatformConfig({ externalSubscriptions: updatedSubs });
  return { success: true, expiresAt: calculatedExpiresAt };
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
