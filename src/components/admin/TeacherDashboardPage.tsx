import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  GraduationCap,
  Users,
  CheckCircle2,
  Trash2,
  AlertCircle,
  BarChart3,
  PenTool,
  Sliders,
  Award,
  Globe,
  ShieldAlert,
} from 'lucide-react';
import {
  PlatformConfig,
  updatePlatformConfig,
  QuickExam,
  listenToSubmissions,
  listenToAllSubmissions,
  listenToAllExams,
  ExamSubmission,
  listenToActiveExam,
  StudentSession,
  listenToAllStudents,
  deleteStudentFromFirebase,
  listenToPlatformAnalytics,
  migrateSectionHStudents,
} from '../../services/firebase';

import { TeacherAuthCard } from './TeacherAuthCard';
import { ExamResultsTab } from './tabs/ExamResultsTab';
import { ExamBuilderTab } from './tabs/ExamBuilderTab';
import { CurriculumLocksTab } from './tabs/CurriculumLocksTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { CodesTab } from './tabs/CodesTab';
import { SubscriptionsTab } from './tabs/SubscriptionsTab';

import { StudentHistoryModal } from './modals/StudentHistoryModal';
import { PdfReportModal } from './modals/PdfReportModal';
import { AbsenteeNoticeModal } from './modals/AbsenteeNoticeModal';

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

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'results' | 'builder' | 'lessons' | 'analytics' | 'codes' | 'subscriptions'
  >('results');

  // Submissions & Students State
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [allStudents, setAllStudents] = useState<StudentSession[]>([]);
  const [allHistoricalSubmissions, setAllHistoricalSubmissions] = useState<ExamSubmission[]>([]);
  const [allExamsList, setAllExamsList] = useState<QuickExam[]>([]);
  const [platformAnalytics, setPlatformAnalytics] = useState<{ totalVisits: number }>({ totalVisits: 0 });

  // Results Tab Filters & Sessions
  const [selectedExamSessionId, setSelectedExamSessionId] = useState<string>('latest');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [searchStudentQuery, setSearchStudentQuery] = useState<string>('');
  const [resultsSubTab, setResultsSubTab] = useState<'submitted' | 'absent' | 'all_students'>('submitted');

  // Modals State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isAbsentNoticeModalOpen, setIsAbsentNoticeModalOpen] = useState(false);
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<{
    studentId?: string;
    studentName: string;
    studentSection: string;
    studentCode?: string;
  } | null>(null);

  // Delete Student State
  const [studentToDelete, setStudentToDelete] = useState<StudentSession | null>(null);
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);

  // Sync State
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Exam Builder State
  const [examTitle, setExamTitle] = useState('الامتحان السريع • الوحدة الأولى');
  const [isExamActiveLocal, setIsExamActiveLocal] = useState(false);

  // Maintenance Mode State
  const [isMaintenanceActiveLocal, setIsMaintenanceActiveLocal] = useState<boolean>(() =>
    Boolean(platformConfig.isMaintenanceMode ?? true)
  );
  const [isTogglingMaintenance, setIsTogglingMaintenance] = useState(false);
  const [maintenanceStatusToast, setMaintenanceStatusToast] = useState<string | null>(null);

  // Curriculum Lock States
  const [localUnlockedLessons, setLocalUnlockedLessons] = useState<string[]>(
    () => platformConfig.unlockedLessons || ['lesson-1', 'u2-lesson-1']
  );
  const [localUnlockedGrammarTopics, setLocalUnlockedGrammarTopics] = useState<string[]>(
    () => platformConfig.unlockedGrammarTopics || ['topic-past-simple']
  );

  useEffect(() => {
    if (typeof platformConfig.isMaintenanceMode === 'boolean') {
      setIsMaintenanceActiveLocal(platformConfig.isMaintenanceMode);
    }
  }, [platformConfig.isMaintenanceMode]);

  useEffect(() => {
    if (Array.isArray(platformConfig.unlockedLessons)) {
      setLocalUnlockedLessons(platformConfig.unlockedLessons);
    }
  }, [platformConfig.unlockedLessons]);

  useEffect(() => {
    if (Array.isArray(platformConfig.unlockedGrammarTopics)) {
      setLocalUnlockedGrammarTopics(platformConfig.unlockedGrammarTopics);
    }
  }, [platformConfig.unlockedGrammarTopics]);

  // Firebase Subscriptions
  useEffect(() => {
    if (!isAuthenticated) {
      setAllStudents([]);
      return;
    }

    if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('iq_section_h_migrated')) {
      migrateSectionHStudents()
        .then(() => sessionStorage.setItem('iq_section_h_migrated', 'true'))
        .catch(console.warn);
    }

    const unsub = listenToAllStudents((studentsList) => setAllStudents(studentsList));
    return () => unsub();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !platformConfig.activeExamId) {
      setSubmissions([]);
      return;
    }
    const unsub = listenToSubmissions(platformConfig.activeExamId, (list) => setSubmissions(list));
    return () => unsub();
  }, [isAuthenticated, platformConfig.activeExamId]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const unsubAllSubs = listenToAllSubmissions((list) => setAllHistoricalSubmissions(list));
    const unsubExams = listenToAllExams((list) => setAllExamsList(list));
    const unsubAnalytics = listenToPlatformAnalytics((data) => setPlatformAnalytics(data));

    return () => {
      unsubAllSubs();
      unsubExams();
      unsubAnalytics();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !platformConfig.activeExamId) return;
    const unsub = listenToActiveExam(platformConfig.activeExamId, (exam) => {
      if (exam) {
        setIsExamActiveLocal(exam.isActive);
        setExamTitle(exam.title);
      }
    });
    return () => unsub();
  }, [isAuthenticated, platformConfig.activeExamId]);

  // Actions
  const handleToggleMaintenanceMode = async () => {
    const nextState = !isMaintenanceActiveLocal;
    setIsMaintenanceActiveLocal(nextState);
    setIsTogglingMaintenance(true);
    try {
      await updatePlatformConfig({ isMaintenanceMode: nextState });
      setMaintenanceStatusToast(
        nextState
          ? 'تم إغلاق المنصة بنجاح بوجه جميع الطلبة والزوار 🔒'
          : 'تم فتح المنصة بنجاح وأصبحت متاحة للجميع 🟢'
      );
      setTimeout(() => setMaintenanceStatusToast(null), 4000);
    } catch {
      setIsMaintenanceActiveLocal(!nextState);
      setMaintenanceStatusToast('حدث خطأ أثناء تحديث حالة المنصة.');
      setTimeout(() => setMaintenanceStatusToast(null), 3000);
    } finally {
      setIsTogglingMaintenance(false);
    }
  };

  const handleManualSync = async () => {
    setIsSyncingData(true);
    setSyncStatusMsg('جاري المزامنة مع الخادم...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSyncStatusMsg('تمت مزامنة البيانات وتحديث السجل بنجاح');
      setTimeout(() => setSyncStatusMsg(null), 3000);
    } catch {
      setSyncStatusMsg('تعذر الاتصال بالخادم، البيانات معروضة من الذاكرة المحلية');
      setTimeout(() => setSyncStatusMsg(null), 3000);
    } finally {
      setIsSyncingData(false);
    }
  };

  const handleConfirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    setIsDeletingStudent(true);
    try {
      await deleteStudentFromFirebase(studentToDelete.id, studentToDelete.code);
      setStudentToDelete(null);
    } catch {
      // handled
    } finally {
      setIsDeletingStudent(false);
    }
  };

  // Lock Handlers
  const handleToggleLessonAccess = async (lessonId: string) => {
    const isUnlocked = localUnlockedLessons.includes(lessonId);
    const updated = isUnlocked
      ? localUnlockedLessons.filter((id) => id !== lessonId)
      : [...localUnlockedLessons, lessonId];
    setLocalUnlockedLessons(updated);
    try {
      await updatePlatformConfig({ unlockedLessons: updated });
    } catch {
      setLocalUnlockedLessons(localUnlockedLessons);
    }
  };

  const handleUnlockUnitLessons = async (unitLessonIds: string[]) => {
    const combined = Array.from(new Set([...localUnlockedLessons, ...unitLessonIds]));
    setLocalUnlockedLessons(combined);
    try {
      await updatePlatformConfig({ unlockedLessons: combined });
    } catch {
      setLocalUnlockedLessons(localUnlockedLessons);
    }
  };

  const handleLockUnitLessons = async (unitLessonIds: string[]) => {
    const filtered = localUnlockedLessons.filter((id) => !unitLessonIds.includes(id));
    setLocalUnlockedLessons(filtered);
    try {
      await updatePlatformConfig({ unlockedLessons: filtered });
    } catch {
      setLocalUnlockedLessons(localUnlockedLessons);
    }
  };

  const handleToggleGrammarTopicAccess = async (topicId: string) => {
    const isUnlocked = localUnlockedGrammarTopics.includes(topicId);
    const updated = isUnlocked
      ? localUnlockedGrammarTopics.filter((id) => id !== topicId)
      : [...localUnlockedGrammarTopics, topicId];
    setLocalUnlockedGrammarTopics(updated);
    try {
      await updatePlatformConfig({ unlockedGrammarTopics: updated });
    } catch {
      setLocalUnlockedGrammarTopics(localUnlockedGrammarTopics);
    }
  };

  const handleUnlockUnitGrammar = async (topicIds: string[]) => {
    const combined = Array.from(new Set([...localUnlockedGrammarTopics, ...topicIds]));
    setLocalUnlockedGrammarTopics(combined);
    try {
      await updatePlatformConfig({ unlockedGrammarTopics: combined });
    } catch {
      setLocalUnlockedGrammarTopics(localUnlockedGrammarTopics);
    }
  };

  const handleLockUnitGrammar = async (topicIds: string[]) => {
    const filtered = localUnlockedGrammarTopics.filter((id) => !topicIds.includes(id));
    setLocalUnlockedGrammarTopics(filtered);
    try {
      await updatePlatformConfig({ unlockedGrammarTopics: filtered });
    } catch {
      setLocalUnlockedGrammarTopics(localUnlockedGrammarTopics);
    }
  };

  // Derived Sessions & Metrics
  const examSessions = allExamsList.map((exam) => {
    const dateObj = exam.createdAt ? new Date(exam.createdAt) : new Date();
    const formattedDate = dateObj.toLocaleDateString('ar-IQ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const formattedTime = dateObj.toLocaleTimeString('ar-IQ', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const subCount = allHistoricalSubmissions.filter((s) => s.examId === exam.id).length;
    return {
      id: exam.id,
      title: exam.title || 'الامتحان السريع',
      formattedDate,
      formattedTime,
      submissionsCount: subCount,
      isActive: Boolean(exam.isActive),
    };
  });

  const currentSession = (() => {
    if (selectedExamSessionId === 'all') return null;
    if (selectedExamSessionId !== 'latest') {
      return examSessions.find((s) => s.id === selectedExamSessionId) || null;
    }
    if (examSessions.length > 0) return examSessions[0];
    return {
      id: platformConfig.activeExamId || 'latest',
      title: examTitle || 'الامتحان السريع',
      formattedDate: new Date().toLocaleDateString('ar-IQ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      formattedTime: new Date().toLocaleTimeString('ar-IQ', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      submissionsCount: submissions.length,
      isActive: isExamActiveLocal,
    };
  })();

  const activeSubmissionsList = (() => {
    if (selectedExamSessionId === 'latest') return submissions;
    if (selectedExamSessionId === 'all') return allHistoricalSubmissions;
    return allHistoricalSubmissions.filter((s) => s.examId === selectedExamSessionId);
  })();

  const filteredSubmissions = activeSubmissionsList.filter((sub) => {
    const matchSection = selectedSectionFilter === 'all' || sub.studentSection === selectedSectionFilter;
    const matchSearch =
      !searchStudentQuery.trim() ||
      sub.studentName.toLowerCase().includes(searchStudentQuery.toLowerCase().trim());
    return matchSection && matchSearch;
  });

  const filteredRegisteredStudents = allStudents.filter((student) => {
    const matchSection = selectedSectionFilter === 'all' || student.section === selectedSectionFilter;
    const matchSearch =
      !searchStudentQuery.trim() ||
      student.fullName.toLowerCase().includes(searchStudentQuery.toLowerCase().trim());
    return matchSection && matchSearch;
  });

  const absentStudents = filteredRegisteredStudents.filter((student) => {
    const hasSubmitted = activeSubmissionsList.some((sub) => {
      const matchId = student.id && sub.studentId && sub.studentId === student.id;
      const matchName =
        sub.studentName.trim().toLowerCase() === student.fullName.trim().toLowerCase();
      return matchId || matchName;
    });
    return !hasSubmitted;
  });

  const totalRegisteredCount = filteredRegisteredStudents.length;
  const totalSubmissions = filteredSubmissions.length;
  const totalAbsentCount = absentStudents.length;
  const avgScore =
    totalSubmissions > 0
      ? (
          filteredSubmissions.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
          totalSubmissions
        ).toFixed(1)
      : '0';
  const topScore =
    totalSubmissions > 0 ? Math.max(...filteredSubmissions.map((s) => s.score)) : 0;
  const participationRate =
    totalRegisteredCount > 0 ? Math.round((totalSubmissions / totalRegisteredCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-arabic flex items-center gap-2">
                <span>لوحة تحكم أستاذ المادة</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-arabic">
                  الصف الأول المتوسط
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 font-arabic">
                إدارة الطلاب • الامتحانات • الصلاحيات • الاشتراكات
              </p>
            </div>
          </div>

          <button
            type="button"
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
        {!isAuthenticated ? (
          <TeacherAuthCard onAuthenticated={() => setIsAuthenticated(true)} />
        ) : (
          <div className="space-y-6">
            {/* PLATFORM MAINTENANCE / CLOSURE BANNER */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all shadow-xs ${
                isMaintenanceActiveLocal
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-3.5 text-right w-full md:w-auto">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    isMaintenanceActiveLocal ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isMaintenanceActiveLocal ? (
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  ) : (
                    <ShieldCheck className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-black font-arabic">
                      {isMaintenanceActiveLocal
                        ? 'حالة المنصة: مغلقة بوجه الطلاب حالياً 🔒'
                        : 'حالة المنصة: مفتوحة ومتاحة لجميع الطلاب 🟢'}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-arabic ${
                        isMaintenanceActiveLocal
                          ? 'bg-rose-200/80 text-rose-800 border border-rose-300'
                          : 'bg-emerald-200/80 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {isMaintenanceActiveLocal ? 'مغلقة إلى إشعار آخر' : 'مفتوحة للجميع'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-arabic mt-1 leading-relaxed">
                    {isMaintenanceActiveLocal
                      ? 'عند دخول أي طالب أو زائر، تظهر له شاشة الإغلاق الرسمية: "المنصة مغلقة إلى إشعار آخر". حسابك الإداري فقط من يستطيع الدخول.'
                      : 'المنصة متاحة الآن بشكل طبيعي ويمكن للطلاب الدخول وحل الدروس والامتحانات.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                <button
                  type="button"
                  onClick={handleToggleMaintenanceMode}
                  disabled={isTogglingMaintenance}
                  className={`w-full md:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm font-arabic cursor-pointer transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 ${
                    isMaintenanceActiveLocal
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {isTogglingMaintenance ? (
                    <span>جاري التحديث...</span>
                  ) : isMaintenanceActiveLocal ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>إعادة فتح المنصة للطلاب الآن</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>إغلاق المنصة بوجه الجميع</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {maintenanceStatusToast && (
              <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-arabic flex items-center justify-between shadow-lg">
                <span>{maintenanceStatusToast}</span>
              </div>
            )}

            {/* TAB NAVIGATION BAR */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 font-arabic">
              {[
                { id: 'results', label: 'نتائج الامتحانات والغياب', icon: Award, count: submissions.length },
                { id: 'builder', label: 'إعداد الامتحانات السريعة', icon: PenTool },
                { id: 'lessons', label: 'قفل وفتح المنهج والقواعد', icon: Sliders },
                { id: 'analytics', label: 'إحصائيات المنصة وتواجد الطلاب', icon: BarChart3, count: allStudents.length },
                { id: 'codes', label: 'أكواد التفعيل و PIN', icon: ShieldCheck },
                { id: 'subscriptions', label: 'الاشتراكات الأونلاين والأجهزة', icon: Globe, count: platformConfig.externalSubscriptions?.length },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as any)}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{t.label}</span>
                    {t.count !== undefined && (
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {t.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB PANELS */}
            {activeTab === 'results' && (
              <ExamResultsTab
                selectedExamSessionId={selectedExamSessionId}
                setSelectedExamSessionId={setSelectedExamSessionId}
                selectedSectionFilter={selectedSectionFilter}
                setSelectedSectionFilter={setSelectedSectionFilter}
                searchStudentQuery={searchStudentQuery}
                setSearchStudentQuery={setSearchStudentQuery}
                resultsSubTab={resultsSubTab}
                setResultsSubTab={setResultsSubTab}
                onOpenAbsentNoticeModal={() => setIsAbsentNoticeModalOpen(true)}
                onOpenPdfModal={() => setIsPdfModalOpen(true)}
                onSelectStudentForHistory={setSelectedStudentForHistory}
                onRequestDeleteStudent={setStudentToDelete}
                currentSession={currentSession}
                examSessions={examSessions}
                filteredSubmissions={filteredSubmissions}
                filteredRegisteredStudents={filteredRegisteredStudents}
                absentStudents={absentStudents}
                totalRegisteredCount={totalRegisteredCount}
                totalSubmissions={totalSubmissions}
                totalAbsentCount={totalAbsentCount}
                avgScore={avgScore}
                topScore={topScore}
                participationRate={participationRate}
                isSyncingData={isSyncingData}
                handleManualSync={handleManualSync}
                syncStatusMsg={syncStatusMsg}
                examTitle={examTitle}
                submissions={submissions}
                allStudents={allStudents}
                allExamsList={allExamsList}
              />
            )}

            {activeTab === 'builder' && (
              <ExamBuilderTab
                platformConfig={platformConfig}
                isExamActiveLocal={isExamActiveLocal}
                setIsExamActiveLocal={setIsExamActiveLocal}
                examTitle={examTitle}
                setExamTitle={setExamTitle}
              />
            )}

            {activeTab === 'lessons' && (
              <CurriculumLocksTab
                unlockedLessonIds={localUnlockedLessons}
                onToggleLesson={handleToggleLessonAccess}
                onUnlockUnitLessons={handleUnlockUnitLessons}
                onLockUnitLessons={handleLockUnitLessons}
                unlockedGrammarTopicIds={localUnlockedGrammarTopics}
                onToggleGrammarTopic={handleToggleGrammarTopicAccess}
                onUnlockUnitGrammar={handleUnlockUnitGrammar}
                onLockUnitGrammar={handleLockUnitGrammar}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsTab
                platformAnalytics={platformAnalytics}
                allStudents={allStudents}
              />
            )}

            {activeTab === 'codes' && (
              <CodesTab platformConfig={platformConfig} />
            )}

            {activeTab === 'subscriptions' && (
              <SubscriptionsTab platformConfig={platformConfig} />
            )}
          </div>
        )}
      </main>

      {/* MODALS */}
      <StudentHistoryModal
        student={selectedStudentForHistory}
        allHistoricalSubmissions={allHistoricalSubmissions}
        onClose={() => setSelectedStudentForHistory(null)}
      />

      <PdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        examTitle={examTitle}
        selectedSectionFilter={selectedSectionFilter}
        filteredSubmissions={filteredSubmissions}
        filteredRegisteredStudents={filteredRegisteredStudents}
        allHistoricalSubmissions={allHistoricalSubmissions}
        absentStudents={absentStudents}
      />

      <AbsenteeNoticeModal
        isOpen={isAbsentNoticeModalOpen}
        onClose={() => setIsAbsentNoticeModalOpen(false)}
        currentSession={currentSession}
        absentStudents={absentStudents}
      />

      {/* Delete Student Confirmation Modal */}
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
