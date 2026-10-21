import React from 'react';
import { Users, Award, UserX, Sparkles, CheckCircle2 } from 'lucide-react';

interface DashboardOverviewMetricsProps {
  totalRegisteredCount: number;
  totalSubmissions: number;
  participationRate: number;
  totalAbsentCount: number;
  avgScore: string;
  topScore: number;
  isExamLive: boolean;
  examTitle: string;
}

export const DashboardOverviewMetrics: React.FC<DashboardOverviewMetricsProps> = ({
  totalRegisteredCount,
  totalSubmissions,
  participationRate,
  totalAbsentCount,
  avgScore,
  topScore,
  isExamLive,
  examTitle,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-arabic" dir="rtl">
      {/* 1. Registered Students */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500">إجمالي الطلاب</span>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-slate-900 font-mono">
            {totalRegisteredCount}
          </span>
          <span className="text-xs text-slate-400 font-bold">طالب مسجل</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          الشُعب (أ، ب، ج، د) في المنصة
        </p>
      </div>

      {/* 2. Submissions / Exam Participation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500">الممتحنون</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-700 font-mono">
            {totalSubmissions}
          </span>
          <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            {participationRate}% مشاركة
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          {isExamLive && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          )}
          <p className="text-[11px] text-slate-500 truncate" title={examTitle}>
            {examTitle}
          </p>
        </div>
      </div>

      {/* 3. Average Score */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500">متوسط الدرجات</span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900 font-mono">
            {avgScore}
          </span>
          <span className="text-xs text-slate-400">/ 10</span>
        </div>
        <p className="text-[11px] text-amber-700 font-bold mt-1">
          أعلى درجة مسجلة: {topScore} من 10
        </p>
      </div>

      {/* 4. Absent Students */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500">الغياب والتأخر</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <UserX className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-2xl font-black font-mono ${
              totalAbsentCount > 0 ? 'text-rose-600' : 'text-slate-800'
            }`}
          >
            {totalAbsentCount}
          </span>
          <span className="text-xs text-slate-400 font-bold">طالب غائب</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          لم يسلموا الإجابة حتى الآن
        </p>
      </div>
    </div>
  );
};
