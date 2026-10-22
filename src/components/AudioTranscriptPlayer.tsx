import React, { useState, useEffect, useRef } from 'react';
import { TranscriptSection, TranscriptLine } from '../types/curriculum';
import { SpeechEngine } from '../utils/speech';
import { findMatchingArabicInLine } from '../utils/wordTranslations';
import { LineChunk } from '../data/curriculumChunks';
import { AudioPlayerControls } from './audio/AudioPlayerControls';
import { TranscriptLineItem } from './audio/TranscriptLineItem';
import { ActiveWordHighlight } from './audio/types';

interface AudioTranscriptPlayerProps {
  transcripts: TranscriptSection[];
  lessonTitle: string;
}

export const AudioTranscriptPlayer: React.FC<AudioTranscriptPlayerProps> = ({
  transcripts,
}) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineId, setCurrentLineId] = useState<string | null>(null);
  const [activeWordInfo, setActiveWordInfo] = useState<ActiveWordHighlight | null>(null);
  const [showArabicTranslation, setShowArabicTranslation] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0); // Default natural normal pace (1.0x)

  const activeTrack = transcripts[activeTrackIndex] || transcripts[0];
  const queueIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const speechRateRef = useRef<number>(speechRate);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync speech rate
  useEffect(() => {
    speechRateRef.current = speechRate;
    if (currentAudioRef.current) {
      currentAudioRef.current.playbackRate = speechRate;
    }
  }, [speechRate]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  // Stop playback when switching track or lesson
  useEffect(() => {
    stopPlayback();
    queueIndexRef.current = 0;
    setCurrentLineId(null);
    setActiveWordInfo(null);
  }, [activeTrackIndex, activeTrack?.id]);

  // Auto-scroll active line box into view smoothly
  useEffect(() => {
    if (currentLineId) {
      const el = document.getElementById(`line-box-${currentLineId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentLineId]);

  const stopPlayback = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentLineId(null);
    setActiveWordInfo(null);
    SpeechEngine.stop();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  // Preload audio files for the active track into memory for instant, seamless playback
  useEffect(() => {
    if (!activeTrack?.lines) return;
    const preloadedElements: HTMLAudioElement[] = [];

    activeTrack.lines.forEach((line) => {
      if (line.audioFileUrl) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = line.audioFileUrl;
        preloadedElements.push(audio);
      }
    });

    return () => {
      preloadedElements.forEach((audio) => {
        audio.src = '';
      });
    };
  }, [activeTrack?.id]);

  /**
   * Fallback speech synthesis if audio file is missing or fails to load
   */
  const playWithSpeechFallback = (line: TranscriptLine, onComplete?: () => void) => {
    setCurrentLineId(line.id);
    const isFemale =
      line.gender === 'female' || SpeechEngine.getSpeakerGender(line.speaker) === 'female';

    SpeechEngine.speakText(line.textEn, {
      speaker: line.speaker,
      gender: isFemale ? 'female' : 'male',
      rate: speechRateRef.current,
      onEnd: () => {
        setCurrentLineId(null);
        if (onComplete) onComplete();
      },
      onError: () => {
        setCurrentLineId(null);
        if (onComplete) onComplete();
      },
    });
  };

  /**
   * Play lines sequentially with exact millisecond synchronization:
   * Real studio recordings with intelligent SpeechEngine fallback.
   */
  const playQueueLine = (index: number) => {
    if (!isPlayingRef.current) return;
    const lines = activeTrack.lines;

    if (index >= lines.length) {
      stopPlayback();
      return;
    }

    queueIndexRef.current = index;
    const line = lines[index];

    // If pre-recorded studio audio file exists for this individual line
    if (line.audioFileUrl) {
      setCurrentLineId(line.id);

      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      const audio = new Audio(line.audioFileUrl);
      audio.preload = 'auto';
      audio.playbackRate = speechRateRef.current;
      currentAudioRef.current = audio;

      audio.onended = () => {
        if (!isPlayingRef.current) return;
        setTimeout(() => {
          playQueueLine(index + 1);
        }, 250);
      };

      audio.onerror = () => {
        console.warn(`[Studio Audio] Could not load audio for ${line.id}, falling back to SpeechEngine.`);
        if (!isPlayingRef.current) return;
        playWithSpeechFallback(line, () => {
          if (!isPlayingRef.current) return;
          setTimeout(() => playQueueLine(index + 1), 250);
        });
      };

      audio.play().catch((err) => {
        console.warn(`[Studio Audio] Playback interrupted for ${line.id}:`, err);
        if (!isPlayingRef.current) return;
        setTimeout(() => playQueueLine(index + 1), 250);
      });
      return;
    }

    // If line has no studio recording, speak via SpeechEngine fallback
    playWithSpeechFallback(line, () => {
      if (!isPlayingRef.current) return;
      setTimeout(() => playQueueLine(index + 1), 250);
    });
  };

  const playEntireTrack = () => {
    if (!activeTrack || activeTrack.lines.length === 0) return;

    if (isPlaying) {
      stopPlayback();
      return;
    }

    isPlayingRef.current = true;
    setIsPlaying(true);
    queueIndexRef.current = 0;
    playQueueLine(0);
  };

  /**
   * Play single line audio strictly from studio recording
   */
  const playSingleLine = (line: TranscriptLine) => {
    stopPlayback();

    if (line.audioFileUrl) {
      setCurrentLineId(line.id);
      const lineAudio = new Audio(line.audioFileUrl);
      lineAudio.preload = 'auto';
      lineAudio.playbackRate = speechRateRef.current;
      currentAudioRef.current = lineAudio;

      lineAudio.onended = () => {
        setCurrentLineId(null);
        currentAudioRef.current = null;
      };

      lineAudio.onerror = () => {
        console.warn(`[Studio Audio] Failed to play single line ${line.id}, falling back to SpeechEngine.`);
        setCurrentLineId(null);
        currentAudioRef.current = null;
        playWithSpeechFallback(line);
      };

      lineAudio.play().catch((err) => {
        console.warn('[Studio Audio] Play single line prevented:', err);
        setCurrentLineId(null);
        currentAudioRef.current = null;
        playWithSpeechFallback(line);
      });
    } else {
      playWithSpeechFallback(line);
    }
  };

  /**
   * Word click handler:
   * 1. Pronounces English word with character voice & pitch.
   * 2. Highlights English word.
   * 3. Finds and simultaneously highlights the matching Arabic translation in the line!
   */
  const handleWordClick = (
    word: string,
    line: TranscriptLine,
    wIdx: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const cleanW = word.replace(/[^\w'-]/g, '');
    if (!cleanW) return;

    // Pause any continuous line audio so word is heard clearly
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    SpeechEngine.stop();

    // Match Arabic translation using line ID, sentence context, and word index
    const arabicMatch = findMatchingArabicInLine(
      cleanW,
      line.textAr,
      line.id,
      line.textEn,
      wIdx
    );

    setActiveWordInfo({
      lineId: line.id,
      englishWord: cleanW,
      arabicMatch,
    });

    const isFemale =
      line.gender === 'female' || SpeechEngine.getSpeakerGender(line.speaker) === 'female';

    // Speak word clearly
    SpeechEngine.speakWord(cleanW, {
      speaker: line.speaker,
      gender: isFemale ? 'female' : 'male',
      rate: Math.min(speechRateRef.current, 0.82),
      onEnd: () => {
        setTimeout(() => {
          setActiveWordInfo((prev) =>
            prev?.englishWord.toLowerCase() === cleanW.toLowerCase() && prev?.lineId === line.id
              ? null
              : prev
          );
        }, 1800);
      },
      onError: () => {
        setTimeout(() => setActiveWordInfo(null), 1800);
      },
    });
  };

  /**
   * Phrasal Chunk click handler:
   * 1. Pronounces the full natural phrase.
   * 2. Highlights the English phrase chunk.
   * 3. Simultaneously highlights the exact matching Arabic equivalent phrase in the line!
   */
  const handleChunkClick = (
    chunk: LineChunk,
    line: TranscriptLine,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!chunk.en) return;

    // Pause any continuous line audio so chunk is heard clearly
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    SpeechEngine.stop();

    setActiveWordInfo({
      lineId: line.id,
      englishWord: chunk.en,
      arabicMatch: chunk.ar,
    });

    const isFemale =
      line.gender === 'female' || SpeechEngine.getSpeakerGender(line.speaker) === 'female';

    const cleanPhraseToSpeak = chunk.en.replace(/[.,!؟،?]/g, '').trim();

    // Speak phrase clearly
    SpeechEngine.speakText(cleanPhraseToSpeak, {
      speaker: line.speaker,
      gender: isFemale ? 'female' : 'male',
      rate: Math.min(speechRateRef.current, 0.85),
      onEnd: () => {
        setTimeout(() => {
          setActiveWordInfo((prev) =>
            prev?.englishWord === chunk.en && prev?.lineId === line.id ? null : prev
          );
        }, 2200);
      },
      onError: () => {
        setTimeout(() => setActiveWordInfo(null), 2200);
      },
    });
  };

  return (
    <div
      className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden mb-6 max-w-full"
      dir="rtl"
    >
      {/* Track Selector & Master Header Controls */}
      <AudioPlayerControls
        activeTrack={activeTrack}
        transcripts={transcripts}
        activeTrackIndex={activeTrackIndex}
        onSelectTrack={(idx) => setActiveTrackIndex(idx)}
        isPlaying={isPlaying}
        onTogglePlay={playEntireTrack}
        onStopPlayback={stopPlayback}
        speechRate={speechRate}
        onChangeSpeechRate={(rate) => setSpeechRate(rate)}
        showArabicTranslation={showArabicTranslation}
        onToggleTranslation={() => setShowArabicTranslation(!showArabicTranslation)}
      />

      {/* Transcript Lines List (Comic Chat Experience) */}
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-5 max-h-[680px] overflow-y-auto bg-zinc-50/50">
        {activeTrack.lines.map((line) => (
          <TranscriptLineItem
            key={line.id}
            line={line}
            isLineActive={currentLineId === line.id}
            activeWordInfo={activeWordInfo}
            showArabicTranslation={showArabicTranslation}
            onPlayLine={playSingleLine}
            onWordClick={handleWordClick}
            onChunkClick={handleChunkClick}
          />
        ))}
      </div>
    </div>
  );
};
export default AudioTranscriptPlayer;
