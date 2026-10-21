import React from 'react';
import { ArrowRight, GraduationCap, ShieldCheck, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

interface TeacherHeaderProps {
  onBackToSite: () => void;
  isMaintenanceActive: boolean;
  isTogglingMaintenance: boolean;
  onToggleMaintenance: () => void;
  maintenanceToast: string | null;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  onBackToSite,
  isMaintenanceActive,
  isTogglingMaintenance,
  onToggleMaintenance,
  maintenanceToast,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 font-arabic">
                  لوحة تحكم الأستاذ
                </h1>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 font-arabic">
                  الأول المتوسط
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-arabic">
                إدارة الطلاب • الامتحانات • الصلاحيات والاشتراكات
              </p>
            </div>
          </div>

          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={onBackToSite}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title="العودة إلى المنهاج"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Section: Compact Platform Status & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap justify-between md:justify-end">
          {/* Smart Platform Status Capsule */}
          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-arabic transition-all shadow-2xs ${
              isMaintenanceActive
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {isMaintenanceActive ? (
                <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span className="font-bold text-[11px]">
                {isMaintenanceActive ? 'المنصة مغلقة' : 'المنصة مفتوحة للطلاب'}
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleMaintenance}
              disabled={isTogglingMaintenance}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] font-arabic transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1 ${
                isMaintenanceActive
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                  : 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-200'
              }`}
            >
              {isTogglingMaintenance ? (
                <span>جاري...</span>
              ) : isMaintenanceActive ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>فتح الآن</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span>إغلاق المنصة</span>
                </>
              )}
            </button>
          </div>

          {/* Desktop Back Button */}
          <button
            type="button"
            onClick={onBackToSite}
            className="hidden md:flex py-1.5 px-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs items-center gap-1.5 cursor-pointer font-arabic transition-colors shadow-2xs"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة إلى المنهاج</span>
          </button>
        </div>
      </div>

      {/* Floating Status Toast Notification if active */}
      {maintenanceToast && (
        <div className="bg-slate-900 text-white text-xs font-bold font-arabic px-4 py-2 text-center transition-all">
          {maintenanceToast}
        </div>
      )}
    </header>
  );
};
