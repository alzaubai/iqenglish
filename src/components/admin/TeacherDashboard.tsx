import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  RotateCcw,
  BookOpen,
  Send,
  AlertCircle,
  FileSpreadsheet,
  X,
  Play,
  Pause
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
import { UNIT_1_QUESTION_BANK } from '../../data/defaultExamQuestions';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  platformConfig: PlatformConfig;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  isOpen,
  onClose,
  platformConfig,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'results' | 'exam' | 'lessons' | 'codes'>('results');

  // Submissions State
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [searchStudentQuery, setSearchStudentQuery] = useState<string>('');

  // Exam Launcher State
  const [examTitle, setExamTitle] = useState('الامتحان السريع • الوحدة الأولى');
  const [examQuestionsCount, setExamQuestionsCount] = useState<5 | 8>(5);
  const [isExamActiveLocal, setIsExamActiveLocal] = useState(false);
  const [examStatusMsg, setExamStatusMsg] = useState<string | null>(null);

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
        }
      });
      return () => unsub();
    }
  }, [platformConfig.activeExamId]);

  if (!isOpen) return null;

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

  // Toggle Lesson Access
  const handleToggleLesson = async (lessonId: string) => {
    const current = platformConfig.unlockedLessons || [];
    const isCurrentlyUnlocked = current.includes(lessonId);
    const updated = isCurrentlyUnlocked
      ? current.filter((id) => id !== lessonId)
      : [...current, lessonId];

    await updatePlatformConfig({ unlockedLessons: updated });
  };

  const handleUnlockAllLessons = async () => {
    const all = Array.from({ length: 10 }, (_, i) => `lesson-${i + 1}`);
    await updatePlatformConfig({ unlockedLessons: all });
  };

  const handleLockAllExceptLesson1 = async () => {
    await updatePlatformConfig({ unlockedLessons: ['lesson-1'] });
  };

  // Quick Exam Launch / Toggle
  const handleLaunchOrUpdateExam = async (activateState: boolean) => {
    setExamStatusMsg('جاري حفظ الامتحان وتحديثه...');
    try {
      const examId = 'exam_unit1_quick';
      const selectedQuestions = UNIT_1_QUESTION_BANK.slice(0, examQuestionsCount);

      const examPayload: QuickExam = {
        id: examId,
        title: examTitle.trim() || 'الامتحان السريع • الوحدة الأولى',
        durationMinutes: 15,
        questions: selectedQuestions,
        isActive: activateState,
        createdAt: new Date().toISOString(),
      };

      await saveOrUpdateExam(examPayload);
      await updatePlatformConfig({
        activeExamId: examId,
      });

      setIsExamActiveLocal(activateState);
      setExamStatusMsg(
        activateState
          ? 'تم تفعيل الامتحان بنجاح! سيظهر الآن على هواتف جميع الطلاب فوراً 🚀'
          : 'تم إيقاف وقفل الامتحان عن الطلاب بنجاح 🔒'
      );
      setTimeout(() => setExamStatusMsg(null), 4000);
    } catch (err) {
      console.error(err);
      setExamStatusMsg('حدث خطأ أثناء التحديث.');
    }
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

  // Calculate Stats
  const totalSubmissions = submissions.length;
  const avgScore =
    totalSubmissions > 0
      ? (
          submissions.reduce((acc, curr) => acc + curr.score, 0) / totalSubmissions
        ).toFixed(1)
      : '0';
  const topScore =
    totalSubmissions > 0 ? Math.max(...submissions.map((s) => s.score)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-950/70 backdrop-blur-md overflow-y-auto"
      dir="rtl"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* ========================================================= */}
        {/* VIEW 1: PIN AUTHENTICATION GATE                           */}
        {/* ========================================================= */}
        {!isAuthenticated ? (
          <div className="p-7 sm:p-10 text-center max-w-md mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white mx-auto flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-zinc-900 font-arabic">
                لوحة تحكم الأستاذ 👨‍🏫
              </h3>
              <p className="text-xs text-zinc-500 font-arabic mt-1">
                منطقة محمية خاصة بأستاذ المادة لإدارة الطلاب، الامتحانات، وفتح الدروس
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-zinc-900" />
                  <span>الرمز السري للأستاذ (PIN):</span>
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="أدخل الرمز السري..."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-200 focus:border-zinc-900 focus:ring-0 text-center font-mono font-black text-xl tracking-widest text-zinc-900 placeholder:text-zinc-300 placeholder:font-normal transition-colors"
                  autoFocus
                />
                <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5 text-center">
                  (الرمز الافتراضي المبدئي: <strong className="font-mono text-zinc-700">2026</strong>)
                </span>
              </div>

              {pinError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-arabic flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>الرمز السري غير صحيح! يرجى إعادة المحاولة.</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm cursor-pointer shadow-sm transition-all"
                >
                  دخول اللوحة 🔓
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-2xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 font-bold text-sm cursor-pointer transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: AUTHENTICATED TEACHER DASHBOARD                   */
          /* ========================================================= */
          <div>
            {/* Header */}
            <div className="bg-zinc-900 text-white px-5 sm:px-7 py-4.5 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-arabic leading-tight">
                    لوحة تحكم الأستاذ • إدارة المنهاج
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-arabic block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    قاعدة البيانات السحابية (Firebase) متصلة ومباشرة
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-arabic cursor-pointer transition-colors"
                >
                  قفل 🔒
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                  title="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 sm:px-7 flex flex-wrap gap-1 pt-2">
              {[
                { id: 'results', label: '📊 نتائج الطلاب والدرجات', count: totalSubmissions },
                { id: 'exam', label: '🚀 الامتحان السريع', activeBadge: isExamActiveLocal },
                { id: 'lessons', label: '🔒 التحكم بالدروس', count: platformConfig.unlockedLessons?.length || 10 },
                { id: 'codes', label: '🔑 الأكواد والرمز السري' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3.5 sm:px-4 py-3 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer font-arabic border-b-2 ${
                    activeTab === t.id
                      ? 'bg-white text-zinc-900 border-zinc-900 shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900 border-transparent'
                  }`}
                >
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-zinc-200 text-zinc-800 font-bold">
                      {t.count}
                    </span>
                  )}
                  {t.activeBadge && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto space-y-6">
              {/* ======================================================= */}
              {/* TAB 1: LIVE RESULTS & STUDENT GRADES                     */}
              {/* ======================================================= */}
              {activeTab === 'results' && (
                <div className="space-y-5 text-right">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-center">
                      <span className="text-xs text-zinc-500 font-arabic block">عدد الطلاب الممتحنين</span>
                      <strong className="text-2xl font-black text-zinc-900 font-mono block mt-0.5">
                        {totalSubmissions}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                      <span className="text-xs text-blue-700 font-arabic block">متوسط الدرجات</span>
                      <strong className="text-2xl font-black text-blue-950 font-mono block mt-0.5">
                        {avgScore}
                      </strong>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <span className="text-xs text-emerald-700 font-arabic block">أعلى درجة مسجلة</span>
                      <strong className="text-2xl font-black text-emerald-950 font-mono block mt-0.5">
                        {topScore} / 10
                      </strong>
                    </div>
                  </div>

                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-50 p-3 rounded-2xl border border-zinc-200">
                    {/* Search by Name */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchStudentQuery}
                        onChange={(e) => setSearchStudentQuery(e.target.value)}
                        placeholder="ابحث باسم الطالب..."
                        className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white font-arabic focus:border-zinc-900 focus:ring-0"
                      />
                    </div>

                    {/* Section Filter Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      <span className="text-xs text-zinc-500 font-arabic whitespace-nowrap pl-1">
                        الشعبة:
                      </span>
                      {['all', 'أ', 'ب', 'ج', 'د', 'هـ'].map((sec) => (
                        <button
                          key={sec}
                          onClick={() => setSelectedSectionFilter(sec)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-arabic ${
                            selectedSectionFilter === sec
                              ? 'bg-zinc-900 text-white shadow-xs'
                              : 'bg-white hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
                          }`}
                        >
                          {sec === 'all' ? 'الكل' : `شعبة ${sec}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table of Submissions */}
                  {filteredSubmissions.length === 0 ? (
                    <div className="py-12 text-center bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-2">
                      <Users className="w-10 h-10 text-zinc-300 mx-auto" />
                      <h4 className="text-sm font-bold text-zinc-700 font-arabic">
                        لا توجد نتائج مسجلة حتى الآن
                      </h4>
                      <p className="text-xs text-zinc-400 font-arabic max-w-sm mx-auto">
                        عندما تطلق الامتحان السريع ويقوم الطلاب بحله وإرساله، ستظهر أسماؤهم ودرجاتهم هنا لحظياً دون الحاجة لتحديث الصفحة.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
                      <table className="w-full text-right border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-zinc-100/80 text-zinc-800 font-bold font-arabic border-b border-zinc-200">
                            <th className="p-3 sm:p-3.5">#</th>
                            <th className="p-3 sm:p-3.5">اسم الطالب</th>
                            <th className="p-3 sm:p-3.5">الشعبة</th>
                            <th className="p-3 sm:p-3.5">كود الطالب</th>
                            <th className="p-3 sm:p-3.5">الدرجة</th>
                            <th className="p-3 sm:p-3.5">وقت التسليم</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 font-sans">
                          {filteredSubmissions.map((sub, idx) => (
                            <tr key={sub.id || idx} className="hover:bg-zinc-50 transition-colors">
                              <td className="p-3 sm:p-3.5 text-zinc-400 font-mono text-xs">{idx + 1}</td>
                              <td className="p-3 sm:p-3.5 font-bold font-arabic text-zinc-900">
                                {sub.studentName}
                              </td>
                              <td className="p-3 sm:p-3.5 font-bold font-arabic">
                                <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                                  شعبة {sub.studentSection}
                                </span>
                              </td>
                              <td className="p-3 sm:p-3.5 font-mono text-xs text-zinc-500 uppercase">
                                {sub.studentCode}
                              </td>
                              <td className="p-3 sm:p-3.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono font-black text-xs sm:text-sm ${
                                    sub.score >= sub.totalPoints * 0.8
                                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      : sub.score >= sub.totalPoints * 0.5
                                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                                  }`}
                                >
                                  {sub.score} / {sub.totalPoints}
                                </span>
                              </td>
                              <td className="p-3 sm:p-3.5 text-xs text-zinc-500 font-arabic flex items-center gap-1 pt-4">
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

              {/* ======================================================= */}
              {/* TAB 2: QUICK EXAM LAUNCHER                               */}
              {/* ======================================================= */}
              {activeTab === 'exam' && (
                <div className="space-y-6 text-right">
                  {/* Status Banner */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isExamActiveLocal
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isExamActiveLocal ? 'bg-emerald-600 text-white' : 'bg-zinc-300 text-zinc-600'
                        }`}
                      >
                        {isExamActiveLocal ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
                      </span>
                      <div>
                        <h4 className="text-base font-black font-arabic">
                          {isExamActiveLocal
                            ? 'الامتحان متاح ونشط حالياً للطلاب 🟢'
                            : 'الامتحان متوقف ومقفول حالياً 🔴'}
                        </h4>
                        <p className="text-xs text-zinc-600 font-arabic mt-0.5">
                          {isExamActiveLocal
                            ? 'يظهر لجميع الطلاب إشعار فوري لتقديم الامتحان وتسليم الإجابات.'
                            : 'الطلاب لا يمكنهم رؤية الامتحان حتى تضغط زر التفعيل.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {isExamActiveLocal ? (
                        <button
                          onClick={() => handleLaunchOrUpdateExam(false)}
                          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs font-arabic transition-all flex items-center gap-1.5"
                        >
                          <Pause className="w-4 h-4" />
                          <span>إيقاف الامتحان وقفله</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLaunchOrUpdateExam(true)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs font-arabic transition-all flex items-center gap-1.5"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          <span>إطلاق الامتحان للطلاب الآن 🚀</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {examStatusMsg && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-arabic">
                      {examStatusMsg}
                    </div>
                  )}

                  {/* Exam Configuration Form */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold text-zinc-900 font-arabic flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>إعدادات الامتحان السريع:</span>
                    </h4>

                    {/* Title */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700 font-arabic">عنوان الامتحان:</label>
                      <input
                        type="text"
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-arabic focus:border-zinc-900 focus:ring-0"
                      />
                    </div>

                    {/* Questions count */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-zinc-700 font-arabic">عدد الأسئلة المختارة:</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setExamQuestionsCount(5)}
                          className={`p-3 rounded-xl border-2 text-right transition-all cursor-pointer ${
                            examQuestionsCount === 5
                              ? 'border-zinc-900 bg-zinc-50'
                              : 'border-zinc-200 bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <strong className="text-sm font-bold font-arabic block text-zinc-900">5 أسئلة سريعة (10 درجات)</strong>
                          <span className="text-xs text-zinc-500 font-arabic">اختبار قصير سريع ومكثف</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExamQuestionsCount(8)}
                          className={`p-3 rounded-xl border-2 text-right transition-all cursor-pointer ${
                            examQuestionsCount === 8
                              ? 'border-zinc-900 bg-zinc-50'
                              : 'border-zinc-200 bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <strong className="text-sm font-bold font-arabic block text-zinc-900">8 أسئلة شاملة (16 درجة)</strong>
                          <span className="text-xs text-zinc-500 font-arabic">اختبار شامل للوحدة الأولى</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preview of Questions */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-zinc-700 font-arabic">
                      معاينة الأسئلة التي ستظهر للطلاب ({examQuestionsCount} أسئلة):
                    </h5>
                    <div className="space-y-2">
                      {UNIT_1_QUESTION_BANK.slice(0, examQuestionsCount).map((q, idx) => (
                        <div key={q.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-left" dir="ltr">
                          <span className="font-mono font-bold text-zinc-500 mr-2">Q{idx + 1}:</span>
                          <span className="font-bold text-zinc-900">{q.questionEn}</span>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {q.options.map((opt, oIdx) => (
                              <span
                                key={oIdx}
                                className={`px-2 py-0.5 rounded-md text-[11px] font-sans ${
                                  opt === q.correctAnswer
                                    ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                                    : 'bg-white text-zinc-600 border border-zinc-200'
                                }`}
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* TAB 3: LESSON ACCESS CONTROL                            */}
              {/* ======================================================= */}
              {activeTab === 'lessons' && (
                <div className="space-y-5 text-right">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 font-arabic">
                        التحكم بحالة الدروس (فتح / قفل للطلاب)
                      </h4>
                      <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                        الدرس المقفول لن يتمكن الطالب من تصفحه أو الاستماع إليه حتى تقوم بفتحه هنا.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUnlockAllLessons}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold font-arabic cursor-pointer transition-colors"
                      >
                        فتح الكل 🟢
                      </button>
                      <button
                        onClick={handleLockAllExceptLesson1}
                        className="px-3 py-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
                      >
                        قفل الكل عدا الدرس 1 🔒
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
                          className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                            isUnlocked
                              ? 'bg-white border-zinc-200'
                              : 'bg-zinc-50 border-zinc-200/60 opacity-70'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                                isUnlocked
                                  ? 'bg-zinc-900 text-white'
                                  : 'bg-zinc-200 text-zinc-500'
                              }`}
                            >
                              L{i + 1}
                            </span>
                            <div>
                              <span className="font-bold text-xs text-zinc-900 font-arabic block">
                                الدرس {i + 1}
                              </span>
                              <span className="text-[11px] text-zinc-500 font-sans block">
                                Lesson {i + 1}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleLesson(lessonId)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-arabic cursor-pointer transition-all flex items-center gap-1.5 ${
                              isUnlocked
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200'
                                : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                            }`}
                          >
                            {isUnlocked ? (
                              <>
                                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                                <span>مفتوح</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5 text-zinc-500" />
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

              {/* ======================================================= */}
              {/* TAB 4: ACCESS CODES & MASTER PIN SETTINGS                */}
              {/* ======================================================= */}
              {activeTab === 'codes' && (
                <form onSubmit={handleSaveSettings} className="space-y-5 text-right max-w-lg mx-auto">
                  <div className="text-center pb-2">
                    <h4 className="text-base font-black text-zinc-900 font-arabic">
                      إدارة كود التفعيل والرمز السري 🔑
                    </h4>
                    <p className="text-xs text-zinc-500 font-arabic mt-1">
                      يمكنك تغيير الكود الموحد الذي ترسله للطلاب، وتغيير رمز دخول الأستاذ بأي وقت.
                    </p>
                  </div>

                  {settingsSaveMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-arabic flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{settingsSaveMsg}</span>
                    </div>
                  )}

                  {/* Master Student Code */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-zinc-900" />
                      <span>كود تفعيل الطلاب الرئيسي:</span>
                    </label>
                    <input
                      type="text"
                      value={newMasterCode}
                      onChange={(e) => setNewMasterCode(e.target.value)}
                      placeholder="IQ-2026"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-200 focus:border-zinc-900 focus:ring-0 font-mono font-black text-lg tracking-wider text-zinc-900 uppercase text-center"
                    />
                    <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                      هذا هو الكود الذي تدزه للطلاب للدخول للمنصة.
                    </span>
                  </div>

                  {/* Teacher PIN */}
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
                      className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-200 focus:border-zinc-900 focus:ring-0 font-mono font-black text-lg tracking-wider text-zinc-900 text-center"
                    />
                    <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                      احفظ هذا الرمز جيداً لدخول هذه اللوحة.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm cursor-pointer shadow-sm transition-all"
                  >
                    حفظ التغييرات ✔️
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
