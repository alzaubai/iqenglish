import React from 'react';
import { History, X, Calendar } from 'lucide-react';
import { ExamSubmission } from '../../../services/firebase';

interface StudentHistoryModalProps {
  student: {
    studentId?: string;
    studentName: string;
    studentSection: string;
    studentCode?: string;
  } | null;
  allHistoricalSubmissions: ExamSubmission[];
  onClose: () => void;
}

export const StudentHistoryModal: React.FC<StudentHistoryModalProps> = ({
  student,
  allHistoricalSubmissions,
  onClose,
}) => {
  if (!student) return null;

  const studentExams = allHistoricalSubmissions.filter((sub) => {
    const matchId = student.studentId && sub.studentId && sub.studentId === student.studentId;
    const matchName = sub.studentName.trim().toLowerCase() === student.studentName.trim().toLowerCase();
    return matchId || matchName;
  });

  const totalExams = studentExams.length;
  const avgStudentScore =
    totalExams > 0
      ? (
          studentExams.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
          totalExams
        ).toFixed(1)
      : '0';

  const topStudentScore = totalExams > 0 ? Math.max(...studentExams.map((s) => s.score)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      dir="rtl"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-arabic">
                سجل الامتحانات اليومية الكامل للطالب
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-arabic pt-0.5">
                <span className="font-bold text-white">{student.studentName}</span>
                <span>•</span>
                <span>شعبة {student.studentSection}</span>
                {student.studentCode && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-slate-400 uppercase">كود: {student.studentCode}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-header with teacher attribution */}
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-arabic">
          <span>إشراف مدرس المادة</span>
          <span>الصف: <strong>الأول المتوسط</strong></span>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-right">
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-arabic">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">إجمالي الامتحانات</span>
              <strong className="text-base font-bold text-slate-800 font-mono">{totalExams}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">متوسط الدرجات</span>
              <strong className="text-base font-bold text-emerald-700 font-mono">{avgStudentScore} / 10</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">أعلى درجة</span>
              <strong className="text-base font-bold text-blue-700 font-mono">{topStudentScore}</strong>
            </div>
          </div>

          {/* Exams List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 font-arabic flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>تفاصيل الامتحانات اليومية المؤداة:</span>
            </h4>

            {totalExams === 0 ? (
              <div className="py-10 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="text-xs text-slate-500 font-arabic font-bold">
                  لا توجد درجات مسجلة لهذا الطالب في قاعدة البيانات حتى الآن.
                </p>
                <p className="text-[11px] text-slate-400 font-arabic">
                  عندما يؤدي الطالب أي امتحان سريع ستظهر نتيجته وتاريخه هنا مباشرة.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-right text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold font-arabic border-b border-slate-200">
                      <th className="p-3 font-mono text-center w-10">#</th>
                      <th className="p-3">عنوان الامتحان</th>
                      <th className="p-3">اليوم والتاريخ الكامل</th>
                      <th className="p-3 text-center">الوقت</th>
                      <th className="p-3 text-center">الدرجة</th>
                      <th className="p-3 text-center">النسبة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {studentExams.map((ex, idx) => {
                      const dateObj = new Date(ex.submittedAt);
                      const dayName = dateObj.toLocaleDateString('ar-IQ', { weekday: 'long' });
                      const fullDate = dateObj.toLocaleDateString('ar-IQ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                      const timeStr = dateObj.toLocaleTimeString('ar-IQ', {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      const percent = Math.round((ex.score / ex.totalPoints) * 100);

                      return (
                        <tr key={ex.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono text-slate-400 text-center font-bold">{idx + 1}</td>
                          <td className="p-3 font-bold font-arabic text-slate-800">
                            {ex.examTitle || 'الامتحان السريع'}
                          </td>
                          <td className="p-3 font-arabic text-slate-600">
                            <span className="font-bold text-slate-800 ml-1">{dayName}</span>
                            <span className="text-[11px] text-slate-500">({fullDate})</span>
                          </td>
                          <td className="p-3 font-arabic text-slate-500 text-center text-[11px]">
                            {timeStr}
                          </td>
                          <td className="p-3 text-center font-mono font-bold text-slate-900">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                              {ex.score} / {ex.totalPoints}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono ${
                                percent >= 80
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : percent >= 50
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {percent}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-arabic">
            إشراف مدرس المادة
          </span>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer font-arabic transition-colors"
          >
            إغلاق السجل
          </button>
        </div>
      </div>
    </div>
  );
};
