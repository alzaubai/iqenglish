import { useState, useEffect, useCallback } from 'react';
import {
  StudentSession,
  PlatformConfig,
  getCachedPlatformConfig,
  getStoredStudentSession,
  setStoredStudentSession,
  listenToPlatformConfig,
  listenToActiveExam,
  QuickExam,
  listenToSingleStudent,
  recordSiteVisit,
  recordStudentHeartbeat,
  TEACHER_PIN_HASH_DEFAULT,
  LEGACY_TEACHER_PIN_HASH,
} from '../services/firebase';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function usePlatformSession() {
  const [studentSession, setStudentSession] = useState<StudentSession | null>(getStoredStudentSession());
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState<boolean>(() => {
    const isTeacher = localStorage.getItem(STORAGE_KEYS.TEACHER_LOGGED_IN) === 'true';
    const token = localStorage.getItem(STORAGE_KEYS.TEACHER_TOKEN);
    const cachedHash = localStorage.getItem('iq_teacher_pin_hash_cache');
    // Strict validation: Token must match default hash, legacy hash, or verified cached hash
    const isValidToken = Boolean(
      token &&
        (token === TEACHER_PIN_HASH_DEFAULT ||
          token === LEGACY_TEACHER_PIN_HASH ||
          (cachedHash && token === cachedHash))
    );
    return isTeacher && isValidToken;
  });
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(() => getCachedPlatformConfig());
  const [activeExam, setActiveExam] = useState<QuickExam | null>(null);
  const [trialMinutesRemaining, setTrialMinutesRemaining] = useState<number | null>(null);

  // Realtime Listeners for Firebase Platform Config & Active Exam
  useEffect(() => {
    recordSiteVisit(); // Track platform total visits
    const unsub = listenToPlatformConfig((cfg) => {
      setPlatformConfig(cfg);
    });
    return () => unsub();
  }, []);

  // Student active study time heartbeat (runs every 60 seconds)
  useEffect(() => {
    if (!studentSession?.id || isTeacherLoggedIn) return;

    recordStudentHeartbeat(studentSession.id, 1);

    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        recordStudentHeartbeat(studentSession.id, 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [studentSession?.id, isTeacherLoggedIn]);

  // Realtime listener for active exam
  useEffect(() => {
    if (platformConfig.activeExamId) {
      const unsub = listenToActiveExam(platformConfig.activeExamId, (exam) => {
        setActiveExam(exam);
      });
      return () => unsub();
    } else {
      setActiveExam(null);
    }
  }, [platformConfig.activeExamId]);

  // Realtime Session Guard: If student is revoked or confirmed deleted by teacher in Firestore
  useEffect(() => {
    if (!studentSession || isTeacherLoggedIn) return;

    // Strict revocation check: Match solely by unique studentId to prevent false-positives
    // on innocent students sharing the same school code or similar common names
    const isRevoked = (platformConfig.revokedStudents || []).some(
      (r) => r.studentId && r.studentId === studentSession.id
    );
    if (isRevoked) {
      setStoredStudentSession(null);
      setStudentSession(null);
      return;
    }

    const unsub = listenToSingleStudent(studentSession.id, () => {
      setStoredStudentSession(null);
      setStudentSession(null);
    });

    return () => unsub();
  }, [
    studentSession?.id,
    isTeacherLoggedIn,
    platformConfig.revokedStudents,
  ]);

  const isExternalSubscriber = Boolean(studentSession?.isExternalSubscriber);

  // Trial 1-Hour remaining minutes tracker
  useEffect(() => {
    const isTrial =
      studentSession?.subscriptionDuration === '1_hour' ||
      studentSession?.subscriptionDuration === '1_day' ||
      studentSession?.subscriptionDuration === '3_days' ||
      studentSession?.subscriptionDuration === '1_week';

    if (!isExternalSubscriber || !isTrial || !studentSession?.subscriptionExpiresAt) {
      setTrialMinutesRemaining(null);
      return;
    }

    const calcMinutes = () => {
      const diffMs = new Date(studentSession.subscriptionExpiresAt!).getTime() - Date.now();
      setTrialMinutesRemaining(Math.max(0, Math.ceil(diffMs / 60000)));
    };

    calcMinutes();
    const timer = setInterval(calcMinutes, 30000);
    return () => clearInterval(timer);
  }, [isExternalSubscriber, studentSession?.subscriptionDuration, studentSession?.subscriptionExpiresAt]);

  const handleLogoutTeacher = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TEACHER_LOGGED_IN);
    localStorage.removeItem(STORAGE_KEYS.TEACHER_TOKEN);
    setIsTeacherLoggedIn(false);
  }, []);

  const handleLogoutStudent = useCallback((skipConfirm = false) => {
    if (!skipConfirm && typeof window !== 'undefined') {
      const confirmed = window.confirm(
        'هل أنت متأكد من تسجيل الخروج؟ ستحتاج إلى إدخال كود الدخول مجدداً للعودة إلى المنصة.'
      );
      if (!confirmed) return;
    }
    setStoredStudentSession(null);
    setStudentSession(null);
  }, []);

  const hasCompletedActiveExam = Boolean(
    !activeExam ||
    !studentSession ||
    localStorage.getItem(STORAGE_KEYS.examDone(activeExam.id, studentSession.id)) !== null
  );

  return {
    studentSession,
    setStudentSession,
    isTeacherLoggedIn,
    setIsTeacherLoggedIn,
    platformConfig,
    activeExam,
    trialMinutesRemaining,
    isExternalSubscriber,
    hasCompletedActiveExam,
    handleLogoutTeacher,
    handleLogoutStudent,
  };
}
