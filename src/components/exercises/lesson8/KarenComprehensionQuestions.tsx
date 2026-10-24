import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, Eye, EyeOff, BookOpen, Languages } from 'lucide-react';
import { lesson8ActivityData, KarenComprehensionQuestion } from '../../../data/activityBookLesson8Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

// Normalize text for flexible grading
const normalize = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s:']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const KarenComprehensionQuestions: React.FC = () => {
  const { titleEn, instructionAr, questions } =
    lesson8ActivityData.comprehensionQuestions;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});
  const [isChecked, setIsChecked] = useState(false);

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTextChange = (questionId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const toggleReveal = (questionId: string) => {
    setRevealedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const isQuestionCorrect = (q: KarenComprehensionQuestion): boolean => {
    const userVal = normalize(answers[q.id] || '');
    if (!userVal) return false;

    const normCorrect = normalize(q.correctAnswer);
    if (userVal === normCorrect) return true;

    return q.acceptableAnswers.some((acceptable) => {
      const normAcceptable = normalize(acceptable);
      return (
        userVal === normAcceptable ||
        userVal.includes(normAcceptable) ||
        normAcceptable.includes(userVal)
      );
    });
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = questions.every(isQuestionCorrect);
    if (allCorrect) {
      confetti({ particleCount: 50, spread: 70 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setAnswers({});
    setRevealedQuestions({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    const revealed: Record<string, boolean> = {};
    questions.forEach((q) => {
      model[q.id] = q.correctAnswer;
      revealed[q.id] = true;
    });
    setAnswers(model);
    setRevealedQuestions(revealed);
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <BookOpen className="w-3.5 h-3.5" />
              Student&apos;s Book • Page 11
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-arabic" dir="rtl">
              أسئلة الامتحان المدرسي • 5 أسئلة
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>

        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-arabic shrink-0 self-start sm:self-center" dir="rtl">
          تمت الإجابة: {answeredCount} من {questions.length}
        </div>
      </div>

      {/* 5 Questions - Pure English without translation underneath */}
      <div className="space-y-4">
        {questions.map((q) => {
          const userVal = answers[q.id] || '';
          const correct = isQuestionCorrect(q);
          const isRevealed = revealedQuestions[q.id] || false;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50/70 hover:border-zinc-300'
              }`}
            >
              {/* Question text */}
              <div className="flex flex-col gap-1.5 border-b border-zinc-200/70 pb-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0">
                      {q.number}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                        {q.questionEn}
                      </h5>
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
                          onClick={() => playTTS(q.questionEn)}
                          className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                          title="Listen to question"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="flex items-center gap-1 text-[11px] font-arabic font-bold text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0"
                    title={isRevealed ? 'إخفاء الحل النموذجي' : 'إظهار الحل النموذجي'}
                  >
                    {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{isRevealed ? 'إخفاء الحل' : 'عرض الحل'}</span>
                  </button>
                </div>

                {visibleTranslations[q.id] && (
                  <p className="text-xs text-zinc-600 font-arabic text-right bg-zinc-100 p-1.5 rounded-md border border-zinc-200 animate-in fade-in duration-150" dir="rtl">
                    {q.questionAr}
                  </p>
                )}
              </div>

              {/* Direct Writing Line */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="اكتب إجابتك بالإنجليزية هنا..."
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
                      <span className="font-bold text-zinc-900 font-arabic" dir="rtl">الحل النموذجي المعتمد:</span>
                      <span className="font-semibold text-emerald-700">{q.correctAnswer}</span>
                    </div>
                    <button
                      onClick={() => playTTS(q.correctAnswer)}
                      className="p-1 text-zinc-500 hover:text-zinc-800 rounded transition-colors"
                      title="Listen to model answer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Feedback when checked */}
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
                        ? 'إجابة صحيحة ومقبولة في الامتحان!'
                        : `الحل النموذجي المعتمد: ${q.correctAnswer}`}
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

      {/* Footer Controls in Arabic */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 font-arabic" dir="rtl">
        <div className="flex items-center gap-2">
          <button
            onClick={checkAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تحقق من الإجابات</span>
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة تعيين</span>
          </button>
        </div>

        <button
          onClick={solveAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-600 hover:text-zinc-900 text-xs font-bold hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>عرض كل الحلول النموذجية</span>
        </button>
      </div>

      {/* Result Banner in Arabic */}
      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-arabic flex items-center justify-between border ${
            correctCount === questions.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
          dir="rtl"
        >
          <span>
            {correctCount === questions.length
              ? 'ممتاز جداً! تمت الإجابة على جميع الأسئلة الاستيعابية بدقة كاملة.'
              : `أجبت على ${correctCount} من ${questions.length} أسئلة بشكل صحيح.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700 font-sans">
            {correctCount} / {questions.length}
          </span>
        </div>
      )}
    </div>
  );
};
