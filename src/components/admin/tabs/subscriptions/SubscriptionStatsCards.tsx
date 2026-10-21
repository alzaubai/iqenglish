import React from 'react';

interface SubscriptionStatsCardsProps {
  totalSubsCount: number;
  activeSubsCount: number;
  availableSubsCount: number;
  expiredSubsCount: number;
}

export const SubscriptionStatsCards: React.FC<SubscriptionStatsCardsProps> = ({
  totalSubsCount,
  activeSubsCount,
  availableSubsCount,
  expiredSubsCount,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic block">إجمالي أكواد الاشتراكات</span>
        <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
          {totalSubsCount}
        </strong>
        <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">كل الأكواد المتولدة</span>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic block">المشتركون النشطون</span>
        <strong className="text-2xl font-bold text-emerald-700 font-mono block mt-1">
          {activeSubsCount}
        </strong>
        <span className="text-[10px] text-emerald-600 font-arabic block mt-0.5">حسابات مفعلة وتدرس</span>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic block">أكواد متاحة للبيع</span>
        <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
          {availableSubsCount}
        </strong>
        <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">جاهزة للإرسال للمشتري</span>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic block">منتهية أو موقوفة</span>
        <strong className="text-2xl font-bold text-slate-500 font-mono block mt-1">
          {expiredSubsCount}
        </strong>
        <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">تحتاج تجديد</span>
      </div>
    </div>
  );
};
