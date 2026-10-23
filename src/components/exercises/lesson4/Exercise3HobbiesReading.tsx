import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Languages } from 'lucide-react';
import { lesson4ActivityData, HobbyDeductionItem } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise3HobbiesReadingProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise3HobbiesReading: React.FC<Exercise3HobbiesReadingProps> = ({ onProgressUpdate }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const items = lesson4ActivityData.page11Ex3Hobbies;

  const toggleTranslation = (id: string) => {
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const isAnswerCorrect = (item: HobbyDeductionItem) => {
    const val = (answers[item.id] || '').trim().toLowerCase();
    return item.acceptableAnswers.map((a) => a.toLowerCase()).includes(val);
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isAnswerCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    items.forEach((it) => {
      model[it.id] = it.correctAnswer;
    });
    setAnswers(model);
    setIsChecked(true);
  };

  const answeredCount = Object.keys(answers).filter((k) => (answers[k] || '').trim().length > 0).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 11 • Exercise 3
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Read, think and answer. Deduce the hobby / interest.
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            اقرأ الفقرات الثلاث بعناية، واستنتج هواية أو اهتمام كل شخص باستخدام صيغة المصدر (Gerund) أو الاسم:
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {items.length}
        </div>
      </div>

      {/* The 3 Cards */}
      <div className="space-y-3.5">
        {items.map((item) => {
          const val = answers[item.id] || '';
          const correct = isAnswerCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Card Top: Text + Translation Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans uppercase">
                    {item.letter}
                  </span>
                  <span className="text-xs font-bold text-zinc-600 font-arabic">
                    {item.imageHint}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTranslation(item.id)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md border font-arabic flex items-center gap-1 transition-all cursor-pointer ${
                    showTranslations[item.id]
                      ? 'bg-zinc-200 text-zinc-900 border-zinc-300'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{showTranslations[item.id] ? 'إخفاء الترجمة' : 'ترجمة الفقرة'}</span>
                </button>
              </div>

              {/* Quotation paragraph */}
              <div className="bg-white p-3.5 rounded-lg border border-zinc-200">
                <p className="text-sm font-sans text-zinc-800 leading-relaxed">
                  "{item.textEn}"
                </p>
                {showTranslations[item.id] && (
                  <p className="text-xs text-zinc-600 font-arabic text-right mt-2 pt-2 border-t border-zinc-100" dir="rtl">
                    {item.textAr}
                  </p>
                )}
              </div>

              {/* Input prompt */}
              <div className="pt-0.5">
                <div className="flex flex-wrap items-center gap-2 text-sm font-sans font-bold text-zinc-900">
                  <span>{item.promptPrefixEn}</span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder="Write the interest / hobby..."
                    className={`flex-1 px-3 py-1.5 text-sm font-bold font-sans rounded-md border transition-all outline-none ${
                      isChecked
                        ? correct
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-zinc-300 bg-white focus:border-zinc-900 text-zinc-900'
                    }`}
                  />
                  <span>.</span>
                </div>
              </div>

              {/* Feedback and Model Answer */}
              {isChecked && (
                <div className="p-2.5 rounded-lg text-xs font-arabic text-right space-y-1 bg-zinc-100 text-zinc-800 border border-zinc-200" dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>إجابة استنتاجية صحيحة! ({item.correctAnswer})</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>الجواب النموذجي المنهجي: <strong className="font-sans underline">{item.correctAnswer}</strong></span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed pr-5">
                    {item.explanationAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAll}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm font-arabic shadow-2xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-zinc-300" />
            <span>فحص الإجابات</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>
        </div>

        <button
          type="button"
          onClick={solveAll}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
        >
          عرض الحل النموذجي
        </button>
      </div>
    </div>
  );
};
