import React, { useState } from 'react';
import { FileDown, Printer, X, CheckCircle2, UserX } from 'lucide-react';
import { ExamSubmission, StudentSession } from '../../../services/firebase';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
  selectedSectionFilter: string;
  filteredSubmissions: ExamSubmission[];
  filteredRegisteredStudents: StudentSession[];
  allHistoricalSubmissions: ExamSubmission[];
  absentStudents: StudentSession[];
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  isOpen,
  onClose,
  examTitle,
  selectedSectionFilter,
  filteredSubmissions,
  filteredRegisteredStudents,
  allHistoricalSubmissions,
  absentStudents,
}) => {
  const [pdfReportMode, setPdfReportMode] = useState<'single' | 'monthly'>('single');
  const [monthlyExamCount, setMonthlyExamCount] = useState<number>(10);
  const [monthlyReportTitle, setMonthlyReportTitle] = useState<string>('سجل درجات الشهر الأول');

  if (!isOpen) return null;

  const totalRegisteredCount = filteredRegisteredStudents.length;
  const totalSubmissions = filteredSubmissions.length;
  const totalAbsentCount = absentStudents.length;
  const avgScore =
    totalSubmissions > 0
      ? (
          filteredSubmissions.reduce((acc, curr) => acc + (curr.score / curr.totalPoints) * 10, 0) /
          totalSubmissions
        ).toFixed(1)
      : '0';

  const handleExportExcel = () => {
    const BOM = '\uFEFF';
    let csv = `كشف درجات: ${monthlyReportTitle}\n`;
    csv += `الشعبة: ${selectedSectionFilter === 'all' ? 'جميع الشُعب' : 'شعبة ' + selectedSectionFilter}\n`;
    csv += `التاريخ: ${new Date().toLocaleDateString('ar-IQ')}\n\n`;

    const headers = ['ت', 'اسم الطالب', 'الشعبة'];
    for (let i = 1; i <= monthlyExamCount; i++) {
      headers.push(`الامتحان ${i}`);
    }
    headers.push('معدل السعي');
    headers.push('الملاحظات');
    csv += headers.join(',') + '\n';

    const sanitizeCsvCell = (str: string): string => {
      const clean = (str || '').replace(/"/g, '""');
      if (/^[=+\-@\t\r]/.test(clean)) {
        return `'${clean}`;
      }
      return clean;
    };

    filteredRegisteredStudents.forEach((st, idx) => {
      const stSubs = allHistoricalSubmissions
        .filter((s) => {
          const matchId = st.id && s.studentId && s.studentId === st.id;
          const matchName = s.studentName.trim().toLowerCase() === st.fullName.trim().toLowerCase();
          return matchId || matchName;
        })
        .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

      const attendedScores = stSubs.map((s) => (s.score / s.totalPoints) * 10);
      const avgCalc =
        attendedScores.length > 0
          ? (
              attendedScores.reduce((acc, curr) => acc + curr, 0) /
              attendedScores.length
            ).toFixed(1)
          : '—';

      const row = [idx + 1, `"${sanitizeCsvCell(st.fullName)}"`, `"${sanitizeCsvCell(st.section)}"`];
      for (let i = 0; i < monthlyExamCount; i++) {
        const subForSlot = stSubs[i];
        if (subForSlot) {
          row.push(Math.round((subForSlot.score / subForSlot.totalPoints) * 10).toString());
        } else {
          row.push('—');
        }
      }
      row.push(avgCalc);
      row.push(
        attendedScores.length === 0
          ? 'لم يمتحن'
          : attendedScores.length >= monthlyExamCount
          ? 'مكتمل'
          : `امتحن (${attendedScores.length}/${monthlyExamCount})`
      );
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${monthlyReportTitle}_${selectedSectionFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      dir="rtl"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <FileDown className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-base font-bold font-arabic">
                {pdfReportMode === 'single'
                  ? 'تقرير درجات الامتحان • الأول المتوسط'
                  : `${monthlyReportTitle} • كشف الامتحانات اليومية`}
              </h3>
              <span className="text-xs text-slate-300 font-arabic">
                {selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pdfReportMode === 'monthly' && (
              <button
                type="button"
                onClick={handleExportExcel}
                className="py-1.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic shadow-xs transition-colors"
                title="تصدير كشف الدرجات كملف Excel كامل يحتوي على أسماء جميع الطلاب والدرجات"
              >
                <FileDown className="w-4 h-4 text-white" />
                <span>تصدير Excel</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => window.print()}
              className="py-1.5 px-3.5 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic shadow-xs hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-700" />
              <span>طباعة / حفظ PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector and Controls Bar (Hidden in Print) */}
        <div className="bg-slate-100 p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 px-5 print:hidden">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs font-arabic font-bold">
            <button
              type="button"
              onClick={() => setPdfReportMode('single')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                pdfReportMode === 'single'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              كشف الامتحان الحالي
            </button>
            <button
              type="button"
              onClick={() => setPdfReportMode('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                pdfReportMode === 'monthly'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              سجل درجات الشهر المجمع
            </button>
          </div>

          {pdfReportMode === 'monthly' && (
            <div className="flex flex-wrap items-center gap-3 text-xs font-arabic">
              <div className="flex items-center gap-1.5">
                <label className="text-slate-600 font-bold">عنوان السجل:</label>
                <input
                  type="text"
                  value={monthlyReportTitle}
                  onChange={(e) => setMonthlyReportTitle(e.target.value)}
                  placeholder="سجل درجات الشهر الأول"
                  className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs w-44 bg-white"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <label className="text-slate-600 font-bold">عدد الامتحانات اليومية:</label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={monthlyExamCount}
                  onChange={(e) =>
                    setMonthlyExamCount(Math.max(1, Math.min(15, parseInt(e.target.value) || 10)))
                  }
                  className="w-16 px-2 py-1 rounded-lg border border-slate-300 text-center font-mono font-bold bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Printable Document Content (Preview) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-right print:p-0" id="printable-exam-report">
          {/* MODE 1: SINGLE EXAM REPORT */}
          {pdfReportMode === 'single' && (
            <>
              {/* Document Official Header */}
              <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-arabic">
                  <span>جمهورية العراق • وزارة التربية</span>
                  <span>الصف الأول المتوسط</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-arabic pt-1">
                  كشف نتائج ودرجات الامتحان اليومي لمادة اللغة الإنجليزية
                </h2>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-arabic pt-1">
                  <span>الامتحان: <strong>{examTitle}</strong></span>
                  <span>الشعبة: <strong>{selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`}</strong></span>
                  <span>مدرس المادة</span>
                  <span>التاريخ: <strong>{new Date().toLocaleDateString('ar-IQ')}</strong></span>
                </div>
              </div>

              {/* Statistical Summary Box */}
              <div className="grid grid-cols-4 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs font-arabic">
                <div>
                  <span className="text-[11px] text-slate-500 block">عدد المسجلين</span>
                  <strong className="text-base font-bold text-slate-800 font-mono">{totalRegisteredCount}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">عدد الممتحنين</span>
                  <strong className="text-base font-bold text-emerald-700 font-mono">{totalSubmissions}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">عدد الغائبين</span>
                  <strong className="text-base font-bold text-rose-600 font-mono">{totalAbsentCount}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">متوسط الدرجة</span>
                  <strong className="text-base font-bold text-slate-800 font-mono">{avgScore} / 10</strong>
                </div>
              </div>

              {/* Table 1: Attendees and Scores */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-800 font-arabic flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>أولاً: قائمة الطلاب الممتحنين والدرجات ({totalSubmissions} طالب):</span>
                </h4>

                {filteredSubmissions.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 font-arabic">لا يوجد ممتحنون في هذه الشعبة.</p>
                ) : (
                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-right text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 font-bold font-arabic border-b border-slate-200">
                          <th className="p-2.5">ت</th>
                          <th className="p-2.5">اسم الطالب</th>
                          <th className="p-2.5">الشعبة</th>
                          <th className="p-2.5">الدرجة النهائية</th>
                          <th className="p-2.5">وقت التسليم</th>
                          <th className="p-2.5">التقييم</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {filteredSubmissions.map((sub, idx) => (
                          <tr key={sub.id || idx}>
                            <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                            <td className="p-2.5 font-bold font-arabic text-slate-800">{sub.studentName}</td>
                            <td className="p-2.5 font-arabic">شعبة {sub.studentSection}</td>
                            <td className="p-2.5 font-bold font-mono text-slate-900">
                              {sub.score} / {sub.totalPoints}
                            </td>
                            <td className="p-2.5 text-slate-500 text-[11px]">
                              {new Date(sub.submittedAt).toLocaleTimeString('ar-IQ')}
                            </td>
                            <td className="p-2.5 font-arabic">
                              {sub.score >= sub.totalPoints * 0.8
                                ? 'ممتاز'
                                : sub.score >= sub.totalPoints * 0.5
                                ? 'جيد'
                                : 'يحتاج متابعة'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Table 2: Absent Students */}
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-rose-800 font-arabic flex items-center gap-1.5">
                  <UserX className="w-4 h-4 text-rose-600" />
                  <span>ثانياً: قائمة الطلاب غير الممتحنين / الغياب ({totalAbsentCount} طالب):</span>
                </h4>

                {absentStudents.length === 0 ? (
                  <p className="text-xs text-emerald-700 py-2 font-arabic font-bold">لا يوجد غياب، جميع الطلاب امتحنوا بنجاح.</p>
                ) : (
                  <div className="rounded-xl border border-rose-200 overflow-hidden">
                    <table className="w-full text-right text-xs border-collapse">
                      <thead>
                        <tr className="bg-rose-50 text-rose-900 font-bold font-arabic border-b border-rose-200">
                          <th className="p-2.5">ت</th>
                          <th className="p-2.5">اسم الطالب الغائب</th>
                          <th className="p-2.5">الشعبة</th>
                          <th className="p-2.5">الملاحظة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {absentStudents.map((st, idx) => (
                          <tr key={st.id || idx}>
                            <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                            <td className="p-2.5 font-bold font-arabic text-slate-800">{st.fullName}</td>
                            <td className="p-2.5 font-arabic">شعبة {st.section}</td>
                            <td className="p-2.5 text-rose-600 font-arabic font-bold">غائب عن الامتحان</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* MODE 2: MONTHLY CUMULATIVE GRADE REPORT (سجل درجات الشهر) */}
          {pdfReportMode === 'monthly' && (
            <>
              {/* Official Header */}
              <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-arabic">
                  <span>جمهورية العراق • وزارة التربية</span>
                  <span>الصف الأول المتوسط • اللغة الإنجليزية</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-arabic pt-1">
                  {monthlyReportTitle} (الامتحانات اليومية)
                </h2>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-arabic pt-1">
                  <span>الشعبة: <strong>{selectedSectionFilter === 'all' ? 'جميع الشُعب' : `شعبة ${selectedSectionFilter}`}</strong></span>
                  <span>إجمالي الطلاب: <strong>{filteredRegisteredStudents.length} طالب</strong></span>
                  <span>مدرس المادة</span>
                  <span>التاريخ: <strong>{new Date().toLocaleDateString('ar-IQ')}</strong></span>
                </div>
              </div>

              {/* Monthly Grid Table */}
              {filteredRegisteredStudents.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-arabic">
                  لا يوجد طلاب مسجلون في هذه الشعبة لعرض السجل المجمع.
                </div>
              ) : (
                <div className="rounded-xl border border-slate-300 overflow-x-auto">
                  <table className="w-full text-right text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-bold font-arabic border-b border-slate-300">
                        <th className="p-2 text-center w-8 border-l border-slate-200">#</th>
                        <th className="p-2 border-l border-slate-200 min-w-[140px]">اسم الطالب الثلاثي</th>
                        <th className="p-2 text-center w-14 border-l border-slate-200">الشعبة</th>
                        {Array.from({ length: monthlyExamCount }, (_, i) => (
                          <th
                            key={i}
                            className="p-2 text-center border-l border-slate-200 font-arabic font-bold text-[11px] min-w-[55px] text-slate-800"
                          >
                            الامتحان {i + 1}
                          </th>
                        ))}
                        <th className="p-2 text-center border-l border-slate-200 font-bold text-slate-900 bg-slate-200/60 min-w-[65px]">
                          معدل السعي
                        </th>
                        <th className="p-2 text-center min-w-[80px]">ملاحظات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {filteredRegisteredStudents.map((st, idx) => {
                        const stSubs = allHistoricalSubmissions
                          .filter((s) => {
                            const matchId = st.id && s.studentId && s.studentId === st.id;
                            const matchName = s.studentName.trim().toLowerCase() === st.fullName.trim().toLowerCase();
                            return matchId || matchName;
                          })
                          .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

                        const attendedScores = stSubs.map((s) => (s.score / s.totalPoints) * 10);
                        const avgCalc =
                          attendedScores.length > 0
                            ? (
                                attendedScores.reduce((acc, curr) => acc + curr, 0) /
                                attendedScores.length
                              ).toFixed(1)
                            : '—';

                        return (
                          <tr key={st.id || idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-2 text-slate-400 font-mono text-center border-l border-slate-200 font-bold text-[11px]">
                              {idx + 1}
                            </td>
                            <td className="p-2 font-bold font-arabic text-slate-800 border-l border-slate-200">
                              {st.fullName}
                            </td>
                            <td className="p-2 font-arabic text-center border-l border-slate-200 text-[11px]">
                              {st.section}
                            </td>
                            {Array.from({ length: monthlyExamCount }, (_, examIndex) => {
                              const subForSlot = stSubs[examIndex];
                              if (subForSlot) {
                                const scaled = Math.round((subForSlot.score / subForSlot.totalPoints) * 10);
                                return (
                                  <td
                                    key={examIndex}
                                    className="p-2 text-center border-l border-slate-200 font-mono font-bold text-slate-800"
                                  >
                                    {scaled}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={examIndex}
                                    className="p-2 text-center border-l border-slate-200 font-arabic text-slate-300 text-[11px]"
                                  >
                                    —
                                  </td>
                                );
                              }
                            })}
                            <td className="p-2 text-center border-l border-slate-200 font-mono font-bold text-slate-900 bg-slate-50">
                              {avgCalc !== '—' ? `${avgCalc} / 10` : '—'}
                            </td>
                            <td className="p-2 text-center font-arabic text-[11px] text-slate-500">
                              {attendedScores.length === 0
                                ? 'لم يمتحن'
                                : attendedScores.length >= monthlyExamCount
                                ? 'مكتمل'
                                : `امتحن (${attendedScores.length}/${monthlyExamCount})`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Footer Signature Box */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-arabic">
            <span>توقيع مدرس المادة: .............................</span>
            <span>توقيع إدارة المدرسة: .......................................</span>
          </div>
        </div>
      </div>
    </div>
  );
};
