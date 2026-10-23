import React, { useState } from 'react';
import { Volume2, Sparkles, Camera } from 'lucide-react';
import { SpeechEngine } from '../utils/speech';

interface LandmarkItem {
  id: string;
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  imageUrl: string;
  adjectiveEn: string;
  adjectiveAr: string;
  adjectiveColor: string;
  quoteEn: string;
  quoteAr: string;
}

const IRAQ_LANDMARKS: LandmarkItem[] = [
  {
    id: 'stadium',
    nameEn: 'Al-Shaab Stadium',
    nameAr: 'ملعب الشعب الدولي',
    locationEn: 'Baghdad',
    locationAr: 'بغداد',
    imageUrl: '/images/landmarks/landmark-stadium.jpg',
    adjectiveEn: 'fantastic',
    adjectiveAr: 'رائع ومدهش',
    adjectiveColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    quoteEn: 'There was a football match at Al-Shaab Stadium. The players were fantastic!',
    quoteAr: 'كانت هناك مباراة في ملعب الشعب، وكان اللاعبون رائعين للغاية!',
  },
  {
    id: 'ziggurat',
    nameEn: 'The Ziggurat of Ur',
    nameAr: 'زقورة أور التاريخية',
    locationEn: 'Ur, Dhi Qar',
    locationAr: 'ذي قار / أور',
    imageUrl: '/images/landmarks/landmark-ziggurat.jpg',
    adjectiveEn: 'huge',
    adjectiveAr: 'ضخمة وعريقة',
    adjectiveColor: 'bg-amber-50 text-amber-800 border-amber-200',
    quoteEn: 'The ziggurat is huge! It is ancient and famous around the world.',
    quoteAr: 'الزقورة ضخمة وهائلة! يبلغ ارتفاعها 21 متراً وهي من أشهر الآثار في العالم.',
  },
  {
    id: 'marshes',
    nameEn: 'The Marshes',
    nameAr: 'الأهوار العراقية',
    locationEn: 'Southern Iraq',
    locationAr: 'جنوب العراق',
    imageUrl: '/images/landmarks/landmark-marshes.jpg',
    adjectiveEn: 'exciting',
    adjectiveAr: 'مثير وحماسي',
    adjectiveColor: 'bg-teal-50 text-teal-800 border-teal-200',
    quoteEn: 'We took a boat trip across the marshes. It was quite exciting!',
    quoteAr: 'أخذنا جولة بالزورق في الأهوار وشاهدنا طيور النحام، كانت تجربة مثيرة جداً!',
  },
  {
    id: 'citadel',
    nameEn: 'Erbil Citadel',
    nameAr: 'قلعة أربيل الشهيرة',
    locationEn: 'Erbil',
    locationAr: 'أربيل',
    imageUrl: '/images/landmarks/landmark-citadel.jpg',
    adjectiveEn: 'amazing',
    adjectiveAr: 'مذهلة وساحرة',
    adjectiveColor: 'bg-orange-50 text-orange-800 border-orange-200',
    quoteEn: 'The Citadel yellow stone is bright in the sunshine. The view is amazing.',
    quoteAr: 'حجارة القلعة الصفراء ساطعة تحت أشعة الشمس، والإطلالة من أعلاها مذهلة.',
  },
  {
    id: 'hatra',
    nameEn: 'The Ruins of Hatra',
    nameAr: 'آثار مدينة الحضر',
    locationEn: 'Ninawa / Mosul',
    locationAr: 'الموصل / نينوى',
    imageUrl: '/images/landmarks/landmark-hatra.jpg',
    adjectiveEn: 'ancient',
    adjectiveAr: 'أثرية وشيقة',
    adjectiveColor: 'bg-stone-100 text-stone-800 border-stone-200',
    quoteEn: 'Hatra was an important place in many civilizations. The old temples are beautiful.',
    quoteAr: 'كانت الحضر مكاناً عظيماً في حضارات متعددة، ومعابدها القديمة لا تزال رائعة.',
  },
  {
    id: 'museum',
    nameEn: 'The National Museum',
    nameAr: 'المتحف العراقي',
    locationEn: 'Baghdad',
    locationAr: 'بغداد',
    imageUrl: '/images/landmarks/landmark-museum.jpg',
    adjectiveEn: 'interesting',
    adjectiveAr: 'ممتع ومفيد',
    adjectiveColor: 'bg-sky-50 text-sky-800 border-sky-200',
    quoteEn: 'We went to the museum, and Sameera said it was very interesting.',
    quoteAr: 'ذهبنا إلى المتحف العراقي، وقالت سميرة إنه كان ممتعاً وشيقاً ومليئاً بالآثار العظيمة.',
  },
];

