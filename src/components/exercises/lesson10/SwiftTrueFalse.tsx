import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, HelpCircle } from 'lucide-react';
import { lesson10ActivityData, SwiftTrueFalseItem } from '../../../data/activityBookLesson10Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const SwiftTrueFalse: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, items } =
    lesson10ActivityData.page21TrueFalse;

  const [answers, setAnswers] = useState<Record<string, 'True' | 'False'>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (itemId: string, choice: 'True' | 'False') => {
    setAnswers((prev) => ({ ...prev, [itemId]: choice }));
  };

  const isItemCorrect = (item: SwiftTrueFalseItem): boolean => {
    return answers[item.id] === item.correctAnswer;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isItemCorrect);
    if (allCorrect) {
      confetti({ particleCount: 50, spread: 70 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, 'True' | 'False'> = {};
    items.forEach((item) => {
      model[item.id] = item.correctAnswer;
    });
    setAnswers(model);
    setIsChecked(true);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = items.filter(isItemCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <HelpCircle className="w-3.5 h-3.5" />
              Activity Book • Page 21
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              True or False • 6 Statements
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>

        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-sans shrink-0 self-start sm:self-center">
          Answered: {answeredCount} / {items.length}
        </div>
      </div>

      {/* 6 Statements */}
      <div className="space-y-3.5">
        {items.map((item) => {
          const selected = answers[item.id];
          const correct = isItemCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {item.number}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans leading-snug">
                        {item.statementEn}
                      </p>
                      <button
                        onClick={() => playTTS(item.statementEn)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                      {item.statementAr}
                    </p>
                  </div>
                </div>

                {/* True / False Choice Buttons (Tick) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSelect(item.id, 'True')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      selected === 'True'
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    True
                  </button>
                  <button
                    onClick={() => handleSelect(item.id, 'False')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      selected === 'False'
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    False
                  </button>
                </div>
              </div>

              {/* Feedback and Explanation when checked */}
              {isChecked && (
                <div
                  className={`pt-2.5 border-t text-xs font-arabic space-y-1 ${
                    correct
                      ? 'border-emerald-200 text-emerald-800'
                      : 'border-rose-200 text-rose-800'
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>
                      {correct ? 'إجابة صحيحة!' : `الإجابة الصحيحة هي: ${item.correctAnswer}`}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed mr-5">
                    {item.explanationAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={checkAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check answers</span>
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <button
          onClick={solveAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-600 hover:text-zinc-900 text-xs font-bold font-sans hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Show Model Solutions</span>
        </button>
      </div>

      {/* Result Banner */}
      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-between border ${
            correctCount === items.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
        >
          <span>
            {correctCount === items.length
              ? 'Great work! All 6 True/False statements solved accurately.'
              : `You got ${correctCount} of ${items.length} correct.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700">
            {correctCount} / {items.length}
          </span>
        </div>
      )}
    </div>
  );
};
