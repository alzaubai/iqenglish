import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { lesson2ActivityData } from '../../../data/activityBookData';
import { Languages } from 'lucide-react';
import { CharacterAvatar } from '../../CharacterAvatar';

interface Exercise5SaraInterviewProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise5SaraInterview: React.FC<Exercise5SaraInterviewProps> = ({
  onProgressUpdate,
}) => {
  const [saraAnswers, setSaraAnswers] = useState<Record<string, string>>({});
  const [ex5Checked, setEx5Checked] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkEx5 = () => {
    setEx5Checked(true);
    let allGood = true;
    lesson2ActivityData.page7Ex5SaraQuestions.forEach((q) => {
      const val = saraAnswers[q.id] || '';
      if (!q.correctAnswers.some((ans) => val.toLowerCase().includes(ans.toLowerCase()))) {
        allGood = false;
      }
    });
    if (allGood) {
      confetti({ particleCount: 40, spread: 60 });
      onProgressUpdate(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      <div className="pb-3 border-b border-zinc-200 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 7 • Exercise 5
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
            Listen to Sara talking about her holidays. Write notes.
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
            استمع إلى سارة وهي تتحدث عن عطلتها وزيارة صديقتها سميرة:
          </p>
        </div>
        <div className="flex items-center -space-x-2 shrink-0">
          <CharacterAvatar name="Sara" size="md" />
          <CharacterAvatar name="Sameera" size="md" />
        </div>
      </div>

      <div className="space-y-3.5">
        {lesson2ActivityData.page7Ex5SaraQuestions.map((q) => {
          const currentVal = saraAnswers[q.id] || '';
          const isAnswered = currentVal.trim() !== '';
          const isCorrect =
            isAnswered &&
            q.correctAnswers.some((ans) =>
              currentVal.toLowerCase().includes(ans.toLowerCase())
            );

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border-2 transition-all space-y-2 text-left ${
                ex5Checked
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-rose-400 bg-rose-50/50'
                  : 'border-zinc-200 bg-zinc-50/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-zinc-900 block font-sans">
                      {q.questionEn}
                    </span>
                    {q.questionAr && (
                      <button
                        type="button"
                        onClick={() => toggleTranslation(q.id)}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                          visibleTranslations[q.id]
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                            : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                        }`}
                        title="ترجمة السؤال"
                      >
                        <Languages className="w-3 h-3 text-indigo-600" />
                        <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                      </button>
                    )}
                  </div>
                  {q.questionAr && visibleTranslations[q.id] && (
                    <div
                      className="text-xs text-zinc-700 font-arabic bg-zinc-100/80 p-2 rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150"
                      dir="rtl"
                    >
                      {q.questionAr}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => {
                      setSaraAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                      setEx5Checked(false);
                    }}
                    placeholder="Write answer..."
                    className={`px-3 py-1.5 text-xs border rounded-lg bg-white sm:w-60 focus:ring-1 focus:ring-zinc-900 font-sans ${
                      ex5Checked
                        ? isCorrect
                          ? 'border-emerald-500 text-emerald-800'
                          : 'border-rose-400 text-rose-800'
                        : 'border-zinc-300'
                    }`}
                  />

                  {ex5Checked && (
                    isCorrect ? (
                      <span className="text-emerald-700 font-bold text-xs shrink-0">
                        ✓ صحيح
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md shrink-0 font-sans">
                        الحل الصحيح: {q.correctAnswers[0]}
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
          onClick={checkEx5}
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
        >
          التحقق من الإجابات
        </button>
      </div>
    </div>
  );
};
