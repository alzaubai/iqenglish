import React from 'react';
import { Volume2 } from 'lucide-react';
import { TranscriptLine } from '../../types/curriculum';
import { CURRICULUM_CHUNKS, LineChunk } from '../../data/curriculumChunks';
import { LINE_SCENE_IMAGES } from '../../data/lessonScenes';
import { CharacterAvatar } from '../CharacterAvatar';
import { getCharacterProfile } from '../../utils/characterProfiles';
import { ActiveWordHighlight } from './types';

interface TranscriptLineItemProps {
  line: TranscriptLine;
  isLineActive: boolean;
  activeWordInfo: ActiveWordHighlight | null;
  showArabicTranslation: boolean;
  onPlayLine: (line: TranscriptLine) => void;
  onWordClick: (
    word: string,
    line: TranscriptLine,
    wIdx: number,
    e: React.MouseEvent
  ) => void;
  onChunkClick: (
    chunk: LineChunk,
    line: TranscriptLine,
    e: React.MouseEvent
  ) => void;
}

export const TranscriptLineItem: React.FC<TranscriptLineItemProps> = ({
  line,
  isLineActive,
  activeWordInfo,
  showArabicTranslation,
  onPlayLine,
  onWordClick,
  onChunkClick,
}) => {
  const profile = getCharacterProfile(line.speaker, line.gender);
  const scene = LINE_SCENE_IMAGES[line.id];

  const renderArabicLineWithHighlight = (
    textAr: string,
    arabicMatch: string | null,
    isFemale: boolean
  ) => {
    if (!arabicMatch) return <span>{textAr}</span>;

    // Check if target is directly in textAr, or stripped of punctuation
    let target = arabicMatch.trim();
    if (!textAr.includes(target)) {
      target = target.replace(/[.,!؟،]/g, '').trim();
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
                    ? 'bg-pink-300 text-pink-950 ring-pink-500 border border-pink-400'
                    : 'bg-blue-300 text-blue-950 ring-blue-500 border border-blue-400'
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
    <div
      id={`line-box-${line.id}`}
      className={`flex items-start gap-2 sm:gap-4 transition-all duration-300 w-full min-w-0 ${
        profile.isAlternating ? 'sm:mr-6' : 'sm:ml-2'
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
                  scene.badgeColor || 'bg-zinc-100 text-zinc-700 border-zinc-200'
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
            onClick={() => onPlayLine(line)}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-arabic shrink-0 ${
              isLineActive
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
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
                      onClick={(e) => onChunkClick(chunk, line, e)}
                      title={`انقر لنطق "${chunk.en}" • ترجمتها: "${chunk.ar}"`}
                      className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl text-xs sm:text-base font-bold cursor-pointer transition-all duration-200 select-none border max-w-full break-words ${
                        isChunkActive
                          ? profile.gender === 'female'
                            ? 'bg-pink-600 text-white font-bold ring-2 ring-pink-300 border-pink-700 shadow-sm scale-105'
                            : 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 border-blue-700 shadow-sm scale-105'
                          : 'bg-zinc-100/90 hover:bg-zinc-200 text-zinc-900 border-zinc-200/90 hover:border-zinc-300 active:scale-95'
                      }`}
                    >
                      {chunk.en}
                    </button>
                  );
                })
              ) : (
                line.textEn
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((w, wIdx) => {
                    const cleanW = w.replace(/[^\w'-]/g, '');
                    const isWordActive =
                      activeWordInfo?.lineId === line.id &&
                      activeWordInfo?.englishWord.toLowerCase() === cleanW.toLowerCase();

                    return (
                      <button
                        key={wIdx}
                        type="button"
                        onClick={(e) => onWordClick(w, line, wIdx, e)}
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
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showArabicTranslation
                  ? 'max-h-48 opacity-100 pt-2.5 border-t border-zinc-100'
                  : 'max-h-0 opacity-0 pt-0 border-t-0 pointer-events-none'
              } text-right`}
            >
              <p className="text-sm sm:text-base text-zinc-700 font-arabic leading-relaxed">
                {renderArabicLineWithHighlight(
                  line.textAr,
                  activeWordInfo?.lineId === line.id
                    ? activeWordInfo.arabicMatch
                    : null,
                  profile.gender === 'female'
                )}
              </p>
            </div>
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
};
