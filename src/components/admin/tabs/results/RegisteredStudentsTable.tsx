import React from 'react';
import { Users, Trash2 } from 'lucide-react';
import { StudentSession } from '../../../../services/firebase';

interface RegisteredStudentsTableProps {
  filteredRegisteredStudents: StudentSession[];
  onSelectStudentForHistory: (student: {
    studentId?: string;
    studentName: string;
    studentSection: string;
    studentCode?: string;
  }) => void;
  onRequestDeleteStudent: (student: StudentSession) => void;
}

export const RegisteredStudentsTable: React.FC<RegisteredStudentsTableProps> = ({
  filteredRegisteredStudents,
  onSelectStudentForHistory,
  onRequestDeleteStudent,
}) => {
  if (filteredRegisteredStudents.length === 0) {
    return (
      <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
        <Users className="w-10 h-10 text-slate-300 mx-auto" />
        <h4 className="text-sm font-bold text-slate-700 font-arabic">
          لا يوجد طلاب مسجلون في هذا القسم حالياً
        </h4>
        <p className="text-xs text-slate-400 font-arabic">
          عندما يقوم الطلاب بالتسجيل باستخدام كود التفعيل، ستظهر أسماؤهم هنا بتسلسل رقمي
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-arabic">
        <span>
          إجمالي الطلاب المسجلين:{' '}
          <strong className="text-slate-800">{filteredRegisteredStudents.length} طالب</strong>
        </span>
        <span className="text-[11px] text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">
          عند حذف أي طالب، يُحظر حساب هذا الطالب فقط ولا يمكنه الدخول مجدداً بنفس الكود القديم
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-arabic font-bold">
              <th className="p-3 font-mono text-center w-12">#</th>
              <th className="p-3">اسم الطالب الثلاثي</th>
              <th className="p-3 text-center">الشعبة</th>
              <th className="p-3 text-center">كود التفعيل</th>
              <th className="p-3 text-center">تاريخ الانضمام</th>
              <th className="p-3 text-center w-24">إجراء الحذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {filteredRegisteredStudents.map((st, idx) => {
              const regDate = st.registeredAt
                ? new Date(st.registeredAt).toLocaleDateString('ar-IQ', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'غير محدد';

              return (
                <tr key={st.id || idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-slate-400 font-mono text-xs text-center font-bold">
                    {idx + 1}
                  </td>
                  <td className="p-3 font-bold font-arabic text-slate-800">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectStudentForHistory({
                          studentId: st.id,
                          studentName: st.fullName,
                          studentSection: st.section,
                          studentCode: st.code,
                        })
                      }
                      className="hover:text-blue-700 hover:underline inline-flex items-center gap-1.5 cursor-pointer text-right group transition-colors"
                      title="انقر لعرض سجل جميع الامتحانات اليومية لهذا الطالب بالتاريخ والدرجات"
                    >
                      <span>{st.fullName}</span>
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 opacity-80 group-hover:opacity-100 font-normal">
                        سجل الامتحانات
                      </span>
                    </button>
                  </td>
                  <td className="p-3 font-bold font-arabic text-center">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      شعبة {st.section}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-slate-600 text-center uppercase">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold">
                      {st.code}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 font-arabic text-[11px] text-center">
                    {regDate}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => onRequestDeleteStudent(st)}
                      className="py-1 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-arabic font-bold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1 mx-auto"
                      title={`حذف الطالب ${st.fullName} وإلغاء كوده`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
