import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Languages } from 'lucide-react';
import { lesson4ActivityData, PronounSentenceItem } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise1PronounsProps {
  onProgressUpdate: (completed: boolean) => void;
}

const PRONOUN_BOX = ['mine', 'yours', 'hers', 'ours', 'theirs'] as const;

export const Exercise1Pronouns: React.FC<Exercise1PronounsProps> = ({ onProgressUpdate }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondAnswers, setSecondAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const items = lesson4ActivityData.page10Ex1Pronouns;

  const toggleTranslation = (id: string) => {
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectFirst = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleSelectSecond = (id: string, val: string) => {
    setSecondAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const isSentenceCorrect = (item: PronounSentenceItem) => {
    const firstVal = (answers[item.id] || '').trim().toLowerCase();
    if (item.correctWord2) {
      const secondVal = (secondAnswers[item.id] || '').trim().toLowerCase();
      return (
        firstVal === item.correctWord.toLowerCase() &&
        secondVal === item.correctWord2.toLowerCase()
      );
    }
    return firstVal === item.correctWord.toLowerCase();
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isSentenceCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setAnswers({});
    setSecondAnswers({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model1: Record<string, string> = {};
    const model2: Record<string, string> = {};
    items.forEach((it) => {
      model1[it.id] = it.correctWord;
      if (it.correctWord2) {
        model2[it.id] = it.correctWord2;
      }
    });
    setAnswers(model1);
    setSecondAnswers(model2);
    setIsChecked(true);
  };

  const answeredCount = items.filter((it) => {
    const a1 = answers[it.id];
    const a2 = secondAnswers[it.id];
    return it.correctWord2 ? a1 && a2 : a1;
  }).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 10 • Exercise 1
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Complete the sentences. Use words from the box.
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            أكمل الجمل السبع التالية باستخدام ضمائر التملك المناسبة من الصندوق (mine, yours, hers, ours, theirs):
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {items.length}
        </div>
      </div>

      {/* Words Box */}
      <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-600 font-sans uppercase tracking-wider">
            Possessive Pronouns Box:
          </span>
          <span className="text-[11px] text-zinc-500 font-arabic" dir="rtl">
            اختر من الصندوق:
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
          {PRONOUN_BOX.map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-lg bg-white border border-zinc-200 text-sm font-sans font-bold text-zinc-900 shadow-2xs"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* The 7 Sentences */}
      <div className="space-y-3">
        {items.map((item) => {
          const val1 = answers[item.id] || '';
          const val2 = secondAnswers[item.id] || '';
          const correct = isSentenceCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Sentence Top Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans uppercase shrink-0">
                    {item.letter}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-zinc-900 font-sans flex flex-wrap items-center gap-1.5 leading-relaxed">
                    <span>{item.prefixEn}</span>
                    <span className={`px-2.5 py-0.5 rounded-md border font-sans font-bold text-sm ${
                      val1
                        ? isChecked
                          ? correct
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-400'
                            : 'bg-rose-50 text-rose-950 border-rose-400'
                          : 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-400 border-zinc-300'
                    }`}>
                      {val1 || '.......'}
                    </span>
                    {item.suffixEn && <span>{item.suffixEn}</span>}
                    {item.correctWord2 && (
                      <span className={`px-2.5 py-0.5 rounded-md border font-sans font-bold text-sm ${
                        val2
                          ? isChecked
                            ? correct
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-400'
                              : 'bg-rose-50 text-rose-950 border-rose-400'
                            : 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-400 border-zinc-300'
                      }`}>
                        {val2 || '.......'}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTranslation(item.id)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md border font-arabic flex items-center gap-1 transition-all cursor-pointer ${
                    showTranslations[item.id]
                      ? 'bg-zinc-200 text-zinc-900 border-zinc-300'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{showTranslations[item.id] ? 'إخفاء الترجمة' : 'ترجمة الجملة'}</span>
                </button>
              </div>

              {showTranslations[item.id] && (
                <div className="text-xs text-zinc-700 font-arabic bg-zinc-100 p-2 rounded-lg text-right" dir="rtl">
                  {item.sentenceAr}
                </div>
              )}

              {/* Selection Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-500 font-sans uppercase">
                    {item.correctWord2 ? 'Blank 1 (الفراغ الأول):' : 'Choose Pronoun (اختر الضمير):'}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRONOUN_BOX.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSelectFirst(item.id, p)}
                        className={`px-3 py-1 rounded-md text-xs font-bold font-sans transition-all cursor-pointer border ${
                          val1 === p
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                            : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {item.correctWord2 && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-500 font-sans uppercase">
                      Blank 2 (الفراغ الثاني):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PRONOUN_BOX.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleSelectSecond(item.id, p)}
                          className={`px-3 py-1 rounded-md text-xs font-bold font-sans transition-all cursor-pointer border ${
                            val2 === p
                              ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                              : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback and Explanation */}
              {isChecked && (
                <div className="p-2.5 rounded-lg text-xs font-arabic text-right space-y-1 bg-zinc-100 text-zinc-800 border border-zinc-200" dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>إجابة صحيحة! ({item.correctWord} {item.correctWord2 ? `و ${item.correctWord2}` : ''})</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>الجواب النموذجي: ({item.correctWord} {item.correctWord2 ? `و ${item.correctWord2}` : ''})</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed pr-5">
                    {item.explanationAr}
                  </p>
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
            <span>فحص الإجابات</span>
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
