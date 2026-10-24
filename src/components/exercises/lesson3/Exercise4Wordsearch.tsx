import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Search, Sparkles, RefreshCw, Languages, CheckCircle2 } from 'lucide-react';
import { lesson3ActivityData } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise4WordsearchProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise4Wordsearch: React.FC<Exercise4WordsearchProps> = ({ onProgressUpdate }) => {
  const [foundWords, setFoundWords] = useState<Record<string, boolean>>({});
  const [showWordMeanings, setShowWordMeanings] = useState<boolean>(false);

  const wordsearch = lesson3ActivityData.page8Ex4Wordsearch;

  const toggleWordFound = (word: string) => {
    setFoundWords((prev) => {
      const updated = { ...prev, [word]: !prev[word] };
      const totalFound = Object.values(updated).filter(Boolean).length;
      if (totalFound === wordsearch.words.length) {
        confetti({ particleCount: 50, spread: 70 });
        playSuccessChime();
        onProgressUpdate(true);
      }
      return updated;
    });
  };

  const handleFindAllWords = () => {
    const allFound: Record<string, boolean> = {};
    wordsearch.words.forEach((w) => {
      allFound[w.word] = true;
    });
    setFoundWords(allFound);
    confetti({ particleCount: 45, spread: 65 });
    playSuccessChime();
    onProgressUpdate(true);
  };

  const resetAll = () => {
    setFoundWords({});
  };

  const totalWordsFoundCount = Object.values(foundWords).filter(Boolean).length;

  return (
    <div className="space-y-5" dir="ltr">
      {/* Exercise Header Card matching Activity Book Page 8 Ex 4 */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-800 border border-amber-300 font-arabic">
                📓 كتاب النشاط (Activity Book)
              </span>
              <span className="text-xs font-bold text-zinc-500 font-sans">
                Page 8 • Exercise 4
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-600" />
              <span>Wordsearch: Find 12 Past Simple Forms</span>
            </h4>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black font-sans shadow-2xs">
              Found: {totalWordsFoundCount} / {wordsearch.words.length}
            </span>
            <button
              type="button"
              onClick={handleFindAllWords}
              className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline font-arabic cursor-pointer transition-colors"
            >
              كشف جميع الكلمات
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed relative z-10" dir="rtl">
          ابحث عن صيغ الماضي الـ 12 في شبكة الحروف أدناه، ثم اضغط على كل فعل في القائمة لتأكيد إيجاده:
        </p>
      </div>

      {/* Main Grid and Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* 10x10 Puzzle Grid */}
        <div className="bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-800 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-zinc-400 font-sans uppercase tracking-wider mb-3">
            10x10 Word Grid (كتاب النشاط ص 8)
          </div>
          <div className="grid grid-cols-10 gap-1.5 p-1.5 bg-zinc-950 rounded-xl border border-zinc-800/80 shadow-inner">
            {wordsearch.grid.map((row, rIdx) =>
              row.map((letter, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-xs sm:text-sm font-black font-mono uppercase bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 hover:bg-amber-400 hover:text-zinc-950 transition-colors cursor-default select-none"
                >
                  {letter}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 12 Past Verbs Checklist */}
        <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-700 font-sans block">
              12 Past Verbs Checklist
            </span>
            <button
              type="button"
              onClick={() => setShowWordMeanings(!showWordMeanings)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                showWordMeanings
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <Languages className="w-3 h-3 text-indigo-600" />
              <span>{showWordMeanings ? 'إخفاء ترجمة الكلمات' : 'ترجمة الكلمات'}</span>
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 font-arabic text-right" dir="rtl">
            اضغط على الكلمة بمجرد أن تعثر عليها في الشبكة:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {wordsearch.words.map((w) => {
              const isFound = foundWords[w.word];

              return (
                <button
                  key={w.word}
                  type="button"
                  onClick={() => toggleWordFound(w.word)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                    isFound
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-2xs'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <div>
                    <span className="font-mono font-black text-xs block">
                      {w.word}
                    </span>
                    {showWordMeanings && (
                      <span className="text-[10px] text-zinc-500 font-arabic block" dir="rtl">
                        {w.meaningAr}
                      </span>
                    )}
                  </div>

                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                    isFound ? 'bg-emerald-600 text-white' : 'border border-zinc-300 text-transparent'
                  }`}>
                    ✓
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={resetAll}
              className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-600 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة تصفير الكلمات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
