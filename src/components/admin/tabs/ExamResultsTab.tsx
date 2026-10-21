import React, { useState } from 'react';
import {
  CalendarDays,
  RefreshCw,
  Bell,
  Search,
  Copy,
  Check,
  FileDown,
  CheckCircle2,
  UserX,
  Users,
} from 'lucide-react';
import { ExamSubmission, StudentSession, QuickExam } from '../../../services/firebase';
import { ResultsStatsCards } from './results/ResultsStatsCards';
import { SubmittedStudentsTable } from './results/SubmittedStudentsTable';
import { AbsentStudentsTable } from './results/AbsentStudentsTable';
import { RegisteredStudentsTable } from './results/RegisteredStudentsTable';

interface ExamResultsTabProps {
  submissions: ExamSubmission[];
  allStudents: StudentSession[];
  allExamsList: QuickExam[];
  selectedExamSessionId: string;
  setSelectedExamSessionId: (id: string) => void;
  selectedSectionFilter: string;
  setSelectedSectionFilter: (sec: string) => void;
  searchStudentQuery: string;
  setSearchStudentQuery: (q: string) => void;
  resultsSubTab: 'submitted' | 'absent' | 'all_students';
  setResultsSubTab: (tab: 'submitted' | 'absent' | 'all_students') => void;
  onOpenAbsentNoticeModal: () => void;
  onOpenPdfModal: () => void;
  onSelectStudentForHistory: (student: {
    studentId?: string;
    studentName: string;
    studentSection: string;
    studentCode?: string;
  }) => void;
  onRequestDeleteStudent: (student: StudentSession) => void;
  currentSession: {
    id: string;
    title: string;
    formattedDate: string;
    formattedTime: string;
    isActive: boolean;
  } | null;
  examSessions: {
    id: string;
    title: string;
    formattedDate: string;
    formattedTime: string;
    submissionsCount: number;
  }[];
  filteredSubmissions: ExamSubmission[];
  filteredRegisteredStudents: StudentSession[];
  absentStudents: StudentSession[];
  totalRegisteredCount: number;
  totalSubmissions: number;
  totalAbsentCount: number;
  avgScore: string;
  topScore: number;
  participationRate: number;
  isSyncingData: boolean;
  handleManualSync: () => Promise<void>;
  syncStatusMsg: string | null;
  examTitle: string;
}

