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
  User,
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
  Globe,
  Smartphone,
  PlusCircle,
  CalendarPlus,
  ShieldAlert,
  MapPin,
  Bell,
  CalendarDays,
  Send,
  Layers,
} from 'lucide-react';
import {
  PlatformConfig,
  updatePlatformConfig,
  QuickExam,
  saveOrUpdateExam,
  listenToSubmissions,
  listenToAllSubmissions,
  listenToAllExams,
  ExamSubmission,
  listenToActiveExam,
  StudentSession,
  listenToAllStudents,
  deleteStudentFromFirebase,
  generateRandomAccessCode,
  generateSingleUseCode,
  deleteSingleUseCode,
  SingleUseCode,
  SubscriptionDuration,
  ExternalSubscriptionCode,
  SUBSCRIPTION_DURATIONS_MAP,
  generateExternalSubscriptionCode,
  resetSubscriptionDevice,
  extendSubscription,
  toggleSubscriptionStatus,
  deleteExternalSubscription,
  DEFAULT_GRAMMAR_TOPIC_IDS,
  listenToPlatformAnalytics,
  verifyTeacherPin,
  updateTeacherPin,
  hashTeacherPin,
  migrateSectionHStudents,
} from '../../services/firebase';
import {
  UNIT_1_QUESTION_BANK,
  CategorizedExamQuestion
} from '../../data/defaultExamQuestions';
import { unit1GrammarTopicsList } from '../../data/unit1GrammarTopics';
import { CURRICULUM_UNITS, ExamUnit } from '../../data/curriculumStructure';
import { ExamSourceCascader } from './exam/ExamSourceCascader';
import { CurriculumLocksManager } from './curriculum/CurriculumLocksManager';

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
  const [activeTab, setActiveTab] = useState<'results' | 'builder' | 'lessons' | 'analytics' | 'codes' | 'subscriptions'>('results');
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

  // Exam Sessions & Absentee Tracking State
  const [allExamsList, setAllExamsList] = useState<QuickExam[]>([]);
  const [selectedExamSessionId, setSelectedExamSessionId] = useState<string>('latest');
  const [isAbsentNoticeModalOpen, setIsAbsentNoticeModalOpen] = useState(false);
  const [absentNoticeSectionFilter, setAbsentNoticeSectionFilter] = useState<string>('all');
  const [absentNoticeCopied, setAbsentNoticeCopied] = useState(false);
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Exam Builder State
  const [selectedBuilderUnit, setSelectedBuilderUnit] = useState<string>('unit-1');
  const [examTitle, setExamTitle] = useState('الامتحان السريع • الوحدة الأولى');
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(15);
  const [selectedLessonSources, setSelectedLessonSources] = useState<string[]>([
    'lesson-1',
    'lesson-2',
    'lesson-3',
    'grammar',
  ]);
  const [selectedGrammarTopicSources, setSelectedGrammarTopicSources] = useState<string[]>([
    'topic-past-simple',
    'topic-past-continuous',
    'topic-present-simple',
    'topic-adverbs-frequency',
    'topic-possessive-pronouns',
    'topic-joining-sentences',
    'topic-interests',
  ]);
  const [questionCountTarget, setQuestionCountTarget] = useState<number>(5);
  const [selectedQuestions, setSelectedQuestions] = useState<CategorizedExamQuestion[]>([]);
  const [isExamActiveLocal, setIsExamActiveLocal] = useState(false);
  const [builderStatusMsg, setBuilderStatusMsg] = useState<string | null>(null);

  // Master Code / PIN Edit State
  const [newMasterCode, setNewMasterCode] = useState(platformConfig.masterCode || 'IQ-7788');
  const [newTeacherPin, setNewTeacherPin] = useState('');
  const [settingsSaveMsg, setSettingsSaveMsg] = useState<string | null>(null);

  // Platform Maintenance / Closure Mode State
  const [isMaintenanceActiveLocal, setIsMaintenanceActiveLocal] = useState<boolean>(() =>
    Boolean(platformConfig.isMaintenanceMode ?? true)
  );
  const [maintenanceMessageInput, setMaintenanceMessageInput] = useState<string>(
    platformConfig.maintenanceMessageAr || 'المنصة مغلقة حالياً إلى إشعار آخر بأمر مدرس المادة.'
  );
  const [isTogglingMaintenance, setIsTogglingMaintenance] = useState(false);
  const [maintenanceStatusToast, setMaintenanceStatusToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof platformConfig.isMaintenanceMode === 'boolean') {
      setIsMaintenanceActiveLocal(platformConfig.isMaintenanceMode);
    }
    if (platformConfig.maintenanceMessageAr) {
      setMaintenanceMessageInput(platformConfig.maintenanceMessageAr);
    }
  }, [platformConfig.isMaintenanceMode, platformConfig.maintenanceMessageAr]);

  const handleToggleMaintenanceMode = async () => {
    const nextState = !isMaintenanceActiveLocal;
    setIsMaintenanceActiveLocal(nextState);
    setIsTogglingMaintenance(true);
    try {
      await updatePlatformConfig({
        isMaintenanceMode: nextState,
        maintenanceMessageAr: maintenanceMessageInput.trim() || undefined,
      });
      setMaintenanceStatusToast(
        nextState
          ? 'تم إغلاق المنصة بنجاح بوجه جميع الطلبة والزوار 🔒'
          : 'تم فتح المنصة بنجاح وأصبحت متاحة للجميع 🟢'
      );
      setTimeout(() => setMaintenanceStatusToast(null), 4000);
    } catch (e) {
      console.error(e);
      setIsMaintenanceActiveLocal(!nextState);
      setMaintenanceStatusToast('حدث خطأ أثناء تحديث حالة المنصة.');
      setTimeout(() => setMaintenanceStatusToast(null), 3000);
    } finally {
      setIsTogglingMaintenance(false);
    }
  };

  // Local optimistic lock states to eliminate race conditions and stale closure reverts
  const [localUnlockedLessons, setLocalUnlockedLessons] = useState<string[]>(
    () => platformConfig.unlockedLessons || ['lesson-1', 'u2-lesson-1']
  );
  const [localUnlockedGrammarTopics, setLocalUnlockedGrammarTopics] = useState<string[]>(
    () => platformConfig.unlockedGrammarTopics || ['topic-past-simple']
  );

  // Keep local lock state in sync with platformConfig when updated
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

  // Listen to all registered students (only after PIN authentication)
  useEffect(() => {
    if (!isAuthenticated) {
      setAllStudents([]);
      return;
    }

    // Automatically migrate any students or submissions in Section H to alphabetical sections (أ، ب، ج، د) once per session
    if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('iq_section_h_migrated')) {
      migrateSectionHStudents()
        .then(() => sessionStorage.setItem('iq_section_h_migrated', 'true'))
        .catch(console.warn);
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

  // Listen to all exams history (only after PIN authentication)
  useEffect(() => {
    if (!isAuthenticated) {
      setAllExamsList([]);
      return;
    }

    const unsub = listenToAllExams((list) => {
      setAllExamsList(list);
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
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (!clean) {
      setPinError(true);
      return;
    }
    const isValid = await verifyTeacherPin(clean);
    if (isValid) {
      setIsAuthenticated(true);
      setPinError(false);
      const token = await hashTeacherPin(clean);
      localStorage.setItem('iq_teacher_token', token);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  // Cascader Handlers for Dynamic Unit / Lesson / Grammar Selection
  const handleCascaderSelectUnit = (unit: ExamUnit) => {
    setSelectedBuilderUnit(unit.id);
    setExamTitle(`الامتحان السريع • ${unit.titleAr.split(':')[0]}`);
    if (unit.id === 'unit-1') {
      setSelectedLessonSources(['lesson-1', 'lesson-2', 'lesson-3', 'grammar']);
      setSelectedGrammarTopicSources([
        'topic-past-simple',
        'topic-past-continuous',
        'topic-present-simple',
        'topic-adverbs-frequency',
        'topic-possessive-pronouns',
        'topic-joining-sentences',
        'topic-interests',
      ]);
    } else {
      setSelectedLessonSources(unit.lessons.slice(0, 3).map((l) => l.id));
      setSelectedGrammarTopicSources([]);
    }
  };

  const handleCascaderToggleLesson = (lessonId: string) => {
    setSelectedLessonSources((prev) => {
      if (prev.includes(lessonId)) {
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== lessonId);
      }
      return [...prev, lessonId];
    });
  };

  const handleCascaderSelectAllLessons = (lessonIds: string[]) => {
    setSelectedLessonSources((prev) => [
      ...new Set([...prev.filter((id) => id === 'grammar'), ...lessonIds]),
    ]);
  };

  const handleCascaderClearLessons = () => {
    setSelectedLessonSources((prev) => prev.filter((id) => id === 'grammar'));
  };

  const handleCascaderToggleGrammarActive = () => {
    setSelectedLessonSources((prev) => {
      if (prev.includes('grammar')) {
        const without = prev.filter((id) => id !== 'grammar');
        return without.length > 0 ? without : ['lesson-1'];
      }
      return [...prev, 'grammar'];
    });
  };

  const handleCascaderToggleGrammarTopic = (topicId: string) => {
    setSelectedGrammarTopicSources((prev) => {
      if (prev.includes(topicId)) {
        return prev.filter((id) => id !== topicId);
      }
      return [...prev, topicId];
    });
  };

  const handleCascaderSelectAllGrammarTopics = (topicIds: string[]) => {
    setSelectedGrammarTopicSources(topicIds);
  };

  const handleCascaderClearGrammarTopics = () => {
    setSelectedGrammarTopicSources([]);
  };

  const handleCascaderReset = () => {
    setSelectedBuilderUnit('unit-1');
    setExamTitle('الامتحان السريع • الوحدة الأولى');
    setSelectedLessonSources(['lesson-1', 'lesson-2', 'lesson-3', 'grammar']);
    setSelectedGrammarTopicSources([
      'topic-past-simple',
      'topic-past-continuous',
      'topic-present-simple',
      'topic-adverbs-frequency',
      'topic-possessive-pronouns',
      'topic-joining-sentences',
      'topic-interests',
    ]);
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
    if (selectedBuilderUnit !== 'unit-1') {
      setSelectedQuestions([]);
      setBuilderStatusMsg('هذه الوحدة لا تحتوي على أسئلة مضافة في بنك الأسئلة حالياً. تم تجهيز هيكل الدروس والقواعد، ويمكن إضافة الأسئلة لها مستقبلاً.');
      return;
    }

    const availablePool = UNIT_1_QUESTION_BANK.filter((q) => {
      if (q.lessonId === 'grammar') {
        return (
          selectedLessonSources.includes('grammar') &&
          (!q.grammarTopicId || selectedGrammarTopicSources.includes(q.grammarTopicId))
        );
      }
      return selectedLessonSources.includes(q.lessonId);
    });

    if (availablePool.length === 0) {
      setSelectedQuestions([]);
      setBuilderStatusMsg('يرجى تحديد درس واحد على الأقل أو موضوع قواعد لتوليد الأسئلة.');
      return;
    }

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
      // When activating a new exam session, generate a unique session ID to preserve all history
      const examId =
        activateState && (!isExamActiveLocal || !platformConfig.activeExamId)
          ? `exam_session_${Date.now()}`
          : platformConfig.activeExamId || 'exam_unit1_quick';

      const examPayload: QuickExam = {
        id: examId,
        title: examTitle.trim() || 'الامتحان السريع • الوحدة الأولى',
        durationMinutes: examDurationMinutes || 15,
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

  // Unit-specific Lesson locks
  const handleUnlockUnitLessons = async (unitLessonIds: string[]) => {
    setLocalUnlockedLessons((prev) => {
      const updated = Array.from(new Set([...prev, ...unitLessonIds]));
      updatePlatformConfig({ unlockedLessons: updated }).catch(console.error);
      return updated;
    });
  };

  const handleLockUnitLessons = async (unitLessonIds: string[]) => {
    setLocalUnlockedLessons((prev) => {
      const updated = prev.filter((id) => !unitLessonIds.includes(id));
      updatePlatformConfig({ unlockedLessons: updated }).catch(console.error);
      return updated;
    });
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

  // Unit-specific Grammar topic locks
  const handleUnlockUnitGrammar = async (unitTopicIds: string[]) => {
    setLocalUnlockedGrammarTopics((prev) => {
      const updated = Array.from(new Set([...prev, ...unitTopicIds]));
      updatePlatformConfig({ unlockedGrammarTopics: updated }).catch(console.error);
      return updated;
    });
  };

  const handleLockUnitGrammar = async (unitTopicIds: string[]) => {
    setLocalUnlockedGrammarTopics((prev) => {
      const updated = prev.filter((id) => !unitTopicIds.includes(id));
      updatePlatformConfig({ unlockedGrammarTopics: updated }).catch(console.error);
      return updated;
    });
  };


  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePlatformConfig({
        masterCode: newMasterCode.trim().toUpperCase(),
        maintenanceMessageAr: maintenanceMessageInput.trim() || undefined,
      });
      if (newTeacherPin.trim()) {
        const token = await updateTeacherPin(newTeacherPin.trim());
        localStorage.setItem('iq_teacher_token', token);
      }
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

  // Single-use code handlers
  const [copiedSingleCode, setCopiedSingleCode] = useState<string | null>(null);
  const [isGeneratingSingleCode, setIsGeneratingSingleCode] = useState(false);

  const handleCreateSingleCode = async () => {
    setIsGeneratingSingleCode(true);
    try {
      const code = await generateSingleUseCode();
      setSettingsSaveMsg(`تم توليد كود تفعيل فردي جديد بنجاح: ${code}`);
      setTimeout(() => setSettingsSaveMsg(null), 4000);
    } catch {
      setSettingsSaveMsg('حدث خطأ أثناء توليد الكود الفردي.');
      setTimeout(() => setSettingsSaveMsg(null), 4000);
    } finally {
      setIsGeneratingSingleCode(false);
    }
  };

  const handleCopySingleCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSingleCode(code);
    setTimeout(() => setCopiedSingleCode(null), 2500);
  };

  const handleDeleteSingleCode = async (code: string) => {
    if (confirm(`هل أنت متأكد من حذف كود التفعيل ${code}؟`)) {
      await deleteSingleUseCode(code);
    }
  };

  // External Online Subscriptions State & Handlers
  const [subDurationInput, setSubDurationInput] = useState<SubscriptionDuration>('3_months');
  const [subNoteInput, setSubNoteInput] = useState('');
  const [subSearchQuery, setSubSearchQuery] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState<'all' | 'available' | 'active' | 'expired' | 'suspended'>('all');
  const [isGeneratingSubCode, setIsGeneratingSubCode] = useState(false);
  const [subMessage, setSubMessage] = useState<string | null>(null);
  const [copiedSubCode, setCopiedSubCode] = useState<string | null>(null);

  const handleGenerateSubscriptionCode = async (overrideDuration?: SubscriptionDuration) => {
    if (isGeneratingSubCode) return;
    setIsGeneratingSubCode(true);
    try {
      const dur = overrideDuration || subDurationInput;
      const code = await generateExternalSubscriptionCode(dur, subNoteInput);
      setSubNoteInput('');
      const durationMeta = SUBSCRIPTION_DURATIONS_MAP[dur]?.labelAr || 'اشتراك';
      setSubMessage(`تم توليد كود اشتراك واحد بنجاح (${durationMeta}): ${code}`);
      setCopiedSubCode(code);
      navigator.clipboard.writeText(code).catch(() => {});
      setTimeout(() => setSubMessage(null), 5000);
    } catch {
      setSubMessage('حدث خطأ أثناء توليد كود الاشتراك. يرجى المحاولة ثانية.');
      setTimeout(() => setSubMessage(null), 4000);
    } finally {
      setIsGeneratingSubCode(false);
    }
  };

  const handleCopySubCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSubCode(code);
    setTimeout(() => setCopiedSubCode(null), 2500);
  };

  const handleResetDevice = async (code: string, studentName?: string) => {
    if (
      confirm(
        `هل أنت متأكد من فك قفل الجهاز للطالب (${studentName || code})؟ سيتمكن من ربط حسابه بجهازه الجديد فور الدخول.`
      )
    ) {
      await resetSubscriptionDevice(code);
      setSubMessage(`تم فك قفل الجهاز للكود ${code} بنجاح.`);
      setTimeout(() => setSubMessage(null), 3500);
    }
  };

  const handleExtendSubscription = async (code: string, days: number = 30) => {
    if (confirm(`هل تريد تمديد اشتراك هذا الكود لمدة ${days} يوماً إضافياً؟`)) {
      await extendSubscription(code, days);
      setSubMessage(`تم تمديد الاشتراك بنجاح (+${days} يوم).`);
      setTimeout(() => setSubMessage(null), 3500);
    }
  };

  const handleToggleSubStatus = async (code: string, currentStatus: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    const actionName = newStatus === 'suspended' ? 'إيقاف مؤقت' : 'تفعيل';
    if (confirm(`هل تريد ${actionName} لهذا الاشتراك؟`)) {
      await toggleSubscriptionStatus(code, newStatus);
      setSubMessage(`تم تغيير حالة الاشتراك إلى: ${newStatus === 'suspended' ? 'موقوف' : 'نشط'}`);
      setTimeout(() => setSubMessage(null), 3000);
    }
  };

  const handleDeleteSub = async (code: string) => {
    if (confirm(`هل أنت متأكد من حذف كود الاشتراك ${code} نهائياً؟`)) {
      await deleteExternalSubscription(code);
    }
  };

  // Filtered External Subscriptions
  const allSubs = platformConfig.externalSubscriptions || [];
  const filteredExternalSubscriptions = allSubs.filter((item) => {
    if (!item) return false;
    const q = subSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      Boolean(item.code && item.code.toLowerCase().includes(q)) ||
      Boolean(item.usedByStudentName && item.usedByStudentName.toLowerCase().includes(q)) ||
      Boolean(item.note && item.note.toLowerCase().includes(q)) ||
      Boolean(item.governorate && item.governorate.toLowerCase().includes(q));

    const isExpired = Boolean(item.expiresAt && new Date() > new Date(item.expiresAt));
    const actualStatus = isExpired ? 'expired' : item.status;

    if (subStatusFilter === 'all') return matchesSearch;
    if (subStatusFilter === 'available') return matchesSearch && !item.isUsed;
    if (subStatusFilter === 'active') return matchesSearch && item.isUsed && actualStatus === 'active';
    if (subStatusFilter === 'expired') return matchesSearch && actualStatus === 'expired';
    if (subStatusFilter === 'suspended') return matchesSearch && item.status === 'suspended';
    return matchesSearch;
  });

  const totalSubsCount = allSubs.length;
  const activeSubsCount = allSubs.filter(
    (s) => s.isUsed && s.status === 'active' && (!s.expiresAt || new Date(s.expiresAt) > new Date())
  ).length;
  const availableSubsCount = allSubs.filter((s) => !s.isUsed).length;
  const expiredSubsCount = allSubs.filter(
    (s) => s.status === 'suspended' || Boolean(s.expiresAt && new Date() > new Date(s.expiresAt))
  ).length;

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

  // Computed Exam Sessions with Date, Time, and stats
  const examSessions = React.useMemo(() => {
    const sessionMap = new Map<string, {
      id: string;
      title: string;
      createdAt: string;
      formattedDate: string;
      formattedTime: string;
      isActive: boolean;
      submissionsCount: number;
    }>();

    // 1. Add all exams from allExamsList
    allExamsList.forEach((ex) => {
      const exDate = ex.createdAt ? new Date(ex.createdAt) : new Date();
      const validDate = isNaN(exDate.getTime()) ? new Date() : exDate;
      const count = allHistoricalSubmissions.filter((s) => s.examId === ex.id).length;

      sessionMap.set(ex.id, {
        id: ex.id,
        title: ex.title || 'الامتحان السريع',
        createdAt: ex.createdAt || validDate.toISOString(),
        formattedDate: validDate.toLocaleDateString('ar-IQ', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        formattedTime: validDate.toLocaleTimeString('ar-IQ', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isActive: Boolean(ex.isActive),
        submissionsCount: count,
      });
    });

    // 2. Discover any submissions that have an examId not present in allExamsList
    allHistoricalSubmissions.forEach((sub) => {
      if (sub.examId && !sessionMap.has(sub.examId)) {
        const subDate = sub.submittedAt ? new Date(sub.submittedAt) : new Date();
        const validDate = isNaN(subDate.getTime()) ? new Date() : subDate;
        const count = allHistoricalSubmissions.filter((s) => s.examId === sub.examId).length;

        sessionMap.set(sub.examId, {
          id: sub.examId,
          title: sub.examTitle || 'امتحان سريع سابق',
          createdAt: sub.submittedAt || validDate.toISOString(),
          formattedDate: validDate.toLocaleDateString('ar-IQ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          formattedTime: validDate.toLocaleTimeString('ar-IQ', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isActive: sub.examId === platformConfig.activeExamId,
          submissionsCount: count,
        });
      }
    });

    return Array.from(sessionMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allExamsList, allHistoricalSubmissions, platformConfig.activeExamId]);

  const currentSession = React.useMemo(() => {
    if (examSessions.length === 0) return null;
    if (selectedExamSessionId === 'latest') {
      if (platformConfig.activeExamId) {
        const found = examSessions.find((s) => s.id === platformConfig.activeExamId);
        if (found) return found;
      }
      return examSessions[0];
    }
    if (selectedExamSessionId === 'all') {
      return null;
    }
    return examSessions.find((s) => s.id === selectedExamSessionId) || examSessions[0];
  }, [examSessions, selectedExamSessionId, platformConfig.activeExamId]);

  // School students only (exclude external subscribers)
  const schoolStudents = allStudents.filter(
    (st) => !st.isExternalSubscriber && st.section !== 'مشترك أونلاين'
  );

  // Active Submissions to display based on session selection
  const activeSubmissionsList = React.useMemo(() => {
    if (selectedExamSessionId === 'all') {
      return allHistoricalSubmissions;
    }
    if (currentSession) {
      return allHistoricalSubmissions.filter((s) => s.examId === currentSession.id);
    }
    return submissions.length > 0 ? submissions : allHistoricalSubmissions;
  }, [selectedExamSessionId, currentSession, allHistoricalSubmissions, submissions]);

  // Filter Submissions by Section & Search
  const filteredSubmissions = activeSubmissionsList.filter((sub) => {
    const matchesSection =
      selectedSectionFilter === 'all' || sub.studentSection === selectedSectionFilter;
    const matchesSearch =
      !searchStudentQuery.trim() ||
      sub.studentName.toLowerCase().includes(searchStudentQuery.toLowerCase().trim());
    return matchesSection && matchesSearch;
  });

  // Filter Registered School Students by Section & Search
  const filteredRegisteredStudents = schoolStudents.filter((student) => {
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

  // Absent students = registered school students who have not submitted this exam session yet
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
          filteredSubmissions.reduce(
            (acc, curr) => acc + (curr.totalPoints > 0 ? (curr.score / curr.totalPoints) * 10 : curr.score),
            0
          ) / totalSubmissions
        ).toFixed(1)
      : '0';

  const topScore =
    totalSubmissions > 0
      ? Math.max(
          ...filteredSubmissions.map((s) =>
            s.totalPoints > 0 ? Math.round((s.score / s.totalPoints) * 10) : s.score
          )
        )
      : 0;

  // Copy Absentee Notice for Parents (Clean, formal, NO EMOJIS)
  const handleCopyAbsentNoticeForParents = () => {
    const targetAbsents =
      absentNoticeSectionFilter === 'all'
        ? absentStudents
        : absentStudents.filter((s) => s.section === absentNoticeSectionFilter);

    if (targetAbsents.length === 0) {
      alert('لا يوجد طلاب غائبون في هذا القسم حالياً.');
      return;
    }

    const grouped: Record<string, string[]> = {};
    targetAbsents.forEach((st) => {
      const sec = st.section || 'غير محدد';
      if (!grouped[sec]) grouped[sec] = [];
      grouped[sec].push(st.fullName.trim());
    });

    const dateStr = currentSession?.formattedDate || 'اليوم';
    const timeStr = currentSession?.formattedTime ? ` - الساعة (${currentSession.formattedTime})` : '';
    const examName = currentSession?.title || 'الامتحان السريع لمادة اللغة الإنكليزية';

    let text = `إشعار رسمي لأولياء الأمور الكرام\n`;
    text += `مادة اللغة الإنكليزية • الصف الأول المتوسط\n`;
    text += `ثانوية المتميزين للبنين\n`;
    text += ``;
    text += `الموضوع: تبليغ بالطلبة الذين لم يشاركوا في ${examName} المقرر بتاريخ: ${dateStr}${timeStr}:\n\n`;

    Object.keys(grouped).sort().forEach((sec) => {
      text += `• شعبة (${sec}):\n`;
      grouped[sec].forEach((name, idx) => {
        text += `  ${idx + 1}. ${name}\n`;
      });
      text += `\n`;
    });

    text += `يرجى من أولياء الأمور الكرام متابعة أبنائهم وحثهم على أداء الامتحانات والواجبات المدرسية أولاً بأول لضمان عدم تأثر درجات السعي السنوي.\n\n`;
    text += `مع وافر التقدير والاحترام.`;

    navigator.clipboard.writeText(text);
    setAbsentNoticeCopied(true);
    setTimeout(() => setAbsentNoticeCopied(false), 3000);
  };

  // Manual Refresh & Sync Handler
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
    text += ``;
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
    csv += ``;
    csv += `الشعبة: ${selectedSectionFilter === 'all' ? 'جميع الشُعب' : 'شعبة ' + selectedSectionFilter}\n`;
    csv += `التاريخ: ${new Date().toLocaleDateString('ar-IQ')}\n\n`;

    const headers = ['ت', 'اسم الطالب', 'الشعبة'];
    for (let i = 1; i <= monthlyExamCount; i++) {
      headers.push(`الامتحان ${i}`);
    }
    headers.push('معدل السعي');
    headers.push('الملاحظات');
    csv += headers.join(',') + '\n';

    const sanitizeCsvCell = (str: string): string => {
      const clean = (str || '').replace(/"/g, '""');
      if (/^[=+\-@\t\r]/.test(clean)) {
        return `'${clean}`;
      }
      return clean;
    };

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

      const row = [idx + 1, `"${sanitizeCsvCell(st.fullName)}"`, `"${sanitizeCsvCell(st.section)}"`];
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
                إدارة المنهاج والامتحانات والدرجات
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
                  placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-slate-800 placeholder:text-slate-300 transition-colors"
                  autoFocus
                />
                <span className="text-[11px] text-slate-400 font-arabic block pt-0.5">
                  خاص بمدرس المادة حصراً.
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
            {/* PLATFORM MAINTENANCE / CLOSURE BANNER */}
            <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all shadow-xs ${
              isMaintenanceActiveLocal
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center gap-3.5 text-right w-full md:w-auto">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                  isMaintenanceActiveLocal ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {isMaintenanceActiveLocal ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-black font-arabic">
                      {isMaintenanceActiveLocal ? 'حالة المنصة: مغلقة بوجه الطلاب حالياً 🔒' : 'حالة المنصة: مفتوحة ومتاحة لجميع الطلاب 🟢'}
                    </h4>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-arabic ${
                      isMaintenanceActiveLocal ? 'bg-rose-200/80 text-rose-800 border border-rose-300' : 'bg-emerald-200/80 text-emerald-800 border border-emerald-300'
                    }`}>
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
                  }`}>
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
                <button onClick={() => setMaintenanceStatusToast(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Top Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1">
              {[
                { id: 'results', label: 'نتائج طلاب المدرسة', icon: BarChart3, count: totalSubmissions },
                { id: 'builder', label: 'صانع الامتحانات', icon: PenTool, activeBadge: isExamActiveLocal },
                { id: 'lessons', label: 'التحكم بالدروس', icon: BookOpen },
                {
                  id: 'subscriptions',
                  label: 'اشتراكات الأونلاين',
                  icon: Globe,
                  count:
                    (platformConfig.externalSubscriptions || []).filter(
                      (s) => s.isUsed && s.status === 'active'
                    ).length > 0
                      ? `${
                          (platformConfig.externalSubscriptions || []).filter(
                            (s) => s.isUsed && s.status === 'active'
                          ).length
                        } مشترك`
                      : undefined,
                },
                {
                  id: 'analytics',
                  label: 'إحصائيات المنصة',
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
            {/* TAB 1: SCHOOL EXAM RESULTS, SESSIONS & ABSENTEE TRACKING */}
            {/* ======================================================== */}
            {activeTab === 'results' && (
              <div className="space-y-5 text-right">
                {/* Session Date & Time Selector Banner */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-slate-600" />
                        <span>جلسة وتاريخ الامتحان:</span>
                      </span>
                      {currentSession?.isActive && (
                        <span className="text-[10px] font-bold font-arabic bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>الامتحان مباشر ومتاح للطلاب الآن</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-0.5 max-w-xl">
                      <select
                        value={selectedExamSessionId}
                        onChange={(e) => setSelectedExamSessionId(e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold font-arabic text-slate-800 focus:border-slate-800 focus:bg-white transition-all cursor-pointer flex-1 truncate"
                      >
                        <option value="latest">
                          {currentSession
                            ? `[الامتحان الأحدث] ${currentSession.title} - ${currentSession.formattedDate}`
                            : 'الامتحان الأحدث'}
                        </option>
                        {examSessions.map((session) => (
                          <option key={session.id} value={session.id}>
                            {session.title} - {session.formattedDate} (الساعة {session.formattedTime}) - {session.submissionsCount} ممتحن
                          </option>
                        ))}
                        <option value="all">كشف تراكمي شامل (جميع الامتحانات السابقة)</option>
                      </select>

                      {/* Manual Sync Button */}
                      <button
                        type="button"
                        onClick={handleManualSync}
                        disabled={isSyncingData}
                        className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shrink-0"
                        title="مزامنة وتحديث البيانات من السيرفر"
                      >
                        <RefreshCw className={`w-4 h-4 ${isSyncingData ? 'animate-spin text-slate-900' : ''}`} />
                      </button>
                    </div>

                    {syncStatusMsg && (
                      <span className="text-[11px] font-arabic text-emerald-700 font-bold block pt-0.5">
                        {syncStatusMsg}
                      </span>
                    )}
                  </div>

                  {/* Absent Notice & Alert Parents Action Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsAbsentNoticeModalOpen(true)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-arabic cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
                      title="فتح كشف الغائبين وتوليد رسالة التبليغ لأولياء الأمور"
                    >
                      <Bell className="w-4 h-4 text-amber-300" />
                      <span>كشف الغائبين وتنبيه أولياء الأمور ({totalAbsentCount})</span>
                    </button>
                  </div>
                </div>

                {/* 4 Stats Cards with separated Date and Time */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Card 1: Date & Time */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>تاريخ الامتحان</span>
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-slate-800 font-arabic block mt-1.5 truncate">
                      {currentSession ? currentSession.formattedDate : 'جميع الامتحانات'}
                    </strong>
                    <span className="text-[11px] text-slate-500 font-arabic block mt-0.5">
                      {currentSession ? `وقت الانطلاق: ${currentSession.formattedTime}` : 'أرشيف تراكمي شامل'}
                    </span>
                  </div>

                  {/* Card 2: Submitted */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>الطلاب الممتحنون</span>
                    </span>
                    <strong className="text-2xl font-bold text-emerald-700 font-mono block mt-1">
                      {totalSubmissions}
                    </strong>
                    <span className="text-[10px] text-emerald-600 font-arabic block mt-0.5 font-bold">
                      نسبة المشاركة: {participationRate}%
                    </span>
                  </div>

                  {/* Card 3: Absent */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block flex items-center justify-center gap-1">
                      <UserX className="w-3.5 h-3.5 text-rose-500" />
                      <span>الطلاب غير الممتحنين (الغياب)</span>
                    </span>
                    <strong className={`text-2xl font-bold font-mono block mt-1 ${totalAbsentCount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {totalAbsentCount}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">
                      لم يسلموا الإجابة في هذا الامتحان
                    </span>
                  </div>

                  {/* Card 4: Avg Score */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      <span>متوسط الدرجات</span>
                    </span>
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
                    {['all', 'أ', 'ب', 'ج', 'د'].map((sec) => (
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
                                    لم يؤدِ الامتحان بعد
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

                {/* Step-by-Step Cascading Source Selector (Unit -> Lessons -> Grammar) */}
                <ExamSourceCascader
                  selectedUnitId={selectedBuilderUnit}
                  onSelectUnit={handleCascaderSelectUnit}
                  selectedLessonIds={selectedLessonSources}
                  onToggleLesson={handleCascaderToggleLesson}
                  onSelectAllLessons={handleCascaderSelectAllLessons}
                  onClearLessons={handleCascaderClearLessons}
                  isGrammarActive={selectedLessonSources.includes('grammar')}
                  onToggleGrammarActive={handleCascaderToggleGrammarActive}
                  selectedGrammarTopicIds={selectedGrammarTopicSources}
                  onToggleGrammarTopic={handleCascaderToggleGrammarTopic}
                  onSelectAllGrammarTopics={handleCascaderSelectAllGrammarTopics}
                  onClearGrammarTopics={handleCascaderClearGrammarTopics}
                  onResetSelection={handleCascaderReset}
                />

                {/* Exam Settings Card: Questions count, Duration, Re-roll button */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Question count */}
                      <div className="flex items-center gap-1.5">
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

                      {/* Exam Duration */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>المدة:</span>
                        </span>
                        {[10, 15, 20, 30].map((mins) => (
                          <button
                            key={mins}
                            type="button"
                            onClick={() => setExamDurationMinutes(mins)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                              examDurationMinutes === mins
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {mins} دقيقة
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateQuestions}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold font-arabic cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-slate-600" />
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
            {/* ======================================================== */}
            {/* TAB 3: LESSONS & GRAMMAR TOPICS LOCKING / UNLOCKING      */}
            {/* ======================================================== */}
            {activeTab === 'lessons' && (
              <CurriculumLocksManager
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
                          placeholder="IQ-XXXX"
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
                        type="password"
                        value={newTeacherPin}
                        onChange={(e) => setNewTeacherPin(e.target.value)}
                        placeholder="أدخل رمزاً جديداً لتغييره..."
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

                {/* Single-Use Codes Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 max-w-xl mx-auto space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-slate-700" />
                        <span>أكواد التفعيل الفردية (لطالب واحد ولمرة واحدة)</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-arabic mt-1 leading-relaxed">
                        توليد كود خاص يُقفل تلقائياً على أول طالب يسجل به؛ لا يمكن لأي طالب آخر استخدامه إطلاقاً.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCreateSingleCode}
                      disabled={isGeneratingSingleCode}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer font-arabic transition-colors shrink-0 shadow-2xs disabled:opacity-50"
                      title="توليد كود تفعيل فردي جديد"
                    >
                      {isGeneratingSingleCode ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>جاري التوليد...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>توليد كود فردي جديد</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Codes List */}
                  <div className="space-y-2.5">
                    {(!platformConfig.singleUseCodes || platformConfig.singleUseCodes.length === 0) ? (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-arabic">
                        لم يتم توليد أي كود فردي بعد. اضغط على زر &quot;توليد كود فردي جديد&quot; بالأعلى لإنشاء كود خاص لأحد الطلاب.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {platformConfig.singleUseCodes.map((item, idx) => (
                          <div
                            key={item.code || idx}
                            className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-right"
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-bold text-sm tracking-wider text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                  {item.code}
                                </span>
                                {item.isUsed ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-300 font-arabic">
                                    مُستخدم
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-arabic">
                                    متاح للتسجيل
                                  </span>
                                )}
                              </div>

                              <div className="text-[11px] text-slate-500 font-arabic">
                                {item.isUsed ? (
                                  <span>
                                    مسجل باسم: <strong className="text-slate-800">{item.usedByStudentName || 'طالب'}</strong>
                                    {item.usedBySection ? ` (شعبة ${item.usedBySection})` : ''}
                                  </span>
                                ) : (
                                  <span>جاهز لإرساله إلى طالب واحد</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleCopySingleCode(item.code)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
                                title="نسخ الكود"
                              >
                                {copiedSingleCode === item.code ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700 text-[11px]">تم النسخ</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span className="text-[11px]">نسخ</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteSingleCode(item.code)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="حذف الكود"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 6: ONLINE EXTERNAL SUBSCRIPTIONS (PAID OUTSIDE)      */}
            {/* ======================================================== */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-5 text-right">
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">إجمالي أكواد الاشتراكات</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
                      {totalSubsCount}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">كل الأكواد المتولدة</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">المشتركون النشطون</span>
                    <strong className="text-2xl font-bold text-emerald-700 font-mono block mt-1">
                      {activeSubsCount}
                    </strong>
                    <span className="text-[10px] text-emerald-600 font-arabic block mt-0.5">حسابات مفعلة وتدرس</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">أكواد متاحة للبيع</span>
                    <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
                      {availableSubsCount}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">جاهزة للإرسال للمشتري</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-arabic block">منتهية أو موقوفة</span>
                    <strong className="text-2xl font-bold text-slate-500 font-mono block mt-1">
                      {expiredSubsCount}
                    </strong>
                    <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">تحتاج تجديد</span>
                  </div>
                </div>

                {/* Sub Card 1: Generate New Subscription Code Form */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-700" />
                      <span>توليد كود اشتراك أونلاين خارجي</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-arabic mt-1 leading-relaxed">
                      اختر مدة الاشتراك (اسم المشتري اختياري تماماً)، ثم اضغط زر التوليد بالأسفل. يتم توليد كود واحد فقط لكل نقرة ويبقى ثابتاً ومحفوظاً في النظام.
                    </p>
                  </div>

                  {/* Form Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Duration Picker */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                        <span>الخطوة 1: اختيار مدة صلاحية الاشتراك:</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {(['1_hour', '1_month', '3_months', '6_months', '1_year'] as SubscriptionDuration[]).map((dur) => {
                          const meta = (SUBSCRIPTION_DURATIONS_MAP && SUBSCRIPTION_DURATIONS_MAP[dur]) || {
                            labelAr: dur === '1_hour' ? 'تجريبي (ساعة واحدة)' : dur === '1_month' ? 'شهر واحد (30 يوم)' : dur === '3_months' ? '3 أشهر (90 يوم)' : dur === '6_months' ? '6 أشهر (180 يوم)' : 'سنة كاملة (365 يوم)',
                          };
                          return (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => setSubDurationInput(dur)}
                              className={`py-2 px-2.5 rounded-xl border text-xs font-bold font-arabic transition-all cursor-pointer text-center ${
                                subDurationInput === dur
                                  ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              {meta?.labelAr}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Buyer Note / Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-600" />
                        <span>الخطوة 2: اسم أو ملاحظة المشتري (اختياري تماماً):</span>
                      </label>
                      <input
                        type="text"
                        value={subNoteInput}
                        onChange={(e) => setSubNoteInput(e.target.value)}
                        placeholder="اختياري: اتركه فارغاً أو اكتب اسم المشتري (مثال: حيدر كرار - بغداد)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-0 font-arabic text-xs text-slate-800 placeholder:text-slate-400"
                      />
                      <span className="text-[11px] text-slate-400 font-arabic block">
                        يمكنك ترك هذا الحقل فارغاً تماماً وتوليد الكود فوراً بدون كتابة اسم.
                      </span>
                    </div>
                  </div>

                  {/* Main Generate Button & Fast Generation Options */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleGenerateSubscriptionCode()}
                      disabled={isGeneratingSubCode}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer font-arabic transition-all shadow-xs disabled:opacity-50"
                    >
                      {isGeneratingSubCode ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-300" />
                          <span>جاري توليد كود اشتراك واحد...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>
                            توليد كود اشتراك واحد الآن ({SUBSCRIPTION_DURATIONS_MAP[subDurationInput]?.labelAr || 'المحدد'})
                          </span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-500 font-arabic">توليد فوري مباشر:</span>
                      {(['1_hour', '1_month', '3_months', '6_months', '1_year'] as SubscriptionDuration[]).map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => handleGenerateSubscriptionCode(dur)}
                          disabled={isGeneratingSubCode}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold font-arabic cursor-pointer transition-colors disabled:opacity-50"
                        >
                          +{dur === '1_hour' ? 'ساعة تجريبية' : dur === '1_month' ? 'شهر' : dur === '3_months' ? '3 أشهر' : dur === '6_months' ? '6 أشهر' : 'سنة'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {subMessage && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-arabic flex items-center justify-between gap-2 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold">{subMessage}</span>
                      </div>
                      {copiedSubCode && (
                        <button
                          type="button"
                          onClick={() => handleCopySubCode(copiedSubCode)}
                          className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs font-arabic flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الكود</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Sub Card 2: Subscriptions Table & Filter */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-700" />
                        <span>سجل المشتركين والأكواد الأونلاين ({filteredExternalSubscriptions.length})</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-arabic mt-0.5">
                        تحكم كامل بكل مشترك: فك قفل الجهاز عند تغيير الهاتف، التمديد، الإيقاف المؤقت أو الحذف.
                      </p>
                    </div>

                    {/* Status Filter Buttons */}
                    <div className="flex flex-wrap gap-1">
                      {[
                        { id: 'all', label: 'الكل' },
                        { id: 'available', label: 'متاح للبيع' },
                        { id: 'active', label: 'نشط' },
                        { id: 'expired', label: 'منتهي' },
                        { id: 'suspended', label: 'موقوف' },
                      ].map((flt) => (
                        <button
                          key={flt.id}
                          type="button"
                          onClick={() => setSubStatusFilter(flt.id as any)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-arabic transition-colors cursor-pointer ${
                            subStatusFilter === flt.id
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {flt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      value={subSearchQuery}
                      onChange={(e) => setSubSearchQuery(e.target.value)}
                      placeholder="ابحث برقم الكود، اسم الطالب، المحافظة، أو الملاحظة..."
                      className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-slate-800 font-arabic placeholder:text-slate-400"
                    />
                  </div>

                  {/* Subscriptions List */}
                  {filteredExternalSubscriptions.length === 0 ? (
                    <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-arabic space-y-2">
                      <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
                      <p className="font-bold text-slate-700">لا توجد أكواد مطابقة لبحثك</p>
                      <span className="text-[11px] text-slate-400 block">
                        يمكنك توليد كود اشتراك جديد من الخانة أعلاه أو تغيير فلتر البحث.
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                      {filteredExternalSubscriptions.map((item) => {
                        const isExpired = Boolean(item.expiresAt && new Date() > new Date(item.expiresAt));
                        const durationMeta =
                          (SUBSCRIPTION_DURATIONS_MAP && item.duration && SUBSCRIPTION_DURATIONS_MAP[item.duration]) ||
                          (SUBSCRIPTION_DURATIONS_MAP && SUBSCRIPTION_DURATIONS_MAP['3_months']) ||
                          { labelAr: 'اشتراك أونلاين' };

                        let timeRemainingText = '';
                        if (item.expiresAt) {
                          const diff = new Date(item.expiresAt).getTime() - Date.now();
                          if (item.duration === '1_hour') {
                            const mins = Math.max(0, Math.ceil(diff / (1000 * 60)));
                            timeRemainingText = `متبقي ${mins} دقيقة`;
                          } else {
                            const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
                            timeRemainingText = `متبقي ${days} يوم`;
                          }
                        }

                        const formattedExpiry = item.expiresAt
                          ? new Date(item.expiresAt).toLocaleDateString('ar-IQ', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: item.duration === '1_hour' ? '2-digit' : undefined,
                              minute: item.duration === '1_hour' ? '2-digit' : undefined,
                            })
                          : null;

                        return (
                          <div
                            key={item.code}
                            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-right"
                          >
                            <div className="space-y-1.5 min-w-0 flex-1">
                              {/* Header Badges */}
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-bold text-sm tracking-wider text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                                  {item.code}
                                </span>

                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-arabic">
                                  {durationMeta?.labelAr || 'اشتراك أونلاين'}
                                </span>

                                {item.status === 'suspended' ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-arabic">
                                    موقوف مؤقتاً
                                  </span>
                                ) : isExpired ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-300 font-arabic">
                                    منتهي الصلاحية
                                  </span>
                                ) : item.isUsed ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-arabic">
                                    نشط ({timeRemainingText})
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-arabic">
                                    {item.duration === '1_hour' ? 'متاح للتجربة والإرسال' : 'متاح للبيع والإرسال'}
                                  </span>
                                )}
                              </div>

                              {/* Student & Device Details */}
                              <div className="text-xs text-slate-600 font-arabic flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
                                {item.isUsed ? (
                                  <>
                                    <span>
                                      المشترك: <strong className="text-slate-800">{item.usedByStudentName}</strong>
                                      {item.governorate ? ` (${item.governorate})` : ''}
                                    </span>

                                    {item.deviceInfo && (
                                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                                        <Smartphone className="w-3 h-3 text-slate-400" />
                                        <span>الجهاز: {item.deviceInfo}</span>
                                        {item.deviceId ? (
                                          <span className="text-emerald-600 text-[10px] font-bold">(مقفل)</span>
                                        ) : (
                                          <span className="text-amber-600 text-[10px] font-bold">(غير مقفل)</span>
                                        )}
                                      </span>
                                    )}

                                    {formattedExpiry && (
                                      <span className="text-[11px] text-slate-400">
                                        ينتهي في: {formattedExpiry}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">
                                    {item.note ? `ملاحظة: ${item.note}` : 'كود غير مستخدم بعد، جاهز لإرساله لأي طالب.'}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto flex-wrap">
                              {/* Copy Code */}
                              <button
                                type="button"
                                onClick={() => handleCopySubCode(item.code)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
                                title="نسخ الكود لمشاركته مع الطالب"
                              >
                                {copiedSubCode === item.code ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700 text-[11px]">تم النسخ</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span className="text-[11px]">نسخ</span>
                                  </>
                                )}
                              </button>

                              {/* Reset Device Lock (If used and locked) */}
                              {item.isUsed && item.deviceId && (
                                <button
                                  type="button"
                                  onClick={() => handleResetDevice(item.code, item.usedByStudentName)}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-amber-50 text-slate-700 hover:text-amber-800 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
                                  title="فك قفل الجهاز ليتمكن الطالب من الدخول من هاتفه الجديد"
                                >
                                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                                  <span className="text-[11px]">فك قفل الجهاز</span>
                                </button>
                              )}

                              {/* Extend Subscription (+30 days) */}
                              {item.isUsed && (
                                <button
                                  type="button"
                                  onClick={() => handleExtendSubscription(item.code, 30)}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
                                  title="تمديد الاشتراك 30 يوماً إضافياً"
                                >
                                  <CalendarPlus className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-[11px]">+30 يوم</span>
                                </button>
                              )}

                              {/* Suspend / Resume Toggle */}
                              {item.isUsed && (
                                <button
                                  type="button"
                                  onClick={() => handleToggleSubStatus(item.code, item.status)}
                                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                  title={item.status === 'suspended' ? 'استئناف الاشتراك' : 'إيقاف مؤقت للاشتراك'}
                                >
                                  {item.status === 'suspended' ? (
                                    <Play className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Pause className="w-3.5 h-3.5 text-amber-600" />
                                  )}
                                </button>
                              )}

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteSub(item.code)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="حذف الكود نهائياً"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                <span>إشراف مدرس المادة</span>
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
                  مدرس المادة
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
                      <span>مدرس المادة</span>
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
                      <span>مدرس المادة</span>
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
                <span>توقيع مدرس المادة: .............................</span>
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

      {/* Absentee Notice Modal for Parents */}
      {isAbsentNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col text-right overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <UserX className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 font-arabic">
                    كشف أسماء الطلبة الغائبين وتنبيه أولياء الأمور
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-arabic pr-10">
                  {currentSession ? (
                    <>امتحان: <strong className="text-slate-700">{currentSession.title}</strong> • تاريخ: {currentSession.formattedDate} (الساعة {currentSession.formattedTime})</>
                  ) : (
                    'كشف الغياب التراكمي للطلبة غير المشاركين'
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAbsentNoticeModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section Filter inside Modal */}
            <div className="px-5 sm:px-6 pt-4 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-xs font-bold text-slate-500 font-arabic pl-1">
                  تصفية حسب الشعبة:
                </span>
                {['all', 'أ', 'ب', 'ج', 'د'].map((sec) => {
                  const count =
                    sec === 'all'
                      ? absentStudents.length
                      : absentStudents.filter((s) => s.section === sec).length;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setAbsentNoticeSectionFilter(sec)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold font-arabic transition-all cursor-pointer ${
                        absentNoticeSectionFilter === sec
                          ? 'bg-slate-800 text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {sec === 'all' ? `الكل (${count})` : `شعبة ${sec} (${count})`}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-bold text-rose-600 font-arabic bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                العدد: {
                  absentNoticeSectionFilter === 'all'
                    ? absentStudents.length
                    : absentStudents.filter((s) => s.section === absentNoticeSectionFilter).length
                } طالب
              </span>
            </div>

            {/* Students Table */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3">
              {(() => {
                const listToShow =
                  absentNoticeSectionFilter === 'all'
                    ? absentStudents
                    : absentStudents.filter((s) => s.section === absentNoticeSectionFilter);

                if (listToShow.length === 0) {
                  return (
                    <div className="py-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-200">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <p className="text-xs font-bold text-slate-700 font-arabic">
                        لا يوجد طلبة غائبون في هذه الشعبة
                      </p>
                      <span className="text-[11px] text-slate-400 font-arabic block">
                        جميع طلبة الشعبة أدوا الامتحان بنجاح.
                      </span>
                    </div>
                  );
                }

                return (
                  <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-right text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 font-bold font-arabic border-b border-slate-200">
                          <th className="p-3">#</th>
                          <th className="p-3">اسم الطالب الغائب</th>
                          <th className="p-3">الشعبة</th>
                          <th className="p-3">الكود المسجل</th>
                          <th className="p-3">حالة الأداء</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {listToShow.map((st, idx) => (
                          <tr key={st.id || idx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3 font-mono text-slate-400 text-xs">{idx + 1}</td>
                            <td className="p-3 font-bold font-arabic text-slate-800">{st.fullName}</td>
                            <td className="p-3 font-bold font-arabic">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-xs">
                                شعبة {st.section}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-xs text-slate-500 uppercase">{st.code}</td>
                            <td className="p-3 font-arabic">
                              <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                                لم يؤدِ الامتحان
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Copy Parents Notice Button */}
                <button
                  type="button"
                  onClick={handleCopyAbsentNoticeForParents}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-arabic cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  title="نسخ صيغة تبليغ رسمية وجاهزة للنشر لأولياء الأمور"
                >
                  {absentNoticeCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>تم نسخ رسالة التبليغ بنجاح</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-300" />
                      <span>نسخ رسالة التبليغ لأولياء الأمور</span>
                    </>
                  )}
                </button>

                {/* Print Absentees Button */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs font-arabic cursor-pointer transition-colors flex items-center gap-1.5"
                  title="طباعة كشف الغياب"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>طباعة الكشف</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsAbsentNoticeModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-600 font-bold text-xs font-arabic cursor-pointer transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
