import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, UserCheck } from 'lucide-react';
import { lesson7ActivityData, PartnerInterviewTurn } from '../../../data/activityBookLesson7Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const ExerciseEPartnerInterview: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, turns } =
    lesson7ActivityData.page16ExEPartnerInterview;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (turnId: string, opt: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [turnId]: opt }));
  };

  const isTurnCorrect = (t: PartnerInterviewTurn) => {
    return selectedAnswers[t.id] === t.correctPartnerResponse;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = turns.every(isTurnCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setSelectedAnswers({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    turns.forEach((t) => {
      model[t.id] = t.correctPartnerResponse;
    });
    setSelectedAnswers(model);
    setIsChecked(true);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = turns.filter(isTurnCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 16 • Exercise E
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {turns.length}
        </div>
      </div>

      {/* Partner Interview Turns */}
      <div className="space-y-4">
        {turns.map((turn) => {
          const selected = selectedAnswers[turn.id] || '';
          const correct = isTurnCorrect(turn);

          return (
            <div
              key={turn.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Question Turn (You ask partner) */}
              <div className="flex items-start justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans shrink-0">
                      Q{turn.questionNumber}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 font-sans uppercase tracking-wider">
                      You ask:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                      &ldquo;{turn.questionEn}&rdquo;
                    </span>
                    <button
                      onClick={() => playTTS(turn.questionEn)}
                      className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                    {turn.questionAr}
                  </p>
                </div>
              </div>

              {/* Partner Response Options */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-zinc-600 font-sans block mb-1">
                  Partner&apos;s answer (اختر إجابة الزميل المناسبة للسؤال):
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {turn.options.map((opt, oIdx) => {
                    const isOptSelected = selected === opt;
                    const isOptCorrect = opt === turn.correctPartnerResponse;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelect(turn.id, opt)}
                        className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isChecked
                            ? isOptCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-900 font-bold'
                              : isOptSelected
                              ? 'border-rose-400 bg-rose-50 text-rose-900'
                              : 'border-zinc-200 bg-white text-zinc-500 opacity-60'
                            : isOptSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white font-bold shadow-xs'
                            : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-sans">
                          {opt}
                        </span>
                        {isChecked && isOptCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isChecked && isOptSelected && !isOptCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes summary badge */}
              {selected && (
                <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs text-zinc-600 font-sans">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-zinc-500" />
                    <strong>Recorded Note:</strong> {turn.notesSummary}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs font-bold font-sans hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Show Model Solution</span>
        </button>
      </div>

      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-between border ${
            correctCount === turns.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
        >
          <span>
            {correctCount === turns.length
              ? 'Excellent conversation! You recorded all partner details correctly.'
              : `You completed ${correctCount} of ${turns.length} turns accurately.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700">
            {correctCount} / {turns.length}
          </span>
        </div>
      )}
    </div>
  );
};
