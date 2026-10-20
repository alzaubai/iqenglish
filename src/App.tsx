import { useState, useEffect } from 'react';
import {
  Volume2,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Lock,
  Clock,
} from 'lucide-react';
import { unit1Lessons, unitsList } from './data/unit1Data';
import { unit2Lessons } from './data/unit2Data';
import { lessons3to10ActivityData } from './data/activityBookAllLessons';
import { unit2ActivityData } from './data/unit2ActivityBookData';
import { grammarUnitsList } from './data/grammarData';
import { Header } from './components/Header';
import { UnitSelector } from './components/UnitSelector';
import { LessonGridSelector } from './components/LessonGridSelector';
import { AudioTranscriptPlayer } from './components/AudioTranscriptPlayer';
import { HolidayActivitiesShowcase } from './components/HolidayActivitiesShowcase';
import { IraqLandmarksShowcase } from './components/IraqLandmarksShowcase';
import { FourSeasonsShowcase } from './components/FourSeasonsShowcase';
import { Lesson1Exercises } from './components/exercises/Lesson1Exercises';
import { Lesson2Exercises } from './components/exercises/Lesson2Exercises';
import { GenericLessonExercises } from './components/exercises/GenericLessonExercises';
import { GrammarUnitSelector } from './components/grammar/GrammarUnitSelector';
import { GrammarTopicSelector } from './components/grammar/GrammarTopicSelector';
import { GrammarTopicDetail } from './components/grammar/GrammarTopicDetail';
import { startBackgroundMediaPrefetch } from './utils/offlineMedia';
import {
  StudentSession,
  PlatformConfig,
  DEFAULT_PLATFORM_CONFIG,
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
} from './services/firebase';
import { STORAGE_KEYS } from './constants/storageKeys';
import { StudentLoginScreen } from './components/auth/StudentLoginScreen';
import { MaintenanceScreen } from './components/auth/MaintenanceScreen';
import { TeacherDashboardPage } from './components/admin/TeacherDashboardPage';
import { StudentQuickExamModal } from './components/exam/StudentQuickExamModal';
import { StudentGradesHistoryModal } from './components/exam/StudentGradesHistoryModal';
import { MandatoryExamOverlay } from './components/exam/MandatoryExamOverlay';
import { StudentGradesPage } from './components/exam/StudentGradesPage';

