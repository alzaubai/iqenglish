import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Search
} from 'lucide-react';
import { SpeechEngine } from '../../utils/speech';

export const IraqiTeacherGrammarLesson1: React.FC = () => {
  // 3 Mode Tabs: 'affirmative' (الإثبات), 'negative' (النفي), 'question' (السؤال)
  const [activeMode, setActiveMode] = useState<'affirmative' | 'negative' | 'question'>('affirmative');
  const [playingText, setPlayingText] = useState<string | null>(null);
  const [verbSearch, setVerbSearch] = useState<string>('');
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');

  // Independent Quiz State for each mode
  const [affirmativeQuizAnswers, setAffirmativeQuizAnswers] = useState<Record<string, number>>({});
  const [negativeQuizAnswers, setNegativeQuizAnswers] = useState<Record<string, number>>({});
  const [questionQuizAnswers, setQuestionQuizAnswers] = useState<Record<string, number>>({});

  const handleSpeak = (text: string) => {
    setPlayingText(text);
    SpeechEngine.speakText(text, {
      rate: 0.85,
      onEnd: () => setPlayingText(null),
      onError: () => setPlayingText(null),
    });
  };

  // Official Verbs from Student's Book page 97
  const regularVerbs = [
    { base: 'listen', past: 'listened', ar: 'يستمع / استمع' },
    { base: 'stay', past: 'stayed', ar: 'يبقى / بقي' },
    { base: 'walk', past: 'walked', ar: 'يمشي / مشى' },
    { base: 'jump', past: 'jumped', ar: 'يقفز / قفز' },
    { base: 'paint', past: 'painted', ar: 'يلون أو يدهن / لوّن' },
    { base: 'stop', past: 'stopped', ar: 'يتوقف / توقف' },
    { base: 'play', past: 'played', ar: 'يلعب / لعب' },
    { base: 'like', past: 'liked', ar: 'يحب / أحب' },
    { base: 'try', past: 'tried', ar: 'يحاول / حاول' },
    { base: 'watch', past: 'watched', ar: 'يشاهد / شاهد' },
    { base: 'help', past: 'helped', ar: 'يساعد / ساعد' },
    { base: 'cook', past: 'cooked', ar: 'يطبخ / طبخ' },
  ];

  const irregularVerbs = [
    { base: 'see', past: 'saw', ar: 'يرى / رأى' },
    { base: 'make', past: 'made', ar: 'يصنع / صنع' },
    { base: 'go', past: 'went', ar: 'يذهب / ذهب' },
    { base: 'take', past: 'took', ar: 'يأخذ / أخذ' },
    { base: 'am / is', past: 'was', ar: 'كان (للمفرد)' },
    { base: 'are', past: 'were', ar: 'كانوا (للجمع)' },
    { base: 'do / does', past: 'did', ar: 'يفعل / فعل' },
    { base: 'have / has', past: 'had', ar: 'يملك أو تناول / ملك' },
    { base: 'draw', past: 'drew', ar: 'يرسم / رسم' },
    { base: 'run', past: 'ran', ar: 'يركض / ركض' },
    { base: 'swim', past: 'swam', ar: 'يسبح / سبح' },
    { base: 'read', past: 'read (تلفظ red)', ar: 'يقرأ / قرأ' },
    { base: 'put', past: 'put', ar: 'يضع / وضع' },
    { base: 'hit', past: 'hit', ar: 'يضرب / ضرب' },
  ];

  const allVerbs = [
    ...regularVerbs.map((v) => ({ ...v, type: 'regular' as const })),
    ...irregularVerbs.map((v) => ({ ...v, type: 'irregular' as const })),
  ];

  const filteredVerbs = allVerbs.filter((v) => {
    const matchesFilter = verbFilter === 'all' || v.type === verbFilter;
    const matchesSearch =
      v.base.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.past.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.ar.includes(verbSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-7" dir="rtl">
      {/* التبويبات الثلاثة لحالات الزمن */}
      <section className="space-y-3">
        <div className="text-right px-1">
          <span className="text-xs font-bold text-zinc-500 font-arabic">
            اختر الحالة لدراستها بالتفصيل مع الأمثلة:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* تبويب 1: الإثبات */}
          <button
            onClick={() => setActiveMode('affirmative')}
            className={`p-4 sm:p-5 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMode === 'affirmative'
                ? 'bg-blue-50 border-blue-600 shadow-sm ring-2 ring-blue-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                activeMode === 'affirmative' ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-700'
              }`}>
                01
              </span>
              <span className="text-[11px] font-mono text-zinc-500 font-bold" dir="ltr">
                Affirmative
              </span>
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${
                activeMode === 'affirmative' ? 'text-blue-950' : 'text-zinc-900'
              }`}>
                حالة الإثبات
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                الفاعل + فعل ماضٍ (ed أو شاذ)
              </p>
            </div>
          </button>

          {/* تبويب 2: النفي */}
          <button
            onClick={() => setActiveMode('negative')}
            className={`p-4 sm:p-5 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMode === 'negative'
                ? 'bg-rose-50 border-rose-600 shadow-sm ring-2 ring-rose-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                activeMode === 'negative' ? 'bg-rose-600 text-white' : 'bg-zinc-100 text-zinc-700'
              }`}>
                02
              </span>
              <span className="text-[11px] font-mono text-zinc-500 font-bold" dir="ltr">
                Negative
              </span>
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${
                activeMode === 'negative' ? 'text-rose-950' : 'text-zinc-900'
              }`}>
                حالة النفي
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                الفاعل + didn't + فعل مجرد
              </p>
            </div>
          </button>

          {/* تبويب 3: السؤال */}
          <button
            onClick={() => setActiveMode('question')}
            className={`p-4 sm:p-5 rounded-2xl border-2 text-right transition-all cursor-pointer font-arabic flex flex-col justify-between ${
              activeMode === 'question'
                ? 'bg-indigo-50 border-indigo-600 shadow-sm ring-2 ring-indigo-100'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center font-mono ${
                activeMode === 'question' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-700'
              }`}>
                03
              </span>
              <span className="text-[11px] font-mono text-zinc-500 font-bold" dir="ltr">
                Questions
              </span>
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${
                activeMode === 'question' ? 'text-indigo-950' : 'text-zinc-900'
              }`}>
                حالة السؤال
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                السؤال بنعم/لا وأدوات الاستفهام
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* محتوى 1: الإثبات (AFFIRMATIVE)                           */}
      {/* ======================================================== */}
      {activeMode === 'affirmative' && (
        <div className="space-y-6">
          {/* صندوق القاعدة الفاتح والأنيق بدون سواد */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-5 sm:p-6 rounded-2xl shadow-xs text-center space-y-3">
            <span className="text-xs font-bold text-blue-900 font-arabic block">
              القاعدة العامة لحالة الإثبات
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-blue-950" dir="ltr">
              <span className="bg-white border border-blue-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                الفاعل (Subject)
              </span>
              <span className="text-blue-600 text-xl font-bold">+</span>
              <span className="bg-blue-600 text-white px-3.5 py-1.5 rounded-xl font-bold font-arabic shadow-2xs">
                فعل ماضٍ (Past Verb)
              </span>
              <span className="text-blue-600 text-xl font-bold">+</span>
              <span className="bg-white border border-blue-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                التكملة (Complement)
              </span>
            </div>
            <div className="text-xs text-blue-800 font-mono" dir="ltr">
              Subject + Past Verb + Complement
            </div>
            <div className="text-xs text-blue-900 font-arabic pt-2 border-t border-blue-200">
              <strong>ملاحظة:</strong> ينطبق هذا الترتيب على جميع الضمائر المفردة والجمع.
            </div>
          </div>

          {/* الاستخدام والدلائل الزمنية */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-3">
            <h4 className="text-base font-bold text-zinc-900 font-arabic">
              متى نستخدم هذا الزمن؟ وما هي دلائله؟
            </h4>
            <p className="text-sm text-zinc-700 font-arabic leading-relaxed">
              نستخدم الماضي البسيط للتعبير عن حدث تم وانتهى في الماضي، ونستدل عليه بوجود ظروف زمان محددة.
            </p>
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-2 text-xs sm:text-sm text-blue-950 font-arabic">
              <p>• <strong>yesterday:</strong> تعني (أمس / البارحة).</p>
              <p>• <strong>last:</strong> تعني (الماضي: last night الليلة الماضية، last week الأسبوع الماضي، last year العام الماضي).</p>
              <p>• <strong>ago:</strong> تأتي بعد المدة الزمنية وتعني (مضت: two days ago قبل يومين).</p>
              <p>• <strong>in the holidays:</strong> تعني (في العطلة الصيفية) وتدل على حدث تم في الماضي.</p>
            </div>
          </div>

          {/* قواعد إضافة ed مرتبة رأسياً (أولاً، ثانياً، ثالثاً...) */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <div className="border-b border-zinc-100 pb-3">
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic">
                النوع الأول: الأفعال القياسية (قواعد إضافة ed)
              </h4>
              <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                تضاف ed إلى نهاية الفعل القياسي وفق القواعد التالية بالترتيب:
              </p>
            </div>

            <div className="space-y-3.5">
              {/* أولاً */}
              <div className="border border-zinc-200 rounded-2xl p-4 sm:p-5 bg-zinc-50/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-arabic">
                    1
                  </span>
                  <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                    أولاً: القاعدة العامة
                  </h5>
                </div>
                <p className="text-xs text-zinc-600 font-arabic pr-8">
                  نضيف <span className="font-mono font-bold text-zinc-900" dir="ltr">ed</span> لنهاية معظم الأفعال الاعتيادية مباشرة:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans pr-8 pt-1" dir="ltr">
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">listen</span> → <strong className="text-blue-700">listened</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">استمع</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">play</span> → <strong className="text-blue-700">played</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">لعب</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">walk</span> → <strong className="text-blue-700">walked</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">مشى</span>
                  </div>
                </div>
              </div>

              {/* ثانياً */}
              <div className="border border-zinc-200 rounded-2xl p-4 sm:p-5 bg-zinc-50/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-arabic">
                    2
                  </span>
                  <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                    ثانياً: الفعل المنتهي بحرف e
                  </h5>
                </div>
                <p className="text-xs text-zinc-600 font-arabic pr-8">
                  إذا انتهى الفعل بالأصل بالحرف <span className="font-mono font-bold text-zinc-900" dir="ltr">e</span>، نكتفي بإضافة <span className="font-mono font-bold text-zinc-900" dir="ltr">d</span> فقط:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans pr-8 pt-1" dir="ltr">
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">like</span> → <strong className="text-blue-700">liked</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">أحب</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">live</span> → <strong className="text-blue-700">lived</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">عاش</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">dance</span> → <strong className="text-blue-700">danced</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">رقص</span>
                  </div>
                </div>
              </div>

              {/* ثالثاً */}
              <div className="border border-zinc-200 rounded-2xl p-4 sm:p-5 bg-zinc-50/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-arabic">
                    3
                  </span>
                  <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                    ثالثاً: الفعل المنتهي بـ (حرف صحيح + y)
                  </h5>
                </div>
                <p className="text-xs text-zinc-600 font-arabic pr-8">
                  إذا انتهى الفعل بحرف <span className="font-mono font-bold text-zinc-900" dir="ltr">y</span> وقبله حرف صحيح، يُقلب الـ y إلى <span className="font-mono font-bold text-zinc-900" dir="ltr">i</span> ثم نضيف ed:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans pr-8 pt-1" dir="ltr">
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">try</span> → <strong className="text-blue-700">tried</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">حاول</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">study</span> → <strong className="text-blue-700">studied</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">درس</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">cry</span> → <strong className="text-blue-700">cried</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">بكى</span>
                  </div>
                </div>
              </div>

              {/* رابعاً */}
              <div className="border border-zinc-200 rounded-2xl p-4 sm:p-5 bg-zinc-50/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-arabic">
                    4
                  </span>
                  <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                    رابعاً: الفعل المنتهي بـ (حرف علة + y)
                  </h5>
                </div>
                <p className="text-xs text-zinc-600 font-arabic pr-8">
                  إذا كان قبل الـ <span className="font-mono font-bold text-zinc-900" dir="ltr">y</span> أحد حروف العلة (a, e, i, o, u)، يبقى كما هو ونضيف ed مباشرة:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans pr-8 pt-1" dir="ltr">
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">stay</span> → <strong className="text-blue-700">stayed</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">بقي</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">play</span> → <strong className="text-blue-700">played</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">لعب</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">enjoy</span> → <strong className="text-blue-700">enjoyed</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">استمتع</span>
                  </div>
                </div>
              </div>

              {/* خامساً */}
              <div className="border border-zinc-200 rounded-2xl p-4 sm:p-5 bg-zinc-50/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-arabic">
                    5
                  </span>
                  <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                    خامساً: الفعل المنتهي بحرف صحيح مسبوق بحرف علة واحد
                  </h5>
                </div>
                <p className="text-xs text-zinc-600 font-arabic pr-8">
                  نكرر الحرف الأخير الصحيح ثم نضيف ed:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans pr-8 pt-1" dir="ltr">
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">stop</span> → <strong className="text-blue-700">stopped</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">توقف</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">plan</span> → <strong className="text-blue-700">planned</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">خطط</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-zinc-200 bg-white text-right flex flex-col justify-between">
                    <div className="font-mono text-zinc-900" dir="ltr">
                      <span className="text-zinc-500">clap</span> → <strong className="text-blue-700">clapped</strong>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">صفق</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* النوع الثاني: الأفعال الشاذة (أكثر من 5 أمثلة) */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic">
                النوع الثاني: الأفعال الشاذة (Irregular Verbs)
              </h4>
              <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                هذه الأفعال لا تقبل إضافة ed، بل يتغير شكلها ويجب حفظها (أكثر من 10 أمثلة من كتاب الطالب):
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs font-sans" dir="ltr">
              {[
                { base: 'go', past: 'went', ar: 'ذهب' },
                { base: 'see', past: 'saw', ar: 'رأى' },
                { base: 'make', past: 'made', ar: 'صنع' },
                { base: 'take', past: 'took', ar: 'أخذ' },
                { base: 'do', past: 'did', ar: 'فعل' },
                { base: 'have', past: 'had', ar: 'امتلك / تناول' },
                { base: 'swim', past: 'swam', ar: 'سبح' },
                { base: 'read', past: 'read', ar: 'قرأ' },
                { base: 'draw', past: 'drew', ar: 'رسم' },
                { base: 'run', past: 'ran', ar: 'ركض' },
                { base: 'am / is', past: 'was', ar: 'كان' },
                { base: 'are', past: 'were', ar: 'كانوا' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 text-right flex flex-col justify-between">
                  <div className="font-mono text-zinc-900" dir="ltr">
                    <span className="text-zinc-500">{item.base}</span> → <strong className="text-blue-700">{item.past}</strong>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-arabic mt-1" dir="rtl">{item.ar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* أمثلة الإثبات مع الدلائل الزمنية (yesterday, last night, last week, ago...) */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <h4 className="text-base font-bold text-zinc-900 font-arabic flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>أمثلة مثبتة تحتوي على الدلائل الزمنية (Time Expressions):</span>
            </h4>
            <div className="space-y-3">
              {[
                {
                  en: 'I watched a film last night.',
                  ar: 'شاهدتُ فيلماً الليلة الماضية.',
                  clue: 'الدلالة: last night (الليلة الماضية)',
                  past: 'watched',
                },
                {
                  en: 'Faisal went to a village by the river yesterday.',
                  ar: 'فيصل ذهب إلى قرية بالقرب من النهر أمس.',
                  clue: 'الدلالة: yesterday (أمس)',
                  past: 'went',
                },
                {
                  en: 'Muna and I stayed at home in the holidays.',
                  ar: 'منى وأنا بقينا في المنزل في العطلة.',
                  clue: 'الدلالة: in the holidays (في العطلة)',
                  past: 'stayed',
                },
                {
                  en: 'I saw my friends two days ago.',
                  ar: 'رأيتُ أصدقائي قبل يومين.',
                  clue: 'الدلالة: two days ago (قبل يومين)',
                  past: 'saw',
                },
              ].map((ex, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md font-arabic">
                      {ex.clue}
                    </span>
                    <button
                      onClick={() => handleSpeak(ex.en)}
                      className="text-xs text-zinc-700 hover:text-zinc-950 flex items-center gap-1 font-arabic cursor-pointer px-2.5 py-1 rounded-lg bg-white border border-zinc-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>استماع</span>
                    </button>
                  </div>
                  <div className="text-base font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                    {ex.en}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-arabic" dir="rtl">
                    {ex.ar}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أسئلة واختبار الإثبات فقط */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h4 className="text-sm sm:text-base font-bold text-zinc-900 font-arabic flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>اختبر فهمك: أسئلة على حالة الإثبات فقط</span>
              </h4>
              {Object.keys(affirmativeQuizAnswers).length > 0 && (
                <button
                  onClick={() => setAffirmativeQuizAnswers({})}
                  className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-arabic cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'aff-q1',
                  q: 'Faisal ______ to a village by the river last week.',
                  opts: ['go', 'went', 'goes'],
                  correct: 1,
                  exp: 'الجملة مثبتة وفيها دلالة الماضي last week، فنختار الفعل الماضي الشاذ went.',
                },
                {
                  id: 'aff-q2',
                  q: 'They ______ in the house yesterday.',
                  opts: ['stayed', 'stay', 'staying'],
                  correct: 0,
                  exp: 'الجملة مثبتة وفيها yesterday، فنضيف ed للفعل القياسي stay ليصبح stayed.',
                },
                {
                  id: 'aff-q3',
                  q: 'I ______ my friends two days ago.',
                  opts: ['see', 'saw', 'seen'],
                  correct: 1,
                  exp: 'الجملة مثبتة مع ago، والماضي من see هو saw.',
                },
              ].map((q) => {
                const selected = affirmativeQuizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correct;

                return (
                  <div key={q.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        {q.q}
                      </p>
                      {isAnswered && (
                        <span className={`text-[11px] font-bold font-arabic px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة خاطئة'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {q.opts.map((opt, optIdx) => {
                        let style = 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-100';
                        if (isAnswered) {
                          if (optIdx === q.correct) {
                            style = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                          } else if (optIdx === selected) {
                            style = 'bg-rose-500 text-white border-rose-600 font-bold';
                          } else {
                            style = 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => setAffirmativeQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold cursor-pointer transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <p className="text-xs text-zinc-600 font-arabic pt-1 leading-relaxed">
                        <strong>التوضيح:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* محتوى 2: النفي (NEGATIVE)                                 */}
      {/* ======================================================== */}
      {activeMode === 'negative' && (
        <div className="space-y-6">
          {/* صندوق القاعدة الفاتح للنفي بدون سواد */}
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 border-2 border-rose-300 p-5 sm:p-6 rounded-2xl shadow-xs text-center space-y-3">
            <span className="text-xs font-bold text-rose-900 font-arabic block">
              القاعدة العامة لحالة النفي
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-rose-950" dir="ltr">
              <span className="bg-white border border-rose-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                الفاعل (Subject)
              </span>
              <span className="text-rose-600 text-xl font-bold">+</span>
              <span className="bg-rose-600 text-white px-3.5 py-1.5 rounded-xl font-bold font-mono shadow-2xs">
                didn't (did not)
              </span>
              <span className="text-rose-600 text-xl font-bold">+</span>
              <span className="bg-white border border-rose-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                فعل مجرد (Base Verb)
              </span>
              <span className="text-rose-600 text-xl font-bold">+</span>
              <span className="bg-white border border-rose-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                التكملة (Complement)
              </span>
            </div>
            <div className="text-xs text-rose-800 font-mono" dir="ltr">
              Subject + didn't + Base Verb + Complement
            </div>
            <div className="text-xs text-rose-900 font-arabic pt-2 border-t border-rose-200">
              <strong>القاعدة الذهبية:</strong> بعد <span className="font-mono font-bold" dir="ltr">didn't</span> يرجع الفعل مجرداً دائماً خالي من ed وبدون أي تغيير شاذ.
            </div>
          </div>

          {/* خطوات النفي */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-3">
            <h4 className="text-base font-bold text-zinc-900 font-arabic">
              كيف ننفي جملة الماضي البسيط؟
            </h4>
            <p className="text-sm text-zinc-700 font-arabic leading-relaxed">
              1. نضع الأداة <span className="font-mono font-bold text-rose-700" dir="ltr">didn't</span> مباشرة بعد الفاعل.<br />
              2. نحول الفعل الماضي إلى أصله ومصدره المجرد (Base form).
            </p>
          </div>

          {/* أمثلة النفي مع الدلائل الزمنية */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <h4 className="text-base font-bold text-zinc-900 font-arabic flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>أمثلة النفي مع الدلائل الزمنية:</span>
            </h4>
            <div className="space-y-3">
              {[
                {
                  en: 'I did not watch a film last night.',
                  ar: 'لم أشاهد فيلماً الليلة الماضية.',
                  clue: 'الدلالة: last night (الليلة الماضية)',
                  note: 'watch رجع مجرداً بدون ed',
                },
                {
                  en: 'Faisal did not go away in the holidays.',
                  ar: 'فيصل لم يسافر في العطلة.',
                  clue: 'الدلالة: in the holidays (في العطلة)',
                  note: 'رجع الفعل go بدلاً من went',
                },
                {
                  en: 'We did not stay at a hotel yesterday.',
                  ar: 'نحن لم نبقَ في فندق أمس.',
                  clue: 'الدلالة: yesterday (أمس)',
                  note: 'stay رجع مجرداً بدون ed',
                },
                {
                  en: 'She did not see her friends two days ago.',
                  ar: 'هي لم ترَ صديقاتها قبل يومين.',
                  clue: 'الدلالة: two days ago (قبل يومين)',
                  note: 'see رجع مجرداً بدلاً من saw',
                },
              ].map((ex, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md font-arabic">
                      {ex.clue} • {ex.note}
                    </span>
                    <button
                      onClick={() => handleSpeak(ex.en)}
                      className="text-xs text-zinc-700 hover:text-zinc-950 flex items-center gap-1 font-arabic cursor-pointer px-2.5 py-1 rounded-lg bg-white border border-zinc-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>استماع</span>
                    </button>
                  </div>
                  <div className="text-base font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                    {ex.en}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-arabic" dir="rtl">
                    {ex.ar}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أسئلة واختبار النفي فقط */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h4 className="text-sm sm:text-base font-bold text-zinc-900 font-arabic flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-600" />
                <span>اختبر فهمك: أسئلة على حالة النفي فقط</span>
              </h4>
              {Object.keys(negativeQuizAnswers).length > 0 && (
                <button
                  onClick={() => setNegativeQuizAnswers({})}
                  className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-arabic cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'neg-q1',
                  q: "Huda ______ stay at a hotel last week.",
                  opts: ["didn't", "don't", "doesn't"],
                  correct: 0,
                  exp: "لنفي الماضي البسيط نستخدم didn't لجميع الفواعل.",
                },
                {
                  id: 'neg-q2',
                  q: "I didn't ______ to the park yesterday.",
                  opts: ["go", "went", "goes"],
                  correct: 0,
                  exp: "بعد didn't يجب أن يكون الفعل مجرداً خالي من أي إضافة (go).",
                },
                {
                  id: 'neg-q3',
                  q: "We didn't ______ a film last night.",
                  opts: ["watch", "watched", "watching"],
                  correct: 0,
                  exp: "بعد didn't نختار watch بدون ed.",
                },
              ].map((q) => {
                const selected = negativeQuizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correct;

                return (
                  <div key={q.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        {q.q}
                      </p>
                      {isAnswered && (
                        <span className={`text-[11px] font-bold font-arabic px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة خاطئة'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {q.opts.map((opt, optIdx) => {
                        let style = 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-100';
                        if (isAnswered) {
                          if (optIdx === q.correct) {
                            style = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                          } else if (optIdx === selected) {
                            style = 'bg-rose-500 text-white border-rose-600 font-bold';
                          } else {
                            style = 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => setNegativeQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold cursor-pointer transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <p className="text-xs text-zinc-600 font-arabic pt-1 leading-relaxed">
                        <strong>التوضيح:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* محتوى 3: السؤال (QUESTION)                               */}
      {/* ======================================================== */}
      {activeMode === 'question' && (
        <div className="space-y-6">
          {/* صندوق القاعدة الفاتح للسؤال بدون سواد */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 p-5 sm:p-6 rounded-2xl shadow-xs text-center space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-900 font-arabic block">
                1. السؤال القصير بنعم أو لا (Yes / No Question)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-indigo-950" dir="ltr">
                <span className="bg-indigo-600 text-white px-3.5 py-1.5 rounded-xl font-bold font-mono shadow-2xs">
                  Did
                </span>
                <span className="text-indigo-600 text-xl font-bold">+</span>
                <span className="bg-white border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                  الفاعل (Subject)
                </span>
                <span className="text-indigo-600 text-xl font-bold">+</span>
                <span className="bg-white border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                  فعل مجرد (Base Verb)
                </span>
                <span className="text-indigo-600 text-xl font-bold">+</span>
                <span className="bg-white border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                  التكملة + ?
                </span>
              </div>
              <div className="text-xs text-indigo-800 font-mono" dir="ltr">
                Did + Subject + Base Verb + Complement + ?
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-indigo-200">
              <span className="text-xs font-bold text-indigo-900 font-arabic block">
                2. السؤال بأداة الاستفهام (Wh- Question)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-bold text-indigo-950" dir="ltr">
                <span className="bg-white border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                  أداة الاستفهام (Wh-word)
                </span>
                <span className="text-indigo-600 text-xl font-bold">+</span>
                <span className="bg-indigo-600 text-white px-3.5 py-1.5 rounded-xl font-bold font-mono shadow-2xs">
                  did
                </span>
                <span className="text-indigo-600 text-xl font-bold">+</span>
                <span className="bg-white border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                  الفاعل
                </span>
                <span className="text-indigo-600 text-xl font-bold">+</span>
                <span className="bg-white border border-indigo-200 px-3.5 py-1.5 rounded-xl shadow-2xs font-arabic">
                  فعل مجرد + ?
                </span>
              </div>
              <div className="text-xs text-indigo-800 font-mono" dir="ltr">
                Wh-word + did + Subject + Base Verb + ?
              </div>
            </div>
          </div>

          {/* أدوات الاستفهام (Wh-words) الموجودة في الكتاب مع الشرح والمعنى */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <div className="border-b border-zinc-100 pb-3">
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>أدوات الاستفهام (Wh- Question Words) في الكتاب</span>
              </h4>
              <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                توضع أداة الاستفهام دائماً في بداية السؤال، متبوعة بـ did ثم الفاعل ثم الفعل المجرد:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                {
                  word: 'What',
                  meaning: 'ماذا / ما',
                  usage: 'تُستخدم للسؤال عن الشيء أو العمل أو النشاط.',
                  example: 'What did you do in the holidays?',
                  exampleAr: 'ماذا فعلت في العطلة؟',
                },
                {
                  word: 'Where',
                  meaning: 'أين',
                  usage: 'تُستخدم للسؤال عن المكان.',
                  example: 'Where did Faisal go yesterday?',
                  exampleAr: 'إلى أين ذهب فيصل بالأمس؟',
                },
                {
                  word: 'When',
                  meaning: 'متى',
                  usage: 'تُستخدم للسؤال عن الزمان والوقت.',
                  example: 'When did you arrive in Baghdad?',
                  exampleAr: 'متى وصلتم إلى بغداد؟',
                },
                {
                  word: 'Who',
                  meaning: 'مَن',
                  usage: 'تُستخدم للسؤال عن الشخص العاقل.',
                  example: 'Who did you visit last week?',
                  exampleAr: 'مَن زرت الأسبوع الماضي؟',
                },
                {
                  word: 'Why',
                  meaning: 'لماذا',
                  usage: 'تُستخدم للسؤال عن السبب والعلة.',
                  example: 'Why did you stay at home?',
                  exampleAr: 'لماذا بقيت في المنزل؟',
                },
                {
                  word: 'How',
                  meaning: 'كيف',
                  usage: 'تُستخدم للسؤال عن الكيفية أو الحال أو وسيلة النقل.',
                  example: 'How did you travel to Erbil?',
                  exampleAr: 'كيف سافرتم إلى أربيل؟',
                },
                {
                  word: 'Which',
                  meaning: 'أيّ / أيّهما',
                  usage: 'تُستخدم للتخيير والتمييز بين أشياء محددة.',
                  example: 'Which place did you like best?',
                  exampleAr: 'أي مكان أعجبك أكثر؟',
                },
                {
                  word: 'Whose',
                  meaning: 'لمَن / مِلك مَن',
                  usage: 'تُستخدم للسؤال عن الملكية (الدرس 4 في كتاب الطالب).',
                  example: 'Whose scrapbook did you see?',
                  exampleAr: 'دفتر قصاصات مَن رأيت؟',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100/60 transition-colors space-y-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg" dir="ltr">
                          {item.word}
                        </span>
                        <span className="text-xs font-bold text-zinc-900 font-arabic">
                          ({item.meaning})
                        </span>
                      </div>
                      <button
                        onClick={() => handleSpeak(item.example)}
                        className="text-xs text-zinc-600 hover:text-zinc-950 flex items-center gap-1 font-arabic cursor-pointer px-2 py-0.5 rounded bg-white border border-zinc-200 shadow-2xs"
                        title="استمع للمثال"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span className="text-[11px]">نطق</span>
                      </button>
                    </div>
                    <p className="text-xs text-zinc-600 font-arabic mt-1.5 leading-relaxed">
                      {item.usage}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/60">
                    <p className="text-xs font-mono font-bold text-zinc-900" dir="ltr">
                      {item.example}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-0.5" dir="rtl">
                      {item.exampleAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أمثلة الأسئلة مع الدلائل الزمنية */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <h4 className="text-base font-bold text-zinc-900 font-arabic flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>أمثلة الأسئلة مع الدلائل الزمنية:</span>
            </h4>
            <div className="space-y-3">
              {[
                {
                  en: 'Did you watch a film last night?',
                  ar: 'هل شاهدت فيلماً الليلة الماضية؟',
                  clue: 'الدلالة: last night (الليلة الماضية)',
                  ans: 'الجواب: Yes, I did. / No, I didn\'t.',
                },
                {
                  en: 'Did you go away in the holidays?',
                  ar: 'هل سافرت في العطلة؟',
                  clue: 'الدلالة: in the holidays (في العطلة)',
                  ans: 'الجواب: Yes, I did. / No, I didn\'t.',
                },
                {
                  en: 'What did you do yesterday?',
                  ar: 'ماذا فعلت أمس؟',
                  clue: 'الدلالة: yesterday (أمس)',
                  ans: 'سؤال بأداة الاستفهام What مع did وفعل مجرد',
                },
                {
                  en: 'Where did Faisal go two days ago?',
                  ar: 'إلى أين ذهب فيصل قبل يومين؟',
                  clue: 'الدلالة: two days ago (قبل يومين)',
                  ans: 'سؤال بأداة الاستفهام Where مع did وفعل مجرد',
                },
              ].map((ex, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md font-arabic">
                      {ex.clue}
                    </span>
                    <button
                      onClick={() => handleSpeak(ex.en)}
                      className="text-xs text-zinc-700 hover:text-zinc-950 flex items-center gap-1 font-arabic cursor-pointer px-2.5 py-1 rounded-lg bg-white border border-zinc-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>استماع</span>
                    </button>
                  </div>
                  <div className="text-base font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                    {ex.en}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-arabic" dir="rtl">
                    {ex.ar} <span className="text-xs text-zinc-400">({ex.ans})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أسئلة واختبار السؤال والاستفهام فقط */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h4 className="text-sm sm:text-base font-bold text-zinc-900 font-arabic flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>اختبر فهمك: أسئلة على حالة الاستفهام فقط</span>
              </h4>
              {Object.keys(questionQuizAnswers).length > 0 && (
                <button
                  onClick={() => setQuestionQuizAnswers({})}
                  className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-arabic cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'ques-q1',
                  q: "Did you ______ your friends yesterday?",
                  opts: ["visit", "visited", "visiting"],
                  correct: 0,
                  exp: "بعد أداة السؤال Did نختار دائماً الفعل المجرد visit بدون ed.",
                },
                {
                  id: 'ques-q2',
                  q: "What did you ______ last night?",
                  opts: ["do", "did", "done"],
                  correct: 0,
                  exp: "في السؤال بعد did يكون الفعل مجرداً (do).",
                },
                {
                  id: 'ques-q3',
                  q: "______ they play football two days ago?",
                  opts: ["Did", "Do", "Are"],
                  correct: 0,
                  exp: "نسأل عن الماضي بـ Did لوجود دلالة الماضي two days ago.",
                },
              ].map((q) => {
                const selected = questionQuizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correct;

                return (
                  <div key={q.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        {q.q}
                      </p>
                      {isAnswered && (
                        <span className={`text-[11px] font-bold font-arabic px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة خاطئة'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2" dir="ltr">
                      {q.opts.map((opt, optIdx) => {
                        let style = 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-100';
                        if (isAnswered) {
                          if (optIdx === q.correct) {
                            style = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                          } else if (optIdx === selected) {
                            style = 'bg-rose-500 text-white border-rose-600 font-bold';
                          } else {
                            style = 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => setQuestionQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold cursor-pointer transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <p className="text-xs text-zinc-600 font-arabic pt-1 leading-relaxed">
                        <strong>التوضيح:</strong> {q.exp}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* الخلاصة الذهبية المركزة للقاعدة                            */}
      {/* ======================================================== */}
      <section className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs text-right space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            </span>
          <h3 className="text-lg font-bold text-zinc-900 font-arabic">
            الخلاصة
          </h3>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4.5 space-y-2">
          <ol className="space-y-1.5 pr-4 list-decimal text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
            <li><strong>المثبت:</strong> نستخدم الفعل الماضي مباشرة (بإضافة ed للقياسي أو تصريف الشاذ).</li>
            <li><strong>المنفي:</strong> الفاعل + didn't + فعل مجرد خالٍ من أي إضافة.</li>
            <li><strong>السؤال:</strong> Did + الفاعل + فعل مجرد + ؟</li>
            <li><strong>الدلائل الزمنية:</strong> yesterday, last night/week/month, ago, in the holidays.</li>
          </ol>
        </div>
      </section>
    </div>
  );
};
