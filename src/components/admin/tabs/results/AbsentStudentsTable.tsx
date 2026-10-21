import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { StudentSession } from '../../../../services/firebase';

interface AbsentStudentsTableProps {
  absentStudents: StudentSession[];
}

export const AbsentStudentsTable: React.FC<AbsentStudentsTableProps> = ({
  absentStudents,
}) => {
  if (absentStudents.length === 0) {
    return (
      <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
        <h4 className="text-sm font-bold text-slate-800 font-arabic">
          ممتاز! جميع طلاب هذه الشعبة قد أكملوا الامتحان بنجاح
        </h4>
        <p className="text-xs text-slate-400 font-arabic max-w-sm mx-auto">
          نسبة الحضور 100%، لا يوجد طلاب غائبون في القائمة.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-right border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-rose-50/70 text-rose-900 font-bold font-arabic border-b border-rose-200">
            <th className="p-3.5">#</th>
            <th className="p-3.5">اسم الطالب الغائب</th>
            <th className="p-3.5">الشعبة</th>
            <th className="p-3.5">كود التفعيل المسجل</th>
            <th className="p-3.5">حالة الامتحان</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-sans">
          {absentStudents.map((st, idx) => (
            <tr key={st.id || idx} className="hover:bg-slate-50/80 transition-colors">
              <td className="p-3.5 text-slate-400 font-mono text-xs">{idx + 1}</td>
              <td className="p-3.5 font-bold font-arabic text-slate-800">{st.fullName}</td>
              <td className="p-3.5 font-bold font-arabic">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  شعبة {st.section}
                </span>
              </td>
              <td className="p-3.5 font-mono text-xs text-slate-500 uppercase">{st.code}</td>
              <td className="p-3.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-arabic font-bold text-xs bg-rose-50 text-rose-700 border border-rose-200">
                  لم يؤدِ الامتحان بعد
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
