import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Sparkles, VolumeX, Play } from 'lucide-react';
import { SpeechEngine } from '../../utils/speech';
import { UNIT1_LESSON_SHOWCASES, ShowcaseVocabularyItem } from '../../data/unit1ShowcaseData';

interface Unit1LessonShowcaseProps {
  lessonNumber: number;
}

export const Unit1LessonShowcase: React.FC<Unit1LessonShowcaseProps> = ({ lessonNumber }) => {
  const showcase = UNIT1_LESSON_SHOWCASES[lessonNumber];
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const cancelPlayAllRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset state on lesson switch
    setActiveItemId(null);
    setIsPlayingAll(false);
    cancelPlayAllRef.current = true;
    SpeechEngine.stop();
  }, [lessonNumber]);

  if (!showcase || !showcase.items || showcase.items.length === 0) {
    return null;
  }

  const handleSpeakItem = (item: ShowcaseVocabularyItem) => {
    // Stop any ongoing speech
    cancelPlayAllRef.current = true;
    setIsPlayingAll(false);
    SpeechEngine.stop();

    setActiveItemId(item.id);

    // Speak English phrase clearly
    SpeechEngine.speakText(item.wordEn, {
      speaker: 'Richard',
      gender: 'male',
      rate: 0.85,
      onEnd: () => {
        setTimeout(() => {
          setActiveItemId((prev) => (prev === item.id ? null : prev));
        }, 1200);
      },
      onError: () => {
        setActiveItemId(null);
      },
    });
  };

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      cancelPlayAllRef.current = true;
      setIsPlayingAll(false);
      SpeechEngine.stop();
      setActiveItemId(null);
      return;
    }

    cancelPlayAllRef.current = false;
    setIsPlayingAll(true);

    for (let i = 0; i < showcase.items.length; i++) {
      if (cancelPlayAllRef.current) break;
      const item = showcase.items[i];
      setActiveItemId(item.id);

      await new Promise<void>((resolve) => {
        SpeechEngine.speakText(item.wordEn, {
          speaker: 'Richard',
          gender: 'male',
          rate: 0.85,
          onEnd: () => {
            setTimeout(resolve, 800);
          },
          onError: () => {
            resolve();
          },
        });
      });
    }

    if (!cancelPlayAllRef.current) {
      setActiveItemId(null);
      setIsPlayingAll(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/40 rounded-3xl border border-indigo-100/80 p-4 sm:p-6 shadow-xs space-y-4 font-sans text-right" dir="rtl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100/90 text-indigo-900 border border-indigo-200 font-arabic">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {showcase.badgeAr}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-2">
            <span>{showcase.titleAr}</span>
            <span dir="ltr" className="text-xs sm:text-sm font-semibold text-zinc-500 font-sans">
              ({showcase.titleEn})
            </span>
          </h3>
          <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
            {showcase.descriptionAr}
          </p>
        </div>

        {/* Play All Button */}
        <button
          onClick={handlePlayAll}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-center shadow-2xs ${
            isPlayingAll
              ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xs active:scale-95'
          }`}
          title={isPlayingAll ? 'إيقاف الاستماع المتتابع' : 'استمع إلى جميع المفردات بالترتيب'}
        >
          {isPlayingAll ? (
            <>
              <VolumeX className="w-4 h-4 animate-pulse" />
              <span>إيقاف الاستماع</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>استمع للكل بالترتيب</span>
            </>
          )}
        </button>
      </div>

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {showcase.items.map((item) => {
          const isActive = activeItemId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSpeakItem(item)}
              className={`group bg-white rounded-2xl border p-3.5 sm:p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden select-none ${
                isActive
                  ? 'border-indigo-600 ring-2 ring-indigo-400/40 shadow-md scale-[1.02] bg-indigo-50/20'
                  : 'border-zinc-200/90 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              {/* Optional Illustrated Image */}
              {item.imageUrl && (
                <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 bg-zinc-100 border border-zinc-100 relative shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.wordEn}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span
                      className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-2xs font-arabic ${
                        item.tagColor || 'bg-white text-zinc-800 border-zinc-200'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
              )}

              {/* Text Info */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-start justify-between gap-2" dir="ltr">
                  <span className="text-base sm:text-lg font-extrabold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                    {item.wordEn}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                  </div>
                </div>

                {/* Arabic Translation */}
                <p className="text-xs sm:text-sm font-bold text-zinc-700 font-arabic text-right">
                  {item.wordAr}
                </p>

                {/* Example / Context Sentence */}
                {item.contextEn && (
                  <div className="pt-1.5 border-t border-zinc-100 text-left" dir="ltr">
                    <p className="text-[11px] text-zinc-500 font-sans italic leading-tight">
                      "{item.contextEn}"
                    </p>
                    {item.contextAr && (
                      <p className="text-[10px] text-zinc-400 font-arabic text-right pt-0.5" dir="rtl">
                        {item.contextAr}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
