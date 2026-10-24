import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, RefreshCw, Eye, EyeOff, BookOpen, Languages } from 'lucide-react';
import { lesson3ActivityData, StoryQuestionItem } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface ExerciseASBQuestionsProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const ExerciseASBQuestions: React.FC<ExerciseASBQuestionsProps> = ({ onProgressUpdate }) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const questions = lesson3ActivityData.page6StudentBookQuestions;

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const totalRevealed = Object.values(updated).filter(Boolean).length;
      if (totalRevealed === questions.length) {
        confetti({ particleCount: 35, spread: 60 });
        playSuccessChime();
        onProgressUpdate(true);
      }
      return updated;
    });
  };

  const handleRevealAllQuestions = () => {
    const allRev: Record<string, boolean> = {};
    questions.forEach((q) => {
      allRev[q.id] = true;
    });
    setRevealedAnswers(allRev);
    confetti({ particleCount: 40, spread: 65 });
    playSuccessChime();
    onProgressUpdate(true);
  };

  const resetAll = () => {
    setRevealedAnswers({});
    setUserInputs({});
  };

  return (
    <div className="space-y-5" dir="ltr">
      {/* Exercise Header Card matching Student's Book Page 6 Ex A */}
      <div className="bg-white rounded-2xl border border-sky-200/80 p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-100 text-sky-800 border border-sky-300 font-arabic">
                📘 كتاب الطالب (Student's Book)
              </span>
              <span className="text-xs font-bold text-zinc-500 font-sans">
                Page 6 • Exercise A
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
              Mariam and Khalid: Comprehension Questions
            </h4>
          </div>

          <button
            type="button"
            onClick={handleRevealAllQuestions}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 flex items-center gap-1.5 transition-all cursor-pointer font-arabic shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>إظهار جميع الأجوبة النموذجية</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed relative z-10" dir="rtl">
          أجب عن الأسئلة الخمسة الخاصة بمحادثة مريم وخالد وقصة رحلة القارب وطائر البجع (الأسئلة بالإنجليزية، واضغط على زر الترجمة عند الحاجة):
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {questions.map((q) => {
          const isRevealed = revealedAnswers[q.id];
          const currentAnswer = userInputs[q.id] || '';

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border transition-all p-4 shadow-2xs space-y-3 text-left ${
                isRevealed ? 'border-sky-300 bg-sky-50/20' : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-black flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {q.questionNumber}
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900 font-sans leading-snug">
                      {q.questionEn}
                    </h5>
                    {visibleTranslations[q.id] && (
                      <p className="text-xs text-zinc-700 font-arabic mt-1.5 bg-zinc-100 p-2 rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150 leading-relaxed" dir="rtl">
                        {q.questionAr}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleTranslation(q.id)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      visibleTranslations[q.id]
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                    title="ترجمة السؤال"
                  >
                    <Languages className="w-3 h-3 text-indigo-600" />
                    <span>{visibleTranslations[q.id] ? 'إخفاء' : 'ترجمة السؤال'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRevealAnswer(q.id)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      isRevealed
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'إخفاء الحل' : 'عرض الحل'}</span>
                  </button>
                </div>
              </div>

              {/* Student Practice Input */}
              <div className="pt-1">
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setUserInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder="Type your answer here in English..."
                  className="w-full px-3.5 py-2 text-xs font-sans rounded-lg border border-zinc-200 focus:border-zinc-900 outline-none text-zinc-900 bg-zinc-50/50"
                />
              </div>

              {/* Model Answer Display */}
              {isRevealed && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-arabic space-y-1.5 text-right animate-in fade-in duration-150" dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>الجواب الوزاري النموذجي:</span>
                  </div>
                  <p className="font-sans font-bold text-zinc-900 text-left text-xs bg-white p-2.5 rounded-lg border border-emerald-200" dir="ltr">
                    {q.modelAnswerEn}
                  </p>
                  <p className="text-[11px] text-zinc-600 pt-0.5">
                    الترجمة: {q.modelAnswerAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={resetAll}
          className="px-3.5 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-600 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة تصفير الإجابات</span>
        </button>
      </div>
    </div>
  );
};
