import React from 'react';
import { Clock } from 'lucide-react';

interface ExamTimerBannersProps {
  isTimeExpired: boolean;
  isForceEnding: boolean;
  countdown: number;
  onClose: () => void;
}

export const ExamTimerBanners: React.FC<ExamTimerBannersProps> = ({
  isTimeExpired,
  isForceEnding,
  countdown,
  onClose,
}) => {
  return (
    <>
      {/* TIME EXPIRED NOTICE BANNER */}
      {isTimeExpired && (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-arabic space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <span>انتهى وقت الامتحان المقرر</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            تم حفظ إجاباتك الحالية واحتساب درجات الأسئلة التي حللتها وإرسالها للأستاذ بنجاح.
          </p>
        </div>
      )}

      {/* TEACHER STOPPED EXAM NOTICE BANNER */}
      {isForceEnding && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-arabic space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <span>قام مدرس المادة بإنهاء وقت الامتحان</span>
          </div>
          <p className="text-amber-700 leading-relaxed">
            تم حفظ إجاباتك الحالية واحتساب نتيجتك وإرسالها للأستاذ تلقائياً بنجاح. ستُغلق هذه الشاشة تلقائياً بعد <strong>{countdown}</strong> ثوانٍ.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              إغلاق ومتابعة الدروس الآن ({countdown})
            </button>
          </div>
        </div>
      )}
    </>
  );
};
