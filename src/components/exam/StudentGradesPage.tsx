import React, { useState, useEffect } from 'react';
import { Award, Calendar, CheckCircle2, AlertCircle, Clock, ChevronDown, ChevronUp, User, ShieldCheck } from 'lucide-react';
import {
  StudentSession,
  ExamSubmission,
  listenToStudentSubmissions,
} from '../../services/firebase';
import { UNIT_1_QUESTION_BANK } from '../../data/defaultExamQuestions';

interface StudentGradesPageProps {
  student: StudentSession;
}

export const StudentGradesPage: React.FC<StudentGradesPageProps> = ({ student }) => {
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedExamId, setExpandedExamId] = useState<string | null>(null);

  useEffect(() => {
    if (!student?.id) return;
    setIsLoading(true);
    const unsub = listenToStudentSubmissions(student.id, (list) => {
      setSubmissions(list);
      setIsLoading(false);
    });
    return () => unsub();
  }, [student?.id]);

  const totalExams = submissions.length;
  const avgScore =
    totalExams > 0
      ? (
          submissions.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
          totalExams
        ).toFixed(1)
      : '0';

  const highestScore =
    totalExams > 0
      ? Math.max(...submissions.map((s) => Math.round((s.score / s.totalPoints) * 10)))
      : 0;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Student Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-lg shadow-xs font-sans shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 font-arabic">
                  {student.fullName}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold font-arabic border border-slate-200">
                  شعبة {student.section}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-arabic mt-0.5">
                الصف الأول المتوسط • إعداد وإشراف: أ. حسام محمود منصور
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-arabic bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>حساب طالب نشط ومفعل</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
            <span className="text-xs text-slate-500 font-arabic block">الامتحانات المنجزة</span>
            <strong className="text-2xl font-bold font-mono text-slate-800 block mt-1">
              {totalExams}
            </strong>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
            <span className="text-xs text-slate-500 font-arabic block">المعدل العام</span>
            <strong className="text-2xl font-bold font-mono text-slate-800 block mt-1">
              {avgScore} <span className="text-xs text-slate-400 font-normal font-sans">/ 10</span>
            </strong>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
            <span className="text-xs text-slate-500 font-arabic block">أعلى درجة</span>
            <strong className="text-2xl font-bold font-mono text-slate-800 block mt-1">
              {highestScore} <span className="text-xs text-slate-400 font-normal font-sans">/ 10</span>
            </strong>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
            <span className="text-xs text-slate-500 font-arabic block">وقت الدراسة الفعّال</span>
            <strong className="text-2xl font-bold font-mono text-slate-800 block mt-1">
              {student.totalTimeSpentMinutes || 0} <span className="text-xs text-slate-400 font-normal font-arabic">دقيقة</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Submissions Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-700" />
            <span>سجل الامتحانات اليومية والنتائج</span>
          </h3>
          <span className="text-xs text-slate-400 font-arabic">
            {totalExams} {totalExams === 1 ? 'امتحان' : 'امتحانات'}
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-xs text-slate-400 font-arabic">
            جاري تحميل سجل النتائج...
          </div>
        ) : totalExams === 0 ? (
          <div className="text-center py-12 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700 font-arabic">
              لم تقدم أي امتحان حتى الآن
            </h4>
            <p className="text-xs text-slate-500 font-arabic max-w-md mx-auto leading-relaxed">
              عندما يُفعّل مدرس المادة امتحاناً سريعاً وتقوم بالإجابة عنه وتسليمه، ستظهر درجتك وتفاصيل الإجابات هنا مباشرة.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => {
              const percentage = Math.round((sub.score / sub.totalPoints) * 100);
              const isExpanded = expandedExamId === sub.id;
              const formattedDate = sub.submittedAt
                ? new Date(sub.submittedAt).toLocaleDateString('ar-IQ', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'حديثاً';

              // Convert answers safely whether array or object map
              const answersList: Array<{
                promptEn: string;
                promptAr?: string;
                studentAnswer: string;
                correctAnswer?: string;
                isCorrect?: boolean;
              }> = Array.isArray(sub.answers)
                ? (sub.answers as any[])
                : sub.answers && typeof sub.answers === 'object'
                ? Object.entries(sub.answers).map(([qId, studentChoice], idx) => {
                    const q = UNIT_1_QUESTION_BANK.find((item) => item.id === qId);
                    return {
                      promptEn: q?.questionEn || `سؤال ${idx + 1}`,
                      promptAr: q?.questionAr || '',
                      studentAnswer: String(studentChoice),
                      correctAnswer: q?.correctAnswer,
                      isCorrect: q ? q.correctAnswer === studentChoice : undefined,
                    };
                  })
                : [];

              return (
                <div
                  key={sub.id}
                  className="rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedExamId(isExpanded ? null : (sub.id || null))}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="text-sm font-bold text-slate-800 font-arabic truncate">
                          {sub.examTitle}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-arabic">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-left">
                        <div className="font-mono font-bold text-base text-slate-800">
                          {sub.score} <span className="text-xs text-slate-400 font-normal">/ {sub.totalPoints}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-arabic inline-block mt-0.5 ${
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
                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Questions Review */}
                  {isExpanded && answersList.length > 0 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2.5">
                      <span className="text-xs font-bold text-slate-700 font-arabic block mb-2">
                        مراجعة إجابات الامتحان:
                      </span>
                      {answersList.map((ans, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-arabic space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-800">
                              سؤال {idx + 1}: {ans.promptEn}
                            </span>
                            {ans.isCorrect !== undefined && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                  ans.isCorrect
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {ans.isCorrect ? 'صحيح' : 'خطأ'}
                              </span>
                            )}
                          </div>
                          {ans.promptAr && (
                            <div className="text-[11px] text-slate-500 font-arabic">
                              {ans.promptAr}
                            </div>
                          )}
                          <div className="text-slate-600 pt-1">
                            <span>إجابتك: </span>
                            <strong className={ans.isCorrect ? 'text-emerald-700 font-mono' : 'text-rose-700 font-mono'}>
                              {ans.studentAnswer || 'لم يتم الإجابة'}
                            </strong>
                            {!ans.isCorrect && ans.correctAnswer && (
                              <span className="block text-slate-500 mt-0.5">
                                الإجابة النموذجية: <strong className="text-slate-800 font-mono">{ans.correctAnswer}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
