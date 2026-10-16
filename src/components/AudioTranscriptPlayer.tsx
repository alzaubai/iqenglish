import React, { useState, useEffect, useRef } from'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Languages,
  Gauge,
  Sparkles
} from'lucide-react';
import { TranscriptSection, TranscriptLine } from'../types/curriculum';
import { SpeechEngine } from'../utils/speech';
import { findMatchingArabicInLine } from'../utils/wordTranslations';
import { CURRICULUM_CHUNKS, LineChunk } from'../data/curriculumChunks';
import { CharacterAvatar } from'./CharacterAvatar';
import { LINE_SCENE_IMAGES, LineSceneIllustration } from '../data/lessonScenes';

interface AudioTranscriptPlayerProps {
  transcripts: TranscriptSection[];
  lessonTitle: string;
}

interface ActiveWordHighlight {
  lineId: string;
  englishWord: string;
  arabicMatch: string | null;
}

interface CharacterProfile {
  nameAr: string;
  tag: string;
  gender:'male' |'female';
  isAlternating: boolean;
  accentBadge: string;
  activeRing: string;
  borderNormal: string;
}

const getCharacterProfile = (speaker: string, gender?:'male' |'female'): CharacterProfile => {
  const norm = speaker.trim().toLowerCase();
  switch (norm) {
    case'ahmed':
      return {
        nameAr:'أحمد',
        tag:'يسأل صديقه عن العطلة',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-blue-100 text-blue-900 border-blue-200',
        activeRing:'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-blue-200',
      };
    case'faisal':
      return {
        nameAr:'فيصل',
        tag:'قضى عطلته عند النهر',
        gender:'male',
        isAlternating: true,
        accentBadge:'bg-teal-100 text-teal-900 border-teal-200',
        activeRing:'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal:'border-zinc-200 hover:border-teal-200',
      };
    case'khalid':
      return {
        nameAr:'خالد',
        tag:'حدثت معه حادثة طريفة في القارب',
        gender:'male',
        isAlternating: true,
        accentBadge:'bg-blue-100 text-blue-900 border-blue-200',
        activeRing:'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-blue-200',
      };
    case'mariam':
      return {
        nameAr:'مريم',
        tag:'تذكر أخاها بحادثة القارب الطريفة',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-rose-100 text-rose-900 border-rose-200',
        activeRing:'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal:'border-zinc-200 hover:border-rose-200',
      };
    case'rasha':
      return {
        nameAr:'رشا',
        tag:'تسأل صديقاتها عن العطلة',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-purple-100 text-purple-900 border-purple-200',
        activeRing:'border-purple-400 ring-2 ring-purple-300/80 bg-purple-50/40',
        borderNormal:'border-zinc-200 hover:border-purple-200',
      };
    case'huda':
      return {
        nameAr:'هدى',
        tag:'بقيت بالمنزل وصنعت ملابس',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-pink-100 text-pink-900 border-pink-200',
        activeRing:'border-pink-400 ring-2 ring-pink-300/80 bg-pink-50/40',
        borderNormal:'border-zinc-200 hover:border-pink-200',
      };
    case'muna':
      return {
        nameAr:'منى',
        tag:'قرأت كتباً وتعلّمت الطبخ',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-amber-100 text-amber-900 border-amber-200',
        activeRing:'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal:'border-zinc-200 hover:border-amber-200',
      };
    case'richard':
      return {
        nameAr:'ريتشارد',
        tag:'سائح بريطاني في العراق ️',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-amber-100 text-amber-900 border-amber-200',
        activeRing:'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal:'border-zinc-200 hover:border-amber-200',
      };
    case'sara':
      return {
        nameAr:'سارة',
        tag:'تتحدث عن عطلتها وزيارة صديقتها',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing:'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal:'border-zinc-200 hover:border-emerald-200',
      };
    case'sameera':
      return {
        nameAr:'سميرة',
        tag:'صديقة سارة من أبوظبي ️',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-teal-100 text-teal-900 border-teal-200',
        activeRing:'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal:'border-zinc-200 hover:border-teal-200',
      };
    case'maysam':
      return {
        nameAr:'ميسم',
        tag:'تجمع طوابع وصور معالم بلدان العالم  (دفتر 3)',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-amber-100 text-amber-900 border-amber-200',
        activeRing:'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal:'border-zinc-200 hover:border-amber-200',
      };
    case'adel':
    case'adil':
      return {
        nameAr:'عادل',
        tag:'يحب تصوير الحيوانات وسفاري أفريقيا  (دفتر 6)',
        gender:'male',
        isAlternating: true,
        accentBadge:'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing:'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal:'border-zinc-200 hover:border-emerald-200',
      };
    case'bassem':
    case'basim':
      return {
        nameAr:'باسم',
        tag:'مهتم بالطائرات ويحلم أن يصبح طياراً ️‍️ (دفتر 4)',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-sky-100 text-sky-900 border-sky-200',
        activeRing:'border-sky-400 ring-2 ring-sky-300/80 bg-sky-50/40',
        borderNormal:'border-zinc-200 hover:border-sky-200',
      };
    case'rawan':
      return {
        nameAr:'روان',
        tag:'تجمع صور النباتات والأزهار الملونة  (دفتر 1)',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-rose-100 text-rose-900 border-rose-200',
        activeRing:'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal:'border-zinc-200 hover:border-rose-200',
      };
    case'laith':
      return {
        nameAr:'ليث',
        tag:'عاشق لكرة القدم والمباريات ️ (دفتر 5)',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-red-100 text-red-900 border-red-200',
        activeRing:'border-red-400 ring-2 ring-red-300/80 bg-red-50/40',
        borderNormal:'border-zinc-200 hover:border-red-200',
      };
    case'nader':
      return {
        nameAr:'نادر',
        tag:'يتحدث عن عاداته اليومية وظروف التكرار ⏰',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-blue-200',
      };
    case 'narrator':
      return {
        nameAr: 'الراوي',
        tag: 'قراءة نصوص وقطع المنهج',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing: 'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal: 'border-zinc-200 hover:border-emerald-200',
      };
    case 'karen':
      return {
        nameAr: 'كارين',
        tag: 'صديقة مراسلة من سيدني، أستراليا',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'sana':
      return {
        nameAr: 'سناء',
        tag: 'تتحدث عن يومها المميز على شاطئ البحر',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
        activeRing: 'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal: 'border-zinc-200 hover:border-teal-200',
      };
    case 'grandson':
      return {
        nameAr: 'الحفيد',
        tag: 'يسأل جده عما سيفعلونه غدا وفي المستقبل',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-blue-200',
      };
    case 'grandfather':
      return {
        nameAr: 'الجد',
        tag: 'يجيب حفيده بقوافي لطيفة ومحببة',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'yassir':
      return {
        nameAr: 'ياسر',
        tag: 'طالب عراقي في المتنزه ورحلة لندن',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing: 'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal: 'border-zinc-200 hover:border-emerald-200',
      };
    case 'simon':
      return {
        nameAr: 'سايمون',
        tag: 'طالب إنجليزي يعيش والده في البصرة',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-sky-100 text-sky-900 border-sky-200',
        activeRing: 'border-sky-400 ring-2 ring-sky-300/80 bg-sky-50/40',
        borderNormal: 'border-zinc-200 hover:border-sky-200',
      };
    case 'father':
      return {
        nameAr: 'والد ياسر',
        tag: 'يشرح لسايمون عن رمضان وعيد الفطر',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        activeRing: 'border-indigo-400 ring-2 ring-indigo-300/80 bg-indigo-50/40',
        borderNormal: 'border-zinc-200 hover:border-indigo-200',
      };
    case 'radio presenter':
      return {
        nameAr: 'مذيعة النشرة',
        tag: 'تقدم النشرة الجوية لمدينة لندن',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
        activeRing: 'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal: 'border-zinc-200 hover:border-teal-200',
      };
    case 'girl':
      return {
        nameAr: 'المحاورة',
        tag: 'تطرح أسئلة حول رياضة التزلج الجماعي',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-rose-100 text-rose-900 border-rose-200',
        activeRing: 'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal: 'border-zinc-200 hover:border-rose-200',
      };
    case 'halla':
      return {
        nameAr: 'هالة',
        tag: 'أخت ياسر الكبرى في رحلة عين لندن',
        gender: 'female',
        isAlternating: true,
        accentBadge: 'bg-purple-100 text-purple-900 border-purple-200',
        activeRing: 'border-purple-400 ring-2 ring-purple-300/80 bg-purple-50/40',
        borderNormal: 'border-zinc-200 hover:border-purple-200',
      };
    default: {
      const isFem = gender ==='female';
      return {
        nameAr: speaker,
        tag: isFem ?'طالبة' :'طالب',
        gender: isFem ?'female' :'male',
        isAlternating: false,
        accentBadge: isFem ?'bg-pink-100 text-pink-900 border-pink-200' :'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: isFem
          ?'border-pink-400 ring-2 ring-pink-300/80 bg-pink-50/40'
          :'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-zinc-300',
      };
    }
  }
};

// LINE_SCENE_IMAGES and LineSceneIllustration are modularized in src/data/lessonScenes.ts

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
        el.scrollIntoView({ behavior:'smooth', block:'nearest' });
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
   * Play lines sequentially with exact millisecond synchronization:
   * STRICT ELEVENLABS MODE: Plays real studio recordings only.
   * Google Web Speech fallback is strictly disabled for recordings.
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
        console.warn(`[Studio Audio] Could not load audio for ${line.id}, moving to next line.`);
        if (!isPlayingRef.current) return;
        setTimeout(() => playQueueLine(index + 1), 250);
      };

      audio.play().catch((err) => {
        console.warn(`[Studio Audio] Playback interrupted for ${line.id}:`, err);
        if (!isPlayingRef.current) return;
        setTimeout(() => playQueueLine(index + 1), 250);
      });
      return;
    }

    // If line has no studio recording, skip to next line without using robotic voice
    setTimeout(() => {
      if (isPlayingRef.current) {
        playQueueLine(index + 1);
      }
    }, 200);
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
   * Play single line audio strictly from ElevenLabs studio recording
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
        console.warn(`[Studio Audio] Failed to play single line ${line.id}`);
        setCurrentLineId(null);
        currentAudioRef.current = null;
      };

      lineAudio.play().catch((err) => {
        console.warn('[Studio Audio] Play single line prevented:', err);
        setCurrentLineId(null);
        currentAudioRef.current = null;
      });
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
    const cleanW = word.replace(/[^\w'-]/g,'');
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
      line.gender ==='female' || SpeechEngine.getSpeakerGender(line.speaker) ==='female';

    // Speak word clearly
    SpeechEngine.speakWord(cleanW, {
      speaker: line.speaker,
      gender: isFemale ?'female' :'male',
      rate: Math.min(speechRateRef.current, 0.82),
      onEnd: () => {
        // Keep highlight active for 1.8 seconds so student can read both English and Arabic
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
   * 1. Pronounces the full natural phrase (e.g. "by the river", "I went", "in the holidays").
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
      line.gender ==='female' || SpeechEngine.getSpeakerGender(line.speaker) ==='female';

    const cleanPhraseToSpeak = chunk.en.replace(/[.,!؟،?]/g,'').trim();

    // Speak phrase clearly
    SpeechEngine.speakText(cleanPhraseToSpeak, {
      speaker: line.speaker,
      gender: isFemale ?'female' :'male',
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

  /**
   * Renders the Arabic sentence with the matched translated phrase highlighted
   */
  const renderArabicLineWithHighlight = (
    textAr: string,
    arabicMatch: string | null,
    isFemale: boolean
  ) => {
    if (!arabicMatch) return <span>{textAr}</span>;

    // Check if target is directly in textAr, or stripped of punctuation
    let target = arabicMatch.trim();
    if (!textAr.includes(target)) {
      target = target.replace(/[.,!؟،]/g,'').trim();
    }
    if (!target || !textAr.includes(target)) {
      return <span>{textAr}</span>;
    }

    const parts = textAr.split(target);
    return (
      <span className="leading-relaxed">
        {parts.map((part, pIdx) => (
          <React.Fragment key={pIdx}>
            {part}
            {pIdx < parts.length - 1 && (
              <mark
                className={`inline-flex items-center px-2 py-0.5 mx-1 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 transform scale-105 shadow-sm ring-2 ${
                  isFemale
                    ?'bg-pink-300 text-pink-950 ring-pink-500 border border-pink-400'
                    :'bg-blue-300 text-blue-950 ring-blue-500 border border-blue-400'
                }`}
              >
                {target}
              </mark>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden mb-6 max-w-full" dir="rtl">
      {/* Track Selector & Master Header */}
      <div className="bg-zinc-50 border-b border-zinc-200 p-3.5 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                مزامنة صوتية ذكية (أزرق للأولاد • وردي للبنات)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic">
              {activeTrack.titleAr}
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-0.5" dir="ltr">
              {activeTrack.titleEn}
            </p>
          </div>

          {/* Track selector tabs if multiple tracks in lesson */}
          {transcripts.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-200/80 rounded-xl self-start sm:self-center max-w-full">
              {transcripts.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTrackIndex(idx)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTrackIndex === idx
                      ?'bg-white text-zinc-900 shadow-xs'
                      :'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {t.titleAr}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Master Controls: Play, Speed, Translation */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Play Button */}
            <button
              onClick={playEntireTrack}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
                isPlaying
                  ?'bg-zinc-800 text-white ring-2 ring-zinc-400'
                  :'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current shrink-0" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span className="hidden sm:inline">تشغيل التسجيل كاملاً بالتتابع</span>
                  <span className="sm:hidden">تشغيل التسجيل كاملاً</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                onClick={stopPlayback}
                title="إعادة من البداية"
                className="p-2 sm:p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>
            )}

            {/* Speed Selector */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-white border border-zinc-300 rounded-xl p-0.5 sm:p-1 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 px-1 sm:px-1.5 flex items-center gap-1 font-arabic">
                <Gauge className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span className="hidden sm:inline">السرعة:</span>
              </span>
              <button
                onClick={() => setSpeechRate(0.7)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  speechRate === 0.7
                    ?'bg-zinc-900 text-white'
                    :'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="sm:hidden">0.7x</span>
                <span className="hidden sm:inline">0.7x بطيء</span>
              </button>
              <button
                onClick={() => setSpeechRate(0.85)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  speechRate === 0.85
                    ?'bg-zinc-900 text-white'
                    :'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="sm:hidden">0.85x</span>
                <span className="hidden sm:inline">0.85x متزن</span>
              </button>
              <button
                onClick={() => setSpeechRate(1.0)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  speechRate === 1.0
                    ?'bg-zinc-900 text-white'
                    :'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="sm:hidden">1.0x</span>
                <span className="hidden sm:inline">1.0x عادي</span>
              </button>
            </div>
          </div>

          {/* Toggle Translation */}
          <button
            onClick={() => setShowArabicTranslation(!showArabicTranslation)}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              showArabicTranslation
                ?'bg-white border-zinc-300 text-zinc-900 shadow-2xs'
                :'bg-zinc-200 border-zinc-300 text-zinc-600'
            }`}
          >
            <Languages className="w-3.5 h-3.5 shrink-0" />
            <span>{showArabicTranslation ?'إخفاء الترجمة' :'إظهار الترجمة'}</span>
          </button>
        </div>
      </div>

      {/* Transcript Lines List (Comic Chat Experience) */}
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-5 max-h-[680px] overflow-y-auto bg-zinc-50/50">
        {activeTrack.lines.map((line) => {
          const isLineActive = currentLineId === line.id;
          const profile = getCharacterProfile(line.speaker, line.gender);
          const scene = LINE_SCENE_IMAGES[line.id];

          return (
            <div
              key={line.id}
              id={`line-box-${line.id}`}
              className={`flex items-start gap-2 sm:gap-4 transition-all duration-300 w-full min-w-0 ${
                profile.isAlternating ?'sm:mr-6' :'sm:ml-2'
              }`}
            >
              {/* Character Avatar Column */}
              <div className="shrink-0 flex flex-col items-center pt-1 select-none">
                <CharacterAvatar
                  name={line.speaker}
                  gender={profile.gender}
                  size="md"
                  isActive={isLineActive}
                />
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-700 font-arabic mt-1 sm:mt-1.5 px-1.5 sm:px-2 py-0.5 rounded-lg bg-white border border-zinc-200 shadow-2xs">
                  {profile.nameAr}
                </span>
              </div>

              {/* Comic Speech Bubble */}
              <div
                className={`flex-1 min-w-0 p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 relative shadow-2xs ${
                  isLineActive
                    ? `${profile.activeRing} shadow-md scale-[1.01] ring-2`
                    : `bg-white ${profile.borderNormal} hover:shadow-xs`
                }`}
              >
                {/* Header Row: Speaker Badge, Scene Tag, and Play Button */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span
                      className={`font-bold text-[11px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded-xl border flex items-center gap-1 sm:gap-1.5 font-sans shadow-2xs ${profile.accentBadge}`}
                    >
                      <span>{line.speaker}</span>
                      <span className="text-[10px] sm:text-[11px] font-arabic opacity-85">
                        ({profile.nameAr})
                      </span>
                    </span>

                    {/* Scene / Activity Badge */}
                    {scene?.badgeLabelAr && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-lg text-[11px] sm:text-xs font-bold border font-arabic shadow-2xs ${
                          scene.badgeColor ||'bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        <span>{scene.badgeLabelAr}</span>
                      </span>
                    )}

                    {isLineActive && (
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold font-arabic bg-emerald-100 text-emerald-900 border border-emerald-200 animate-pulse">
                        <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        <span>يتحدث الآن...</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => playSingleLine(line)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-arabic shrink-0 ${
                      isLineActive
                        ?'bg-zinc-900 text-white shadow-xs'
                        :'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استماع</span>
                  </button>
                </div>

                {/* Main Content: Side-by-side text and dedicated scene illustration */}
                <div className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 min-w-0">
                  {/* Text Column (English + Arabic) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                    {/* English line (LTR) with Interactive Phrasal Unit Highlighting */}
                    <div
                      className="flex flex-wrap items-center gap-1 sm:gap-1.5 py-1 text-left font-sans min-w-0 max-w-full"
                      dir="ltr"
                    >
                      {CURRICULUM_CHUNKS[line.id] ? (
                        CURRICULUM_CHUNKS[line.id].map((chunk, cIdx) => {
                          const isChunkActive =
                            activeWordInfo?.lineId === line.id &&
                            activeWordInfo?.englishWord === chunk.en;

                          return (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={(e) => handleChunkClick(chunk, line, e)}
                              title={`انقر لنطق "${chunk.en}" • ترجمتها: "${chunk.ar}"`}
                              className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl text-xs sm:text-base font-bold cursor-pointer transition-all duration-200 select-none border max-w-full break-words ${
                                isChunkActive
                                  ? profile.gender ==='female'
                                    ?'bg-pink-600 text-white font-bold ring-2 ring-pink-300 border-pink-700 shadow-sm scale-105'
                                    :'bg-blue-600 text-white font-bold ring-2 ring-blue-300 border-blue-700 shadow-sm scale-105'
                                  :'bg-zinc-100/90 hover:bg-zinc-200 text-zinc-900 border-zinc-200/90 hover:border-zinc-300 active:scale-95'
                              }`}
                            >
                              {chunk.en}
                            </button>
                          );
                        })
                      ) : (
                        line.textEn.split(/\s+/).filter(Boolean).map((w, wIdx) => {
                          const cleanW = w.replace(/[^\w'-]/g, '');
                          const isWordActive =
                            activeWordInfo?.lineId === line.id &&
                            activeWordInfo?.englishWord.toLowerCase() === cleanW.toLowerCase();

                          return (
                            <button
                              key={wIdx}
                              type="button"
                              onClick={(e) => handleWordClick(w, line, wIdx, e)}
                              title={`انقر لنطق "${cleanW}" وإظهار ترجمتها المقابلة`}
                              className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl text-xs sm:text-base font-bold cursor-pointer transition-all duration-200 select-none border max-w-full break-words ${
                                isWordActive
                                  ? profile.gender === 'female'
                                    ? 'bg-pink-600 text-white font-bold ring-2 ring-pink-300 border-pink-700 shadow-sm scale-105'
                                    : 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 border-blue-700 shadow-sm scale-105'
                                  : 'bg-zinc-100/90 hover:bg-zinc-200 text-zinc-900 border-zinc-200/90 hover:border-zinc-300 active:scale-95'
                              }`}
                            >
                              {w}
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Arabic Translation with Synchronized Highlighted Equivalent */}
                    {showArabicTranslation && (
                      <div className="pt-2.5 border-t border-zinc-100 text-right">
                        <p className="text-sm sm:text-base text-zinc-700 font-arabic leading-relaxed">
                          {renderArabicLineWithHighlight(
                            line.textAr,
                            activeWordInfo?.lineId === line.id ? activeWordInfo.arabicMatch : null,
                            profile.gender ==='female'
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dedicated Scene Illustration Card */}
                  {scene && (
                    <div className="w-full sm:w-56 md:w-60 lg:w-68 shrink-0 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-2xs group self-center md:self-start">
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-white flex items-center justify-center p-1.5">
                        <img
                          src={scene.imageUrl}
                          alt={scene.captionAr}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-2.5 py-1.5 bg-zinc-50 border-t border-zinc-100 text-center">
                        <span className="text-[11px] font-bold text-zinc-600 font-arabic block leading-tight">
                          {scene.captionAr}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
