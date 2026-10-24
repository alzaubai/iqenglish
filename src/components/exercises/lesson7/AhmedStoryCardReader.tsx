import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, BookOpen, Clock, Tag } from 'lucide-react';
import { lesson7ActivityData, AhmedStoryScene } from '../../../data/activityBookLesson7Data';
import { SpeechEngine } from '../../../utils/speech';

export const AhmedStoryCardReader: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, scenes } =
    lesson7ActivityData.page17AhmedStory;

  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [showArabicTranslation, setShowArabicTranslation] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playSceneAudio = (scene: AhmedStoryScene, onEndCallback?: () => void) => {
    // Stop any ongoing speech or audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setActiveSceneId(scene.id);

    // Try playing static audio file if it exists, otherwise fallback to Web Speech
    const audio = new Audio(scene.audioFileUrl);
    audioRef.current = audio;

    audio.onended = () => {
      setActiveSceneId(null);
      if (onEndCallback) onEndCallback();
    };

    audio.onerror = () => {
      // Fallback to SpeechEngine with natural, conversational pace
      SpeechEngine.speakText(scene.textEn, {
        speaker: 'narrator',
        rate: 0.88,
        pitch: 0.96,
        onEnd: () => {
          setActiveSceneId(null);
          if (onEndCallback) onEndCallback();
        },
        onError: () => {
          setActiveSceneId(null);
          if (onEndCallback) onEndCallback();
        },
      });
    };

    audio.play().catch(() => {
      // Browser autoplay policy or missing file fallback
      SpeechEngine.speakText(scene.textEn, {
        speaker: 'narrator',
        rate: 0.88,
        pitch: 0.96,
        onEnd: () => {
          setActiveSceneId(null);
          if (onEndCallback) onEndCallback();
        },
      });
    });
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSceneId(null);
    setIsPlayingFull(false);
  };

  const handlePlayFullStory = () => {
    if (isPlayingFull) {
      handleStopAudio();
      return;
    }

    setIsPlayingFull(true);
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= scenes.length) {
        setIsPlayingFull(false);
        setActiveSceneId(null);
        return;
      }

      const scene = scenes[currentIndex];
      currentIndex++;
      playSceneAudio(scene, () => {
        // Small 400ms pause between story scenes
        setTimeout(() => {
          playNext();
        }, 400);
      });
    };

    playNext();
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 17 • Reading Comprehension Story
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center flex-wrap">
          <button
            onClick={() => setShowArabicTranslation(!showArabicTranslation)}
            className="px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors font-arabic cursor-pointer"
          >
            {showArabicTranslation ? 'إخفاء الترجمة' : 'إظهار الترجمة'}
          </button>
          <button
            onClick={handlePlayFullStory}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
              isPlayingFull
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            {isPlayingFull ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause story</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play full story</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 6 Event Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenes.map((scene) => {
          const isActive = activeSceneId === scene.id;

          return (
            <div
              key={scene.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'border-zinc-900 bg-zinc-50/60 shadow-md ring-1 ring-zinc-900/10'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs'
              }`}
            >
              {/* Event Header & Time context */}
              <div className="p-3 sm:p-3.5 border-b border-zinc-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0">
                    {scene.sceneNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 font-sans truncate">
                    {scene.titleEn}
                  </span>
                </div>
                {scene.timeContext && (
                  <span className="text-[11px] font-sans font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    {scene.timeContext}
                  </span>
                )}
              </div>

              {/* Event Image */}
              <div className="relative aspect-video sm:aspect-16/10 bg-zinc-100 overflow-hidden border-b border-zinc-100">
                <img
                  src={scene.imageUrl}
                  alt={scene.titleEn}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <button
                  onClick={() => {
                    if (isActive) {
                      handleStopAudio();
                    } else {
                      playSceneAudio(scene);
                    }
                  }}
                  className={`absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-sans backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white/95 text-zinc-900 hover:bg-white border border-zinc-200/80'
                  }`}
                  title={isActive ? 'Stop audio' : 'Listen to this scene'}
                >
                  {isActive ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scene Texts & Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-left">
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans leading-relaxed">
                    {scene.textEn}
                  </p>
                  {showArabicTranslation && (
                    <p className="text-xs text-zinc-600 font-arabic leading-relaxed text-right pt-1 border-t border-zinc-100" dir="rtl">
                      {scene.textAr}
                    </p>
                  )}
                </div>

                {/* Key Vocabulary Pills */}
                {scene.keyVocabulary && scene.keyVocabulary.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-zinc-400 font-sans flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Keywords:
                    </span>
                    {scene.keyVocabulary.map((vocab, vIdx) => (
                      <span
                        key={vIdx}
                        className="text-[11px] font-sans font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md border border-zinc-200/60"
                        title={vocab.meaningAr}
                      >
                        <strong className="text-zinc-900">{vocab.word}</strong>
                        <span className="text-zinc-400 font-arabic mx-1">({vocab.meaningAr})</span>
                      </span>
                    ))}
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
