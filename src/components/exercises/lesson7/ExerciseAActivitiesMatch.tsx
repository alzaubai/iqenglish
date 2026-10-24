import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, ArrowRight } from 'lucide-react';
import { lesson7ActivityData, VerbActivityCollocation } from '../../../data/activityBookLesson7Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const ExerciseAActivitiesMatch: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, pairs } =
    lesson7ActivityData.page15ExACollocations;

  // State: verbId -> activityId
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedVerbId, setSelectedVerbId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleVerbClick = (verbId: string) => {
    if (selectedVerbId === verbId) {
      setSelectedVerbId(null);
    } else {
      setSelectedVerbId(verbId);
    }
  };

  const handleActivityClick = (targetId: string) => {
    if (!selectedVerbId) return;

    // Check if target already paired to another verb, remove previous pair
    const next = { ...matches };
    Object.keys(next).forEach((key) => {
      if (next[key] === targetId) {
        delete next[key];
      }
    });

    next[selectedVerbId] = targetId;
    setMatches(next);
    setSelectedVerbId(null);
  };

  const removeMatch = (verbId: string) => {
    setMatches((prev) => {
      const next = { ...prev };
      delete next[verbId];
      return next;
    });
  };

  const isPairCorrect = (p: VerbActivityCollocation) => {
    return matches[p.id] === p.id;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = pairs.every(isPairCorrect);
    if (allCorrect) {
      confetti({ particleCount: 50, spread: 70 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setMatches({});
    setSelectedVerbId(null);
    setIsChecked(false);
  };

  const solveAll = () => {
    const solved: Record<string, string> = {};
    pairs.forEach((p) => {
      solved[p.id] = p.id;
    });
    setMatches(solved);
    setSelectedVerbId(null);
    setIsChecked(true);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const matchedCount = Object.keys(matches).length;
  const correctCount = pairs.filter(isPairCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 15 • Exercise A
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-arabic" dir="rtl">
          تمت المطابقة: {matchedCount} من {pairs.length}
        </div>
      </div>

      <p className="text-xs text-zinc-500 font-sans">
        Click a past verb on the left, then click its corresponding activity on the right:
      </p>

      {/* Two Columns Interactive Match */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Past Verbs */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-sans block mb-2">
            Past Simple Verbs (أفعال الماضي)
          </span>
          {pairs.map((p) => {
            const isSelected = selectedVerbId === p.id;
            const pairedActivityId = matches[p.id];
            const pairedItem = pairs.find((item) => item.id === pairedActivityId);
            const isCorrect = isPairCorrect(p);

            return (
              <div
                key={p.id}
                onClick={() => handleVerbClick(p.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                  isChecked
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : pairedActivityId
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-zinc-200 bg-zinc-50'
                    : isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                    : pairedActivityId
                    ? 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center font-sans shrink-0 ${
                      isSelected
                        ? 'bg-zinc-800 text-white'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {p.verbPast.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <span
                      className={`text-sm font-bold font-sans block ${
                        isSelected ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      {p.verbPast}
                    </span>
                    <span
                      className={`text-[11px] font-arabic block ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                      dir="rtl"
                    >
                      {p.verbAr} (present: {p.verbPresent})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {pairedItem && (
                    <span
                      className={`text-[11px] font-bold font-sans px-2 py-0.5 rounded-md border truncate max-w-[140px] ${
                        isSelected
                          ? 'bg-zinc-800 border-zinc-700 text-white'
                          : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                      title={pairedItem.activityEn}
                    >
                      &rarr; {pairedItem.activityEn}
                    </span>
                  )}
                  {isChecked && pairedActivityId && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Activity Phrases */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-sans block mb-2">
            Activity Phrases (أنشطة اليوم المميز)
          </span>
          {pairs.map((p) => {
            // Check if this activity is paired by any verb
            const pairedVerbId = Object.keys(matches).find((k) => matches[k] === p.id);
            const pairedVerb = pairs.find((item) => item.id === pairedVerbId);

            return (
              <div
                key={p.id}
                onClick={() => handleActivityClick(p.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                  pairedVerb
                    ? 'border-zinc-300 bg-zinc-50 text-zinc-900'
                    : selectedVerbId
                    ? 'border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-100/60'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                      ...{p.activityEn}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTTS(p.fullSentenceEn);
                      }}
                      className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors"
                      title="Listen full sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-arabic block text-right" dir="rtl">
                    {p.activityAr}
                  </span>
                </div>

                {pairedVerb && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMatch(pairedVerb.id);
                    }}
                    className="text-[11px] font-bold font-sans text-zinc-400 hover:text-rose-600 px-2 py-0.5 rounded hover:bg-zinc-200/60 transition-colors"
                    title="Remove match"
                  >
                    Clear
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer in Arabic */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 font-arabic" dir="rtl">
        <div className="flex items-center gap-2">
          <button
            onClick={checkAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تحقق من المطابقة</span>
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
          <span>عرض الحل النموذجي</span>
        </button>
      </div>

      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-arabic flex items-center justify-between border ${
            correctCount === pairs.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
          dir="rtl"
        >
          <span>
            {correctCount === pairs.length
              ? 'ممتاز جداً! تمت مطابقة جميع الأفعال مع الأنشطة بنجاح.'
              : `طابقت ${correctCount} من ${pairs.length} أفعال بشكل صحيح.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700 font-sans">
            {correctCount} / {pairs.length}
          </span>
        </div>
      )}
    </div>
  );
};
