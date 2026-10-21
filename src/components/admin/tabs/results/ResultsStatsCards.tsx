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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>تاريخ الامتحان</span>
        </span>
        <strong className="text-sm sm:text-base font-bold text-slate-800 font-arabic block mt-1.5 truncate">
          {currentSession ? currentSession.formattedDate : 'جميع الامتحانات'}
        </strong>
        <span className="text-[11px] text-slate-500 font-arabic block mt-0.5">
          {currentSession ? `وقت الانطلاق: ${currentSession.formattedTime}` : 'أرشيف تراكمي شامل'}
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>الطلاب الممتحنون</span>
        </span>
        <strong className="text-2xl font-bold text-emerald-700 font-mono block mt-1">
          {totalSubmissions}
        </strong>
        <span className="text-[10px] text-emerald-600 font-arabic block mt-0.5 font-bold">
          نسبة المشاركة: {participationRate}%
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic block flex items-center justify-center gap-1">
          <UserX className="w-3.5 h-3.5 text-rose-500" />
          <span>الطلاب غير الممتحنين (الغياب)</span>
        </span>
        <strong
          className={`text-2xl font-bold font-mono block mt-1 ${
            totalAbsentCount > 0 ? 'text-rose-600' : 'text-slate-800'
          }`}
        >
          {totalAbsentCount}
        </strong>
        <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">
          لم يسلموا الإجابة في هذا الامتحان
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
        <span className="text-xs text-slate-500 font-arabic flex items-center justify-center gap-1">
          <Award className="w-3.5 h-3.5 text-slate-400" />
          <span>متوسط الدرجات</span>
        </span>
        <strong className="text-2xl font-bold text-slate-800 font-mono block mt-1">
          {avgScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
        </strong>
        <span className="text-[10px] text-slate-400 font-arabic block mt-0.5">
          أعلى درجة: {topScore}
        </span>
      </div>
    </div>
  );
};
