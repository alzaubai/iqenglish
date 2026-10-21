import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { lesson2ActivityData } from '../../../data/activityBookData';

interface Exercise3WordMatchesProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise3WordMatches: React.FC<Exercise3WordMatchesProps> = ({
  onProgressUpdate,
}) => {
  const [wordMatches, setWordMatches] = useState<Record<string, string>>({});
  const [ex3Checked, setEx3Checked] = useState(false);

  const checkEx3 = () => {
    setEx3Checked(true);
    let allGood = true;
    lesson2ActivityData.page7Ex3Meanings.forEach((m) => {
      if (wordMatches[m.id] !== m.id) allGood = false;
    });
    if (allGood) {
      confetti({ particleCount: 40, spread: 60 });
      onProgressUpdate(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      <div className="pb-3 border-b border-zinc-200">
        <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
          Activity Book • Page 7 • Exercise 3
        </span>
        <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
          What do the words mean? Match each word with its meaning.
        </h4>
        <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
          ماذا تعني هذه الكلمات؟ طابق كل كلمة مع تعريفها الصحيح بالإنجليزية:
        </p>
      </div>

      <div className="space-y-3">
        {lesson2ActivityData.page7Ex3Meanings.map((m) => {
          const matched = wordMatches[m.id];
          const isAnswered = Boolean(matched);
          const isCorrect = isAnswered && matched === m.id;

          return (
            <div
              key={m.id}
              className={`p-4 rounded-xl border-2 transition-all space-y-2 text-left ${
                ex3Checked
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-rose-400 bg-rose-50/50'
                  : 'border-zinc-200 bg-zinc-50/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-base font-bold text-zinc-900 capitalize block font-sans">
                    {m.word}
                  </span>
                  <span className="text-xs text-zinc-500 font-arabic block mt-0.5" dir="rtl">
                    المعنى بالعربية: {m.definitionAr}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <select
                    value={matched || ''}
                    onChange={(e) => {
                      setWordMatches((prev) => ({ ...prev, [m.id]: e.target.value }));
                      setEx3Checked(false);
                    }}
                    className={`text-xs p-2 border rounded-lg bg-white font-sans max-w-sm ${
                      ex3Checked
                        ? isCorrect
                          ? 'border-emerald-500 text-emerald-800'
                          : 'border-rose-400 text-rose-800'
                        : 'border-zinc-300'
                    }`}
                  >
                    <option value="">Select English definition...</option>
                    {lesson2ActivityData.page7Ex3Meanings.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.definitionEn}
                      </option>
                    ))}
                  </select>

                  {ex3Checked && (
                    isCorrect ? (
                      <span className="text-emerald-700 font-bold text-xs shrink-0">
                        ✓ صحيح
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md font-sans">
                        الحل الصحيح: {m.definitionEn}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
        <button
          onClick={checkEx3}
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
        >
          التحقق من الإجابات
        </button>
      </div>
    </div>
  );
};
