import React, { useState } from 'react';
import { BookOpen, BookMarked, ShieldCheck, Award, User, LogOut, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curriculum' | 'grammar' | 'grades';
  onTabChange: (tab: 'curriculum' | 'grammar' | 'grades') => void;
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
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200" dir="rtl">
        <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Right side: Brand & Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs font-sans shrink-0">
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
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Navigation Tabs (Hidden on mobile - moved to Bottom Bar) */}
            <nav className="hidden sm:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
              <button
                onClick={() => onTabChange('curriculum')}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer font-arabic ${
                  activeTab === 'curriculum'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-slate-600 shrink-0" />
                <span>الدروس</span>
              </button>
              <button
                onClick={() => onTabChange('grammar')}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer font-arabic relative ${
                  activeTab === 'grammar'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookMarked className="w-4 h-4 text-slate-300 shrink-0" />
                <span>القواعد</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
                  activeTab === 'grammar'
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  جديد
                </span>
              </button>
              {!isTeacher && studentName && (
                <button
                  onClick={() => onTabChange('grades')}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer font-arabic ${
                    activeTab === 'grades'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>درجاتي</span>
                </button>
              )}
            </nav>

            {/* Quick Exam Alert Button (Desktop) */}
            {isExamActive && onOpenExam && !isTeacher && (
              <button
                onClick={onOpenExam}
                className="hidden sm:flex px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs items-center gap-1.5 font-arabic shadow-2xs cursor-pointer transition-all shrink-0 animate-pulse"
                title="امتحان سريع متاح الآن!"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>امتحان سريع</span>
              </button>
            )}

            {/* TEACHER MODE: Desktop Dashboard Button */}
            {isTeacher && onOpenTeacherDashboard && (
              <button
                onClick={onOpenTeacherDashboard}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-all shadow-2xs shrink-0"
                title="فتح لوحة التحكم الخاصة بالأستاذ"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">لوحة تحكم الأستاذ</span>
                <span className="sm:hidden">الإدارة</span>
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

            {/* STUDENT MODE: Show student name badge (Clean on both mobile & desktop) */}
            {!isTeacher && studentName && (
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-xl text-xs text-slate-700 font-arabic shrink-0">
                <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="font-bold truncate max-w-[110px] sm:max-w-none">
                  {studentName} {studentSection ? `(${studentSection})` : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modern Bottom Navigation Bar (Mobile Only - Thumb-friendly, clean & no clutter) */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around"
        dir="rtl"
        aria-label="شريط التنقل السفلي"
      >
        {/* Tab 1: Curriculum / Lessons */}
        <button
          type="button"
          onClick={() => onTabChange('curriculum')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer font-arabic ${
            activeTab === 'curriculum'
              ? 'text-slate-900 font-bold bg-slate-100'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className={`w-5 h-5 transition-transform ${activeTab === 'curriculum' ? 'scale-110' : ''}`} />
          <span className="text-[11px] mt-0.5 leading-tight">الدروس</span>
        </button>

        {/* Tab 2: Grammar Topics */}
        <button
          type="button"
          onClick={() => onTabChange('grammar')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer font-arabic relative ${
            activeTab === 'grammar'
              ? 'text-slate-900 font-bold bg-slate-100'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <BookMarked className={`w-5 h-5 transition-transform ${activeTab === 'grammar' ? 'scale-110' : ''}`} />
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-slate-800" />
          </div>
          <span className="text-[11px] mt-0.5 leading-tight">القواعد</span>
        </button>

        {/* Tab 3: Student Grades */}
        {!isTeacher && (
          <button
            type="button"
            onClick={() => onTabChange('grades')}
            className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer font-arabic ${
              activeTab === 'grades'
                ? 'text-slate-900 font-bold bg-slate-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className={`w-5 h-5 transition-transform ${activeTab === 'grades' ? 'scale-110 text-amber-500' : 'text-slate-500'}`} />
            <span className="text-[11px] mt-0.5 leading-tight">درجاتي</span>
          </button>
        )}

        {isTeacher && onOpenTeacherDashboard && (
          <button
            type="button"
            onClick={onOpenTeacherDashboard}
            className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-slate-700 hover:text-slate-900 transition-all cursor-pointer font-arabic"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-[11px] mt-0.5 leading-tight">اللوحة</span>
          </button>
        )}

        {/* Conditional Tab 4: Quick Exam (If Active) */}
        {isExamActive && onOpenExam && !isTeacher && (
          <button
            type="button"
            onClick={onOpenExam}
            className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-rose-600 font-bold transition-all cursor-pointer font-arabic animate-pulse"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-[11px] mt-0.5 leading-tight">امتحان!</span>
          </button>
        )}
      </nav>
    </>
  );
};
