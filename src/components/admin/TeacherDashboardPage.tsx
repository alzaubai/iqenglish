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
  BookMarked,
  Play,
  Pause,
  Shuffle,
  AlertCircle,
  FileDown,
  Printer,
  Copy,
  Check,
  UserX,
  X,
  Trash2,
  RefreshCw,
  Sparkles,
  BarChart3,
  PenTool,
  Sliders,
  Calendar,
  Award,
  History,
  Activity,
  Eye,
} from 'lucide-react';
import {
  PlatformConfig,
  updatePlatformConfig,
  QuickExam,
  saveOrUpdateExam,
  listenToSubmissions,
  listenToAllSubmissions,
  ExamSubmission,
  listenToActiveExam,
  StudentSession,
  listenToAllStudents,
  deleteStudentFromFirebase,
  generateRandomAccessCode,
  DEFAULT_GRAMMAR_TOPIC_IDS,
  listenToPlatformAnalytics,
} from '../../services/firebase';
import {
  UNIT_1_QUESTION_BANK,
  CategorizedExamQuestion
} from '../../data/defaultExamQuestions';
import { unit1GrammarTopicsList } from '../../data/unit1GrammarTopics';

interface TeacherDashboardPageProps {
  platformConfig: PlatformConfig;
  onBackToSite: () => void;
  isPreAuthenticated?: boolean;
}

