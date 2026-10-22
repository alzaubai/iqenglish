import React, { useState } from 'react';
import { Volume2, Languages, RotateCcw, HelpCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface WhQuestionsViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const WhQuestionsView: React.FC<WhQuestionsViewProps> = ({
  currentTopic,
  onSpeak,
}) => {
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setPracticeAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
    if (isCorrect) {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
    }
  };

  const handleResetPractice = () => {
    setPracticeAnswers({});
    setRevealedAnswers({});
  };

  return (
    <div className="space-y-6">
      {/* 1. جدول أدوات الاستفهام المنهجية (Dual Responsive Layout: Mobile Cards + Desktop Table) */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 font-arabic block">
              الجدول الأساسي لأدوات الاستفهام (كتاب الطالب وكتاب النشاط)
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              أدوات الاستفهام (Wh- Words) ومعانيها واستخداماتها المنهجية
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl self-start sm:self-auto"
            dir="ltr"
          >
            Question Words
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
          تُسمى أدوات الاستفهام بـ <strong className="font-mono text-indigo-700">Wh- Questions</strong> لأن معظمها يبدأ بحرفي (Wh). لكل أداة وظيفة خاصة تسأل عن جزء محدد من الجملة:
        </p>

        {/* عرض كروت الموبايل (sm:hidden) لحماية شاشات الهواتف من التزاحم العرضي */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {currentTopic.questionWordsTable?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-zinc-200/90 p-4 shadow-xs space-y-3"
            >
              {/* الرأس: الأداة + المعنى + زر النطق */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-mono font-black text-sm shadow-2xs"
                    dir="ltr"
                  >
                    {item.word}
                  </span>
                  <span className="font-arabic font-bold text-xs text-zinc-900">
                    {item.meaningAr}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSpeak(item.word)}
                  className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-indigo-600 cursor-pointer shadow-2xs"
                  title={`استمع لنطق ${item.word}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* الاستخدام */}
              <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-200/80 text-right space-y-0.5">
                <span className="text-[10px] font-bold text-indigo-700 font-arabic block">
                  عن ماذا تسأل؟
                </span>
                <p className="text-xs text-zinc-700 font-arabic leading-relaxed">
                  {item.usageAr}
                </p>
              </div>

              {/* المثال المنهجي */}
              <div className="bg-indigo-50/40 rounded-xl p-2.5 border border-indigo-100 flex items-center justify-between gap-2 text-left" dir="ltr">
                <div>
                  <span className="font-sans font-bold text-xs text-zinc-900 block">
                    {item.exampleEn}
                  </span>
                  <span className="text-[11px] font-arabic text-zinc-600 block text-right mt-0.5" dir="rtl">
                    {item.exampleAr}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSpeak(item.exampleEn)}
                  className="p-1 rounded bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer shrink-0 shadow-2xs"
                  title="استمع للمثال كاملاً"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* جدول الديسك توب التفاعلي (hidden sm:block) */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-zinc-200/90 shadow-2xs">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-zinc-50 text-zinc-900 text-xs font-bold font-arabic border-b border-zinc-200">
                <th className="p-3.5 text-center sm:text-right">أداة الاستفهام (Word)</th>
                <th className="p-3.5">المعنى بالعربية</th>
                <th className="p-3.5">الاستخدام وماذا تسأل عنه</th>
                <th className="p-3.5">مثال منهجي ناطق</th>
              </tr>
            </thead>
            <tbody className="text-xs font-sans divide-y divide-zinc-200">
              {currentTopic.questionWordsTable?.map((item, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="p-3.5 font-black font-mono text-indigo-700 text-sm whitespace-nowrap" dir="ltr">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSpeak(item.word)}
                        className="p-1 rounded bg-zinc-100 hover:bg-indigo-100 text-zinc-600 hover:text-indigo-700 cursor-pointer transition-colors shadow-2xs"
                        title={`استمع لنطق ${item.word}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800">
                        {item.word}
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold font-arabic text-zinc-900 whitespace-nowrap">
                    {item.meaningAr}
                  </td>
                  <td className="p-3.5 font-arabic text-zinc-700 leading-relaxed">
                    {item.usageAr}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-between gap-2 min-w-[220px]">
                      <div className="text-left" dir="ltr">
                        <span className="font-bold text-zinc-900 text-xs block">
                          {item.exampleEn}
                        </span>
                        <span className="text-[11px] font-arabic font-normal text-zinc-500 block text-right mt-0.5" dir="rtl">
                          {item.exampleAr}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSpeak(item.exampleEn)}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer shrink-0 transition-colors shadow-2xs"
                        title="استمع للمثال كاملاً"
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

        {/* نصيحة ذهبية بحواف مظللة */}
        <div className="bg-indigo-50/70 border border-indigo-200/90 rounded-2xl p-4 text-right flex items-start gap-3 shadow-2xs">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-950 font-arabic block">
              القاعدة الذهبية لأدوات الاستفهام في الامتحانات:
            </span>
            <p className="text-xs text-indigo-900 font-arabic leading-relaxed">
              عند تكوين السؤال، يتم <strong>حذف جواب الأداة</strong> من الجملة. فإذا سألت بـ <span className="font-mono font-bold text-indigo-700">Where</span> نحذف اسم المكان، وإذا سألت بـ <span className="font-mono font-bold text-indigo-700">When</span> نحذف الزمان، وإذا سألت بـ <span className="font-mono font-bold text-indigo-700">Who</span> نحذف اسم الفاعل العاقل!
            </p>
          </div>
        </div>
      </div>

      {/* 2. قواعد تكوين السؤال وصيغ المعادلات بكبسولات ملونة زاهية */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 font-arabic block">
              معادلات تركيب السؤال حسب زمن الجملة
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              قواعد وترتيب عناصر السؤال (DID / DO / DOES / BE / WHO)
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-zinc-100 text-zinc-700 rounded-xl self-start sm:self-auto border border-zinc-200"
            dir="ltr"
          >
            Question Formulas
          </span>
        </div>

        <div className="space-y-5">
          {currentTopic.questionRules?.map((sec, idx) => (
            <div
              key={idx}
              className="p-5 bg-zinc-50/80 border border-zinc-200/90 rounded-2xl space-y-3.5 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-200/70 pb-2">
                <h5 className="text-sm sm:text-base font-black text-zinc-900 font-arabic">
                  {sec.titleAr}
                </h5>
                <span className="text-xs font-mono font-bold text-indigo-700" dir="ltr">
                  {sec.ruleTitleEn}
                </span>
              </div>

              {/* رقائق معادلة القاعدة بكبسولات ملونة واضحة */}
              <div
                className="flex flex-wrap items-center justify-center gap-1.5 py-2.5 px-3 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono text-xs"
                dir="ltr"
              >
                {sec.formulaChips.map((chip, cIdx) => (
                  <span
                    key={cIdx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      chip.isHighlight
                        ? 'bg-indigo-600 text-white font-mono shadow-xs ring-2 ring-indigo-200'
                        : chip.text === '+' || chip.text === 'أو'
                        ? 'text-indigo-600 font-bold px-1'
                        : chip.text === 'did' || chip.text === 'do / does' || chip.text === 'was / were'
                        ? 'bg-blue-600 text-white font-mono shadow-2xs'
                        : chip.text === 'Base' || chip.text === 'فعل مجرد' || chip.text === 'فعل رئيسي' || chip.text === 'فعل + ing'
                        ? 'bg-emerald-600 text-white font-mono shadow-2xs'
                        : chip.text === '?'
                        ? 'bg-amber-500 text-white font-black text-sm px-2 shadow-2xs'
                        : 'bg-zinc-100 border border-zinc-200 text-zinc-800 font-arabic'
                    }`}
                    title={chip.note || undefined}
                  >
                    {chip.text}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed whitespace-pre-line">
                {sec.explanationAr}
              </p>

              {/* أمثلة القاعدة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {sec.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 bg-white border border-zinc-200/90 rounded-xl flex items-center justify-between gap-3 shadow-2xs text-left"
                    dir="ltr"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-zinc-900 text-xs sm:text-sm block">
                        {ex.en}
                      </span>
                      <span className="text-[11px] font-arabic font-normal text-zinc-500 block text-right" dir="rtl">
                        {ex.ar}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSpeak(ex.en)}
                      className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer shrink-0 transition-colors shadow-2xs"
                      title="استمع للمثال"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. تطبيقات وتمارين كتاب النشاط مفصخة خطوة بخطوة (Step-by-step Dissection) */}
      {currentTopic.questionApplications && currentTopic.questionApplications.length > 0 && (
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 font-arabic block">
                تطبيقات منهجية من كتاب النشاط (ص 18-19 رسالة كارين) والامتحانات
              </span>
              <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                تكوين السؤال خطوة بخطوة مع تفصيخ الأركان
              </h4>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl font-arabic self-start sm:self-auto">
              {currentTopic.questionApplications.length} نماذج تطبيقية مفصخة
            </span>
          </div>

          <div className="space-y-6">
            {currentTopic.questionApplications.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl shadow-xs space-y-4"
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
                    <h5
                      className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight pt-1 text-left"
                      dir="ltr"
                    >
                      {item.problemEn}
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSpeak(item.problemEn)}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer shrink-0 transition-colors shadow-2xs"
                    title="استمع للجملة الأصلية"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 1. تفصيخ الجملة (تحليل أركانها للطالب) */}
                {item.dissection && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>تفصيخ الجملة (تحليل أركانها قبل صياغة السؤال):</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {item.dissection.map((part: any, pIdx: number) => (
                        <div
                          key={pIdx}
                          className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/90 text-right space-y-0.5 shadow-2xs"
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
                      <span>خطوات تركيب السؤال بالتسلسل:</span>
                    </span>
                    <div className="space-y-2">
                      {item.cumulativeSteps.map((step: any) => (
                        <div
                          key={step.stepNumber}
                          className="p-3 bg-zinc-50/80 rounded-xl border border-zinc-200/90 text-right space-y-1.5 shadow-2xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-zinc-900 font-arabic">
                              {step.titleAr}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] font-bold text-indigo-700 font-mono shadow-2xs">
                              Step {step.stepNumber}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                            {step.explanationAr}
                          </p>
                          {/* تطور الجملة خطوة بخطوة */}
                          <div
                            className="p-2.5 bg-white rounded-lg border border-zinc-200 text-left font-mono text-xs sm:text-sm font-bold text-zinc-800 shadow-2xs"
                            dir="ltr"
                          >
                            <span
                              className="text-[10px] font-arabic font-normal text-zinc-400 block text-right mb-0.5"
                              dir="rtl"
                            >
                              شكل السؤال عند هذه الخطوة:
                            </span>
                            <span className="text-indigo-700 bg-indigo-50/80 px-1.5 py-0.5 rounded">
                              {step.sentenceProgress}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. الحل النموذجي النهائي */}
                <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-1 text-left" dir="ltr">
                    <span
                      className="text-[11px] font-bold text-emerald-800 font-arabic block text-right"
                      dir="rtl"
                    >
                      صيغة السؤال النهائية الصحيحة:
                    </span>
                    <span className="font-mono text-emerald-950 font-black text-sm sm:text-base">
                      {item.solutionEn}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSpeak(item.solutionEn)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors self-start sm:self-center font-arabic"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استمع للسؤال</span>
                  </button>
                </div>

                {/* 4. ملاحظة تعليمية */}
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-right shadow-2xs">
                  <p className="text-xs text-amber-950 font-arabic leading-relaxed">
                    <strong className="font-bold">توضيح المعلم: </strong>
                    {item.noteAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. اختبار الامتحانات الشهرية التفاعلي (Interactive Exam Practice) */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 font-arabic block">
              نماذج أسئلة الامتحانات الشهرية ونصف السنة (الصف الأول متوسط)
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              تدرب على أسئلة تكوين السؤال وأدوات الاستفهام
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetPractice}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors font-arabic shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاولة</span>
            </button>
            <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl font-arabic">
              {currentTopic.examPractice.length} أسئلة
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {currentTopic.examPractice.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];
            const selectedAnswer = practiceAnswers[q.id];
            const isCorrect = selectedAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all text-right ${
                  isRevealed
                    ? isCorrect
                      ? 'border-emerald-400 bg-emerald-50/50 shadow-xs'
                      : 'border-rose-300 bg-rose-50/50 shadow-xs'
                    : 'border-zinc-200/90 bg-zinc-50/70 shadow-xs'
                }`}
              >
                {/* رأس السؤال */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {q.questionAr && (
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
                    </div>
                    <p
                      className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight pt-0.5 text-left"
                      dir="ltr"
                    >
                      {q.questionEn}
                    </p>
                    {q.questionAr && visibleTranslations[q.id] && (
                      <p className="text-xs text-zinc-700 font-arabic mt-1.5 p-2 bg-white rounded-lg border border-zinc-200/80 text-right animate-in fade-in duration-150" dir="rtl">
                        {q.questionAr}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSpeak(q.questionEn.replace('______', 'blank'))}
                    className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-indigo-600 cursor-pointer shrink-0 transition-colors shadow-2xs"
                    title="استمع للسؤال"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* خيارات الإجابة */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1" dir="ltr">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedAnswer === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let btnStyle =
                        'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300';
                      if (isRevealed) {
                        if (isThisCorrect) {
                          btnStyle =
                            'bg-emerald-600 border-emerald-600 text-white shadow-xs font-bold';
                        } else if (isOptionSelected && !isThisCorrect) {
                          btnStyle = 'bg-rose-600 border-rose-600 text-white shadow-xs';
                        } else {
                          btnStyle = 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, opt, isThisCorrect)}
                          disabled={isRevealed}
                          className={`p-2.5 rounded-xl border text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* توضيح الإجابة عند الحل */}
                {isRevealed && (
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition-all shadow-2xs ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50/80 border-rose-300 text-rose-950'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 text-right">
                      <span className="text-xs font-bold font-arabic block">
                        {isCorrect ? 'إجابة صحيحة وممتازة! 🎉' : 'إجابة غير صحيحة ❌'}
                      </span>
                      <p className="text-xs font-arabic leading-relaxed text-zinc-700">
                        {q.explanationAr}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhQuestionsView;