export default function App() {
  // Authentication & Platform State
  const [studentSession, setStudentSession] = useState<StudentSession | null>(getStoredStudentSession());
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState<boolean>(() => {
    const isTeacher = localStorage.getItem(STORAGE_KEYS.TEACHER_LOGGED_IN) === 'true';
    const token = localStorage.getItem(STORAGE_KEYS.TEACHER_TOKEN);
    return isTeacher && Boolean(token && (token === TEACHER_PIN_HASH_DEFAULT || token.length === 64));
  });
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(() => getCachedPlatformConfig());
  const [activeExam, setActiveExam] = useState<QuickExam | null>(null);
  const [isStudentExamModalOpen, setIsStudentExamModalOpen] = useState(false);
  const [isStudentHistoryModalOpen, setIsStudentHistoryModalOpen] = useState(false);

  // Main Tab State (curriculum | grammar | grades)
  const [activeMainTab, setActiveMainTab] = useState<'curriculum' | 'grammar' | 'grades'>('curriculum');

  // Curriculum State
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const [curriculumViewState, setCurriculumViewState] = useState<'units' | 'lessons' | 'detail'>('units');

  const activeUnitLessons = selectedUnitId === 'unit-2' ? unit2Lessons : unit1Lessons;

  // Grammar Tab State (Units -> 5 Grammar Topics -> Topic Cards & Practice)
  const [grammarSelectedUnitId, setGrammarSelectedUnitId] = useState<string>('unit-1');
  const [grammarSelectedTopicId, setGrammarSelectedTopicId] = useState<string>('topic-past-simple');
  const [grammarViewState, setGrammarViewState] = useState<'units' | 'topics' | 'detail'>('units');

  // Realtime Listeners for Firebase Platform Config & Active Exam
  useEffect(() => {
    recordSiteVisit(); // Track platform total visits
    const unsub = listenToPlatformConfig((cfg) => {
      setPlatformConfig(cfg);
    });
    return () => unsub();
  }, []);

  // Background offline media prefetch (caches audio & illustrations silently)
  useEffect(() => {
    startBackgroundMediaPrefetch(activeUnitLessons, selectedLessonId);
  }, [activeUnitLessons, selectedLessonId]);

  // Student active study time heartbeat (runs every 60 seconds)
  useEffect(() => {
    if (!studentSession?.id || isTeacherLoggedIn) return;

    // Send immediate heartbeat on entry
    recordStudentHeartbeat(studentSession.id, 1);

    const interval = setInterval(() => {
      // Only count active study time if tab is currently visible
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        recordStudentHeartbeat(studentSession.id, 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [studentSession?.id, isTeacherLoggedIn]);

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

    // Check if this student is explicitly in the revoked list
    const isRevoked = (platformConfig.revokedStudents || []).some(
      (r) =>
        r.studentId === studentSession.id ||
        (r.code.toUpperCase() === studentSession.code.toUpperCase() &&
          r.name.trim().toLowerCase() === studentSession.fullName.trim().toLowerCase())
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
    studentSession?.code,
    studentSession?.fullName,
    isTeacherLoggedIn,
    platformConfig.revokedStudents,
  ]);

  const isExternalSubscriber = Boolean(studentSession?.isExternalSubscriber);
  const effectiveUnlockedLessons = (isExternalSubscriber || isTeacherLoggedIn)
    ? [...unit1Lessons.map((l) => l.id), ...unit2Lessons.map((l) => l.id)]
    : Array.isArray(platformConfig.unlockedLessons)
      ? platformConfig.unlockedLessons
      : ['lesson-1', 'u2-lesson-1'];
  const effectiveUnlockedGrammarTopics = (isExternalSubscriber || isTeacherLoggedIn)
    ? [
        'topic-past-simple',
        'topic-past-continuous',
        'topic-present-simple',
        'topic-adverbs-frequency',
        'topic-possessive-pronouns',
        'topic-joining-sentences',
        'topic-interests',
        'u2-topic-future-will',
        'u2-topic-comparatives',
        'u2-topic-dates-ordinals',
      ]
    : platformConfig.unlockedGrammarTopics && platformConfig.unlockedGrammarTopics.length > 0
      ? platformConfig.unlockedGrammarTopics
      : ['topic-past-simple', 'u2-topic-future-will'];

  const currentLesson =
    activeUnitLessons.find((l) => l.id === selectedLessonId) || activeUnitLessons[0];

  // Trial 1-Hour remaining minutes tracker
  const [trialMinutesRemaining, setTrialMinutesRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (
      !isExternalSubscriber ||
      studentSession?.subscriptionDuration !== '1_hour' ||
      !studentSession?.subscriptionExpiresAt
    ) {
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

  // Curriculum navigation handlers
  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    const targetLessons = unitId === 'unit-2' ? unit2Lessons : unit1Lessons;
    setSelectedLessonId(targetLessons[0].id);
    setCurriculumViewState('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    const isUnlocked = effectiveUnlockedLessons.includes(lessonId);
    if (!isUnlocked) {
      alert('Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹ Ù…Ù† Ù‚Ø¨Ù„ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±');
      return;
    }
    setSelectedLessonId(lessonId);
    setCurriculumViewState('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevLesson = () => {
    const currentIndex = activeUnitLessons.findIndex((l) => l.id === selectedLessonId);
    if (currentIndex > 0) {
      const prevLesson = activeUnitLessons[currentIndex - 1];
      const isUnlocked = effectiveUnlockedLessons.includes(prevLesson.id);
      if (!isUnlocked) {
        alert('Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹ Ù…Ù† Ù‚Ø¨Ù„ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±');
        return;
      }
      setSelectedLessonId(prevLesson.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextLesson = () => {
    const currentIndex = activeUnitLessons.findIndex((l) => l.id === selectedLessonId);
    if (currentIndex < activeUnitLessons.length - 1) {
      const nextLesson = activeUnitLessons[currentIndex + 1];
      const isUnlocked = effectiveUnlockedLessons.includes(nextLesson.id);
      if (!isUnlocked) {
        alert('Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹ Ù…Ù† Ù‚Ø¨Ù„ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±');
        return;
      }
      setSelectedLessonId(nextLesson.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Grammar navigation handlers (Units -> Topics -> Detail)
  const handleSelectGrammarUnit = (unitId: string) => {
    setGrammarSelectedUnitId(unitId);
    setGrammarViewState('topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGrammarTopic = (topicId: string) => {
    const isUnlocked = effectiveUnlockedGrammarTopics.includes(topicId);
    if (!isUnlocked) {
      alert('Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹ Ù…Ù† Ù‚Ø¨Ù„ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±');
      return;
    }
    setGrammarSelectedTopicId(topicId);
    setGrammarViewState('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: 'curriculum' | 'grammar' | 'grades') => {
    setActiveMainTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Dedicated Teacher Dashboard Page (Opens when teacher clicks the Teacher Icon)
  if (isTeacherDashboardOpen) {
    return (
      <TeacherDashboardPage
        platformConfig={platformConfig}
        isPreAuthenticated={true}
        onBackToSite={() => setIsTeacherDashboardOpen(false)}
      />
    );
  }

  // 2. Platform Maintenance Mode Gate:
  // If maintenance mode is active, BLOCK ALL STUDENTS & VISITORS unless teacher is logged in!
  const isMaintenanceActive = Boolean(platformConfig.isMaintenanceMode ?? true);
  if (isMaintenanceActive && !isTeacherLoggedIn) {
    return (
      <MaintenanceScreen
        maintenanceMessageAr={platformConfig.maintenanceMessageAr}
        onTeacherLoginSuccess={() => {
          localStorage.setItem(STORAGE_KEYS.TEACHER_LOGGED_IN, 'true');
          setIsTeacherLoggedIn(true);
          setIsTeacherDashboardOpen(false);
        }}
      />
    );
  }

  // 3. Authentication Gate: Neither student nor teacher is logged in yet
  if (!studentSession && !isTeacherLoggedIn) {
    return (
      <StudentLoginScreen
        platformConfig={platformConfig}
        onActivated={(session) => setStudentSession(session)}
        onTeacherLoginSuccess={() => {
          localStorage.setItem(STORAGE_KEYS.TEACHER_LOGGED_IN, 'true');
          setIsTeacherLoggedIn(true);
          setIsTeacherDashboardOpen(false); // Directly enters the MAIN PAGE!
        }}
      />
    );
  }

  // Check if student has completed current active exam
  const hasCompletedActiveExam = Boolean(
    !activeExam ||
    !studentSession ||
    localStorage.getItem(STORAGE_KEYS.examDone(activeExam.id, studentSession.id)) !== null
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-700 selection:text-white" dir="rtl">
      {/* Top Header with Navigation Tabs */}
      <Header
        activeTab={activeMainTab}
        onTabChange={handleTabChange}
        studentName={studentSession?.fullName}
        studentSection={studentSession?.section}
        isTeacher={isTeacherLoggedIn}
        onLogoutTeacher={() => {
          localStorage.removeItem(STORAGE_KEYS.TEACHER_LOGGED_IN);
          localStorage.removeItem(STORAGE_KEYS.TEACHER_TOKEN);
          setIsTeacherLoggedIn(false);
        }}
        isExamActive={Boolean(activeExam && activeExam.isActive)}
        onOpenExam={() => setIsStudentExamModalOpen(true)}
        onOpenTeacherDashboard={() => setIsTeacherDashboardOpen(true)}
        onOpenStudentGradesHistory={() => setIsStudentHistoryModalOpen(true)}
      />

      {/* 1-Hour Trial Notice Bar */}
      {isExternalSubscriber &&
        studentSession?.subscriptionDuration === '1_hour' &&
        trialMinutesRemaining !== null && (
          <div className="bg-amber-50 border-b border-amber-200/80 py-2 px-4 text-center sticky top-14 sm:top-16 z-30 shadow-2xs font-arabic">
            <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-xs font-bold text-amber-900">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                ÙØªØ±Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù…Ø¬Ø§Ù†ÙŠØ© Ù„Ù„Ù…Ù†ØµØ©: Ù…ØªØ¨Ù‚ÙŠ Ù„Ùƒ ({trialMinutesRemaining} Ø¯Ù‚ÙŠÙ‚Ø©)
              </span>
            </div>
          </div>
        )}

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8 space-y-6 sm:space-y-7 overflow-x-hidden min-w-0">
        {/* ================= SECTION A: GRAMMAR TAB ================= */}
        {activeMainTab === 'grammar' && (
          <div>
            {/* VIEW 1: GRAMMAR UNITS LIST */}
            {grammarViewState === 'units' && (
              <GrammarUnitSelector
                units={grammarUnitsList}
                onSelectUnit={handleSelectGrammarUnit}
              />
            )}

            {/* VIEW 2: TOPICS LIST OF SELECTED UNIT (5 Clear Topics) */}
            {grammarViewState === 'topics' && (
              <GrammarTopicSelector
                unitId={grammarSelectedUnitId}
                onSelectTopic={handleSelectGrammarTopic}
                onBackToUnits={() => {
                  setGrammarViewState('units');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                unlockedGrammarTopics={effectiveUnlockedGrammarTopics}
              />
            )}

            {/* VIEW 3: DETAILED GRAMMAR TOPIC WITH CARDS & PRACTICE */}
            {grammarViewState === 'detail' && (
              <GrammarTopicDetail
                topicId={grammarSelectedTopicId}
                onBackToTopics={() => {
                  setGrammarViewState('topics');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBackToUnits={() => {
                  setGrammarViewState('units');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectTopic={(topicId) => {
                  setGrammarSelectedTopicId(topicId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                unlockedGrammarTopics={effectiveUnlockedGrammarTopics}
              />
            )}
          </div>
        )}

        {/* ================= SECTION B: CURRICULUM (LESSONS & EXERCISES) ================= */}
        {activeMainTab === 'curriculum' && (
          <div>
            {/* VIEW 1: UNITS LIST */}
            {curriculumViewState === 'units' && (
              <UnitSelector
                units={unitsList}
                onSelectUnit={handleSelectUnit}
              />
            )}

            {/* VIEW 2: 10 LESSONS OF THE SELECTED UNIT */}
            {curriculumViewState === 'lessons' && (
              <LessonGridSelector
                lessons={activeUnitLessons}
                selectedLessonId={selectedLessonId}
                onSelectLesson={handleSelectLesson}
                onBackToUnits={() => setCurriculumViewState('units')}
                unlockedLessonIds={effectiveUnlockedLessons}
              />
            )}

            {/* VIEW 3: LESSON DETAIL VIEW (AUDIO + ACTIVITY BOOK EXERCISES) */}
            {curriculumViewState === 'detail' && (() => {
              const isCurrentLessonUnlocked = effectiveUnlockedLessons.includes(selectedLessonId);
              const currentLessonIndex = activeUnitLessons.findIndex((l) => l.id === selectedLessonId);
              const prevLesson = currentLessonIndex > 0 ? activeUnitLessons[currentLessonIndex - 1] : null;
              const nextLesson = currentLessonIndex < activeUnitLessons.length - 1 ? activeUnitLessons[currentLessonIndex + 1] : null;
              const isPrevUnlocked = prevLesson ? effectiveUnlockedLessons.includes(prevLesson.id) : false;
              const isNextUnlocked = nextLesson ? effectiveUnlockedLessons.includes(nextLesson.id) : false;

              if (!isCurrentLessonUnlocked) {
                return (
                  <div className="space-y-6 sm:space-y-7" dir="rtl">
                    <div className="flex items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-zinc-200 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setCurriculumViewState('lessons')}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 flex items-center justify-center cursor-pointer transition-all border border-zinc-200/80 shadow-2xs"
                          title="Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³"
                          aria-label="Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³"
                        >
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                        </button>
                        <span className="text-xs sm:text-sm font-bold text-zinc-700 font-arabic">
                          {selectedUnitId === 'unit-2' ? 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©' : 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-xs text-center space-y-4 max-w-lg mx-auto my-8">
                      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                        <Lock className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 font-arabic">
                        Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                        ØªÙ… Ù‚ÙÙ„ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…Ù† Ù‚Ø¨Ù„ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => setCurriculumViewState('lessons')}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-arabic cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span>Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³ Ø§Ù„Ù…ØªØ§Ø­Ø©</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
              <div className="space-y-6 sm:space-y-7">
                {/* Top Navigation Bar: Back to 10 lessons */}
                <div className="flex items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-zinc-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurriculumViewState('lessons')}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 flex items-center justify-center cursor-pointer transition-all border border-zinc-200/80 shadow-2xs"
                      title="Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³"
                      aria-label="Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³"
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                    </button>
                    <span className="text-xs sm:text-sm font-bold text-zinc-700 font-arabic">
                      {selectedUnitId === 'unit-2' ? 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©' : 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰'}
                    </span>
                  </div>

                  {/* Quick switcher buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={handlePrevLesson}
                      disabled={currentLesson.lessonNumber === 1 || !isPrevUnlocked}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        currentLesson.lessonNumber === 1 || !isPrevUnlocked
                          ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                          : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
                      }`}
                      title={currentLesson.lessonNumber === 1 ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø£ÙˆÙ„' : !isPrevUnlocked ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø³Ø§Ø¨Ù‚ Ù…ØºÙ„Ù‚' : 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø³Ø§Ø¨Ù‚'}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold px-2 py-1 bg-zinc-100 text-zinc-800 rounded font-arabic">
                      Ø§Ù„Ø¯Ø±Ø³ {currentLesson.lessonNumber} Ù…Ù† 10
                    </span>
                    <button
                      onClick={handleNextLesson}
                      disabled={currentLesson.lessonNumber === 10 || !isNextUnlocked}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        currentLesson.lessonNumber === 10 || !isNextUnlocked
                          ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                          : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
                      }`}
                      title={currentLesson.lessonNumber === 10 ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø£Ø®ÙŠØ±' : !isNextUnlocked ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„ØªØ§Ù„ÙŠ Ù…ØºÙ„Ù‚' : 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„ØªØ§Ù„ÙŠ'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Current Lesson Header Card */}
                <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-right">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1">
                    {currentLesson.imageUrl && (
                      <div className="w-full sm:w-44 md:w-48 h-36 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 bg-zinc-50 shadow-2xs relative">
                        <img
                          src={currentLesson.imageUrl}
                          alt={currentLesson.titleAr}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono inline-block">
                        UNIT {currentLesson.unitNumber} â€¢ LESSON {currentLesson.lessonNumber}
                      </span>
                      <h2 className="text-2xl font-extrabold text-zinc-900 mt-1 font-arabic">
                        {currentLesson.titleAr.includes('(') ? (
                          (() => {
                            const match = currentLesson.titleAr.match(/^(.*?)\s*(\([^)]+\))\s*$/);
                            if (match) {
                              return (
                                <span className="flex flex-wrap items-baseline gap-1.5">
                                  <span>{match[1]}</span>
                                  <span dir="ltr" className="inline-block text-xl text-zinc-700 font-sans font-bold">
                                    {match[2]}
                                  </span>
                                </span>
                              );
                            }
                            return currentLesson.titleAr;
                          })()
                        ) : (
                          currentLesson.titleAr
                        )}
                      </h2>
                      <p className="text-sm text-zinc-500 font-sans" dir="ltr">
                        {currentLesson.titleEn}
                      </p>
                      {currentLesson.subtitleAr && (
                        <p className="text-xs text-zinc-600 font-arabic pt-0.5">
                          {currentLesson.subtitleAr}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 1: Listening and Reading Text with Audio Player */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 px-1 text-right">
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-1.5">
                      <span>1. Ø§Ù„Ø§Ø³ØªÙ…Ø§Ø¹ ÙˆØ§Ù„Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ©</span>
                      <span dir="ltr" className="inline-block text-xs font-semibold text-zinc-500 font-sans">
                        (Listening &amp; Reading)
                      </span>
                    </h3>
                  </div>

                  {selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 1 && (
                    <HolidayActivitiesShowcase />
                  )}

                  {selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 2 && (
                    <IraqLandmarksShowcase />
                  )}

                  {selectedUnitId === 'unit-2' && currentLesson.lessonNumber === 1 && (
                    <FourSeasonsShowcase />
                  )}

                  <AudioTranscriptPlayer
                    transcripts={currentLesson.transcripts}
                    lessonTitle={currentLesson.titleEn}
                  />
                </section>

                {/* SECTION 2: Activity Book Exercises */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1 text-right">
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-1.5">
                      <span>2. ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØªØ§Ø¨ Ø§Ù„Ù†Ø´Ø§Ø· Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ©</span>
                      <span dir="ltr" className="inline-block text-xs font-semibold text-zinc-500 font-sans">
                        (Activity Book Exercises)
                      </span>
                    </h3>
                  </div>

                  {selectedUnitId === 'unit-2' ? (
                    <GenericLessonExercises
                      exercises={unit2ActivityData[currentLesson.lessonNumber] || []}
                      onProgressUpdate={() => {}}
                    />
                  ) : (
                    <>
                      {currentLesson.lessonNumber === 1 && (
                        <Lesson1Exercises onProgressUpdate={() => {}} />
                      )}

                      {currentLesson.lessonNumber === 2 && (
                        <Lesson2Exercises onProgressUpdate={() => {}} />
                      )}

                      {currentLesson.lessonNumber >= 3 && (
                        <GenericLessonExercises
                          exercises={lessons3to10ActivityData[currentLesson.lessonNumber] || []}
                          onProgressUpdate={() => {}}
                        />
                      )}
                    </>
                  )}
                </section>

                {/* Bottom Lesson Navigation */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLesson.lessonNumber === 1 || !isPrevUnlocked}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all font-arabic ${
                      currentLesson.lessonNumber === 1 || !isPrevUnlocked
                        ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø³Ø§Ø¨Ù‚</span>
                  </button>

                  <button
                    onClick={() => setCurriculumViewState('lessons')}
                    className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline font-arabic text-center order-last sm:order-none w-full sm:w-auto mt-1 sm:mt-0"
                  >
                    Ù‚Ø§Ø¦Ù…Ø© Ø¯Ø±ÙˆØ³ {selectedUnitId === 'unit-2' ? 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©' : 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰'} (10 Ø¯Ø±ÙˆØ³)
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={currentLesson.lessonNumber === 10 || !isNextUnlocked}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all font-arabic ${
                      currentLesson.lessonNumber === 10 || !isNextUnlocked
                        ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
                    }`}
                  >
                    <span>Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„ØªØ§Ù„ÙŠ</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
              );
            })()}
          </div>
        )}

        {/* ================= SECTION C: STUDENT GRADES FULL PAGE ================= */}
        {activeMainTab === 'grades' && (
          studentSession ? (
            <StudentGradesPage student={studentSession} />
          ) : (
            <div className="max-w-xl mx-auto p-6 text-center font-arabic">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-3">
                <p className="text-slate-700 font-bold text-sm">
                  Ø£Ù†Øª Ù…Ø³Ø¬Ù„ Ø­Ø§Ù„ÙŠØ§Ù‹ ÙƒØ£Ø³ØªØ§Ø° Ø§Ù„Ù…Ø§Ø¯Ø©. Ù„Ù„Ø§Ø·Ù„Ø§Ø¹ Ø¹Ù„Ù‰ Ø¯Ø±Ø¬Ø§Øª ÙˆØ³Ø¬Ù„Ø§Øª Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ ÙŠØ±Ø¬Ù‰ ÙØªØ­ Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³ØªØ§Ø°.
                </p>
                <button
                  onClick={() => setIsTeacherDashboardOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  ÙØªØ­ Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³ØªØ§Ø°
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-200 bg-white py-5 mt-10" dir="rtl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center text-xs text-zinc-500 font-arabic">
          <span>English for Iraq â€¢ Ø§Ù„ØµÙ Ø§Ù„Ø£ÙˆÙ„ Ø§Ù„Ù…ØªÙˆØ³Ø· â€¢ Ø¥Ø¹Ø¯Ø§Ø¯ ÙˆØ¥Ø´Ø±Ø§Ù Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isTeacherLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg font-bold">
                  Ø£Ù†Øª ÙÙŠ ÙˆØ¶Ø¹: Ø£Ø³ØªØ§Ø° Ø§Ù„Ù…Ø§Ø¯Ø©
                </span>
                <button
                  onClick={() => setIsTeacherDashboardOpen(true)}
                  className="text-zinc-900 hover:underline font-bold cursor-pointer"
                >
                  Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³ØªØ§Ø°
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEYS.TEACHER_LOGGED_IN);
                    setIsTeacherLoggedIn(false);
                  }}
                  className="text-zinc-500 hover:text-zinc-900 underline cursor-pointer"
                >
                  Ø®Ø±ÙˆØ¬
                </button>
              </div>
            ) : studentSession ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  Ø§Ù„Ø·Ø§Ù„Ø¨: <strong>{studentSession.fullName}</strong> (Ø´Ø¹Ø¨Ø© {studentSession.section})
                </span>
                <button
                  onClick={() => {
                    setStoredStudentSession(null);
                    setStudentSession(null);
                  }}
                  className="text-slate-500 hover:text-slate-800 underline cursor-pointer text-[11px]"
                  title="ØªØ³Ø¬ÙŠÙ„ Ø®Ø±ÙˆØ¬ Ø§Ù„Ø·Ø§Ù„Ø¨ ÙˆØ§Ù„Ø¹ÙˆØ¯Ø© Ù„Ø´Ø§Ø´Ø© Ø§Ù„Ø¨Ø¯Ø§ÙŠØ©"
                >
                  Ø®Ø±ÙˆØ¬ Ø§Ù„Ø·Ø§Ù„Ø¨
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </footer>

      {/* External Subscription Expired Gate */}
      {isExternalSubscriber &&
        studentSession?.subscriptionExpiresAt &&
        new Date().getTime() > new Date(studentSession.subscriptionExpiresAt).getTime() && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            dir="rtl"
          >
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-arabic">
                {studentSession.subscriptionDuration === '1_hour'
                  ? 'Ø§Ù†ØªÙ‡Øª ÙØªØ±Ø© Ø§Ù„ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø¬Ø§Ù†ÙŠØ© (Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©)'
                  : 'Ø§Ù†ØªÙ‡Øª ÙØªØ±Ø© Ø§Ø´ØªØ±Ø§ÙƒÙƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                Ø¹Ø²ÙŠØ²ÙŠ Ø§Ù„Ø·Ø§Ù„Ø¨ <strong className="text-slate-800">{studentSession.fullName}</strong>ØŒ{' '}
                {studentSession.subscriptionDuration === '1_hour'
                  ? 'Ù„Ù‚Ø¯ Ø§Ù†ØªÙ‡Øª ÙØªØ±Ø© Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù„Ù„Ù…Ù†ØµØ© (60 Ø¯Ù‚ÙŠÙ‚Ø©). Ù„Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙˆÙ…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ¹Ù„Ù…ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø© Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±.'
                  : 'Ù„Ù‚Ø¯ Ø§Ù†ØªÙ‡Øª ØµÙ„Ø§Ø­ÙŠØ© Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ø®Ø§Øµ Ø¨Ø§Ø´ØªØ±Ø§ÙƒÙƒ. Ù„ØªØ¬Ø¯ÙŠØ¯ Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙˆÙ…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ¹Ù„Ù…ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø© Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setStoredStudentSession(null);
                    setStudentSession(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic"
                >
                  ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬ ÙˆØ¥Ø¯Ø®Ø§Ù„ ÙƒÙˆØ¯ Ø¬Ø¯ÙŠØ¯
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Mandatory Exam Overlay Gate (Enforces exam if active & not completed yet) */}
      {activeExam &&
        activeExam.isActive &&
        !isTeacherLoggedIn &&
        studentSession &&
        !hasCompletedActiveExam &&
        !isStudentExamModalOpen && (
          <MandatoryExamOverlay
            exam={activeExam}
            student={studentSession}
            onStartExam={() => setIsStudentExamModalOpen(true)}
          />
        )}

      {/* Student Quick Exam Modal */}
      {activeExam && studentSession && (activeExam.isActive || isStudentExamModalOpen) && (
        <StudentQuickExamModal
          isOpen={isStudentExamModalOpen}
          onClose={() => setIsStudentExamModalOpen(false)}
          exam={activeExam}
          student={studentSession}
        />
      )}

      {/* Student Grades & History Modal */}
      {studentSession && (
        <StudentGradesHistoryModal
          isOpen={isStudentHistoryModalOpen}
          onClose={() => setIsStudentHistoryModalOpen(false)}
          student={studentSession}
        />
      )}
    </div>
  );
}

