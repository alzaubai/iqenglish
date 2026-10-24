import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, ArrowRightLeft } from 'lucide-react';
import { lesson6ActivityData, SoundSortingWord } from '../../../data/activityBookLesson6Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const Exercise3SoundsSort: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, tongueTwisterEn, tongueTwisterAr, words } =
    lesson6ActivityData.page15Ex3Sounds;

  // State: wordId -> 's' | 'sh' | undefined
  const [placements, setPlacements] = useState<Record<string, 's' | 'sh'>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleAssign = (wordId: string, targetSound: 's' | 'sh') => {
    setPlacements((prev) => {
      // Toggle if already selected
      if (prev[wordId] === targetSound) {
        const next = { ...prev };
        delete next[wordId];
        return next;
      }
      return { ...prev, [wordId]: targetSound };
    });
  };

  const isWordCorrect = (w: SoundSortingWord) => {
    return placements[w.id] === w.sound;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = words.every(isWordCorrect);
    if (allCorrect) {
      confetti({ particleCount: 50, spread: 70 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setPlacements({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const solved: Record<string, 's' | 'sh'> = {};
    words.forEach((w) => {
      solved[w.id] = w.sound;
    });
    setPlacements(solved);
    setIsChecked(true);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      // Remove annotations like "(in seashells)" before speaking
      const cleanText = text.replace(/\([^)]*\)/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-GB';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const wordsInS = words.filter((w) => placements[w.id] === 's');
  const wordsInSh = words.filter((w) => placements[w.id] === 'sh');
  const unassignedWords = words.filter((w) => !placements[w.id]);
  const correctCount = words.filter(isWordCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 15 • Exercise 3
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}: {instructionEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Sorted: {words.length - unassignedWords.length} / {words.length}
        </div>
      </div>

      {/* Tongue Twister Card */}
      <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-500 font-sans uppercase tracking-wider">
            Tongue-twister (نص النطق السريع)
          </span>
          <button
            onClick={() => playTTS(tongueTwisterEn)}
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg hover:bg-zinc-100 transition-colors font-sans"
            title="Listen to tongue twister"
          >
            <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
            <span>Listen</span>
          </button>
        </div>
        <p className="text-sm sm:text-base font-bold text-zinc-900 font-sans leading-relaxed">
          &ldquo;{tongueTwisterEn}&rdquo;
        </p>
        <p className="text-xs text-zinc-600 font-arabic text-right" dir="rtl">
          {tongueTwisterAr}
        </p>
      </div>

      {/* Unassigned Words Pool */}
      {unassignedWords.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-700 font-sans">
              Words to sort (انقر لاختيار العمود المناسب):
            </span>
            <span className="text-xs text-zinc-500 font-sans">
              {unassignedWords.length} remaining
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {unassignedWords.map((w) => (
              <div
                key={w.id}
                className="bg-white border border-zinc-200 rounded-xl p-2 sm:p-2.5 flex items-center gap-2 shadow-xs hover:border-zinc-300 transition-colors"
              >
                <button
                  onClick={() => playTTS(w.word)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 rounded-md transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans block">
                    {w.word}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-arabic block" dir="rtl">
                    {w.meaningAr}
                  </span>
                </div>
                <div className="flex items-center gap-1 border-l border-zinc-200 pl-2">
                  <button
                    onClick={() => handleAssign(w.id, 's')}
                    className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-md font-sans transition-colors"
                  >
                    /s/
                  </button>
                  <button
                    onClick={() => handleAssign(w.id, 'sh')}
                    className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-md font-sans transition-colors"
                  >
                    /ʃ/
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Sorting Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: /s/ Sound */}
        <div className="bg-zinc-50/60 rounded-xl border border-zinc-200 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <div>
              <h5 className="text-sm font-bold text-zinc-900 font-sans">
                صوت السين /s/
              </h5>
              <p className="text-xs text-zinc-500 font-sans">as in &apos;sells&apos;, &apos;sites&apos;</p>
            </div>
            <span className="text-xs font-bold text-zinc-700 bg-white border border-zinc-200 px-2 py-0.5 rounded-md font-sans">
              {wordsInS.length} words
            </span>
          </div>

          <div className="min-h-[140px] space-y-2">
            {wordsInS.length === 0 ? (
              <div className="h-[140px] flex items-center justify-center border border-dashed border-zinc-200 rounded-lg text-xs text-zinc-400 font-sans">
                No words added yet
              </div>
            ) : (
              wordsInS.map((w) => {
                const correct = isWordCorrect(w);
                return (
                  <div
                    key={w.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-all ${
                      isChecked
                        ? correct
                          ? 'border-emerald-300 bg-emerald-50/30'
                          : 'border-rose-300 bg-rose-50/30'
                        : 'border-zinc-200 bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playTTS(w.word)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                            {w.word}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-sans">
                            {w.phonetic}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 font-arabic block" dir="rtl">
                          {w.meaningAr}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isChecked && (
                        <span>
                          {correct ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                        </span>
                      )}
                      <button
                        onClick={() => handleAssign(w.id, 'sh')}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded hover:bg-zinc-100 transition-colors"
                        title="Move to /ʃ/"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 2: /ʃ/ Sound */}
        <div className="bg-zinc-50/60 rounded-xl border border-zinc-200 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <div>
              <h5 className="text-sm font-bold text-zinc-900 font-sans">
                صوت الشين /ʃ/
              </h5>
              <p className="text-xs text-zinc-500 font-sans">as in &apos;she&apos;, &apos;shells&apos;, &apos;sure&apos;</p>
            </div>
            <span className="text-xs font-bold text-zinc-700 bg-white border border-zinc-200 px-2 py-0.5 rounded-md font-sans">
              {wordsInSh.length} words
            </span>
          </div>

          <div className="min-h-[140px] space-y-2">
            {wordsInSh.length === 0 ? (
              <div className="h-[140px] flex items-center justify-center border border-dashed border-zinc-200 rounded-lg text-xs text-zinc-400 font-sans">
                No words added yet
              </div>
            ) : (
              wordsInSh.map((w) => {
                const correct = isWordCorrect(w);
                return (
                  <div
                    key={w.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 transition-all ${
                      isChecked
                        ? correct
                          ? 'border-emerald-300 bg-emerald-50/30'
                          : 'border-rose-300 bg-rose-50/30'
                        : 'border-zinc-200 bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playTTS(w.word)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                            {w.word}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-sans">
                            {w.phonetic}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 font-arabic block" dir="rtl">
                          {w.meaningAr}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isChecked && (
                        <span>
                          {correct ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                        </span>
                      )}
                      <button
                        onClick={() => handleAssign(w.id, 's')}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded hover:bg-zinc-100 transition-colors"
                        title="Move to /s/"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={checkAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check answers</span>
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <button
          onClick={solveAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs font-bold font-sans hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Show Model Solution</span>
        </button>
      </div>

      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-between border ${
            correctCount === words.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
        >
          <span>
            {correctCount === words.length
              ? 'Excellent! All sounds classified correctly.'
              : `You sorted ${correctCount} of ${words.length} words correctly. Check highlighted words.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700">
            {correctCount} / {words.length}
          </span>
        </div>
      )}
    </div>
  );
};
