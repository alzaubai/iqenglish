import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, RefreshCw, Eye, EyeOff, BookOpen, Search } from 'lucide-react';
import { lesson3ActivityData, StoryQuestionItem } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface ExerciseMariamStoryProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const ExerciseMariamStory: React.FC<ExerciseMariamStoryProps> = ({ onProgressUpdate }) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [foundWords, setFoundWords] = useState<Record<string, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});

  const questions = lesson3ActivityData.page6StudentBookQuestions;
  const wordsearch = lesson3ActivityData.page8Ex4Wordsearch;

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  const handleRevealAllQuestions = () => {
    const allRev: Record<string, boolean> = {};
    questions.forEach((q) => {
      allRev[q.id] = true;
    });
    setRevealedAnswers(allRev);
  };

  const handleFindAllWords = () => {
    const allFound: Record<string, boolean> = {};
    wordsearch.words.forEach((w) => {
      allFound[w.word] = true;
    });
    setFoundWords(allFound);
    confetti({ particleCount: 40, spread: 60 });
    playSuccessChime();
  };

  const resetAll = () => {
    setRevealedAnswers({});
    setFoundWords({});
    setUserInputs({});
  };

  const totalWordsFoundCount = Object.values(foundWords).filter(Boolean).length;

  return (
    <div className="space-y-6" dir="ltr">
      {/* SECTION 1: Student's Book Page 6 Comprehension */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
                Student's Book • Page 6 • Exercise A
              </span>
              <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
                Mariam and Khalid: Comprehension Questions
              </h4>
            </div>
            <button
              type="button"
              onClick={handleRevealAllQuestions}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer font-arabic"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>إظهار جميع الأجوبة النموذجية</span>
            </button>
          </div>

          <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
            أجب عن الأسئلة الخمسة الخاصة بمحادثة مريم وخالد وقصة رحلة القارب وطائر البجع:
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q) => {
            const isRevealed = revealedAnswers[q.id];
            const currentAnswer = userInputs[q.id] || '';

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-zinc-200 p-4 shadow-2xs space-y-3 text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-black flex items-center justify-center font-sans shrink-0 mt-0.5">
                      {q.questionNumber}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-zinc-900 font-sans">
                        {q.questionEn}
                      </h5>
                      <p className="text-xs text-zinc-500 font-arabic mt-0.5" dir="rtl">
                        {q.questionAr}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleRevealAnswer(q.id)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      isRevealed
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'إخفاء الحل' : 'عرض الحل'}</span>
                  </button>
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setUserInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="Write your answer here..."
                    className="w-full px-3 py-2 text-xs font-sans rounded-lg border border-zinc-200 focus:border-zinc-900 outline-none text-zinc-900 bg-zinc-50/50"
                  />
                </div>

                {isRevealed && (
                  <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs font-arabic space-y-1 text-right" dir="rtl">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>الجواب الوزاري النموذجي:</span>
                    </div>
                    <p className="font-sans font-bold text-zinc-900 text-left text-xs bg-white/70 p-2 rounded border border-emerald-200/50" dir="ltr">
                      {q.modelAnswerEn}
                    </p>
                    <p className="text-[11px] text-zinc-600">
                      {q.modelAnswerAr}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Activity Book Page 8 Exercise 4 (Wordsearch) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
              Activity Book • Page 8 • Exercise 4
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-600" />
              <span>Wordsearch: Find 12 Past Simple Forms</span>
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold font-sans">
              Found: {totalWordsFoundCount} / {wordsearch.words.length}
            </span>
            <button
              type="button"
              onClick={handleFindAllWords}
              className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
            >
              كشف جميع الكلمات
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
          ابحث عن صيغ الماضي الـ 12 في شبكة الحروف، ثم اضغط على كل كلمة في القائمة لتأكيد إيجادها:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Wordsearch Grid Box */}
          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-inner flex flex-col items-center">
            <div className="text-[11px] font-bold text-zinc-400 font-sans uppercase tracking-wider mb-2">
              10x10 Word Grid (كتاب النشاط ص 8)
            </div>
            <div className="grid grid-cols-10 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800/80">
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

          {/* Checklist of 12 Words */}
          <div className="space-y-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-500 font-sans block">
              12 Past Verbs Checklist (اضغط على الكلمة عند إيجادها):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {wordsearch.words.map((w) => {
                const isFound = foundWords[w.word];

                return (
                  <button
                    key={w.word}
                    type="button"
                    onClick={() => toggleWordFound(w.word)}
                    className={`p-2 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                      isFound
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-2xs'
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-black text-xs block">
                        {w.word}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-arabic block" dir="rtl">
                        {w.meaningAr}
                      </span>
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
          </div>
        </div>
      </div>

      {/* Global Reset */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={resetAll}
          className="px-3 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-600 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة تصفير القسم</span>
        </button>
      </div>
    </div>
  );
};