interface AdjectiveItem {
  word: string;
  meaningAr: string;
  badgeClass: string;
}

const LESSON_ADJECTIVES: AdjectiveItem[] = [
  { word: 'fantastic', meaningAr: 'رائع جداً', badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  { word: 'huge', meaningAr: 'ضخم وهائل', badgeClass: 'border-amber-200 bg-amber-50 text-amber-800' },
  { word: 'exciting', meaningAr: 'مثير ومشوّق', badgeClass: 'border-teal-200 bg-teal-50 text-teal-800' },
  { word: 'ancient', meaningAr: 'قديم وأثري', badgeClass: 'border-orange-200 bg-orange-50 text-orange-800' },
  { word: 'amazing', meaningAr: 'مذهل وعجيب', badgeClass: 'border-violet-200 bg-violet-50 text-violet-800' },
  { word: 'interesting', meaningAr: 'ممتع وشيّق', badgeClass: 'border-sky-200 bg-sky-50 text-sky-800' },
  { word: 'boring', meaningAr: 'ممل (عكس ممتع)', badgeClass: 'border-zinc-300 bg-zinc-100 text-zinc-700' },
  { word: 'beautiful', meaningAr: 'جميل', badgeClass: 'border-rose-200 bg-rose-50 text-rose-800' },
];

export const IraqLandmarksShowcase: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const handleSpeakLandmark = (item: LandmarkItem) => {
    setPlayingId(item.id);
    SpeechEngine.speakText(`${item.nameEn}. It was ${item.adjectiveEn}. ${item.quoteEn}`, {
      rate: 0.85,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  const handleSpeakWord = (adj: AdjectiveItem) => {
    setSpeakingWord(adj.word);
    SpeechEngine.speakText(adj.word, {
      rate: 0.85,
      onEnd: () => setSpeakingWord(null),
      onError: () => setSpeakingWord(null),
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 shadow-2xs">
            <Camera className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic flex items-center gap-2">
              <span>سجل قصاصات ريتشارد: معالم العراق الستة</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 font-mono font-normal">
                Book p. 6
              </span>
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-0.5" dir="ltr">
              Richard&apos;s Scrapbook: 6 iconic Iraqi landmarks &amp; descriptive adjectives
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full self-start sm:self-center font-arabic">
          انقر لسماع النطق
        </span>
      </div>

      {/* Adjectives Bar (Target Vocabulary from SB p. 6 & AB p. 6) */}
      <div className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>الصفات المستهدفة بالدرس (Adjectives):</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-sans" dir="ltr">
            Click to hear pronunciation
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {LESSON_ADJECTIVES.map((adj) => (
            <button
              key={adj.word}
              onClick={() => handleSpeakWord(adj)}
              className={`px-3 py-1 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${adj.badgeClass} ${
                speakingWord === adj.word ? 'ring-2 ring-zinc-800 scale-105' : ''
              }`}
              title="اضغط للاستماع"
            >
              <Volume2 className={`w-3 h-3 ${speakingWord === adj.word ? 'animate-pulse text-zinc-900' : 'opacity-70'}`} />
              <span className="font-sans font-bold">{adj.word}</span>
              <span className="text-[11px] font-normal opacity-85 font-arabic">({adj.meaningAr})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6 Landmark Cards Grid: Identical to Lesson 1 Structure */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {IRAQ_LANDMARKS.map((item) => {
          const isPlaying = playingId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSpeakLandmark(item)}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between gap-2.5 cursor-pointer group ${
                isPlaying
                  ? 'bg-blue-50/80 border-blue-400 shadow-sm scale-102 ring-2 ring-blue-200'
                  : 'bg-white hover:bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 hover:shadow-xs'
              }`}
              title={item.quoteAr}
            >
              {/* Location Badge */}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border font-arabic bg-zinc-100 text-zinc-700 border-zinc-200 truncate max-w-full">
                {item.locationAr}
              </span>

              {/* Illustrated Landmark Square Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 p-1 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.nameEn}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* English & Arabic Name */}
              <div className="w-full space-y-0.5">
                <span className="text-xs sm:text-sm font-bold text-zinc-900 block font-sans leading-tight">
                  {item.nameEn}
                </span>
                <span className="text-[11px] text-zinc-500 font-arabic block">
                  {item.nameAr}
                </span>

                {/* Adjective Tag */}
                <span
                  className={`inline-block mt-1 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md border font-mono uppercase tracking-wide ${item.adjectiveColor}`}
                >
                  {item.adjectiveEn}
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
