import React, { useState } from 'react';

export type CharacterName =
  | 'Ahmed'
  | 'Faisal'
  | 'Khalid'
  | 'Rasha'
  | 'Huda'
  | 'Muna'
  | 'Adil'
  | 'Basim'
  | 'Richard'
  | string;

interface CharacterAvatarProps {
  name: CharacterName;
  gender?: 'male' | 'female';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isActive?: boolean;
  className?: string;
}

// Map characters to their actual custom illustrations from the user
const CHARACTER_IMAGE_MAP: Record<string, string> = {
  ahmed: '/images/characters/ahmed.jpg',
  احمد: '/images/characters/ahmed.jpg',
  faisal: '/images/characters/faisal.jpg',
  فيصل: '/images/characters/faisal.jpg',
  khalid: '/images/characters/khalid.jpg',
  خالد: '/images/characters/khalid.jpg',
  mariam: '/images/characters/mariam.jpg',
  مريم: '/images/characters/mariam.jpg',
  rasha: '/images/characters/rasha.jpg',
  رشا: '/images/characters/rasha.jpg',
  huda: '/images/characters/huda.jpg',
  هدى: '/images/characters/huda.jpg',
  muna: '/images/characters/muna.jpg',
  منى: '/images/characters/muna.jpg',
  richard: '/images/characters/richard.jpg',
  ريتشارد: '/images/characters/richard.jpg',
  sara: '/images/characters/sara.jpg',
  سارة: '/images/characters/sara.jpg',
  sameera: '/images/characters/sameera.jpg',
  سميرة: '/images/characters/sameera.jpg',
  maysam: '/images/characters/maysam.jpg',
  ميسم: '/images/characters/maysam.jpg',
  adel: '/images/characters/adel.jpg',
  عادل: '/images/characters/adel.jpg',
  adil: '/images/characters/adel.jpg',
  bassem: '/images/characters/bassem.jpg',
  باسم: '/images/characters/bassem.jpg',
  basim: '/images/characters/bassem.jpg',
  rawan: '/images/characters/rawan.jpg',
  روان: '/images/characters/rawan.jpg',
  laith: '/images/characters/laith.jpg',
  ليث: '/images/characters/laith.jpg',
  nader: '/images/characters/nader.jpg',
  نادر: '/images/characters/nader.jpg',
  narrator: '/images/characters/narrator.jpg',
  الراوي: '/images/characters/narrator.jpg',
  karen: '/images/characters/karen.jpg',
  كارين: '/images/characters/karen.jpg',
  sana: '/images/characters/sana.jpg',
  سناء: '/images/characters/sana.jpg',
};

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  gender = 'male',
  size = 'md',
  isActive = false,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const normName = name.trim().toLowerCase();
  const customImgUrl = CHARACTER_IMAGE_MAP[normName];

  // Size configurations
  const sizeMap = {
    sm: 'w-10 h-10 sm:w-11 sm:h-11 text-xs',
    md: 'w-13 h-13 sm:w-16 sm:h-16 text-sm',
    lg: 'w-18 h-18 sm:w-20 sm:h-20 text-base',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 text-lg',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Fallback SVG avatar if image fails to load
  const renderFallbackSvg = () => {
    const isFem =
      gender === 'female' ||
      ['rasha', 'huda', 'muna', 'sara', 'sameera', 'mariam', 'رشا', 'هدى', 'منى', 'سارة', 'سميرة', 'مريم'].includes(normName);
    if (isFem) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="48" fill="#FDF2F8" stroke="#EC4899" strokeWidth="3" />
          <path d="M18 92 C18 73 32 64 50 64 C68 64 82 73 82 92 Z" fill="#DB2777" />
          <ellipse cx="50" cy="46" rx="20" ry="22" fill="#FDE68A" />
          <circle cx="42" cy="44" r="3" fill="#1E293B" />
          <circle cx="58" cy="44" r="3" fill="#1E293B" />
          <path d="M44 54 C47 58 53 58 56 54" stroke="#BE185D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M26 38 C28 20 40 16 50 16 C60 16 72 20 74 38 C68 28 60 25 50 25 C40 25 32 28 26 38 Z" fill="#831843" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <circle cx="50" cy="50" r="48" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="3" />
        <path d="M18 92 C18 73 32 64 50 64 C68 64 82 73 82 92 Z" fill="#2563EB" />
        <ellipse cx="50" cy="46" rx="20" ry="22" fill="#FDE68A" />
        <circle cx="42" cy="44" r="3" fill="#1E293B" />
        <circle cx="58" cy="44" r="3" fill="#1E293B" />
        <path d="M44 54 C47 58 53 58 56 54" stroke="#B45309" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M28 40 C28 22 40 18 50 18 C60 18 72 22 72 40 C66 30 60 27 50 27 C40 27 34 30 28 40 Z" fill="#1E293B" />
      </svg>
    );
  };

  return (
    <div
      className={`relative rounded-full shrink-0 select-none transition-all duration-300 ${currentSize} ${
        isActive
          ? 'ring-4 ring-offset-2 ring-blue-500 scale-105 shadow-md'
          : 'hover:scale-105 shadow-xs'
      } ${className}`}
      title={`${name}`}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-zinc-100 flex items-center justify-center shadow-2xs">
        {customImgUrl && !imgFailed ? (
          <img
            src={customImgUrl}
            alt={name}
            className="w-full h-full object-cover object-[center_12%] transform scale-110 transition-transform duration-300"
            onError={() => setImgFailed(true)}
          />
        ) : (
          renderFallbackSvg()
        )}
      </div>

      {/* Online/Speaking indicator dot */}
      {isActive && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
      )}
    </div>
  );
};
