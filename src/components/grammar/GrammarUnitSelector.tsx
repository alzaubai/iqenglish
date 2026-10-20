import React from 'react';
import { BookMarked, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { GrammarUnit } from '../../types/grammar';

interface GrammarUnitSelectorProps {
  units: GrammarUnit[];
  onSelectUnit: (unitId: string) => void;
}

export const GrammarUnitSelector: React.FC<GrammarUnitSelectorProps> = ({
  units,
  onSelectUnit,
}) => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Intro Header Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-xs text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold font-sans">
                <BookMarked className="w-3.5 h-3.5" />
                <span>English for Iraq • Grammar Master</span>
              </div>
              
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-3 font-arabic">
              القواعد والشروحات التفصيلية
            </h2>
            <p className="text-sm text-zinc-600 mt-2 font-arabic max-w-2xl leading-relaxed">
              شرح مبسط ومركّز لكل قواعد المنهج حسب الوحدات (Unit) والدروس، مدعوماً بجداول تصريف الأفعال، أمثلة ناطقة، وتطبيقات تفاعلية تحاكي الأسئلة الامتحانية.
            </p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center shrink-0">
            <span className="text-xs text-zinc-500 font-arabic block">الوحدات المكتملة</span>
            <span className="text-2xl font-black text-zinc-900 font-sans block mt-0.5">Unit 1 & 2</span>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-1 font-arabic">
              مكتملة ومتاحة الآن
            </span>
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit) => {
          const isUnit1 = unit.unitNumber === 1;
          return (
            <div
              key={unit.id}
              onClick={() => {
                if (unit.isAvailable) {
                  onSelectUnit(unit.id);
                }
              }}
              className={`rounded-2xl border p-5 sm:p-6 transition-all text-right relative overflow-hidden flex flex-col justify-between ${
                unit.isAvailable
                  ? 'bg-white border-zinc-300 hover:border-zinc-900 hover:shadow-md cursor-pointer group'
                  : 'bg-zinc-50/70 border-zinc-200 opacity-70 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 font-mono">
                    UNIT {unit.unitNumber}
                  </span>
                  {unit.isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-arabic">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>متاح (شرح تفصيلي)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full font-arabic">
                      <Clock className="w-3.5 h-3.5" />
                      <span>قيد الإعداد</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-zinc-950 font-arabic">
                  {unit.titleAr}
                </h3>
                <p className="text-xs text-zinc-500 font-sans mt-0.5 font-medium" dir="ltr">
                  {unit.titleEn}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-3 leading-relaxed">
                  {unit.descriptionAr}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 font-arabic">
                  {unit.id === 'unit-1'
                    ? '7 مواضيع قواعدية'
                    : unit.id === 'unit-2'
                    ? '3 مواضيع قواعدية'
                    : 'غير مفعل حالياً'}
                </span>
                {unit.isAvailable ? (
                  <button className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 group-hover:underline font-arabic cursor-pointer">
                    <span>عرض مواضيع الوحدة</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </button>
                ) : (
                  <span className="text-xs text-zinc-400 font-arabic">قريباً</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
