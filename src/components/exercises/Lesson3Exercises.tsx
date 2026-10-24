import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, Layers, Sparkles } from 'lucide-react';
import { ExerciseASBQuestions } from './lesson3/ExerciseASBQuestions';
import { ExerciseBActionTypes } from './lesson3/ExerciseBActionTypes';
import { Exercise1VerbsTable } from './lesson3/Exercise1VerbsTable';
import { Exercise4Wordsearch } from './lesson3/Exercise4Wordsearch';
import { Exercise5RichardStory } from './lesson3/Exercise5RichardStory';
import { Exercise7Adjectives } from './lesson3/Exercise7Adjectives';

interface Lesson3ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

export type Lesson3Step = 'sb-a' | 'sb-b' | 'ab-1' | 'ab-4' | 'ab-5' | 'ab-6-7';

interface ExerciseTabMeta {
  id: Lesson3Step;
  bookCategory: 'student_book' | 'activity_book';
  bookLabelAr: string;
  pageLabel: string;
  exerciseLabel: string;
  titleAr: string;
}

const TABS: ExerciseTabMeta[] = [
  {
    id: 'sb-a',
    bookCategory: 'student_book',
    bookLabelAr: 'كتاب الطالب الملون',
    pageLabel: 'ص 6',
    exerciseLabel: 'تمرين A',
    titleAr: 'أسئلة قصة مريم وخالد',
  },
  {
    id: 'sb-b',
    bookCategory: 'student_book',
    bookLabelAr: 'كتاب الطالب الملون',
    pageLabel: 'ص 6',
    exerciseLabel: 'تمرين B',
    titleAr: 'أنواع الأحداث الزمنية',
  },
  {
    id: 'ab-1',
    bookCategory: 'activity_book',
    bookLabelAr: 'كتاب النشاط (الكراس)',
    pageLabel: 'ص 8',
    exerciseLabel: 'تمرين 1',
    titleAr: 'جدول تصريف الأفعال',
  },
  {
    id: 'ab-4',
    bookCategory: 'activity_book',
    bookLabelAr: 'كتاب النشاط (الكراس)',
    pageLabel: 'ص 8',
    exerciseLabel: 'تمرين 4',
    titleAr: 'شبكة الكلمات الـ 12',
  },
  {
    id: 'ab-5',
    bookCategory: 'activity_book',
    bookLabelAr: 'كتاب النشاط (الكراس)',
    pageLabel: 'ص 9',
    exerciseLabel: 'تمرين 5',
    titleAr: 'قصة ريتشارد ببغداد',
  },
  {
    id: 'ab-6-7',
    bookCategory: 'activity_book',
    bookLabelAr: 'كتاب النشاط (الكراس)',
    pageLabel: 'ص 9',
    exerciseLabel: 'تمرين 6 و 7',
    titleAr: 'الصفات السبع وإسقاط الجمل',
  },
];

