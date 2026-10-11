import React, { useState } from 'react';
import { Volume2, Sparkles, Check } from 'lucide-react';
import { SpeechEngine } from '../utils/speech';

interface HolidayActivity {
  id: string;
  imageUrl: string;
  emoji: string;
  phraseEn: string;
  pastVerb: string;
  phraseAr: string;
  who: string;
  tagColor: string;
}

const HOLIDAY_ACTIVITIES: HolidayActivity[] = [
  {
    id: 'act-1',
    imageUrl: '/images/activities/went-fishing.jpg',
    emoji: '🎣',
    phraseEn: 'went fishing',
    pastVerb: 'went',
    phraseAr: 'ذهب لصيد السمك',
    who: 'فيصل 🧑',
    tagColor: 'border-teal-200 bg-teal-50 text-teal-800',
  },
  {
    id: 'act-2',
    imageUrl: '/images/activities/went-swimming.jpg',
    emoji: '🏊‍♂️',
    phraseEn: 'went swimming',
    pastVerb: 'went',
    phraseAr: 'ذهب للسباحة',
    who: 'فيصل 🧑',
    tagColor: 'border-blue-200 bg-blue-50 text-blue-800',
  },
  {
    id: 'act-3',
    imageUrl: '/images/activities/stayed-at-home.jpg',
    emoji: '🏡',
    phraseEn: 'stayed at home',
    pastVerb: 'stayed',
    phraseAr: 'بقي في المنزل',
    who: 'هدى ومنى 👧',
    tagColor: 'border-amber-200 bg-amber-50 text-amber-800',
  },
  {
    id: 'act-4',
    imageUrl: '/images/activities/made-clothes.jpg',
    emoji: '👗',
    phraseEn: 'made some clothes',
    pastVerb: 'made',
    phraseAr: 'صنعت بعض الملابس',
    who: 'هدى 👧',
    tagColor: 'border-pink-200 bg-pink-50 text-pink-800',
  },
  {
    id: 'act-5',
    imageUrl: '/images/activities/read-books.jpg',
    emoji: '📚',
    phraseEn: 'read lots of books',
    pastVerb: 'read',
    phraseAr: 'قرأت الكثير من الكتب',
    who: 'منى 👧',
    tagColor: 'border-indigo-200 bg-indigo-50 text-indigo-800',
  },
  {
    id: 'act-6',
    imageUrl: '/images/activities/learnt-to-cook.jpg',
    emoji: '🍳',
    phraseEn: 'learnt to cook',
    pastVerb: 'learnt',
    phraseAr: 'تعلّمت الطبخ',
    who: 'منى 👧',
    tagColor: 'border-orange-200 bg-orange-50 text-orange-800',
  },
];

export const HolidayActivitiesShowcase: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleSpeak = (activity: HolidayActivity) => {
    setPlayingId(activity.id);
    SpeechEngine.speakText(activity.phraseEn, {
      rate: 0.85,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic">
              أنشطة العطلة المصورة في هذا الدرس 🌟
            </h3>
            <p className="text-xs text-zinc-500 font-arabic">
              أهم الأفعال والأنشطة التي قام بها الأصدقاء في العطلة (Student&apos;s Book p. 5)
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full self-start sm:self-center font-arabic">
          انقر لسماع النطق 🔊
        </span>
      </div>

      {/* Grid of activities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {HOLIDAY_ACTIVITIES.map((act) => {
          const isPlaying = playingId === act.id;

          return (
            <button
              key={act.id}
              onClick={() => handleSpeak(act)}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between gap-2.5 cursor-pointer group ${
                isPlaying
                  ? 'bg-blue-50/80 border-blue-400 shadow-sm scale-102 ring-2 ring-blue-200'
                  : 'bg-white hover:bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 hover:shadow-xs'
              }`}
            >
              {/* Who did it badge */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border font-arabic ${act.tagColor}`}>
                {act.who}
              </span>

              {/* Illustrated Activity Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 p-1 flex items-center justify-center">
                <img
                  src={act.imageUrl}
                  alt={act.phraseEn}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* English Phrase */}
              <div className="w-full">
                <span className="text-xs sm:text-sm font-bold text-zinc-900 block font-sans">
                  {act.phraseEn}
                </span>
                <span className="text-[11px] text-zinc-500 font-arabic block mt-0.5">
                  {act.phraseAr}
                </span>
              </div>

              {/* Speaker action indicator */}
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isPlaying
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-800'
                }`}
              >
                {isPlaying ? (
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
