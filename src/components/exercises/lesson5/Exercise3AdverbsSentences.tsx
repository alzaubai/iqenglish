import React, { useState } from 'react';
import { lesson5ActivityData, CircleSentenceItem } from '../../../data/activityBookLesson5Data';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Sparkles, Lightbulb, Eye, PenTool } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise3AdverbsSentences: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, sentences } =
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
          particleCount: 80,
          spread: 70,
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
    <div className="space-y-6" dir="rtl">
      {/* Exercise Header */}
      <div className="bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-emerald-600/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <PenTool className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-xs font-black">
                  كتاب النشاط ص 13
                </span>
                <span className="text-emerald-200 text-xs font-mono">Exercise 3: Complete</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-arabic mt-1">{titleAr}</h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-sans">{titleEn}</p>
            </div>
          </div>

          <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold font-arabic">
            {answeredCount} / {sentences.length} مكتمل
          </div>
        </div>
        <div className="mt-3 text-xs sm:text-sm text-emerald-100/90 font-arabic leading-relaxed flex flex-col gap-0.5">
          <span>{instructionAr}</span>
          <span className="text-xs text-emerald-200/80 font-mono" dir="ltr">
            {instructionEn}
          </span>
        </div>
      </div>

      {/* 6 Sentences Cards */}
      <div className="space-y-4">
        {sentences.map((s) => {
          const isCorrect = isItemCorrect(s);
          const userVal = inputs[s.id] || '';
          const showAnswer = revealed[s.id];

          return (
            <div
              key={s.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Letter & Percentage Circle Image */}
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                    {s.letter}
                  </span>

                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-xl">
                    <img
                      src={s.circleImage}
                      alt={`${s.percentage}%`}
                      className="w-8 h-8 object-contain shrink-0"
                      loading="lazy"
                    />
                    <div className="text-left font-mono">
                      <span className="text-xs font-bold text-zinc-800 block">
                        {s.percentage}%
                      </span>
                      <span className="text-[11px] text-zinc-500 font-arabic">
                        {s.adverbAr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                {isSubmitted && (
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs font-arabic">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        صحيح
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 font-bold text-xs font-arabic">
                        <XCircle className="w-5 h-5 text-rose-600" />
                        غير مطابق
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Fill-in Sentence Box */}
              <div className="mt-3.5 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 text-left" dir="ltr">
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono text-zinc-900 leading-relaxed">
                  <span className="font-bold">{s.prefixEn}</span>

                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => handleInputChange(s.id, e.target.value)}
                    disabled={isSubmitted}
                    placeholder={`... (${s.verbInBrackets})`}
                    className={`px-3 py-1.5 rounded-lg border text-sm sm:text-base font-mono font-bold transition-all focus:outline-hidden min-w-[150px] max-w-[220px] ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                          : 'bg-rose-100 border-rose-400 text-rose-950'
                        : 'bg-white border-zinc-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                    }`}
                  />

                  <span>{s.suffixEn}</span>
                  <span className="text-xs font-bold text-zinc-400 font-mono">
                    ({s.verbInBrackets})
                  </span>
                </div>

                {/* Arabic Translation */}
                <p className="mt-2 text-xs text-zinc-600 font-arabic text-right" dir="rtl">
                  {s.fullSentenceAr}
                </p>
              </div>

              {/* Answer & Explanation Section */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playTTS(`${s.prefixEn} ${s.correctAnswer} ${s.suffixEn}`)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                    title="استمع للجملة كاملة"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    استمع للجملة
                  </button>

                  <button
                    onClick={() => toggleReveal(s.id)}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-arabic flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {showAnswer ? 'إخفاء الإجابة' : 'كشف الإجابة'}
                  </button>
                </div>

                {(isSubmitted || showAnswer) && (
                  <div className="bg-emerald-100/70 text-emerald-950 px-3 py-1 rounded-lg font-mono text-xs font-bold border border-emerald-200">
                    الحل: <span className="underline">{s.correctAnswer}</span>
                  </div>
                )}
              </div>

              {/* Detailed Grammar Explanation */}
              {(isSubmitted || showAnswer) && (
                <div className="mt-2.5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-right space-y-1">
                  <div className="flex items-start gap-1.5 text-xs text-blue-900 font-arabic">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{s.ruleExplanationAr}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Controls & Results */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={answeredCount === 0}
            className={`px-6 py-3 rounded-xl font-bold font-arabic text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
              answeredCount > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md active:scale-98'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            تحقق من الإجابات ({answeredCount}/{sentences.length})
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-emerald-50 text-emerald-900 px-4 py-2.5 rounded-xl border border-emerald-200 font-bold font-arabic text-sm">
              النتيجة: {correctCount} من {sentences.length} صحيحة
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold font-arabic text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
