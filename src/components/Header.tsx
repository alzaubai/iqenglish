import React from 'react';
import { BookOpen, BookMarked, ShieldCheck, Award, User } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curriculum' | 'grammar';
  onTabChange: (tab: 'curriculum' | 'grammar') => void;
  studentName?: string;
  studentSection?: string;
  isExamActive?: boolean;
  onOpenExam?: () => void;
  onOpenTeacherDashboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  studentName,
  studentSection,
  isExamActive,
  onOpenExam,
  onOpenTeacherDashboard,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200" dir="rtl">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm font-sans shrink-0">
            E1
          </div>
          <div className="min-w-0">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-zinc-900 block leading-tight font-sans">
              English for Iraq
            </span>
            <span className="text-[10px] sm:text-xs text-zinc-500 font-arabic hidden sm:block leading-tight">
              الصف الأول المتوسط • المنهاج التفاعلي
            </span>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Exam Alert Button (if active) */}
          {isExamActive && onOpenExam && (
            <button
              onClick={onOpenExam}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-xs flex items-center gap-1 font-arabic shadow-xs cursor-pointer animate-pulse transition-all shrink-0"
              title="امتحان سريع متاح الآن!"
            >
              <Award className="w-3.5 h-3.5" />
              <span>امتحان سريع 🚀</span>
            </button>
          )}

          {/* Navigation Tabs */}
          <nav className="flex items-center p-0.5 sm:p-1 bg-zinc-100 rounded-xl border border-zinc-200/80 shrink-0">
            <button
              onClick={() => onTabChange('curriculum')}
              className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer font-arabic ${
                activeTab === 'curriculum'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-zinc-700 shrink-0" />
              <span className="sm:hidden">الدروس</span>
              <span className="hidden sm:inline">الدروس</span>
            </button>
            <button
              onClick={() => onTabChange('grammar')}
              className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer font-arabic relative ${
                activeTab === 'grammar'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <BookMarked className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 shrink-0" />
              <span className="sm:hidden">القواعد</span>
              <span className="hidden sm:inline">القواعد</span>
              <span className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 rounded-full font-sans font-bold hidden sm:inline ${
                activeTab === 'grammar'
                  ? 'bg-amber-400 text-zinc-950'
                  : 'bg-zinc-200 text-zinc-800'
              }`}>
                جديد
              </span>
            </button>
          </nav>

          {/* Teacher Admin Button */}
          {onOpenTeacherDashboard && (
            <button
              onClick={onOpenTeacherDashboard}
              className="px-2 sm:px-2.5 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-xs flex items-center gap-1 cursor-pointer font-arabic transition-all shadow-2xs shrink-0"
              title="لوحة تحكم الأستاذ (إدارة الدروس والامتحانات والدرجات)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
              <span className="hidden sm:inline">الأستاذ 👨‍🏫</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
