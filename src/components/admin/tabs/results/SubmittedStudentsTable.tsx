import React from 'react';
import { Users, Clock } from 'lucide-react';
import { ExamSubmission } from '../../../../services/firebase';

interface SubmittedStudentsTableProps {
  filteredSubmissions: ExamSubmission[];
  onSelectStudentForHistory: (student: {
    studentId?: string;
    studentName: string;
    studentSection: string;
    studentCode?: string;
  }) => void;
}

export const SubmittedStudentsTable: React.FC<SubmittedStudentsTableProps> = ({
  filteredSubmissions,
  onSelectStudentForHistory,
}) => {
  if (filteredSubmissions.length === 0) {
    return (
      <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
        <Users className="w-10 h-10 text-slate-300 mx-auto" />
        <h4 className="text-sm font-bold text-slate-700 font-arabic">
          لا توجد درجات مسجلة في هذا القسم حتى الآن
        </h4>
        <p className="text-xs text-slate-400 font-arabic max-w-sm mx-auto">
          عندما يحل الطلاب الامتحان السريع ستظهر أسماؤهم ودرجاتهم هنا لحظياً.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-right border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-50 text-slate-700 font-bold font-arabic border-b border-slate-200">
            <th className="p-3.5">#</th>
            <th className="p-3.5">اسم الطالب</th>
            <th className="p-3.5">الشعبة</th>
            <th className="p-3.5">كود التفعيل</th>
            <th className="p-3.5">الدرجة</th>
            <th className="p-3.5">وقت التسليم</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-sans">
          {filteredSubmissions.map((sub, idx) => (
            <tr key={sub.id || idx} className="hover:bg-slate-50/80 transition-colors">
              <td className="p-3.5 text-slate-400 font-mono text-xs">{idx + 1}</td>
              <td className="p-3.5 font-bold font-arabic text-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    onSelectStudentForHistory({
                      studentId: sub.studentId,
                      studentName: sub.studentName,
                      studentSection: sub.studentSection,
                      studentCode: sub.studentCode,
                    })
                  }
                  className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 cursor-pointer text-right group transition-colors"
                  title="انقر لعرض سجل جميع الامتحانات اليومية لهذا الطالب بالتاريخ والدرجات"
                >
                  <span>{sub.studentName}</span>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 opacity-80 group-hover:opacity-100 font-normal">
                    سجل الامتحانات
                  </span>
                </button>
              </td>
              <td className="p-3.5 font-bold font-arabic">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  شعبة {sub.studentSection}
                </span>
              </td>
              <td className="p-3.5 font-mono text-xs text-slate-500 uppercase">
                {sub.studentCode}
              </td>
              <td className="p-3.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-300">
                  {sub.score} / {sub.totalPoints}
                </span>
              </td>
              <td className="p-3.5 text-xs text-slate-500 font-arabic">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{new Date(sub.submittedAt).toLocaleTimeString('ar-IQ')}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
