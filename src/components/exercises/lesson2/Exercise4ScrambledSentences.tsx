import React, { useState } from 'react';
import { RotateCcw, Languages } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  lesson2ActivityData,
  ABL2ScrambledSentence,
} from '../../../data/activityBookData';

interface Exercise4ScrambledSentencesProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise4ScrambledSentences: React.FC<Exercise4ScrambledSentencesProps> = ({
  onProgressUpdate,
}) => {
  const [constructedTokens, setConstructedTokens] = useState<Record<string, string[]>>({
    'scrambled-a': [],
    'scrambled-b': [],
  });
  const [ex4Checked, setEx4Checked] = useState<Record<string, boolean>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWordChipClick = (sentenceId: string, word: string, add: boolean) => {
    const list = constructedTokens[sentenceId] || [];
    if (add) {
      setConstructedTokens((prev) => ({
        ...prev,
        [sentenceId]: [...list, word],
      }));
    } else {
      const idx = list.lastIndexOf(word);
      if (idx !== -1) {
        const copy = [...list];
        copy.splice(idx, 1);
        setConstructedTokens((prev) => ({ ...prev, [sentenceId]: copy }));
      }
    }
    setEx4Checked((prev) => ({ ...prev, [sentenceId]: false }));
  };

  const checkSentence = (item: ABL2ScrambledSentence) => {
    const list = constructedTokens[item.id] || [];
    const isCorrect =
      list.length === item.correctOrder.length &&
      list.every((w, i) => w === item.correctOrder[i]);
    setEx4Checked((prev) => ({ ...prev, [item.id]: true }));
    if (isCorrect) {
      confetti({ particleCount: 40, spread: 50 });
      onProgressUpdate(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      <div className="pb-3 border-b border-zinc-200">
        <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
          Activity Book • Page 7 • Exercise 4
        </span>
        <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
          Put the words in the correct order to make sentences.
        </h4>
        <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
          رتب الكلمات في الترتيب الصحيح لتكوين جمل تامة:
        </p>
      </div>

      <div className="space-y-6">
        {lesson2ActivityData.page7Ex4Scrambled.map((item, idx) => {
          const constructed = constructedTokens[item.id] || [];
          const available = [...item.scrambled];
          constructed.forEach((w) => {
            const i = available.indexOf(w);
            if (i !== -1) available.splice(i, 1);
          });
          const isChecked = ex4Checked[item.id];
          const isCorrect =
            constructed.length === item.correctOrder.length &&
            constructed.every((w, i) => w === item.correctOrder[i]);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 transition-all space-y-3 text-left ${
                isChecked
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-rose-400 bg-rose-50/40'
                  : 'border-zinc-200 bg-zinc-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-800 font-sans">
                  Sentence ({idx === 0 ? 'a' : 'b'}):
                </span>
                {item.arabicTranslation && (
                  <button
                    type="button"
                    onClick={() => toggleTranslation(item.id)}
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      visibleTranslations[item.id]
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                    title="ترجمة المعنى"
                  >
                    <Languages className="w-3 h-3 text-indigo-600" />
                    <span>{visibleTranslations[item.id] ? 'إخفاء المعنى' : 'ترجمة المعنى'}</span>
                  </button>
                )}
              </div>

              {item.arabicTranslation && visibleTranslations[item.id] && (
                <div
                  className="text-xs text-zinc-700 font-arabic bg-zinc-100/80 p-2 rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150"
                  dir="rtl"
                >
                  المعنى المطلوب: {item.arabicTranslation}
                </div>
              )}

              {/* Built sentence area LTR */}
              <div
                className={`min-h-12 p-3 bg-white border-2 rounded-xl flex flex-wrap items-center gap-2 ${
                  isChecked
                    ? isCorrect
                      ? 'border-emerald-500'
                      : 'border-rose-400'
                    : 'border-zinc-300'
                }`}
              >
                {constructed.length === 0 ? (
                  <span className="text-xs text-zinc-400 italic font-sans">
                    Tap words below in order to build sentence...
                  </span>
                ) : (
                  constructed.map((w, wIdx) => (
                    <button
                      key={wIdx}
                      onClick={() => handleWordChipClick(item.id, w, false)}
                      className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 cursor-pointer font-sans"
                    >
                      {w}
                    </button>
                  ))
                )}
                {constructed.length > 0 && (
                  <span className="font-bold text-sm text-zinc-900">
                    {item.punctuation}
                  </span>
                )}
              </div>

              {/* If checked and wrong: show correct sentence in GREEN in front */}
              {isChecked && !isCorrect && (
                <div className="p-2.5 rounded-lg bg-emerald-100/90 border border-emerald-300 text-emerald-800 font-bold text-xs font-sans">
                  الجملة الصحيحة: {item.correctOrder.join(' ')}{item.punctuation}
                </div>
              )}

              {/* Remaining words pool LTR */}
              <div className="flex flex-wrap items-center gap-1.5">
                {available.map((w, wIdx) => (
                  <button
                    key={wIdx}
                    onClick={() => handleWordChipClick(item.id, w, true)}
                    className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-lg text-xs font-semibold text-zinc-800 cursor-pointer font-sans"
                  >
                    + {w}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                <button
                  onClick={() =>
                    setConstructedTokens((prev) => ({ ...prev, [item.id]: [] }))
                  }
                  className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 cursor-pointer font-sans"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={() => checkSentence(item)}
                  disabled={constructed.length === 0}
                  className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 cursor-pointer font-arabic"
                >
                  التحقق من الترتيب
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
