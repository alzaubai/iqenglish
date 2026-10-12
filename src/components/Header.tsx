import React, { useState } from 'react';
import { BookOpen, BookMarked, ShieldCheck, Award, User, LogOut, Menu, X, Sparkles } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200" dir="rtl">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Right side: Mobile Hamburger Button + Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          {/* Mobile 3-Lines Hamburger Button on top right */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="sm:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer transition-colors shrink-0 flex items-center justify-center border border-slate-200"
            title="القائمة الرئيسية"
            aria-label="القائمة الرئيسية"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs font-sans shrink-0">
            E1
          </div>
          <div className="min-w-0">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-slate-800 block leading-tight font-sans">
              English for Iraq
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-arabic block leading-tight truncate">
              الصف الأول المتوسط • إشراف أ. حسام محمود منصور
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
              <span>لوحة تحكم الأستاذ</span>
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

      {/* Mobile Drawer / Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {/* User Profile Card in Menu */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-arabic">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                {isTeacher ? 'أ' : 'ط'}
              </div>
              <div>
                <span className="font-bold text-slate-800 block">
                  {isTeacher ? 'أ. حسام محمود منصور' : studentName || 'طالب مسجل'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isTeacher ? 'مدرس المادة • لوحة المعلم' : studentSection ? `شعبة ${studentSection}` : 'الصف الأول المتوسط'}
                </span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white border border-slate-200 text-slate-600">
              {isTeacher ? 'وضع المعلم' : 'طالب'}
            </span>
          </div>

          {/* Quick Actions List */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onTabChange('curriculum');
                setIsMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold font-arabic flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'curriculum'
                  ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>الدروس المقررة</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onTabChange('grammar');
                setIsMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold font-arabic flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'grammar'
                  ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>شروحات القواعد</span>
            </button>
          </div>

          {/* Teacher Dashboard Action (if Teacher) */}
          {isTeacher && onOpenTeacherDashboard && (
            <button
              type="button"
              onClick={() => {
                onOpenTeacherDashboard();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-arabic flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>فتح لوحة تحكم الأستاذ (الإدارة والدرجات)</span>
            </button>
          )}

          {/* Student Grades History (if Student) */}
          {!isTeacher && onOpenStudentGradesHistory && (
            <button
              type="button"
              onClick={() => {
                onOpenStudentGradesHistory();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold font-arabic flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>سجل درجاتي وامتحاناتي اليومية</span>
            </button>
          )}

          {/* Active Exam Action (if active) */}
          {isExamActive && onOpenExam && (
            <button
              type="button"
              onClick={() => {
                onOpenExam();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-arabic flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs animate-pulse"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>دخول الامتحان السريع المباشر الآن</span>
            </button>
          )}

          {/* Logout Action */}
          {isTeacher && onLogoutTeacher && (
            <button
              type="button"
              onClick={() => {
                onLogoutTeacher();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold font-arabic flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج من وضع الأستاذ</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
