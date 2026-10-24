import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import { lesson6ActivityData, GuidedDialogueTurn } from '../../../data/activityBookLesson6Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const Exercise2PartnerDialogue: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, turns } =
    lesson6ActivityData.page15Ex2Dialogue;

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (turnId: string, opt: string) => {
    setSelectedChoices((prev) => ({ ...prev, [turnId]: opt }));
  };

  const isTurnCorrect = (t: GuidedDialogueTurn) => {
    return selectedChoices[t.id] === t.correctResponse;
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
    setSelectedChoices({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    turns.forEach((t) => {
      model[t.id] = t.correctResponse;
    });
    setSelectedChoices(model);
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

  const answeredCount = Object.keys(selectedChoices).length;
  const correctCount = turns.filter(isTurnCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 15 • Exercise 2
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}: {instructionEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {turns.length}
        </div>
      </div>

      {/* Dialogue Conversation Turns */}
      <div className="space-y-4">
        {turns.map((turn, idx) => {
          const selected = selectedChoices[turn.id] || '';
          const correct = isTurnCorrect(turn);

          return (
            <div
              key={turn.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Speaker Hanaa prompt */}
              <div className="flex items-start justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-zinc-600 font-sans uppercase">
                      {turn.speaker}:
                    </span>
                    <span className="text-sm font-bold text-zinc-900 font-sans">
                      "{turn.promptEn}"
                    </span>
                    <button
                      type="button"
                      onClick={() => playTTS(turn.promptEn)}
                      className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                    {turn.promptAr}
                  </p>
                </div>

                {isChecked && (
                  <div>
                    {correct ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 font-bold text-xs font-sans">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Rafel's response options */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-600 font-sans block">
                  Rafel's Response (اختر رد رافل):
                </span>

                <div className="grid grid-cols-1 gap-1.5">
                  {turn.options.map((opt) => {
                    const isChosen = selected === opt;

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelect(turn.id, opt)}
                        className={`p-2.5 rounded-lg border text-left text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isChosen
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                            : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        <span>{opt}</span>
                        <span className={`text-[11px] font-bold ${isChosen ? 'text-zinc-300' : 'text-zinc-400'}`}>
                          {isChosen ? 'Selected ✓' : 'Select'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {isChecked && !correct && (
                  <div className="text-[11px] text-rose-700 font-bold font-arabic text-right pt-1" dir="rtl">
                    الرد النموذجي: <strong className="font-sans underline">{turn.correctResponse}</strong>
                  </div>
                )}
              </div>
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
            <span>فحص الإجابات {isChecked ? `(${correctCount}/${turns.length})` : ''}</span>
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
