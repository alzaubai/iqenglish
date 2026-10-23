import React, { useState } from 'react';
import { lesson5ActivityData, PartnerDialogueItem } from '../../../data/activityBookLesson5Data';
import { Volume2, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise2PartnerGame: React.FC = () => {
  const { instructionEn, instructionAr, dialogues } = lesson5ActivityData.page13Ex2Dialogue;

  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});

  const currentDialogue: PartnerDialogueItem = dialogues[activeDialogueIndex];

  const handleSelectOption = (textEn: string) => {
    const next = { ...userChoices, [currentDialogue.id]: textEn };
    setUserChoices(next);

    if (Object.keys(next).length === dialogues.length) {
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
  };

  const handleNext = () => {
    if (activeDialogueIndex < dialogues.length - 1) {
      setActiveDialogueIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeDialogueIndex > 0) {
      setActiveDialogueIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setUserChoices({});
    setActiveDialogueIndex(0);
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

  const userChoice = userChoices[currentDialogue.id];
  const answeredRoundsCount = Object.keys(userChoices).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 13 • Exercise 2
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Talk about your partner. Guess how often he/she does things.
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr} ({instructionEn})
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Completed: {answeredRoundsCount} / {dialogues.length}
        </div>
      </div>

      {/* Rounds Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" dir="rtl">
        {dialogues.map((d, idx) => {
          const isDone = !!userChoices[d.id];
          const isActive = idx === activeDialogueIndex;

          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDialogueIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                  : isDone
                  ? 'bg-zinc-100 text-zinc-900 border-zinc-300'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              <span>{d.topicAr}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />}
            </button>
          );
        })}
      </div>

      {/* Dialogue Roleplay Scene */}
      <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-5">
        {/* Partner's Guess Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 font-sans uppercase">
              Partner's Guess:
            </span>
            <button
              type="button"
              onClick={() => playTTS(currentDialogue.partnerGuess)}
              className="p-1.5 rounded-lg bg-zinc-200/70 hover:bg-zinc-200 text-zinc-700 transition-colors"
              title="Listen"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-white p-4 rounded-xl border border-zinc-200">
            <p className="font-sans text-base font-bold text-zinc-900">
              "{currentDialogue.partnerGuess}"
            </p>
            <p className="text-xs text-zinc-500 font-arabic mt-1 text-right" dir="rtl">
              {currentDialogue.partnerGuessAr}
            </p>
          </div>
        </div>

        {/* Student's Turn (Response Options) */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-zinc-700 font-arabic block text-right" dir="rtl">
            اختر ردك المناسب وفق مدى تكرار هذا النشاط لديك:
          </span>

          <div className="grid grid-cols-1 gap-2">
            {currentDialogue.options.map((opt) => {
              const isSelected = userChoice === opt.textEn;

              return (
                <button
                  key={opt.textEn}
                  type="button"
                  onClick={() => handleSelectOption(opt.textEn)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                      : 'bg-white hover:bg-zinc-100/60 border-zinc-200 text-zinc-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className={`font-sans text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                      {opt.textEn}
                    </p>
                    <p className={`font-arabic text-xs text-right ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`} dir="rtl">
                      {opt.textAr}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTTS(opt.textEn);
                    }}
                    className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </button>
              );
            })}
          </div>
        </div>

        {/* Textbook Model Preview */}
        {userChoice && (
          <div className="bg-white p-3 rounded-xl border border-zinc-200 text-left space-y-1">
            <span className="text-xs font-bold text-zinc-500 font-sans block">
              Model Textbook Response:
            </span>
            <div className="flex items-center justify-between font-sans text-sm font-bold text-zinc-800">
              <span>"{currentDialogue.modelResponseEn}"</span>
              <button
                type="button"
                onClick={() => playTTS(currentDialogue.modelResponseEn)}
                className="p-1 rounded-md text-zinc-500 hover:text-zinc-800 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-500 font-arabic text-right" dir="rtl">
              {currentDialogue.modelResponseAr}
            </p>
          </div>
        )}

        {/* Navigation buttons between rounds */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeDialogueIndex === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-bold font-arabic bg-zinc-100 hover:bg-zinc-200 text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            المحادثة السابقة
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeDialogueIndex === dialogues.length - 1}
            className="px-3.5 py-2 rounded-xl text-xs font-bold font-arabic bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            المحادثة التالية
          </button>
        </div>
      </div>

      {answeredRoundsCount > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold font-arabic flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            إعادة التمرين
          </button>
        </div>
      )}
    </div>
  );
};
