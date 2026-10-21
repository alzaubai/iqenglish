import React, { useState } from 'react';
import { RotateCcw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface ExamPracticeTabProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const ExamPracticeTab: React.FC<ExamPracticeTabProps> = ({ currentTopic, onSpeak }) => {
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

  if (!currentTopic.examPractice || currentTopic.examPractice.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
          <div>
            <span className="text-xs font-bold text-purple-700 font-arabic block">
              نماذج الامتحانات الشهرية ونصف السنة
            </span>
            <h4 className="text-lg sm:text-xl font-black text-purple-950 font-arabic mt-0.5">
              تدريبات امتحانية تفاعلية من تمارين الكتاب
            </h4>
          </div>
          <button
            onClick={handleResetPractice}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-purple-200 hover:bg-purple-50 text-purple-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الحل</span>
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
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isRevealed
                    ? isCorrect
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-zinc-300 bg-white'
                    : 'border-zinc-200 bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <button
                    onClick={() => onSpeak(q.questionEn)}
                    className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    title="استمع للسؤال"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-zinc-500 font-arabic mb-1">
                  {q.questionAr}
                </p>
                <h5 className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-3" dir="ltr">
                  {q.questionEn}
                </h5>

                {/* Options if choice or correct */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                        btnClass = 'bg-purple-600 text-white border-purple-600';
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

                {/* If transform question */}
                {!q.options && (
                  <div className="pt-1">
                    {!isRevealed ? (
                      <button
                        onClick={() => handleSelectAnswer(q.id, q.correctAnswer, true)}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 cursor-pointer font-arabic"
                      >
                        إظهار الإجابة النموذجية
                      </button>
                    ) : (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-left" dir="ltr">
                        <span className="text-xs font-bold text-emerald-800 font-sans block">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation */}
                {isRevealed && (
                  <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200 text-zinc-700 leading-relaxed">
                    <span className="font-bold text-zinc-900">توضيح المعلم:</span> {q.explanationAr}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
