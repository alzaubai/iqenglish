import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, HelpCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { lesson7ActivityData, AhmedComprehensionQuestion } from '../../../data/activityBookLesson7Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const AhmedComprehensionQuestions: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, questions } =
    lesson7ActivityData.page17AhmedQuestions;

  // Selected or typed answers: questionId -> string
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectOption = (questionId: string, opt: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: opt }));
  };

  const handleTextChange = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const isQuestionCorrect = (q: AhmedComprehensionQuestion) => {
    const userVal = (answers[q.id] || '').trim().toLowerCase();
    if (!userVal) return false;

    if (!isTypingMode) {
      return answers[q.id] === q.correctAnswer;
    }

    // Direct writing mode: check acceptable list
    return (
      q.acceptableAnswers.some((ans) => userVal === ans.toLowerCase()) ||
      userVal.includes(q.correctAnswer.toLowerCase())
    );
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = questions.every(isQuestionCorrect);
    if (allCorrect) {
      confetti({ particleCount: 55, spread: 75 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
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
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const answeredCount = Object.values(answers).filter((v) => v.trim().length > 0).length;
  const correctCount = questions.filter(isQuestionCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 17 • Ministerial Exam Questions (8 Questions)
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>

        {/* Controls: Mode toggle & answered counter */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setIsTypingMode(!isTypingMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors font-sans cursor-pointer"
            title="Toggle between multiple choice and direct typing mode"
          >
            {isTypingMode ? (
              <>
                <ToggleRight className="w-4 h-4 text-zinc-900" />
                <span>Typing Mode</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 text-zinc-500" />
                <span>Multiple Choice</span>
              </>
            )}
          </button>
          <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-sans">
            Answered: {answeredCount} / {questions.length}
          </div>
        </div>
      </div>

      {/* 8 Questions List */}
      <div className="space-y-4">
        {questions.map((q) => {
          const userVal = answers[q.id] || '';
          const correct = isQuestionCorrect(q);

          return (
            <div
              key={q.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Question line */}
              <div className="flex items-start justify-between gap-3 border-b border-zinc-200/70 pb-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {q.number}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                        {q.questionEn}
                      </h5>
                      <button
                        onClick={() => playTTS(q.questionEn)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                        title="Listen to question"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                      {q.questionAr}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-sans font-semibold text-zinc-400 bg-white border border-zinc-200 px-2 py-0.5 rounded-md shrink-0">
                  Scene {q.sceneRef}
                </span>
              </div>

              {/* Answering area: Either Multiple Choice or Typing Input */}
              {isTypingMode ? (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="Type your answer in English here..."
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userVal === opt;
                    const isOptionCorrect = opt === q.correctAnswer;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={`p-2.5 rounded-xl border text-left text-xs sm:text-sm font-sans transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isChecked
                            ? isOptionCorrect
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-900 font-bold'
                              : isSelected
                              ? 'border-rose-400 bg-rose-50 text-rose-900'
                              : 'border-zinc-200 bg-white text-zinc-500 opacity-60'
                            : isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white font-bold shadow-xs'
                            : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <span>{opt}</span>
                        {isChecked && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isChecked && isSelected && !isOptionCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Checked Feedback */}
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
                        ? 'إجابة صحيحة نموذجية!'
                        : `الإجابة النموذجية هي: ${q.correctAnswer}`}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed mr-5">
                    {q.explanationAr}
                  </p>
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
          <span>Show Model Solutions</span>
        </button>
      </div>

      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-between border ${
            correctCount === questions.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
        >
          <span>
            {correctCount === questions.length
              ? 'Outstanding! All 8 ministerial questions answered accurately.'
              : `You got ${correctCount} of ${questions.length} correct. Check feedback above.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700">
            {correctCount} / {questions.length}
          </span>
        </div>
      )}
    </div>
  );
};
