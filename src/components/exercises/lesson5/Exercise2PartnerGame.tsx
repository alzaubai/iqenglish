import React, { useState } from 'react';
import { lesson5ActivityData, PartnerDialogueItem } from '../../../data/activityBookLesson5Data';
import { MessageSquare, Users, Volume2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise2PartnerGame: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, dialogues } =
    lesson5ActivityData.page13Ex2Dialogue;

  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<boolean>(false);

  const currentDialogue: PartnerDialogueItem = dialogues[activeDialogueIndex];

  const handleSelectOption = (textEn: string) => {
    const next = { ...userChoices, [currentDialogue.id]: textEn };
    setUserChoices(next);

    if (Object.keys(next).length === dialogues.length) {
      setCompleted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
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
    setCompleted(false);
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

  return (
    <div className="space-y-6" dir="rtl">
      {/* Exercise Header */}
      <div className="bg-linear-to-r from-sky-700 via-blue-700 to-indigo-800 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-sky-600/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-sky-950 text-xs font-black">
                  كتاب النشاط ص 13
                </span>
                <span className="text-sky-200 text-xs font-mono">Exercise 2: Partner Talk</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-arabic mt-1">{titleAr}</h2>
              <p className="text-xs sm:text-sm text-sky-100 font-sans">{titleEn}</p>
            </div>
          </div>

          <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold font-arabic">
            الجولة {activeDialogueIndex + 1} من {dialogues.length}
          </div>
        </div>
        <div className="mt-3 text-xs sm:text-sm text-sky-100/90 font-arabic leading-relaxed flex flex-col gap-0.5">
          <span>{instructionAr}</span>
          <span className="text-xs text-sky-200/80 font-mono" dir="ltr">
            {instructionEn}
          </span>
        </div>
      </div>

      {/* Rounds Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {dialogues.map((d, idx) => {
          const isDone = !!userChoices[d.id];
          const isActive = idx === activeDialogueIndex;

          return (
            <button
              key={d.id}
              onClick={() => setActiveDialogueIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <span>{d.topicAr}</span>
              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Dialogue Roleplay Scene */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200 shadow-2xs space-y-6">
        {/* Partner's Turn (The Guess) */}
        <div className="flex items-start gap-3 sm:gap-4 text-left" dir="ltr">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
            Partner
          </div>
          <div className="flex-1 bg-indigo-50/80 border border-indigo-100 p-4 rounded-2xl rounded-tl-none space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 font-arabic text-right" dir="rtl">
                تخمين الزميل (Partner's Guess):
              </span>
              <button
                onClick={() => playTTS(currentDialogue.partnerGuess)}
                className="p-1.5 rounded-lg bg-indigo-200/80 hover:bg-indigo-300 text-indigo-900 transition-colors"
                title="استمع للتخمين"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="font-mono text-base sm:text-lg font-bold text-indigo-950">
              "{currentDialogue.partnerGuess}"
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 font-arabic text-right" dir="rtl">
              {currentDialogue.partnerGuessAr}
            </p>
          </div>
        </div>

        {/* Student's Turn (Response Options) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-zinc-900 text-xs sm:text-sm font-arabic flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              اختر ردك المناسب وفق مدى تكرار هذا النشاط لديك:
            </h3>
            {userChoice && (
              <span className="text-xs text-emerald-600 font-bold font-arabic">
                ✓ تم اختيار الرد
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2.5" dir="ltr">
            {currentDialogue.options.map((opt) => {
              const isSelected = userChoice === opt.textEn;

              return (
                <button
                  key={opt.textEn}
                  onClick={() => handleSelectOption(opt.textEn)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-zinc-50 hover:bg-blue-50/50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className={`font-mono text-sm sm:text-base font-bold ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                      {opt.textEn}
                    </p>
                    <p className={`font-arabic text-xs text-right ${isSelected ? 'text-blue-100' : 'text-zinc-500'}`} dir="rtl">
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
                        : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                    }`}
                    title="استمع للرد"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model Answer from Textbook */}
        {userChoice && (
          <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl space-y-1.5 text-right font-arabic">
            <span className="text-xs font-bold text-amber-900">
              نموذج الرد بحسب كتاب النشاط (Model Textbook Dialogue):
            </span>
            <div className="flex items-center justify-between font-mono text-sm font-semibold text-amber-950" dir="ltr">
              <span>"{currentDialogue.modelResponseEn}"</span>
              <button
                onClick={() => playTTS(currentDialogue.modelResponseEn)}
                className="p-1 rounded-md bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors"
                title="استمع للنموذج"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-zinc-600">{currentDialogue.modelResponseAr}</p>
          </div>
        )}

        {/* Navigation buttons between rounds */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={activeDialogueIndex === 0}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic bg-zinc-100 hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            المحادثة السابقة
          </button>

          <button
            onClick={handleNext}
            disabled={activeDialogueIndex === dialogues.length - 1}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            المحادثة التالية
          </button>
        </div>
      </div>

      {/* Completion Celebration Box */}
      {completed && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between gap-3 font-arabic">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            أحسنت! أكملت جميع جولات التحدث مع زميلك وتدربت على كافة ظروف التكرار.
          </div>
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            إعادة التمرين
          </button>
        </div>
      )}
    </div>
  );
};
