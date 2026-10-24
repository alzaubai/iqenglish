import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, Languages } from 'lucide-react';
import { lesson6ActivityData, DialogueMatchItem } from '../../../data/activityBookLesson6Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const ExerciseADialogueMatch: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, adelLines, options } =
    lesson6ActivityData.page14ExAMatch;

  const [matches, setMatches] = useState<Record<number, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});
  const [showOptionsTranslation, setShowOptionsTranslation] = useState<boolean>(false);

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (num: number, letter: string) => {
    setMatches((prev) => ({ ...prev, [num]: letter }));
  };

  const isItemCorrect = (item: DialogueMatchItem) => {
    return matches[item.number] === item.correctLetter;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = adelLines.every(isItemCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setMatches({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<number, string> = {};
    adelLines.forEach((it) => {
      model[it.number] = it.correctLetter;
    });
    setMatches(model);
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

  const answeredCount = Object.keys(matches).filter((k) => matches[Number(k)]).length;
  const correctCount = adelLines.filter(isItemCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Student's Book p. 9 • Activity Book p. 14 • Exercise A
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}: {instructionEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Answered: {answeredCount} / {adelLines.length}
        </div>
      </div>

      {/* Options Reference Box */}
      <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-3.5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-zinc-600 font-sans uppercase tracking-wider block">
            Bassem's Responses Box (خيارات ردود باسم):
          </span>
          <button
            type="button"
            onClick={() => setShowOptionsTranslation(!showOptionsTranslation)}
            className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              showOptionsTranslation
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <Languages className="w-3 h-3 text-indigo-600" />
            <span>{showOptionsTranslation ? 'إخفاء ترجمة الخيارات' : 'ترجمة خيارات الرد'}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
          {options.map((opt) => (
            <div
              key={opt.letter}
              className="bg-white p-2 rounded-lg border border-zinc-200 flex items-start gap-2 text-left"
            >
              <span className="w-5 h-5 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans uppercase shrink-0">
                {opt.letter}
              </span>
              <div className="min-w-0">
                <span className="font-bold text-zinc-900 block">{opt.textEn}</span>
                {showOptionsTranslation && (
                  <span className="text-[11px] text-zinc-600 font-arabic block text-right mt-0.5" dir="rtl">
                    {opt.textAr}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 7 Dialogue Matches */}
      <div className="space-y-3">
        {adelLines.map((item) => {
          const selected = matches[item.number] || '';
          const correct = isItemCorrect(item);
          const chosenOption = options.find((o) => o.letter === selected);

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
              {/* Turn Header: Number & Adel's Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/80 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-zinc-500 font-sans uppercase">
                        Adel:
                      </span>
                      <span className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
                        "{item.adelSpeechEn}"
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleTranslation(item.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                            visibleTranslations[item.id]
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                              : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                          }`}
                          title="ترجمة السطر"
                        >
                          <Languages className="w-3 h-3 text-indigo-600" />
                          <span>{visibleTranslations[item.id] ? 'إخفاء' : 'ترجمة السطر'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => playTTS(item.adelSpeechEn)}
                          className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {visibleTranslations[item.id] && (
                      <span className="text-xs text-zinc-600 font-arabic block text-right mt-1.5 bg-zinc-100 p-1.5 rounded-md border border-zinc-200 animate-in fade-in duration-150" dir="rtl">
                        {item.adelSpeechAr}
                      </span>
                    )}
                  </div>
                </div>

                {isChecked && (
                  <div>
                    {correct ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 font-bold text-xs font-sans">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Selector for Bassem's reply */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-700 font-sans">
                    Bassem's Response:
                  </label>
                  {selected && (
                    <span className="text-xs font-bold text-zinc-500 font-sans">
                      Selected: <strong className="uppercase">{selected}</strong>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {options.map((opt) => {
                    const isChosen = selected === opt.letter;
                    return (
                      <button
                        key={opt.letter}
                        type="button"
                        onClick={() => handleSelect(item.number, opt.letter)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-sans transition-all cursor-pointer ${
                          isChosen
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                            : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        <span className="uppercase mr-1 font-bold">{opt.letter}.</span>
                        <span className="truncate max-w-[200px] inline-block align-bottom">{opt.textEn}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Response Preview */}
                {chosenOption && (
                  <div className="bg-white p-2.5 rounded-lg border border-zinc-200 mt-2 text-xs font-sans">
                    <span className="text-zinc-500 font-bold uppercase mr-1">Bassem:</span>
                    <span className="font-bold text-zinc-900">"{chosenOption.textEn}"</span>
                    <span className="text-[11px] text-zinc-500 font-arabic block text-right mt-0.5" dir="rtl">
                      {chosenOption.textAr}
                    </span>
                  </div>
                )}

                {/* Correction on submit */}
                {isChecked && !correct && (
                  <div className="text-[11px] text-rose-700 font-bold font-arabic text-right pt-1" dir="rtl">
                    الجواب الصحيح: <strong className="font-sans uppercase">({item.correctLetter})</strong> {item.correctBassemEn}
                  </div>
                )}
              </div>
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
            <span>فحص الإجابات {isChecked ? `(${correctCount}/${adelLines.length})` : ''}</span>
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
