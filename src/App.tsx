import { useState, useEffect, lazy, Suspense } from 'react';
import {
  getUnitLessons,
  getAllUnits,
} from './modules/curriculum/curriculumRegistry';
import { useAccessControl } from './modules/access-control/useAccessControl';
import { usePlatformSession } from './hooks/usePlatformSession';
import { grammarUnitsList } from './data/grammarData';
import { Header } from './components/Header';
import { UnitSelector } from './components/UnitSelector';
import { LessonGridSelector } from './components/LessonGridSelector';
import { CurriculumDetailView } from './components/curriculum/CurriculumDetailView';
import { GrammarUnitSelector } from './components/grammar/GrammarUnitSelector';
import { GrammarTopicSelector } from './components/grammar/GrammarTopicSelector';
import { GrammarTopicDetail } from './components/grammar/GrammarTopicDetail';
const StudentGradesPage = lazy(() => import('./components/exam/StudentGradesPage').then((m) => ({ default: m.StudentGradesPage })));
import { AppFooter } from './components/layout/AppFooter';
import { AppModalsAndGates } from './components/layout/AppModalsAndGates';
import { TrialNoticeBar } from './components/layout/TrialNoticeBar';
import { startBackgroundMediaPrefetch } from './utils/offlineMedia';
import { STORAGE_KEYS } from './constants/storageKeys';
import { StudentLoginScreen } from './components/auth/StudentLoginScreen';
import { MaintenanceScreen } from './components/auth/MaintenanceScreen';
const TeacherDashboardPage = lazy(() => import('./components/admin/TeacherDashboardPage').then((m) => ({ default: m.TeacherDashboardPage })));

