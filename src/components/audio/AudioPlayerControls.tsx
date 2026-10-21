import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Languages,
  Gauge,
} from 'lucide-react';
import { TranscriptSection } from '../../types/curriculum';

interface AudioPlayerControlsProps {
  activeTrack: TranscriptSection;
  transcripts: TranscriptSection[];
  activeTrackIndex: number;
  onSelectTrack: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStopPlayback: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
  showArabicTranslation: boolean;
  onToggleTranslation: () => void;
}

export const AudioPlayerControls: React.FC<AudioPlayerControlsProps> = ({
  activeTrack,
  transcripts,
  activeTrackIndex,
  onSelectTrack,
  isPlaying,
  onTogglePlay,
  onStopPlayback,
  speechRate,
  onChangeSpeechRate,
  showArabicTranslation,
  onToggleTranslation,
}) => {
  return (
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
                onClick={() => onSelectTrack(idx)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTrackIndex === idx
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
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
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
              isPlaying
                ? 'bg-zinc-800 text-white ring-2 ring-zinc-400'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
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
              onClick={onStopPlayback}
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
              onClick={() => onChangeSpeechRate(0.7)}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                speechRate === 0.7
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <span className="sm:hidden">0.7x</span>
              <span className="hidden sm:inline">0.7x بطيء</span>
            </button>
            <button
              onClick={() => onChangeSpeechRate(0.85)}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                speechRate === 0.85
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <span className="sm:hidden">0.85x</span>
              <span className="hidden sm:inline">0.85x متزن</span>
            </button>
            <button
              onClick={() => onChangeSpeechRate(1.0)}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                speechRate === 1.0
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <span className="sm:hidden">1.0x</span>
              <span className="hidden sm:inline">1.0x عادي</span>
            </button>
          </div>
        </div>

        {/* Toggle Translation */}
        <button
          onClick={onToggleTranslation}
          className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
            showArabicTranslation
              ? 'bg-white border-zinc-300 text-zinc-900 shadow-2xs'
              : 'bg-zinc-200 border-zinc-300 text-zinc-600'
          }`}
        >
          <Languages className="w-3.5 h-3.5 shrink-0" />
          <span>{showArabicTranslation ? 'إخفاء الترجمة' : 'إظهار الترجمة'}</span>
        </button>
      </div>
    </div>
  );
};
