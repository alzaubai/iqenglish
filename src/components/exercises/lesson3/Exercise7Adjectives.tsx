import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Languages, Volume2, Info } from 'lucide-react';
import { lesson3ActivityData, AdjectiveSentenceItem } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise7AdjectivesProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise7Adjectives: React.FC<Exercise7AdjectivesProps> = ({ onProgressUpdate }) => {
  const [selectedWords, setSelectedWords] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const adjectives = lesson3ActivityData.page9Ex6AdjectiveStress;
  const sentences = lesson3ActivityData.page9Ex7Sentences;

  const toggleTranslation = (id: string) => {
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectWord = (sentId: string, word: string) => {
    setSelectedWords((prev) => ({ ...prev, [sentId]: word }));
  };

  const isSentenceCorrect = (item: AdjectiveSentenceItem) => {
    const chosen = selectedWords[item.id] || '';
    return item.acceptableAnswers.includes(chosen);
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = sentences.every(isSentenceCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setSelectedWords({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    sentences.forEach((s) => {
      model[s.id] = s.correctWord;
    });
    setSelectedWords(model);
    setIsChecked(true);
  };

  // Check how many times a word is used
  const getUsedCount = (word: string) => {
    return Object.values(selectedWords).filter((w) => w === word).length;
  };

  // Helper to render the word with its stressed syllable properly highlighted anywhere in the word
  const renderStressedWord = (word: string, stressedPart: string) => {
    const idx = word.toLowerCase().indexOf(stressedPart.toLowerCase());
    if (idx === -1) {
      return <span>{word}</span>;
    }
    const before = word.slice(0, idx);
    const match = word.slice(idx, idx + stressedPart.length);
    const after = word.slice(idx + stressedPart.length);

    return (
      <span className="font-sans font-black">
        {before}
        <span className="text-indigo-600 underline underline-offset-2 font-black">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div className="space-y-5" dir="ltr">
      {/* Header matching Activity Book Page 9 Exercises 6 & 7 */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-800 border border-amber-300 font-arabic">
                📓 كتاب النشاط (Activity Book)
              </span>
              <span className="text-xs font-bold text-zinc-500 font-sans">
                Page 9 • Exercises 6 & 7
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
              Adjectives: Pronunciation Stress & Sentence Completion
            </h4>
          </div>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed relative z-10" dir="rtl">
          اختر الصفة المناسبة من بنك الكلمات لإكمال كل جملة من الجمل السبع التالية (مع مراعاة التشديد الصوتي لكل كلمة):
        </p>
      </div>

      {/* Exercise 6: Pronunciation & Word Bank */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-700 font-sans flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-amber-500" />
            Word Bank & Pronunciation Stress (تمرين 6 ص 9)
          </span>
          <span className="text-[11px] text-zinc-500 font-arabic">
            المقطع الملون هو المقطع المشدد صوتياً (Strongest Part)
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {adjectives.map((adj) => {
            const used = getUsedCount(adj.word) > 0;
            return (
              <div
                key={adj.id}
                className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                  used
                    ? 'bg-zinc-100 border-zinc-300 opacity-70'
                    : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 shadow-2xs'
                }`}
              >
                <span className="text-xs font-black font-sans text-zinc-900">
                  {renderStressedWord(adj.word, adj.stressedPart)}
                </span>
                <span className="text-[11px] font-bold text-zinc-500 font-arabic">
                  ({adj.meaningAr})
                </span>
                {used && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercise 7: The 7 Sentences */}
      <div className="space-y-3.5">
        {sentences.map((item) => {
          const chosen = selectedWords[item.id] || '';
          const correct = isSentenceCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-rose-300 bg-rose-50/40'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-black flex items-center justify-center font-sans uppercase">
                    {item.letter}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-zinc-900 font-sans flex flex-wrap items-center gap-1.5">
                    <span>{item.prefixEn}</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-lg border font-mono text-sm font-black transition-all ${
                      chosen
                        ? isChecked
                          ? correct
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                            : 'bg-rose-100 text-rose-900 border-rose-400'
                          : 'bg-indigo-50 text-indigo-900 border-indigo-300'
                        : 'bg-zinc-100 text-zinc-400 border-dashed border-zinc-300'
                    }`}>
                      {chosen || '..........'}
                    </span>
                    <span>{item.suffixEn}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTranslation(item.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border font-arabic flex items-center gap-1 transition-all cursor-pointer ${
                    showTranslations[item.id]
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{showTranslations[item.id] ? 'إخفاء' : 'ترجمة'}</span>
                </button>
              </div>

              {showTranslations[item.id] && (
                <div className="text-xs text-zinc-700 font-arabic bg-zinc-50 p-2.5 rounded-lg text-right" dir="rtl">
                  {item.sentenceAr}
                </div>
              )}

              {/* Clickable Word Options */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block font-sans">
                  Choose the matching adjective:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {adjectives.map((adj) => {
                    const isSelectedThis = chosen === adj.word;
                    return (
                      <button
                        key={adj.id}
                        type="button"
                        onClick={() => handleSelectWord(item.id, adj.word)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                          isSelectedThis
                            ? isChecked
                              ? correct
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-rose-600 text-white shadow-sm'
                              : 'bg-zinc-900 text-white shadow-sm'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
                        }`}
                      >
                        {adj.word}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation & Validation */}
              {isChecked && (
                <div className={`p-3 rounded-lg text-xs font-arabic text-right space-y-1 ${
                  correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'
                }`} dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>إجابة صحيحة ومطابقة للمنهج! ({item.correctWord})</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>الإجابة الصحيحة المنهجية: ({item.correctWord})</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-700 leading-relaxed pr-5">
                    {item.explanationAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Buttons */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAll}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm font-arabic shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>فحص الإجابات</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
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
