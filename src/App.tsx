import { useState, useEffect } from 'react';
import {
  Volume2,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';
import { unit1Lessons, unitsList } from './data/unit1Data';
import { lessons3to10ActivityData } from './data/activityBookAllLessons';
import { grammarUnitsList } from './data/grammarData';
import { Header } from './components/Header';
import { UnitSelector } from './components/UnitSelector';
import { LessonGridSelector } from './components/LessonGridSelector';
import { AudioTranscriptPlayer } from './components/AudioTranscriptPlayer';
import { HolidayActivitiesShowcase } from './components/HolidayActivitiesShowcase';
import { IraqLandmarksShowcase } from './components/IraqLandmarksShowcase';
import { Lesson1Exercises } from './components/exercises/Lesson1Exercises';
import { Lesson2Exercises } from './components/exercises/Lesson2Exercises';
import { GenericLessonExercises } from './components/exercises/GenericLessonExercises';
import { GrammarUnitSelector } from './components/grammar/GrammarUnitSelector';
import { GrammarTopicSelector } from './components/grammar/GrammarTopicSelector';
import { GrammarTopicDetail } from './components/grammar/GrammarTopicDetail';
import {
  StudentSession,
  PlatformConfig,
  DEFAULT_PLATFORM_CONFIG,
  getStoredStudentSession,
  setStoredStudentSession,
  listenToPlatformConfig,
  listenToActiveExam,
  QuickExam,
} from './services/firebase';
import { STORAGE_KEYS } from './constants/storageKeys';
import { StudentLoginScreen } from './components/auth/StudentLoginScreen';
import { TeacherDashboardPage } from './components/admin/TeacherDashboardPage';
import { StudentQuickExamModal } from './components/exam/StudentQuickExamModal';
import { StudentGradesHistoryModal } from './components/exam/StudentGradesHistoryModal';
import { MandatoryExamOverlay } from './components/exam/MandatoryExamOverlay';

export default function App() {
  // Authentication & Platform State
  const [studentSession, setStudentSession] = useState<StudentSession | null>(getStoredStudentSession());
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEYS.TEACHER_LOGGED_IN) === 'true'
  );
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState(false);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(DEFAULT_PLATFORM_CONFIG);
  const [activeExam, setActiveExam] = useState<QuickExam | null>(null);
  const [isStudentExamModalOpen, setIsStudentExamModalOpen] = useState(false);
  const [isStudentHistoryModalOpen, setIsStudentHistoryModalOpen] = useState(false);

  // Realtime Listeners for Firebase Platform Config & Active Exam
  useEffect(() => {
    const unsub = listenToPlatformConfig((cfg) => {
      setPlatformConfig(cfg);
    });
    return () => unsub();
  }, []);

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

  // Main Tab State
  const [activeMainTab, setActiveMainTab] = useState<'curriculum' | 'grammar'>('curriculum');

  // Curriculum State
  const [, setSelectedUnitId] = useState<string>('unit-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const [curriculumViewState, setCurriculumViewState] = useState<'units' | 'lessons' | 'detail'>('lessons');

  // Grammar Tab State (Units -> 5 Grammar Topics -> Topic Cards & Practice)
  const [grammarSelectedUnitId, setGrammarSelectedUnitId] = useState<string>('unit-1');
  const [grammarSelectedTopicId, setGrammarSelectedTopicId] = useState<string>('topic-past-simple');
  const [grammarViewState, setGrammarViewState] = useState<'units' | 'topics' | 'detail'>('units');

  const currentLesson =
    unit1Lessons.find((l) => l.id === selectedLessonId) || unit1Lessons[0];

  // Curriculum navigation handlers
  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    setCurriculumViewState('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurriculumViewState('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevLesson = () => {
    const currentIndex = unit1Lessons.findIndex((l) => l.id === selectedLessonId);
    if (currentIndex > 0) {
      setSelectedLessonId(unit1Lessons[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextLesson = () => {
    const currentIndex = unit1Lessons.findIndex((l) => l.id === selectedLessonId);
    if (currentIndex < unit1Lessons.length - 1) {
      setSelectedLessonId(unit1Lessons[currentIndex + 1].id);
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
    setGrammarSelectedTopicId(topicId);
    setGrammarViewState('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: 'curriculum' | 'grammar') => {
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

  // 2. Authentication Gate: Neither student nor teacher is logged in yet
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
          setIsTeacherLoggedIn(false);
        }}
        isExamActive={Boolean(activeExam && activeExam.isActive)}
        onOpenExam={() => setIsStudentExamModalOpen(true)}
        onOpenTeacherDashboard={() => setIsTeacherDashboardOpen(true)}
        onOpenStudentGradesHistory={() => setIsStudentHistoryModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-7 overflow-x-hidden min-w-0">
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
                onSelectTopic={handleSelectGrammarTopic}
                onBackToUnits={() => {
                  setGrammarViewState('units');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                lessons={unit1Lessons}
                selectedLessonId={selectedLessonId}
                onSelectLesson={handleSelectLesson}
                onBackToUnits={() => setCurriculumViewState('units')}
                unlockedLessonIds={platformConfig.unlockedLessons}
              />
            )}

            {/* VIEW 3: LESSON DETAIL VIEW (AUDIO + ACTIVITY BOOK EXERCISES) */}
            {curriculumViewState === 'detail' && (
              <div className="space-y-6 sm:space-y-7">
                {/* Top Navigation Bar: Back to 10 lessons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-zinc-200 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurriculumViewState('lessons')}
                      className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1 cursor-pointer font-arabic"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>قائمة الدروس (10 دروس)</span>
                    </button>
                    <button
                      onClick={() => setCurriculumViewState('units')}
                      className="px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
                    >
                      قائمة الوحدات
                    </button>
                  </div>

                  {/* Quick switcher buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={handlePrevLesson}
                      disabled={currentLesson.lessonNumber === 1}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        currentLesson.lessonNumber === 1
                          ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                          : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
                      }`}
                      title="الدرس السابق"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold px-2 py-1 bg-zinc-100 text-zinc-800 rounded font-arabic">
                      الدرس {currentLesson.lessonNumber} من 10
                    </span>
                    <button
                      onClick={handleNextLesson}
                      disabled={currentLesson.lessonNumber === 10}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        currentLesson.lessonNumber === 10
                          ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                          : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
                      }`}
                      title="الدرس التالي"
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
                        UNIT 1 • LESSON {currentLesson.lessonNumber}
                      </span>
                      <h2 className="text-2xl font-extrabold text-zinc-900 mt-1 font-arabic">
                        {currentLesson.titleAr}
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
                    <h3 className="text-base font-bold text-zinc-900 font-arabic">
                      1. الاستماع والقراءة التفاعلية (Listening & Reading)
                    </h3>
                  </div>

                  {currentLesson.lessonNumber === 1 && (
                    <HolidayActivitiesShowcase />
                  )}

                  {currentLesson.lessonNumber === 2 && (
                    <IraqLandmarksShowcase />
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
                    <h3 className="text-base font-bold text-zinc-900 font-arabic">
                      2. تمارين كتاب النشاط التفاعلية (Activity Book Exercises)
                    </h3>
                  </div>

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
                </section>

                {/* Bottom Lesson Navigation */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLesson.lessonNumber === 1}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all font-arabic ${
                      currentLesson.lessonNumber === 1
                        ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>الدرس السابق</span>
                  </button>

                  <button
                    onClick={() => setCurriculumViewState('lessons')}
                    className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline font-arabic text-center order-last sm:order-none w-full sm:w-auto mt-1 sm:mt-0"
                  >
                    قائمة دروس الوحدة الأولى (10 دروس)
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={currentLesson.lessonNumber === 10}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all font-arabic ${
                      currentLesson.lessonNumber === 10
                        ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
                    }`}
                  >
                    <span>الدرس التالي</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-200 bg-white py-5 mt-10" dir="rtl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center text-xs text-zinc-500 font-arabic">
          <span>English for Iraq • 1st Intermediate</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isTeacherLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg font-bold">
                  أنت في وضع: أستاذ المادة 👨‍🏫
                </span>
                <button
                  onClick={() => setIsTeacherDashboardOpen(true)}
                  className="text-zinc-900 hover:underline font-bold cursor-pointer"
                >
                  لوحة تحكم الأستاذ ⚙️
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEYS.TEACHER_LOGGED_IN);
                    setIsTeacherLoggedIn(false);
                  }}
                  className="text-zinc-500 hover:text-zinc-900 underline cursor-pointer"
                >
                  خروج
                </button>
              </div>
            ) : studentSession ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  الطالب: <strong>{studentSession.fullName}</strong> (شعبة {studentSession.section})
                </span>
                <button
                  onClick={() => {
                    setStoredStudentSession(null);
                    setStudentSession(null);
                  }}
                  className="text-slate-500 hover:text-slate-800 underline cursor-pointer text-[11px]"
                  title="تسجيل خروج الطالب والعودة لشاشة البداية"
                >
                  خروج الطالب 🚪
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </footer>

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
