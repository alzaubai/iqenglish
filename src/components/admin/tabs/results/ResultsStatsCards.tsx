import React from 'react';
import { Calendar, CheckCircle2, UserX, Award } from 'lucide-react';

interface ResultsStatsCardsProps {
  currentSession: {
    formattedDate: string;
    formattedTime: string;
  } | null;
  totalSubmissions: number;
  participationRate: number;
  totalAbsentCount: number;
  avgScore: string;
  topScore: number;
}

export const ResultsStatsCards: React.FC<ResultsStatsCardsProps> = ({
  currentSession,
  totalSubmissions,
  participationRate,
  totalAbsentCount,
  avgScore,
  topScore,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-arabic" dir="rtl">
      {/* 1. Session Date */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>تاريخ الجلسة</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {currentSession ? 'محددة' : 'شامل'}
          </span>
        </div>
        <div>
          <strong className="text-sm font-bold text-slate-900 block truncate">
            {currentSession ? currentSession.formattedDate : 'جميع الامتحانات'}
          </strong>
          <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
            {currentSession ? `الساعة ${currentSession.formattedTime}` : 'سجل تراكمي'}
          </span>
        </div>
      </div>

      {/* 2. Submissions */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>الممتحنون</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono">
            {participationRate}%
          </span>
        </div>
        <div>
          <strong className="text-2xl font-black text-emerald-700 font-mono block">
            {totalSubmissions}
          </strong>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
            تسليم الإجابات بنجاح
          </span>
        </div>
      </div>

      {/* 3. Absent Students */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <UserX className="w-3.5 h-3.5 text-rose-500" />
            <span>الغياب عن الامتحان</span>
          </span>
          {totalAbsentCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
              تنبيه
            </span>
          )}
        </div>
        <div>
          <strong
            className={`text-2xl font-black font-mono block ${
              totalAbsentCount > 0 ? 'text-rose-600' : 'text-slate-800'
            }`}
          >
            {totalAbsentCount}
          </strong>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            طالب لم يقدموا بعد
          </span>
        </div>
      </div>

      {/* 4. Average Score */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>معدل الدرجات</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 font-mono">
            أعلى: {topScore}
          </span>
        </div>
        <div>
          <strong className="text-2xl font-black text-slate-900 font-mono block">
            {avgScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
          </strong>
          <span className="text-[11px] text-amber-700 font-bold block mt-0.5">
            متوسط درجات الجلسة
          </span>
        </div>
      </div>
    </div>
  );
};
