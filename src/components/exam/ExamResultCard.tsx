import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ExamResultCardProps {
  studentName: string;
  earnedScore: number;
  totalPoints: number;
  onClose: () => void;
}

export const ExamResultCard: React.FC<ExamResultCardProps> = ({
  studentName,
  earnedScore,
  totalPoints,
  onClose,
}) => {
  return (
    <div className="text-center py-6 sm:py-8 space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border-2 border-slate-300 shadow-xs">
        <CheckCircle2 className="w-9 h-9 text-emerald-600" />
      </div>

      <div>
        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-arabic inline-block mb-2">
          تم تسليم الامتحان بنجاح
        </span>
        <h4 className="text-2xl font-bold text-slate-800 font-arabic">
          أحسنت يا {studentName}!
        </h4>
        <p className="text-xs text-slate-500 font-arabic mt-1">
          تم إرسال درجتك إلى لوحة الأستاذ وتسجيلها في القائمة فوراً
        </p>
      </div>

      {/* Score Display Card */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl max-w-xs mx-auto text-center space-y-1">
        <span className="text-xs text-slate-500 font-arabic block">درجتك النهائية:</span>
        <strong className="text-4xl font-bold text-slate-800 font-mono block">
          {earnedScore} <span className="text-xl text-slate-400 font-normal">/ {totalPoints}</span>
        </strong>
        <span className="text-xs font-bold text-slate-700 font-arabic block pt-1">
          {earnedScore >= totalPoints * 0.8
            ? 'ممتاز جداً! إجابات رائعة'
            : earnedScore >= totalPoints * 0.5
            ? 'جيد جداً! واصل المراجعة'
            : 'حاول مراجعة الدروس والقواعد ثانية'}
        </span>
        <div className="text-[11px] text-slate-500 font-arabic pt-2 border-t border-slate-200 mt-2">
          إشراف وتصحيح مدرس المادة
        </div>
      </div>

      <button
        onClick={onClose}
        className="py-3 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer shadow-sm transition-all font-arabic"
      >
        العودة للمنهاج والدروس
      </button>
    </div>
  );
};
