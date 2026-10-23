import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Languages, Eye, EyeOff } from 'lucide-react';
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
    return item.acceptableAnswers.some((acc) => val.includes(acc.toLowerCase()));
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

  return (
    <div className="space-y-5" dir="ltr">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2">
        <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
          Activity Book • Page 11 • Exercise 3
        </span>
        <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
          Read, think and answer. Deduce the hobby / interest.
        </h4>
        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
          اقرأ الفقرات الثلاث بعناية، واستنتج هواية أو اهتمام كل شخص باستخدام صيغة المصدر (Gerund) أو الاسم:
        </p>
      </div>

      {/* The 3 Cards */}
      <div className="space-y-4">
        {items.map((item) => {
          const val = answers[item.id] || '';
          const correct = isAnswerCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all space-y-4 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-400 bg-emerald-50/40 shadow-xs'
                    : 'border-rose-300 bg-rose-50/40'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs'
              }`}
            >
              {/* Card Top: Text + Translation Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white text-xs font-black flex items-center justify-center font-sans uppercase">
                    {item.letter}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 font-arabic">
                    {item.imageHint}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTranslation(item.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border font-arabic flex items-center gap-1 transition-all cursor-pointer ${
                    showTranslations[item.id]
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{showTranslations[item.id] ? 'إخفاء الترجمة' : 'ترجمة الفقرة'}</span>
                </button>
              </div>

              {/* Quotation paragraph */}
              <div className="bg-zinc-50 p-3.5 sm:p-4 rounded-xl border border-zinc-200/80">
                <p className="text-xs sm:text-sm font-sans text-zinc-800 leading-relaxed italic">
                  "{item.textEn}"
                </p>
                {showTranslations[item.id] && (
                  <p className="text-xs text-zinc-600 font-arabic text-right mt-2 pt-2 border-t border-zinc-200" dir="rtl">
                    {item.textAr}
                  </p>
                )}
              </div>

              {/* Input prompt */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 font-sans flex items-center gap-2">
                  <span>{item.promptPrefixEn}</span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder="Write the interest / hobby..."
                    className={`flex-1 px-3 py-2 text-xs font-bold font-sans rounded-lg border transition-all outline-none ${
                      isChecked
                        ? correct
                          ? 'border-emerald-500 bg-emerald-100/70 text-emerald-900'
                          : 'border-rose-400 bg-rose-100/70 text-rose-900'
                        : 'border-zinc-300 bg-white focus:border-zinc-900 text-zinc-900'
                    }`}
                  />
                  <span>.</span>
                </label>
              </div>

              {/* Feedback and Model Answer */}
              {isChecked && (
                <div className={`p-3 rounded-lg text-xs font-arabic text-right space-y-1 ${
                  correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'
                }`} dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>إجابة استنتاجية صحيحة! ({item.correctAnswer})</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>الجواب النموذجي المنهجي: <strong className="font-sans underline">{item.correctAnswer}</strong></span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-700 leading-relaxed pr-5">
                    {item.explanationAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Buttons */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAll}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm font-arabic shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>فحص الإجابات</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
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
