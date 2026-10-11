import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  Search,
  RotateCcw,
  BookOpen,
  Play,
  Pause,
  Shuffle,
  AlertCircle
} from 'lucide-react';
import {
  PlatformConfig,
  updatePlatformConfig,
  QuickExam,
  saveOrUpdateExam,
  listenToSubmissions,
  ExamSubmission,
  listenToActiveExam
} from '../../services/firebase';
import {
  UNIT_1_QUESTION_BANK,
  CategorizedExamQuestion
} from '../../data/defaultExamQuestions';

interface TeacherDashboardPageProps {
  platformConfig: PlatformConfig;
  onBackToSite: () => void;
}

export const TeacherDashboardPage: React.FC<TeacherDashboardPageProps> = ({
  platformConfig,
  onBackToSite,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'results' | 'builder' | 'lessons' | 'codes'>('results');

  // Submissions State
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [searchStudentQuery, setSearchStudentQuery] = useState<string>('');

  // Exam Builder State
  const [examTitle, setExamTitle] = useState('الامتحان السريع • الوحدة الأولى');
  const [selectedLessonSources, setSelectedLessonSources] = useState<string[]>([
    'lesson-1',
    'lesson-2',
    'grammar',
  ]);
  const [questionCountTarget, setQuestionCountTarget] = useState<number>(5);
  const [selectedQuestions, setSelectedQuestions] = useState<CategorizedExamQuestion[]>([]);
  const [isExamActiveLocal, setIsExamActiveLocal] = useState(false);
  const [builderStatusMsg, setBuilderStatusMsg] = useState<string | null>(null);

  // Master Code / PIN Edit State
  const [newMasterCode, setNewMasterCode] = useState(platformConfig.masterCode || 'IQ-2026');
  const [newTeacherPin, setNewTeacherPin] = useState(platformConfig.teacherPin || '2026');
  const [settingsSaveMsg, setSettingsSaveMsg] = useState<string | null>(null);

  // Listen to submissions for the current active exam
  useEffect(() => {
    if (!platformConfig.activeExamId) return;

    const unsub = listenToSubmissions(platformConfig.activeExamId, (list) => {
      setSubmissions(list);
    });

    return () => unsub();
  }, [platformConfig.activeExamId]);

  // Sync active exam state
  useEffect(() => {
    if (platformConfig.activeExamId) {
      const unsub = listenToActiveExam(platformConfig.activeExamId, (exam) => {
        if (exam) {
          setIsExamActiveLocal(exam.isActive);
          setExamTitle(exam.title);
          // If we haven't selected questions yet, set them from current active exam
          if (selectedQuestions.length === 0 && exam.questions?.length > 0) {
            setSelectedQuestions(exam.questions as CategorizedExamQuestion[]);
          }
        }
      });
      return () => unsub();
    }
  }, [platformConfig.activeExamId]);

  // Generate initial questions if list is empty
  useEffect(() => {
    if (selectedQuestions.length === 0) {
      handleGenerateQuestions();
    }
  }, []);

  // Handle PIN Submission
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = platformConfig.teacherPin || '2026';
    if (pinInput.trim() === correctPin || pinInput.trim() === '2026') {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  // Toggle Source Lesson in Builder
  const handleToggleLessonSource = (lessonKey: string) => {
    if (selectedLessonSources.includes(lessonKey)) {
      if (selectedLessonSources.length > 1) {
        setSelectedLessonSources(selectedLessonSources.filter((k) => k !== lessonKey));
      }
    } else {
      setSelectedLessonSources([...selectedLessonSources, lessonKey]);
    }
  };

  // Generate Questions from Selected Sources
  const handleGenerateQuestions = () => {
    const availablePool = UNIT_1_QUESTION_BANK.filter((q) =>
      selectedLessonSources.includes(q.lessonId)
    );

    // Shuffle and pick target count
    const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, questionCountTarget);
    setSelectedQuestions(picked);
  };

  // Swap a single question with another unused question
  const handleSwapSingleQuestion = (indexToSwap: number) => {
    const currentQ = selectedQuestions[indexToSwap];
    const currentSelectedIds = selectedQuestions.map((q) => q.id);

    // Find available candidates from the same lesson or selected sources
    let candidates = UNIT_1_QUESTION_BANK.filter(
      (q) =>
        selectedLessonSources.includes(q.lessonId) &&
        !currentSelectedIds.includes(q.id)
    );

    // Prefer same lesson if available
    const sameLessonCandidates = candidates.filter((q) => q.lessonId === currentQ.lessonId);
    const pool = sameLessonCandidates.length > 0 ? sameLessonCandidates : candidates;

    if (pool.length > 0) {
      const newQuestion = pool[Math.floor(Math.random() * pool.length)];
      const updatedList = [...selectedQuestions];
      updatedList[indexToSwap] = newQuestion;
      setSelectedQuestions(updatedList);
    } else {
      setBuilderStatusMsg('لا يوجد أسئلة بديلة أخرى في هذا الدرس حالياً.');
      setTimeout(() => setBuilderStatusMsg(null), 3000);
    }
  };

  // Launch or Stop Exam
  const handleSaveAndLaunchExam = async (activateState: boolean) => {
    setBuilderStatusMsg('جاري حفظ التحديثات وإرسالها للطلاب...');
    try {
      const examId = 'exam_unit1_quick';
      const examPayload: QuickExam = {
        id: examId,
        title: examTitle.trim() || 'الامتحان السريع • الوحدة الأولى',
        durationMinutes: 15,
        questions: selectedQuestions,
        isActive: activateState,
        createdAt: new Date().toISOString(),
      };

      await saveOrUpdateExam(examPayload);
      await updatePlatformConfig({ activeExamId: examId });

      setIsExamActiveLocal(activateState);
      setBuilderStatusMsg(
        activateState
          ? 'تم اعتماد الأسئلة وإطلاق الامتحان للطلاب بنجاح ✔️'
          : 'تم إيقاف وقفل الامتحان عن الطلاب 🔒'
      );
      setTimeout(() => setBuilderStatusMsg(null), 4000);
    } catch (err) {
      console.error(err);
      setBuilderStatusMsg('حدث خطأ أثناء الاتصال بقاعدة البيانات.');
    }
  };

  // Toggle Lesson Access
  const handleToggleLessonAccess = async (lessonId: string) => {
    const current = platformConfig.unlockedLessons || [];
    const isCurrentlyUnlocked = current.includes(lessonId);
    const updated = isCurrentlyUnlocked
      ? current.filter((id) => id !== lessonId)
      : [...current, lessonId];

    await updatePlatformConfig({ unlockedLessons: updated });
  };

  const handleUnlockAll = async () => {
    const all = Array.from({ length: 10 }, (_, i) => `lesson-${i + 1}`);
    await updatePlatformConfig({ unlockedLessons: all });
  };

  const handleLockAllExcept1 = async () => {
    await updatePlatformConfig({ unlockedLessons: ['lesson-1'] });
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePlatformConfig({
        masterCode: newMasterCode.trim().toUpperCase(),
        teacherPin: newTeacherPin.trim(),
      });
      setSettingsSaveMsg('تم حفظ وتحديث كود التفعيل والرمز السري بنجاح ✔️');
      setTimeout(() => setSettingsSaveMsg(null), 3000);
    } catch {
      setSettingsSaveMsg('تعذر الحفظ، يرجى المحاولة ثانية.');
    }
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSection =
      selectedSectionFilter === 'all' || sub.studentSection === selectedSectionFilter;
    const matchesSearch =
      !searchStudentQuery.trim() ||
      sub.studentName.toLowerCase().includes(searchStudentQuery.toLowerCase().trim());
    return matchesSection && matchesSearch;
  });

  const totalSubmissions = submissions.length;
  const avgScore =
    totalSubmissions > 0
      ? (submissions.reduce((acc, curr) => acc + curr.score, 0) / totalSubmissions).toFixed(1)
      : '0';
  const topScore = totalSubmissions > 0 ? Math.max(...submissions.map((s) => s.score)) : 0;

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col font-sans selection:bg-zinc-800 selection:text-white" dir="rtl">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للمنهاج والدروس</span>
            </button>
            <span className="text-zinc-300 hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm font-bold text-zinc-900 font-arabic hidden sm:inline">
              لوحة تحكم الأستاذ
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
              >
                قفل اللوحة 🔒
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {!isAuthenticated ? (
          /* ======================================================== */
          /* PIN LOGIN VIEW                                           */
          /* ======================================================== */
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-zinc-200 p-7 sm:p-9 shadow-xs text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white mx-auto flex items-center justify-center font-bold text-base shadow-2xs font-sans">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-zinc-900 font-arabic">
                دخول أستاذ المادة
              </h2>
              <p className="text-xs text-zinc-500 font-arabic mt-1">
                أدخل الرمز السري الخاص بك لإدارة المنهاج، الامتحانات، ومتابعة درجات الطلاب
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-zinc-900" />
                  <span>الرمز السري (PIN):</span>
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="2026"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-0 text-center font-mono font-bold text-xl tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-colors"
                  autoFocus
                />
                <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5 text-center">
                  (الرمز الافتراضي: <strong className="font-mono text-zinc-700">2026</strong>)
                </span>
              </div>

              {pinError && (
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-arabic flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-zinc-900" />
                  <span>الرمز السري غير صحيح، يرجى إعادة المحاولة.</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-2xs transition-colors font-arabic"
                >
                  دخول اللوحة 🔓
                </button>
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="py-3 px-4 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors font-arabic"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ======================================================== */
          /* AUTHENTICATED TEACHER DASHBOARD PAGE                     */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Top Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-1.5 flex flex-wrap gap-1">
              {[
                { id: 'results', label: '📊 نتائج الطلاب والدرجات', count: totalSubmissions },
                { id: 'builder', label: '📝 صانع الامتحانات التفاعلي', activeBadge: isExamActiveLocal },
                { id: 'lessons', label: '🔒 التحكم بالدروس المفتوحة' },
                { id: 'codes', label: '🔑 الأكواد والرمز السري' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-arabic ${
                    activeTab === t.id
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      activeTab === t.id ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {t.count}
                    </span>
                  )}
                  {t.activeBadge && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>

            {/* TAB 1: LIVE RESULTS & STUDENT GRADES */}
            {activeTab === 'results' && (
              <div className="space-y-5 text-right">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                    <span className="text-xs text-zinc-500 font-arabic block">عدد الطلاب الذين حلوا الامتحان</span>
                    <strong className="text-2xl font-black text-zinc-900 font-mono block mt-1">
                      {totalSubmissions}
                    </strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                    <span className="text-xs text-zinc-500 font-arabic block">متوسط الدرجات</span>
                    <strong className="text-2xl font-black text-zinc-900 font-mono block mt-1">
                      {avgScore}
                    </strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                    <span className="text-xs text-zinc-500 font-arabic block">أعلى درجة مسجلة</span>
                    <strong className="text-2xl font-black text-zinc-900 font-mono block mt-1">
                      {topScore} / 10
                    </strong>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-zinc-200">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchStudentQuery}
                      onChange={(e) => setSearchStudentQuery(e.target.value)}
                      placeholder="ابحث باسم الطالب..."
                      className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-zinc-200 font-arabic focus:border-zinc-900 focus:ring-0"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-xs text-zinc-500 font-arabic pl-1 whitespace-nowrap">
                      الشعبة:
                    </span>
                    {['all', 'أ', 'ب', 'ج', 'د', 'هـ'].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setSelectedSectionFilter(sec)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-arabic ${
                          selectedSectionFilter === sec
                            ? 'bg-zinc-900 text-white shadow-2xs'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        {sec === 'all' ? 'الكل' : `شعبة ${sec}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submissions Table */}
                {filteredSubmissions.length === 0 ? (
                  <div className="py-14 text-center bg-white rounded-2xl border border-zinc-200 space-y-2">
                    <Users className="w-10 h-10 text-zinc-300 mx-auto" />
                    <h4 className="text-sm font-bold text-zinc-700 font-arabic">
                      لا توجد درجات مسجلة حتى الآن
                    </h4>
                    <p className="text-xs text-zinc-400 font-arabic max-w-sm mx-auto">
                      بمجرد أن تطلق الامتحان السريع من تبويب (صانع الامتحانات) ويحله الطلاب، ستظهر أسماؤهم ودرجاتهم هنا لحظياً.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
                    <table className="w-full text-right border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-800 font-bold font-arabic border-b border-zinc-200">
                          <th className="p-3.5">#</th>
                          <th className="p-3.5">اسم الطالب</th>
                          <th className="p-3.5">الشعبة</th>
                          <th className="p-3.5">كود التفعيل</th>
                          <th className="p-3.5">الدرجة</th>
                          <th className="p-3.5">وقت التسليم</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 font-sans">
                        {filteredSubmissions.map((sub, idx) => (
                          <tr key={sub.id || idx} className="hover:bg-zinc-50 transition-colors">
                            <td className="p-3.5 text-zinc-400 font-mono text-xs">{idx + 1}</td>
                            <td className="p-3.5 font-bold font-arabic text-zinc-900">
                              {sub.studentName}
                            </td>
                            <td className="p-3.5 font-bold font-arabic">
                              <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                                شعبة {sub.studentSection}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono text-xs text-zinc-500 uppercase">
                              {sub.studentCode}
                            </td>
                            <td className="p-3.5">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-zinc-100 text-zinc-900 border border-zinc-300">
                                {sub.score} / {sub.totalPoints}
                              </span>
                            </td>
                            <td className="p-3.5 text-xs text-zinc-500 font-arabic flex items-center gap-1 pt-4">
                              <Clock className="w-3.5 h-3.5 text-zinc-400" />
                              <span>{new Date(sub.submittedAt).toLocaleTimeString('ar-IQ')}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INTERACTIVE QUESTION BUILDER & SWAPPER */}
            {activeTab === 'builder' && (
              <div className="space-y-6 text-right">
                {/* Active Exam Status Bar */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isExamActiveLocal ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {isExamActiveLocal ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold font-arabic text-zinc-900">
                        {isExamActiveLocal ? 'الامتحان متاح ونشط حالياً للطلاب 🟢' : 'الامتحان متوقف حالياً 🔴'}
                      </h4>
                      <p className="text-xs text-zinc-500 font-arabic">
                        {isExamActiveLocal
                          ? 'يظهر لجميع الطلاب زر للبدء بالامتحان وتسليم الدرجات.'
                          : 'يمكنك إعداد وتعديل الأسئلة أدناه، ثم الضغط على زر الاعتماد والإطلاق.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isExamActiveLocal ? (
                      <button
                        onClick={() => handleSaveAndLaunchExam(false)}
                        className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-bold text-xs cursor-pointer font-arabic transition-colors flex items-center gap-1.5"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>إيقاف الامتحان 🔒</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveAndLaunchExam(true)}
                        className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs cursor-pointer font-arabic transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>اعتماد وإطلاق الامتحان للطلاب 🚀</span>
                      </button>
                    )}
                  </div>
                </div>

                {builderStatusMsg && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-arabic">
                    {builderStatusMsg}
                  </div>
                )}

                {/* Filter Sources & Generator Settings Card */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 font-arabic">
                      1. تحديد مصادر الأسئلة (من أي الدروس تريد الاختبار؟)
                    </h4>
                    <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                      حدد الدروس التي درستها لطلابك ليتم توليد الأسئلة منها حصراً:
                    </p>
                  </div>

                  {/* Sources Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { id: 'lesson-1', label: 'الدرس 1 (العطلة)' },
                      { id: 'lesson-2', label: 'الدرس 2 (معالم العراق)' },
                      { id: 'lesson-3', label: 'الدرس 3 (قصة القارب)' },
                      { id: 'lesson-4', label: 'الدرس 4 (القصاصات)' },
                      { id: 'lesson-5', label: 'الدرس 5 (أستراليا)' },
                      { id: 'grammar', label: 'القواعد النحوية' },
                    ].map((src) => {
                      const isChecked = selectedLessonSources.includes(src.id);
                      return (
                        <button
                          key={src.id}
                          type="button"
                          onClick={() => handleToggleLessonSource(src.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-arabic transition-all cursor-pointer flex items-center gap-1.5 ${
                            isChecked
                              ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                              : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[10px] ${
                            isChecked ? 'border-white bg-white text-zinc-950 font-bold' : 'border-zinc-300'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span>{src.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Count & Re-roll Button */}
                  <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-700 font-arabic">
                        عدد الأسئلة:
                      </span>
                      {[5, 8].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setQuestionCountTarget(cnt)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                            questionCountTarget === cnt
                              ? 'bg-zinc-900 text-white'
                              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                          }`}
                        >
                          {cnt} أسئلة
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateQuestions}
                      className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-bold font-arabic cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>إعادة توليد نموذج عشوائي 🎲</span>
                    </button>
                  </div>
                </div>

                {/* Generated Questions List with "تبديل هذا السؤال" feature */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-sm font-bold text-zinc-900 font-arabic">
                      2. مراجعة الأسئلة وتعديلها ({selectedQuestions.length} أسئلة):
                    </h4>
                    <span className="text-xs text-zinc-500 font-arabic">
                      اضغط "تبديل" لتغيير أي سؤال لا يعجبك بسؤال بديل فوراً
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedQuestions.map((q, idx) => (
                      <div
                        key={q.id + idx}
                        className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-5 space-y-3 shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 text-left" dir="ltr">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-bold text-zinc-900 font-sans">
                                {q.questionEn}
                              </span>
                            </div>
                            {q.questionAr && (
                              <p className="text-xs text-zinc-500 font-arabic pt-0.5 text-right" dir="rtl">
                                {q.questionAr}
                              </p>
                            )}
                          </div>

                          {/* Swap Button for this specific question */}
                          <button
                            type="button"
                            onClick={() => handleSwapSingleQuestion(idx)}
                            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold font-arabic cursor-pointer transition-colors shrink-0 flex items-center gap-1"
                            title="تغيير هذا السؤال بسؤال آخر"
                          >
                            <RotateCcw className="w-3 h-3 text-zinc-500" />
                            <span>تبديل السؤال</span>
                          </button>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1" dir="ltr">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg text-xs font-sans text-left flex items-center justify-between border ${
                                opt === q.correctAnswer
                                  ? 'bg-zinc-100 font-bold border-zinc-400 text-zinc-900'
                                  : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                              }`}
                            >
                              <span>{opt}</span>
                              {opt === q.correctAnswer && <span className="text-zinc-900 font-bold">✓</span>}
                            </div>
                          ))}
                        </div>

                        {/* Source lesson footer */}
                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-arabic">
                          <span>المصدر: {q.lessonTitleAr}</span>
                          <span className="font-mono font-bold text-zinc-500">{q.points || 2} درجات</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final Launch Button */}
                  <div className="pt-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleSaveAndLaunchExam(true)}
                      className="py-3.5 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm cursor-pointer shadow-xs transition-colors font-arabic inline-flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>اعتماد هذا النموذج وإطلاق الامتحان للطلاب 🚀</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LESSON ACCESS CONTROL */}
            {activeTab === 'lessons' && (
              <div className="space-y-5 text-right">
                <div className="bg-white p-4 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 font-arabic">
                      التحكم بالدروس المفتوحة والمقفولة للطلاب
                    </h4>
                    <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                      الدرس المقفول لن يفتح للطالب وستظهر عليه أيقونة قفل 🔒.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleUnlockAll}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold font-arabic cursor-pointer transition-colors"
                    >
                      فتح الكل
                    </button>
                    <button
                      onClick={handleLockAllExcept1}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
                    >
                      قفل الكل عدا الدرس 1
                    </button>
                  </div>
                </div>

                {/* 10 Lessons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 10 }, (_, i) => {
                    const lessonId = `lesson-${i + 1}`;
                    const isUnlocked = (platformConfig.unlockedLessons || []).includes(lessonId);

                    return (
                      <div
                        key={lessonId}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                          isUnlocked
                            ? 'bg-white border-zinc-200'
                            : 'bg-zinc-50 border-zinc-200/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                            isUnlocked ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-500'
                          }`}>
                            L{i + 1}
                          </span>
                          <div>
                            <span className="font-bold text-xs text-zinc-900 font-arabic block">
                              الدرس {i + 1}
                            </span>
                            <span className="text-[11px] text-zinc-400 font-sans block">
                              Lesson {i + 1}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleLessonAccess(lessonId)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold font-arabic cursor-pointer transition-all flex items-center gap-1.5 ${
                            isUnlocked
                              ? 'bg-zinc-900 text-white'
                              : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                          }`}
                        >
                          {isUnlocked ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>مفتوح</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>مقفول</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: ACCESS CODES & PIN */}
            {activeTab === 'codes' && (
              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-3xl border border-zinc-200 space-y-5 text-right max-w-lg mx-auto">
                <div className="text-center pb-2">
                  <h4 className="text-base font-bold text-zinc-900 font-arabic">
                    إدارة كود التفعيل والرمز السري
                  </h4>
                  <p className="text-xs text-zinc-500 font-arabic mt-1">
                    يمكنك تغيير الكود الموحد الذي ترسله للطلاب، وتغيير رمز دخول الأستاذ.
                  </p>
                </div>

                {settingsSaveMsg && (
                  <div className="p-3 bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-xl text-xs font-arabic flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>{settingsSaveMsg}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-zinc-900" />
                    <span>كود تفعيل الطلاب:</span>
                  </label>
                  <input
                    type="text"
                    value={newMasterCode}
                    onChange={(e) => setNewMasterCode(e.target.value)}
                    placeholder="IQ-2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-0 font-mono font-bold text-base tracking-wider text-zinc-900 uppercase text-center"
                  />
                  <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                    الكود الذي تدزه للطلاب للدخول للمنصة.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
                    <span>الرمز السري لدخول الأستاذ (PIN):</span>
                  </label>
                  <input
                    type="text"
                    value={newTeacherPin}
                    onChange={(e) => setNewTeacherPin(e.target.value)}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-0 font-mono font-bold text-base tracking-wider text-zinc-900 text-center"
                  />
                  <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                    الرمز السري لدخول هذه اللوحة.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors font-arabic shadow-2xs"
                >
                  حفظ التغييرات
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
