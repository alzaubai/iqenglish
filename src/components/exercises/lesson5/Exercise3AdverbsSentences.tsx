import React, { useState } from 'react';
import { lesson5ActivityData, CircleSentenceItem } from '../../../data/activityBookLesson5Data';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise3AdverbsSentences: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, sentences } =
    lesson5ActivityData.page13Ex3Sentences;

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleInputChange = (id: string, val: string) => {
    if (isSubmitted) return;
    setInputs((prev) => ({ ...prev, [id]: val }));
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = sentences.every((s) => {
      const userVal = (inputs[s.id] || '').trim().toLowerCase();
      return s.acceptableAnswers.map((a) => a.toLowerCase()).includes(userVal);
    });

    if (allCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setInputs({});
    setIsSubmitted(false);
    setRevealed({});
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const isItemCorrect = (s: CircleSentenceItem) => {
    const val = (inputs[s.id] || '').trim().toLowerCase();
    return s.acceptableAnswers.map((a) => a.toLowerCase()).includes(val);
  };

  const answeredCount = Object.keys(inputs).filter((k) => (inputs[k] || '').trim().length > 0).length;
  const correctCount = sentences.filter((s) => isItemCorrect(s)).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 13 • Exercise 3
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}: {instructionEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {sentences.length}
        </div>
      </div>

      {/* 6 Sentences Items */}
      <div className="space-y-3">
        {sentences.map((s) => {
          const isCorrect = isItemCorrect(s);
          const userVal = inputs[s.id] || '';
          const showAnswer = revealed[s.id];

          return (
            <div
              key={s.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                {/* Letter & Percentage Circle Badge */}
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                    {s.letter}
                  </span>

                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-2 py-0.5 rounded-lg">
                    <img
                      src={s.circleImage}
                      alt={`${s.percentage}%`}
                      className="w-5 h-5 object-contain shrink-0"
                      loading="lazy"
                    />
                    <span className="text-xs font-mono font-bold text-zinc-700">
                      {s.percentage}%
                    </span>
                    <span className="text-[11px] text-zinc-500 font-arabic">
                      ({s.adverbAr})
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                {isSubmitted && (
                  <div>
                    {isCorrect ? (
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

              {/* Fill-in Sentence */}
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <div className="flex flex-wrap items-center gap-1.5 text-sm font-sans font-medium text-zinc-900">
                  <span className="font-bold">{s.prefixEn}</span>

                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => handleInputChange(s.id, e.target.value)}
                    disabled={isSubmitted}
                    placeholder={`... (${s.verbInBrackets})`}
                    className={`px-2.5 py-1 rounded-md border text-sm font-mono font-bold transition-all focus:outline-hidden min-w-[140px] max-w-[200px] ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                          : 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-zinc-50 border-zinc-300 focus:bg-white focus:border-zinc-900'
                    }`}
                  />

                  <span>{s.suffixEn}</span>
                  <span className="text-xs font-bold text-zinc-400 font-mono">
                    ({s.verbInBrackets})
                  </span>
                </div>

                <p className="mt-1.5 text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                  {s.fullSentenceAr}
                </p>
              </div>

              {/* Controls & Answers */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-zinc-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => playTTS(`${s.prefixEn} ${s.correctAnswer} ${s.suffixEn}`)}
                    className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                    title="Listen"
                  >
                    <Volume2 className="w-3 h-3" />
                    Listen
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleReveal(s.id)}
                    className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-arabic flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    {showAnswer ? 'إخفاء الإجابة' : 'كشف الإجابة'}
                  </button>
                </div>

                {(isSubmitted || showAnswer) && (
                  <div className="bg-zinc-100 text-zinc-900 px-2.5 py-1 rounded-md font-mono text-xs font-bold">
                    Answer: <span className="underline">{s.correctAnswer}</span>
                  </div>
                )}
              </div>

              {(isSubmitted || showAnswer) && (
                <div className="mt-2 p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-right text-xs text-zinc-600 font-arabic" dir="rtl">
                  {s.ruleExplanationAr}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Controls & Results */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200">
        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={answeredCount === 0}
            className={`px-5 py-2.5 rounded-xl font-bold font-arabic text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
              answeredCount > 0
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white active:scale-98'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            تحقق من الإجابات ({answeredCount}/{sentences.length})
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-zinc-100 text-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-200 font-bold font-arabic text-xs sm:text-sm">
              النتيجة: {correctCount} من {sentences.length} صحيحة
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold font-arabic text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
