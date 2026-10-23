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

  return (
    <div
      className="bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/40 rounded-3xl border border-indigo-100/80 p-4 sm:p-5 shadow-xs space-y-3.5 font-sans text-right"
      dir="rtl"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-100/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100/90 text-indigo-900 border border-indigo-200 font-arabic">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {showcase.badgeAr}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-2">
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
          className={`px-3 py-1.5 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-center shadow-2xs ${
            isPlayingAll
              ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xs active:scale-95'
          }`}
          title={isPlayingAll ? 'إيقاف الاستماع المتتابع' : 'استمع إلى جميع المفردات بالترتيب'}
        >
          {isPlayingAll ? (
            <>
              <VolumeX className="w-3.5 h-3.5 animate-pulse" />
              <span>إيقاف الاستماع</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>استمع للكل بالترتيب</span>
            </>
          )}
        </button>
      </div>

      {/* Compact Cards Grid: Small Image Thumbnails & Direct Textbook Phrasal Chunks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {showcase.items.map((item) => {
          const isActive = activeItemId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSpeakItem(item)}
              className={`group bg-white rounded-2xl border p-2.5 sm:p-3 transition-all duration-200 cursor-pointer flex items-center gap-3 relative overflow-hidden select-none ${
                isActive
                  ? 'border-indigo-600 ring-2 ring-indigo-400/40 shadow-sm scale-[1.01] bg-indigo-50/30'
                  : 'border-zinc-200/90 hover:border-indigo-300 hover:shadow-2xs hover:bg-zinc-50/40'
              }`}
            >
              {/* Compact Small Image Thumbnail (w-14 h-14 on mobile, w-16 h-16 on desktop) */}
              {item.imageUrl && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0 relative flex items-center justify-center p-0.5">
                  <img
                    src={item.imageUrl}
                    alt={item.wordEn}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.tag && (
                    <span
                      className={`absolute bottom-0 inset-x-0 text-[8px] sm:text-[9px] font-bold text-center py-0.5 rounded-b-lg font-arabic truncate ${
                        item.tagColor || 'bg-zinc-800/80 text-white'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
              )}

              {/* Text Info */}
              <div className="flex-1 min-w-0 space-y-0.5 text-right font-arabic">
                {/* English phrase + audio button */}
                <div className="flex items-center justify-between gap-1.5" dir="ltr">
                  <span className="text-xs sm:text-sm font-extrabold text-zinc-900 group-hover:text-indigo-600 transition-colors truncate font-sans">
                    {item.wordEn}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''}`} />
                  </div>
                </div>

                {/* Arabic Translation */}
                <p className="text-[11px] sm:text-xs font-bold text-zinc-700 truncate">
                  {item.wordAr}
                </p>

                {/* Textbook Context / Quote */}
                {item.contextEn && (
                  <p
                    className="text-[10px] text-zinc-400 font-sans italic truncate text-left pt-0.5"
                    dir="ltr"
                    title={item.contextEn}
                  >
                    &ldquo;{item.contextEn}&rdquo;
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
