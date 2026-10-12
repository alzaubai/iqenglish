import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Search,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  Clock,
  Award,
  Zap,
  Layers,
  FileQuestion,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { SpeechEngine } from '../../utils/speech';

export const IraqiTeacherGrammarLesson2: React.FC = () => {
  // Main Lesson 2 Topic Tabs:
  // 1: 'was-were' (أفعال الكينونة في الماضي)
  // 2: 'adjectives' (الصفات المنتهية بـ ed و ing)
  // 3: 'connectors' (أدوات الربط وتسلسل القصة)
  // 4: 'verbs' (أفعال الدرس الثاني)
  // 5: 'quiz' (الامتحان التفاعلي الشامل)
  const [activeMainSection, setActiveMainSection] = useState<
    'was-were' | 'adjectives' | 'connectors' | 'verbs' | 'quiz'
  >('was-were');

  // Sub-tabs for Was/Were: 'affirmative' | 'negative' | 'question'
  const [wasWereMode, setWasWereMode] = useState<'affirmative' | 'negative' | 'question'>('affirmative');

  // Audio playing indicator
  const [playingText, setPlayingText] = useState<string | null>(null);

  // Verbs search and filter
  const [verbSearch, setVerbSearch] = useState<string>('');
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSpeak = (text: string) => {
    setPlayingText(text);
    SpeechEngine.speakText(text, {
      rate: 0.85,
      onEnd: () => setPlayingText(null),
      onError: () => setPlayingText(null),
    });
  };

  // Lesson 2 Verbs (Textbook Student's Book p. 6 and Activity Book p. 6-7)
  const lesson2Verbs = [
    { base: 'take', past: 'took', ar: 'يأخذ / أخذ', type: 'irregular' as const, note: 'took photos (التقط صوراً)' },
    { base: 'wear', past: 'wore', ar: 'يرتدي / ارتدى', type: 'irregular' as const, note: 'wore a traditional hat' },
    { base: 'tell', past: 'told', ar: 'يخبر / أخبر', type: 'irregular' as const, note: 'My mother told us to sit still' },
    { base: 'spend', past: 'spent', ar: 'يقضي / قضى (أو ينفق)', type: 'irregular' as const, note: 'spent time in Baghdad' },
    { base: 'come', past: 'came', ar: 'يأتي / جاء', type: 'irregular' as const, note: 'came back to hotel' },
    { base: 'go', past: 'went', ar: 'يذهب / ذهب', type: 'irregular' as const, note: 'went to Iraq / went to bed' },
    { base: 'see', past: 'saw', ar: 'يرى / رأى', type: 'irregular' as const, note: 'saw flamingos and pelicans' },
    { base: 'be (is/am)', past: 'was', ar: 'يكون / كان (للمفرد)', type: 'irregular' as const, note: 'The trip was exciting' },
    { base: 'be (are)', past: 'were', ar: 'يكونون / كانوا (للجمع)', type: 'irregular' as const, note: 'The players were fantastic' },
    { base: 'tour', past: 'toured', ar: 'يتجول / تجول', type: 'regular' as const, note: 'toured the city' },
    { base: 'arrive', past: 'arrived', ar: 'يصل / وصل', type: 'regular' as const, note: 'arrived in Baghdad at night' },
    { base: 'enjoy', past: 'enjoyed', ar: 'يستمتع / استمتع', type: 'regular' as const, note: 'really enjoyed the game' },
    { base: 'travel', past: 'travelled', ar: 'يسافر / سافر', type: 'regular' as const, note: 'travelled to Erbil' },
    { base: 'look', past: 'looked', ar: 'ينظر أو يتفقد / تفقّد', type: 'regular' as const, note: 'looked around the markets' },
    { base: 'stay', past: 'stayed', ar: 'يقيم أو يبقى / أقام', type: 'regular' as const, note: 'stayed in a hotel' },
  ];

  const filteredVerbs = lesson2Verbs.filter((v) => {
    const matchesFilter = verbFilter === 'all' || v.type === verbFilter;
    const matchesSearch =
      v.base.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.past.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.ar.includes(verbSearch);
    return matchesFilter && matchesSearch;
  });

  // Ministerial Quiz Questions for Lesson 2
  const quizQuestions = [
    {
      id: 'l2-q1',
      questionEn: 'The ziggurat in Ur ______ huge and ancient.',
      questionAr: 'الزقورة في أور ______ ضخمة وقديمة (اختر فعل الكينونة المناسب للماضي):',
      options: ['were', 'was', 'is', 'are'],
      correctIndex: 1,
      ruleKey: 'was-were',
      explanationAr: 'الفاعل مفرد (The ziggurat)، والجملة في زمن الماضي البسيط، لذا نختار (was) وليس were.',
    },
    {
      id: 'l2-q2',
      questionEn: 'My sisters ______ fed up with shopping in Erbil.',
      questionAr: 'أخواتي ______ ضجرات من التسوق في أربيل (اختر فعل الكينونة المناسب للجمع):',
      options: ['was', 'were', 'did', 'wasn’t'],
      correctIndex: 1,
      ruleKey: 'was-were',
      explanationAr: 'الفاعل جمع (My sisters = هنّ)، والجمع في الماضي يأخذ دائماً (were).',
    },
    {
      id: 'l2-q3',
      questionEn: 'Sara ______ in Abu Dhabi; she was in Iraq.',
      questionAr: 'سارة ______ في أبوظبي، بل كانت في العراق (اختر النفي الصحيح):',
      options: ['wasn’t', 'weren’t', 'didn’t was', 'not was'],
      correctIndex: 0,
      ruleKey: 'was-were-negative',
      explanationAr: 'سارة فاعل مفرد ننفيها بـ (wasn\'t). تنبيه امتحاني مهم: إياك أن تختار didn\'t was!',
    },
    {
      id: 'l2-q4',
      questionEn: '______ the football match exciting? — Yes, it was.',
      questionAr: '______ هل كانت مباراة كرة القدم حماسية؟ (اختر صيغة السؤال):',
      options: ['Was', 'Were', 'Did', 'Does'],
      correctIndex: 0,
      ruleKey: 'was-were-question',
      explanationAr: 'الفاعل مفرد (the football match) والجواب ينتهي بـ (it was)، لذا نبدأ السؤال بـ (Was).',
    },
    {
      id: 'l2-q5',
      questionEn: 'Shopping is so ______! I want to go home.',
      questionAr: 'التسوق ______ جداً! أريد العودة للمنزل (اختر الصفة المناسبة لمسبب الشعور):',
      options: ['bored', 'boring', 'boredom', 'bores'],
      correctIndex: 1,
      ruleKey: 'adjectives',
      explanationAr: 'التسوق هو المسبب للشعور بالملل (The cause)، فنختار الصفة المنتهية بـ ing وهي (boring).',
    },
    {
      id: 'l2-q6',
      questionEn: 'Richard was ______ when they toured the markets.',
      questionAr: 'شعر ريتشارد بـ ______ عندما تجولوا في الأسواق (اختر الصفة للشخص المتأثر):',
      options: ['bored', 'boring', 'boredom', 'bores'],
      correctIndex: 0,
      ruleKey: 'adjectives',
      explanationAr: 'ريتشارد هو الشخص العاقل المتأثر بالشعور (He has the feeling)، لذا نختار صفة ed وهي (bored).',
    },
    {
      id: 'l2-q7',
      questionEn: 'He is very ______ in ancient Babylonian history.',
      questionAr: 'هو ______ جداً بالتاريخ البابلي القديم (لاحظ وجود حرف الجر in بعد الفراغ):',
      options: ['interested', 'interesting', 'interest', 'interests'],
      correctIndex: 0,
      ruleKey: 'adjectives',
      explanationAr: 'قاعدة ذهبية: عند وجود حرف الجر (in) بعد الفراغ والحديث عن اهتمام شخص نختار (interested).',
    },
    {
      id: 'l2-q8',
      questionEn: 'It was an ______ football match at Al-Shaab Stadium.',
      questionAr: 'كانت مباراة كرة قدم ______ جداً في ملعب الشعب (لاحظ وجود اسم بعد الفراغ):',
      options: ['excited', 'exciting', 'excitement', 'excites'],
      correctIndex: 1,
      ruleKey: 'adjectives',
      explanationAr: 'قاعدة ذهبية: إذا جاء بعد الفراغ اسم موصوف (football match) نختار صفة ing وهي (exciting).',
    },
    {
      id: 'l2-q9',
      questionEn: 'We arrived in Baghdad at night, ______ we just went to bed.',
      questionAr: 'وصلنا بغداد ليلاً، ______ ذهبنا مباشرة للنوم (اختر أداة الربط المناسبة للنتيجة):',
      options: ['so', 'because', 'although', 'but'],
      correctIndex: 0,
      ruleKey: 'connectors',
      explanationAr: 'نستخدم (so) وتعني (لذلك / لذا) لربط السبب بالنتيجة المترتبة عليه.',
    },
    {
      id: 'l2-q10',
      questionEn: 'On Friday morning we visited the markets. ______ I was fed up!',
      questionAr: 'صباح الجمعة زرنا الأسواق. ______ ضجرتُ وسئمت! (اختر أداة التسلسل الزمني):',
      options: ['Then', 'Because', 'So that', 'While'],
      correctIndex: 0,
      ruleKey: 'connectors',
      explanationAr: 'نستخدم (Then) وتعني (ثم / بعد ذلك) للدلالة على تعاقب الأحداث في القصة.',
    },
  ];

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);
    const score = calculateScore();
    if (score >= 7) {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-7" dir="rtl">
      {/* ======================================================== */}
      {/* 1. TOP MAIN TOPIC SELECTOR TABS                          */}
      {/* ======================================================== */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-zinc-500 font-arabic">
            اختر محور قواعد الدرس الثاني لدراسته بالتفصيل:
          </span>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/80 font-arabic">
            منهاج الأول المتوسط الرسمي
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
          {/* Tab 1: Was / Were */}
          <button
            onClick={() => setActiveMainSection('was-were')}
            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMainSection === 'was-were'
                ? 'bg-blue-50 border-blue-600 shadow-sm ring-2 ring-blue-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span
                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  activeMainSection === 'was-were'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 text-zinc-700'
                }`}
              >
                01
              </span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold" dir="ltr">
                Was / Were
              </span>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base font-bold ${
                  activeMainSection === 'was-were' ? 'text-blue-950' : 'text-zinc-900'
                }`}
              >
                أفعال الكينونة
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Was للمفرد و Were للجمع
              </p>
            </div>
          </button>

          {/* Tab 2: Adjectives -ed vs -ing */}
          <button
            onClick={() => setActiveMainSection('adjectives')}
            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMainSection === 'adjectives'
                ? 'bg-emerald-50 border-emerald-600 shadow-sm ring-2 ring-emerald-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span
                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  activeMainSection === 'adjectives'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-100 text-zinc-700'
                }`}
              >
                02
              </span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold" dir="ltr">
                -ed vs -ing
              </span>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base font-bold ${
                  activeMainSection === 'adjectives' ? 'text-emerald-950' : 'text-zinc-900'
                }`}
              >
                صفات ed و ing
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                المتأثر بالشعور والمسبب
              </p>
            </div>
          </button>

          {/* Tab 3: Narrative Connectors */}
          <button
            onClick={() => setActiveMainSection('connectors')}
            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMainSection === 'connectors'
                ? 'bg-amber-50 border-amber-600 shadow-sm ring-2 ring-amber-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span
                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  activeMainSection === 'connectors'
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-100 text-zinc-700'
                }`}
              >
                03
              </span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold" dir="ltr">
                Connectors
              </span>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base font-bold ${
                  activeMainSection === 'connectors' ? 'text-amber-950' : 'text-zinc-900'
                }`}
              >
                أدوات الربط
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                so, then, and, after that
              </p>
            </div>
          </button>

          {/* Tab 4: Lesson 2 Verbs */}
          <button
            onClick={() => setActiveMainSection('verbs')}
            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMainSection === 'verbs'
                ? 'bg-indigo-50 border-indigo-600 shadow-sm ring-2 ring-indigo-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span
                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  activeMainSection === 'verbs'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-100 text-zinc-700'
                }`}
              >
                04
              </span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold" dir="ltr">
                Verbs
              </span>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base font-bold ${
                  activeMainSection === 'verbs' ? 'text-indigo-950' : 'text-zinc-900'
                }`}
              >
                أفعال الدرس 2
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                جدول الأفعال الشاذة والقياسية
              </p>
            </div>
          </button>

          {/* Tab 5: Ministerial Quiz */}
          <button
            onClick={() => setActiveMainSection('quiz')}
            className={`p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between col-span-2 sm:col-span-1 ${
              activeMainSection === 'quiz'
                ? 'bg-purple-50 border-purple-600 shadow-sm ring-2 ring-purple-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span
                className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                  activeMainSection === 'quiz'
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-100 text-zinc-700'
                }`}
              >
                05
              </span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold" dir="ltr">
                Quiz (10Q)
              </span>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base font-bold ${
                  activeMainSection === 'quiz' ? 'text-purple-950' : 'text-zinc-900'
                }`}
              >
                الامتحان التفاعلي
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                اختبار تفاعلي مع التصحيح
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SECTION 1: WAS / WERE (PAST VERB TO BE)              */}
      {/* ======================================================== */}
      {activeMainSection === 'was-were' && (
        <div className="space-y-6">
          {/* Submode Switcher: Affirmative / Negative / Question */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200 shadow-2xs flex gap-2">
            <button
              onClick={() => setWasWereMode('affirmative')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                wasWereMode === 'affirmative'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              1. حالة الإثبات (Affirmative)
            </button>
            <button
              onClick={() => setWasWereMode('negative')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                wasWereMode === 'negative'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              2. حالة النفي (Negative)
            </button>
            <button
              onClick={() => setWasWereMode('question')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                wasWereMode === 'question'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              3. حالة السؤال (Questions)
            </button>
          </div>

          {/* ----------------- SUBMODE: AFFIRMATIVE ----------------- */}
          {wasWereMode === 'affirmative' && (
            <div className="space-y-5">
              {/* Formula Card - Crystal Clear Visual Badges (Zero BiDi glitch) */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-2 border-blue-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-blue-700 font-arabic block">
                      القاعدة الذهبية لحالة الإثبات
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-blue-950 font-arabic mt-0.5">
                      كيف نستخدم Was و Were في جملة الإثبات؟
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-xl" dir="ltr">
                    Past Simple of Be
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                  يتحول فعل الكينونة في الماضي إلى كلمتين فقط: <strong className="text-blue-900 font-mono" dir="ltr">was</strong> للمفرد والمتكلم، و <strong className="text-blue-900 font-mono" dir="ltr">were</strong> للجمع والمخاطب. انظر للصيغتين المرتبتين أدناه:
                </p>

                {/* Box 1: Singular Subject Formula */}
                <div className="bg-white border-2 border-blue-300 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 font-arabic flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                      الصيغة الأولى: مع الفاعل المفرد والمتكلم (I / He / She / It)
                    </span>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-mono" dir="ltr">
                      Singular + was
                    </span>
                  </div>

                  {/* Clean Visual Badge Chain (LTR layout with isolated badges) */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 bg-blue-50/60 rounded-xl border border-blue-100" dir="ltr">
                    <span className="bg-white border-2 border-blue-300 text-blue-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs font-mono">
                      I / He / She / It / اسم مفرد
                    </span>
                    <span className="text-blue-600 font-black text-lg">+</span>
                    <span className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm sm:text-base font-black shadow-xs font-mono tracking-wide ring-2 ring-blue-300">
                      was
                    </span>
                    <span className="text-blue-600 font-black text-lg">+</span>
                    <span className="bg-white border border-blue-200 text-zinc-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs font-arabic">
                      تكملة الجملة (مكان / صفة / اسم)
                    </span>
                  </div>

                  <p className="text-xs text-blue-900 font-arabic pt-1">
                    <strong>أمثلة من منهج ريتشارد:</strong>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                          The boat trip <strong className="text-blue-700">was</strong> quite exciting.
                        </p>
                        <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                          كانت رحلة القارب مثيرة للغاية. (الرحلة مفرد ➔ was)
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak('The boat trip was quite exciting.')}
                        className="p-2 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                          Ur <strong className="text-blue-700">was</strong> the capital of Sumerians.
                        </p>
                        <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                          كانت أور عاصمة السومريين. (أور مفرد ➔ was)
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak('Ur was the capital of the ancient Sumerian people.')}
                        className="p-2 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Box 2: Plural Subject Formula */}
                <div className="bg-white border-2 border-indigo-300 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 font-arabic flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
                      الصيغة الثانية: مع الفاعل الجمع والمخاطب (We / You / They)
                    </span>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-mono" dir="ltr">
                      Plural + were
                    </span>
                  </div>

                  {/* Clean Visual Badge Chain (LTR layout with isolated badges) */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 bg-indigo-50/60 rounded-xl border border-indigo-100" dir="ltr">
                    <span className="bg-white border-2 border-indigo-300 text-indigo-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs font-mono">
                      We / You / They / اسم جمع
                    </span>
                    <span className="text-indigo-600 font-black text-lg">+</span>
                    <span className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm sm:text-base font-black shadow-xs font-mono tracking-wide ring-2 ring-indigo-300">
                      were
                    </span>
                    <span className="text-indigo-600 font-black text-lg">+</span>
                    <span className="bg-white border border-indigo-200 text-zinc-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs font-arabic">
                      تكملة الجملة (صفة / مكان / اسم)
                    </span>
                  </div>

                  <p className="text-xs text-indigo-900 font-arabic pt-1">
                    <strong>أمثلة من منهج ريتشارد:</strong>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                          The players <strong className="text-indigo-700">were</strong> fantastic!
                        </p>
                        <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                          كان اللاعبون رائعين! (اللاعبون جمع ➔ were)
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak('The players were fantastic!')}
                        className="p-2 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                          My sisters <strong className="text-indigo-700">were</strong> fed up.
                        </p>
                        <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                          كانت أخواتي ضجرات ومستاءات. (أخواتي جمع ➔ were)
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak('My sisters were fed up.')}
                        className="p-2 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Iraqi Teacher Golden Notes */}
                <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 sm:p-5 space-y-2 text-right">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm font-arabic">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>ملاحظة ذهبية من الأستاذ العراقي للامتحانات:</span>
                  </div>
                  <ul className="text-xs text-amber-950 font-arabic space-y-1.5 pr-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>الضمير I:</strong> في المضارع يأخذ am، لكن في الماضي يأخذ دائماً <span className="font-mono font-bold text-blue-900" dir="ltr">was</span> (I was at home).
                    </li>
                    <li>
                      <strong>الضمير You:</strong> سواء قصدت به مفرد (أنتَ / أنتِ) أو جمع (أنتم)، يأخذ دائماً <span className="font-mono font-bold text-indigo-900" dir="ltr">were</span> (You were fantastic).
                    </li>
                    <li>
                      <strong>اللفظ الصحيح:</strong> كلمة were تلفظ /wɜːr/ (وير بصوت مفخم خفيف) ولا تلفظ وير كأداة السؤال where!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- SUBMODE: NEGATIVE ----------------- */}
          {wasWereMode === 'negative' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-rose-700 font-arabic block">
                      القاعدة الذهبية لحالة النفي
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-rose-950 font-arabic mt-0.5">
                      كيف ننفي الجملة التي تحتوي على Was أو Were؟
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-rose-100 text-rose-800 rounded-xl" dir="ltr">
                    Negative: wasn't / weren't
                  </span>
                </div>

                {/* Big Red Warning Callout */}
                <div className="bg-rose-100/90 border-2 border-rose-400 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-right">
                    <h5 className="text-xs sm:text-sm font-black text-rose-950 font-arabic">
                      تحذير امتحاني مهم جداً
                    </h5>
                    <p className="text-xs text-rose-900 font-arabic leading-relaxed">
                      إياك أن تستخدم كلمة <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded text-rose-700" dir="ltr">didn't</span> مع was أو were!
                      لا تقل أبداً خطأ: <span className="line-through font-mono">didn't was</span> أو خطأ: <span className="line-through font-mono">didn't were</span>.
                      الصحيح فقط هو إضافة <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded text-emerald-800" dir="ltr">not</span> مباشرة بعد الفعل:
                      أي: <strong className="font-mono text-emerald-900">wasn't</strong> و <strong className="font-mono text-emerald-900">weren't</strong>.
                    </p>
                  </div>
                </div>

                {/* Formulas for Negative */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Singular Negative */}
                  <div className="bg-white border-2 border-rose-300 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-rose-900 font-arabic block">
                      نفي المفرد (Singular Negative)
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-2 bg-rose-50/60 rounded-xl border border-rose-100" dir="ltr">
                      <span className="bg-white border border-rose-300 text-rose-950 px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono">
                        I / He / She / It
                      </span>
                      <span className="text-rose-600 font-bold">+</span>
                      <span className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-black font-mono">
                        was not (wasn't)
                      </span>
                      <span className="text-rose-600 font-bold">+</span>
                      <span className="bg-white border border-rose-200 text-zinc-700 px-2 py-1.5 rounded-lg text-xs font-arabic">
                        التكملة
                      </span>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between mt-2">
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                          Sara <strong className="text-rose-600">was not</strong> in Abu Dhabi.
                        </p>
                        <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                          لم تكن سارة في أبوظبي (بل في العراق).
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak("Sara was not in Abu Dhabi; she was in Iraq.")}
                        className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Plural Negative */}
                  <div className="bg-white border-2 border-rose-300 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-rose-900 font-arabic block">
                      نفي الجمع (Plural Negative)
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-2 bg-rose-50/60 rounded-xl border border-rose-100" dir="ltr">
                      <span className="bg-white border border-rose-300 text-rose-950 px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono">
                        We / You / They
                      </span>
                      <span className="text-rose-600 font-bold">+</span>
                      <span className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-black font-mono">
                        were not (weren't)
                      </span>
                      <span className="text-rose-600 font-bold">+</span>
                      <span className="bg-white border border-rose-200 text-zinc-700 px-2 py-1.5 rounded-lg text-xs font-arabic">
                        التكملة
                      </span>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between mt-2">
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                          The tickets <strong className="text-rose-600">weren't</strong> expensive.
                        </p>
                        <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                          لم تكن التذاكر باهظة الثمن.
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak("The tickets were not expensive.")}
                        className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- SUBMODE: QUESTION ----------------- */}
          {wasWereMode === 'question' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-indigo-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-700 font-arabic block">
                      القاعدة الذهبية لحالة السؤال
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-indigo-950 font-arabic mt-0.5">
                      كيف نصيغ السؤال مع Was و Were؟
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-xl" dir="ltr">
                    Yes/No Questions & Wh-
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                  في جملة السؤال، نقوم فقط بـ <strong>تقديم فعل الكينونة (Was أو Were)</strong> إلى بداية الجملة قبل الفاعل، ونضع علامة استفهام في النهاية دون الحاجة لاستخدام Did أبداً!
                </p>

                {/* Question Formula Badges */}
                <div className="bg-white border-2 border-indigo-300 rounded-2xl p-5 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-indigo-900 font-arabic block">
                    صيغة السؤال بنعم/لا (Yes / No Question):
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 bg-indigo-50/70 rounded-xl border border-indigo-100" dir="ltr">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-black font-mono shadow-xs">
                      Was / Were
                    </span>
                    <span className="text-indigo-600 font-black text-lg">+</span>
                    <span className="bg-white border-2 border-indigo-300 text-indigo-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic">
                      الفاعل (Subject)
                    </span>
                    <span className="text-indigo-600 font-black text-lg">+</span>
                    <span className="bg-white border border-indigo-200 text-zinc-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic">
                      التكملة
                    </span>
                    <span className="text-indigo-600 font-black text-lg">+</span>
                    <span className="bg-indigo-100 text-indigo-950 px-3 py-2 rounded-xl font-black font-mono">
                      ?
                    </span>
                  </div>

                  {/* Question Examples & Short Answers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {/* Example 1 */}
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-700 font-arabic">
                          سؤال المفرد (Singular)
                        </span>
                        <button
                          onClick={() => handleSpeak('Was the football match exciting? Yes, it was.')}
                          className="p-1 rounded-md bg-white border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                          title="استمع"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        <strong className="text-indigo-700">Was</strong> the football match exciting?
                      </p>
                      <div className="bg-white p-2 rounded-lg border border-zinc-200 text-xs font-sans text-zinc-700 flex justify-between" dir="ltr">
                        <span>Short Answer:</span>
                        <span className="font-bold text-emerald-700">Yes, it was. / No, it wasn't.</span>
                      </div>
                    </div>

                    {/* Example 2 */}
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-700 font-arabic">
                          سؤال الجمع (Plural)
                        </span>
                        <button
                          onClick={() => handleSpeak('Were they happy in Baghdad? Yes, they were.')}
                          className="p-1 rounded-md bg-white border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                          title="استمع"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        <strong className="text-indigo-700">Were</strong> they happy in Baghdad?
                      </p>
                      <div className="bg-white p-2 rounded-lg border border-zinc-200 text-xs font-sans text-zinc-700 flex justify-between" dir="ltr">
                        <span>Short Answer:</span>
                        <span className="font-bold text-emerald-700">Yes, they were. / No, they weren't.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. SECTION 2: ADJECTIVES (-ED vs -ING)                   */}
      {/* ======================================================== */}
      {activeMainSection === 'adjectives' && (
        <div className="space-y-6">
          {/* Main Visual Comparison Header */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 font-arabic block">
                  الفرق الجوهري بين الصفات
                </span>
                <h4 className="text-lg sm:text-xl font-black text-emerald-950 font-arabic mt-0.5">
                  الصفات المنتهية بـ (-ed) مقابل الصفات المنتهية بـ (-ing)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl" dir="ltr">
                Adjectives: -ed vs -ing
              </span>
            </div>

            {/* Side-by-Side Dual Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: -ed (المتأثر بالشعور) */}
              <div className="bg-white border-2 border-emerald-400 rounded-2xl p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono font-black text-sm">
                    -ed
                  </span>
                  <span className="text-xs font-bold text-emerald-800 font-arabic bg-emerald-50 px-2.5 py-1 rounded-md">
                    المتأثر بالشعور (The Feeling)
                  </span>
                </div>

                <h5 className="text-base font-bold text-zinc-900 font-arabic">
                  تصف شعور الشخص وإحساسه الداخلي
                </h5>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  نستخدمها عندما نصف كيف يشعر الشخص (غالباً الفاعل العاقل الذي يمتلك الإحساس).
                </p>

                {/* Examples */}
                <div className="space-y-2 pt-1">
                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        Richard was <strong className="text-emerald-700">bored</strong> in the markets.
                      </p>
                      <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                        شعر ريتشارد بالملل في الأسواق. (ريتشارد يحس بالملل)
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak('Richard was bored in the markets.')}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                      title="استمع"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        The boys were <strong className="text-emerald-700">excited</strong>.
                      </p>
                      <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                        كان الأولاد متحمسين وفرحين. (الأولاد يمتلكون الحماس)
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak('The boys were excited.')}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                      title="استمع"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: -ing (المسبب للشعور) */}
              <div className="bg-white border-2 border-teal-400 rounded-2xl p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-teal-600 text-white font-mono font-black text-sm">
                    -ing
                  </span>
                  <span className="text-xs font-bold text-teal-800 font-arabic bg-teal-50 px-2.5 py-1 rounded-md">
                    المسبب للشعور (The Cause)
                  </span>
                </div>

                <h5 className="text-base font-bold text-zinc-900 font-arabic">
                  تصف الشيء أو الشخص الذي يسبب الشعور
                </h5>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  نستخدمها لوصف مصدر التأثير (الشيء أو الفعالية التي تعطينا هذا الإحساس).
                </p>

                {/* Examples */}
                <div className="space-y-2 pt-1">
                  <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        Shopping is so <strong className="text-teal-700">boring</strong>!
                      </p>
                      <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                        التسوق ممل جداً! (التسوق هو الذي يسبب الملل)
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak('Shopping is so boring!')}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                      title="استمع"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        The boat trip was <strong className="text-teal-700">exciting</strong>.
                      </p>
                      <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                        كانت رحلة الزورق مثيرة وحماسية. (الرحلة سببت الإثارة)
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak('The boat trip was quite exciting.')}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 shrink-0 cursor-pointer shadow-2xs"
                      title="استمع"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ministerial Secret Trick Card */}
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 space-y-3 text-right">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-arabic">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>الخطة السحرية للحل في الامتحان التحريري والشهري:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-arabic text-amber-950">
                <div className="p-3.5 bg-white/90 rounded-xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900 block">
                    1. قاعدة الاسم بعد القوس ➔ اختَر (-ing):
                  </span>
                  <p className="leading-relaxed">
                    إذا وجدت بعد القوس مباشرة <strong>اسماً</strong> (مثل match, game, film, trip, book, story) فاختر دائماً صفة <strong>-ing</strong> دون تردد!
                  </p>
                  <p className="font-mono text-[11px] text-amber-800 pt-1" dir="ltr">
                    It was an (excited / <strong>exciting</strong>) football match.
                  </p>
                </div>

                <div className="p-3.5 bg-white/90 rounded-xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900 block">
                    2. قاعدة حرف الجر بعد القوس ➔ اختَر (-ed):
                  </span>
                  <p className="leading-relaxed">
                    إذا وجدت بعد القوس <strong>حرف جر</strong> (مثل in, with, at) أو نقطة (.) وكان الفاعل عاقلاً يشعر، فاختر دائماً صفة <strong>-ed</strong>!
                  </p>
                  <p className="font-mono text-[11px] text-amber-800 pt-1" dir="ltr">
                    He is very (<strong>interested</strong> / interesting) in history.
                  </p>
                </div>
              </div>
            </div>

            {/* Pairs Comparison Matrix */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                  جدول أزواج الصفات المنهجية الخمسة الأكثر تكراراً في الامتحانات:
                </h5>
                <span className="text-[11px] text-zinc-500 font-arabic">
                  اضغط على أي صفة لسماع نطقها
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  { ed: 'bored', edAr: 'يشعر بالملل / ضجران', ing: 'boring', ingAr: 'ممل ومضجر' },
                  { ed: 'excited', edAr: 'متحمس ومستمتع', ing: 'exciting', ingAr: 'مثير وحماسي' },
                  { ed: 'interested', edAr: 'مهتم ومشدود لشيء', ing: 'interesting', ingAr: 'شيق وممتع' },
                  { ed: 'tired', edAr: 'مرهق وتعبان', ing: 'tiring', ingAr: 'مُتعب ومجهد' },
                  { ed: 'frightened', edAr: 'خائف ومرعوب', ing: 'frightening', ingAr: 'مخيف ومرعب' },
                ].map((pair, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100/80 transition-colors space-y-2 text-right"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleSpeak(`${pair.ed}. ${pair.ing}.`)}
                        className="p-1 rounded bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer shadow-2xs"
                        title="استمع للكلمتين"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold text-zinc-400">
                        Pair 0{idx + 1}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-sans" dir="ltr">
                      <div className="text-left">
                        <span className="font-bold text-emerald-700">{pair.ed}</span>
                        <p className="text-[10px] text-zinc-500 font-arabic" dir="rtl">{pair.edAr}</p>
                      </div>
                      <span className="text-zinc-300 font-mono">⇄</span>
                      <div className="text-right">
                        <span className="font-bold text-teal-700">{pair.ing}</span>
                        <p className="text-[10px] text-zinc-500 font-arabic" dir="rtl">{pair.ingAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. SECTION 3: NARRATIVE CONNECTORS                       */}
      {/* ======================================================== */}
      {activeMainSection === 'connectors' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-700 font-arabic block">
                  أدوات تسلسل وسرد القصة
                </span>
                <h4 className="text-lg sm:text-xl font-black text-amber-950 font-arabic mt-0.5">
                  أدوات الربط والظروف الزمنية (Narrative Connectors)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-xl" dir="ltr">
                Story Connectors
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
              عندما كتب ريتشارد عن رحلته في العراق في سجل قصاصاته (Scrapbook)، استخدم أدوات ربط وظروف زمان لترتيب أحداث الزيارة منطقياً وزمنياً:
            </p>

            {/* 4 Core Connectors Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Connector 1: so */}
              <div className="p-4 bg-white border-2 border-amber-200 rounded-2xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-mono font-black text-xs" dir="ltr">
                    so (لذلك / لذا)
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 font-arabic">
                    تفيد النتيجة (Result)
                  </span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic">
                  تربط بين جملتين: الجملة الأولى سبب، والثانية نتيجة مترتبة عليها.
                </p>
                <div className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl flex items-center justify-between mt-2">
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-900 font-sans" dir="ltr">
                      We arrived in Baghdad at night, <strong className="text-amber-700">so</strong> we went to bed.
                    </p>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                      وصلنا بغداد ليلاً، لذلك ذهبنا للنوم مباشرة.
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak('We arrived in Baghdad at night, so we just went to bed.')}
                    className="p-1 rounded bg-white border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                    title="استمع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Connector 2: then */}
              <div className="p-4 bg-white border-2 border-amber-200 rounded-2xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-mono font-black text-xs" dir="ltr">
                    then (ثم / بعد ذلك)
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 font-arabic">
                    التعاقب الزمني (Sequence)
                  </span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic">
                  تُستخدم للدلالة على الحدث التالي المباشر في القصة.
                </p>
                <div className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl flex items-center justify-between mt-2">
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-900 font-sans" dir="ltr">
                      We looked around the markets. <strong className="text-amber-700">Then</strong> I was fed up!
                    </p>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                      تجولنا في الأسواق، ثم ضجرت وسئمت!
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak('We looked around the markets. Then I was fed up!')}
                    className="p-1 rounded bg-white border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                    title="استمع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Connector 3: after that / after a few days */}
              <div className="p-4 bg-white border-2 border-amber-200 rounded-2xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-mono font-black text-xs" dir="ltr">
                    after a few days
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 font-arabic">
                    الانتقال الزمني (Time jump)
                  </span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic">
                  تُستخدم للانتقال إلى محطة جديدة بعد مرور أيام في نفس المكان.
                </p>
                <div className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl flex items-center justify-between mt-2">
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-900 font-sans" dir="ltr">
                      <strong className="text-amber-700">After a few days</strong> in Baghdad, we took a coach to Ur.
                    </p>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                      بعد بضعة أيام في بغداد، استقللنا حافلة نحو أور.
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak('After a few days in Baghdad, we took a coach down to Ur.')}
                    className="p-1 rounded bg-white border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                    title="استمع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Connector 4: and */}
              <div className="p-4 bg-white border-2 border-amber-200 rounded-2xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-mono font-black text-xs" dir="ltr">
                    and (و)
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 font-arabic">
                    العطف والإضافة (Addition)
                  </span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic">
                  تربط بين فكرتين أو حدثين متجانسين بدون تناقض.
                </p>
                <div className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl flex items-center justify-between mt-2">
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-900 font-sans" dir="ltr">
                      I took lots of photos, <strong className="text-amber-700">and</strong> I have put some in my scrapbook.
                    </p>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                      التقطت الكثير من الصور، ووضعت بعضها في السجل.
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak('I took lots of photos, and I have put some in my scrapbook.')}
                    className="p-1 rounded bg-white border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                    title="استمع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Time Markers Timeline */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-arabic">
                ظروف الزمان المنهجية التي وردت في رحلة ريتشارد:
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans" dir="ltr">
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-left">
                  <span className="font-bold text-zinc-900">Next day</span>
                  <p className="text-[11px] text-zinc-500 font-arabic mt-0.5" dir="rtl">في اليوم التالي</p>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-left">
                  <span className="font-bold text-zinc-900">In the afternoon</span>
                  <p className="text-[11px] text-zinc-500 font-arabic mt-0.5" dir="rtl">في فترة بعد الظهر</p>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-left">
                  <span className="font-bold text-zinc-900">On Wednesday</span>
                  <p className="text-[11px] text-zinc-500 font-arabic mt-0.5" dir="rtl">يوم الأربعاء</p>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-left">
                  <span className="font-bold text-zinc-900">On Friday morning</span>
                  <p className="text-[11px] text-zinc-500 font-arabic mt-0.5" dir="rtl">صباح يوم الجمعة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. SECTION 4: LESSON 2 VERBS DATABASE                    */}
      {/* ======================================================== */}
      {activeMainSection === 'verbs' && (
        <div className="space-y-5">
          <div className="bg-white border-2 border-indigo-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-700 font-arabic block">
                  أفعال كتاب الطالب والنشاط (Lesson 2)
                </span>
                <h4 className="text-lg sm:text-xl font-black text-zinc-900 font-arabic mt-0.5">
                  جدول أفعال رحلة ريتشارد وسارة في العراق
                </h4>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 self-start sm:self-center bg-zinc-100 p-1 rounded-xl">
                <button
                  onClick={() => setVerbFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    verbFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  الكل ({lesson2Verbs.length})
                </button>
                <button
                  onClick={() => setVerbFilter('irregular')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    verbFilter === 'irregular'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  الشاذة ({lesson2Verbs.filter((v) => v.type === 'irregular').length})
                </button>
                <button
                  onClick={() => setVerbFilter('regular')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    verbFilter === 'regular'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  القياسية ({lesson2Verbs.filter((v) => v.type === 'regular').length})
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                value={verbSearch}
                onChange={(e) => setVerbSearch(e.target.value)}
                placeholder="ابحث عن فعل بالإنجليزية أو بالعربي (مثل: take, wore, أخذ...)"
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-arabic focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Verbs Table Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredVerbs.map((verb, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100/90 transition-all flex flex-col justify-between space-y-2 text-right"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                        verb.type === 'irregular'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {verb.type === 'irregular' ? 'شاذ Irregular' : 'قياسي Regular'}
                    </span>
                    <button
                      onClick={() => handleSpeak(`${verb.base}, in past: ${verb.past}`)}
                      className="p-1 rounded-md bg-white border border-zinc-200 text-zinc-700 hover:text-indigo-600 cursor-pointer shadow-2xs"
                      title="استمع للفظ المضارع والماضي"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-start gap-2 text-sm font-sans" dir="ltr">
                      <span className="font-mono text-zinc-500">{verb.base}</span>
                      <span className="text-zinc-300">➔</span>
                      <strong className="font-mono text-indigo-700 font-bold text-base">
                        {verb.past}
                      </strong>
                    </div>
                    <p className="text-xs font-bold text-zinc-800 font-arabic mt-1">
                      {verb.ar}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-sans mt-0.5" dir="ltr">
                      Context: {verb.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. SECTION 5: INTERACTIVE MINISTERIAL QUIZ              */}
      {/* ======================================================== */}
      {activeMainSection === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-700 font-arabic block">
                  بنك الأسئلة الشاملة والشهرية
                </span>
                <h4 className="text-lg sm:text-xl font-black text-purple-950 font-arabic mt-0.5">
                  اختبار شامل ومباشر على قواعد الدرس الثاني (10 أسئلة)
                </h4>
              </div>

              {quizSubmitted ? (
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <div className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm font-arabic">
                    النتيجة: {calculateScore()} من 10
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer shadow-2xs"
                    title="إعادة الاختبار"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-zinc-500 font-arabic self-start sm:self-center bg-white px-3 py-1.5 rounded-xl border border-purple-200">
                  تمت الإجابة على: {Object.keys(quizAnswers).length} من 10
                </span>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {quizQuestions.map((q, qIndex) => {
                const selectedOption = quizAnswers[q.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = isAnswered && selectedOption === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all text-right ${
                      quizSubmitted
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50/50'
                          : 'border-rose-300 bg-rose-50/50'
                        : 'border-zinc-200 bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center font-mono">
                        {qIndex + 1}
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

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {q.options.map((option, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        let btnStyle = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                          } else {
                            btnStyle = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-purple-600 text-white border-purple-600 font-bold shadow-2xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnStyle}`}
                            dir="ltr"
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {quizSubmitted && (
                      <div
                        className={`mt-3 p-3 rounded-xl text-xs font-arabic border leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-100/90 text-emerald-950 border-emerald-300'
                            : 'bg-rose-100/90 text-rose-950 border-rose-300'
                        }`}
                      >
                        <span className="font-bold block mb-0.5">
                          {isCorrect ? 'إجابة صحيحة:' : 'انتبه، التصحيح:'}
                        </span>
                        {q.explanationAr}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between">
              {quizSubmitted ? (
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 cursor-pointer shadow-sm font-arabic"
                >
                  إعادة الاختبار مرة أخرى
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold cursor-pointer shadow-sm font-arabic disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تسليم الإجابات والاطلاع على النتيجة والتصحيح
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
