import React, { useState } from 'react';
import { Volume2, Sparkles, MapPin, Camera } from 'lucide-react';
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
    locationAr: 'بغداد 🏟️',
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
    locationAr: 'ذي قار / أور 🏛️',
    imageUrl: '/images/landmarks/landmark-ziggurat.jpg',
    adjectiveEn: 'huge & ancient',
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
    locationAr: 'جنوب العراق 🛶',
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
    locationAr: 'أربيل 🏰',
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
    locationAr: 'الموصل / نينوى 🏛️',
    imageUrl: '/images/landmarks/landmark-hatra.jpg',
    adjectiveEn: 'ancient & interesting',
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
    locationAr: 'بغداد 🏺',
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
    SpeechEngine.speakText(`${item.nameEn}. ${item.quoteEn}`, {
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
    <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/70 shadow-2xs">
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
              Richard's Scrapbook: 6 iconic Iraqi landmarks & descriptive adjectives
            </p>
          </div>
        </div>

        <div className="text-xs font-bold text-zinc-500 font-arabic bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200/80 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>اضغط على أي معلم أو صفة للاستماع لنطقها الإنجليزي</span>
        </div>
      </div>

      {/* Adjectives Bar (Target Vocabulary from SB p. 6 & AB p. 6) */}
      <div className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
            <span>✨ الصفات المستهدفة بالدرس (Adjectives):</span>
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
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${adj.badgeClass} ${
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

      {/* 6 Landmark Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {IRAQ_LANDMARKS.map((item) => {
          const isCurrentPlaying = playingId === item.id;
          return (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col shadow-2xs hover:shadow-md ${
                isCurrentPlaying
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {/* Landmark Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100 border-b border-zinc-100">
                <img
                  src={item.imageUrl}
                  alt={item.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Location Badge */}
                <div className="absolute top-2.5 right-2.5 bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg font-arabic flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{item.locationAr}</span>
                </div>

                {/* Adjective Chip Overlay */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border shadow-xs font-mono uppercase tracking-wide ${item.adjectiveColor}`}
                  >
                    {item.adjectiveEn}
                  </span>
                </div>
              </div>

              {/* Landmark Info & Listen */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                      {item.nameEn}
                    </h4>
                    <span className="text-xs text-zinc-500 font-arabic shrink-0 font-medium">
                      {item.nameAr}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 font-arabic leading-relaxed pt-1" dir="rtl">
                    {item.quoteAr}
                  </p>
                </div>

                {/* Listen button */}
                <button
                  onClick={() => handleSpeakLandmark(item)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer font-sans ${
                    isCurrentPlaying
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isCurrentPlaying ? 'animate-pulse text-white' : 'text-zinc-600'}`} />
                  <span>{isCurrentPlaying ? 'Speaking...' : 'Listen to sentence'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
