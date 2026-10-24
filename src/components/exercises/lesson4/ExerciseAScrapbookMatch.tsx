import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Languages } from 'lucide-react';
import { lesson4ActivityData, ScrapbookMatchItem } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface ExerciseAScrapbookMatchProps {
  onProgressUpdate: (completed: boolean) => void;
}

const PEOPLE_OPTIONS = [
  'Rawan (روان)',
  'Muna (منى)',
  'Maysam (ميسم)',
  'Bassem (باسم)',
  'Laith (ليث)',
  'Adel (عادل)',
];

export const ExerciseAScrapbookMatch: React.FC<ExerciseAScrapbookMatchProps> = ({ onProgressUpdate }) => {
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showHobbyTranslations, setShowHobbyTranslations] = useState<boolean>(false);

  const items = lesson4ActivityData.page10ExAMatches;

  const handleSelect = (num: number, personOption: string) => {
    setMatches((prev) => ({ ...prev, [num]: personOption }));
  };

  const isMatchCorrect = (item: ScrapbookMatchItem) => {
    const selected = matches[item.number] || '';
    return selected.toLowerCase().includes(item.personNameEn.toLowerCase());
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isMatchCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setMatches({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<number, string> = {};
    items.forEach((it) => {
      model[it.number] = `${it.personNameEn} (${it.personNameAr})`;
    });
    setMatches(model);
    setIsChecked(true);
  };

  const answeredCount = Object.keys(matches).filter((k) => matches[Number(k)]).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Student's Book p. 7 • Activity Book p. 10 • Exercise A
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Read and work it out. Match each person to their scrapbook (1-6).
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            اقرأ اهتمامات وهوايات كل شخصية وطابق رقم دفتر القصاصات (1 إلى 6) مع صاحبه المناسب:
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHobbyTranslations(!showHobbyTranslations)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border font-arabic transition-all flex items-center gap-1.5 cursor-pointer ${
              showHobbyTranslations
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showHobbyTranslations ? 'إخفاء ترجمة الهوايات' : 'ترجمة الهوايات'}</span>
          </button>
          <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
            Answered: {answeredCount} / {items.length}
          </div>
        </div>
      </div>

      {/* Grid of 6 Scrapbooks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {items.map((item) => {
          const selected = matches[item.number] || '';
          const correct = isMatchCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between text-left space-y-3 ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              {/* Card Top: Number + Image Hint */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-zinc-900 text-white font-bold text-xs flex items-center justify-center font-sans shadow-2xs">
                    {item.number}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-500 font-arabic bg-zinc-100 px-2 py-0.5 rounded-md">
                    دفتر القصاصات {item.number}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-zinc-200">
                  <img
                    src={item.imageUrl}
                    alt={item.personNameEn}
                    className="w-12 h-12 rounded-lg object-cover border border-zinc-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-zinc-900 font-sans block truncate">
                      {item.hobbyEn}
                    </span>
                    {showHobbyTranslations && (
                      <span className="text-[11px] text-zinc-500 font-arabic block truncate animate-in fade-in duration-150" dir="rtl">
                        {item.hobbyAr}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  "{item.detailsEn}"
                </p>
              </div>

              {/* Selector */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-200">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block font-sans">
                  Whose scrapbook is this?
                </label>
                <select
                  value={selected}
                  onChange={(e) => handleSelect(item.number, e.target.value)}
                  className={`w-full px-3 py-1.5 text-xs font-bold rounded-lg border transition-all outline-none font-sans cursor-pointer ${
                    isChecked
                      ? correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                        : 'border-rose-400 bg-rose-50 text-rose-950'
                      : 'border-zinc-300 bg-white focus:border-zinc-900 text-zinc-900'
                  }`}
                >
                  <option value="">-- Choose Person (اختر الشخصية) --</option>
                  {PEOPLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {isChecked && !correct && (
                  <div className="text-[11px] text-rose-700 font-bold font-arabic text-right pt-0.5" dir="rtl">
                    الجواب الصحيح: <strong className="font-sans underline">{item.personNameEn} ({item.personNameAr})</strong>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAll}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm font-arabic shadow-2xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-zinc-300" />
            <span>فحص الإجابات</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>
        </div>

        <button
          type="button"
          onClick={solveAll}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
        >
          عرض الحل النموذجي
        </button>
      </div>
    </div>
  );
};
