import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Languages } from 'lucide-react';
import { lesson2ActivityData } from '../../../data/activityBookData';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise1DescriptionsProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise1Descriptions: React.FC<Exercise1DescriptionsProps> = ({
  onProgressUpdate,
}) => {
  const [ex1Answers, setEx1Answers] = useState<Record<string, string>>({});
  const [ex1Checked, setEx1Checked] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkEx1 = () => {
    setEx1Checked(true);
    let allGood = true;
    lesson2ActivityData.page6Ex1Descriptions.forEach((d) => {
      if (ex1Answers[d.id]?.toLowerCase().trim() !== d.correctWord.toLowerCase()) {
        allGood = false;
      }
    });
    if (allGood) {
      confetti({ particleCount: 40, spread: 60 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      <div className="pb-3 border-b border-zinc-200">
        <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
          Activity Book • Page 6 • Exercise 1
        </span>
        <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
          Write one word he uses to describe each thing.
        </h4>
        <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
          اكتب الصفة التي استخدمها ريتشارد لوصف كل مكان:
        </p>
      </div>

      <div className="space-y-3">
        {lesson2ActivityData.page6Ex1Descriptions.map((item) => {
          const currentVal = ex1Answers[item.id] || '';
          const isAnswered = currentVal.trim() !== '';
          const isCorrect = isAnswered && currentVal.toLowerCase() === item.correctWord.toLowerCase();

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left ${
                ex1Checked
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-rose-400 bg-rose-50/50'
                  : 'border-zinc-200 bg-zinc-50/40'
              }`}
            >
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-zinc-900 block font-sans">
                    {item.itemEn}
                  </span>
                  {item.itemAr && (
                    <button
                      type="button"
                      onClick={() => toggleTranslation(item.id)}
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                        visibleTranslations[item.id]
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                      }`}
                      title="ترجمة السؤال"
                    >
                      <Languages className="w-3 h-3 text-indigo-600" />
                      <span>{visibleTranslations[item.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                    </button>
                  )}
                </div>
                {item.itemAr && visibleTranslations[item.id] && (
                  <div
                    className="text-xs text-zinc-700 font-arabic bg-zinc-100/80 p-2 rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150"
                    dir="rtl"
                  >
                    {item.itemAr}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <select
                  value={currentVal}
                  onChange={(e) => {
                    setEx1Answers((prev) => ({ ...prev, [item.id]: e.target.value }));
                    setEx1Checked(false);
                  }}
                  className={`text-xs font-bold p-2 border rounded-lg bg-white font-sans ${
                    ex1Checked
                      ? isCorrect
                        ? 'border-emerald-500 text-emerald-800'
                        : 'border-rose-400 text-rose-800'
                      : 'border-zinc-300'
                  }`}
                >
                  <option value="">Choose adjective...</option>
                  {item.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {ex1Checked && (
                  isCorrect ? (
                    <span className="text-emerald-700 font-bold text-xs shrink-0">
                      ✓ صحيح
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md shrink-0 font-sans">
                      الحل: {item.correctWord}
                    </span>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
        <button
          onClick={checkEx1}
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
        >
          التحقق من الإجابات
        </button>
      </div>
    </div>
  );
};
