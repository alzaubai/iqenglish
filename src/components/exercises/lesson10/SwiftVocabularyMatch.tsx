import React, { useState } from 'react';
import { Volume2, BookMarked, Sparkles, Languages } from 'lucide-react';
import { lesson10ActivityData } from '../../../data/activityBookLesson10Data';

export const SwiftVocabularyMatch: React.FC = () => {
  const vocabulary = lesson10ActivityData.vocabulary;
  const [showTranslations, setShowTranslations] = useState(false);

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <BookMarked className="w-3.5 h-3.5" />
              Story Vocabulary
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              6 Key Words
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Key Words & Definitions from the Story
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            المفردات الأساسية لقصة طائر السَّمامة ونطقها واستخدامها في الجمل
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowTranslations(!showTranslations)}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border font-arabic transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-center ${
            showTranslations
              ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
              : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
          }`}
        >
          <Languages className="w-3.5 h-3.5 text-indigo-600" />
          <span>{showTranslations ? 'إخفاء ترجمة المفردات' : 'ترجمة المفردات'}</span>
        </button>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {vocabulary.map((voc) => (
          <div
            key={voc.id}
            className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/80 transition-all space-y-2 text-left"
          >
            <div className="flex items-start justify-between gap-2 border-b border-zinc-200/60 pb-2">
              <div>
                <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans block">
                  {voc.wordEn}
                </span>
                {showTranslations && (
                  <span className="text-xs font-bold text-zinc-600 font-arabic block pt-0.5 animate-in fade-in duration-150" dir="rtl">
                    {voc.wordAr}
                  </span>
                )}
              </div>
              <button
                onClick={() => playTTS(`${voc.wordEn}. ${voc.exampleSentenceEn}`)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                title="Listen to word and example"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {showTranslations && (
              <p className="text-[11px] sm:text-xs text-zinc-600 font-arabic text-right leading-relaxed bg-zinc-100 p-2 rounded-lg border border-zinc-200 animate-in fade-in duration-150" dir="rtl">
                {voc.definitionAr}
              </p>
            )}

            <div className="p-2.5 bg-white rounded-lg border border-zinc-200 text-xs font-sans text-zinc-800 space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Story Example:
              </span>
              <p className="italic text-zinc-700 leading-snug">
                &ldquo;{voc.exampleSentenceEn}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
