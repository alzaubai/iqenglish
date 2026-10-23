import React, { useState } from 'react';
import { lesson5ActivityData, SurveyQuestionItem } from '../../../data/activityBookLesson5Data';
import { Volume2, RotateCcw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise1FrequencySurvey: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, columns, questions } =
    lesson5ActivityData.page12Ex1Survey;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customQuestions] = useState<Record<string, string>>({
    'sq-i': 'read an English story',
    'sq-j': 'help with housework at home',
  });

  const handleSelect = (questionId: string, colKey: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: colKey };
      if (Object.keys(next).length === questions.length) {
        try {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const handleReset = () => {
    setAnswers({});
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

  const generateSentence = (q: SurveyQuestionItem, adverbKey: string): string => {
    const verb = q.isCustomizable ? (customQuestions[q.id] || q.verbPhraseEn) : q.verbPhraseEn;
    if (adverbKey === 'never') {
      return `I never ${verb}.`;
    }
    return `I ${adverbKey} ${verb}.`;
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 12 • Exercise 1
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

      {/* Adverbs Legend / Circle Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {columns.map((col) => (
          <div
            key={col.key}
            className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 flex flex-col items-center text-center gap-1.5"
          >
            <img
              src={col.image}
              alt={col.labelEn}
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
            <div>
              <span className="block font-bold text-xs text-zinc-800 font-arabic">
                {col.labelAr}
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                {col.key} ({col.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Survey Table */}
      <div className="border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 text-xs font-sans font-bold">
                <th className="py-2.5 px-3 w-10 text-center">#</th>
                <th className="py-2.5 px-3">Question / Activity</th>
                {columns.map((col) => (
                  <th key={col.key} className="py-2.5 px-2 text-center w-24">
                    <span className="block text-zinc-900 font-bold">{col.labelEn}</span>
                    <span className="text-[11px] font-normal text-zinc-500 font-arabic">
                      {col.labelAr}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-sm">
              {questions.map((q) => {
                const selectedCol = answers[q.id];

                return (
                  <React.Fragment key={q.id}>
                    <tr className={selectedCol ? 'bg-zinc-50/60' : 'hover:bg-zinc-50/30'}>
                      {/* Letter badge */}
                      <td className="py-3 px-3 text-center font-bold text-xs font-sans text-zinc-500">
                        {q.letter}
                      </td>

                      {/* Question Text */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <p className="font-sans text-xs sm:text-sm font-semibold text-zinc-900">
                              {q.questionEn}
                            </p>
                            <p className="font-arabic text-xs text-zinc-500 text-right" dir="rtl">
                              {q.questionAr}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => playTTS(q.questionEn)}
                            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors shrink-0"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* 5 Radio Selection Columns */}
                      {columns.map((col) => {
                        const isSelected = selectedCol === col.key;

                        return (
                          <td key={col.key} className="py-3 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleSelect(q.id, col.key)}
                              className={`w-7 h-7 rounded-lg mx-auto flex items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-zinc-900 text-white shadow-xs'
                                  : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'
                              }`}
                              title={`${col.labelEn} (${col.labelAr})`}
                            >
                              {isSelected ? (
                                <Check className="w-4 h-4 stroke-[3]" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Auto-generated Sentence Row */}
                    {selectedCol && (
                      <tr className="bg-zinc-50/80 border-b border-zinc-200">
                        <td colSpan={7} className="py-2 px-3 text-left">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-zinc-200 text-zinc-800 text-[11px] font-bold font-sans">
                                Sentence:
                              </span>
                              <span className="font-sans text-xs sm:text-sm font-bold text-zinc-900">
                                {generateSentence(q, selectedCol)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => playTTS(generateSentence(q, selectedCol))}
                              className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-sans flex items-center gap-1 transition-colors"
                              title="Listen"
                            >
                              <Volume2 className="w-3 h-3" />
                              Listen
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Controls */}
      {answeredCount > 0 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-zinc-500 font-arabic" dir="rtl">
            تمت الإجابة على {answeredCount} من أصل {questions.length} فقرة.
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold font-arabic flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            إعادة ضبط الاستبيان
          </button>
        </div>
      )}
    </div>
  );
};
