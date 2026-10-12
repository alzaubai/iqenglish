import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Award,
  Search,
  Filter,
  Lock,
} from 'lucide-react';
import { unit1GrammarTopicsList, GrammarTopicData, ExamPracticeItem } from '../../data/unit1GrammarTopics';
import { SpeechEngine } from '../../utils/speech';

interface GrammarTopicDetailProps {
  topicId: string;
  onBackToTopics: () => void;
  onBackToUnits: () => void;
  onSelectTopic: (topicId: string) => void;
  unlockedGrammarTopics?: string[];
}

export const GrammarTopicDetail: React.FC<GrammarTopicDetailProps> = ({
  topicId,
  onBackToTopics,
  onBackToUnits,
  onSelectTopic,
  unlockedGrammarTopics,
}) => {
  const currentTopic =
    unit1GrammarTopicsList.find((t) => t.id === topicId) || unit1GrammarTopicsList[0];

  const currentIndex = unit1GrammarTopicsList.findIndex((t) => t.id === currentTopic.id);
  const prevTopic = currentIndex > 0 ? unit1GrammarTopicsList[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < unit1GrammarTopicsList.length - 1 ? unit1GrammarTopicsList[currentIndex + 1] : null;

  const isCurrentTopicUnlocked =
    Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
      ? unlockedGrammarTopics.includes(currentTopic.id)
      : currentTopic.id === 'topic-past-simple';

  const isPrevUnlocked = prevTopic
    ? Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
      ? unlockedGrammarTopics.includes(prevTopic.id)
      : prevTopic.id === 'topic-past-simple'
    : false;

  const isNextUnlocked = nextTopic
    ? Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
      ? unlockedGrammarTopics.includes(nextTopic.id)
      : nextTopic.id === 'topic-past-simple'
    : false;

  // Active sub-tab state depending on topic type
  const [activeTab, setActiveTab] = useState<string>(
    currentTopic.overview ? 'overview' : 'affirmative'
  );
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  // Verbs table filter & search
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');
  const [verbSearch, setVerbSearch] = useState<string>('');

  // Switch default tab on topic switch
  useEffect(() => {
    if (currentTopic.overview) {
      setActiveTab('overview');
    } else if (currentTopic.topicType === 'tense') {
      setActiveTab('affirmative');
    }
    setVerbFilter('all');
    setVerbSearch('');
  }, [currentTopic.id]);

  // Filtered textbook verbs
  const filteredVerbs = useMemo(() => {
    if (!currentTopic.overview?.textbookVerbs) return [];
    return currentTopic.overview.textbookVerbs.filter((v) => {
      const matchesType = verbFilter === 'all' || v.type === verbFilter;
      const q = verbSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.ar.includes(q) ||
        (v.note && v.note.includes(q));
      return matchesType && matchesSearch;
    });
  }, [currentTopic.overview, verbFilter, verbSearch]);

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const renderHighlightedSentence = (
    sentence: string,
    highlight?: string,
    colorClass: string = 'text-blue-600 font-black underline decoration-blue-400 decoration-2'
  ) => {
    if (!highlight) return sentence;
    const parts = sentence.split(highlight);
    if (parts.length === 1) return sentence;
    return (
      <>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className={colorClass}>{highlight}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const handleSpeak = (text: string) => {
    setPlayingAudio(text);
    SpeechEngine.speakText(text, {
      rate: 0.85,
      onEnd: () => setPlayingAudio(null),
      onError: () => setPlayingAudio(null),
    });
  };

  const handleSelectAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setPracticeAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
    if (isCorrect) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleResetPractice = () => {
    setPracticeAnswers({});
    setRevealedAnswers({});
  };

  // Strict Lock Guard: If the current topic is locked, display the locked state
  if (!isCurrentTopicUnlocked) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToTopics}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>قائمة مواضيع الوحدة الأولى</span>
            </button>
            <button
              onClick={onBackToUnits}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
            >
              قائمة الوحدات
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-xs text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 font-arabic">
            هذا الموضوع القواعدي مغلق حالياً
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
            تم قفل هذا الموضوع القواعدي من قبل مدرس المادة: أ. حسام محمود منصور
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToTopics}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-arabic cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لقائمة المواضيع المتاحة</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. TOP NAVIGATION & TOPIC SWITCHER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToTopics}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>قائمة مواضيع الوحدة الأولى</span>
          </button>
          <button
            onClick={onBackToUnits}
            className="px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
          >
            قائمة الوحدات
          </button>
        </div>

        {/* Quick switcher between the 5 topics */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => {
              if (prevTopic && isPrevUnlocked) {
                onSelectTopic(prevTopic.id);
              }
            }}
            disabled={!prevTopic || !isPrevUnlocked}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              !prevTopic || !isPrevUnlocked
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title={!prevTopic ? 'الموضوع السابق' : !isPrevUnlocked ? 'الموضوع السابق مغلق' : 'الموضوع السابق'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-3 py-1 bg-zinc-100 text-zinc-800 rounded-xl font-arabic">
            الموضوع {currentTopic.number} من 5
          </span>

          <button
            onClick={() => {
              if (nextTopic && isNextUnlocked) {
                onSelectTopic(nextTopic.id);
              }
            }}
            disabled={!nextTopic || !isNextUnlocked}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              !nextTopic || !isNextUnlocked
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title={!nextTopic ? 'الموضوع التالي' : !isNextUnlocked ? 'الموضوع التالي مغلق' : 'الموضوع التالي'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. TOPIC HEADER CARD */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-4 sm:p-7 shadow-xs text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono">
                TOPIC 0{currentTopic.number}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-arabic">
                {currentTopic.badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2.5 font-arabic">
              {currentTopic.titleAr}
            </h2>
            <p className="text-sm text-zinc-500 font-sans mt-0.5 font-bold" dir="ltr">
              {currentTopic.titleEn}
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-3 leading-relaxed">
              {currentTopic.summaryAr}
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-center shrink-0 self-start sm:self-center">
            <span className="text-xs text-zinc-500 font-arabic block">المنهاج الرسمي</span>
            <span className="text-xs font-bold text-zinc-900 font-arabic block mt-0.5">
              الأول المتوسط
            </span>
            <span className="text-[11px] text-slate-700 font-bold font-arabic block mt-1">
              مدرس المادة: أ. حسام محمود منصور
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUB-TABS SELECTOR ACCORDING TO TOPIC TYPE                              */}
      {/* ========================================================================= */}

      {/* A. TENSES (الماضي البسيط والماضي المستمر) */}
      {currentTopic.topicType === 'tense' && (
        <div className="space-y-6">
          {/* Tabs bar */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200 shadow-2xs flex flex-wrap gap-2">
            {(currentTopic.overview
              ? [
                  { id: 'overview', title: '1. المقدمة والدلالات وأفعال الكتاب' },
                  { id: 'affirmative', title: '2. الإثبات (Affirmative)' },
                  { id: 'negative', title: '3. النفي (Negative)' },
                  { id: 'question', title: '4. الاستفهام (Question)' },
                  { id: 'practice', title: '5. تمارين امتحانية شهرية' },
                ]
              : [
                  { id: 'affirmative', title: '1. الإثبات (Affirmative)' },
                  { id: 'negative', title: '2. النفي (Negative)' },
                  { id: 'question', title: '3. الاستفهام (Question)' },
                  { id: 'spelling', title: '4. ملاحظات الإملاء' },
                  { id: 'practice', title: '5. تمارين امتحانية شهرية' },
                ]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[95px] sm:min-w-[120px] py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* TAB: OVERVIEW (CARD 1: متى ولماذا + دلالات الزمن + قواعد الإملاء + جدول أفعال الكتاب) */}
          {activeTab === 'overview' && currentTopic.overview && (
            <div className="space-y-6">
              {/* Card 1.1: الاستخدام / لماذا ومتى نستخدم هذا الزمن؟ */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 text-right">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-blue-600 text-white rounded-xl">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-blue-950 font-arabic">
                      {currentTopic.overview.usageTitleAr}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200" dir="ltr">
                    Usage & Meaning
                  </span>
                </div>

                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-2xl shadow-2xs space-y-2">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 font-arabic leading-relaxed">
                    {currentTopic.overview.usageDescAr}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-700 font-arabic pt-1">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>
                      {currentTopic.overview.quickNoteAr || 'ملاحظة فهم سريعة: الحدث انتهى تماماً في الماضي قبل أن تبدأ بالكلام الآن.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 1.2: دلالات الزمن (Time Markers) */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-amber-500 text-white rounded-xl">
                      <Lightbulb className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-amber-950 font-arabic">
                        دلالات زمن {currentTopic.titleAr} (Time Markers)
                      </h4>
                      <span className="text-xs text-zinc-500 font-arabic">
                        إذا وجدت إحدى هذه الكلمات في جملة الامتحان ➔ فالحل يكون في زمن {currentTopic.titleAr}!
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200" dir="ltr">
                    Keywords
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentTopic.overview.timeMarkers.map((tm, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-zinc-50/70 hover:bg-zinc-50 border border-zinc-200 rounded-2xl transition-all space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-amber-600 text-white rounded-xl font-mono font-bold text-sm shadow-2xs" dir="ltr">
                          {tm.marker}
                        </span>
                        <span className="text-xs font-bold text-amber-950 font-arabic">
                          {tm.ar}
                        </span>
                      </div>

                      <div className="p-3 bg-white border border-zinc-200 rounded-xl flex items-center justify-between">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                          {tm.exampleEn}
                        </p>
                        <button
                          onClick={() => handleSpeak(tm.exampleEn)}
                          className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shrink-0 shadow-2xs"
                          title="استمع للمثال"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 1.3: قواعد الإملاء */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-600 text-white rounded-xl">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-emerald-950 font-arabic">
                        قواعد إضافة {currentTopic.overview.spellingTitleAr || '(ed) للأفعال القياسية'}
                      </h4>
                      <span className="text-xs text-zinc-500 font-arabic">
                        {currentTopic.overview.spellingSubtitleAr || 'مهمة جداً في سؤال الإملاء وسؤال تصحيح الفعل للامتحانات الشهرية'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200" dir="ltr">
                    Spelling Rules
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTopic.overview.spellingRules.map((rule, idx) => (
                    <div key={idx} className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-2xl space-y-2.5">
                      <h5 className="text-sm font-black text-emerald-950 font-arabic">
                        {rule.titleAr}
                      </h5>
                      <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                        {rule.descAr}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-1 font-sans" dir="ltr">
                        {rule.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-2.5 bg-white border border-zinc-200 rounded-xl text-left">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500 font-medium">{ex.base}</span>
                              <span className="text-zinc-400">➔</span>
                              <strong className="text-xs font-bold text-emerald-700 font-mono">{ex.changed}</strong>
                              <button
                                onClick={() => handleSpeak(`${ex.base}, ${ex.changed}`)}
                                className="p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                                title="استمع"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-[11px] text-zinc-500 font-arabic mt-1 text-right" dir="rtl">{ex.ar}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 1.4: جدول أفعال كتاب الصف الأول المتوسط المقررة */}
              {currentTopic.overview.textbookVerbs && (
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-indigo-600 text-white rounded-xl">
                          <Award className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-indigo-950 font-arabic">
                            جدول أفعال كتاب الصف الأول المتوسط (المقررة في المنهاج)
                          </h4>
                          <span className="text-xs text-zinc-500 font-arabic">
                            {currentTopic.id === 'topic-past-continuous'
                              ? 'أفعال منهجية مقررة مع تصريف المستمر (V-ing) وتطبيق قواعد الإملاء'
                              : 'أفعال قياسية (Regular) وأفعال شاذة (Irregular) مستخرجة من كتاب الطالب وكتاب النشاط'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-900 rounded-xl font-arabic border border-indigo-200">
                        {currentTopic.overview.textbookVerbs.length} فعل منهجي
                      </span>
                    </div>
                  </div>

                  {/* Filter and Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-50/70 p-3 rounded-2xl border border-zinc-200 shadow-2xs">
                    {/* Filter buttons */}
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-zinc-200">
                      <button
                        onClick={() => setVerbFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                          verbFilter === 'all'
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        الكل ({currentTopic.overview.textbookVerbs.length})
                      </button>
                      <button
                        onClick={() => setVerbFilter('regular')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                          verbFilter === 'regular'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {currentTopic.id === 'topic-past-continuous'
                          ? `إضافة مباشرة (${currentTopic.overview.textbookVerbs.filter(v => v.type === 'regular').length})`
                          : `قياسية Regular (${currentTopic.overview.textbookVerbs.filter(v => v.type === 'regular').length})`}
                      </button>
                      <button
                        onClick={() => setVerbFilter('irregular')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                          verbFilter === 'irregular'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {currentTopic.id === 'topic-past-continuous'
                          ? `تغيير إملائي (${currentTopic.overview.textbookVerbs.filter(v => v.type === 'irregular').length})`
                          : `شاذة Irregular (${currentTopic.overview.textbookVerbs.filter(v => v.type === 'irregular').length})`}
                      </button>
                    </div>

                    {/* Search input */}
                    <div className="relative flex-1 max-w-xs">
                      <input
                        type="text"
                        value={verbSearch}
                        onChange={(e) => setVerbSearch(e.target.value)}
                        placeholder="ابحث عن فعل..."
                        className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-arabic text-right"
                      />
                      <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
                    <table className="w-full text-right border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-900 font-bold font-arabic border-b border-zinc-200">
                          <th className="p-3">الفعل المجرد (Base)</th>
                          <th className="p-3">
                            {currentTopic.id === 'topic-past-continuous' ? 'صيغة المستمر (V-ing)' : 'صيغة الماضي (Past)'}
                          </th>
                          <th className="p-3">المعنى بالعربية</th>
                          <th className="p-3">
                            {currentTopic.id === 'topic-past-continuous' ? 'قاعدة الإضافة' : 'النوع'}
                          </th>
                          <th className="p-3">الموقع في الكتاب</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {filteredVerbs.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-zinc-400 font-arabic">
                              لا توجد أفعال مطابقة للبحث
                            </td>
                          </tr>
                        ) : (
                          filteredVerbs.map((v, idx) => (
                            <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                              <td className="p-3 font-bold font-mono text-zinc-900" dir="ltr">
                                <div className="flex items-center gap-2">
                                  <span>{v.base}</span>
                                  <button
                                    onClick={() => handleSpeak(v.base)}
                                    className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                                    title="استمع للفعل المجرد"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                              <td className="p-3 font-bold font-mono text-sm" dir="ltr">
                                <div className="flex items-center gap-2">
                                  <span className={v.type === 'regular' ? 'text-blue-600 font-bold' : 'text-purple-700 font-black'}>
                                    {v.past}
                                  </span>
                                  <button
                                    onClick={() => handleSpeak(v.past.split(' ')[0])}
                                    className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                                    title="استمع لصيغة الماضي"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                              <td className="p-3 font-arabic font-medium text-zinc-800">
                                {v.ar}
                              </td>
                              <td className="p-3 font-arabic">
                                {v.type === 'regular' ? (
                                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
                                    قياسي (ed)
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
                                    شاذ (يحفظ)
                                  </span>
                                )}
                              </td>
                              <td className="p-3 font-arabic text-zinc-500 text-[11px]">
                                {v.note || 'منهج الأول متوسط'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AFFIRMATIVE (الإثبات + شلون يجي بالامتحان) */}
          {activeTab === 'affirmative' && currentTopic.affirmative && (
            <div className="space-y-6">
              {/* Formula Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h4 className="text-base sm:text-lg font-black text-blue-950 font-arabic">
                    صيغة القاعدة في حالة الإثبات (Affirmative)
                  </h4>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200" dir="ltr">
                    Affirmative Formula
                  </span>
                </div>

                {/* Clean Visual Formula Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-zinc-50/70 rounded-2xl border border-zinc-200 shadow-2xs" dir="ltr">
                  {currentTopic.affirmative.formulaChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs ${
                        chip.isHighlight
                          ? 'bg-blue-600 text-white font-mono text-sm sm:text-base ring-2 ring-blue-300'
                          : chip.text === '+' || chip.text === 'أو'
                          ? 'text-blue-600 font-black text-base shadow-none'
                          : 'bg-white border border-zinc-200 text-zinc-900 font-arabic'
                      }`}
                    >
                      {chip.text}
                    </span>
                  ))}
                </div>

                {/* كارت ملاحظة جوهري نظيف وأبيض */}
                {currentTopic.id === 'topic-past-continuous' ? (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
                    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                      <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 border border-emerald-100">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                          ملاحظة هامة: اختيار الفعل المساعد (was أو were) حسب الفاعل
                        </h5>
                        <span className="text-xs text-zinc-500 font-arabic">
                          الخطوة الأولى والأساسية لحل أي جملة ماضٍ مستمر في الامتحان
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                      <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">1. فاعل مفرد (Singular)</span>
                          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-mono font-bold">was + v-ing</span>
                        </div>
                        <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                          مع الضمائر (I, He, She, It) أو أي اسم مفرد (Ali, The boy):
                        </p>
                        <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                          Ali ➔ <span className="text-emerald-600 font-bold">was playing</span> &nbsp;|&nbsp; I ➔ <span className="text-emerald-600 font-bold">was writing</span>
                        </p>
                      </div>

                      <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">2. فاعل جمع (Plural)</span>
                          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-mono font-bold">were + v-ing</span>
                        </div>
                        <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                          مع الضمائر (We, You, They) أو أي اسم جمع (The boys, Students):
                        </p>
                        <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                          They ➔ <span className="text-blue-600 font-bold">were watching</span> &nbsp;|&nbsp; Boys ➔ <span className="text-blue-600 font-bold">were swimming</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
                    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                      <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                          ملاحظة هامة: الفعل الماضي نوعان (لا ثالث لهما)
                        </h5>
                        <span className="text-xs text-zinc-500 font-arabic">
                          القاعدة الذهبية التي يجب أن تميزها قبل حل أي جملة
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                      <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">1. فعل قياسي (Regular)</span>
                          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-mono font-bold">+ ed</span>
                        </div>
                        <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                          يقبل إضافة ed لنهايته مباشرة أو حسب قواعد الإملاء:
                        </p>
                        <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                          play ➔ <span className="text-blue-600 font-bold">played</span> &nbsp;|&nbsp; visit ➔ <span className="text-blue-600 font-bold">visited</span>
                        </p>
                      </div>

                      <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">2. فعل شاذ (Irregular)</span>
                          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md font-arabic font-bold">يُحفظ غيباً!</span>
                        </div>
                        <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                          يتغير شكله بالكامل ولا يقبل ed إطلاقاً (محفوظ من جدول الأفعال):
                        </p>
                        <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                          go ➔ <span className="text-amber-600 font-bold">went</span> &nbsp;|&nbsp; see ➔ <span className="text-amber-600 font-bold">saw</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed whitespace-pre-line bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
                  {currentTopic.affirmative.explanationAr}
                </div>

                {/* Spoken Examples with Time Markers */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-blue-900 font-arabic block">
                    أمثلة ناطقة مع دلالات الزمن:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentTopic.affirmative.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-blue-200 transition-colors"
                      >
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                            {renderHighlightedSentence(
                              ex.en,
                              ex.highlight,
                              'text-blue-600 font-black underline decoration-blue-300 decoration-2'
                            )}
                          </p>
                          <p className="text-xs text-zinc-500 font-arabic mt-1">
                            {ex.ar}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className="p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shrink-0 shadow-2xs"
                          title="استمع للنطق"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time markers note (if available) */}
                {currentTopic.timeMarkers && (
                  <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-4 text-right space-y-2">
                    <span className="text-xs font-bold text-amber-900 font-arabic flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>دلائل الزمن المتكررة في جمل الإثبات:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-arabic">
                      {currentTopic.timeMarkers.map((tm, idx) => (
                        <div key={idx} className="p-2 bg-white rounded-xl border border-zinc-200">
                          • {tm}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* شلون يجي بالامتحان؟ (تطبيقات امتحانية للإثبات مع بناء الجملة خطوة بخطوة وتظليل التغيير) */}
              {currentTopic.affirmative.examApplications && currentTopic.affirmative.examApplications.length > 0 && (
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-blue-600 text-white rounded-xl">
                        <HelpCircle className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-blue-950 font-arabic">
                          صيغ وتطبيقات امتحانية (تطبيقات امتحانية على الإثبات)
                        </h4>
                        <span className="text-xs text-zinc-500 font-arabic">
                          تفصيخ وبناء عناصر الجملة خطوة بخطوة وتظليل الكلمة التي تغيّرت
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200" dir="ltr">
                      Exam Style
                    </span>
                  </div>

                  <div className="space-y-5">
                    {currentTopic.affirmative.examApplications.map((item, idx) => (
                      <div key={item.id} className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-2xl space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-mono shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-blue-950 font-arabic bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
                            {item.instructionAr}
                          </span>
                        </div>

                        {/* 1. Problem with bracket */}
                        <div className="p-3.5 bg-zinc-50/70 border border-zinc-200 rounded-xl flex items-center justify-between shadow-2xs">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                            {item.problemEn}
                          </p>
                          <button
                            onClick={() => handleSpeak(item.problemEn)}
                            className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-600 cursor-pointer shrink-0 border border-zinc-200"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* 2. خطوات تفصيخ وبناء الجملة خطوة بخطوة (وحدة جوه وحدة) */}
                        {item.cumulativeSteps && item.cumulativeSteps.length > 0 ? (
                          <div className="bg-zinc-50/60 border border-zinc-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
                            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                              <span className="text-xs font-black text-zinc-900 font-arabic flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                <span>خطوات بناء الجملة تفصيلياً (وحدة جوه وحدة):</span>
                              </span>
                              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-arabic">
                                بناء تدريجي
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {item.cumulativeSteps.map((step) => (
                                <div
                                  key={step.stepNumber}
                                  className="p-3 bg-white rounded-xl border border-zinc-200 shadow-2xs space-y-2 text-right font-arabic"
                                >
                                  {/* Header of step */}
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[11px] font-bold font-mono flex items-center justify-center shrink-0">
                                        {step.stepNumber}
                                      </span>
                                      <span className="font-bold text-xs sm:text-sm text-zinc-900">
                                        {step.titleAr}
                                      </span>
                                    </div>
                                    {step.highlightToken && (
                                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shrink-0" dir="ltr">
                                        {step.highlightToken}
                                      </span>
                                    )}
                                  </div>

                                  {/* Explanation in Arabic */}
                                  <p className="text-xs text-zinc-600 leading-relaxed pr-7">
                                    {step.explanationAr}
                                  </p>

                                  {/* Sentence progress so far */}
                                  <div className="flex flex-wrap items-center gap-2 pt-1 pr-7" dir="ltr">
                                    <span className="text-[11px] text-zinc-500 font-arabic font-medium shrink-0" dir="rtl">
                                      الجملة حتى الآن:
                                    </span>
                                    <div className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-mono font-bold text-zinc-900 shadow-2xs">
                                      {renderHighlightedSentence(
                                        step.sentenceProgress,
                                        step.highlightToken,
                                        'text-blue-600 font-black underline decoration-blue-300'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          item.dissection && item.dissection.length > 0 && (
                            <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[11px] font-bold text-zinc-600 font-arabic flex items-center gap-1.5">
                                <span>تحليل عناصر الجملة:</span>
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.dissection.map((part, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="p-2.5 rounded-xl border bg-white text-xs flex flex-col gap-0.5 text-right font-arabic"
                                  >
                                    <span className="text-[10px] font-bold text-blue-800">
                                      {part.label}:
                                    </span>
                                    <span className="font-bold text-zinc-900 text-xs">
                                      {part.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}

                        {/* 3. الحل النموذجي مع تظليل التغيير */}
                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-1.5 text-left" dir="ltr">
                            <span className="text-[11px] font-bold text-emerald-800 font-arabic block text-right" dir="rtl">
                              الحل النموذجي النهائي:
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5 font-sans text-sm sm:text-base font-bold text-zinc-900">
                              {item.solutionTokens ? (
                                item.solutionTokens.map((tok, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className={
                                      tok.isChanged
                                        ? 'bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg shadow-xs font-mono font-black text-sm sm:text-base ring-2 ring-emerald-300'
                                        : 'text-zinc-800'
                                    }
                                  >
                                    {tok.text}
                                  </span>
                                ))
                              ) : (
                                <span className="font-bold text-emerald-950">{item.solutionEn}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleSpeak(item.solutionEn)}
                            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0 self-end sm:self-center shadow-xs flex items-center gap-1.5 text-xs font-bold font-arabic"
                            title="استمع للحل"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>استمع للحل</span>
                          </button>
                        </div>

                        {/* 4. خطوة الحل المباشرة */}
                        {item.actionStepAr && (
                          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-arabic text-amber-950 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md font-bold text-[10px] shrink-0">
                              خطوة الحل
                            </span>
                            <span className="font-bold">{item.actionStepAr}</span>
                          </div>
                        )}

                        {/* 5. توضيح المعلم */}
                        <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-arabic text-zinc-700 leading-relaxed">
                          <span className="font-bold text-zinc-900">شرح طريقة المعالجة:</span> {item.noteAr}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NEGATIVE (النفي + شلون يجي بالامتحان) */}
          {activeTab === 'negative' && currentTopic.negative && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h4 className="text-base sm:text-lg font-black text-rose-950 font-arabic">
                    صيغة القاعدة في حالة النفي (Negative)
                  </h4>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-rose-50 text-rose-800 rounded-xl border border-rose-200" dir="ltr">
                    Negative Formula
                  </span>
                </div>

                {/* Formula Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-zinc-50/70 rounded-2xl border border-zinc-200 shadow-2xs" dir="ltr">
                  {currentTopic.negative.formulaChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs ${
                        chip.isHighlight
                          ? 'bg-rose-600 text-white font-mono text-sm sm:text-base ring-2 ring-rose-300'
                          : chip.text === '+'
                          ? 'text-rose-600 font-black text-base shadow-none'
                          : 'bg-white border border-zinc-200 text-zinc-900 font-arabic'
                      }`}
                    >
                      {chip.text}
                    </span>
                  ))}
                </div>

                {/* كارت ملاحظة: القاعدة الذهبية للنفي - تصميم أبيض هادئ ونظيف */}
                {currentTopic.id === 'topic-past-continuous' ? (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
                    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                      <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                          ملاحظة هامة جداً: القاعدة الذهبية لنفي الماضي المستمر
                        </h5>
                        <span className="text-xs text-zinc-500 font-arabic">
                          أكبر خطأ يقع فيه طلاب الأول متوسط: إياك أن تحذف ing في النفي!
                        </span>
                      </div>
                    </div>

                    <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
                      <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                        نفي الماضي المستمر سهل جداً: نضع <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">not</span> بعد الفعل المساعد was أو were مباشرة لتصبح (<span className="font-mono font-bold text-rose-700">wasn't</span> / <span className="font-mono font-bold text-rose-700">weren't</span>)، ويبقى الفعل <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">محافظاً على إضافة (ing)</span> ولا يحذف منه أي شيء!
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                        <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                          خطأ شائع: He wasn't <span className="line-through text-rose-600 font-bold">play</span>
                        </div>
                        <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                          الصحيح دائماً: He wasn't <span className="text-emerald-700 font-black underline">playing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
                    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                      <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                          ملاحظة هامة جداً: القاعدة الذهبية للنفي
                        </h5>
                        <span className="text-xs text-zinc-500 font-arabic">
                          احذر من هذا الخطأ الشائع عند تحويل الجملة إلى نفي
                        </span>
                      </div>
                    </div>

                    <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
                      <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                        بمجرد أن نضع أداة النفي <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">didn't</span> بعد الفاعل، فإنها تلغي صيغة الماضي وترجع الفعل فوراً إلى <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">أصله المجرد (Base)</span> خالياً من أي إضافة!
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                        <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                          خطأ شائع: He didn't <span className="line-through text-rose-600 font-bold">went</span>
                        </div>
                        <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                          الصحيح دائماً: He didn't <span className="text-emerald-700 font-black underline">go</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
                  {currentTopic.negative.explanationAr}
                </div>

                {/* Negative Examples */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-rose-900 font-arabic block">
                    أمثلة النفي الناطقة مع دلالات الزمن:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentTopic.negative.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-rose-200 transition-colors"
                      >
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                            {renderHighlightedSentence(
                              ex.en,
                              ex.highlight,
                              'text-rose-600 font-black underline decoration-rose-300 decoration-2'
                            )}
                          </p>
                          <p className="text-xs text-zinc-500 font-arabic mt-1">
                            {ex.ar}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className="p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shrink-0 shadow-2xs"
                          title="استمع للنطق"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* شلون يجي بالامتحان؟ (تطبيقات امتحانية على النفي مع بناء الجملة خطوة بخطوة وتظليل التغيير) */}
              {currentTopic.negative.examApplications && currentTopic.negative.examApplications.length > 0 && (
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-rose-600 text-white rounded-xl">
                        <HelpCircle className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-rose-950 font-arabic">
                          صيغ وتطبيقات امتحانية (تطبيقات امتحانية على النفي)
                        </h4>
                        <span className="text-xs text-zinc-500 font-arabic">
                          تفصيخ وبناء الجملة وإبراز وضع didn't وإرجاع الفعل لأصله
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-rose-50 text-rose-800 rounded-xl border border-rose-200" dir="ltr">
                      Negative Questions
                    </span>
                  </div>

                  <div className="space-y-5">
                    {currentTopic.negative.examApplications.map((item, idx) => (
                      <div key={item.id} className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-2xl space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center justify-center font-mono shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-rose-950 font-arabic bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
                            {item.instructionAr}
                          </span>
                        </div>

                        {/* 1. Problem with bracket */}
                        <div className="p-3.5 bg-zinc-50/70 border border-zinc-200 rounded-xl flex items-center justify-between shadow-2xs">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                            {item.problemEn}
                          </p>
                          <button
                            onClick={() => handleSpeak(item.problemEn)}
                            className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-600 cursor-pointer shrink-0 border border-zinc-200"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* 2. خطوات تفصيخ وبناء الجملة خطوة بخطوة (وحدة جوه وحدة) */}
                        {item.cumulativeSteps && item.cumulativeSteps.length > 0 ? (
                          <div className="bg-zinc-50/60 border border-zinc-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
                            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                              <span className="text-xs font-black text-zinc-900 font-arabic flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                                <span>خطوات بناء جملة النفي تفصيلياً (وحدة جوه وحدة):</span>
                              </span>
                              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 font-arabic">
                                بناء تدريجي
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {item.cumulativeSteps.map((step) => (
                                <div
                                  key={step.stepNumber}
                                  className="p-3 bg-white rounded-xl border border-zinc-200 shadow-2xs space-y-2 text-right font-arabic"
                                >
                                  {/* Header of step */}
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-md bg-rose-600 text-white text-[11px] font-bold font-mono flex items-center justify-center shrink-0">
                                        {step.stepNumber}
                                      </span>
                                      <span className="font-bold text-xs sm:text-sm text-zinc-900">
                                        {step.titleAr}
                                      </span>
                                    </div>
                                    {step.highlightToken && (
                                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 shrink-0" dir="ltr">
                                        {step.highlightToken}
                                      </span>
                                    )}
                                  </div>

                                  {/* Explanation in Arabic */}
                                  <p className="text-xs text-zinc-600 leading-relaxed pr-7">
                                    {step.explanationAr}
                                  </p>

                                  {/* Sentence progress so far */}
                                  <div className="flex flex-wrap items-center gap-2 pt-1 pr-7" dir="ltr">
                                    <span className="text-[11px] text-zinc-500 font-arabic font-medium shrink-0" dir="rtl">
                                      الجملة حتى الآن:
                                    </span>
                                    <div className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-mono font-bold text-zinc-900 shadow-2xs">
                                      {renderHighlightedSentence(
                                        step.sentenceProgress,
                                        step.highlightToken,
                                        'text-rose-600 font-black underline decoration-rose-300'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          item.dissection && item.dissection.length > 0 && (
                            <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[11px] font-bold text-zinc-600 font-arabic flex items-center gap-1.5">
                                <span>تحليل عناصر الجملة:</span>
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.dissection.map((part, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="p-2.5 rounded-xl border bg-white text-xs flex flex-col gap-0.5 text-right font-arabic"
                                  >
                                    <span className="text-[10px] font-bold text-rose-800">
                                      {part.label}:
                                    </span>
                                    <span className="font-bold text-zinc-900 text-xs">
                                      {part.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}

                        {/* 3. الحل النموذجي مع تظليل التغيير */}
                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-1.5 text-left" dir="ltr">
                            <span className="text-[11px] font-bold text-emerald-800 font-arabic block text-right" dir="rtl">
                              الحل النموذجي النهائي:
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5 font-sans text-sm sm:text-base font-bold text-zinc-900">
                              {item.solutionTokens ? (
                                item.solutionTokens.map((tok, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className={
                                      tok.isChanged
                                        ? 'bg-rose-600 text-white px-2.5 py-0.5 rounded-lg shadow-xs font-mono font-black text-sm sm:text-base ring-2 ring-rose-300'
                                        : 'text-zinc-800'
                                    }
                                  >
                                    {tok.text}
                                  </span>
                                ))
                              ) : (
                                <span className="font-bold text-emerald-950">{item.solutionEn}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleSpeak(item.solutionEn)}
                            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0 self-end sm:self-center shadow-xs flex items-center gap-1.5 text-xs font-bold font-arabic"
                            title="استمع للحل"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>استمع للحل</span>
                          </button>
                        </div>

                        {/* 4. خطوة الحل المباشرة */}
                        {item.actionStepAr && (
                          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-arabic text-amber-950 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md font-bold text-[10px] shrink-0">
                              خطوة الحل
                            </span>
                            <span className="font-bold">{item.actionStepAr}</span>
                          </div>
                        )}

                        {/* 5. توضيح المعلم */}
                        <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-arabic text-zinc-700 leading-relaxed">
                          <span className="font-bold text-zinc-900">شرح طريقة المعالجة:</span> {item.noteAr}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: QUESTION (الاستفهام + شلون يجي بالامتحان) */}
          {activeTab === 'question' && currentTopic.question && (
            <div className="space-y-6">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h4 className="text-base sm:text-lg font-black text-indigo-950 font-arabic">
                    صيغة السؤال (Question)
                  </h4>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200" dir="ltr">
                    Question Formula
                  </span>
                </div>

                {/* Formula Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-zinc-50/70 rounded-2xl border border-zinc-200 shadow-2xs" dir="ltr">
                  {currentTopic.question.formulaChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs ${
                        chip.isHighlight
                          ? 'bg-indigo-600 text-white font-mono text-sm sm:text-base ring-2 ring-indigo-300'
                          : chip.text === '+'
                          ? 'text-indigo-600 font-black text-base shadow-none'
                          : 'bg-white border border-zinc-200 text-zinc-900 font-arabic'
                      }`}
                    >
                      {chip.text}
                    </span>
                  ))}
                </div>

                {/* كارت ملاحظة: خطوات تكوين السؤال - تصميم أبيض هادئ ونظيف */}
                {currentTopic.id === 'topic-past-continuous' ? (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
                    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                      <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                        <HelpCircle className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                          ملاحظة هامة: سر تكوين السؤال في الماضي المستمر
                        </h5>
                        <span className="text-xs text-zinc-500 font-arabic">
                          ثلاث خطوات لتحويل أي جملة ماضٍ مستمر إلى سؤال امتحاني ناجح
                        </span>
                      </div>
                    </div>

                    <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
                      <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                        <p>1. نبدأ السؤال دائماً بتقديم الفعل المساعد <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Was</span> أو <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Were</span> بحرف كبير في البداية قبل الفاعل.</p>
                        <p>2. يبقى الفعل الرئيسي بعد الفاعل <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">محتفظاً بـ (ing)</span> كما هو دون حذف.</p>
                        <p>3. نضع علامة الاستفهام <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">?</span> في نهاية الجملة.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                        <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                          خطأ شائع: Were they <span className="line-through text-rose-600 font-bold">watch</span> TV?
                        </div>
                        <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                          الصحيح دائماً: Were they <span className="text-emerald-700 font-black underline">watching</span> TV?
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
                    <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                      <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                        <HelpCircle className="w-5 h-5" />
                      </span>
                      <div>
                        <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                          ملاحظة هامة: خطوات تكوين السؤال في الماضي البسيط
                        </h5>
                        <span className="text-xs text-zinc-500 font-arabic">
                          ثلاث خطوات أساسية لتحويل أي جملة إلى سؤال امتحاني
                        </span>
                      </div>
                    </div>

                    <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
                      <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                        <p>1. نبدأ السؤال دائماً بـ <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Did</span> بحرف كبير في البداية.</p>
                        <p>2. يرجع الفعل الرئيسي بعدها إلى <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">مصدر مجرد (Base)</span> خالي من ed أو الشذوذ.</p>
                        <p>3. نضع علامة الاستفهام <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">?</span> في نهاية الجملة.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                        <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                          خطأ شائع: Did Ali <span className="line-through text-rose-600 font-bold">played</span>?
                        </div>
                        <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                          الصحيح دائماً: Did Ali <span className="text-emerald-700 font-black underline">play</span>?
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
                  {currentTopic.question.explanationAr}
                </div>

                {/* Question Examples */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-indigo-900 font-arabic block">
                    أمثلة السؤال الناطقة والإجابات القصيرة:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentTopic.question.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-indigo-200 transition-colors"
                      >
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                            {renderHighlightedSentence(
                              ex.en,
                              ex.highlight,
                              'text-indigo-600 font-black underline decoration-indigo-300 decoration-2'
                            )}
                          </p>
                          <p className="text-xs text-zinc-500 font-arabic mt-1">
                            {ex.ar}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className="p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shrink-0 shadow-2xs"
                          title="استمع للنطق"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* شلون يجي بالامتحان؟ (تطبيقات امتحانية على الاستفهام مع بناء الجملة خطوة بخطوة وتظليل التغيير) */}
              {currentTopic.question.examApplications && currentTopic.question.examApplications.length > 0 && (
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-indigo-600 text-white rounded-xl">
                        <HelpCircle className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-indigo-950 font-arabic">
                          صيغ وتطبيقات امتحانية (تطبيقات امتحانية على الاستفهام)
                        </h4>
                        <span className="text-xs text-zinc-500 font-arabic">
                          تفصيخ وبناء الجملة وتظليل Did والمصدر المجرد وعلامة الاستفهام (?)
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200" dir="ltr">
                      Question Tasks
                    </span>
                  </div>

                  <div className="space-y-5">
                    {currentTopic.question.examApplications.map((item, idx) => (
                      <div key={item.id} className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-2xl space-y-4 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center font-mono shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-indigo-950 font-arabic bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
                            {item.instructionAr}
                          </span>
                        </div>

                        {/* 1. Problem with bracket */}
                        <div className="p-3.5 bg-zinc-50/70 border border-zinc-200 rounded-xl flex items-center justify-between shadow-2xs">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                            {item.problemEn}
                          </p>
                          <button
                            onClick={() => handleSpeak(item.problemEn)}
                            className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-600 cursor-pointer shrink-0 border border-zinc-200"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* 2. خطوات تفصيخ وبناء الجملة خطوة بخطوة (وحدة جوه وحدة) */}
                        {item.cumulativeSteps && item.cumulativeSteps.length > 0 ? (
                          <div className="bg-zinc-50/60 border border-zinc-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
                            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                              <span className="text-xs font-black text-zinc-900 font-arabic flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                <span>خطوات بناء جملة السؤال تفصيلياً (وحدة جوه وحدة):</span>
                              </span>
                              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200 font-arabic">
                                بناء تدريجي
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {item.cumulativeSteps.map((step) => (
                                <div
                                  key={step.stepNumber}
                                  className="p-3 bg-white rounded-xl border border-zinc-200 shadow-2xs space-y-2 text-right font-arabic"
                                >
                                  {/* Header of step */}
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white text-[11px] font-bold font-mono flex items-center justify-center shrink-0">
                                        {step.stepNumber}
                                      </span>
                                      <span className="font-bold text-xs sm:text-sm text-zinc-900">
                                        {step.titleAr}
                                      </span>
                                    </div>
                                    {step.highlightToken && (
                                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0" dir="ltr">
                                        {step.highlightToken}
                                      </span>
                                    )}
                                  </div>

                                  {/* Explanation in Arabic */}
                                  <p className="text-xs text-zinc-600 leading-relaxed pr-7">
                                    {step.explanationAr}
                                  </p>

                                  {/* Sentence progress so far */}
                                  <div className="flex flex-wrap items-center gap-2 pt-1 pr-7" dir="ltr">
                                    <span className="text-[11px] text-zinc-500 font-arabic font-medium shrink-0" dir="rtl">
                                      الجملة حتى الآن:
                                    </span>
                                    <div className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-mono font-bold text-zinc-900 shadow-2xs">
                                      {renderHighlightedSentence(
                                        step.sentenceProgress,
                                        step.highlightToken,
                                        'text-indigo-600 font-black underline decoration-indigo-300'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          item.dissection && item.dissection.length > 0 && (
                            <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[11px] font-bold text-zinc-600 font-arabic flex items-center gap-1.5">
                                <span>تحليل عناصر الجملة:</span>
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.dissection.map((part, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="p-2.5 rounded-xl border bg-white text-xs flex flex-col gap-0.5 text-right font-arabic"
                                  >
                                    <span className="text-[10px] font-bold text-indigo-800">
                                      {part.label}:
                                    </span>
                                    <span className="font-bold text-zinc-900 text-xs">
                                      {part.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}

                        {/* 3. الحل النموذجي مع تظليل التغيير */}
                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="space-y-1.5 text-left" dir="ltr">
                            <span className="text-[11px] font-bold text-emerald-800 font-arabic block text-right" dir="rtl">
                              الحل النموذجي النهائي:
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5 font-sans text-sm sm:text-base font-bold text-zinc-900">
                              {item.solutionTokens ? (
                                item.solutionTokens.map((tok, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className={
                                      tok.isChanged
                                        ? 'bg-indigo-600 text-white px-2.5 py-0.5 rounded-lg shadow-xs font-mono font-black text-sm sm:text-base ring-2 ring-indigo-300'
                                        : 'text-zinc-800'
                                    }
                                  >
                                    {tok.text}
                                  </span>
                                ))
                              ) : (
                                <span className="font-bold text-emerald-950">{item.solutionEn}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleSpeak(item.solutionEn)}
                            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0 self-end sm:self-center shadow-xs flex items-center gap-1.5 text-xs font-bold font-arabic"
                            title="استمع للحل"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>استمع للحل</span>
                          </button>
                        </div>

                        {/* 4. خطوة الحل المباشرة */}
                        {item.actionStepAr && (
                          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-arabic text-amber-950 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md font-bold text-[10px] shrink-0">
                              خطوة الحل
                            </span>
                            <span className="font-bold">{item.actionStepAr}</span>
                          </div>
                        )}

                        {/* 5. توضيح المعلم */}
                        <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-arabic text-zinc-700 leading-relaxed">
                          <span className="font-bold text-zinc-900">شرح طريقة المعالجة:</span> {item.noteAr}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SPELLING NOTES */}
          {activeTab === 'spelling' && currentTopic.spellingNotes && (
            <div className="space-y-5">
              <div className="bg-white border-2 border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="border-b border-zinc-100 pb-3">
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic">
                    {currentTopic.spellingNotes.titleAr}
                  </h4>
                  <p className="text-xs text-zinc-500 font-arabic mt-1">
                    قواعد إملائية مهمة تأتي في أسئلة الإملاء والامتحانات الشهرية للأول متوسط:
                  </p>
                </div>

                <div className="space-y-4">
                  {currentTopic.spellingNotes.rules.map((rule, idx) => (
                    <div key={idx} className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-2xl space-y-2">
                      <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                        {rule.titleAr}
                      </h5>
                      <p className="text-xs text-zinc-600 font-arabic">
                        {rule.descAr}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs font-sans" dir="ltr">
                        {rule.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="p-2.5 bg-white border border-zinc-200 rounded-xl text-left">
                            <span className="text-zinc-500">{ex.base}</span> ➔{' '}
                            <strong className="text-zinc-900 font-bold">{ex.changed}</strong>
                            <p className="text-[10px] text-zinc-400 font-arabic mt-0.5" dir="rtl">{ex.ar}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MONTHLY EXAM PRACTICE */}
          {activeTab === 'practice' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-700 font-arabic block">
                      نماذج الامتحانات الشهرية ونصف السنة
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-purple-950 font-arabic mt-0.5">
                      تدريبات امتحانية تفاعلية من تمارين الكتاب
                    </h4>
                  </div>
                  <button
                    onClick={handleResetPractice}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-purple-200 hover:bg-purple-50 text-purple-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة الحل</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {currentTopic.examPractice.map((q, idx) => {
                    const isRevealed = revealedAnswers[q.id];
                    const selected = practiceAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border-2 transition-all ${
                          isRevealed
                            ? isCorrect
                              ? 'border-emerald-400 bg-emerald-50/50'
                              : 'border-zinc-300 bg-white'
                            : 'border-zinc-200 bg-white shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          <button
                            onClick={() => handleSpeak(q.questionEn)}
                            className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-zinc-500 font-arabic mb-1">
                          {q.questionAr}
                        </p>
                        <h5 className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-3" dir="ltr">
                          {q.questionEn}
                        </h5>

                        {/* Options if choice or correct */}
                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isChosen = selected === opt;
                              let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                              if (isRevealed) {
                                if (opt === q.correctAnswer) {
                                  btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                                } else if (isChosen && !isCorrect) {
                                  btnClass = 'bg-rose-500 text-white border-rose-500 font-bold';
                                } else {
                                  btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                                }
                              } else if (isChosen) {
                                btnClass = 'bg-purple-600 text-white border-purple-600';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectAnswer(q.id, opt, opt === q.correctAnswer)}
                                  className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnClass}`}
                                  dir="ltr"
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* If transform question */}
                        {!q.options && (
                          <div className="pt-1">
                            {!isRevealed ? (
                              <button
                                onClick={() => handleSelectAnswer(q.id, q.correctAnswer, true)}
                                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 cursor-pointer font-arabic"
                              >
                                إظهار الإجابة النموذجية
                              </button>
                            ) : (
                              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-left" dir="ltr">
                                <span className="text-xs font-bold text-emerald-800 font-sans block">
                                  {q.correctAnswer}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Explanation */}
                        {isRevealed && (
                          <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200 text-zinc-700 leading-relaxed">
                            <span className="font-bold text-zinc-900">توضيح المعلم:</span> {q.explanationAr}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* B. POSSESSIVE PRONOUNS (ضمائر التملك)                                    */}
      {/* ========================================================================= */}
      {currentTopic.topicType === 'pronouns' && (
        <div className="space-y-6">
          {/* 1. جدول ضمائر التملك وصفات التملك - تصميم أبيض نظيف وهادئ */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-5 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-arabic block">
                  الجدول المنهجي المعتمد لصف الأول متوسط
                </span>
                <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                  جدول ضمائر التملك وصفات التملك (Subject ➔ Adjective ➔ Possessive)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-zinc-100 text-zinc-700 rounded-xl self-start sm:self-auto border border-zinc-200" dir="ltr">
                Pronouns Table
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
              تُستخدم ضمائر التملك لإظهار ملكية الشيء وتأتي دائماً في <strong>نهاية الجملة</strong> بدون اسم بعدها، بينما صفات التملك تحتاج اسماً بعدها:
            </p>

            {/* الجدول النظيف بخمسة أعمدة */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-900 text-xs font-bold font-arabic border-b border-zinc-200">
                    <th className="p-3">ضمير الفاعل (Subject)</th>
                    <th className="p-3">صفة التملك (Adjective)</th>
                    <th className="p-3">ضمير التملك (Possessive)</th>
                    <th className="p-3">المعنى بالعربية</th>
                    <th className="p-3">مثال جملة ناطق من الكتاب</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-sans divide-y divide-zinc-200">
                  {currentTopic.pronounsTable?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="p-3 font-bold font-mono text-zinc-900" dir="ltr">
                        {row.subject}
                      </td>
                      <td className="p-3 font-mono font-medium text-indigo-700 text-xs" dir="ltr">
                        {row.adjective || '—'}
                      </td>
                      <td className="p-3 font-black font-mono text-emerald-700 text-sm" dir="ltr">
                        {row.possessive}
                      </td>
                      <td className="p-3 font-arabic text-zinc-700 font-medium">
                        {row.ar}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-zinc-800" dir="ltr">{row.exampleEn}</span>
                          <button
                            onClick={() => handleSpeak(row.exampleEn)}
                            className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer shrink-0"
                            title="استمع"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* كروت الملاحظات الهادئة بخلفية بيضاء */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-zinc-50/80 border border-zinc-200 rounded-2xl p-4 text-right space-y-2">
                <span className="text-xs font-bold text-zinc-900 font-arabic flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>الموقع الذهبي لضمير التملك:</span>
                </span>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  ضمائر التملك (<span className="font-mono font-bold text-indigo-700">mine, yours, hers, ours, theirs</span>) تأتي دائماً في <strong>نهاية الجملة</strong> بعد فعل الكينونة (<span className="font-mono font-bold">is / are</span>) وتُختم بنقطة، ولا نكتب اسم الشيء الممتلك بعدها إطلاقاً!
                </p>
              </div>

              <div className="bg-zinc-50/80 border border-zinc-200 rounded-2xl p-4 text-right space-y-2">
                <span className="text-xs font-bold text-zinc-900 font-arabic flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>الفرق بين صفة التملك وضمير التملك:</span>
                </span>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  • صفة التملك (<span className="font-mono font-bold text-indigo-700">my, your, her</span>): يأتي بعدها اسم الشيء (<span className="font-mono text-zinc-800">This is my book</span>).<br/>
                  • ضمير التملك (<span className="font-mono font-bold text-emerald-700">mine, yours, hers</span>): يقف وحده في النهاية (<span className="font-mono text-zinc-800">This book is mine</span>).
                </p>
              </div>
            </div>
          </div>

          {/* 2. تطبيقات وأمثلة كتاب النشاط والامتحانات الشهرية مفصخة خطوة بخطوة (وحدة جوه وحدة) */}
          {currentTopic.pronounApplications && currentTopic.pronounApplications.length > 0 && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-6 text-right">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 font-arabic block">
                    تمارين كتاب النشاط (Activity Book ص 8) ونماذج الامتحانات الشهرية
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                    تطبيقات الكتاب مفصخة بالتفصيل والحل خطوة بخطوة
                  </h4>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl font-arabic self-start sm:self-auto">
                  {currentTopic.pronounApplications.length} نماذج امتحانية من الكتاب
                </span>
              </div>

              <div className="space-y-6">
                {currentTopic.pronounApplications.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 bg-white border border-zinc-200 rounded-2xl shadow-2xs space-y-4 transition-all"
                  >
                    {/* رأس السؤال والتوجيه */}
                    <div className="flex items-start justify-between gap-3 border-b border-zinc-100 pb-3">
                      <div className="space-y-1 text-right">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-indigo-700 font-arabic">
                            {item.instructionAr}
                          </span>
                        </div>
                        <h5 className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight pt-1 text-left" dir="ltr">
                          {item.problemEn}
                        </h5>
                      </div>
                      <button
                        onClick={() => handleSpeak(item.problemEn)}
                        className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer shrink-0 transition-colors"
                        title="استمع للسؤال"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 1. تفصيخ الجملة (تحليل أركانها) */}
                    {item.dissection && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                          
                          <span>تفصيخ الجملة (تحليل أركانها للطالب):</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          {item.dissection.map((part, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-right space-y-0.5"
                            >
                              <span className="text-[10px] font-bold text-indigo-700 font-arabic block">
                                {part.label}:
                              </span>
                              <span className="font-bold text-zinc-900 text-xs font-arabic">
                                {part.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. خطوات الحل التراكمية (وحدة جوه وحدة) */}
                    {item.cumulativeSteps && (
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                          
                          <span>خطوات الحل وبناء الجملة (وحدة جوه وحدة):</span>
                        </span>
                        <div className="space-y-2">
                          {item.cumulativeSteps.map((step) => (
                            <div
                              key={step.stepNumber}
                              className="p-3 bg-zinc-50/80 rounded-xl border border-zinc-200 text-right space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-black text-zinc-900 font-arabic">
                                  {step.titleAr}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] font-bold text-indigo-700 font-mono">
                                  Step {step.stepNumber}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                                {step.explanationAr}
                              </p>
                              {/* تطور الجملة خطوة بخطوة */}
                              <div className="p-2 bg-white rounded-lg border border-zinc-200 text-left font-mono text-xs sm:text-sm font-bold text-zinc-800" dir="ltr">
                                <span className="text-[10px] font-arabic font-normal text-zinc-400 block text-right mb-0.5" dir="rtl">
                                  شكل الجملة عند هذه الخطوة:
                                </span>
                                <span className="text-indigo-700 bg-indigo-50/60 px-1 rounded">
                                  {step.sentenceProgress}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. الحل النموذجي النهائي */}
                    <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                      <div className="space-y-1.5 text-left" dir="ltr">
                        <span className="text-[11px] font-bold text-emerald-800 font-arabic block text-right" dir="rtl">
                          الحل النموذجي النهائي:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 font-sans text-sm sm:text-base font-bold text-zinc-900">
                          {item.solutionTokens ? (
                            item.solutionTokens.map((tok, tIdx) => (
                              <span
                                key={tIdx}
                                className={
                                  tok.isChanged
                                    ? 'bg-indigo-600 text-white px-2.5 py-0.5 rounded-lg shadow-xs font-mono font-black text-sm sm:text-base ring-2 ring-indigo-300'
                                    : 'text-zinc-800'
                                }
                              >
                                {tok.text}
                              </span>
                            ))
                          ) : (
                            <span className="font-bold text-emerald-950">{item.solutionEn}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(item.solutionEn)}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0 self-end sm:self-center shadow-xs flex items-center gap-1.5 text-xs font-bold font-arabic transition-colors"
                        title="استمع للحل"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>استمع للحل</span>
                      </button>
                    </div>

                    {/* 4. خطوة الحل المباشرة */}
                    {item.actionStepAr && (
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-arabic text-amber-950 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md font-bold text-[10px] shrink-0">
                          خطوة الحل
                        </span>
                        <span className="font-bold">{item.actionStepAr}</span>
                      </div>
                    )}

                    {/* 5. توضيح المعلم وملاحظة الامتحان */}
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-arabic text-zinc-700 leading-relaxed">
                      <span className="font-bold text-zinc-900">شرح طريقة المعالجة:</span> {item.noteAr}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. تمرين الاختبار التفاعلي للامتحانات الشهرية - تصميم أبيض نظيف */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-2xs space-y-5 text-right">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-arabic block">
                  اختبار تفاعلي ذاتي للطالب
                </span>
                <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                  تمارين امتحانية شهرية لاختبار الفهم
                </h4>
              </div>
              <button
                onClick={handleResetPractice}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة التمرين</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentTopic.examPractice.map((q, idx) => {
                const isRevealed = revealedAnswers[q.id];
                const selected = practiceAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isRevealed
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/50'
                          : 'border-rose-300 bg-rose-50/50'
                        : 'border-zinc-200 bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <button
                        onClick={() => handleSpeak(q.questionEn)}
                        className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-500 font-arabic mb-1">{q.questionAr}</p>
                    <h5 className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-3" dir="ltr">
                      {q.questionEn}
                    </h5>

                    {q.options && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isChosen = selected === opt;
                          let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                          if (isRevealed) {
                            if (opt === q.correctAnswer) {
                              btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                            } else if (isChosen && !isCorrect) {
                              btnClass = 'bg-rose-500 text-white border-rose-500 font-bold';
                            } else {
                              btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                            }
                          } else if (isChosen) {
                            btnClass = 'bg-indigo-600 text-white border-indigo-600';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, opt, opt === q.correctAnswer)}
                              className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnClass}`}
                              dir="ltr"
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {isRevealed && (
                      <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200 text-zinc-700 leading-relaxed">
                        <span className="font-bold text-zinc-900">توضيح:</span> {q.explanationAr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* C. JOINING SENTENCES (أدوات الربط: and / but / or)                         */}
      {/* ========================================================================= */}
      {currentTopic.topicType === 'connectors' && (
        <div className="space-y-6">
          {/* Connectors Overview Card */}
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-700 font-arabic block">
                  أدوات الربط الثلاثة المقررة
                </span>
                <h4 className="text-base sm:text-lg font-black text-amber-950 font-arabic mt-0.5">
                  الفرق بين and و but و or في دمج الجمل
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-xl" dir="ltr">
                {'{ and, but, or }'}
              </span>
            </div>

            {/* The 3 Cards */}
            <div className="space-y-4">
              {currentTopic.connectorsList?.map((conn, idx) => (
                <div key={idx} className="p-5 bg-amber-50/50 border-2 border-amber-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-mono font-black text-sm" dir="ltr">
                      {conn.name}
                    </span>
                    <span className="text-xs font-bold text-amber-900 font-arabic bg-amber-100 px-3 py-1 rounded-lg">
                      {conn.meaningAr}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                    {conn.functionAr}
                  </p>

                  <div className="space-y-2 pt-1">
                    {conn.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="p-3 bg-white border border-amber-200 rounded-xl flex items-center justify-between shadow-2xs">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                            {ex.en}
                          </p>
                          <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                            {ex.ar}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                          title="استمع"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Questions */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h4 className="text-base sm:text-lg font-black text-amber-950 font-arabic">
                تمارين امتحانية شهرية على أدوات الربط
              </h4>
              <button
                onClick={handleResetPractice}
                className="px-3 py-1 rounded-xl bg-white border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer font-arabic"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة التمرين</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentTopic.examPractice.map((q, idx) => {
                const isRevealed = revealedAnswers[q.id];
                const selected = practiceAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                      isRevealed
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/50'
                          : 'border-rose-300 bg-rose-50/50'
                        : 'border-zinc-200 bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <button
                        onClick={() => handleSpeak(q.questionEn)}
                        className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-500 font-arabic mb-1">{q.questionAr}</p>
                    <h5 className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-3" dir="ltr">
                      {q.questionEn}
                    </h5>

                    {q.options && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isChosen = selected === opt;
                          let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                          if (isRevealed) {
                            if (opt === q.correctAnswer) {
                              btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                            } else if (isChosen && !isCorrect) {
                              btnClass = 'bg-rose-500 text-white border-rose-500 font-bold';
                            } else {
                              btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                            }
                          } else if (isChosen) {
                            btnClass = 'bg-amber-600 text-white border-amber-600';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, opt, opt === q.correctAnswer)}
                              className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnClass}`}
                              dir="ltr"
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {isRevealed && (
                      <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200 text-zinc-700 leading-relaxed">
                        <span className="font-bold text-zinc-900">توضيح:</span> {q.explanationAr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* D. TALKING ABOUT INTERESTS (التعبير عن الاهتمام والهوايات)                 */}
      {/* ========================================================================= */}
      {currentTopic.topicType === 'interests' && (
        <div className="space-y-6">
          {/* Interests Rules Card */}
          <div className="bg-white border-2 border-teal-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div>
                <span className="text-xs font-bold text-teal-700 font-arabic block">
                  التعبير عن الهوايات وما نحبه
                </span>
                <h4 className="text-base sm:text-lg font-black text-teal-950 font-arabic mt-0.5">
                  قواعد like, love, enjoy والعبارة interested in
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-teal-100 text-teal-800 rounded-xl" dir="ltr">
                Interests
              </span>
            </div>

            <div className="space-y-5">
              {currentTopic.interestsSections?.map((sec, idx) => (
                <div key={idx} className="p-5 bg-teal-50/50 border-2 border-teal-200 rounded-2xl space-y-3">
                  <h5 className="text-sm sm:text-base font-bold text-teal-950 font-arabic">
                    {sec.titleAr}
                  </h5>

                  {/* Formula Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-2 py-2 px-3 bg-white rounded-xl border border-teal-200 shadow-2xs" dir="ltr">
                    {sec.formulaChips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          chip.isHighlight
                            ? 'bg-teal-600 text-white font-mono'
                            : chip.text === '+' || chip.text === 'أو'
                            ? 'text-teal-600 font-bold'
                            : 'bg-zinc-50 border border-zinc-200 text-zinc-800 font-arabic'
                        }`}
                      >
                        {chip.text}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                    {sec.explanationAr}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {sec.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="p-3 bg-white border border-teal-200 rounded-xl flex items-center justify-between shadow-2xs">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                            {ex.en}
                          </p>
                          <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                            {ex.ar}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                          title="استمع"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Exam Practice */}
          <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 border-2 border-teal-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <h4 className="text-base sm:text-lg font-black text-teal-950 font-arabic">
                تمارين امتحانية شهرية على التعبير عن الاهتمام
              </h4>
              <button
                onClick={handleResetPractice}
                className="px-3 py-1 rounded-xl bg-white border border-teal-200 text-teal-900 text-xs font-bold flex items-center gap-1 cursor-pointer font-arabic"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة التمرين</span>
              </button>
            </div>

            <div className="space-y-4">
              {currentTopic.examPractice.map((q, idx) => {
                const isRevealed = revealedAnswers[q.id];
                const selected = practiceAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                      isRevealed
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/50'
                          : 'border-rose-300 bg-rose-50/50'
                        : 'border-zinc-200 bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <button
                        onClick={() => handleSpeak(q.questionEn)}
                        className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-500 font-arabic mb-1">{q.questionAr}</p>
                    <h5 className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-3" dir="ltr">
                      {q.questionEn}
                    </h5>

                    {q.options && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isChosen = selected === opt;
                          let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                          if (isRevealed) {
                            if (opt === q.correctAnswer) {
                              btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                            } else if (isChosen && !isCorrect) {
                              btnClass = 'bg-rose-500 text-white border-rose-500 font-bold';
                            } else {
                              btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                            }
                          } else if (isChosen) {
                            btnClass = 'bg-teal-600 text-white border-teal-600';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, opt, opt === q.correctAnswer)}
                              className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnClass}`}
                              dir="ltr"
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {isRevealed && (
                      <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200 text-zinc-700 leading-relaxed">
                        <span className="font-bold text-zinc-900">توضيح:</span> {q.explanationAr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