export default function App() {
  // Session, Auth & Realtime Platform State (extracted to custom hook)
  const {
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
  } = usePlatformSession();

  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [isStudentExamModalOpen, setIsStudentExamModalOpen] = useState(false);
  const [isStudentHistoryModalOpen, setIsStudentHistoryModalOpen] = useState(false);

  // Main Tab State (curriculum | grammar | grades)
  const [activeMainTab, setActiveMainTab] = useState<'curriculum' | 'grammar' | 'grades'>('curriculum');

  // Curriculum State
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const [curriculumViewState, setCurriculumViewState] = useState<'units' | 'lessons' | 'detail'>('units');

  const activeUnitLessons = getUnitLessons(selectedUnitId);

  // Grammar Tab State (Units -> 5 Grammar Topics -> Topic Cards & Practice)
  const [grammarSelectedUnitId, setGrammarSelectedUnitId] = useState<string>('unit-1');
  const [grammarSelectedTopicId, setGrammarSelectedTopicId] = useState<string>('topic-past-simple');
  const [grammarViewState, setGrammarViewState] = useState<'units' | 'topics' | 'detail'>('units');

  // Background offline media prefetch (caches audio & illustrations silently)
  useEffect(() => {
    startBackgroundMediaPrefetch(activeUnitLessons, selectedLessonId);
  }, [activeUnitLessons, selectedLessonId]);

  const {
    unlockedLessonIds,
    unlockedGrammarTopicIds,
    canUserAccessLesson,
    canUserAccessGrammarTopic,
  } = useAccessControl({
    platformConfig,
    isTeacherLoggedIn,
    isExternalSubscriber,
  });

  // Curriculum navigation handlers
  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    const targetLessons = getUnitLessons(unitId);
    setSelectedLessonId(targetLessons[0].id);
    setCurriculumViewState('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    const isUnlocked = canUserAccessLesson(lessonId);
    if (!isUnlocked) {
      alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');
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
      const isUnlocked = canUserAccessLesson(prevLesson.id);
      if (!isUnlocked) {
        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');
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
      const isUnlocked = canUserAccessLesson(nextLesson.id);
      if (!isUnlocked) {
        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');
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
    const isUnlocked = canUserAccessGrammarTopic(topicId);
    if (!isUnlocked) {
      alert('عذراً، هذا الموضوع مغلق حالياً من قبل مدرس المادة');
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
      <Suspense fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-arabic text-sm text-slate-600">
          جاري فتح لوحة تحكم الأستاذ...
        </div>
      }>
        <TeacherDashboardPage
          platformConfig={platformConfig}
          isPreAuthenticated={true}
          onBackToSite={() => setIsTeacherDashboardOpen(false)}
        />
      </Suspense>
    );
  }

  // 2. Platform Maintenance Mode Gate:
  // If maintenance mode is active, BLOCK ALL STUDENTS & VISITORS unless teacher is logged in!
  const isMaintenanceActive = Boolean(platformConfig.isMaintenanceMode ?? false);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-700 selection:text-white" dir="rtl">
      {/* Top Header with Navigation Tabs */}
      <Header
        activeTab={activeMainTab}
        onTabChange={handleTabChange}
        studentName={studentSession?.fullName}
        studentSection={studentSession?.section}
        isTeacher={isTeacherLoggedIn}
        onLogoutTeacher={handleLogoutTeacher}
        isExamActive={Boolean(activeExam && activeExam.isActive)}
        onOpenExam={() => setIsStudentExamModalOpen(true)}
        onOpenTeacherDashboard={() => setIsTeacherDashboardOpen(true)}
        onOpenStudentGradesHistory={() => setIsStudentHistoryModalOpen(true)}
      />

      {/* 1-Hour Trial Notice Bar */}
      <TrialNoticeBar
        isVisible={Boolean(isExternalSubscriber && studentSession?.subscriptionDuration === '1_hour')}
        minutesRemaining={trialMinutesRemaining}
      />

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
                unlockedGrammarTopics={unlockedGrammarTopicIds}
                isTeacher={isTeacherLoggedIn}
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
                unlockedGrammarTopics={unlockedGrammarTopicIds}
                isTeacher={isTeacherLoggedIn}
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
                units={getAllUnits()}
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
                unlockedLessonIds={unlockedLessonIds}
                isTeacher={isTeacherLoggedIn}
              />
            )}

            {/* VIEW 3: LESSON DETAIL VIEW (AUDIO + ACTIVITY BOOK EXERCISES) */}
            {curriculumViewState === 'detail' && (
              <CurriculumDetailView
                selectedUnitId={selectedUnitId}
                selectedLessonId={selectedLessonId}
                activeUnitLessons={activeUnitLessons}
                canUserAccessLesson={canUserAccessLesson}
                onBackToLessons={() => setCurriculumViewState('lessons')}
                onPrevLesson={handlePrevLesson}
                onNextLesson={handleNextLesson}
              />
            )}
          </div>
        )}

        {/* ================= SECTION C: STUDENT GRADES FULL PAGE ================= */}
        {activeMainTab === 'grades' && (
          studentSession ? (
            <Suspense fallback={
              <div className="p-12 text-center font-arabic text-sm text-slate-500">
                جاري تحميل كشف الدرجات...
              </div>
            }>
              <StudentGradesPage student={studentSession} />
            </Suspense>
          ) : (
            <div className="max-w-xl mx-auto p-6 text-center font-arabic">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-3">
                <p className="text-slate-700 font-bold text-sm">
                  أنت مسجل حالياً كأستاذ المادة. للاطلاع على درجات وسجلات جميع الطلاب، يرجى فتح لوحة تحكم الأستاذ.
                </p>
                <button
                  onClick={() => setIsTeacherDashboardOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  فتح لوحة تحكم الأستاذ
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Clean Footer */}
      <AppFooter
        isTeacherLoggedIn={isTeacherLoggedIn}
        studentSession={studentSession}
        onOpenTeacherDashboard={() => setIsTeacherDashboardOpen(true)}
        onLogoutTeacher={handleLogoutTeacher}
        onLogoutStudent={handleLogoutStudent}
      />

      {/* Modals & Session Gates */}
      <AppModalsAndGates
        studentSession={studentSession}
        isTeacherLoggedIn={isTeacherLoggedIn}
        isExternalSubscriber={isExternalSubscriber}
        activeExam={activeExam}
        hasCompletedActiveExam={hasCompletedActiveExam}
        isStudentExamModalOpen={isStudentExamModalOpen}
        setIsStudentExamModalOpen={setIsStudentExamModalOpen}
        isStudentHistoryModalOpen={isStudentHistoryModalOpen}
        setIsStudentHistoryModalOpen={setIsStudentHistoryModalOpen}
        onLogoutStudent={handleLogoutStudent}
      />
    </div>
  );
}
