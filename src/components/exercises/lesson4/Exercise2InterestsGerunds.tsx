import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw } from 'lucide-react';
import { lesson4ActivityData, NotCorrectItem } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise2InterestsGerundsProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise2InterestsGerunds: React.FC<Exercise2InterestsGerundsProps> = ({ onProgressUpdate }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [isChecked, setIsChecked] = useState(false);

  const items = lesson4ActivityData.page10Ex2NotCorrect;

  const handleSelect = (itemId: string, optIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: optIndex }));
  };

  const isItemCorrect = (item: NotCorrectItem) => {
    const selectedIdx = selectedOptions[item.id];
    if (selectedIdx === undefined) return false;
    return item.options[selectedIdx]?.isCorrectGrammar === false;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isItemCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setSelectedOptions({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, number> = {};
    items.forEach((it) => {
      const wrongIdx = it.options.findIndex((opt) => opt.isCorrectGrammar === false);
      if (wrongIdx !== -1) {
        model[it.id] = wrongIdx;
      }
    });
    setSelectedOptions(model);
    setIsChecked(true);
  };

  const answeredCount = Object.keys(selectedOptions).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 10 • Exercise 2
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Which one is not correct? Put a tick (✓).
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            ضع علامة (✓) على الخيار <strong>غير الصحيح قواعدياً</strong> في كل جملة من الجمل الأربع:
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {items.length}
        </div>
      </div>

      {/* The 4 Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {items.map((item) => {
          const selectedIdx = selectedOptions[item.id];
          const correct = isItemCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans uppercase">
                    {item.letter}
                  </span>
                  <span className="text-sm font-bold text-zinc-900 font-sans">
                    {item.promptEn}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 font-arabic">
                  {item.promptAr}
                </span>
              </div>

              {/* Options Checkboxes */}
              <div className="space-y-1.5">
                {item.options.map((opt, optIdx) => {
                  const isChosen = selectedIdx === optIdx;
                  const isThisWrongGrammar = opt.isCorrectGrammar === false;

                  return (
                    <button
                      key={opt.text}
                      type="button"
                      onClick={() => handleSelect(item.id, optIdx)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 font-sans ${
                        isChosen
                          ? isChecked
                            ? isThisWrongGrammar
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                              : 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                            : 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                          : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs font-bold shrink-0 ${
                          isChosen
                            ? 'bg-white text-zinc-900 border-white'
                            : 'border-zinc-300 bg-white text-transparent'
                        }`}>
                          ✓
                        </span>
                        <span className="truncate">{opt.text}</span>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded font-arabic shrink-0 ${
                        isChosen ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600'
                      }`} dir="rtl">
                        {opt.type === 'bare_infinitive' ? 'فعل مجرد' : opt.type === 'gerund' ? 'Gerund' : 'اسم'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isChecked && (
                <div className="p-2 rounded-lg text-xs font-arabic text-right space-y-1 bg-zinc-100 text-zinc-800 border border-zinc-200" dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>إجابة صحيحة! الخيار غير الصحيح هو المحدد.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>الخيار غير الصحيح قواعدياً: ({item.options.find((o) => !o.isCorrectGrammar)?.text})</span>
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
