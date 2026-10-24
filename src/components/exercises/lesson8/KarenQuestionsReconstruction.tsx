import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { lesson8ActivityData, ReconstructedQuestion } from '../../../data/activityBookLesson8Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

// Normalize text for evaluation
const normalize = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s:']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const KarenQuestionsReconstruction: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, items } =
    lesson8ActivityData.reconstructedQuestions;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleTextChange = (itemId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [itemId]: val }));
  };

  const toggleReveal = (itemId: string) => {
    setRevealed((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const isItemCorrect = (item: ReconstructedQuestion): boolean => {
    const userVal = normalize(answers[item.id] || '');
    if (!userVal) return false;

    const normCorrect = normalize(item.correctQuestionEn);
    if (userVal === normCorrect) return true;

    return item.acceptableVariants.some((variant) => {
      const normVariant = normalize(variant);
      return (
        userVal === normVariant ||
        userVal.includes(normVariant) ||
        normVariant.includes(userVal)
      );
    });
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
    setRevealed({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    const rev: Record<string, boolean> = {};
    items.forEach((item) => {
      model[item.id] = item.correctQuestionEn;
      rev[item.id] = true;
    });
    setAnswers(model);
    setRevealed(rev);
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

  const answeredCount = Object.values(answers).filter((v) => v.trim().length > 0).length;
  const correctCount = items.filter(isItemCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <HelpCircle className="w-3.5 h-3.5" />
              Activity Book • Page 18 • Ex. 1 & 2
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              6 Questions
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

      {/* 6 Clues & Writing Lines */}
      <div className="space-y-4">
        {items.map((item) => {
          const userVal = answers[item.id] || '';
          const correct = isItemCorrect(item);
          const isRevealed = revealed[item.id] || false;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50/70 hover:border-zinc-300'
              }`}
            >
              {/* Clue Header */}
              <div className="flex items-start justify-between gap-3 border-b border-zinc-200/70 pb-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {item.letterRef}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-500 font-sans uppercase tracking-wider">
                        Clue:
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                        &ldquo;{item.clueEn}&rdquo;
                      </h5>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                      {item.clueAr}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleReveal(item.id)}
                  className="flex items-center gap-1 text-[11px] font-sans font-semibold text-zinc-500 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer shrink-0"
                  title={isRevealed ? 'Hide question' : 'Show question'}
                >
                  {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{isRevealed ? 'Hide' : 'Answer'}</span>
                </button>
              </div>

              {/* Direct Writing Line */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    placeholder="Write Karen's full question here... (e.g. Are you back at school now?)"
                    className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none transition-all placeholder:text-zinc-400 ${
                      isChecked
                        ? correct
                          ? 'border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                          : 'border-rose-300 focus:ring-1 focus:ring-rose-300'
                        : 'border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'
                    }`}
                  />
                  {isChecked && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>

                {isRevealed && (
                  <div className="p-2.5 bg-zinc-100 rounded-lg text-xs font-sans text-zinc-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-zinc-900">Karen&apos;s Full Question:</span>
                      <span className="font-semibold text-emerald-700">{item.correctQuestionEn}</span>
                    </div>
                    <button
                      onClick={() => playTTS(item.correctQuestionEn)}
                      className="p-1 text-zinc-500 hover:text-zinc-800 rounded transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Feedback */}
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
                      {correct
                        ? 'صياغة صحيحة ومطابقة للسؤال في الرسالة!'
                        : `السؤال الصحيح: ${item.correctQuestionEn}`}
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
            <span>Check questions</span>
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
          <span>Show All 6 Questions</span>
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
              ? 'Great job! All 6 questions reconstructed perfectly.'
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