export const Lesson3Exercises: React.FC<Lesson3ExercisesProps> = ({ onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState<Lesson3Step>('sb-a');
  const [filterCategory, setFilterCategory] = useState<'all' | 'student_book' | 'activity_book'>('all');

  const currentIndex = TABS.findIndex((t) => t.id === currentStep);

  const goToNext = () => {
    if (currentIndex < TABS.length - 1) {
      setCurrentStep(TABS[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentStep(TABS[currentIndex - 1].id);
    }
  };

  const filteredTabs = filterCategory === 'all' 
    ? TABS 
    : TABS.filter((t) => t.bookCategory === filterCategory);

  return (
    <div className="space-y-6">
      {/* Textbook Alignment Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3" dir="rtl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center font-black text-xs">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm sm:text-base font-arabic text-amber-300">
              تمارين الدرس الثالث (مطابقة 100% لكتاب الطالب وكتاب النشاط)
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-arabic">
            <span className="text-zinc-400">التصفية السريعة:</span>
            <div className="inline-flex rounded-xl bg-zinc-800 p-0.5 border border-zinc-700">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-amber-400 text-zinc-950 shadow-xs'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                الكل (6)
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('student_book')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'student_book'
                    ? 'bg-sky-400 text-zinc-950 shadow-xs'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                📘 كتاب الطالب (2)
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('activity_book')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'activity_book'
                    ? 'bg-amber-400 text-zinc-950 shadow-xs'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                📓 كتاب النشاط (4)
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-arabic">
          مرتبة بالترتيب الوزاري المعتمد: ابدأ أولاً بأسئلة كتاب الطالب (ص 6)، ثم انتقل لتمارين كتاب النشاط (ص 8 وص 9). اضغط على أي تمرين للبدء بحله مباشرة:
        </p>
      </div>

      {/* Exercise Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" dir="rtl">
        {filteredTabs.map((tab) => {
          const isActive = currentStep === tab.id;
          const isSB = tab.bookCategory === 'student_book';

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentStep(tab.id)}
              className={`p-3 rounded-2xl border text-right transition-all cursor-pointer font-arabic flex flex-col justify-between gap-2 relative overflow-hidden ${
                isActive
                  ? isSB
                    ? 'bg-sky-900 text-white border-sky-600 shadow-md ring-2 ring-sky-400/30'
                    : 'bg-zinc-900 text-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : isSB
                    ? 'bg-sky-50/70 hover:bg-sky-100/70 border-sky-200 text-zinc-800'
                    : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/20'
                      : isSB
                        ? 'bg-sky-100 text-sky-800 border-sky-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}
                >
                  {tab.pageLabel}
                </span>
                <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-amber-300' : 'text-zinc-500'}`}>
                  {tab.exerciseLabel}
                </span>
              </div>

              <div>
                <div className={`text-[10px] font-bold block ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {tab.bookLabelAr}
                </div>
                <div className="text-xs font-black line-clamp-1 leading-snug pt-0.5">
                  {tab.titleAr}
                </div>
              </div>

              {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${isSB ? 'bg-sky-400' : 'bg-amber-400'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Exercise Content (State Preserved via hidden blocks) */}
      <div className="transition-all duration-150">
        <div className={currentStep === 'sb-a' ? 'block animate-in fade-in duration-150' : 'hidden'}>
          <ExerciseASBQuestions onProgressUpdate={onProgressUpdate} />
        </div>

        <div className={currentStep === 'sb-b' ? 'block animate-in fade-in duration-150' : 'hidden'}>
          <ExerciseBActionTypes onProgressUpdate={onProgressUpdate} />
        </div>

        <div className={currentStep === 'ab-1' ? 'block animate-in fade-in duration-150' : 'hidden'}>
          <Exercise1VerbsTable onProgressUpdate={onProgressUpdate} />
        </div>

        <div className={currentStep === 'ab-4' ? 'block animate-in fade-in duration-150' : 'hidden'}>
          <Exercise4Wordsearch onProgressUpdate={onProgressUpdate} />
        </div>

        <div className={currentStep === 'ab-5' ? 'block animate-in fade-in duration-150' : 'hidden'}>
          <Exercise5RichardStory onProgressUpdate={onProgressUpdate} />
        </div>

        <div className={currentStep === 'ab-6-7' ? 'block animate-in fade-in duration-150' : 'hidden'}>
          <Exercise7Adjectives onProgressUpdate={onProgressUpdate} />
        </div>
      </div>

      {/* Bottom Step-by-Step Navigation Bar */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-3 sm:p-4 shadow-sm flex items-center justify-between gap-2" dir="rtl">
        <button
          type="button"
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic flex items-center gap-1.5 transition-all cursor-pointer ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400 border border-zinc-200'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>التمرين السابق</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-bold text-zinc-500 font-arabic block">
            التمرين {currentIndex + 1} من أصل {TABS.length}
          </span>
          <span className="text-[11px] font-black text-zinc-900 font-arabic">
            {TABS[currentIndex].pageLabel} - {TABS[currentIndex].exerciseLabel}: {TABS[currentIndex].titleAr}
          </span>
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={currentIndex === TABS.length - 1}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic flex items-center gap-1.5 transition-all cursor-pointer ${
            currentIndex === TABS.length - 1
              ? 'opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400 border border-zinc-200'
              : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs'
          }`}
        >
          <span>التمرين التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
