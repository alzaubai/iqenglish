import React from 'react';
import { Feather, Info, Volume2, Heart, Award, Compass, Sparkles } from 'lucide-react';
import { lesson10ActivityData } from '../../../data/activityBookLesson10Data';

export const SwiftStoryElements: React.FC = () => {
  const { elements, amazingFacts, titleEn, titleAr } =
    lesson10ActivityData.storyElements;

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
              <Compass className="w-3.5 h-3.5" />
              Story Analysis
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              Key Elements & Facts
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {titleAr} - بطاقة المراجعة الشاملة قبل الامتحان المدرسي
          </p>
        </div>
      </div>

      {/* Story Elements Cards */}
      <div className="space-y-3.5">
        <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-sans">
          Key Story Elements (عناصر القصة):
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {elements.map((el, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/80 transition-all space-y-2 text-left ${
                idx === 3 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-zinc-200/60 pb-1.5">
                <span className="text-xs font-bold text-zinc-900 font-sans">
                  {el.labelEn}
                </span>
                <button
                  onClick={() => playTTS(el.contentEn)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-800 font-sans leading-relaxed">
                {el.contentEn}
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right leading-relaxed pt-1" dir="rtl">
                {el.contentAr}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Amazing Facts about Swifts */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 text-zinc-700" />
          <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-sans">
            Incredible Facts about the Swift Bird (حقائق مذهلة عن طائر السَّمامة):
          </h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {amazingFacts.map((fact, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-2xs space-y-1.5 text-left"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="w-5 h-5 rounded-md bg-zinc-100 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans shrink-0">
                  {idx + 1}
                </span>
                <button
                  onClick={() => playTTS(fact.factEn)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-bold text-zinc-900 font-sans leading-snug">
                {fact.factEn}
              </p>
              <p className="text-[11px] text-zinc-500 font-arabic text-right leading-relaxed pt-0.5" dir="rtl">
                {fact.factAr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
