import React, { useState } from 'react';
import {
  Volume2,
  Languages,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  ArrowRight,
  HelpCircle,
  Sun,
  CloudRain,
  Snowflake,
  Wind,
} from 'lucide-react';
import { unit2GrammarTopicsList } from '../../../data/unit2GrammarTopics';

interface Unit2GrammarViewProps {
  topicId: string;
  onSpeak: (text: string) => void;
}

export const Unit2GrammarView: React.FC<Unit2GrammarViewProps> = ({ topicId, onSpeak }) => {
  // Find matching topic from unit2GrammarTopicsList
  const currentTopic =
    unit2GrammarTopicsList.find((t) => t.id === topicId) || unit2GrammarTopicsList[0];

  // Sub-tabs for Topic 1: Future Simple with will
  const [activeFutureTab, setActiveFutureTab] = useState<
    'affirmative' | 'negative' | 'question' | 'markers_verbs' | 'practice'
  >('affirmative');

  // Sub-tabs for Topic 2: Comparatives & Superlatives
  const [activeCompTab, setActiveCompTab] = useState<
    'rules' | 'comparative' | 'superlative' | 'table' | 'practice'
  >('rules');

  // Sub-tabs for Topic 3: Ordinal Numbers & Dates
  const [activeDatesTab, setActiveDatesTab] = useState<
    'ordinals' | 'dates' | 'prepositions' | 'practice'
  >('ordinals');

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectQuizOption = (quizId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optionIndex }));
  };

  // Full Unit 2 Ordinals List (1st - 31st)
  const fullOrdinals = [
    { num: '1st', word: 'first', ar: 'الأول', special: 'irregular' },
    { num: '2nd', word: 'second', ar: 'الثاني', special: 'irregular' },
    { num: '3rd', word: 'third', ar: 'الثالث', special: 'irregular' },
    { num: '4th', word: 'fourth', ar: 'الرابع' },
    { num: '5th', word: 'fifth', ar: 'الخامس (تغير ve إلى f)', special: 'spelling' },
    { num: '6th', word: 'sixth', ar: 'السادس' },
    { num: '7th', word: 'seventh', ar: 'السابع' },
    { num: '8th', word: 'eighth', ar: 'الثامن (إضافة h فقط)', special: 'spelling' },
    { num: '9th', word: 'ninth', ar: 'التاسع (حذف e)', special: 'spelling' },
    { num: '10th', word: 'tenth', ar: 'العاشر' },
    { num: '11th', word: 'eleventh', ar: 'الحادي عشر' },
    { num: '12th', word: 'twelfth', ar: 'الثاني عشر (ve تصبح f)', special: 'spelling' },
    { num: '13th', word: 'thirteenth', ar: 'الثالث عشر' },
    { num: '14th', word: 'fourteenth', ar: 'الرابع عشر' },
    { num: '15th', word: 'fifteenth', ar: 'الخامس عشر' },
    { num: '16th', word: 'sixteenth', ar: 'السادس عشر' },
    { num: '17th', word: 'seventeenth', ar: 'السابع عشر' },
    { num: '18th', word: 'eighteenth', ar: 'الثامن عشر' },
    { num: '19th', word: 'nineteenth', ar: 'التاسع عشر' },
    { num: '20th', word: 'twentieth', ar: 'العشرون (y تصبح ie)', special: 'spelling' },
    { num: '21st', word: 'twenty-first', ar: 'الحادي والعشرون (عيد الربيع)', special: 'compound' },
    { num: '22nd', word: 'twenty-second', ar: 'الثاني والعشرون', special: 'compound' },
    { num: '23rd', word: 'twenty-third', ar: 'الثالث والعشرون', special: 'compound' },
    { num: '24th', word: 'twenty-fourth', ar: 'الرابع والعشرون' },
    { num: '25th', word: 'twenty-fifth', ar: 'الخامس والعشرون' },
    { num: '26th', word: 'twenty-sixth', ar: 'السادس والعشرون' },
    { num: '27th', word: 'twenty-seventh', ar: 'السابع والعشرون' },
    { num: '28th', word: 'twenty-eighth', ar: 'الثامن والعشرون' },
    { num: '29th', word: 'twenty-ninth', ar: 'التاسع والعشرون' },
    { num: '30th', word: 'thirtieth', ar: 'الثلاثون (y تصبح ie)', special: 'spelling' },
    { num: '31st', word: 'thirty-first', ar: 'الحادي والثلاثون', special: 'compound' },
  ];

  // Extended Textbook Adjectives for Unit 2
  const textbookAdjectives = [
    { base: 'cold', comp: 'colder', sup: 'the coldest', ar: 'بارد', rule: 'مقطع واحد: +er / +est' },
    { base: 'hot', comp: 'hotter', sup: 'the hottest', ar: 'حار', rule: 'مضاعفة الحرف الصحيح: t' },
    { base: 'warm', comp: 'warmer', sup: 'the warmest', ar: 'دافئ', rule: 'مقطع واحد: +er / +est' },
    { base: 'cool', comp: 'cooler', sup: 'the coolest', ar: 'معتدل / بارد ولطيف', rule: 'مقطع واحد: +er / +est' },
    { base: 'sunny', comp: 'sunnier', sup: 'the sunniest', ar: 'مشمس', rule: 'قلب y إلى i' },
    { base: 'dry', comp: 'drier', sup: 'the driest', ar: 'جاف', rule: 'قلب y إلى i' },
    { base: 'wet', comp: 'wetter', sup: 'the wettest', ar: 'رطب / ممطر', rule: 'مضاعفة الحرف الصحيح: t' },
    { base: 'windy', comp: 'windier', sup: 'the windiest', ar: 'عاصف بالرياح', rule: 'قلب y إلى i' },
    { base: 'cloudy', comp: 'cloudier', sup: 'the cloudiest', ar: 'غائم', rule: 'قلب y إلى i' },
    { base: 'rainy', comp: 'rainier', sup: 'the rainiest', ar: 'ماطر', rule: 'قلب y إلى i' },
    { base: 'snowy', comp: 'snowier', sup: 'the snowiest', ar: 'مثلج', rule: 'قلب y إلى i' },
    { base: 'fast', comp: 'faster', sup: 'the fastest', ar: 'سريع (رياضات الشتاء)', rule: 'مقطع واحد: +er / +est' },
    { base: 'nice', comp: 'nicer', sup: 'the nicest', ar: 'لطيف / جميل', rule: 'ينتهي بـ e: +r / +st' },
    { base: 'large', comp: 'larger', sup: 'the largest', ar: 'كبير الحجم', rule: 'ينتهي بـ e: +r / +st' },
    { base: 'beautiful', comp: 'more beautiful', sup: 'the most beautiful', ar: 'جميل', rule: 'صفة طويلة: more / most' },
    { base: 'interesting', comp: 'more interesting', sup: 'the most interesting', ar: 'ممتع وشيق', rule: 'صفة طويلة: more / most' },
    { base: 'dangerous', comp: 'more dangerous', sup: 'the most dangerous', ar: 'خطير', rule: 'صفة طويلة: more / most' },
    { base: 'good', comp: 'better', sup: 'the best', ar: 'جيد', rule: 'شاذة: تحفظ غيباً' },
    { base: 'bad', comp: 'worse', sup: 'the worst', ar: 'سيء', rule: 'شاذة: تحفظ غيباً' },
    { base: 'far', comp: 'farther', sup: 'the farthest', ar: 'بعيد', rule: 'شاذة: تحفظ غيباً' },
  ];

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* 1. TOPIC HEADER CARD */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-7 shadow-xs text-right">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-zinc-900 text-white">
            UNIT 2 • TOPIC 0{currentTopic.number}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            {currentTopic.badge}
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
            {currentTopic.category}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          {currentTopic.titleAr}
        </h3>
        <p className="text-xs sm:text-sm text-blue-700 font-mono font-bold mt-0.5" dir="ltr">
          {currentTopic.titleEn}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {currentTopic.summaryAr}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* TOPIC 1: FUTURE SIMPLE WITH WILL */}
      {/* ========================================================================= */}
      {currentTopic.id === 'u2-topic-future-will' && (
        <div className="space-y-5">
          {/* Concept Banner: Present vs Future Weather Forecast */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-l from-blue-50/90 via-white to-indigo-50/70 border border-blue-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-blue-600 text-white shadow-2xs">
                <CloudRain className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  الفكرة الجوهرية لزمن المستقبل البسيط (Future Simple with will)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  يُستخدم للتنبؤ بأحوال الطقس (Weather Forecast) والقرارات الفورية والوعود:
                </p>
              </div>
            </div>

            {/* Visual Timeline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    الحاضر الآن (Today)
                  </span>
                  <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>الجو الآن دافئ وصحو</span>
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200" dir="ltr">
                  It is sunny today
                </span>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                    التنبؤ بالمستقبل (Tomorrow)
                  </span>
                  <p className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                    <span>سوف تمطر غداً في بغداد</span>
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-white border border-blue-200 px-2.5 py-1 rounded-xl shadow-2xs" dir="ltr">
                  It will rain tomorrow
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: Affirmative, Negative, Question, Markers & Verbs, Practice */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
            {[
              { id: 'affirmative', label: "1. الإثبات (will / 'll + مصدر)" },
              { id: 'negative', label: "2. النفي (won't + مصدر)" },
              { id: 'question', label: '3. الاستفهام (Will + فاعل + مصدر؟)' },
              { id: 'markers_verbs', label: '4. دلالات الزمن وأفعال الطقس' },
              { id: 'practice', label: '5. تمارين امتحانية تفاعلية' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFutureTab(tab.id as any)}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activeFutureTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: AFFIRMATIVE */}
          {activeFutureTab === 'affirmative' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  1. حالة الإثبات (Affirmative Sentences)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200" dir="ltr">
                  will + Base Verb
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
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-blue-200">
                    will / &apos;ll <span className="font-arabic text-[11px] font-normal">(سوف / سـ)</span>
                  </span>
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    Base Verb <span className="font-arabic text-[11px] font-normal">(فعل مجرد)</span>
                  </span>
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    Complement <span className="font-arabic text-[11px] text-slate-500 font-normal">(التكملة)</span>
                  </span>
                </div>
              </div>

              {/* Two Critical Rule Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                    <span className="font-bold text-xs sm:text-sm text-blue-900 font-arabic flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>1. حذف إضافات الفعل دائماً بعد will</span>
                    </span>
                    <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                      Infinitive
                    </span>
                  </div>
                  <p className="text-xs text-blue-850 font-arabic leading-relaxed">
                    لا نضيف s أو ed أو ing للفعل بعد will أبداً، حتى لو كان الفاعل He أو She أو It:
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200/80 font-mono text-xs text-slate-900 space-y-1" dir="ltr">
                    <div className="flex items-center justify-between">
                      <span>rains ➔ <strong className="text-blue-700">will rain</strong></span>
                      <span className="font-arabic text-[10px] text-slate-500">حذف s الشخص الثالث</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>raining ➔ <strong className="text-blue-700">will rain</strong></span>
                      <span className="font-arabic text-[10px] text-slate-500">حذف ing المستمر</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                    <span className="font-bold text-xs sm:text-sm text-emerald-900 font-arabic flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                      <span>2. أفعال الكينونة تتحول إلى be</span>
                    </span>
                    <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                      will be
                    </span>
                  </div>
                  <p className="text-xs text-emerald-850 font-arabic leading-relaxed">
                    المصدر المجرد من أفعال الكينونة (is / are / am / was / were) هو كلمة <strong>be</strong>:
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200/80 font-mono text-xs text-slate-900 flex items-center justify-between" dir="ltr">
                    <span>The weather <strong className="text-emerald-700">will be</strong> cold.</span>
                    <button
                      type="button"
                      onClick={() => onSpeak('The weather will be cold tomorrow.')}
                      className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50"
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
                  <span>طريقة اختصار will مع الضمائر:</span>
                </span>
                <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
                  {[
                    { f: 'I will', s: "I'll" },
                    { f: 'He will', s: "He'll" },
                    { f: 'She will', s: "She'll" },
                    { f: 'It will', s: "It'll" },
                    { f: 'We will', s: "We'll" },
                    { f: 'They will', s: "They'll" },
                  ].map((item, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 font-mono font-bold text-slate-800 text-[11px]">
                      {item.f} ➔ <strong className="text-blue-700">{item.s}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة توضيحية من كتاب الطالب الأول متوسط:
                </span>
                {(currentTopic.affirmative?.examples || []).map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(ex.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="استمع للنطق"
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
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200" dir="ltr">
                      {ex.highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Exam Applications */}
              {currentTopic.affirmative?.examApplications && (
                <div className="pt-2 border-t border-zinc-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    نماذج أسئلة الامتحانات الشهرية على الإثبات:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentTopic.affirmative.examApplications.map((app) => (
                      <div key={app.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-right">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                            {app.instructionAr}
                          </span>
                        </div>
                        <p className="font-mono text-xs font-bold text-slate-900 text-left" dir="ltr">
                          {app.problemEn}
                        </p>
                        <p className="font-mono text-xs font-bold text-emerald-700 text-left bg-white p-2 rounded-xl border border-emerald-200" dir="ltr">
                          ➔ {app.solutionEn}
                        </p>
                        <p className="text-[11px] text-slate-600 font-arabic">
                          {app.noteAr}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NEGATIVE */}
          {activeFutureTab === 'negative' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  2. حالة النفي (Negative Sentences)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-rose-50 text-rose-800 rounded-xl border border-rose-200" dir="ltr">
                  won&apos;t + Base Verb
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
                    won&apos;t <span className="font-arabic text-[11px] font-normal">(will not = لن)</span>
                  </span>
                  <span className="text-rose-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    Base Verb <span className="font-arabic text-[11px] font-normal">(فعل مجرد)</span>
                  </span>
                  <span className="text-rose-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    Complement
                  </span>
                </div>
              </div>

              {/* Critical Warning Card for won't */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <h5 className="font-bold text-xs sm:text-sm text-rose-950 font-arabic">
                    سؤال الإملاء الوزاري والشهري الثابت: طريقة كتابة won&apos;t
                  </h5>
                </div>
                <p className="text-xs text-rose-850 font-arabic leading-relaxed">
                  احذر الوقوع في الخطأ الشائع! نفي (will not) لا يُكتب أبداً willn&apos;t، بل يتحول بالكامل إلى <strong>won&apos;t</strong> مع فاصلة عليا بين حرفي n و t:
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1" dir="ltr">
                  <div className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 font-mono text-xs font-bold text-slate-900 shadow-2xs">
                    will not ➔ <strong className="text-rose-700 text-sm">won&apos;t</strong> <span className="text-emerald-600 ml-1">✓ صحيح</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 font-mono text-xs font-bold text-slate-400 opacity-75">
                    will not ➔ <span className="line-through text-rose-500">willn&apos;t</span> <span className="text-rose-600 ml-1">✗ خطأ</span>
                  </div>
                </div>
              </div>

              {/* Negative Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة توضيحية على النفي:
                </span>
                {(currentTopic.negative?.examples || []).map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(ex.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="استمع للنطق"
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
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200" dir="ltr">
                      {ex.highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Exam Applications */}
              {currentTopic.negative?.examApplications && (
                <div className="pt-2 border-t border-zinc-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    نماذج امتحانية على تحويل الجملة إلى نفي:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentTopic.negative.examApplications.map((app) => (
                      <div key={app.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                          {app.instructionAr}
                        </span>
                        <p className="font-mono text-xs font-bold text-slate-900 text-left" dir="ltr">
                          {app.problemEn}
                        </p>
                        <p className="font-mono text-xs font-bold text-rose-700 text-left bg-white p-2 rounded-xl border border-rose-200" dir="ltr">
                          ➔ {app.solutionEn}
                        </p>
                        <p className="text-[11px] text-slate-600 font-arabic">
                          {app.noteAr}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: QUESTION */}
          {activeFutureTab === 'question' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  3. صيغة الاستفهام والأسئلة (Questions)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200" dir="ltr">
                  Will + Subject + Base Verb?
                </span>
              </div>

              {/* Colorful Visual Formula Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 block">
                  شريط كروت السؤال التفاعلية:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-indigo-200">
                    Will <span className="font-arabic text-[11px] font-normal">(هل سوف)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject <span className="font-arabic text-[11px] text-slate-500 font-normal">(الفاعل)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    Base Verb <span className="font-arabic text-[11px] font-normal">(فعل مجرد)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-amber-500 text-white font-mono font-black text-xs sm:text-sm shadow-xs">
                    ?
                  </span>
                </div>
              </div>

              {/* Short Answers Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center gap-1.5 border-b border-emerald-100 pb-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-xs sm:text-sm text-emerald-900 font-arabic">
                      الإجابة القصيرة بالإثبات (Yes)
                    </span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs text-slate-900" dir="ltr">
                    <div className="p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                      <span>Yes, it <strong className="text-emerald-700">will</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للجو والطقس</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
                      <span>Yes, I / they <strong className="text-emerald-700">will</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للأشخاص</span>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-2.5 text-right shadow-2xs">
                  <div className="flex items-center gap-1.5 border-b border-rose-100 pb-2">
                    <X className="w-4 h-4 text-rose-700" />
                    <span className="font-bold text-xs sm:text-sm text-rose-900 font-arabic">
                      الإجابة القصيرة بالنفي (No)
                    </span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs text-slate-900" dir="ltr">
                    <div className="p-2 bg-white rounded-xl border border-rose-200 flex items-center justify-between">
                      <span>No, it <strong className="text-rose-700">won&apos;t</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للجو والطقس</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-rose-200 flex items-center justify-between">
                      <span>No, they / I <strong className="text-rose-700">won&apos;t</strong>.</span>
                      <span className="font-arabic text-[10px] text-slate-500">للأشخاص</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة أسئلة من كتاب الطالب:
                </span>
                {(currentTopic.question?.examples || []).map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(ex.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="استمع للنطق"
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
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200" dir="ltr">
                      {ex.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MARKERS & VERBS */}
          {activeFutureTab === 'markers_verbs' && (
            <div className="space-y-5">
              {/* Signal Words Cards */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      ظروف ودلالات الزمن الدالة على المستقبل (Time Markers)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      عند رؤية أي من هذه الكلمات في الجملة، يكون الاختيار المؤكد هو زمن المستقبل (will + مجرد):
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(currentTopic.overview?.timeMarkers || []).map((marker, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200/80 space-y-2 shadow-2xs hover:bg-white transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-sm text-blue-900" dir="ltr">
                          {marker.marker}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSpeak(`${marker.marker}, ${marker.exampleEn}`)}
                          className="p-1 rounded text-blue-600 hover:bg-blue-100"
                          title="استمع"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-slate-700 font-bold font-arabic block">
                        {marker.ar}
                      </span>
                      <p className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded-xl border border-blue-100" dir="ltr">
                        {marker.exampleEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Textbook Verbs: Responsive Dual View */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      أفعال الطقس والأنشطة المنهجية في الوحدة الثانية
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      الأفعال الرئيسية المستخدمة في نصوص وتمارين كتاب النشاط:
                    </p>
                  </div>
                </div>

                {/* Mobile Cards (visible on phones) */}
                <div className="block sm:hidden space-y-2.5">
                  {(currentTopic.overview?.textbookVerbs || []).map((verb, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onSpeak(`${verb.base}, ${verb.past}`)}
                            className="p-1 rounded-lg bg-white border border-zinc-200 text-blue-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-black text-sm text-slate-900" dir="ltr">
                            {verb.base}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200" dir="ltr">
                          {verb.past}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>{verb.ar}</span>
                      </div>
                      {verb.note && (
                        <p className="text-[11px] font-mono text-slate-700 bg-white p-2 rounded-xl border border-zinc-200" dir="ltr">
                          {verb.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop Table (hidden on phones) */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-zinc-100/80 text-slate-700 font-bold border-b border-zinc-200">
                        <th className="py-2.5 px-3">استماع</th>
                        <th className="py-2.5 px-3">الفعل المجرد (Base)</th>
                        <th className="py-2.5 px-3">مع will بالمستقبل</th>
                        <th className="py-2.5 px-3">المعنى العربي</th>
                        <th className="py-2.5 px-3">مثال منهجي</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/70 font-mono">
                      {(currentTopic.overview?.textbookVerbs || []).map((verb, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                          <td className="py-2.5 px-3">
                            <button
                              type="button"
                              onClick={() => onSpeak(`${verb.base}, ${verb.past}`)}
                              className="p-1 rounded text-blue-600 hover:bg-blue-50"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900" dir="ltr">
                            {verb.base}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-blue-700" dir="ltr">
                            {verb.past}
                          </td>
                          <td className="py-2.5 px-3 font-arabic font-bold text-slate-700" dir="rtl">
                            {verb.ar}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 text-[11px]" dir="ltr">
                            {verb.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRACTICE */}
          {activeFutureTab === 'practice' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    اختبار تفاعلي على زمن المستقبل البسيط مع will
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    اختر الإجابة الصحيحة واكتشف الحل مع التعليل الفوري:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentTopic.examPractice.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect =
                    isAnswered &&
                    q.options &&
                    q.options[selectedOpt] === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          السؤال {qIdx + 1}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {q.questionAr && (
                            <button
                              type="button"
                              onClick={() => toggleTranslation(q.id)}
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                                visibleTranslations[q.id]
                                  ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs'
                                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                              }`}
                              title="ترجمة السؤال"
                            >
                              <Languages className="w-3 h-3 text-blue-600" />
                              <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onSpeak(q.questionEn)}
                            className="p-1 text-slate-400 hover:text-blue-600"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 text-left" dir="ltr">
                        {q.questionEn}
                      </p>
                      {q.questionAr && visibleTranslations[q.id] && (
                        <p className="text-xs text-slate-600 font-arabic p-2 bg-white rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150" dir="rtl">
                          {q.questionAr}
                        </p>
                      )}

                      {/* Options */}
                      {q.options && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isOptionSelected = selectedOpt === optIdx;
                            const isOptionCorrect = opt === q.correctAnswer;

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
                      )}

                      {isAnswered && (
                        <div className={`p-3 rounded-xl border text-xs font-arabic ${
                          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}>
                          <strong>{isCorrect ? 'إجابة صحيحة ممتاز! ' : `الحل الصحيح: ${q.correctAnswer} — `}</strong>
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
      )}

      {/* ========================================================================= */}
      {/* TOPIC 2: COMPARATIVES & SUPERLATIVES */}
      {/* ========================================================================= */}
      {currentTopic.id === 'u2-topic-comparatives' && (
        <div className="space-y-5">
          {/* Concept Banner: Comparative vs Superlative */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-l from-emerald-50/90 via-white to-blue-50/70 border border-emerald-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  الفارق الذهبي بين المقارنة (Comparative) والتفضيل (Superlative)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  المقارنة بين اثنين فقط بوجود كلمة (than)، أما التفضيل فتمييز واحد على الكل بوجود (the):
                </p>
              </div>
            </div>

            {/* Visual Contrast Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                    1. المقارنة (بين شيئين)
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    ⚖️ الصيف أشد حرارة من الربيع
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200" dir="ltr">
                  hotter than
                </span>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    2. التفضيل (واحد على الكل)
                  </span>
                  <p className="text-xs font-bold text-emerald-950">
                    👑 تموز هو أشد أشهر السنة حرارة
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white border border-emerald-200 px-2.5 py-1 rounded-xl shadow-2xs" dir="ltr">
                  the hottest
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: Rules, Comparative, Superlative, Table, Practice */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
            {[
              { id: 'rules', label: '1. قواعد الإملاء وإضافة er / est' },
              { id: 'comparative', label: '2. صيغة المقارنة (Comparative: than)' },
              { id: 'superlative', label: '3. صيغة التفضيل (Superlative: the)' },
              { id: 'table', label: '4. جدول صفات المنهج والشواذ' },
              { id: 'practice', label: '5. تمارين امتحانية تفاعلية' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCompTab(tab.id as any)}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activeCompTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: RULES */}
          {activeCompTab === 'rules' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    قواعد الإملاء الستة لإضافة المقارنة والتفضيل
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    تعتمد الإضافة على مقاطع الصفة ونهايتها الحرفية في الامتحان:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(currentTopic.overview?.spellingRules || []).map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-zinc-200/90 bg-zinc-50/70 hover:bg-white hover:border-emerald-300 transition-all space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {rule.titleAr}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                        قاعدة {idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-arabic">
                      {rule.descAr}
                    </p>
                    <div className="space-y-1.5 pt-1">
                      {rule.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-white border border-zinc-200/60 shadow-2xs"
                        >
                          <div className="flex items-center gap-2 font-mono">
                            <button
                              type="button"
                              onClick={() => onSpeak(`${ex.base}, ${ex.changed}`)}
                              className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="استمع"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-slate-900" dir="ltr">
                              {ex.base}
                            </span>
                            <span className="text-slate-400">➔</span>
                            <span className="font-bold text-emerald-700" dir="ltr">
                              {ex.changed}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-arabic">
                            {ex.ar}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: COMPARATIVE */}
          {activeCompTab === 'comparative' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  2. صيغة المقارنة بين اثنين (Comparative with &apos;than&apos;)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200" dir="ltr">
                  er / more ... than
                </span>
              </div>

              {/* Formula chips for short and long adjectives */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-600 block">
                  شريط كروت قاعدة المقارنة:
                </span>
                {/* Short Adj Formula */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject 1
                  </span>
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    is / are
                  </span>
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-blue-200">
                    adjective-er <span className="font-arabic text-[11px] font-normal">(صفة قصيرة)</span>
                  </span>
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    than <span className="font-arabic text-[11px] font-normal">(مِن)</span>
                  </span>
                  <span className="text-blue-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject 2
                  </span>
                </div>

                {/* Long Adj Formula */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject 1
                  </span>
                  <span className="text-purple-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    is / are
                  </span>
                  <span className="text-purple-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-purple-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-purple-200">
                    more + adjective <span className="font-arabic text-[11px] font-normal">(صفة طويلة)</span>
                  </span>
                  <span className="text-purple-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-emerald-200">
                    than <span className="font-arabic text-[11px] font-normal">(مِن)</span>
                  </span>
                  <span className="text-purple-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject 2
                  </span>
                </div>
              </div>

              {/* Comparative Rule Notice */}
              <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200 flex items-center gap-2 text-xs font-arabic text-blue-950 shadow-2xs">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>القاعدة الذهبية في الامتحان:</strong> كلمة <strong>than</strong> (بمعنى: مِن) هي الدلالة القطعية على اختيار أو كتابة صيغة المقارنة (-er أو more).
                </span>
              </div>

              {/* Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة منهجية من كتاب الأول متوسط:
                </span>
                {(currentTopic.affirmative?.examples || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(item.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                          {item.en}
                        </p>
                        <p className="text-xs text-slate-500 font-arabic mt-0.5">
                          {item.ar}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200" dir="ltr">
                      {item.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SUPERLATIVE */}
          {activeCompTab === 'superlative' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  3. صيغة التفضيل المطلق (Superlative with &apos;the&apos;)
                </h4>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200" dir="ltr">
                  the + est / most
                </span>
              </div>

              {/* Formula chips for superlative */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-600 block">
                  شريط كروت قاعدة التفضيل:
                </span>
                {/* Short Superlative */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    is / are
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-indigo-200">
                    the <span className="font-arabic text-[11px] font-normal">(أداة التعريف)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-purple-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-purple-200">
                    adjective-est <span className="font-arabic text-[11px] font-normal">(صفة قصيرة)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    Complement
                  </span>
                </div>

                {/* Long Superlative */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs" dir="ltr">
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                    Subject
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    is / are
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-xs ring-2 ring-indigo-200">
                    the most + adjective <span className="font-arabic text-[11px] font-normal">(صفة طويلة)</span>
                  </span>
                  <span className="text-indigo-600 font-black text-base">+</span>
                  <span className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-mono font-medium text-xs sm:text-sm shadow-2xs">
                    Complement
                  </span>
                </div>
              </div>

              {/* Superlative Warning Card */}
              <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200 flex items-center gap-2 text-xs font-arabic text-indigo-950 shadow-2xs">
                <AlertTriangle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>تنبيه امتحاني:</strong> إذا رأيت كلمة <strong>the</strong> قبل الفراغ، فاختر دائماً الصفة التي تنتهي بـ <strong>-est</strong> أو مسبوقة بـ <strong>most</strong>!
                </span>
              </div>

              {/* Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة التفضيل من كتاب الأول متوسط:
                </span>
                {(currentTopic.negative?.examples || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(item.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                          {item.en}
                        </p>
                        <p className="text-xs text-slate-500 font-arabic mt-0.5">
                          {item.ar}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200" dir="ltr">
                      {item.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ADJECTIVES TABLE */}
          {activeCompTab === 'table' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    جدول جميع صفات الوحدة الثانية المنهجية (العادية والشواذ)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    جميع صفات الطقس والرياضات وأسئلة الإملاء الوزارية:
                  </p>
                </div>
              </div>

              {/* Mobile Cards (phones) */}
              <div className="block sm:hidden space-y-2.5">
                {textbookAdjectives.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSpeak(`${item.base}, ${item.comp}, ${item.sup}`)}
                          className="p-1 rounded-lg bg-white border border-zinc-200 text-emerald-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-black text-sm text-slate-900" dir="ltr">
                          {item.base}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 font-arabic">
                        {item.ar}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900" dir="ltr">
                        <span className="text-[10px] text-blue-600 block font-arabic">المقارنة:</span>
                        <strong>{item.comp}</strong>
                      </div>
                      <div className="p-2 bg-indigo-50/70 border border-indigo-200 rounded-xl text-indigo-900" dir="ltr">
                        <span className="text-[10px] text-indigo-600 block font-arabic">التفضيل:</span>
                        <strong>{item.sup}</strong>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-arabic block">
                      القاعدة: {item.rule}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop Table (computers / tablets) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="bg-zinc-100/80 text-slate-700 font-bold border-b border-zinc-200">
                      <th className="py-2.5 px-3">نطق</th>
                      <th className="py-2.5 px-3">الصفة الأصلية</th>
                      <th className="py-2.5 px-3">المقارنة (Comparative)</th>
                      <th className="py-2.5 px-3">التفضيل (Superlative)</th>
                      <th className="py-2.5 px-3">المعنى العربي</th>
                      <th className="py-2.5 px-3">نوع القاعدة الإملائية</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/70 font-mono">
                    {textbookAdjectives.map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                        <td className="py-2.5 px-3">
                          <button
                            type="button"
                            onClick={() => onSpeak(`${item.base}, ${item.comp}, ${item.sup}`)}
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900" dir="ltr">
                          {item.base}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-blue-700" dir="ltr">
                          {item.comp}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-indigo-700" dir="ltr">
                          {item.sup}
                        </td>
                        <td className="py-2.5 px-3 font-arabic font-bold text-slate-700" dir="rtl">
                          {item.ar}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px] font-arabic" dir="rtl">
                          {item.rule}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PRACTICE */}
          {activeCompTab === 'practice' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    اختبار تفاعلي على المقارنة والتفضيل
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    اختر الإجابة الصحيحة واكتشف الحل مع التعليل الفوري:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentTopic.examPractice.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect =
                    isAnswered &&
                    q.options &&
                    q.options[selectedOpt] === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          السؤال {qIdx + 1}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {q.questionAr && (
                            <button
                              type="button"
                              onClick={() => toggleTranslation(q.id)}
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                                visibleTranslations[q.id]
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs'
                                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                              }`}
                              title="ترجمة السؤال"
                            >
                              <Languages className="w-3 h-3 text-emerald-600" />
                              <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onSpeak(q.questionEn)}
                            className="p-1 text-slate-400 hover:text-emerald-600"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 text-left" dir="ltr">
                        {q.questionEn}
                      </p>
                      {q.questionAr && visibleTranslations[q.id] && (
                        <p className="text-xs text-slate-600 font-arabic p-2 bg-white rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150" dir="rtl">
                          {q.questionAr}
                        </p>
                      )}

                      {/* Options */}
                      {q.options && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isOptionSelected = selectedOpt === optIdx;
                            const isOptionCorrect = opt === q.correctAnswer;

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
                      )}

                      {isAnswered && (
                        <div className={`p-3 rounded-xl border text-xs font-arabic ${
                          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}>
                          <strong>{isCorrect ? 'إجابة صحيحة ممتاز! ' : `الحل الصحيح: ${q.correctAnswer} — `}</strong>
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
      )}

      {/* ========================================================================= */}
      {/* TOPIC 3: ORDINAL NUMBERS & DATES */}
      {/* ========================================================================= */}
      {currentTopic.id === 'u2-topic-dates-ordinals' && (
        <div className="space-y-5">
          {/* Concept Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-l from-purple-50/90 via-white to-indigo-50/70 border border-purple-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-2xs">
                <Calendar className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  الفكرة الجوهرية للأعداد الترتيبية وقراءة التواريخ (Ordinal Numbers & Dates)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تُستخدم لترتيب الأيام والمراكز، وتختلف كتابة التاريخ المختصرة عن قراءته الصوتية:
                </p>
              </div>
            </div>

            {/* Visual Contrast Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-purple-100 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                    كتابة التاريخ (Writing)
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    📝 نكتب التاريخ مختصراً بالأرقام
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-200" dir="ltr">
                  1st July
                </span>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    قراءة التاريخ شفهياً (Saying)
                  </span>
                  <p className="text-xs font-bold text-emerald-950">
                    🗣️ نلفظ كلمتي the و of بالصوت
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white border border-emerald-200 px-2.5 py-1 rounded-xl shadow-2xs" dir="ltr">
                  &quot;the first of July&quot;
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: Ordinals, Dates, Prepositions, Practice */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
            {[
              { id: 'ordinals', label: '1. جدول الأعداد الترتيبية (1st - 31st)' },
              { id: 'dates', label: '2. قراءة وكتابة التواريخ (Writing vs Saying)' },
              { id: 'prepositions', label: '3. حروف الجر الزمنية الذهبية (in / on)' },
              { id: 'practice', label: '4. تمارين امتحانية تفاعلية' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDatesTab(tab.id as any)}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activeDatesTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ORDINALS */}
          {activeDatesTab === 'ordinals' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    جدول الأعداد الترتيبية من 1 إلى 31 (أيام الشهر المنهجية)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    الأرقام الثلاثة الأولى شاذة، والبقية تأخذ th مع بعض التغييرات الإملائية المهمة:
                  </p>
                </div>
              </div>

              {/* Top 3 Irregulars Featured Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 shadow-2xs">
                <span className="text-xs font-bold text-amber-950 block">
                  الأعداد الترتيبية الثلاثة الأولى الشاذة (حفظ امتحاني غيباً):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" dir="ltr">
                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="font-mono text-sm font-black text-amber-800">1st</span>
                      <span className="font-mono font-bold text-xs text-slate-900 block">first</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-700 font-arabic">الأول</span>
                      <button
                        type="button"
                        onClick={() => onSpeak('first')}
                        className="p-1 rounded text-amber-700 hover:bg-amber-50 block mt-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="font-mono text-sm font-black text-amber-800">2nd</span>
                      <span className="font-mono font-bold text-xs text-slate-900 block">second</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-700 font-arabic">الثاني</span>
                      <button
                        type="button"
                        onClick={() => onSpeak('second')}
                        className="p-1 rounded text-amber-700 hover:bg-amber-50 block mt-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="font-mono text-sm font-black text-amber-800">3rd</span>
                      <span className="font-mono font-bold text-xs text-slate-900 block">third</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-700 font-arabic">الثالث</span>
                      <button
                        type="button"
                        onClick={() => onSpeak('third')}
                        className="p-1 rounded text-amber-700 hover:bg-amber-50 block mt-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid of All Ordinals 1st - 31st */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {fullOrdinals.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all flex flex-col justify-between shadow-2xs ${
                      item.special === 'irregular'
                        ? 'bg-purple-50/60 border-purple-300 hover:bg-white'
                        : item.special === 'spelling'
                        ? 'bg-amber-50/40 border-amber-300 hover:bg-white'
                        : 'bg-zinc-50 border-zinc-200/90 hover:bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs sm:text-sm font-black text-purple-700 bg-white px-2 py-0.5 rounded-lg border border-purple-200 shadow-2xs">
                        {item.num}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSpeak(item.word)}
                        className="p-1 text-slate-400 hover:text-purple-600 cursor-pointer"
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="font-mono text-xs font-bold text-slate-900 block text-left" dir="ltr">
                        {item.word}
                      </span>
                      <span className="text-[11px] text-slate-500 font-arabic block mt-0.5">
                        {item.ar}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WRITING VS SAYING DATES */}
          {activeDatesTab === 'dates' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    الفرق بين كتابة التاريخ ولفظه شفهياً (Writing vs Saying Dates)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    في كتابة التاريخ نكتب رقماً مختصراً، ولكن عند القراءة بصوت مسموع يجب لفظ كلمتي (the) و (of):
                  </p>
                </div>
              </div>

              {/* Two Methods Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-emerald-200/70 pb-2">
                    <span className="text-xs font-bold text-emerald-950 font-arabic">
                      1. الطريقة الشائعة (اليوم أولاً ثم الشهر):
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 font-arabic">
                      الأكثر استخداماً
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5 text-right">
                    <p className="text-[11px] font-bold text-slate-500 font-arabic">نكتب بالأرقام (Writing):</p>
                    <p className="font-mono font-black text-sm text-slate-900 text-left" dir="ltr">
                      1st July &nbsp;أو&nbsp; 1 July
                    </p>
                    <p className="text-[11px] font-bold text-slate-500 font-arabic pt-1">نلفظ شفهياً بصوت مرتفع (Saying):</p>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="font-mono font-black text-xs sm:text-sm text-emerald-800" dir="ltr">
                        &quot;the first of July&quot;
                      </span>
                      <button
                        type="button"
                        onClick={() => onSpeak('the first of July')}
                        className="p-1 rounded text-emerald-700 hover:bg-emerald-100"
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-purple-200/70 pb-2">
                    <span className="text-xs font-bold text-purple-950 font-arabic">
                      2. الطريقة الثانية (الشهر أولاً ثم اليوم):
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 font-arabic">
                      صحيحة أيضاً
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-1.5 text-right">
                    <p className="text-[11px] font-bold text-slate-500 font-arabic">نكتب بالأرقام (Writing):</p>
                    <p className="font-mono font-black text-sm text-slate-900 text-left" dir="ltr">
                      July 1st &nbsp;أو&nbsp; July 1
                    </p>
                    <p className="text-[11px] font-bold text-slate-500 font-arabic pt-1">نلفظ شفهياً بصوت مرتفع (Saying):</p>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 border border-purple-200">
                      <span className="font-mono font-black text-xs sm:text-sm text-purple-800" dir="ltr">
                        &quot;July the first&quot;
                      </span>
                      <button
                        type="button"
                        onClick={() => onSpeak('July the first')}
                        className="p-1 rounded text-purple-700 hover:bg-purple-100"
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Textbook Examples of Dates */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة تواريخ شهيرة من كتاب الأول متوسط:
                </span>
                {[
                  { w: '4th July', s: 'the fourth of July', ar: 'الرابع من تموز' },
                  { w: '21st March', s: 'the twenty-first of March', ar: 'عيد الربيع / الحادي والعشرون من آذار' },
                  { w: '2nd May', s: 'the second of May', ar: 'الثاني من أيار' },
                  { w: '6th January', s: 'the sixth of January', ar: 'يوم الجيش العراقي / السادس من كانون الثاني' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(item.s)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                          Writing: <span className="text-purple-700">{item.w}</span> ➔ Saying: &quot;<span className="text-emerald-700">{item.s}</span>&quot;
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

          {/* TAB 3: PREPOSITIONS IN / ON */}
          {activeDatesTab === 'prepositions' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    قواعد حروف الجر الزمنية الذهبية (Prepositions: IN vs ON vs AT)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    سؤال وزاري وشهري ثابت في الاختيارات بين (in) و (on) و (at):
                  </p>
                </div>
              </div>

              {/* 3 Dedicated Colored Preposition Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* ON Card */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5 shadow-2xs text-right">
                  <div className="flex items-center justify-between border-b border-emerald-200/70 pb-2">
                    <span className="font-mono text-base font-black text-emerald-900" dir="ltr">
                      ON
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-md font-arabic">
                      أيام وتواريخ محددة
                    </span>
                  </div>
                  <p className="text-xs text-emerald-850 font-arabic leading-relaxed">
                    نستخدم <strong>on</strong> مع أيام الأسبوع ومع أي تاريخ محدد برقم اليوم:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 font-mono text-xs font-bold text-slate-900 space-y-1" dir="ltr">
                    <div>• on Monday / on Friday</div>
                    <div>• on 6th January</div>
                    <div>• on the 1st of July</div>
                  </div>
                </div>

                {/* IN Card */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2.5 shadow-2xs text-right">
                  <div className="flex items-center justify-between border-b border-blue-200/70 pb-2">
                    <span className="font-mono text-base font-black text-blue-900" dir="ltr">
                      IN
                    </span>
                    <span className="text-[10px] font-bold bg-blue-200 text-blue-950 px-2 py-0.5 rounded-md font-arabic">
                      فترات زمنية طويلة
                    </span>
                  </div>
                  <p className="text-xs text-blue-850 font-arabic leading-relaxed">
                    نستخدم <strong>in</strong> مع اسم الشهر بمفرده، أو الفصول الأربعة، أو السنوات:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-blue-200 font-mono text-xs font-bold text-slate-900 space-y-1" dir="ltr">
                    <div>• in October / in July</div>
                    <div>• in winter / in summer</div>
                    <div>• in 2026</div>
                  </div>
                </div>

                {/* AT Card */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2.5 shadow-2xs text-right">
                  <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
                    <span className="font-mono text-base font-black text-amber-900" dir="ltr">
                      AT
                    </span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-md font-arabic">
                      تعبير منهجي ثابت
                    </span>
                  </div>
                  <p className="text-xs text-amber-850 font-arabic leading-relaxed">
                    نستخدم <strong>at</strong> مع الأعياد ونهاية الأشهر والأوقات:
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-mono text-xs font-bold text-slate-900 space-y-1" dir="ltr">
                    <div>• at the end of Ramadan</div>
                    <div>• at Eid al-Fitr</div>
                    <div>• at 4 o&apos;clock</div>
                  </div>
                </div>
              </div>

              {/* Preposition Examples */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-slate-700 block">
                  أمثلة وزارية هامة على حروف الجر (تمرين ص 38 في كتاب النشاط):
                </span>
                {[
                  { en: 'My birthday is in November.', ar: 'عيد ميلادي في تشرين الثاني (شهر فقط ➔ in)', prep: 'in' },
                  { en: 'My birthday is on 15th November.', ar: 'عيد ميلادي في 15 تشرين الثاني (تاريخ محدد ➔ on)', prep: 'on' },
                  { en: 'It usually snows in winter.', ar: 'عادة ما تتساقط الثلوج في فصل الشتاء (فصل ➔ in)', prep: 'in' },
                  { en: 'Iraqi Armed Forces Day is on 6th January.', ar: 'يوم الجيش العراقي في 6 كانون الثاني (تاريخ محدد ➔ on)', prep: 'on' },
                  { en: 'Eid al-Fitr takes place at the end of Ramadan.', ar: 'عيد الفطر يأتي في نهاية شهر رمضان (تعبير منهجي ➔ at)', prep: 'at' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSpeak(item.en)}
                        className="p-1.5 rounded-xl bg-white border border-zinc-200 text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                          {item.en}
                        </p>
                        <p className="text-xs text-slate-500 font-arabic mt-0.5">
                          {item.ar}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200" dir="ltr">
                      {item.prep}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRACTICE */}
          {activeDatesTab === 'practice' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    اختبار تفاعلي على الأعداد الترتيبية وحروف الجر
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    اختر الإجابة الصحيحة واكتشف الحل مع التعليل الفوري:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentTopic.examPractice.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect =
                    isAnswered &&
                    q.options &&
                    q.options[selectedOpt] === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          السؤال {qIdx + 1}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {q.questionAr && (
                            <button
                              type="button"
                              onClick={() => toggleTranslation(q.id)}
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                                visibleTranslations[q.id]
                                  ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-2xs'
                                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                              }`}
                              title="ترجمة السؤال"
                            >
                              <Languages className="w-3 h-3 text-purple-600" />
                              <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onSpeak(q.questionEn)}
                            className="p-1 text-slate-400 hover:text-purple-600"
                            title="استمع للسؤال"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 text-left" dir="ltr">
                        {q.questionEn}
                      </p>
                      {q.questionAr && visibleTranslations[q.id] && (
                        <p className="text-xs text-slate-600 font-arabic p-2 bg-white rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150" dir="rtl">
                          {q.questionAr}
                        </p>
                      )}

                      {/* Options */}
                      {q.options && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isOptionSelected = selectedOpt === optIdx;
                            const isOptionCorrect = opt === q.correctAnswer;

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
                      )}

                      {isAnswered && (
                        <div className={`p-3 rounded-xl border text-xs font-arabic ${
                          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}>
                          <strong>{isCorrect ? 'إجابة صحيحة ممتاز! ' : `الحل الصحيح: ${q.correctAnswer} — `}</strong>
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
      )}
    </div>
  );
};
export default Unit2GrammarView;
