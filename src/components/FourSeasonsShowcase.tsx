import React, { useState, useRef } from 'react';
import { Volume2, Sparkles, CloudSun, Thermometer, CloudRain, Sun, Wind, Snowflake } from 'lucide-react';
import { SpeechEngine } from '../utils/speech';

interface SeasonItem {
  id: string;
  nameEn: string;
  nameAr: string;
  temp: string;
  conditionEn: string;
  conditionAr: string;
  imageUrl: string;
  audioUrl?: string;
  tagColor: string;
  badgeBg: string;
  icon: React.ReactNode;
}

interface ForecastItem {
  id: string;
  periodEn: string;
  periodAr: string;
  temp?: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  audioUrl?: string;
}

const SEASONS: SeasonItem[] = [
  {
    id: 'winter',
    nameEn: 'Winter',
    nameAr: 'الشتاء',
    temp: '0°C',
    conditionEn: 'always cold & usually snows',
    conditionAr: 'بارد دائماً وعادةً تتساقط الثلوج',
    imageUrl: '/images/seasons/winter.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t13-2.mp3',
    tagColor: 'border-blue-300 bg-blue-50 text-blue-900',
    badgeBg: 'bg-blue-600',
    icon: <Snowflake className="w-4 h-4 text-blue-600" />,
  },
  {
    id: 'spring',
    nameEn: 'Spring',
    nameAr: 'الربيع',
    temp: '15°C',
    conditionEn: 'often warm & usually rains',
    conditionAr: 'دافئ غالباً وعادةً تمطر',
    imageUrl: '/images/seasons/spring.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t13-3.mp3',
    tagColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    badgeBg: 'bg-emerald-600',
    icon: <CloudRain className="w-4 h-4 text-emerald-600" />,
  },
  {
    id: 'summer',
    nameEn: 'Summer',
    nameAr: 'الصيف',
    temp: '25°C',
    conditionEn: 'usually sunny & sometimes hot',
    conditionAr: 'مشمس عادةً وحار في بعض الأحيان',
    imageUrl: '/images/seasons/summer.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t13-4.mp3',
    tagColor: 'border-amber-300 bg-amber-50 text-amber-900',
    badgeBg: 'bg-amber-500',
    icon: <Sun className="w-4 h-4 text-amber-600" />,
  },
  {
    id: 'autumn',
    nameEn: 'Autumn',
    nameAr: 'الخريف',
    temp: '10°C',
    conditionEn: 'cool & often windy',
    conditionAr: 'معتدل البرودة وغالباً عاصف بالرياح',
    imageUrl: '/images/seasons/autumn.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t13-5.mp3',
    tagColor: 'border-orange-300 bg-orange-50 text-orange-900',
    badgeBg: 'bg-orange-600',
    icon: <Wind className="w-4 h-4 text-orange-600" />,
  },
];

const FORECASTS: ForecastItem[] = [
  {
    id: 'intro',
    periodEn: 'London News Studio',
    periodAr: 'مقدمة النشرة من الاستوديو',
    temp: 'London',
    descriptionEn: 'London - Here is the weather forecast for tomorrow.',
    descriptionAr: 'لندن — إليكم النشرة الجوية ليوم غد.',
    imageUrl: '/images/weather/london-presenter.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t14-1.mp3',
  },
  {
    id: 'morning',
    periodEn: 'Morning Forecast',
    periodAr: 'نشرة الصباح',
    temp: 'Mild',
    descriptionEn: 'Mild and cloudy with some rain in the morning.',
    descriptionAr: 'معتدل وغائم مع بعض الأمطار في الصباح.',
    imageUrl: '/images/weather/london-morning.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t14-2.mp3',
  },
  {
    id: 'afternoon',
    periodEn: 'Afternoon Forecast',
    periodAr: 'نشرة بعد الظهر',
    temp: '18°C',
    descriptionEn: 'Dry and sunny in the afternoon. The temperature will be 18 degrees.',
    descriptionAr: 'جاف ومشمس بعد الظهر، ودرجة الحرارة 18 مئوية.',
    imageUrl: '/images/weather/london-afternoon.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t14-3.mp3',
  },
  {
    id: 'evening',
    periodEn: 'Evening Forecast',
    periodAr: 'نشرة المساء',
    temp: 'Cooler',
    descriptionEn: 'It will be cooler in the evening.',
    descriptionAr: 'وسيكون الجو أكثر برودة في المساء.',
    imageUrl: '/images/weather/london-evening.jpg',
    audioUrl: '/audio/unit-2/lesson-1/u2-l1-t14-4.mp3',
  },
];

const THERMOMETER_GRADES = [
  { temp: '30°C', wordEn: 'hot', wordAr: 'حار جداً', color: 'bg-red-500 text-white' },
  { temp: '20°C', wordEn: 'warm', wordAr: 'دافئ', color: 'bg-amber-500 text-white' },
  { temp: '10°C', wordEn: 'cool', wordAr: 'معتدل البرودة', color: 'bg-teal-500 text-white' },
  { temp: '0°C', wordEn: 'cold', wordAr: 'بارد', color: 'bg-blue-600 text-white' },
];