export const TeacherDashboardPage: React.FC<TeacherDashboardPageProps> = ({
  platformConfig,
  onBackToSite,
  isPreAuthenticated = false,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(isPreAuthenticated);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'results' | 'builder' | 'lessons' | 'analytics' | 'codes'>('results');
  const [platformAnalytics, setPlatformAnalytics] = useState<{ totalVisits: number }>({ totalVisits: 0 });
  const [analyticsSearchQuery, setAnalyticsSearchQuery] = useState<string>('');
  const [analyticsSectionFilter, setAnalyticsSectionFilter] = useState<string>('all');

  // Submissions State
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [allStudents, setAllStudents] = useState<StudentSession[]>([]);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [searchStudentQuery, setSearchStudentQuery] = useState<string>('');
  const [resultsSubTab, setResultsSubTab] = useState<'submitted' | 'absent' | 'all_students'>('submitted');
  const [studentToDelete, setStudentToDelete] = useState<StudentSession | null>(null);
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  // PDF / Print Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [telegramCopied, setTelegramCopied] = useState(false);
  const [pdfReportMode, setPdfReportMode] = useState<'single' | 'monthly'>('single');
  const [monthlyExamCount, setMonthlyExamCount] = useState<number>(10);
  const [monthlyReportTitle, setMonthlyReportTitle] = useState<string>('سجل درجات الشهر الأول');

  // Student Exam History Detail Modal State
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<{
    studentId?: string;
    studentName: string;
    studentSection: string;
    studentCode?: string;
  } | null>(null);
  const [allHistoricalSubmissions, setAllHistoricalSubmissions] = useState<ExamSubmission[]>([]);

  // Exam Builder State
  const [examTitle, setExamTitle] = useState('الامتحان السريع • الوحدة الأولى');
  const [selectedLessonSources, setSelectedLessonSources] = useState<string[]>([
    'lesson-1',
    'lesson-2',
    'lesson-3',
    'grammar',
  ]);
  const [selectedGrammarTopicSources, setSelectedGrammarTopicSources] = useState<string[]>([
    'topic-past-simple',
    'topic-past-continuous',
    'topic-possessive-pronouns',
    'topic-joining-sentences',
    'topic-interests',
  ]);
  const [questionCountTarget, setQuestionCountTarget] = useState<number>(5);
  const [selectedQuestions, setSelectedQuestions] = useState<CategorizedExamQuestion[]>([]);
  const [isExamActiveLocal, setIsExamActiveLocal] = useState(false);
  const [builderStatusMsg, setBuilderStatusMsg] = useState<string | null>(null);

  // Master Code / PIN Edit State
  const [newMasterCode, setNewMasterCode] = useState(platformConfig.masterCode || 'IQ-2026');
  const [newTeacherPin, setNewTeacherPin] = useState(platformConfig.teacherPin || '2026');
  const [settingsSaveMsg, setSettingsSaveMsg] = useState<string | null>(null);

  // Local optimistic lock states to eliminate race conditions and stale closure reverts
  const [localUnlockedLessons, setLocalUnlockedLessons] = useState<string[]>(
    () => platformConfig.unlockedLessons || ['lesson-1']
  );
  const [localUnlockedGrammarTopics, setLocalUnlockedGrammarTopics] = useState<string[]>(
    () => platformConfig.unlockedGrammarTopics || ['topic-past-simple']
  );

  // Keep local lock state in sync with platformConfig when updated
  useEffect(() => {
    if (platformConfig.unlockedLessons && platformConfig.unlockedLessons.length > 0) {
      setLocalUnlockedLessons(platformConfig.unlockedLessons);
    }
  }, [platformConfig.unlockedLessons]);

  useEffect(() => {
    if (platformConfig.unlockedGrammarTopics && platformConfig.unlockedGrammarTopics.length > 0) {
      setLocalUnlockedGrammarTopics(platformConfig.unlockedGrammarTopics);
    }
  }, [platformConfig.unlockedGrammarTopics]);

  // Listen to all registered students (only after PIN authentication)
  useEffect(() => {
    if (!isAuthenticated) {
      setAllStudents([]);
      return;
    }

    const unsub = listenToAllStudents((studentsList) => {
      setAllStudents(studentsList);
    });

    return () => unsub();
  }, [isAuthenticated]);

  // Listen to submissions for the current active exam (only after PIN authentication)
  useEffect(() => {
    if (!isAuthenticated || !platformConfig.activeExamId) {
      setSubmissions([]);
      return;
    }

    const unsub = listenToSubmissions(platformConfig.activeExamId, (list) => {
      setSubmissions(list);
    });

    return () => unsub();
  }, [isAuthenticated, platformConfig.activeExamId]);

  // Listen to all submissions across all exams (for student history modal & monthly grade sheet)
  useEffect(() => {
    if (!isAuthenticated) {
      setAllHistoricalSubmissions([]);
      return;
    }

    const unsub = listenToAllSubmissions((list) => {
      setAllHistoricalSubmissions(list);
    });

    return () => unsub();
  }, [isAuthenticated]);

  // Listen to platform-wide analytics
  useEffect(() => {
    if (!isAuthenticated) return;
    const unsub = listenToPlatformAnalytics((data) => {
      setPlatformAnalytics(data);
    });
    return () => unsub();
  }, [isAuthenticated]);

  // Sync active exam state (only after PIN authentication)
  useEffect(() => {
    if (!isAuthenticated || !platformConfig.activeExamId) return;

    const unsub = listenToActiveExam(platformConfig.activeExamId, (exam) => {
      if (exam) {
        setIsExamActiveLocal(exam.isActive);
        setExamTitle(exam.title);
        if (selectedQuestions.length === 0 && exam.questions?.length > 0) {
          setSelectedQuestions(exam.questions as CategorizedExamQuestion[]);
        }
      }
    });

    return () => unsub();
  }, [isAuthenticated, platformConfig.activeExamId]);

  // Generate initial questions if list is empty
  useEffect(() => {
    if (selectedQuestions.length === 0) {
      handleGenerateQuestions();
    }
  }, []);

  // Handle PIN Submission
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Only accept the configured PIN - no hardcoded backdoor fallback
    const correctPin = platformConfig.teacherPin || '2026';
    if (pinInput.trim() === correctPin) {
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

  // Toggle Grammar Topic Source in Builder
  const handleToggleGrammarTopicSource = (topicKey: string) => {
    if (selectedGrammarTopicSources.includes(topicKey)) {
      if (selectedGrammarTopicSources.length > 1) {
        setSelectedGrammarTopicSources(
          selectedGrammarTopicSources.filter((k) => k !== topicKey)
        );
      }
    } else {
      setSelectedGrammarTopicSources([...selectedGrammarTopicSources, topicKey]);
    }
  };

  // Generate Questions from Selected Sources (incorporating specific grammar topics)
  const handleGenerateQuestions = () => {
    const availablePool = UNIT_1_QUESTION_BANK.filter((q) => {
      if (q.lessonId === 'grammar') {
        return (
          selectedLessonSources.includes('grammar') &&
          (!q.grammarTopicId || selectedGrammarTopicSources.includes(q.grammarTopicId))
        );
      }
      return selectedLessonSources.includes(q.lessonId);
    });

    const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, questionCountTarget);
    setSelectedQuestions(picked);
  };

  // Swap a single question with another unused question
  const handleSwapSingleQuestion = (indexToSwap: number) => {
    const currentQ = selectedQuestions[indexToSwap];
    if (!currentQ) return;
    const currentSelectedIds = selectedQuestions.filter(Boolean).map((q) => q.id);

    const candidates = UNIT_1_QUESTION_BANK.filter((q) => {
      if (currentSelectedIds.includes(q.id)) return false;
      if (q.lessonId === 'grammar') {
        return (
          selectedLessonSources.includes('grammar') &&
          (!q.grammarTopicId || selectedGrammarTopicSources.includes(q.grammarTopicId))
        );
      }
      return selectedLessonSources.includes(q.lessonId);
    });

    const sameLessonCandidates = candidates.filter((q) => q.lessonId === currentQ.lessonId);
    const pool = sameLessonCandidates.length > 0 ? sameLessonCandidates : candidates;

    if (pool.length > 0) {
      const newQuestion = pool[Math.floor(Math.random() * pool.length)];
      const updatedList = [...selectedQuestions];
      updatedList[indexToSwap] = newQuestion;
      setSelectedQuestions(updatedList);
    } else {
      setBuilderStatusMsg('لا يوجد أسئلة بديلة أخرى في هذا الموضوع حالياً.');
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
          ? 'تم اعتماد الأسئلة وإطلاق الامتحان للطلاب بنجاح'
          : 'تم إيقاف وقفل الامتحان عن الطلاب'
      );
      setTimeout(() => setBuilderStatusMsg(null), 4000);
    } catch (err) {
      console.error(err);
      setBuilderStatusMsg('حدث خطأ أثناء الاتصال بقاعدة البيانات.');
    }
  };

  // Toggle Lesson Access (Airtight functional updater with immediate Firebase & cache persistence)
  const handleToggleLessonAccess = async (lessonId: string) => {
    setLocalUnlockedLessons((prev) => {
      const isCurrentlyUnlocked = prev.includes(lessonId);
      const updated = isCurrentlyUnlocked
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];

      updatePlatformConfig({ unlockedLessons: updated }).catch(console.error);
      return updated;
    });
  };

  const handleUnlockAll = async () => {
    const all = Array.from({ length: 10 }, (_, i) => `lesson-${i + 1}`);
    setLocalUnlockedLessons(all);
    await updatePlatformConfig({ unlockedLessons: all });
  };

  const handleLockAllExcept1 = async () => {
    const only1 = ['lesson-1'];
    setLocalUnlockedLessons(only1);
    await updatePlatformConfig({ unlockedLessons: only1 });
  };

  // Toggle Grammar Topic Access (Airtight functional updater with immediate Firebase & cache persistence)
  const handleToggleGrammarTopicAccess = async (topicId: string) => {
    setLocalUnlockedGrammarTopics((prev) => {
      const isCurrentlyUnlocked = prev.includes(topicId);
      const updated = isCurrentlyUnlocked
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];

      updatePlatformConfig({ unlockedGrammarTopics: updated }).catch(console.error);
      return updated;
    });
  };

  const handleUnlockAllGrammarTopics = async () => {
    const all = [...DEFAULT_GRAMMAR_TOPIC_IDS];
    setLocalUnlockedGrammarTopics(all);
    await updatePlatformConfig({ unlockedGrammarTopics: all });
  };

  const handleLockAllGrammarTopicsExcept1 = async () => {
    const only1 = ['topic-past-simple'];
    setLocalUnlockedGrammarTopics(only1);
    await updatePlatformConfig({ unlockedGrammarTopics: only1 });
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePlatformConfig({
        masterCode: newMasterCode.trim().toUpperCase(),
        teacherPin: newTeacherPin.trim(),
      });
      setSettingsSaveMsg('تم حفظ وتحديث كود التفعيل والرمز السري بنجاح');
      setTimeout(() => setSettingsSaveMsg(null), 3000);
    } catch {
      setSettingsSaveMsg('تعذر الحفظ، يرجى المحاولة ثانية.');
    }
  };

  // Generate a fresh random code
  const handleGenerateNewCode = async () => {
    const freshCode = generateRandomAccessCode();
    setNewMasterCode(freshCode);
    try {
      await updatePlatformConfig({ masterCode: freshCode });
      setSettingsSaveMsg(`تم توليد واعتماد كود تفعيل جديد بنجاح: ${freshCode}`);
      setTimeout(() => setSettingsSaveMsg(null), 4000);
    } catch {
      setSettingsSaveMsg('حدث خطأ أثناء حفظ الكود الجديد.');
    }
  };

  // Copy code to clipboard
  const handleCopyCode = (codeToCopy: string) => {
    navigator.clipboard.writeText(codeToCopy);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  // Confirm delete student & add them to per-student ban list (only they are blocked, not the code globally)
  const handleConfirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    setIsDeletingStudent(true);
    try {
      await deleteStudentFromFirebase(
        studentToDelete.id,
        studentToDelete.code,
        studentToDelete.fullName // Pass name for per-student ban tracking
      );
      setStudentToDelete(null);
    } catch (err) {
      console.error(err);
      alert('تعذر حذف الطالب، يرجى المحاولة ثانية.');
    } finally {
      setIsDeletingStudent(false);
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

  // Filter Registered Students by Section & Search
  const filteredRegisteredStudents = allStudents.filter((student) => {
    const matchesSection =
      selectedSectionFilter === 'all' || student.section === selectedSectionFilter;
    const matchesSearch =
      !searchStudentQuery.trim() ||
      student.fullName.toLowerCase().includes(searchStudentQuery.toLowerCase().trim());
    return matchesSection && matchesSearch;
  });

  // Submitted student names set (lowercased)
  const submittedStudentNames = new Set(
    filteredSubmissions.map((s) => s.studentName.trim().toLowerCase())
  );

  // Absent students = registered students who have not submitted yet
  const absentStudents = filteredRegisteredStudents.filter(
    (student) => !submittedStudentNames.has(student.fullName.trim().toLowerCase())
  );

  const totalRegisteredCount = filteredRegisteredStudents.length;
  const totalSubmissions = filteredSubmissions.length;
  const totalAbsentCount = absentStudents.length;
  const participationRate =
    totalRegisteredCount > 0
      ? Math.round((totalSubmissions / totalRegisteredCount) * 100)
      : 0;

  const avgScore =
    totalSubmissions > 0
      ? (
          filteredSubmissions.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
          totalSubmissions
        ).toFixed(1)
      : '0';

  const topScore =
    totalSubmissions > 0 ? Math.max(...filteredSubmissions.map((s) => s.score)) : 0;

  // Analytics Computations
  const nowMillis = Date.now();
  const isStudentOnline = (st: StudentSession) => {
    if (!st.lastSeenAt) return false;
    let millis = 0;
    if (typeof st.lastSeenAt === 'number') millis = st.lastSeenAt;
    else if (st.lastSeenAt.toMillis) millis = st.lastSeenAt.toMillis();
    else if (st.lastSeenAt.seconds) millis = st.lastSeenAt.seconds * 1000;
    else millis = new Date(st.lastSeenAt).getTime();
    return !isNaN(millis) && nowMillis - millis <= 5 * 60 * 1000;
  };

  const onlineStudentsCount = allStudents.filter(isStudentOnline).length;
  const totalTimeSpentAllMinutes = allStudents.reduce(
    (sum, st) => sum + (st.totalTimeSpentMinutes || 0),
    0
  );
  const avgTimeSpentMinutes =
    allStudents.length > 0
      ? Math.round(totalTimeSpentAllMinutes / allStudents.length)
      : 0;
  const totalVisitsCount = Math.max(
    platformAnalytics.totalVisits || 0,
    allStudents.reduce((sum, st) => sum + (st.visitCount || 1), 0)
  );

  const formatLastSeen = (lastSeen: any) => {
    if (!lastSeen) return 'غير مسجل';
    let date: Date;
    if (typeof lastSeen === 'number') date = new Date(lastSeen);
    else if (lastSeen.toMillis) date = new Date(lastSeen.toMillis());
    else if (lastSeen.seconds) date = new Date(lastSeen.seconds * 1000);
    else date = new Date(lastSeen);

    if (isNaN(date.getTime())) return 'غير مسجل';
    const diffMinutes = Math.round((Date.now() - date.getTime()) / (1000 * 60));
    if (diffMinutes < 5) return 'متصل الآن';
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    if (diffMinutes < 1440) return `منذ ${Math.round(diffMinutes / 60)} ساعة`;
    return date.toLocaleDateString('ar-IQ', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatStudyDuration = (minutes: number = 0) => {
    if (!minutes || minutes < 1) return 'أقل من دقيقة';
    if (minutes < 60) return `${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours} س و ${remainingMins} د` : `${hours} ساعة`;
  };

  // Filtered Students for Analytics Table
  const filteredAnalyticsStudents = allStudents.filter((student) => {
    const matchesSection =
      analyticsSectionFilter === 'all' || student.section === analyticsSectionFilter;
    const matchesSearch =
      !analyticsSearchQuery.trim() ||
      student.fullName.toLowerCase().includes(analyticsSearchQuery.toLowerCase().trim());
    return matchesSection && matchesSearch;
  });

  // Copy Telegram Summary Text
  const handleCopyTelegramSummary = () => {
    const sectionName = selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`;
    const dateStr = new Date().toLocaleDateString('ar-IQ');

    let text = `تقرير الامتحان اليومي • الأول المتوسط\n`;
    text += `إشراف مدرس المادة: أ. حسام محمود منصور\n`;
    text += `الامتحان: ${examTitle}\n`;
    text += `الشعبة: ${sectionName}\n`;
    text += `التاريخ: ${dateStr}\n`;
    text += `───────────────\n`;
    text += `المسجلين: ${totalRegisteredCount} طالب\n`;
    text += `الممتحنون: ${totalSubmissions} طالب (${participationRate}%)\n`;
    text += `الغائبون: ${totalAbsentCount} طالب\n`;
    text += `متوسط الدرجات: ${avgScore} / 10\n`;
    text += `───────────────\n`;
    text += `كشف الدرجات:\n`;

    filteredSubmissions.forEach((sub, i) => {
      text += `${i + 1}. ${sub.studentName} (${sub.studentSection}): ${sub.score}/${sub.totalPoints}\n`;
    });

    if (absentStudents.length > 0) {
      text += `\nالطلاب الذين لم يمتحنوا بعد:\n`;
      absentStudents.forEach((st, i) => {
        text += `${i + 1}. ${st.fullName} (شعبة ${st.section})\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setTelegramCopied(true);
    setTimeout(() => setTelegramCopied(false), 3000);
  };

  // Export Monthly Grade Sheet to CSV/Excel
  const handleExportExcel = () => {
    const BOM = '\uFEFF';
    let csv = `كشف درجات: ${monthlyReportTitle}\n`;
    csv += `مدرس المادة: أ. حسام محمود منصور\n`;
    csv += `الشعبة: ${selectedSectionFilter === 'all' ? 'جميع الشُعب' : 'شعبة ' + selectedSectionFilter}\n`;
    csv += `التاريخ: ${new Date().toLocaleDateString('ar-IQ')}\n\n`;

    const headers = ['ت', 'اسم الطالب', 'الشعبة'];
    for (let i = 1; i <= monthlyExamCount; i++) {
      headers.push(`الامتحان ${i}`);
    }
    headers.push('معدل السعي');
    headers.push('الملاحظات');
    csv += headers.join(',') + '\n';

    filteredRegisteredStudents.forEach((st, idx) => {
      const stSubs = allHistoricalSubmissions
        .filter((s) => {
          const matchId = st.id && s.studentId && s.studentId === st.id;
          const matchName =
            s.studentName.trim().toLowerCase() === st.fullName.trim().toLowerCase();
          return matchId || matchName;
        })
        .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

      const attendedScores = stSubs.map((s) => (s.score / s.totalPoints) * 10);
      const avgCalc =
        attendedScores.length > 0
          ? (
              attendedScores.reduce((acc, curr) => acc + curr, 0) /
              attendedScores.length
            ).toFixed(1)
          : '—';

      const row = [idx + 1, `"${st.fullName}"`, `"${st.section}"`];
      for (let i = 0; i < monthlyExamCount; i++) {
        const subForSlot = stSubs[i];
        if (subForSlot) {
          row.push(Math.round((subForSlot.score / subForSlot.totalPoints) * 10).toString());
        } else {
          row.push('—');
        }
      }
      row.push(avgCalc);
      row.push(
        attendedScores.length === 0
          ? 'لم يمتحن'
          : attendedScores.length >= monthlyExamCount
          ? 'مكتمل'
          : `امتحن (${attendedScores.length}/${monthlyExamCount})`
      );
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${monthlyReportTitle}_${selectedSectionFilter}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-700 selection:text-white" dir="rtl">
      {/* Top Header of Teacher Dashboard */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-xs font-sans">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                لوحة تحكم أستاذ المادة
              </h1>
              <span className="text-xs text-slate-500 font-arabic block">
                مدرس المادة: أ. حسام محمود منصور • إدارة المنهاج والامتحانات والدرجات
              </span>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            className="py-2 px-3 sm:px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shadow-2xs"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى المنهاج / الدرس</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* ======================================================== */}
        {/* GATE: IF NOT AUTHENTICATED WITH PIN                      */}
        {/* ======================================================== */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-5 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border border-slate-300 shadow-2xs">
              <Lock className="w-7 h-7 text-slate-700" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 font-arabic">
                تأكيد هوية أستاذ المادة
              </h2>
              <p className="text-xs text-slate-500 font-arabic mt-1">
                يرجى إدخال رمز المرور السري (PIN) للدخول إلى لوحة التحكم
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4 text-right">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-arabic">
                  الرمز السري (PIN):
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  placeholder="2026"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-slate-800 placeholder:text-slate-300 transition-colors"
                  autoFocus
                />
                <span className="text-[11px] text-slate-400 font-arabic block pt-0.5">
                  الرمز الافتراضي هو: <strong className="font-mono text-slate-600">2026</strong>
                </span>
              </div>

              {pinError && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-slate-700" />
                  <span>الرمز السري غير صحيح، يرجى المحاولة ثانية.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>دخول لوحة التحكم</span>
              </button>
            </form>
          </div>
        ) : (
          /* ======================================================== */
          /* AUTHENTICATED TEACHER DASHBOARD PAGE                     */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Top Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1">
              {[
                { id: 'results', label: 'نتائج الطلاب والدرجات', icon: BarChart3, count: totalSubmissions },
                { id: 'builder', label: 'صانع الامتحانات التفاعلي', icon: PenTool, activeBadge: isExamActiveLocal },
                { id: 'lessons', label: 'التحكم بالدروس والقواعد', icon: BookOpen },
                {
                  id: 'analytics',
                  label: 'إحصائيات المنصة والزيارات',
                  icon: Activity,
                  count: onlineStudentsCount > 0 ? `${onlineStudentsCount} متصل` : undefined,
                },
                { id: 'codes', label: 'الأكواد والرمز السري', icon: KeyRound },
              ].map((t) => {
                const IconComponent = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-arabic ${
                      activeTab === t.id
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{t.label}</span>
                    {t.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        activeTab === t.id ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {t.count}
                      </span>
                    )}
                    {t.activeBadge && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* TAB 1: LIVE RESULTS & STUDENT GRADES WITH ABSENTEES & PDF */}
            {/* ======================================================== */}
            {activeTab === 'results' && (
              <div className="space-y-5 text-right">
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">الطلاب المسجلين</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
                      {totalRegisteredCount}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">في الشعبة المختارة</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">الطلاب الممتحنون</span>
                    <strong className="text-2xl font-bold text-emerald-700 font-mono block mt-1">
                      {totalSubmissions}
                    </strong>
                    <span className="text-[10px] text-emerald-600 font-arabic block mt-0.5 font-bold">
                      نسبة المشاركة: {participationRate}%
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">الطلاب الغائبون (لم يمتحنوا)</span>
                    <strong className={`text-2xl font-bold font-mono block mt-1 ${totalAbsentCount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {totalAbsentCount}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">لم يسلموا الإجابة بعد</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">متوسط الدرجات</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
                      {avgScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">
                      أعلى درجة: {topScore}
                    </span>
                  </div>
                </div>

                {/* Filters & Actions Bar */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchStudentQuery}
                      onChange={(e) => setSearchStudentQuery(e.target.value)}
                      placeholder="ابحث باسم الطالب..."
                      className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 font-arabic focus:border-slate-800 focus:ring-0"
                    />
                  </div>

                  {/* Section Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                    <span className="text-xs text-slate-500 font-arabic pl-1 whitespace-nowrap">
                      الشعبة:
                    </span>
                    {['all', 'أ', 'ب', 'ج', 'د', 'هـ'].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setSelectedSectionFilter(sec)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-arabic ${
                          selectedSectionFilter === sec
                            ? 'bg-slate-800 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {sec === 'all' ? 'الكل' : `شعبة ${sec}`}
                      </button>
                    ))}
                  </div>

                  {/* PDF Export & Telegram Copy Buttons */}
                  <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    <button
                      onClick={handleCopyTelegramSummary}
                      className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shadow-2xs"
                      title="نسخ ملخص النتائج لنشره في قناة التيليكرام"
                    >
                      {telegramCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>ملخص التيليكرام</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setIsPdfModalOpen(true)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shadow-xs"
                      title="تصدير كشف درجات الطلاب كملف PDF قابل للطباعة"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>تصدير PDF</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Tabs: Submitted Students vs Absent Students */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setResultsSubTab('submitted')}
                    className={`py-2 px-4 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer ${
                      resultsSubTab === 'submitted'
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>الطلاب الممتحنون ({totalSubmissions})</span>
                  </button>

                  <button
                    onClick={() => setResultsSubTab('absent')}
                    className={`py-2 px-4 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer ${
                      resultsSubTab === 'absent'
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <UserX className="w-4 h-4" />
                    <span>الطلاب غير الممتحنين / الغياب ({totalAbsentCount})</span>
                  </button>

                  <button
                    onClick={() => setResultsSubTab('all_students')}
                    className={`py-2 px-4 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer ${
                      resultsSubTab === 'all_students'
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>تسلسل الطلاب المسجلين ({totalRegisteredCount})</span>
                  </button>
                </div>

                {/* SUBTAB A: SUBMITTED STUDENTS TABLE */}
                {resultsSubTab === 'submitted' && (
                  <>
                    {filteredSubmissions.length === 0 ? (
                      <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                        <Users className="w-10 h-10 text-slate-300 mx-auto" />
                        <h4 className="text-sm font-bold text-slate-700 font-arabic">
                          لا توجد درجات مسجلة في هذا القسم حتى الآن
                        </h4>
                        <p className="text-xs text-slate-400 font-arabic max-w-sm mx-auto">
                          عندما يحل الطلاب الامتحان السريع ستظهر أسماؤهم ودرجاتهم هنا لحظياً.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-slate-50 text-slate-700 font-bold font-arabic border-b border-slate-200">
                              <th className="p-3.5">#</th>
                              <th className="p-3.5">اسم الطالب</th>
                              <th className="p-3.5">الشعبة</th>
                              <th className="p-3.5">كود التفعيل</th>
                              <th className="p-3.5">الدرجة</th>
                              <th className="p-3.5">وقت التسليم</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {filteredSubmissions.map((sub, idx) => (
                              <tr key={sub.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3.5 text-slate-400 font-mono text-xs">{idx + 1}</td>
                                <td className="p-3.5 font-bold font-arabic text-slate-800">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedStudentForHistory({
                                        studentId: sub.studentId,
                                        studentName: sub.studentName,
                                        studentSection: sub.studentSection,
                                        studentCode: sub.studentCode,
                                      })
                                    }
                                    className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 cursor-pointer text-right group transition-colors"
                                    title="انقر لعرض سجل جميع الامتحانات اليومية لهذا الطالب بالتاريخ والدرجات"
                                  >
                                    <span>{sub.studentName}</span>
                                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 opacity-80 group-hover:opacity-100 font-normal">
                                      سجل الامتحانات
                                    </span>
                                  </button>
                                </td>
                                <td className="p-3.5 font-bold font-arabic">
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                    شعبة {sub.studentSection}
                                  </span>
                                </td>
                                <td className="p-3.5 font-mono text-xs text-slate-500 uppercase">
                                  {sub.studentCode}
                                </td>
                                <td className="p-3.5">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-300">
                                    {sub.score} / {sub.totalPoints}
                                  </span>
                                </td>
                                <td className="p-3.5 text-xs text-slate-500 font-arabic">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{new Date(sub.submittedAt).toLocaleTimeString('ar-IQ')}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {/* SUBTAB B: ABSENT STUDENTS TABLE (NOT YET SUBMITTED) */}
                {resultsSubTab === 'absent' && (
                  <>
                    {absentStudents.length === 0 ? (
                      <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                        <h4 className="text-sm font-bold text-slate-800 font-arabic">
                          ممتاز! جميع طلاب هذه الشعبة قد أكملوا الامتحان بنجاح
                        </h4>
                        <p className="text-xs text-slate-400 font-arabic max-w-sm mx-auto">
                          نسبة الحضور 100%، لا يوجد طلاب غائبون في القائمة.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-rose-50/70 text-rose-900 font-bold font-arabic border-b border-rose-200">
                              <th className="p-3.5">#</th>
                              <th className="p-3.5">اسم الطالب الغائب</th>
                              <th className="p-3.5">الشعبة</th>
                              <th className="p-3.5">كود التفعيل المسجل</th>
                              <th className="p-3.5">حالة الامتحان</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {absentStudents.map((st, idx) => (
                              <tr key={st.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3.5 text-slate-400 font-mono text-xs">{idx + 1}</td>
                                <td className="p-3.5 font-bold font-arabic text-slate-800">
                                  {st.fullName}
                                </td>
                                <td className="p-3.5 font-bold font-arabic">
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                    شعبة {st.section}
                                  </span>
                                </td>
                                <td className="p-3.5 font-mono text-xs text-slate-500 uppercase">
                                  {st.code}
                                </td>
                                <td className="p-3.5">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-arabic font-bold text-xs bg-rose-50 text-rose-700 border border-rose-200">
                                    لم يؤد الامتحان بعد ⏳
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {/* SUBTAB C: COMPACT SEQUENCED ALL REGISTERED STUDENTS TABLE WITH DELETE */}
                {resultsSubTab === 'all_students' && (
                  <>
                    {filteredRegisteredStudents.length === 0 ? (
                      <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                        <Users className="w-10 h-10 text-slate-300 mx-auto" />
                        <h4 className="text-sm font-bold text-slate-700 font-arabic">
                          لا يوجد طلاب مسجلون في هذا القسم حالياً
                        </h4>
                        <p className="text-xs text-slate-400 font-arabic">
                          عندما يقوم الطلاب بالتسجيل باستخدام كود التفعيل، ستظهر أسماؤهم هنا بتسلسل رقمي
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-arabic">
                          <span>
                            إجمالي الطلاب المسجلين: <strong className="text-slate-800">{filteredRegisteredStudents.length} طالب</strong>
                          </span>
                          <span className="text-[11px] text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">
                            عند حذف أي طالب، يُحظر حساب هذا الطالب فقط ولا يمكنه الدخول مجدداً بنفس الكود القديم
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-right text-xs">
                            <thead>
                              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-arabic font-bold">
                                <th className="p-3 font-mono text-center w-12">#</th>
                                <th className="p-3">اسم الطالب الثلاثي</th>
                                <th className="p-3 text-center">الشعبة</th>
                                <th className="p-3 text-center">كود التفعيل</th>
                                <th className="p-3 text-center">تاريخ الانضمام</th>
                                <th className="p-3 text-center w-24">إجراء الحذف</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                              {filteredRegisteredStudents.map((st, idx) => {
                                const regDate = st.registeredAt
                                  ? new Date(st.registeredAt).toLocaleDateString('ar-IQ', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })
                                  : 'غير محدد';

                                return (
                                  <tr key={st.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-3 text-slate-400 font-mono text-xs text-center font-bold">
                                      {idx + 1}
                                    </td>
                                    <td className="p-3 font-bold font-arabic text-slate-800">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setSelectedStudentForHistory({
                                            studentId: st.id,
                                            studentName: st.fullName,
                                            studentSection: st.section,
                                            studentCode: st.code,
                                          })
                                        }
                                        className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 cursor-pointer text-right group transition-colors"
                                        title="انقر لعرض سجل جميع الامتحانات اليومية لهذا الطالب بالتاريخ والدرجات"
                                      >
                                        <span>{st.fullName}</span>
                                        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 opacity-80 group-hover:opacity-100 font-normal">
                                          سجل الامتحانات
                                        </span>
                                      </button>
                                    </td>
                                    <td className="p-3 font-bold font-arabic text-center">
                                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                                        شعبة {st.section}
                                      </span>
                                    </td>
                                    <td className="p-3 font-mono text-xs text-slate-600 text-center uppercase">
                                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold">
                                        {st.code}
                                      </span>
                                    </td>
                                    <td className="p-3 text-slate-400 font-arabic text-[11px] text-center">
                                      {regDate}
                                    </td>
                                    <td className="p-3 text-center">
                                      <button
                                        type="button"
                                        onClick={() => setStudentToDelete(st)}
                                        className="py-1 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-arabic font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1 mx-auto"
                                        title={`حذف الطالب ${st.fullName} وإلغاء كوده`}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>حذف</span>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: EXAM BUILDER & SWAPPER                            */}
            {/* ======================================================== */}
            {activeTab === 'builder' && (
              <div className="space-y-6 text-right">
                {/* Exam Title & Master Actions Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1 max-w-md">
                    <label className="text-xs font-bold text-slate-700 font-arabic">
                      عنوان الامتحان السريع:
                    </label>
                    <input
                      type="text"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      placeholder="الامتحان السريع • الوحدة الأولى"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-arabic text-sm text-slate-800 focus:border-slate-800 focus:ring-0"
                    />
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <span className="text-slate-500 font-arabic">حالة الامتحان الآن:</span>
                      <span
                        className={`font-bold font-arabic px-2 py-0.5 rounded-full text-[11px] ${
                          isExamActiveLocal
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {isExamActiveLocal ? 'متاح للطلاب ومباشر الآن' : 'مغلق حالياً'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isExamActiveLocal ? (
                      <button
                        onClick={() => handleSaveAndLaunchExam(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs cursor-pointer font-arabic transition-colors flex items-center gap-1.5"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>إيقاف الامتحان</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveAndLaunchExam(true)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer font-arabic transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>اعتماد وإطلاق الامتحان للطلاب</span>
                      </button>
                    )}
                  </div>
                </div>

                {builderStatusMsg && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic">
                    {builderStatusMsg}
                  </div>
                )}

                {/* Filter Sources & Generator Settings Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-arabic">
                      1. تحديد مصادر الأسئلة (من أي تمارين كتاب النشاط تريد الاختبار؟)
                    </h4>
                    <p className="text-xs text-slate-500 font-arabic mt-0.5">
                      حدد الدروس التي درستها لطلابك ليتم توليد الأسئلة منها حصراً كما هي في كتاب النشاط:
                    </p>
                  </div>

                  {/* Sources Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { id: 'lesson-1', label: 'الدرس 1 (تمارين ص 4)' },
                      { id: 'lesson-2', label: 'الدرس 2 (تمارين ص 6 و 7)' },
                      { id: 'lesson-3', label: 'الدرس 3 (تمارين ص 8 و 9)' },
                      { id: 'lesson-4', label: 'الدرس 4 (تمارين ص 10)' },
                      { id: 'lesson-5', label: 'الدرس 5 (تمارين ص 11 و 12)' },
                      { id: 'grammar', label: 'تمارين القواعد النحوية' },
                    ].map((src) => {
                      const isChecked = selectedLessonSources.includes(src.id);
                      return (
                        <button
                          key={src.id}
                          type="button"
                          onClick={() => handleToggleLessonSource(src.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-arabic transition-all cursor-pointer flex items-center gap-1.5 ${
                            isChecked
                              ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[10px] ${
                            isChecked ? 'border-white bg-white text-slate-900 font-bold' : 'border-slate-300'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span>{src.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Grammar Topics Sub-Selector (when grammar is included) */}
                  {selectedLessonSources.includes('grammar') && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mt-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 font-arabic flex items-center gap-1.5">
                          <BookMarked className="w-4 h-4 text-slate-700" />
                          <span>تحديد المواضيع القواعدية المطلوبة في الامتحان:</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedGrammarTopicSources([
                                'topic-past-simple',
                                'topic-past-continuous',
                                'topic-possessive-pronouns',
                                'topic-joining-sentences',
                                'topic-interests',
                              ])
                            }
                            className="text-[11px] text-blue-600 hover:underline font-arabic cursor-pointer font-bold"
                          >
                            تحديد الكل
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-arabic">
                        اختر فقط مواضيع القواعد التي درستها لطلابك ليتم توليد الأسئلة منها حصراً:
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[
                          { id: 'topic-past-simple', label: '1. الماضي البسيط (Past Simple)' },
                          { id: 'topic-past-continuous', label: '2. الماضي المستمر (Past Continuous)' },
                          { id: 'topic-possessive-pronouns', label: '3. ضمائر وصفات التملك (Pronouns)' },
                          { id: 'topic-joining-sentences', label: '4. أدوات الربط (and / but / or)' },
                          { id: 'topic-interests', label: '5. الاهتمامات والصفات (Interests & -ing)' },
                        ].map((t) => {
                          const isTopicSelected = selectedGrammarTopicSources.includes(t.id);
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => handleToggleGrammarTopicSource(t.id)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-arabic transition-all cursor-pointer flex items-center gap-1.5 ${
                                isTopicSelected
                                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                                  isTopicSelected
                                    ? 'border-white bg-white text-slate-900 font-bold'
                                    : 'border-slate-300'
                                }`}
                              >
                                {isTopicSelected ? '✓' : ''}
                              </span>
                              <span>{t.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Question Count & Re-roll Button */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 font-arabic">
                        عدد الأسئلة:
                      </span>
                      {[5, 8].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setQuestionCountTarget(cnt)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                            questionCountTarget === cnt
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {cnt} أسئلة
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateQuestions}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold font-arabic cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>إعادة توليد نموذج عشوائي</span>
                    </button>
                  </div>
                </div>

                {/* Generated Questions List with "تبديل هذا السؤال" feature */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-sm font-bold text-slate-800 font-arabic">
                      2. مراجعة الأسئلة وتعديلها ({selectedQuestions.length} أسئلة):
                    </h4>
                    <span className="text-xs text-slate-500 font-arabic">
                      اضغط "تبديل" لتغيير أي سؤال لا يعجبك بسؤال بديل فوراً
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedQuestions.filter(Boolean).map((q, idx) => (
                      <div
                        key={(q.id || '') + idx}
                        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 text-left" dir="ltr">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-slate-800 text-white text-xs font-bold flex items-center justify-center font-mono">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-bold text-slate-800 font-sans">
                                {q.questionEn}
                              </span>
                            </div>
                            {q.questionAr && (
                              <p className="text-xs text-slate-500 font-arabic pt-0.5 text-right" dir="rtl">
                                {q.questionAr}
                              </p>
                            )}
                          </div>

                          {/* Swap Button for this specific question */}
                          <button
                            type="button"
                            onClick={() => handleSwapSingleQuestion(idx)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold font-arabic cursor-pointer transition-colors shrink-0 flex items-center gap-1"
                            title="تغيير هذا السؤال بسؤال آخر من كتاب النشاط"
                          >
                            <RotateCcw className="w-3 h-3 text-slate-500" />
                            <span>تبديل السؤال</span>
                          </button>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1" dir="ltr">
                          {(q.options || []).map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg text-xs font-sans text-left flex items-center justify-between border ${
                                opt === q.correctAnswer
                                  ? 'bg-slate-100 font-bold border-slate-400 text-slate-800'
                                  : 'bg-slate-50 border-slate-200 text-slate-600'
                              }`}
                            >
                              <span>{opt}</span>
                              {opt === q.correctAnswer && <span className="text-slate-800 font-bold">✓</span>}
                            </div>
                          ))}
                        </div>

                        {/* Source lesson & exercise reference */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-arabic">
                          <span className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {q.exerciseRef || q.lessonTitleAr}
                            </span>
                          </span>
                          <span className="font-mono font-bold text-slate-600">{q.points || 2} درجات</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final Launch Button */}
                  <div className="pt-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleSaveAndLaunchExam(true)}
                      className="py-3.5 px-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer shadow-xs transition-colors font-arabic inline-flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>اعتماد هذا النموذج وإطلاق الامتحان للطلاب</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: LESSONS & GRAMMAR TOPICS LOCKING / UNLOCKING      */}
            {/* ======================================================== */}
            {activeTab === 'lessons' && (
              <div className="space-y-8 text-right">
                {/* SECTION 1: LESSONS 1-10 */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-700" />
                        <span>أولاً: التحكم بدروس المنهاج (الدروس 1 إلى 10)</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-arabic mt-0.5">
                        يمكنك قفل الدروس المتقدمة حتى لا يسبقك الطلاب في المنهاج، وفتحها تدريجياً حسب تقدمك في الدوام:
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUnlockAll}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
                      >
                        فتح جميع الدروس
                      </button>
                      <button
                        onClick={handleLockAllExcept1}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
                      >
                        قفل الكل (عدا الدرس 1)
                      </button>
                    </div>
                  </div>

                  {/* Lesson Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {Array.from({ length: 10 }, (_, i) => {
                      const lNum = i + 1;
                      const lId = `lesson-${lNum}`;
                      const isUnlocked = localUnlockedLessons.includes(lId);

                      return (
                        <div
                          key={lId}
                          className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                            isUnlocked
                              ? 'bg-white border-slate-200 shadow-2xs'
                              : 'bg-slate-50/70 border-dashed border-slate-300 opacity-80'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-slate-400">
                              Lesson {lNum}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 font-arabic">
                              الدرس {lNum}
                            </h4>
                          </div>

                          <button
                            onClick={() => handleToggleLessonAccess(lId)}
                            className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                              isUnlocked
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
                            }`}
                            title={isUnlocked ? 'قفل هذا الدرس' : 'فتح هذا الدرس'}
                          >
                            {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION 2: GRAMMAR TOPICS 1-5 */}
                <div className="space-y-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-slate-700" />
                        <span>ثانياً: التحكم بالمواضيع القواعدية (قواعد الوحدة الأولى)</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-arabic mt-0.5">
                        يمكنك قفل أو فتح كل موضوع قواعدي بشكل منفصل للتحكم بما يدرسه الطلاب:
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUnlockAllGrammarTopics}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
                      >
                        فتح جميع مواضيع القواعد
                      </button>
                      <button
                        onClick={handleLockAllGrammarTopicsExcept1}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold font-arabic cursor-pointer transition-colors"
                      >
                        قفل الكل (عدا الموضوع 1)
                      </button>
                    </div>
                  </div>

                  {/* Grammar Topics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {unit1GrammarTopicsList.map((topic) => {
                      const isUnlocked = localUnlockedGrammarTopics.includes(topic.id);

                      return (
                        <div
                          key={topic.id}
                          className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                            isUnlocked
                              ? 'bg-white border-slate-200 shadow-2xs'
                              : 'bg-slate-50/70 border-dashed border-slate-300 opacity-80'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-slate-400">
                              Topic 0{topic.number}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 font-arabic">
                              {topic.titleAr}
                            </h4>
                            <span className="text-[11px] text-slate-500 font-sans block" dir="ltr">
                              {topic.titleEn}
                            </span>
                          </div>

                          <button
                            onClick={() => handleToggleGrammarTopicAccess(topic.id)}
                            className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                              isUnlocked
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
                            }`}
                            title={isUnlocked ? 'قفل هذا الموضوع القواعدي' : 'فتح هذا الموضوع القواعدي'}
                          >
                            {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: PLATFORM ANALYTICS & VISITORS (إحصائيات المنصة)  */}
            {/* ======================================================== */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 text-right">
                {/* 1. Header Overview */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
                      <Activity className="w-5 h-5 text-slate-700" />
                      <span>إحصائيات المنصة وتفاعل الطلاب والزيارات</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-arabic mt-0.5">
                      متابعة مباشرة لعدد مرات فتح المنصة، والطلاب المتصلين حالياً، ووقت البقاء الفعلي لكل طالب.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold font-arabic">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>تحديث فوري مباشر</span>
                    </span>
                  </div>
                </div>

                {/* 2. Top Metric Cards (4 Cards) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {/* Card 1: Total Visits */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-arabic">إجمالي الزيارات</span>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-800">
                      {totalVisitsCount}
                    </div>
                    <span className="text-[11px] text-slate-400 font-arabic block">
                      مرات فتح الموقع والتطبيق
                    </span>
                  </div>

                  {/* Card 2: Online Students */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-arabic">المتواجدون الآن</span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-700 flex items-center gap-2">
                      <span>{onlineStudentsCount}</span>
                      <span className="text-xs font-arabic font-normal text-slate-500">طالب متصل</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-arabic block">
                      نشطون خلال آخر 5 دقائق
                    </span>
                  </div>

                  {/* Card 3: Average Session Duration */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-arabic">متوسط وقت البقاء</span>
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-800 font-arabic">
                      {formatStudyDuration(avgTimeSpentMinutes)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-arabic block">
                      متوسط وقت دراسة الطالب
                    </span>
                  </div>

                  {/* Card 4: Total Study Hours */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-arabic">إجمالي وقت الدراسة</span>
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-800 font-arabic">
                      {formatStudyDuration(totalTimeSpentAllMinutes)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-arabic block">
                      مجموع الساعات لجميع الطلاب
                    </span>
                  </div>
                </div>

                {/* 3. Detailed Student Activity Table */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-arabic">
                        سجل نشاط وتواجد الطلاب ({filteredAnalyticsStudents.length} طالب):
                      </h4>
                      <p className="text-xs text-slate-500 font-arabic mt-0.5">
                        يوضح هذا الجدول وقت بقاء كل طالب في المنصة، عدد مرات دخوله، وحالته المباشرة:
                      </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Search */}
                      <div className="relative">
                        <input
                          type="text"
                          value={analyticsSearchQuery}
                          onChange={(e) => setAnalyticsSearchQuery(e.target.value)}
                          placeholder="بحث باسم الطالب..."
                          className="pr-8 pl-3 py-1.5 rounded-xl border border-slate-200 text-xs font-arabic text-slate-700 focus:border-slate-800 focus:ring-0"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                      </div>

                      {/* Section Filter */}
                      <select
                        value={analyticsSectionFilter}
                        onChange={(e) => setAnalyticsSectionFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-arabic text-slate-700 bg-white"
                      >
                        <option value="all">جميع الشُعب</option>
                        {Array.from(new Set(allStudents.map((s) => s.section))).sort().map((sec) => (
                          <option key={sec} value={sec}>
                            شعبة {sec}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-xs text-right border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-arabic">
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">اسم الطالب</th>
                          <th className="p-3 text-center">الشعبة</th>
                          <th className="p-3 text-center">الحالة الآن</th>
                          <th className="p-3">وقت البقاء الإجمالي</th>
                          <th className="p-3 text-center">عدد مرات الدخول</th>
                          <th className="p-3">آخر تواجد</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAnalyticsStudents.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-400 font-arabic">
                              لا يوجد طلاب مسجلون يطابقون خيارات البحث حالياً.
                            </td>
                          </tr>
                        ) : (
                          filteredAnalyticsStudents.map((st, idx) => {
                            const online = isStudentOnline(st);
                            const timeSpent = st.totalTimeSpentMinutes || 0;
                            const visits = st.visitCount || 1;
                            return (
                              <tr key={st.id || idx} className="hover:bg-slate-50/70 transition-colors">
                                <td className="p-3 text-center font-mono text-slate-400 font-bold">
                                  {idx + 1}
                                </td>
                                <td className="p-3 font-bold text-slate-800">
                                  {st.fullName}
                                </td>
                                <td className="p-3 text-center font-bold text-slate-600">
                                  شعبة {st.section}
                                </td>
                                <td className="p-3 text-center">
                                  {online ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px] font-arabic">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                      <span>متصل الآن</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-arabic">
                                      <span>غير متصل</span>
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 font-arabic">
                                  <div className="space-y-1">
                                    <span className="font-bold text-slate-700 font-mono">
                                      {formatStudyDuration(timeSpent)}
                                    </span>
                                    <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-slate-700 rounded-full"
                                        style={{
                                          width: `${Math.min(100, Math.max(5, (timeSpent / 60) * 100))}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3 text-center font-mono font-bold text-slate-700">
                                  {visits} {visits === 1 ? 'مرة' : 'مرات'}
                                </td>
                                <td className="p-3 text-slate-500 font-arabic text-[11px]">
                                  {formatLastSeen(st.lastSeenAt)}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: CODES & PIN SETTINGS                              */}
            {/* ======================================================== */}
            {activeTab === 'codes' && (
              <div className="space-y-5 text-right">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 max-w-xl mx-auto space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-arabic">
                      إعدادات كود التفعيل والرمز السري للأستاذ
                    </h3>
                    <p className="text-xs text-slate-500 font-arabic mt-0.5">
                      يمكنك تغيير كود تفعيل الطلاب أو الرمز السري الخاص بك في أي وقت:
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-slate-600" />
                        <span>كود تفعيل الطلاب الرئيسي:</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newMasterCode}
                          onChange={(e) => setNewMasterCode(e.target.value)}
                          placeholder="IQ-2026"
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:border-slate-800 focus:ring-0 uppercase tracking-wider"
                        />
                        <button
                          type="button"
                          onClick={handleGenerateNewCode}
                          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shrink-0 shadow-2xs"
                          title="توليد كود تفعيل عشوائي جديد بضغطة زر"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>توليد كود جديد</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(newMasterCode)}
                          className="px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer font-arabic transition-colors shrink-0"
                          title="نسخ الكود لمشاركته مع الطلاب"
                        >
                          {codeCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-arabic">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="font-arabic">نسخ</span>
                            </>
                          )}
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-400 font-arabic block">
                        هذا هو الكود الفعّال الذي ترسله لطلابك ليسجلوا به في المنصة.
                      </span>

                      {/* Display revoked codes if any */}
                      {platformConfig.revokedCodes && platformConfig.revokedCodes.length > 0 && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-arabic space-y-1.5 mt-2">
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="font-bold flex items-center gap-1">
                              <UserX className="w-3.5 h-3.5 text-rose-500" />
                              الأكواد الملغاة والمحظورة ({platformConfig.revokedCodes.length} كود):
                            </span>
                            <span className="text-[10px] text-slate-400">لا يمكن الدخول بهذه الأكواد</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {platformConfig.revokedCodes.map((rc, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-rose-50 text-rose-700 border border-rose-200 line-through"
                              >
                                {rc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-600" />
                        <span>الرمز السري للأستاذ (PIN):</span>
                      </label>
                      <input
                        type="text"
                        value={newTeacherPin}
                        onChange={(e) => setNewTeacherPin(e.target.value)}
                        placeholder="2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:border-slate-800 focus:ring-0"
                      />
                      <span className="text-[11px] text-slate-400 font-arabic block">
                        الرمز الذي يفتح لك لوحة التحكم هذه ويمنحك صلاحية الأستاذ.
                      </span>
                    </div>

                    {settingsSaveMsg && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic">
                        {settingsSaveMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic"
                    >
                      حفظ التغييرات
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* STUDENT EXAM HISTORY DETAIL MODAL                        */}
      {/* ======================================================== */}
      {selectedStudentForHistory && (() => {
        const studentExams = allHistoricalSubmissions.filter((sub) => {
          const matchId =
            selectedStudentForHistory.studentId &&
            sub.studentId &&
            sub.studentId === selectedStudentForHistory.studentId;
          const matchName =
            sub.studentName.trim().toLowerCase() ===
            selectedStudentForHistory.studentName.trim().toLowerCase();
          return matchId || matchName;
        });

        const totalExams = studentExams.length;
        const avgStudentScore =
          totalExams > 0
            ? (
                studentExams.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
                totalExams
              ).toFixed(1)
            : '0';

        const topStudentScore =
          totalExams > 0 ? Math.max(...studentExams.map((s) => s.score)) : 0;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
            dir="rtl"
          >
            <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="bg-slate-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-arabic">
                      سجل الامتحانات اليومية الكامل للطالب
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-arabic pt-0.5">
                      <span className="font-bold text-white">{selectedStudentForHistory.studentName}</span>
                      <span>•</span>
                      <span>شعبة {selectedStudentForHistory.studentSection}</span>
                      {selectedStudentForHistory.studentCode && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-slate-400 uppercase">كود: {selectedStudentForHistory.studentCode}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStudentForHistory(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-header with teacher attribution */}
              <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-arabic">
                <span>إشراف مدرس المادة: <strong>أ. حسام محمود منصور</strong></span>
                <span>الصف: <strong>الأول المتوسط</strong></span>
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-right">
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-arabic">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">إجمالي الامتحانات</span>
                    <strong className="text-base font-bold text-slate-800 font-mono">{totalExams}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">متوسط الدرجات</span>
                    <strong className="text-base font-bold text-emerald-700 font-mono">{avgStudentScore} / 10</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">أعلى درجة</span>
                    <strong className="text-base font-bold text-blue-700 font-mono">{topStudentScore}</strong>
                  </div>
                </div>

                {/* Exams List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 font-arabic flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span>تفاصيل الامتحانات اليومية المؤداة:</span>
                  </h4>

                  {totalExams === 0 ? (
                    <div className="py-10 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <p className="text-xs text-slate-500 font-arabic font-bold">
                        لا توجد درجات مسجلة لهذا الطالب في قاعدة البيانات حتى الآن.
                      </p>
                      <p className="text-[11px] text-slate-400 font-arabic">
                        عندما يؤدي الطالب أي امتحان سريع ستظهر نتيجته وتاريخه هنا مباشرة.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <table className="w-full text-right text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold font-arabic border-b border-slate-200">
                            <th className="p-3 font-mono text-center w-10">#</th>
                            <th className="p-3">عنوان الامتحان</th>
                            <th className="p-3">اليوم والتاريخ الكامل</th>
                            <th className="p-3 text-center">الوقت</th>
                            <th className="p-3 text-center">الدرجة</th>
                            <th className="p-3 text-center">النسبة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {studentExams.map((ex, idx) => {
                            const dateObj = new Date(ex.submittedAt);
                            const dayName = dateObj.toLocaleDateString('ar-IQ', { weekday: 'long' });
                            const fullDate = dateObj.toLocaleDateString('ar-IQ', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            });
                            const timeStr = dateObj.toLocaleTimeString('ar-IQ', {
                              hour: '2-digit',
                              minute: '2-digit',
                            });
                            const percent = Math.round((ex.score / ex.totalPoints) * 100);

                            return (
                              <tr key={ex.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3 font-mono text-slate-400 text-center font-bold">{idx + 1}</td>
                                <td className="p-3 font-bold font-arabic text-slate-800">
                                  {ex.examTitle || 'الامتحان السريع'}
                                </td>
                                <td className="p-3 font-arabic text-slate-600">
                                  <span className="font-bold text-slate-800 ml-1">{dayName}</span>
                                  <span className="text-[11px] text-slate-500">({fullDate})</span>
                                </td>
                                <td className="p-3 font-arabic text-slate-500 text-center text-[11px]">
                                  {timeStr}
                                </td>
                                <td className="p-3 text-center font-mono font-bold text-slate-900">
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                                    {ex.score} / {ex.totalPoints}
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono ${
                                      percent >= 80
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : percent >= 50
                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                    }`}
                                  >
                                    {percent}%
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-arabic">
                  مدرس المادة: أ. حسام محمود منصور
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedStudentForHistory(null)}
                  className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer font-arabic transition-colors"
                >
                  إغلاق السجل
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ======================================================== */}
      {/* PRINT-READY PDF REPORT & MONTHLY GRADE SHEET MODAL       */}
      {/* ======================================================== */}
      {isPdfModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
          dir="rtl"
        >
          <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <FileDown className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="text-base font-bold font-arabic">
                    {pdfReportMode === 'single'
                      ? 'تقرير درجات الامتحان • الأول المتوسط'
                      : `${monthlyReportTitle} • كشف الامتحانات اليومية`}
                  </h3>
                  <span className="text-xs text-slate-300 font-arabic">
                    {selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {pdfReportMode === 'monthly' && (
                  <button
                    onClick={handleExportExcel}
                    className="py-1.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic shadow-xs transition-colors"
                    title="تصدير كشف الدرجات كملف Excel كامل يحتوي على أسماء جميع الطلاب والدرجات"
                  >
                    <FileDown className="w-4 h-4 text-white" />
                    <span>تصدير Excel</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="py-1.5 px-3.5 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic shadow-xs hover:bg-slate-100 transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-700" />
                  <span>طباعة / حفظ PDF</span>
                </button>

                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Selector and Controls Bar (Hidden in Print) */}
            <div className="bg-slate-100 p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 px-5 print:hidden">
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs font-arabic font-bold">
                <button
                  type="button"
                  onClick={() => setPdfReportMode('single')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    pdfReportMode === 'single'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  كشف الامتحان الحالي
                </button>
                <button
                  type="button"
                  onClick={() => setPdfReportMode('monthly')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    pdfReportMode === 'monthly'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  سجل درجات الشهر المجمع
                </button>
              </div>

              {pdfReportMode === 'monthly' && (
                <div className="flex flex-wrap items-center gap-3 text-xs font-arabic">
                  <div className="flex items-center gap-1.5">
                    <label className="text-slate-600 font-bold">عنوان السجل:</label>
                    <input
                      type="text"
                      value={monthlyReportTitle}
                      onChange={(e) => setMonthlyReportTitle(e.target.value)}
                      placeholder="سجل درجات الشهر الأول"
                      className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs w-44 bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-slate-600 font-bold">عدد الامتحانات اليومية:</label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={monthlyExamCount}
                      onChange={(e) =>
                        setMonthlyExamCount(Math.max(1, Math.min(15, parseInt(e.target.value) || 10)))
                      }
                      className="w-16 px-2 py-1 rounded-lg border border-slate-300 text-center font-mono font-bold bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Printable Document Content (Preview) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-right print:p-0" id="printable-exam-report">
              {/* MODE 1: SINGLE EXAM REPORT */}
              {pdfReportMode === 'single' && (
                <>
                  {/* Document Official Header */}
                  <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-arabic">
                      <span>جمهورية العراق • وزارة التربية</span>
                      <span>الصف الأول المتوسط</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 font-arabic pt-1">
                      كشف نتائج ودرجات الامتحان اليومي لمادة اللغة الإنجليزية
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-arabic pt-1">
                      <span>الامتحان: <strong>{examTitle}</strong></span>
                      <span>الشعبة: <strong>{selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`}</strong></span>
                      <span>مدرس المادة: <strong>أ. حسام محمود منصور</strong></span>
                      <span>التاريخ: <strong>{new Date().toLocaleDateString('ar-IQ')}</strong></span>
                    </div>
                  </div>

                  {/* Statistical Summary Box */}
                  <div className="grid grid-cols-4 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs font-arabic">
                    <div>
                      <span className="text-[11px] text-slate-500 block">عدد المسجلين</span>
                      <strong className="text-base font-bold text-slate-800 font-mono">{totalRegisteredCount}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">عدد الممتحنين</span>
                      <strong className="text-base font-bold text-emerald-700 font-mono">{totalSubmissions}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">عدد الغائبين</span>
                      <strong className="text-base font-bold text-rose-600 font-mono">{totalAbsentCount}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">متوسط الدرجة</span>
                      <strong className="text-base font-bold text-slate-800 font-mono">{avgScore} / 10</strong>
                    </div>
                  </div>

                  {/* Table 1: Attendees and Scores */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-800 font-arabic flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>أولاً: قائمة الطلاب الممتحنين والدرجات ({totalSubmissions} طالب):</span>
                    </h4>

                    {filteredSubmissions.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3 font-arabic">لا يوجد ممتحنون في هذه الشعبة.</p>
                    ) : (
                      <div className="rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-right text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold font-arabic border-b border-slate-200">
                              <th className="p-2.5">ت</th>
                              <th className="p-2.5">اسم الطالب</th>
                              <th className="p-2.5">الشعبة</th>
                              <th className="p-2.5">الدرجة النهائية</th>
                              <th className="p-2.5">وقت التسليم</th>
                              <th className="p-2.5">التقييم</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {filteredSubmissions.map((sub, idx) => (
                              <tr key={sub.id || idx}>
                                <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                                <td className="p-2.5 font-bold font-arabic text-slate-800">{sub.studentName}</td>
                                <td className="p-2.5 font-arabic">شعبة {sub.studentSection}</td>
                                <td className="p-2.5 font-bold font-mono text-slate-900">
                                  {sub.score} / {sub.totalPoints}
                                </td>
                                <td className="p-2.5 text-slate-500 text-[11px]">
                                  {new Date(sub.submittedAt).toLocaleTimeString('ar-IQ')}
                                </td>
                                <td className="p-2.5 font-arabic">
                                  {sub.score >= sub.totalPoints * 0.8
                                    ? 'ممتاز'
                                    : sub.score >= sub.totalPoints * 0.5
                                    ? 'جيد'
                                    : 'يحتاج متابعة'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Table 2: Absent Students */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-sm font-bold text-rose-800 font-arabic flex items-center gap-1.5">
                      <UserX className="w-4 h-4 text-rose-600" />
                      <span>ثانياً: قائمة الطلاب غير الممتحنين / الغياب ({totalAbsentCount} طالب):</span>
                    </h4>

                    {absentStudents.length === 0 ? (
                      <p className="text-xs text-emerald-700 py-2 font-arabic font-bold">لا يوجد غياب، جميع الطلاب امتحنوا بنجاح.</p>
                    ) : (
                      <div className="rounded-xl border border-rose-200 overflow-hidden">
                        <table className="w-full text-right text-xs border-collapse">
                          <thead>
                            <tr className="bg-rose-50 text-rose-900 font-bold font-arabic border-b border-rose-200">
                              <th className="p-2.5">ت</th>
                              <th className="p-2.5">اسم الطالب الغائب</th>
                              <th className="p-2.5">الشعبة</th>
                              <th className="p-2.5">الملاحظة</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {absentStudents.map((st, idx) => (
                              <tr key={st.id || idx}>
                                <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                                <td className="p-2.5 font-bold font-arabic text-slate-800">{st.fullName}</td>
                                <td className="p-2.5 font-arabic">شعبة {st.section}</td>
                                <td className="p-2.5 text-rose-600 font-arabic font-bold">غائب عن الامتحان</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* MODE 2: MONTHLY CUMULATIVE GRADE REPORT (سجل درجات الشهر) */}
              {pdfReportMode === 'monthly' && (
                <>
                  {/* Official Header */}
                  <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-arabic">
                      <span>جمهورية العراق • وزارة التربية</span>
                      <span>الصف الأول المتوسط • اللغة الإنجليزية</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 font-arabic pt-1">
                      {monthlyReportTitle} (الامتحانات اليومية)
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-arabic pt-1">
                      <span>الشعبة: <strong>{selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`}</strong></span>
                      <span>إجمالي الطلاب: <strong>{filteredRegisteredStudents.length} طالب</strong></span>
                      <span>مدرس المادة: <strong>أ. حسام محمود منصور</strong></span>
                      <span>التاريخ: <strong>{new Date().toLocaleDateString('ar-IQ')}</strong></span>
                    </div>
                  </div>

                  {/* Monthly Grid Table */}
                  {filteredRegisteredStudents.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs font-arabic">
                      لا يوجد طلاب مسجلون في هذه الشعبة لعرض السجل المجمع.
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-300 overflow-x-auto">
                      <table className="w-full text-right text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 font-bold font-arabic border-b border-slate-300">
                            <th className="p-2 text-center w-8 border-l border-slate-200">#</th>
                            <th className="p-2 border-l border-slate-200 min-w-[140px]">اسم الطالب الثلاثي</th>
                            <th className="p-2 text-center w-14 border-l border-slate-200">الشعبة</th>
                            {Array.from({ length: monthlyExamCount }, (_, i) => (
                              <th
                                key={i}
                                className="p-2 text-center border-l border-slate-200 font-arabic font-bold text-[11px] min-w-[55px] text-slate-800"
                              >
                                الامتحان {i + 1}
                              </th>
                            ))}
                            <th className="p-2 text-center border-l border-slate-200 font-bold text-slate-900 bg-slate-200/60 min-w-[65px]">
                              معدل السعي
                            </th>
                            <th className="p-2 text-center min-w-[80px]">ملاحظات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 font-sans">
                          {filteredRegisteredStudents.map((st, idx) => {
                            // Find all historical submissions for this student sorted by date asc
                            const stSubs = allHistoricalSubmissions
                              .filter((s) => {
                                const matchId = st.id && s.studentId && s.studentId === st.id;
                                const matchName =
                                  s.studentName.trim().toLowerCase() === st.fullName.trim().toLowerCase();
                                return matchId || matchName;
                              })
                              .sort(
                                (a, b) =>
                                  new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
                              );

                            // Calculate student average from attended exams
                            const attendedScores = stSubs.map((s) => (s.score / s.totalPoints) * 10);
                            const avgCalc =
                              attendedScores.length > 0
                                ? (
                                    attendedScores.reduce((acc, curr) => acc + curr, 0) /
                                    attendedScores.length
                                  ).toFixed(1)
                                : '—';

                            return (
                              <tr key={st.id || idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-2 text-slate-400 font-mono text-center border-l border-slate-200 font-bold text-[11px]">
                                  {idx + 1}
                                </td>
                                <td className="p-2 font-bold font-arabic text-slate-800 border-l border-slate-200">
                                  {st.fullName}
                                </td>
                                <td className="p-2 font-arabic text-center border-l border-slate-200 text-[11px]">
                                  {st.section}
                                </td>
                                {Array.from({ length: monthlyExamCount }, (_, examIndex) => {
                                  const subForSlot = stSubs[examIndex];
                                  if (subForSlot) {
                                    const scaled = Math.round(
                                      (subForSlot.score / subForSlot.totalPoints) * 10
                                    );
                                    return (
                                      <td
                                        key={examIndex}
                                        className="p-2 text-center border-l border-slate-200 font-mono font-bold text-slate-800"
                                      >
                                        {scaled}
                                      </td>
                                    );
                                  } else {
                                    return (
                                      <td
                                        key={examIndex}
                                        className="p-2 text-center border-l border-slate-200 font-arabic text-slate-300 text-[11px]"
                                      >
                                        —
                                      </td>
                                    );
                                  }
                                })}
                                <td className="p-2 text-center border-l border-slate-200 font-mono font-bold text-slate-900 bg-slate-50">
                                  {avgCalc !== '—' ? `${avgCalc} / 10` : '—'}
                                </td>
                                <td className="p-2 text-center font-arabic text-[11px] text-slate-500">
                                  {attendedScores.length === 0
                                    ? 'لم يمتحن'
                                    : attendedScores.length >= monthlyExamCount
                                    ? 'مكتمل'
                                    : `امتحن (${attendedScores.length}/${monthlyExamCount})`}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {/* Footer Signature Box */}
              <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-arabic">
                <span>توقيع مدرس المادة: <strong>أ. حسام محمود منصور</strong> .............................</span>
                <span>توقيع إدارة المدرسة: .......................................</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DELETE STUDENT CONFIRMATION MODAL                        */}
      {/* ======================================================== */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" dir="rtl">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-right">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-800 font-arabic">
                تأكيد حذف الطالب
              </h3>
              <p className="text-xs text-slate-500 font-arabic">
                هل أنت متأكد من حذف الطالب <strong>{studentToDelete.fullName}</strong> (شعبة {studentToDelete.section})؟
              </p>
            </div>

            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-arabic space-y-1">
              <div className="font-bold flex items-center gap-1 text-rose-900">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>إجراء أمان لمنع إعادة الدخول:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-rose-700">
                سيتم إخراج الطالب فوراً، ولن يتمكن هذا الطالب فقط من الدخول بنفس الكود القديم (<strong className="font-mono">{studentToDelete.code}</strong>) إلا إذا قمت بإعطائه كوداً جديداً. باقي الطلاب المشتركين في نفس الكود لن يتأثروا.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmDeleteStudent}
                disabled={isDeletingStudent}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeletingStudent ? 'جاري الحذف...' : 'نعم، حذف الطالب وإلغاء الكود'}</span>
              </button>
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                disabled={isDeletingStudent}
                className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors font-arabic"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
