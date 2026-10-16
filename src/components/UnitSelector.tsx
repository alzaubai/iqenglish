import React from 'react';
import { BookOpen, CheckCircle2, Lock } from 'lucide-react';
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
    <div className="space-y-6" dir="rtl">
      <div className="text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-arabic flex flex-wrap items-baseline gap-2">
            <span>الوحدات الدراسية</span>
            <span dir="ltr" className="inline-block text-lg sm:text-xl font-bold text-zinc-500 font-sans">
              (Units)
            </span>
          </h1>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl font-arabic self-start sm:self-auto">
            مدرس المادة: أ. حسام محمود منصور
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 font-arabic mt-1">
          اختر الوحدة لبدء استعراض الدروس والاستماع للمحادثات وحل تمارين كتاب النشاط
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  : 'bg-zinc-50 border-zinc-200/70 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                {unit.imageUrl && (
                  <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/80 shadow-2xs">
                    <img
                      src={unit.imageUrl}
                      alt={unit.titleAr}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
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
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 font-arabic">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{unit.lessonsCount} دروس متاحة</span>
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400 flex items-center gap-1 font-arabic">
                      <Lock className="w-3 h-3" />
                      <span>قيد الإعداد</span>
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
                  <span className="text-zinc-400 font-arabic">ستتوفر قريباً</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
