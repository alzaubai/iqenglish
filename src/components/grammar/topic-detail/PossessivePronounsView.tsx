import React, { useState } from 'react';
import { Volume2, Languages, RotateCcw, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface PossessivePronounsViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const PossessivePronounsView: React.FC<PossessivePronounsViewProps> = ({
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
      {/* 1. المقارنة السريعة بين صفة التملك وضمير التملك بكبسولات ملونة */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 font-arabic block">
              القاعدة الذهبية للتفرقة في الامتحانات الشهرية
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              مقارنة صريحة: صفة التملك (Adjective) مقابل ضمير التملك (Possessive)
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl self-start sm:self-auto"
            dir="ltr"
          >
            Adjective vs Pronoun
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* كارت صفة التملك */}
          <div className="p-4 bg-indigo-50/50 border border-indigo-200/90 rounded-2xl space-y-2.5 shadow-2xs text-right">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs font-arabic shadow-2xs">
                1. صفة التملك (Possessive Adjective)
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-700" dir="ltr">
                my, your, his, her, our, their
              </span>
            </div>
            <p className="text-xs text-zinc-700 font-arabic leading-relaxed">
              تأتي <strong>قبل اسم الشيء المملوك</strong> مباشرة، ولا تأتي وحدها في نهاية الجملة:
            </p>
            {/* معادلة كبسولية */}
            <div
              className="flex flex-wrap items-center justify-center gap-1.5 py-2 px-3 bg-white rounded-xl border border-indigo-200 shadow-2xs font-mono text-xs"
              dir="ltr"
            >
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700 font-arabic">
                فاعل + فعل
              </span>
              <span className="text-indigo-600 font-bold">+</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold ring-2 ring-indigo-200 shadow-2xs">
                my / your / her
              </span>
              <span className="text-indigo-600 font-bold">+</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-bold border border-indigo-300">
                اسم الشيء (Book / Bag)
              </span>
            </div>
            <div
              className="p-2.5 bg-white rounded-xl border border-indigo-100 flex items-center justify-between shadow-2xs text-left"
              dir="ltr"
            >
              <div>
                <span className="font-bold text-zinc-900 text-xs block">This is my camera.</span>
                <span className="text-[11px] font-arabic text-zinc-500 block text-right mt-0.5" dir="rtl">
                  هذه كاميرتي (تبعها اسم: camera).
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSpeak('This is my camera.')}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs shrink-0"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* كارت ضمير التملك */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200/90 rounded-2xl space-y-2.5 shadow-2xs text-right">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs font-arabic shadow-2xs">
                2. ضمير التملك (Possessive Pronoun)
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700" dir="ltr">
                mine, yours, his, hers, ours, theirs
              </span>
            </div>
            <p className="text-xs text-zinc-700 font-arabic leading-relaxed">
              يقف <strong>وحده في نهاية الجملة</strong> بعد فعل الكينونة، ويُحظر كتابة اسم الشيء بعده:
            </p>
            {/* معادلة كبسولية */}
            <div
              className="flex flex-wrap items-center justify-center gap-1.5 py-2 px-3 bg-white rounded-xl border border-emerald-200 shadow-2xs font-mono text-xs"
              dir="ltr"
            >
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                اسم الشيء (This camera)
              </span>
              <span className="text-emerald-600 font-bold">+</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-700">
                is / are
              </span>
              <span className="text-emerald-600 font-bold">+</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold ring-2 ring-emerald-200 shadow-2xs">
                mine / yours / hers .
              </span>
            </div>
            <div
              className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-center justify-between shadow-2xs text-left"
              dir="ltr"
            >
              <div>
                <span className="font-bold text-zinc-900 text-xs block">This camera is mine.</span>
                <span className="text-[11px] font-arabic text-zinc-500 block text-right mt-0.5" dir="rtl">
                  هذه الكاميرا لي / ملكي (وقف وحده بالنهاية).
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSpeak('This camera is mine.')}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs shrink-0"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. جدول ضمائر التملك وصفات التملك (Dual Responsive Layout) */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 font-arabic block">
              الجدول المنهجي المعتمد لصف الأول متوسط (كتاب الطالب وكتاب النشاط)
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              جدول التحويلات الكامل (Subject ➔ Adjective ➔ Possessive)
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-zinc-100 text-zinc-700 rounded-xl self-start sm:self-auto border border-zinc-200"
            dir="ltr"
          >
            7 Pronoun Sets
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
          هذا الجدول أساسي جداً في سؤال الإملاء وسؤال الاختيارات في كل امتحانات الشهر الأول ونصف السنة:
        </p>

        {/* عرض كروت الموبايل (sm:hidden) لحماية الشاشة من التزاحم */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {currentTopic.pronounsTable?.map((row, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-zinc-200/90 p-4 shadow-xs space-y-3"
            >
              {/* الرأس: ضمير الفاعل + المعنى العربي + زر الاستماع */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-xl bg-zinc-900 text-white font-mono font-bold text-sm shadow-2xs"
                    dir="ltr"
                  >
                    {row.subject}
                  </span>
                  <span className="font-arabic font-bold text-xs text-zinc-800">
                    {row.ar}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSpeak(`${row.subject}, ${row.adjective || ''}, ${row.possessive}`)}
                  className="p-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-indigo-600 cursor-pointer shadow-2xs"
                  title="استمع للمجموعة"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* التحويل بين الصفة والضمير */}
              <div className="grid grid-cols-2 gap-2 text-center" dir="ltr">
                <div className="bg-indigo-50/60 rounded-xl p-2.5 border border-indigo-200/80 text-left">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block font-sans">
                    Adjective (+ Noun)
                  </span>
                  <span className="font-mono font-black text-sm text-indigo-900 mt-0.5 block">
                    {row.adjective || '—'}
                  </span>
                </div>
                <div className="bg-emerald-50/60 rounded-xl p-2.5 border border-emerald-200/80 text-left">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block font-sans">
                    Possessive (Alone)
                  </span>
                  <span className="font-mono font-black text-sm text-emerald-900 mt-0.5 block">
                    {row.possessive}
                  </span>
                </div>
              </div>

              {/* جملة المثال من كتاب النشاط */}
              <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-200 flex items-center justify-between gap-2 text-left" dir="ltr">
                <span className="font-sans font-bold text-xs text-zinc-800">
                  {row.exampleEn}
                </span>
                <button
                  type="button"
                  onClick={() => onSpeak(row.exampleEn)}
                  className="p-1 rounded bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer shrink-0 shadow-2xs"
                  title="استمع للمثال"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* جدول الديسك توب (hidden sm:block) */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-zinc-200/90 shadow-2xs">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-zinc-50 text-zinc-900 text-xs font-bold font-arabic border-b border-zinc-200">
                <th className="p-3.5">ضمير الفاعل (Subject)</th>
                <th className="p-3.5">صفة التملك (Adjective)</th>
                <th className="p-3.5">ضمير التملك (Possessive)</th>
                <th className="p-3.5">المعنى بالعربية</th>
                <th className="p-3.5">مثال منهجي ناطق من الكتاب</th>
              </tr>
            </thead>
            <tbody className="text-xs font-sans divide-y divide-zinc-200">
              {currentTopic.pronounsTable?.map((row, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="p-3.5" dir="ltr">
                    <span className="font-black font-mono text-zinc-900 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-lg">
                      {row.subject}
                    </span>
                  </td>
                  <td className="p-3.5" dir="ltr">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                      {row.adjective || '—'}
                    </span>
                  </td>
                  <td className="p-3.5" dir="ltr">
                    <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 text-sm">
                      {row.possessive}
                    </span>
                  </td>
                  <td className="p-3.5 font-arabic text-zinc-700 font-bold">
                    {row.ar}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-zinc-800 text-xs" dir="ltr">
                        {row.exampleEn}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSpeak(row.exampleEn)}
                        className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 cursor-pointer shrink-0 shadow-2xs"
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

        {/* كروت الملاحظات الهادئة بخلفية بيضاء وظلال واضحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          <div className="bg-zinc-50/90 border border-zinc-200/90 rounded-2xl p-4 text-right space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-zinc-900 font-arabic flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-indigo-200"></span>
              <span>الموقع الذهبي لضمير التملك في الامتحان:</span>
            </span>
            <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
              ضمائر التملك (<span className="font-mono font-bold text-indigo-700">mine, yours, hers, ours, theirs</span>) تأتي دائماً في <strong>نهاية الجملة</strong> بعد فعل الكينونة (<span className="font-mono font-bold">is / are</span>) وتُختم بنقطة، ولا نكتب اسم الشيء الممتلك بعدها إطلاقاً!
            </p>
          </div>

          <div className="bg-zinc-50/90 border border-zinc-200/90 rounded-2xl p-4 text-right space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-zinc-900 font-arabic flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
              <span>تنبيه مهم للضميرين his و its:</span>
            </span>
            <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
              لاحظ أن <span className="font-mono font-bold text-emerald-700">his</span> تبقى كما هي في صفة التملك وضمير التملك (<span className="font-mono text-zinc-800">his car / The car is his</span>). أما <span className="font-mono font-bold text-indigo-700">its</span> فتُستخدم فقط كصفة تملك لغير العاقل وليس لها ضمير تملك في المنهاج.
            </p>
          </div>
        </div>
      </div>

      {/* 3. تطبيقات وأمثلة كتاب النشاط والامتحانات الشهرية مفصخة خطوة بخطوة */}
      {currentTopic.pronounApplications && currentTopic.pronounApplications.length > 0 && (
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-right">
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
                className="p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl shadow-xs space-y-4 transition-all"
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
                    title="استمع للسؤال"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 1. تفصيخ الجملة (تحليل أركانها) */}
                {item.dissection && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>تفصيخ الجملة (تحليل أركانها للطالب):</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {item.dissection.map((part, pIdx) => (
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
                      <span>خطوات الحل وبناء الجملة (وحدة جوه وحدة):</span>
                    </span>
                    <div className="space-y-2">
                      {item.cumulativeSteps.map((step) => (
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
                              شكل الجملة عند هذه الخطوة:
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
                  <div className="space-y-1.5 text-left" dir="ltr">
                    <span
                      className="text-[11px] font-bold text-emerald-800 font-arabic block text-right"
                      dir="rtl"
                    >
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
                        <span className="font-bold text-emerald-950 font-mono">{item.solutionEn}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSpeak(item.solutionEn)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0 self-end sm:self-center shadow-xs flex items-center gap-1.5 text-xs font-bold font-arabic transition-colors"
                    title="استمع للحل"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>استمع للحل</span>
                  </button>
                </div>

                {/* 4. خطوة الحل المباشرة */}
                {item.actionStepAr && (
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs font-arabic text-amber-950 flex items-center gap-2 shadow-2xs">
                    <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md font-bold text-[10px] shrink-0">
                      خطوة الحل
                    </span>
                    <span className="font-bold">{item.actionStepAr}</span>
                  </div>
                )}

                {/* 5. توضيح المعلم وملاحظة الامتحان */}
                <div className="p-3 bg-zinc-50 border border-zinc-200/90 rounded-xl text-xs font-arabic text-zinc-700 leading-relaxed shadow-2xs">
                  <span className="font-bold text-zinc-900">شرح طريقة المعالجة:</span> {item.noteAr}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. تمرين الاختبار التفاعلي للامتحانات الشهرية */}
      {currentTopic.examPractice && currentTopic.examPractice.length > 0 && (
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-right">
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
              type="button"
              onClick={handleResetPractice}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic shadow-2xs"
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
                        ? 'border-emerald-400 bg-emerald-50/50 shadow-xs'
                        : 'border-rose-300 bg-rose-50/50 shadow-xs'
                      : 'border-zinc-200/90 bg-white shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {q.questionAr && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                            visibleTranslations[q.id]
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                          title="ترجمة السؤال"
                        >
                          <Languages className="w-3 h-3 text-indigo-600" />
                          <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onSpeak(q.questionEn.replace('______', 'blank'))}
                        className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h5
                    className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-2 text-left"
                    dir="ltr"
                  >
                    {q.questionEn}
                  </h5>

                  {q.questionAr && visibleTranslations[q.id] && (
                    <p className="text-xs text-zinc-600 font-arabic mb-3 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/80 animate-in fade-in duration-150 text-right" dir="rtl">
                      {q.questionAr}
                    </p>
                  )}

                  {q.options && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === opt;
                        let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                        if (isRevealed) {
                          if (opt === q.correctAnswer) {
                            btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs';
                          } else if (isChosen && !isCorrect) {
                            btnClass = 'bg-rose-500 text-white border-rose-500 font-bold shadow-xs';
                          } else {
                            btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                          }
                        } else if (isChosen) {
                          btnClass = 'bg-indigo-600 text-white border-indigo-600 shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
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
                    <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200/90 text-zinc-700 leading-relaxed shadow-2xs">
                      <span className="font-bold text-zinc-900">توضيح:</span> {q.explanationAr}
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
