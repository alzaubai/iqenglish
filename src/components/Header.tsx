import React from 'react';
import { BookOpen, BookMarked, ShieldCheck, Award, User, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curriculum' | 'grammar';
  onTabChange: (tab: 'curriculum' | 'grammar') => void;
  studentName?: string;
  studentSection?: string;
  isTeacher?: boolean;
  onLogoutTeacher?: () => void;
  isExamActive?: boolean;
  onOpenExam?: () => void;
  onOpenTeacherDashboard?: () => void;
  onOpenStudentGradesHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  studentName,
  studentSection,
  isTeacher,
  onLogoutTeacher,
  isExamActive,
  onOpenExam,
  onOpenTeacherDashboard,
  onOpenStudentGradesHistory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200" dir="rtl">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs font-sans shrink-0">
            E1
          </div>
          <div className="min-w-0">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-slate-800 block leading-tight font-sans">
              English for Iraq
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-arabic hidden sm:block leading-tight">
              الصف الأول المتوسط • المنهاج التفاعلي
            </span>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Exam Alert Button (if active and not teacher) */}
          {isExamActive && onOpenExam && !isTeacher && (
            <button
              onClick={onOpenExam}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 font-arabic shadow-2xs cursor-pointer transition-all shrink-0 animate-pulse"
              title="امتحان سريع متاح الآن!"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>امتحان سريع</span>
            </button>
          )}

          {/* Navigation Tabs (الدروس / القواعد) */}
          <nav className="flex items-center p-0.5 sm:p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
            <button
              onClick={() => onTabChange('curriculum')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer font-arabic ${
                activeTab === 'curriculum'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-600 shrink-0" />
              <span>الدروس</span>
            </button>
            <button
              onClick={() => onTabChange('grammar')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer font-arabic relative ${
                activeTab === 'grammar'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookMarked className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-300 shrink-0" />
              <span>القواعد</span>
              <span className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 rounded-full font-sans font-bold hidden sm:inline ${
                activeTab === 'grammar'
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                جديد
              </span>
            </button>
          </nav>

          {/* STUDENT MODE: Icon-only Grades & History Button (No long text) */}
          {!isTeacher && studentName && onOpenStudentGradesHistory && (
            <button
              onClick={onOpenStudentGradesHistory}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shadow-2xs shrink-0"
              title="سجل درجاتي وامتحاناتي"
            >
              <Award className="w-4 h-4 text-amber-500" />
            </button>
          )}

          {/* TEACHER MODE: Dedicated Dashboard Button (Accessible inside all lessons and grammar) */}
          {isTeacher && onOpenTeacherDashboard && (
            <button
              onClick={onOpenTeacherDashboard}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-all shadow-2xs shrink-0"
              title="فتح لوحة التحكم الخاصة بالأستاذ (إدارة الدروس والامتحانات والدرجات)"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>لوحة تحكم الأستاذ ⚙️</span>
            </button>
          )}

          {/* TEACHER MODE: Exit Teacher Mode */}
          {isTeacher && onLogoutTeacher && (
            <button
              onClick={onLogoutTeacher}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer font-arabic transition-all shrink-0"
              title="تسجيل الخروج من وضع الأستاذ"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          )}

          {/* STUDENT MODE: Show student name */}
          {!isTeacher && studentName && (
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-2.5 py-1.5 rounded-xl text-xs text-slate-700 font-arabic shrink-0">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{studentName} ({studentSection})</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
