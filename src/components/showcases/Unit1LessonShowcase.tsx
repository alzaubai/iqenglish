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
    // Stop any ongoing play-all
    cancelPlayAllRef.current = true;
    setIsPlayingAll(false);
    SpeechEngine.stop();

    setActiveItemId(item.id);

    // Speak English phrase clearly with educational pacing
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

  // Determine responsive grid columns matching Lesson 1 & Lesson 2
  const gridColsClass =
    showcase.items.length === 5
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'
      : showcase.items.length === 4
      ? 'grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3'
      : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3';

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-2xs space-y-4 font-sans text-right" dir="rtl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic flex items-center gap-2">
              <span>{showcase.titleAr}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 font-mono font-normal" dir="ltr">
                {showcase.titleEn}
              </span>
            </h3>
            <p className="text-xs text-zinc-500 font-arabic mt-0.5">
              {showcase.descriptionAr}
            </p>
          </div>
        </div>

        {/* Play All Button & Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handlePlayAll}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
              isPlayingAll
                ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xs active:scale-95'
            }`}
            title={isPlayingAll ? 'إيقاف الاستماع المتتابع' : 'استمع إلى جميع المفردات بالترتيب'}
          >
            {isPlayingAll ? (
              <>
                <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                <span>إيقاف</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>استمع للكل بالترتيب</span>
              </>
            )}
          </button>

          <span className="text-[11px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full font-arabic hidden sm:inline-block">
            انقر لسماع النطق
          </span>
        </div>
      </div>

      {/* Grid of 6 Compact Cards (Matching Lesson 1 & Lesson 2 format) */}
      <div className={gridColsClass}>
        {showcase.items.map((item) => {
          const isActive = activeItemId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSpeakItem(item)}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between gap-2.5 cursor-pointer group ${
                isActive
                  ? 'bg-blue-50/80 border-blue-400 shadow-sm scale-102 ring-2 ring-blue-200'
                  : 'bg-white hover:bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 hover:shadow-xs'
              }`}
              title={item.contextAr || item.contextEn}
            >
              {/* Who did it / Concept Tag Badge */}
              {item.tag && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border font-arabic truncate max-w-full ${
                    item.tagColor || 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  }`}
                >
                  {item.tag}
                </span>
              )}

              {/* Illustrated Square Image (w-20 h-20 on mobile, w-24 h-24 on desktop) */}
              {item.imageUrl && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 p-1 flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.wordEn}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              )}

              {/* English Phrase & Arabic Meaning (No truncation, naturally wrapped & readable) */}
              <div className="w-full space-y-0.5">
                <span className="text-xs sm:text-sm font-bold text-zinc-900 block font-sans leading-snug">
                  {item.wordEn}
                </span>
                <span className="text-[11px] text-zinc-500 font-arabic block mt-0.5">
                  {item.wordAr}
                </span>
              </div>

              {/* Speaker action indicator */}
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-800'
                }`}
              >
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
