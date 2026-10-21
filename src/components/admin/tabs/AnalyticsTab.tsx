import React, { useState } from 'react';
import { Activity, Eye, Clock, GraduationCap, Search } from 'lucide-react';
import { StudentSession } from '../../../services/firebase';

interface AnalyticsTabProps {
  platformAnalytics: { totalVisits: number };
  allStudents: StudentSession[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  platformAnalytics,
  allStudents,
}) => {
  const [analyticsSearchQuery, setAnalyticsSearchQuery] = useState('');
  const [analyticsSectionFilter, setAnalyticsSectionFilter] = useState('all');

  const nowMillis = Date.now();

  const isStudentOnline = (st: StudentSession) => {
    if (!st.lastSeenAt) return false;
    let millis = 0;
    if (typeof st.lastSeenAt === 'number') millis = st.lastSeenAt;
    else if ((st.lastSeenAt as any).toMillis) millis = (st.lastSeenAt as any).toMillis();
    else if ((st.lastSeenAt as any).seconds) millis = (st.lastSeenAt as any).seconds * 1000;
    else millis = new Date(st.lastSeenAt).getTime();
    return !isNaN(millis) && nowMillis - millis <= 5 * 60 * 1000;
  };

  const onlineStudentsCount = allStudents.filter(isStudentOnline).length;
  const totalTimeSpentAllMinutes = allStudents.reduce(
    (sum, st) => sum + (st.totalTimeSpentMinutes || 0),
    0
  );
  const avgTimeSpentMinutes =
    allStudents.length > 0 ? Math.round(totalTimeSpentAllMinutes / allStudents.length) : 0;

  const totalVisitsCount = Math.max(
    platformAnalytics.totalVisits || 0,
    allStudents.reduce((sum, st) => sum + (st.visitCount || 1), 0)
  );

  const formatLastSeen = (lastSeen: any) => {
    if (!lastSeen) return 'غير مسجل';
    let date: Date;
    if (typeof lastSeen === 'number') date = new Date(lastSeen);
    else if (lastSeen.toMillis) date = new Date(lastSeen.toMillis());
    else if (lastSeen.seconds) date = new Date(lastSeen.seconds * 1000);
    else date = new Date(lastSeen);

    if (isNaN(date.getTime())) return 'غير مسجل';
    const diffMinutes = Math.round((Date.now() - date.getTime()) / (1000 * 60));
    if (diffMinutes < 5) return 'متصل الآن';
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    if (diffMinutes < 1440) return `منذ ${Math.round(diffMinutes / 60)} ساعة`;
    return date.toLocaleDateString('ar-IQ', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatStudyDuration = (minutes: number = 0) => {
    if (!minutes || minutes < 1) return 'أقل من دقيقة';
    if (minutes < 60) return `${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours} س و ${remainingMins} د` : `${hours} ساعة`;
  };

  const filteredAnalyticsStudents = allStudents.filter((student) => {
    const matchesSection =
      analyticsSectionFilter === 'all' || student.section === analyticsSectionFilter;
    const matchesSearch =
      !analyticsSearchQuery.trim() ||
      student.fullName.toLowerCase().includes(analyticsSearchQuery.toLowerCase().trim());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right">
      {/* 1. Header Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-700" />
            <span>إحصائيات المنصة وتفاعل الطلاب والزيارات</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            متابعة مباشرة لعدد مرات فتح المنصة، والطلاب المتصلين حالياً، ووقت البقاء الفعلي لكل طالب.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold font-arabic">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>تحديث فوري مباشر</span>
          </span>
        </div>
      </div>

      {/* 2. Top Metric Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Visits */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-arabic">إجمالي الزيارات</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-800">
            {totalVisitsCount}
          </div>
          <span className="text-[11px] text-slate-400 font-arabic block">
            مرات فتح الموقع والتطبيق
          </span>
        </div>

        {/* Card 2: Online Students */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-arabic">المتواجدون الآن</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-700 flex items-center gap-2">
            <span>{onlineStudentsCount}</span>
            <span className="text-xs font-arabic font-normal text-slate-500">طالب متصل</span>
          </div>
          <span className="text-[11px] text-slate-400 font-arabic block">
            نشطون خلال آخر 5 دقائق
          </span>
        </div>

        {/* Card 3: Average Session Duration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-arabic">متوسط وقت البقاء</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-800 font-arabic">
            {formatStudyDuration(avgTimeSpentMinutes)}
          </div>
          <span className="text-[11px] text-slate-400 font-arabic block">
            متوسط وقت دراسة الطالب
          </span>
        </div>

        {/* Card 4: Total Study Hours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-arabic">إجمالي وقت الدراسة</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-800 font-arabic">
            {formatStudyDuration(totalTimeSpentAllMinutes)}
          </div>
          <span className="text-[11px] text-slate-400 font-arabic block">
            مجموع الساعات لجميع الطلاب
          </span>
        </div>
      </div>

      {/* 3. Detailed Student Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-800 font-arabic">
              سجل نشاط وتواجد الطلاب ({filteredAnalyticsStudents.length} طالب):
            </h4>
            <p className="text-xs text-slate-500 font-arabic mt-0.5">
              يوضح هذا الجدول وقت بقاء كل طالب في المنصة، عدد مرات دخوله، وحالته المباشرة:
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={analyticsSearchQuery}
                onChange={(e) => setAnalyticsSearchQuery(e.target.value)}
                placeholder="بحث باسم الطالب..."
                className="pr-8 pl-3 py-1.5 rounded-xl border border-slate-200 text-xs font-arabic text-slate-700 focus:border-slate-800 focus:ring-0"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Section Filter */}
            <select
              value={analyticsSectionFilter}
              onChange={(e) => setAnalyticsSectionFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-arabic text-slate-700 bg-white"
            >
              <option value="all">جميع الشُعب</option>
              {Array.from(new Set(allStudents.map((s) => s.section))).sort().map((sec) => (
                <option key={sec} value={sec}>
                  شعبة {sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 font-arabic">
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3">اسم الطالب</th>
                <th className="p-3 text-center">الشعبة</th>
                <th className="p-3 text-center">الحالة الآن</th>
                <th className="p-3">وقت البقاء الإجمالي</th>
                <th className="p-3 text-center">عدد مرات الدخول</th>
                <th className="p-3">آخر تواجد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAnalyticsStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-arabic">
                    لا يوجد طلاب مسجلون يطابقون خيارات البحث حالياً.
                  </td>
                </tr>
              ) : (
                filteredAnalyticsStudents.map((st, idx) => {
                  const online = isStudentOnline(st);
                  const timeSpent = st.totalTimeSpentMinutes || 0;
                  const visits = st.visitCount || 1;
                  return (
                    <tr key={st.id || idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 text-center font-mono text-slate-400 font-bold">
                        {idx + 1}
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {st.fullName}
                      </td>
                      <td className="p-3 text-center font-bold text-slate-600">
                        شعبة {st.section}
                      </td>
                      <td className="p-3 text-center">
                        {online ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px] font-arabic">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>متصل الآن</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-arabic">
                            <span>غير متصل</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-arabic">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-700 font-mono">
                            {formatStudyDuration(timeSpent)}
                          </span>
                          <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-slate-700 rounded-full"
                              style={{
                                width: `${Math.min(100, Math.max(5, (timeSpent / 60) * 100))}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-slate-700">
                        {visits} {visits === 1 ? 'مرة' : 'مرات'}
                      </td>
                      <td className="p-3 text-slate-500 font-arabic text-[11px]">
                        {formatLastSeen(st.lastSeenAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
