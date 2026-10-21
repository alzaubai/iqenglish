import React, { useState } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
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
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

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

  return (
    <div className="space-y-6">
      {/* 1. جدول ضمائر التملك وصفات التملك */}
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
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-zinc-100 text-zinc-700 rounded-xl self-start sm:self-auto border border-zinc-200"
            dir="ltr"
          >
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
                      <span className="font-bold text-zinc-800" dir="ltr">
                        {row.exampleEn}
                      </span>
                      <button
                        onClick={() => onSpeak(row.exampleEn)}
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

      {/* 2. تطبيقات وأمثلة كتاب النشاط والامتحانات الشهرية مفصخة خطوة بخطوة */}
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
                    <h5
                      className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight pt-1 text-left"
                      dir="ltr"
                    >
                      {item.problemEn}
                    </h5>
                  </div>
                  <button
                    onClick={() => onSpeak(item.problemEn)}
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
                          <div
                            className="p-2 bg-white rounded-lg border border-zinc-200 text-left font-mono text-xs sm:text-sm font-bold text-zinc-800"
                            dir="ltr"
                          >
                            <span
                              className="text-[10px] font-arabic font-normal text-zinc-400 block text-right mb-0.5"
                              dir="rtl"
                            >
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
                        <span className="font-bold text-emerald-950">{item.solutionEn}</span>
                      )}
                    </div>
                  </div>
                  <button
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

      {/* 3. تمرين الاختبار التفاعلي للامتحانات الشهرية */}
      {currentTopic.examPractice && currentTopic.examPractice.length > 0 && (
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
                      onClick={() => onSpeak(q.questionEn)}
                      className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 font-arabic mb-1">{q.questionAr}</p>
                  <h5
                    className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-3"
                    dir="ltr"
                  >
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
      )}
    </div>
  );
};
