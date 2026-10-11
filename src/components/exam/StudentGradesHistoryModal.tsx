import React, { useState, useEffect } from 'react';
import { Award, X, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  StudentSession,
  ExamSubmission,
  listenToStudentSubmissions
} from '../../services/firebase';

interface StudentGradesHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentSession;
}

export const StudentGradesHistoryModal: React.FC<StudentGradesHistoryModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !student) return;

    setIsLoading(true);
    const unsub = listenToStudentSubmissions(student.id, (list) => {
      setSubmissions(list);
      setIsLoading(false);
    });

    return () => unsub();
  }, [isOpen, student]);

  if (!isOpen) return null;

  const totalExams = submissions.length;
  const avgScore =
    totalExams > 0
      ? (
          submissions.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
          totalExams
        ).toFixed(1)
      : '0';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-sm overflow-y-auto"
      dir="rtl"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-800 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-arabic">
                سجل امتحاناتي ودرجاتي
              </h3>
              <span className="text-xs text-slate-300 font-arabic block mt-0.5">
                الطالب: <strong className="text-white">{student.fullName}</strong> • شعبة {student.section}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <span className="text-[11px] text-slate-500 font-arabic block">الامتحانات المكتملة</span>
              <strong className="text-2xl font-bold font-mono text-slate-800 block mt-0.5">
                {totalExams}
              </strong>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <span className="text-[11px] text-slate-500 font-arabic block">معدل الدرجات</span>
              <strong className="text-2xl font-bold font-mono text-slate-800 block mt-0.5">
                {avgScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
              </strong>
            </div>
          </div>

          {/* Submissions List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 font-arabic">
              تفاصيل الامتحانات المسلمة:
            </h4>

            {isLoading ? (
              <div className="text-center py-8 text-xs text-slate-400 font-arabic">
                جاري تحميل سجل الدرجات...
              </div>
            ) : totalExams === 0 ? (
              <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700 font-arabic">
                  لم تقم بأداء أي امتحان بعد.
                </p>
                <span className="text-[11px] text-slate-500 font-arabic block">
                  عندما يطلق الأستاذ امتحاناً سريعاً وتقوم بتسليمه، ستظهر نتيجتك وتفاصيلها هنا فوراً.
                </span>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[45vh] overflow-y-auto pr-0.5">
                {submissions.map((sub) => {
                  const percentage = Math.round((sub.score / sub.totalPoints) * 100);
                  const formattedDate = sub.submittedAt
                    ? new Date(sub.submittedAt).toLocaleDateString('ar-IQ', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'حديثاً';

                  return (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-right"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <h5 className="text-xs font-bold text-slate-800 font-arabic truncate">
                            {sub.examTitle}
                          </h5>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-arabic">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="text-left shrink-0">
                        <div className="font-mono font-bold text-sm text-slate-800">
                          {sub.score} <span className="text-[11px] text-slate-400">/ {sub.totalPoints}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md font-arabic inline-block mt-0.5 ${
                            percentage >= 80
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : percentage >= 50
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="py-2 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer font-arabic transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
