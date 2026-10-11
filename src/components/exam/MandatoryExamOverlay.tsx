import React from 'react';
import { Award, Clock, ArrowLeft, AlertCircle } from 'lucide-react';
import { QuickExam, StudentSession } from '../../services/firebase';

interface MandatoryExamOverlayProps {
  exam: QuickExam;
  student: StudentSession;
  onStartExam: () => void;
}

export const MandatoryExamOverlay: React.FC<MandatoryExamOverlayProps> = ({
  exam,
  student,
  onStartExam,
}) => {
  return (
    <div
      className="fixed inset-0 z-[45] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-center space-y-6 my-auto">
        {/* Glowing Badge */}
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center border-2 border-blue-200 shadow-sm animate-bounce">
          <Award className="w-8 h-8" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-arabic inline-block">
            امتحان يومي مباشر ⏱️
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-arabic">
            {exam.title}
          </h2>
          <p className="text-xs text-slate-500 font-arabic leading-relaxed pt-1">
            أهلاً بك يا <strong>{student.fullName}</strong>. أطلق أستاذ المادة هذا الامتحان السريع لطلاب شعبة ({student.section}).
            يجب حل الأسئلة وتسليمها للتمكن من متابعة تصفح الدروس.
          </p>
        </div>

        {/* Exam Quick Specs */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-around text-xs text-slate-600 font-arabic">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block">عدد الأسئلة</span>
            <strong className="font-mono text-sm text-slate-800 font-bold">
              {exam.questions?.length || 5} أسئلة
            </strong>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block">نوع الأسئلة</span>
            <strong className="text-slate-800 font-bold">
              تمارين كتاب النشاط
            </strong>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block">المدة المقدرة</span>
            <strong className="font-mono text-sm text-slate-800 font-bold flex items-center gap-1 justify-center">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>10 دقائق</span>
            </strong>
          </div>
        </div>

        {/* Mandatory Action */}
        <div className="space-y-2">
          <button
            onClick={onStartExam}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer shadow-sm transition-all font-arabic flex items-center justify-center gap-2"
          >
            <span>بدء الامتحان وتسليم الإجابات الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-slate-400 font-arabic block">
            يتم تسجيل درجتك وإرسالها إلى لوحة الأستاذ تلقائياً فور التسليم.
          </span>
        </div>
      </div>
    </div>
  );
};
