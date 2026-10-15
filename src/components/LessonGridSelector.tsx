import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { LessonData } from '../types/curriculum';

interface LessonGridSelectorProps {
  lessons: LessonData[];
  selectedLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  onBackToUnits: () => void;
  unlockedLessonIds?: string[];
}

export const LessonGridSelector: React.FC<LessonGridSelectorProps> = ({
  lessons,
  selectedLessonId,
  onSelectLesson,
  onBackToUnits,
  unlockedLessonIds,
}) => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToUnits}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 flex items-center justify-center cursor-pointer transition-all border border-zinc-200/80 shadow-2xs shrink-0"
            title="العودة لقائمة الوحدات"
            aria-label="العودة لقائمة الوحدات"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-1.5">
              <span>{lessons[0]?.unitNumber === 2 ? 'الوحدة الثانية' : 'الوحدة الأولى'}</span>
              <span dir="ltr" className="inline-block text-sm sm:text-base font-bold text-zinc-600 font-sans">
                {lessons[0]?.unitNumber === 2 ? '(Unit 2)' : '(Unit 1)'}
              </span>
              <span>: قائمة الدروس</span>
            </h2>
            <p className="text-xs text-zinc-500 font-arabic mt-0.5">
              إعداد وإشراف مدرس المادة: أ. حسام محمود منصور
            </p>
          </div>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-700 font-arabic shrink-0 self-start sm:self-auto">
          10 دروس تفاعلية
        </div>
      </div>

      {/* 10 Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {lessons.map((lesson) => {
          const isSelected = selectedLessonId === lesson.id;
          const isUnlocked =
            Array.isArray(unlockedLessonIds) && unlockedLessonIds.length > 0
              ? unlockedLessonIds.includes(lesson.id)
              : lesson.id === 'lesson-1';

          return (
            <button
              key={lesson.id}
              onClick={() => {
                if (isUnlocked) {
                  onSelectLesson(lesson.id);
                }
              }}
              className={`group p-3.5 sm:p-4 rounded-2xl border text-right transition-all flex flex-col justify-between bg-white relative overflow-hidden ${
                !isUnlocked
                  ? 'opacity-75 cursor-not-allowed border-zinc-200'
                  : isSelected
                  ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/20 cursor-pointer'
                  : 'border-zinc-200 hover:border-zinc-300 hover:shadow-md cursor-pointer'
              }`}
            >
              {/* Lock Overlay if Locked by Teacher */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-zinc-950/45 backdrop-blur-[1.5px] rounded-2xl flex flex-col items-center justify-center text-white z-10 p-3 select-none text-center">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900/90 text-amber-400 flex items-center justify-center mb-1.5 shadow-md">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold font-arabic bg-zinc-900/90 px-2.5 py-1 rounded-lg">
                    مغلق من قبل مدرس المادة: أ. حسام محمود منصور
                  </span>
                </div>
              )}
              <div>
                {/* صورة غلاف الدرس */}
                {lesson.imageUrl ? (
                  <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-3 bg-zinc-100 border border-zinc-100 relative">
                    <img
                      src={lesson.imageUrl}
                      alt={lesson.titleAr}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs font-arabic">
                      الدرس {lesson.lessonNumber}
                    </div>
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-zinc-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-xs" dir="ltr">
                      Lesson {lesson.lessonNumber}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-200 text-zinc-800'
                      }`}
                    >
                      الدرس {lesson.lessonNumber}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-sans">
                      Lesson {lesson.lessonNumber}
                    </span>
                  </div>
                )}

                <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic group-hover:text-indigo-600 transition-colors">
                  {lesson.titleAr}
                </h3>
                <p className="text-xs text-zinc-500 font-sans mt-0.5 line-clamp-1" dir="ltr">
                  {lesson.titleEn}
                </p>
                {lesson.subtitleAr && (
                  <p className="text-xs text-zinc-600 font-arabic mt-1 line-clamp-1">
                    {lesson.subtitleAr}
                  </p>
                )}
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-500 font-arabic">
                  {lesson.lessonNumber <= 2
                    ? 'كتاب النشاط ص 4-7'
                    : `كتاب النشاط ص ${lesson.lessonNumber * 2}`}
                </span>
                <span className="text-indigo-600 font-arabic group-hover:translate-x-[-3px] transition-transform flex items-center gap-1">
                  <span>فتح الدرس</span>
                  <span>←</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
