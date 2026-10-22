import React from 'react';
import { Clock } from 'lucide-react';

interface TrialNoticeBarProps {
  isVisible: boolean;
  minutesRemaining: number | null;
}

export const TrialNoticeBar: React.FC<TrialNoticeBarProps> = ({
  isVisible,
  minutesRemaining,
}) => {
  if (!isVisible || minutesRemaining === null) return null;

  let remainingText = '';
  if (minutesRemaining <= 0) {
    remainingText = 'انتهت الفترة التجريبية';
  } else if (minutesRemaining < 60) {
    remainingText = `${minutesRemaining} دقيقة`;
  } else if (minutesRemaining < 1440) {
    const hours = Math.floor(minutesRemaining / 60);
    const mins = minutesRemaining % 60;
    remainingText = mins > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${hours} ساعة`;
  } else {
    const days = Math.floor(minutesRemaining / 1440);
    const hours = Math.floor((minutesRemaining % 1440) / 60);
    remainingText = hours > 0 ? `${days} يوم و ${hours} ساعة` : `${days} يوم`;
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200/80 py-2 px-4 text-center sticky top-14 sm:top-16 z-30 shadow-2xs font-arabic">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-xs font-bold text-amber-900">
        <Clock className="w-4 h-4 text-amber-700 shrink-0" />
        <span>فترة تجريبية للمنصة: متبقي لك ({remainingText})</span>
      </div>
    </div>
  );
};
