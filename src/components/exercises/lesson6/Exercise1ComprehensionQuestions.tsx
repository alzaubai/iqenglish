import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, Eye, Languages } from 'lucide-react';
import { lesson6ActivityData, ComprehensionQuestionItem } from '../../../data/activityBookLesson6Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const Exercise1ComprehensionQuestions: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, questions } =
    lesson6ActivityData.page15Ex1Questions;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (id: string, val: string) => {
    if (isChecked) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleSelectOption = (id: string, opt: string) => {
    if (isChecked) return;
    setAnswers((prev) => ({ ...prev, [id]: opt }));
  };

  const isItemCorrect = (q: ComprehensionQuestionItem) => {
    const userVal = (answers[q.id] || '').trim().toLowerCase();
    return q.acceptableAnswers.map((a) => a.toLowerCase()).includes(userVal);
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = questions.every(isItemCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
    setRevealed({});
  };

  const toggleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    questions.forEach((q) => {
      model[q.id] = q.correctAnswer;
    });
    setAnswers(model);
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

  const answeredCount = Object.keys(answers).filter((k) => (answers[k] || '').trim().length > 0).length;
  const correctCount = questions.filter(isItemCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Student's Book p. 9 • Activity Book p. 15 • Exercise 1
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}: {instructionEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {questions.length}
        </div>
      </div>

      {/* The 5 Questions */}
      <div className="space-y-3.5">
        {questions.map((q) => {
          const userVal = answers[q.id] || '';
          const correct = isItemCorrect(q);
          const showAnswer = revealed[q.id];

          return (
            <div
              key={q.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans uppercase shrink-0">
                    {q.letter}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
                        {q.questionEn}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
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
                          onClick={() => playTTS(q.questionEn)}
                          className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {visibleTranslations[q.id] && (
                      <span className="text-xs text-zinc-600 font-arabic block text-right mt-1.5 bg-zinc-100 p-1.5 rounded-md border border-zinc-200 animate-in fade-in duration-150" dir="rtl">
                        {q.questionAr}
                      </span>
                    )}
                  </div>
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

              {/* Input field */}
              <div className="pt-0.5 space-y-2">
                <input
                  type="text"
                  value={userVal}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  disabled={isChecked}
                  placeholder="Type your answer or select from options below..."
                  className={`w-full px-3 py-1.5 text-sm font-bold font-sans rounded-lg border transition-all outline-none ${
                    isChecked
                      ? correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                        : 'border-rose-400 bg-rose-50 text-rose-950'
                      : 'border-zinc-300 bg-white focus:border-zinc-900 text-zinc-900'
                  }`}
                />

                {/* Quick Options Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-zinc-400 font-arabic mr-1" dir="rtl">
                    خيارات مقترحة:
                  </span>
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectOption(q.id, opt)}
                      disabled={isChecked}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold font-sans transition-all cursor-pointer border ${
                        userVal.toLowerCase() === opt.toLowerCase()
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls & Answers */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => toggleReveal(q.id)}
                  className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-arabic flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  {showAnswer ? 'إخفاء الإجابة' : 'كشف الإجابة'}
                </button>

                {(isChecked || showAnswer) && (
                  <div className="bg-zinc-100 text-zinc-900 px-2.5 py-1 rounded-md font-sans text-xs font-bold">
                    Answer: <span className="underline">{q.correctAnswer}</span>
                  </div>
                )}
              </div>

              {(isChecked || showAnswer) && (
                <div className="p-2 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-arabic text-right space-y-1 border border-zinc-200" dir="rtl">
                  <p>{q.explanationAr}</p>
                </div>
              )}
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
            <span>فحص الإجابات {isChecked ? `(${correctCount}/${questions.length})` : ''}</span>
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
