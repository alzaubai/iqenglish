import React, { useState } from 'react';
import { Volume2, Languages, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface JoiningSentencesViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const JoiningSentencesView: React.FC<JoiningSentencesViewProps> = ({
  currentTopic,
  onSpeak,
}) => {
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setPracticeAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
    if (isCorrect) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleResetPractice = () => {
    setPracticeAnswers({});
    setRevealedAnswers({});
  };

  return (
    <div className="space-y-6">
      {/* Connectors Overview Card */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6 text-right">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-700 font-arabic block">
              أدوات الربط الثلاثة المقررة
            </span>
            <h4 className="text-base sm:text-lg font-black text-amber-950 font-arabic mt-0.5">
              الفرق بين and و but و or في دمج الجمل
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-xl"
            dir="ltr"
          >
            {'{ and, but, or }'}
          </span>
        </div>

        {/* The 3 Cards */}
        <div className="space-y-4">
          {currentTopic.connectorsList?.map((conn, idx) => (
            <div
              key={idx}
              className="p-5 bg-amber-50/50 border-2 border-amber-200 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-mono font-black text-sm"
                  dir="ltr"
                >
                  {conn.name}
                </span>
                <span className="text-xs font-bold text-amber-900 font-arabic bg-amber-100 px-3 py-1 rounded-lg">
                  {conn.meaningAr}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                {conn.functionAr}
              </p>

              <div className="space-y-2 pt-1">
                {conn.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 bg-white border border-amber-200 rounded-xl flex items-center justify-between shadow-2xs"
                  >
                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        {ex.en}
                      </p>
                      <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                        {ex.ar}
                      </p>
                    </div>
                    <button
                      onClick={() => onSpeak(ex.en)}
                      className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs"
                      title="استمع"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Questions */}
      {currentTopic.examPractice && currentTopic.examPractice.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <h4 className="text-base sm:text-lg font-black text-amber-950 font-arabic">
              تمارين امتحانية شهرية على أدوات الربط
            </h4>
            <button
              onClick={handleResetPractice}
              className="px-3 py-1 rounded-xl bg-white border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer font-arabic"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التمرين</span>
            </button>
          </div>

          <div className="space-y-4">
            {currentTopic.examPractice.map((q, idx) => {
              const isRevealed = revealedAnswers[q.id];
              const selected = practiceAnswers[q.id];
              const isCorrect = selected === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isRevealed
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-300 bg-rose-50/50'
                      : 'border-zinc-200 bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {q.questionAr && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                            visibleTranslations[q.id]
                              ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-2xs'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                          title="ترجمة السؤال"
                        >
                          <Languages className="w-3 h-3 text-amber-600" />
                          <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => onSpeak(q.questionEn)}
                        className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h5
                    className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-2 text-left"
                    dir="ltr"
                  >
                    {q.questionEn}
                  </h5>

                  {q.questionAr && visibleTranslations[q.id] && (
                    <p className="text-xs text-zinc-600 font-arabic mb-3 bg-zinc-50 p-2 rounded-lg border border-zinc-200/60 animate-in fade-in duration-150 text-right" dir="rtl">
                      {q.questionAr}
                    </p>
                  )}

                  {q.options && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === opt;
                        let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                        if (isRevealed) {
                          if (opt === q.correctAnswer) {
                            btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnClass = 'bg-rose-500 text-white border-rose-500 font-bold';
                          } else {
                            btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                          }
                        } else if (isChosen) {
                          btnClass = 'bg-amber-600 text-white border-amber-600';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, opt, opt === q.correctAnswer)}
                            className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnClass}`}
                            dir="ltr"
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isRevealed && (
                    <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200 text-zinc-700 leading-relaxed">
                      <span className="font-bold text-zinc-900">توضيح:</span> {q.explanationAr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
