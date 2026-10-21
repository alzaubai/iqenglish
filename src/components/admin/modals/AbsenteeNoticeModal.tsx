import React, { useState } from 'react';
import { UserX, X, CheckCircle2, Copy, Check, Printer } from 'lucide-react';
import { StudentSession } from '../../../services/firebase';

interface AbsenteeNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession: {
    title: string;
    formattedDate: string;
    formattedTime: string;
  } | null;
  absentStudents: StudentSession[];
}

export const AbsenteeNoticeModal: React.FC<AbsenteeNoticeModalProps> = ({
  isOpen,
  onClose,
  currentSession,
  absentStudents,
}) => {
  const [absentNoticeSectionFilter, setAbsentNoticeSectionFilter] = useState<string>('all');
  const [absentNoticeCopied, setAbsentNoticeCopied] = useState(false);

  if (!isOpen) return null;

  const listToShow =
    absentNoticeSectionFilter === 'all'
      ? absentStudents
      : absentStudents.filter((s) => s.section === absentNoticeSectionFilter);

  const handleCopyAbsentNoticeForParents = async () => {
    const sectionLabel =
      absentNoticeSectionFilter === 'all'
        ? 'جميع الشُعب (أ، ب، ج، د)'
        : `شعبة (${absentNoticeSectionFilter})`;

    const namesList =
      listToShow.length > 0
        ? listToShow.map((st, i) => `${i + 1}. ${st.fullName} (شعبة ${st.section})`).join('\n')
        : 'لا يوجد طلبة غائبون.';

    const examTitleText = currentSession?.title || 'الامتحان السريع';
    const examDateText = currentSession
      ? `${currentSession.formattedDate} - ${currentSession.formattedTime}`
      : new Date().toLocaleDateString('ar-IQ');

    const message = `📢 تنبيه هام لأولياء الأمور الكرام:

موضوع الامتحان: ${examTitleText}
تاريخ وتوقيت الامتحان: ${examDateText}
الصف: الأول المتوسط • ${sectionLabel}

نود إعلامكم بأن الطلبة المدرجة أسماؤهم أدناه لم يؤدوا الامتحان الإلكتروني المقرر حتى الآن:
----------------------------------
${namesList}
----------------------------------
يرجى من أولياء الأمور الكرام متابعة أبنائهم وحثهم على أداء الواجبات والامتحانات الإلكترونية بانتظام.

مع التقدير،
مدرس المادة`;

    try {
      await navigator.clipboard.writeText(message);
      setAbsentNoticeCopied(true);
      setTimeout(() => setAbsentNoticeCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" dir="rtl">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col text-right overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <UserX className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 font-arabic">
                كشف أسماء الطلبة الغائبين وتنبيه أولياء الأمور
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-arabic pr-10">
              {currentSession ? (
                <>امتحان: <strong className="text-slate-700">{currentSession.title}</strong> • تاريخ: {currentSession.formattedDate} (الساعة {currentSession.formattedTime})</>
              ) : (
                'كشف الغياب التراكمي للطلبة غير المشاركين'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filter inside Modal */}
        <div className="px-5 sm:px-6 pt-4 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 font-arabic pl-1">
              تصفية حسب الشعبة:
            </span>
            {['all', 'أ', 'ب', 'ج', 'د'].map((sec) => {
              const count =
                sec === 'all'
                  ? absentStudents.length
                  : absentStudents.filter((s) => s.section === sec).length;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setAbsentNoticeSectionFilter(sec)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold font-arabic transition-all cursor-pointer ${
                    absentNoticeSectionFilter === sec
                      ? 'bg-slate-800 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {sec === 'all' ? `الكل (${count})` : `شعبة ${sec} (${count})`}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-bold text-rose-600 font-arabic bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
            العدد: {listToShow.length} طالب
          </span>
        </div>

        {/* Students Table */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {listToShow.length === 0 ? (
            <div className="py-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-700 font-arabic">
                لا يوجد طلبة غائبون في هذه الشعبة
              </p>
              <span className="text-[11px] text-slate-400 font-arabic block">
                جميع طلبة الشعبة أدوا الامتحان بنجاح.
              </span>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-right text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-bold font-arabic border-b border-slate-200">
                    <th className="p-3">#</th>
                    <th className="p-3">اسم الطالب الغائب</th>
                    <th className="p-3">الشعبة</th>
                    <th className="p-3">الكود المسجل</th>
                    <th className="p-3">حالة الأداء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {listToShow.map((st, idx) => (
                    <tr key={st.id || idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono text-slate-400 text-xs">{idx + 1}</td>
                      <td className="p-3 font-bold font-arabic text-slate-800">{st.fullName}</td>
                      <td className="p-3 font-bold font-arabic">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-xs">
                          شعبة {st.section}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-xs text-slate-500 uppercase">{st.code}</td>
                      <td className="p-3 font-arabic">
                        <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                          لم يؤدِ الامتحان
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyAbsentNoticeForParents}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-arabic cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-1.5"
              title="نسخ صيغة تبليغ رسمية وجاهزة للنشر لأولياء الأمور"
            >
              {absentNoticeCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>تم نسخ رسالة التبليغ بنجاح</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>نسخ رسالة التبليغ لأولياء الأمور</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs font-arabic cursor-pointer transition-colors flex items-center gap-1.5"
              title="طباعة كشف الغياب"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>طباعة</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs font-arabic cursor-pointer transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
