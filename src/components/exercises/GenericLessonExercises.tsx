import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GenericExercise } from '../../data/activityBookAllLessons';

interface GenericLessonExercisesProps {
  exercises: GenericExercise[];
  onProgressUpdate: (completed: boolean) => void;
}

export const GenericLessonExercises: React.FC<GenericLessonExercisesProps> = ({
  exercises,
  onProgressUpdate,
}) => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState<Record<number, boolean>>({});

  const currentEx = exercises[activeExerciseIndex] || exercises[0];

  if (!exercises || exercises.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center text-zinc-500 font-arabic">
        لا توجد تمارين إضافية مسجلة لهذا الدرس حالياً.
      </div>
    );
  }

  const handleSelectAnswer = (itemId: string, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }));
    setIsChecked((prev) => ({
      ...prev,
      [activeExerciseIndex]: false,
    }));
  };

  const checkCurrentExercise = () => {
    setIsChecked((prev) => ({
      ...prev,
      [activeExerciseIndex]: true,
    }));

    let allCorrect = true;
    currentEx.items.forEach((item) => {
      const ans = userAnswers[item.id] || '';
      if (ans.trim().toLowerCase() !== item.correctAnswer.trim().toLowerCase()) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      confetti({ particleCount: 40, spread: 60 });
      onProgressUpdate(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Tabs Bar: starts from Right to Left (تمرين 1, تمرين 2 ...) */}
      <div className="flex flex-wrap gap-2 text-right" dir="rtl">
        {exercises.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => setActiveExerciseIndex(idx)}
            className={`py-3 px-5 text-center rounded-xl font-bold text-sm transition-all cursor-pointer font-arabic ${
              activeExerciseIndex === idx
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700'
            }`}
          >
            تمرين {ex.exerciseNumber}
          </button>
        ))}
      </div>

      {/* Exercise Content Card (arranged LTR) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
        <div className="pb-3 border-b border-zinc-200">
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page {currentEx.pageNumber} • Exercise {currentEx.exerciseNumber}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
            {currentEx.titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
            {currentEx.titleAr}
          </p>
        </div>

        {/* Question Items */}
        <div className="space-y-3">
          {currentEx.items.map((item) => {
            const currentAns = userAnswers[item.id] || '';
            const isItemAnswered = currentAns.trim() !== '';
            const isItemCorrect =
              isItemAnswered &&
              currentAns.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase();
            const checkedThisEx = isChecked[activeExerciseIndex] || false;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left ${
                  checkedThisEx
                    ? isItemCorrect
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-rose-400 bg-rose-50/50'
                    : 'border-zinc-200 bg-zinc-50/40'
                }`}
              >
                {/* Left: English on top, Arabic underneath */}
                <div>
                  <span className="text-sm font-bold text-zinc-900 block font-sans">
                    {item.promptEn}
                  </span>
                  <span className="text-xs text-zinc-500 font-arabic block mt-0.5" dir="rtl">
                    {item.promptAr}
                  </span>
                </div>

                {/* Right: Answer options */}
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                  {item.type === 'true-false' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectAnswer(item.id, 'True')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans ${
                          currentAns === 'True'
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        ✓ True (صح)
                      </button>
                      <button
                        onClick={() => handleSelectAnswer(item.id, 'False')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans ${
                          currentAns === 'False'
                            ? 'bg-zinc-800 text-white shadow-xs'
                            : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        ✗ False (خطأ)
                      </button>
                    </div>
                  ) : item.options ? (
                    <select
                      value={currentAns}
                      onChange={(e) => handleSelectAnswer(item.id, e.target.value)}
                      className={`text-xs font-bold p-2.5 border rounded-lg bg-white font-sans ${
                        checkedThisEx
                          ? isItemCorrect
                            ? 'border-emerald-500 text-emerald-800'
                            : 'border-rose-400 text-rose-800'
                          : 'border-zinc-300'
                      }`}
                    >
                      <option value="">Choose answer...</option>
                      {item.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : null}

                  {/* If checked: if correct show check, if wrong show correct answer in GREEN in front */}
                  {checkedThisEx && (
                    isItemCorrect ? (
                      <span className="text-emerald-700 font-bold text-xs shrink-0">
                        ✓ إجابة صحيحة
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md shrink-0 font-sans">
                        الحل الصحيح: {item.correctAnswer}
                      </span>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button without spoiler */}
        <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
          <button
            onClick={checkCurrentExercise}
            className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
          >
            التحقق من الإجابات
          </button>
        </div>
      </div>
    </div>
  );
};