export const FourSeasonsShowcase: React.FC = () => {
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (id: string, audioUrl?: string, fallbackText?: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setActivePlayingId(id);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setActivePlayingId(null);
      audio.onerror = () => {
        if (fallbackText) {
          SpeechEngine.speakText(fallbackText, {
            rate: 0.85,
            onEnd: () => setActivePlayingId(null),
            onError: () => setActivePlayingId(null),
          });
        } else {
          setActivePlayingId(null);
        }
      };
      audio.play().catch(() => setActivePlayingId(null));
    } else if (fallbackText) {
      SpeechEngine.speakText(fallbackText, {
        rate: 0.85,
        onEnd: () => setActivePlayingId(null),
        onError: () => setActivePlayingId(null),
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-2xs space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic">
              فصول السنة المصورة في إنجلترا (Our Four Seasons)
            </h3>
            <p className="text-xs text-zinc-500 font-arabic">
              شاهد حالة الطقس ودرجات الحرارة لكل فصل واستمع للنطق الأكاديمي المباشر (SB p. 16)
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-zinc-500 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-xl self-start sm:self-center font-arabic flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
          <span>انقر لسماع التسجيل</span>
        </span>
      </div>

      {/* Grid: 4 Seasons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SEASONS.map((season) => {
          const isPlaying = activePlayingId === season.id;

          return (
            <div
              key={season.id}
              onClick={() => playAudio(season.id, season.audioUrl, `${season.nameEn}. ${season.conditionEn}`)}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between group ${
                isPlaying
                  ? 'border-blue-500 ring-2 ring-blue-200 shadow-md scale-[1.01] bg-blue-50/20'
                  : 'border-zinc-200 hover:border-zinc-300 hover:shadow-xs bg-white'
              }`}
            >
              {/* Season Image */}
              <div className="w-full h-36 relative overflow-hidden bg-zinc-50">
                <img
                  src={season.imageUrl}
                  alt={season.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <span className={`${season.badgeBg} text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg shadow-xs`}>
                    {season.temp}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs">
                    {season.icon}
                  </div>
                </div>
              </div>

              {/* Season Body */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-zinc-900 font-sans">
                      {season.nameEn}
                    </h4>
                    <span className="text-xs font-bold text-zinc-600 font-arabic">
                      {season.nameAr}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 font-sans mt-1 leading-snug" dir="ltr">
                    {season.conditionEn}
                  </p>
                  <p className="text-[11px] text-zinc-600 font-arabic mt-0.5">
                    {season.conditionAr}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-arabic">
                  <span className={`px-2 py-0.5 rounded-md border font-bold ${season.tagColor}`}>
                    {season.temp}
                  </span>
                  <span className="text-zinc-500 group-hover:text-zinc-900 flex items-center gap-1 transition-colors">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'جاري التشغيل...' : 'استماع'}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* London Weather Forecast: 4 Cards (Studio Intro, Morning, Afternoon, Evening) */}
      <div className="pt-2 border-t border-zinc-100 space-y-3">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-zinc-700" />
          <h4 className="text-sm font-bold text-zinc-800 font-arabic">
            النشرة الجوية لمدينة لندن (London Weather Forecast - Track 14)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {FORECASTS.map((item) => {
            const isPlaying = activePlayingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => playAudio(item.id, item.audioUrl, item.descriptionEn)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 group ${
                  isPlaying
                    ? 'border-blue-400 bg-blue-50/30 ring-2 ring-blue-100 shadow-xs'
                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50 bg-white'
                }`}
              >
                <div className="w-full h-32 rounded-xl overflow-hidden shrink-0 border border-zinc-100 bg-zinc-50">
                  <img
                    src={item.imageUrl}
                    alt={item.periodEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0 w-full text-right flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 font-arabic">
                        {item.periodAr}
                      </span>
                      {item.temp && (
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700">
                          {item.temp}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 font-sans line-clamp-2 mt-1 leading-snug" dir="ltr">
                      {item.descriptionEn}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-0.5">
                      {item.descriptionAr}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-arabic text-zinc-500 group-hover:text-zinc-900">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlaying ? 'جاري الاستماع...' : 'استمع للنشرة'}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thermometer Scale Guide (Activity Book p. 22) */}
      <div className="pt-3 border-t border-zinc-100 bg-zinc-50/80 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="w-16 h-32 rounded-xl overflow-hidden shrink-0 border border-zinc-200 bg-white p-1 flex items-center justify-center shadow-2xs">
          <img
            src="/images/weather/weather-thermometer.jpg"
            alt="Thermometer Scale"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 space-y-2 text-right">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-zinc-700" />
            <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-arabic">
              مقياس درجات الحرارة والصفات (Activity Book p. 22)
            </h5>
          </div>
          <p className="text-xs text-zinc-600 font-arabic">
            تدرج درجات الحرارة والصفة المناسبة لها في المنهج الإنجليزي:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {THERMOMETER_GRADES.map((g) => (
              <button
                key={g.wordEn}
                onClick={() => SpeechEngine.speakText(`${g.temp} is ${g.wordEn}`)}
                className="bg-white border border-zinc-200 rounded-xl p-2 text-center hover:border-zinc-300 hover:shadow-2xs transition-all cursor-pointer"
                title="انقر لسماع النطق"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${g.color}`}>
                    {g.temp}
                  </span>
                  <Volume2 className="w-3 h-3 text-zinc-400" />
                </div>
                <div className="text-xs font-bold text-zinc-900 font-sans">{g.wordEn}</div>
                <div className="text-[10px] text-zinc-500 font-arabic">{g.wordAr}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
