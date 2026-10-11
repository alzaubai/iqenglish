import React from 'react';
import { BookOpen, BookMarked } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curriculum' | 'grammar';
  onTabChange: (tab: 'curriculum' | 'grammar') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-sm font-sans">
            E1
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 block leading-tight font-sans">
              English for Iraq
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-500 font-arabic block leading-tight">
              الصف الأول المتوسط • المنهاج التفاعلي
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 bg-zinc-100 rounded-xl border border-zinc-200/80">
          <button
            onClick={() => onTabChange('curriculum')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer font-arabic ${
              activeTab === 'curriculum'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-zinc-700" />
            <span>الدروس والتمارين</span>
          </button>
          <button
            onClick={() => onTabChange('grammar')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer font-arabic relative ${
              activeTab === 'grammar'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <BookMarked className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" />
            <span>القواعد والشروحات</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
              activeTab === 'grammar'
                ? 'bg-amber-400 text-zinc-950'
                : 'bg-zinc-200 text-zinc-800'
            }`}>
              جديد
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
