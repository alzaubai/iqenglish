import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { UnitData } from '../types/curriculum';

interface UnitSelectorProps {
  units: UnitData[];
  onSelectUnit: (unitId: string) => void;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  units,
  onSelectUnit,
}) => {
  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      <div className="text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-arabic flex flex-wrap items-baseline gap-2">
            <span>الوحدات الدراسية</span>
            <span dir="ltr" className="inline-block text-lg sm:text-xl font-bold text-zinc-500 font-sans">
              (Units)
            </span>
          </h1>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl font-arabic self-start sm:self-auto">
            الصف الأول المتوسط
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 font-arabic mt-1">
          اختر الوحدة لبدء استعراض الدروس والاستماع للمحادثات وحل تمارين كتاب النشاط
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {units.map((unit) => {
          return (
            <button
              key={unit.id}
              onClick={() => {
                if (unit.isAvailable) onSelectUnit(unit.id);
              }}
              disabled={!unit.isAvailable}
              className={`group p-5 sm:p-6 rounded-2xl border-2 text-right transition-all flex flex-col justify-between ${
                unit.isAvailable
                  ? 'bg-white hover:border-zinc-900 border-zinc-200 shadow-sm cursor-pointer hover:shadow-md'
                  : 'bg-zinc-50/80 border-zinc-200 opacity-75 cursor-not-allowed select-none'
              }`}
            >
              <div>
                {unit.imageUrl && (
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/80 shadow-2xs relative">
                    <img
                      src={unit.imageUrl}
                      alt={unit.titleAr}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        unit.isAvailable ? 'group-hover:scale-[1.03]' : 'grayscale contrast-75 brightness-90'
                      }`}
                      loading="lazy"
                    />
                    {!unit.isAvailable && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-3 text-center text-white">
                        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center mb-2 shadow-sm">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-bold font-arabic bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/20">
                          مقفلة في الإطلاق التجريبي
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      unit.isAvailable
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    UNIT {unit.unitNumber}
                  </span>
                  {unit.isAvailable ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 font-arabic border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{unit.lessonsCount} دروس متاحة</span>
                    </span>
                  ) : (
                    <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1 font-arabic font-semibold">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>مقفلة حالياً</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 font-arabic">
                  {unit.titleAr}
                </h3>
                <p className="text-sm font-semibold text-zinc-500 font-sans mt-0.5" dir="ltr">
                  {unit.titleEn}
                </p>
                <p className="text-xs text-zinc-600 font-arabic mt-2 leading-relaxed">
                  {unit.descriptionAr}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
                {unit.isAvailable ? (
                  <>
                    <span className="text-zinc-900 font-arabic">استعراض الدروس العشرة ←</span>
                    <span className="text-zinc-400 font-sans">10 Lessons</span>
                  </>
                ) : (
                  <span className="text-amber-700 font-arabic flex items-center gap-1.5 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>ستُتاح بعد انتهاء الإطلاق التجريبي</span>
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
