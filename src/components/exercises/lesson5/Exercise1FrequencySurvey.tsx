import React, { useState } from 'react';
import { lesson5ActivityData, SurveyQuestionItem } from '../../../data/activityBookLesson5Data';
import { ClipboardList, Volume2, RotateCcw, Sparkles, Check, PieChart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise1FrequencySurvey: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, columns, questions } =
    lesson5ActivityData.page12Ex1Survey;

  // Selected adverb for each question id
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customQuestions, setCustomQuestions] = useState<Record<string, string>>({
    'sq-i': 'read an English story',
    'sq-j': 'help with housework at home',
  });

  const handleSelect = (questionId: string, colKey: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: colKey };
      // Check if all 10 are answered
      if (Object.keys(next).length === questions.length) {
        try {
          confetti({
            particleCount: 50,
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

  // Frequency statistics
  const adverbCounts = columns.map((col) => ({
    ...col,
    count: Object.values(answers).filter((val) => val === col.key).length,
  }));

  return (
    <div className="space-y-6" dir="rtl">
      {/* Exercise Header */}
      <div className="bg-linear-to-r from-teal-700 via-emerald-700 to-emerald-800 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-emerald-600/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <ClipboardList className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-xs font-black">
                  كتاب النشاط ص 12
                </span>
                <span className="text-emerald-200 text-xs font-mono">Exercise 1: Survey</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-arabic mt-1">{titleAr}</h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-sans">{titleEn}</p>
            </div>
          </div>

          <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold font-arabic">
            تمت الإجابة على {answeredCount} من {questions.length}
          </div>
        </div>
        <div className="mt-3 text-xs sm:text-sm text-emerald-100/90 font-arabic leading-relaxed flex flex-col gap-0.5">
          <span>{instructionAr}</span>
          <span className="text-xs text-emerald-200/80 font-mono" dir="ltr">
            {instructionEn}
          </span>
        </div>
      </div>

      {/* Adverbs Legend / Circle Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {columns.map((col) => (
          <div
            key={col.key}
            className="bg-white p-3 rounded-2xl border border-zinc-200 shadow-2xs flex flex-col items-center text-center gap-2"
          >
            <img
              src={col.image}
              alt={col.labelEn}
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
            <div>
              <span className="block font-bold text-xs sm:text-sm text-zinc-900 font-arabic">
                {col.labelAr}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {col.key} ({col.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Questionnaire Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 text-xs sm:text-sm font-arabic font-bold">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">النشاط (Activity / Question)</th>
                {columns.map((col) => (
                  <th key={col.key} className="py-3 px-2 text-center w-24">
                    <span className="block text-zinc-900">{col.labelAr}</span>
                    <span className="text-[11px] font-normal text-zinc-500 font-mono">
                      {col.key}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {questions.map((q, idx) => {
                const selectedCol = answers[q.id];

                return (
                  <React.Fragment key={q.id}>
                    <tr
                      className={`transition-colors ${
                        selectedCol ? 'bg-emerald-50/30' : 'hover:bg-zinc-50/60'
                      }`}
                    >
                      {/* Letter badge */}
                      <td className="py-3.5 px-4 text-center font-bold text-xs font-mono text-zinc-500">
                        {q.letter}
                      </td>

                      {/* Question Text */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <p className="font-mono text-xs sm:text-sm font-semibold text-zinc-900" dir="ltr">
                              {q.questionEn}
                            </p>
                            <p className="font-arabic text-xs text-zinc-600">
                              {q.questionAr}
                            </p>
                          </div>
                          <button
                            onClick={() => playTTS(q.questionEn)}
                            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 shrink-0 transition-colors"
                            title="استمع للسؤال"
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
                              onClick={() => handleSelect(q.id, col.key)}
                              className={`w-8 h-8 rounded-xl mx-auto flex items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-600 text-white shadow-xs scale-105'
                                  : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'
                              }`}
                              title={`${col.labelEn} (${col.labelAr})`}
                            >
                              {isSelected ? (
                                <Check className="w-5 h-5 stroke-[2.5]" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-zinc-300" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Auto-generated Sentence Pill if answered */}
                    {selectedCol && (
                      <tr className="bg-emerald-50/50 border-b border-emerald-100">
                        <td colSpan={7} className="py-2 px-4 text-left" dir="ltr">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold font-arabic">
                                جملتك:
                              </span>
                              <span className="font-mono text-xs sm:text-sm font-bold text-emerald-950">
                                {generateSentence(q, selectedCol)}
                              </span>
                            </div>
                            <button
                              onClick={() => playTTS(generateSentence(q, selectedCol))}
                              className="px-2 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-1 transition-colors"
                              title="استمع لجملتك"
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

      {/* Summary / Frequency Statistics */}
      {answeredCount > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-zinc-900 text-sm sm:text-base font-arabic">
                ملخص تكرار عاداتك اليومية (Your Frequency Profile)
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition-colors font-arabic cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              إعادة ضبط الاستبيان
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {adverbCounts.map((col) => (
              <div
                key={col.key}
                className="bg-zinc-50 p-3 rounded-xl border border-zinc-200/80 text-center space-y-1"
              >
                <span className="block font-bold text-lg text-emerald-700 font-mono">
                  {col.count}
                </span>
                <span className="block font-semibold text-xs text-zinc-800 font-arabic">
                  {col.labelAr}
                </span>
                <span className="block text-[11px] text-zinc-500 font-mono">
                  {col.key}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
