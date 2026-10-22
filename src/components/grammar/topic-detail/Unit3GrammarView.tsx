import React, { useState } from 'react';
import {
  Volume2,
  Languages,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Table,
  HelpCircle,
  Clock,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { unit3GrammarLessons } from '../../../data/unit3GrammarTopics';

interface Unit3GrammarViewProps {
  topicId: string;
  onSpeak: (text: string) => void;
}

export const Unit3GrammarView: React.FC<Unit3GrammarViewProps> = ({ topicId, onSpeak }) => {
  // Find matching lesson & topic from unit3GrammarLessons
  const matchedLesson =
    unit3GrammarLessons.find((l) => l.topics.some((t) => t.id === topicId)) ||
    unit3GrammarLessons[0];
  const currentTopic =
    matchedLesson.topics.find((t) => t.id === topicId) || matchedLesson.topics[0];

  // Sub-tabs for topic 1 (Present Perfect)
  const [activePresPerfTab, setActivePresPerfTab] = useState<'affirmative' | 'negative' | 'question'>('affirmative');

  // Filter for verb table in topic 2
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectQuizOption = (quizId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optionIndex }));
  };

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* 1. TOPIC HEADER CARD */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-7 shadow-xs text-right">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-zinc-900 text-white">
            UNIT 3 • {matchedLesson.titleAr.split(':')[0]}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            {currentTopic.titleEn}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          {currentTopic.titleAr}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {currentTopic.summaryAr}
        </p>
      </div>

      {/* VIEW A: TOPIC 1 - PRESENT PERFECT TENSE */}
      {currentTopic.id === 'u3-l1-pres-perf' && (
        <div className="space-y-5">
          {/* Concept Banner: Before & Now Visual Timeline */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-l from-indigo-50/90 via-white to-blue-50/70 border border-indigo-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-2xs">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  الفكرة الذهبية لزمن المضارع التام (The Present Perfect Tense)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  يربط بين الماضي والحاضر: حدث اكتمل للتو، وأثره واضح الآن أمام عينيك!
                </p>
              </div>
            </div>

            {/* Visual Timeline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    الماضي القريب (الحدث)
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    🧹 قام الشخص بغسل النوافذ
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl" dir="ltr">
                  have washed
                </span>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    الحاضر الآن (النتيجة)
                  </span>
                  <p className="text-xs font-bold text-emerald-900">
                    ✨ النوافذ نظيفة وتلمع تماماً
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-white border border-emerald-200 px-2.5 py-1 rounded-xl">
                  النتيجة الحالية
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: Affirmative, Negative, Question */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
            {[
              { id: 'affirmative', label: '1. الإثبات (have / has + p.p)' },
              { id: 'negative', label: "2. النفي (haven't / hasn't + p.p)" },
              { id: 'question', label: '3. الاستفهام (Have / Has + فاعل)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePresPerfTab(tab.id as any)}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activePresPerfTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: AFFIRMATIVE */}
          {activePresPerfTab === 'affirmative' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  1. حالة الإثبات (Affirmative Sentences)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200" dir="ltr">
                  have / has + p.p
                </span>
              </div>

              {/* Colorful Visual Formula Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 block">
                  شريط كروت القاعدة التفاعلية:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject <span className="font-arabic text-[11px] text-slate-500 font-normal">(الفاعل)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-indigo-200">
                    have / has
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    Past Participle (p.p)
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    Complement <span className="font-arabic text-[11px] text-slate-500 font-normal">(التكملة)</span>
                  </span>
                </div>
              </div>

              {/* Colorful Comparison Cards: Singular (has) vs Plural (have) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Singular Card */}
                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                    <span className="font-bold text-xs sm:text-sm text-purple-900 font-arabic flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0"></span>
                      <span>1. الفاعل المفرد (Singular)</span>
                    </span>
                    <span className="text-xs bg-purple-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                      has + p.p
                    </span>
                  </div>
                  <p className="text-xs text-purple-800 font-arabic leading-relaxed">
                    مع الضمائر: <strong>He, She, It</strong> أو أي اسم مفرد (Noor, Ahmad):
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-purple-200/80 font-mono text-xs text-slate-900 flex items-center justify-between" dir="ltr">
                    <span>She <strong className="text-purple-700 font-black">has cleaned</strong> the floor.</span>
                    <button
                      type="button"
                      onClick={() => onSpeak("She has cleaned the kitchen floor.")}
                      className="p-1 rounded-lg text-purple-600 hover:bg-purple-50"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Plural & I Card */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                    <span className="font-bold text-xs sm:text-sm text-blue-900 font-arabic flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>2. الفاعل الجمع والمتكلم (Plural & I)</span>
                    </span>
                    <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                      have + p.p
                    </span>
                  </div>
                  <p className="text-xs text-blue-800 font-arabic leading-relaxed">
                    مع الضمائر: <strong>I, We, They, You</strong> أو أي اسم جمع (Students):
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200/80 font-mono text-xs text-slate-900 flex items-center justify-between" dir="ltr">
                    <span>They <strong className="text-blue-700 font-black">have painted</strong> the gate.</span>
                    <button
                      type="button"
                      onClick={() => onSpeak("They have painted the garden gate.")}
                      className="p-1 rounded-lg text-blue-600 hover:bg-blue-50"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contraction Pills */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-arabic">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>طريقة الاختصار في الامتحان:</span>
                </span>
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono font-bold text-slate-800">
                    have ➔ &apos;ve <span className="font-arabic text-[10px] text-slate-500">(I&apos;ve finished)</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono font-bold text-slate-800">
                    has ➔ &apos;s <span className="font-arabic text-[10px] text-slate-500">(He&apos;s gone)</span>
                  </span>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة توضيحية من كتاب الطالب:
                </span>
                {[
                  { en: "I have washed the windows.", ar: 'لقد غسلتُ النوافذ.', highlight: 'have washed' },
                  { en: "She has cleaned the kitchen floor.", ar: 'لقد نظفت أرضية المطبخ.', highlight: 'has cleaned' },
                  { en: "They have painted the garden gate.", ar: 'لقد صبغوا بوابة الحديقة.', highlight: 'have painted' },
                ].map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(ex.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                          {ex.en}
                        </p>
                        <p className="text-xs text-slate-500 font-arabic mt-0.5">
                          {ex.ar}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200" dir="ltr">
                      {ex.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: NEGATIVE */}
          {activePresPerfTab === 'negative' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  2. حالة النفي (Negative Sentences)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-rose-50 text-rose-800 rounded-xl border border-rose-200" dir="ltr">
                  haven&apos;t / hasn&apos;t + p.p
                </span>
              </div>

              {/* Colorful Visual Formula Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 block">
                  شريط كروت النفي التفاعلية:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject <span className="font-arabic text-[11px] text-slate-500 font-normal">(الفاعل)</span>
                  </span>
                  <span className="text-rose-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-rose-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-rose-200">
                    haven&apos;t / hasn&apos;t
                  </span>
                  <span className="text-rose-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    Past Participle (p.p)
                  </span>
                  <span className="text-rose-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    Complement
                  </span>
                </div>
              </div>

              {/* Two Negative Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                    <span className="font-bold text-xs sm:text-sm text-rose-900 font-arabic">
                      نفي المفرد (He / She / It)
                    </span>
                    <span className="text-xs bg-rose-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                      hasn&apos;t + p.p
                    </span>
                  </div>
                  <p className="text-xs text-rose-800 font-arabic leading-relaxed">
                    نضيف not إلى has ➔ <strong>hasn&apos;t</strong>، ويبقى الفعل بالتصريف الثالث:
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-rose-200/80 font-mono text-xs text-slate-900 flex items-center justify-between" dir="ltr">
                    <span>Ahmad <strong className="text-rose-700 font-black">hasn&apos;t swept</strong> the path.</span>
                    <button
                      type="button"
                      onClick={() => onSpeak("Ahmad hasn't swept the path.")}
                      className="p-1 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                    <span className="font-bold text-xs sm:text-sm text-rose-900 font-arabic">
                      نفي الجمع والمتكلم (I / We / They / You)
                    </span>
                    <span className="text-xs bg-rose-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                      haven&apos;t + p.p
                    </span>
                  </div>
                  <p className="text-xs text-rose-800 font-arabic leading-relaxed">
                    نضيف not إلى have ➔ <strong>haven&apos;t</strong>، ويبقى الفعل بالتصريف الثالث:
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-rose-200/80 font-mono text-xs text-slate-900 flex items-center justify-between" dir="ltr">
                    <span>I <strong className="text-rose-700 font-black">haven&apos;t tidied</strong> my bedroom yet.</span>
                    <button
                      type="button"
                      onClick={() => onSpeak("I haven't tidied my bedroom yet.")}
                      className="p-1 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contraction Formula Box */}
              <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs font-arabic">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>قاعدة دمج أداة النفي (not):</span>
                </span>
                <div className="flex items-center gap-2 font-mono font-bold text-xs" dir="ltr">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-900">
                    have + not = <span className="text-rose-700">haven&apos;t</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-900">
                    has + not = <span className="text-rose-700">hasn&apos;t</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: QUESTION */}
          {activePresPerfTab === 'question' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  3. صيغة السؤال القصير (Yes / No Questions)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200" dir="ltr">
                  Have / Has + Subject + p.p?
                </span>
              </div>

              {/* Colorful Visual Formula Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 block">
                  شريط كروت السؤال التفاعلية:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-indigo-200">
                    Have / Has
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject <span className="font-arabic text-[11px] text-slate-500 font-normal">(الفاعل)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    Past Participle (p.p)
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-amber-500 text-white font-mono font-black text-xs sm:text-sm shadow-xs">
                    ?
                  </span>
                </div>
              </div>

              {/* Short Answers Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Yes Answers Card */}
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center gap-1.5 border-b border-emerald-100 pb-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-xs sm:text-sm text-emerald-900 font-arabic">
                      الإجابة القصيرة بالإثبات (Yes)
                    </span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs text-slate-900" dir="ltr">
                    <div className="p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                      <span>Yes, I / you / we / they <strong className="text-emerald-700">have</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للجمع والمتكلم</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                      <span>Yes, he / she / it <strong className="text-emerald-700">has</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للمفرد</span>
                    </div>
                  </div>
                </div>

                {/* No Answers Card */}
                <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center gap-1.5 border-b border-rose-100 pb-2">
                    <X className="w-4 h-4 text-rose-700" />
                    <span className="font-bold text-xs sm:text-sm text-rose-900 font-arabic">
                      الإجابة القصيرة بالنفي (No)
                    </span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs text-slate-900" dir="ltr">
                    <div className="p-2 bg-white rounded-xl border border-rose-200 flex items-center justify-between">
                      <span>No, I / you / we / they <strong className="text-rose-700">haven&apos;t</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للجمع والمتكلم</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-rose-200 flex items-center justify-between">
                      <span>No, he / she / it <strong className="text-rose-700">hasn&apos;t</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للمفرد</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة أسئلة من منهاج الأول متوسط:
                </span>
                {[
                  { q: 'Have you finished your homework?', a: 'Yes, I have.', ar: 'هل أنهيت واجبك؟ - نعم، لقد أنهيت.' },
                  { q: 'Has Huda cooked the dinner?', a: "No, she hasn't.", ar: 'هل طبخت هدى العشاء؟ - لا، لم تفعل.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(`${item.q} ${item.a}`)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                          {item.q} ➔ <span className="text-indigo-700">{item.a}</span>
                        </p>
                        <p className="text-xs text-slate-500 font-arabic mt-0.5">
                          {item.ar}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW B: TOPIC 2 - REGULAR & IRREGULAR PAST PARTICIPLES TABLE */}
      {currentTopic.id === 'u3-l2-verb-forms' && (
        <div className="space-y-5">
          {/* Top Visual Cards: Regular vs Irregular Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Regular Card */}
            <div className="bg-emerald-50/60 p-4 sm:p-5 rounded-3xl border border-emerald-200 space-y-2 text-right shadow-2xs">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                <span className="font-bold text-xs sm:text-sm text-emerald-900 font-arabic flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>1. الأفعال القياسية (Regular Verbs)</span>
                </span>
                <span className="text-xs font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md" dir="ltr">
                  + ed
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-arabic leading-relaxed">
                نضيف لها (ed) فقط في كلا صيغتي الماضي والتصريف الثالث دون أي تغيير بشكل الفعل:
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-emerald-200/80 font-mono text-xs font-bold text-slate-900 flex items-center justify-between" dir="ltr">
                <span>wash ➔ washed ➔ <span className="text-emerald-700">washed</span></span>
                <span className="font-arabic text-[11px] text-slate-500">يغسل</span>
              </div>
            </div>

            {/* Irregular Card */}
            <div className="bg-purple-50/60 p-4 sm:p-5 rounded-3xl border border-purple-200 space-y-2 text-right shadow-2xs">
              <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                <span className="font-bold text-xs sm:text-sm text-purple-900 font-arabic flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span>2. الأفعال الشاذة (Irregular Verbs)</span>
                </span>
                <span className="text-xs font-mono font-bold bg-purple-600 text-white px-2 py-0.5 rounded-md" dir="ltr">
                  حفظ غيباً
                </span>
              </div>
              <p className="text-xs text-purple-800 font-arabic leading-relaxed">
                يتغير شكلها في التصريف الثالث (p.p) وتتكرر دائماً بالامتحانات الوزارية والمدرسية:
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-purple-200/80 font-mono text-xs font-bold text-slate-900 flex items-center justify-between" dir="ltr">
                <span>go ➔ went ➔ <span className="text-purple-700 font-black">gone</span></span>
                <span className="font-arabic text-[11px] text-slate-500">يذهب</span>
              </div>
            </div>
          </div>

          {/* Interactive Verb Cards & Filter */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Table className="w-5 h-5 text-indigo-600" />
                  <span>جدول تصاريف أفعال الوحدة الثالثة المقررة</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  احفظ تصاريف الأفعال (المصدر • الماضي البسيط • التصريف الثالث):
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
                {[
                  { id: 'all', label: 'جميع الأفعال (14)' },
                  { id: 'regular', label: 'القياسية (5)' },
                  { id: 'irregular', label: 'الشاذة (9)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setVerbFilter(f.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                      verbFilter === f.id
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verb Table */}
            {currentTopic.verbTables?.map((tbl, tblIdx) => {
              const filteredRows = tbl.rows.filter(
                (r) => verbFilter === 'all' || r.type === verbFilter
              );

              return (
                <div key={tblIdx} className="space-y-4">
                  {/* Mobile Card View (sm:hidden) */}
                  <div className="grid grid-cols-1 gap-2.5 sm:hidden">
                    {filteredRows.map((r, rIdx) => {
                      const ppForm =
                        r.base === 'sweep' ? 'swept' :
                        r.base === 'go' ? 'gone' :
                        r.base === 'see' ? 'seen' :
                        r.base === 'eat' ? 'eaten' :
                        r.base === 'drink' ? 'drunk' :
                        r.base === 'do' ? 'done' :
                        r.base === 'write' ? 'written' :
                        r.base === 'ride' ? 'ridden' :
                        r.base === 'give' ? 'given' :
                        r.past;

                      return (
                        <div
                          key={rIdx}
                          className="bg-white rounded-2xl border border-zinc-200 p-3.5 shadow-xs space-y-2.5"
                        >
                          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-arabic font-bold text-sm text-slate-900">
                                {r.meaningAr}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  r.type === 'irregular'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {r.type === 'irregular' ? 'شاذ' : 'قياسي'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => onSpeak(`${r.base}, ${r.past}, ${ppForm}`)}
                              className="p-1.5 rounded-xl bg-zinc-100 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="استمع للنطق"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-1.5 text-center" dir="ltr">
                            <div className="bg-zinc-50 rounded-xl p-2 border border-zinc-200/80">
                              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                                Base
                              </div>
                              <div className="font-mono font-bold text-xs text-slate-900">
                                {r.base}
                              </div>
                            </div>
                            <div className="bg-blue-50/50 rounded-xl p-2 border border-blue-200/80">
                              <div className="text-[10px] font-medium text-blue-700 uppercase tracking-wider mb-0.5">
                                Past
                              </div>
                              <div className="font-mono font-semibold text-xs text-blue-800">
                                {r.past}
                              </div>
                            </div>
                            <div className="bg-purple-50/70 rounded-xl p-2 border border-purple-200/80">
                              <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mb-0.5">
                                P.P.
                              </div>
                              <div className="font-mono font-black text-xs text-purple-800">
                                {ppForm}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Table (hidden sm:block) */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-right text-xs border border-zinc-200 rounded-2xl overflow-hidden">
                      <thead className="bg-slate-900 text-white font-arabic">
                        <tr>
                          <th className="p-3">المصدر (Base)</th>
                          <th className="p-3">الماضي (Past)</th>
                          <th className="p-3">التصريف الثالث (p.p)</th>
                          <th className="p-3">المعنى بالعربية</th>
                          <th className="p-3">النوع</th>
                          <th className="p-3 text-center">نطق</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white">
                        {filteredRows.map((r, rIdx) => {
                          const ppForm =
                            r.base === 'sweep' ? 'swept' :
                            r.base === 'go' ? 'gone' :
                            r.base === 'see' ? 'seen' :
                            r.base === 'eat' ? 'eaten' :
                            r.base === 'drink' ? 'drunk' :
                            r.base === 'do' ? 'done' :
                            r.base === 'write' ? 'written' :
                            r.base === 'ride' ? 'ridden' :
                            r.base === 'give' ? 'given' :
                            r.past;

                          return (
                            <tr key={rIdx} className="hover:bg-zinc-50 transition-colors">
                              <td className="p-3 font-mono font-bold text-slate-900" dir="ltr">
                                {r.base}
                              </td>
                              <td className="p-3 font-mono text-slate-700" dir="ltr">
                                {r.past}
                              </td>
                              <td className="p-3 font-mono font-black text-purple-700 bg-purple-50/50" dir="ltr">
                                {ppForm}
                              </td>
                              <td className="p-3 font-arabic text-slate-700 font-bold">
                                {r.meaningAr}
                              </td>
                              <td className="p-3 font-arabic">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    r.type === 'irregular'
                                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  }`}
                                >
                                  {r.type === 'irregular' ? 'شاذ' : 'قياسي'}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => onSpeak(`${r.base}, ${r.past}, ${ppForm}`)}
                                  className="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW C: TOPIC 3 - ADVERBS OF MANNER */}
      {currentTopic.id === 'u3-l3-adverbs' && (
        <div className="space-y-5">
          {/* Visual Formula Chips: Adjective + ly = Adverb */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  قواعد تحويل الصفات إلى ظروف حال (Adverbs of Manner)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  ظرف الحال يصف طريقة حدوث الفعل ويُشتق من الصفة:
                </p>
              </div>
            </div>

            {/* Formula Chips */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 block">
                القاعدة العامة لتكوين ظرف الحال:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                  Adjective <span className="font-arabic text-[11px] text-slate-500 font-normal">(الصفة)</span>
                </span>
                <span className="text-indigo-600 font-black text-base">+</span>
                <span className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-blue-200">
                  ly
                </span>
                <span className="text-indigo-600 font-black text-base">=</span>
                <span className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-indigo-200">
                  Adverb of Manner <span className="font-arabic text-[11px] text-white/80 font-normal">(ظرف الحال)</span>
                </span>
              </div>
            </div>

            {/* Crucial Exam Comparison: Adjective vs Adverb */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 block">
                مقارنة الامتحان الذهبية: الفرق بين الصفة وظرف الحال:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2 text-right shadow-2xs">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-200 text-amber-900 font-arabic">
                    1. الصفة (Adjective)
                  </span>
                  <p className="text-xs text-amber-900 font-arabic leading-relaxed">
                    تصف <strong>الاسم أو الشخص</strong> وتأتي قبله:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-mono text-xs text-slate-900" dir="ltr">
                    He is a <strong className="text-amber-700">careful</strong> driver.
                  </div>
                  <span className="text-[11px] text-slate-500 font-arabic block">
                    (تصف السائق بأنه شخص حذر)
                  </span>
                </div>

                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-2 text-right shadow-2xs">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-200 text-blue-900 font-arabic">
                    2. ظرف الحال (Adverb)
                  </span>
                  <p className="text-xs text-blue-900 font-arabic leading-relaxed">
                    يصف <strong>طريقة حدوث الفعل</strong> ويأتي بعده:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-blue-200 font-mono text-xs text-slate-900" dir="ltr">
                    He drives <strong className="text-blue-700">carefully</strong>.
                  </div>
                  <span className="text-[11px] text-slate-500 font-arabic block">
                    (تصف طريقة القيادة بأنها بحذر)
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Detailed Rule Cards */}
            <div className="space-y-3.5 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                الحالات الإملائية الثلاث لتحويل الصفات إلى ظروف:
              </span>

              {/* Rule 1: Regular +ly */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-zinc-200/70 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 font-arabic">
                    1. إضافة (ly-) إلى معظم الصفات العادية
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                    + ly
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" dir="ltr">
                  {[
                    { base: 'slow', adv: 'slowly', ar: 'ببطء' },
                    { base: 'quiet', adv: 'quietly', ar: 'بهدوء' },
                    { base: 'careful', adv: 'carefully', ar: 'بحذر' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-xl border border-zinc-200 flex items-center justify-between text-xs">
                      <span>{item.base} ➔ <strong className="text-blue-700">{item.adv}</strong></span>
                      <span className="font-arabic text-[10px] text-slate-500">{item.ar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rule 2: -y to -ily */}
              <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-amber-950 font-arabic">
                    2. الصفات المنتهية بـ (y) مسبوق بحرف صحيح
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                    y ➔ ily
                  </span>
                </div>
                <p className="text-xs text-amber-900 font-arabic">
                  نحذف حرف الـ (y) ونضع مكانه (i) ثم نضيف (ly) فتصبح (ily-):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" dir="ltr">
                  {[
                    { base: 'happy', adv: 'happily', ar: 'بسعادة' },
                    { base: 'easy', adv: 'easily', ar: 'بسهولة' },
                    { base: 'angry', adv: 'angrily', ar: 'بغضب' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                      <span>{item.base} ➔ <strong className="text-amber-800">{item.adv}</strong></span>
                      <span className="font-arabic text-[10px] text-slate-500">{item.ar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rule 3: Irregular Adverbs */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-purple-200/70 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-purple-950 font-arabic flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-purple-600" />
                    <span>3. ظروف الحال الشاذة (مهمة جداً في الامتحانات)</span>
                  </span>
                  <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-md font-arabic">
                    حفظ خاص
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" dir="ltr">
                  <div className="p-2 bg-white rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                    <span>good ➔ <strong className="text-purple-700">well</strong></span>
                    <span className="font-arabic text-[10px] text-slate-500">جيد ➔ بشكل جيد</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                    <span>fast ➔ <strong className="text-purple-700">fast</strong></span>
                    <span className="font-arabic text-[10px] text-slate-500">سريع ➔ بسرعة</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-purple-200 flex items-center justify-between text-xs">
                    <span>hard ➔ <strong className="text-purple-700">hard</strong></span>
                    <span className="font-arabic text-[10px] text-slate-500">بجد / باجتهاد</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-arabic font-bold flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>انتبه وتحذر: لا يوجد في اللغة الإنجليزية أبداً كلمات مثل goodly أو fastly!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXAM TIPS SECTION (نصائح الامتحان الوزاري والمدرسي) */}
      {currentTopic.examTips && currentTopic.examTips.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-amber-200/80 pb-2.5">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm sm:text-base font-black text-amber-950 font-arabic">
              نصائح وتكتيكات ذهبية للامتحان:
            </h4>
          </div>
          <div className="space-y-2 font-arabic text-xs sm:text-sm text-amber-950">
            {currentTopic.examTips.map((tip, tipIdx) => (
              <div key={tipIdx} className="flex items-start gap-2 bg-white/80 p-3 rounded-2xl border border-amber-200/80 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {tipIdx + 1}
                </span>
                <p className="leading-relaxed font-bold">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE QUIZ SECTION */}
      {currentTopic.quiz && currentTopic.quiz.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                اختبار تفاعلي سريع للموضوع
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                اختر الإجابة الصحيحة واكتشف الحل مع التعليل الفوري:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentTopic.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      السؤال {qIdx + 1}:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {q.questionTextAr && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                            visibleTranslations[q.id]
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                              : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                          title="ترجمة السؤال"
                        >
                          <Languages className="w-3 h-3 text-indigo-600" />
                          <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onSpeak(q.questionTextEn)}
                        className="p-1 text-slate-400 hover:text-indigo-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 text-left" dir="ltr">
                    {q.questionTextEn}
                  </p>
                  {q.questionTextAr && visibleTranslations[q.id] && (
                    <p className="text-xs text-slate-600 font-arabic p-2 bg-white rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150" dir="rtl">
                      {q.questionTextAr}
                    </p>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === q.correctIndex;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                            isAnswered
                              ? isOptionCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                : isOptionSelected
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white border-zinc-200 text-slate-400 opacity-60'
                              : 'bg-white border-zinc-200 hover:border-slate-800 text-slate-800'
                          }`}
                          dir="ltr"
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3 rounded-xl border text-xs font-arabic ${
                      isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <strong>{isCorrect ? 'إجابة صحيحة ممتاز! ' : 'انتبه للحل الصحيح: '}</strong>
                      <span>{q.explanationAr}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