export const ExamResultsTab: React.FC<ExamResultsTabProps> = ({
  selectedExamSessionId,
  setSelectedExamSessionId,
  selectedSectionFilter,
  setSelectedSectionFilter,
  searchStudentQuery,
  setSearchStudentQuery,
  resultsSubTab,
  setResultsSubTab,
  onOpenAbsentNoticeModal,
  onOpenPdfModal,
  onSelectStudentForHistory,
  onRequestDeleteStudent,
  currentSession,
  examSessions,
  filteredSubmissions,
  filteredRegisteredStudents,
  absentStudents,
  totalRegisteredCount,
  totalSubmissions,
  totalAbsentCount,
  avgScore,
  topScore,
  participationRate,
  isSyncingData,
  handleManualSync,
  syncStatusMsg,
  examTitle,
}) => {
  const [telegramCopied, setTelegramCopied] = useState(false);

  const handleCopyTelegramSummary = async () => {
    const sectionName = selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`;
    const dateStr = new Date().toLocaleDateString('ar-IQ');

    let text = `تقرير الامتحان اليومي • الأول المتوسط\n`;
    text += `الامتحان: ${examTitle}\n`;
    text += `الشعبة: ${sectionName}\n`;
    text += `التاريخ: ${dateStr}\n`;
    text += `───────────────\n`;
    text += `المسجلين: ${totalRegisteredCount} طالب\n`;
    text += `الممتحنون: ${totalSubmissions} طالب (${participationRate}%)\n`;
    text += `الغائبون: ${totalAbsentCount} طالب\n`;
    text += `متوسط الدرجات: ${avgScore} / 10\n`;
    text += `───────────────\n`;
    text += `كشف الدرجات:\n`;

    filteredSubmissions.forEach((sub, i) => {
      text += `${i + 1}. ${sub.studentName} (${sub.studentSection}): ${sub.score}/${sub.totalPoints}\n`;
    });

    if (absentStudents.length > 0) {
      text += `\nالطلاب الذين لم يمتحنوا بعد:\n`;
      absentStudents.forEach((st, i) => {
        text += `${i + 1}. ${st.fullName} (شعبة ${st.section})\n`;
      });
    }

    try {
      await navigator.clipboard.writeText(text);
      setTelegramCopied(true);
      setTimeout(() => setTelegramCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-5 text-right">
      {/* Session Date & Time Selector Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-slate-600" />
              <span>جلسة وتاريخ الامتحان:</span>
            </span>
            {currentSession?.isActive && (
              <span className="text-[10px] font-bold font-arabic bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>الامتحان مباشر ومتاح للطلاب الآن</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-0.5 max-w-xl">
            <select
              value={selectedExamSessionId}
              onChange={(e) => setSelectedExamSessionId(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold font-arabic text-slate-800 focus:border-slate-800 focus:bg-white transition-all cursor-pointer flex-1 truncate"
            >
              <option value="latest">
                {currentSession
                  ? `[الامتحان الأحدث] ${currentSession.title} - ${currentSession.formattedDate}`
                  : 'الامتحان الأحدث'}
              </option>
              {examSessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.title} - {session.formattedDate} (الساعة {session.formattedTime}) - {session.submissionsCount} ممتحن
                </option>
              ))}
              <option value="all">كشف تراكمي شامل (جميع الامتحانات السابقة)</option>
            </select>

            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncingData}
              className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shrink-0"
              title="مزامنة وتحديث البيانات من السيرفر"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingData ? 'animate-spin text-slate-900' : ''}`} />
            </button>
          </div>

          {syncStatusMsg && (
            <span className="text-[11px] font-arabic text-emerald-700 font-bold block pt-0.5">
              {syncStatusMsg}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenAbsentNoticeModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-arabic cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
            title="فتح كشف الغائبين وتوليد رسالة التبليغ لأولياء الأمور"
          >
            <Bell className="w-4 h-4 text-amber-300" />
            <span>كشف الغائبين وتنبيه أولياء الأمور ({totalAbsentCount})</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <ResultsStatsCards
        currentSession={currentSession}
        totalSubmissions={totalSubmissions}
        participationRate={participationRate}
        totalAbsentCount={totalAbsentCount}
        avgScore={avgScore}
        topScore={topScore}
      />

      {/* Filters & Actions Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchStudentQuery}
            onChange={(e) => setSearchStudentQuery(e.target.value)}
            placeholder="ابحث باسم الطالب..."
            className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 font-arabic focus:border-slate-800 focus:ring-0"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs text-slate-500 font-arabic pl-1 whitespace-nowrap">
            الشعبة:
          </span>
          {['all', 'أ', 'ب', 'ج', 'د'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSectionFilter(sec)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-arabic ${
                selectedSectionFilter === sec
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sec === 'all' ? 'الكل' : `شعبة ${sec}`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
          <button
            onClick={handleCopyTelegramSummary}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shadow-2xs"
            title="نسخ ملخص النتائج لنشره في قناة التيليكرام"
          >
            {telegramCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>ملخص التيليكرام</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenPdfModal}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shadow-xs"
            title="تصدير كشف درجات الطلاب كملف PDF قابل للطباعة"
          >
            <FileDown className="w-4 h-4" />
            <span>تصدير PDF</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Submitted vs Absent vs All */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setResultsSubTab('submitted')}
          className={`py-2 px-4 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer ${
            resultsSubTab === 'submitted'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>الطلاب الممتحنون ({totalSubmissions})</span>
        </button>

        <button
          onClick={() => setResultsSubTab('absent')}
          className={`py-2 px-4 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer ${
            resultsSubTab === 'absent'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>الطلاب غير الممتحنين / الغياب ({totalAbsentCount})</span>
        </button>

        <button
          onClick={() => setResultsSubTab('all_students')}
          className={`py-2 px-4 rounded-xl text-xs font-bold font-arabic transition-all flex items-center gap-2 cursor-pointer ${
            resultsSubTab === 'all_students'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>تسلسل الطلاب المسجلين ({totalRegisteredCount})</span>
        </button>
      </div>

      {/* SUBTAB A: SUBMITTED STUDENTS */}
      {resultsSubTab === 'submitted' && (
        <SubmittedStudentsTable
          filteredSubmissions={filteredSubmissions}
          onSelectStudentForHistory={onSelectStudentForHistory}
        />
      )}

      {/* SUBTAB B: ABSENT STUDENTS */}
      {resultsSubTab === 'absent' && (
        <AbsentStudentsTable absentStudents={absentStudents} />
      )}

      {/* SUBTAB C: ALL REGISTERED STUDENTS */}
      {resultsSubTab === 'all_students' && (
        <RegisteredStudentsTable
          filteredRegisteredStudents={filteredRegisteredStudents}
          onSelectStudentForHistory={onSelectStudentForHistory}
          onRequestDeleteStudent={onRequestDeleteStudent}
        />
      )}
    </div>
  );
};
