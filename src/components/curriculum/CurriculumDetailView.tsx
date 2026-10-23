import React from 'react';
import {
  Volume2,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { LessonData } from '../../types/curriculum';
import {
  getUnitLabelAr,
  getUnitExercises,
} from '../../modules/curriculum/curriculumRegistry';
import { AudioTranscriptPlayer } from '../AudioTranscriptPlayer';
import { HolidayActivitiesShowcase } from '../HolidayActivitiesShowcase';
import { IraqLandmarksShowcase } from '../IraqLandmarksShowcase';
import { Unit1LessonShowcase } from '../showcases/Unit1LessonShowcase';
import { FourSeasonsShowcase } from '../FourSeasonsShowcase';
import { Lesson1Exercises } from '../exercises/Lesson1Exercises';
import { Lesson2Exercises } from '../exercises/Lesson2Exercises';
import { GenericLessonExercises } from '../exercises/GenericLessonExercises';

interface CurriculumDetailViewProps {
  selectedUnitId: string;
  selectedLessonId: string;
  activeUnitLessons: LessonData[];
  canUserAccessLesson: (lessonId: string) => boolean;
  onBackToLessons: () => void;
  onPrevLesson: () => void;
  onNextLesson: () => void;
}

export const CurriculumDetailView: React.FC<CurriculumDetailViewProps> = ({
  selectedUnitId,
  selectedLessonId,
  activeUnitLessons,
  canUserAccessLesson,
  onBackToLessons,
  onPrevLesson,
  onNextLesson,
}) => {
  const isCurrentLessonUnlocked = canUserAccessLesson(selectedLessonId);
  const currentLessonIndex = activeUnitLessons.findIndex((l) => l.id === selectedLessonId);
  const currentLesson =
    activeUnitLessons.find((l) => l.id === selectedLessonId) || activeUnitLessons[0];

  const prevLesson = currentLessonIndex > 0 ? activeUnitLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < activeUnitLessons.length - 1 ? activeUnitLessons[currentLessonIndex + 1] : null;
  const isPrevUnlocked = prevLesson ? canUserAccessLesson(prevLesson.id) : false;
  const isNextUnlocked = nextLesson ? canUserAccessLesson(nextLesson.id) : false;

  const currentExercises =
    selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 1
      ? [{ pageNumber: 3 }]
      : selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 2
      ? [{ pageNumber: 4 }]
      : getUnitExercises(selectedUnitId, currentLesson.lessonNumber);

  if (!isCurrentLessonUnlocked) {
    return (
      <div className="space-y-6 sm:space-y-7" dir="rtl">
        <div className="flex items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLessons}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 flex items-center justify-center cursor-pointer transition-all border border-zinc-200/80 shadow-2xs"
              title="العودة لقائمة الدروس"
              aria-label="العودة لقائمة الدروس"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
            <span className="text-xs sm:text-sm font-bold text-zinc-700 font-arabic">
              {getUnitLabelAr(selectedUnitId)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-xs text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 font-arabic">
            هذا الدرس مغلق حالياً
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
            تم قفل هذا الدرس من قبل مدرس المادة
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToLessons}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-arabic cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لقائمة الدروس المتاحة</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Top Navigation Bar: Back to 10 lessons */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLessons}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 flex items-center justify-center cursor-pointer transition-all border border-zinc-200/80 shadow-2xs"
            title="العودة لقائمة الدروس"
            aria-label="العودة لقائمة الدروس"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>
          <span className="text-xs sm:text-sm font-bold text-zinc-700 font-arabic">
            {getUnitLabelAr(selectedUnitId)}
          </span>
        </div>

        {/* Quick switcher buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={onPrevLesson}
            disabled={currentLesson.lessonNumber === 1 || !isPrevUnlocked}
            className={`p-2 rounded-lg border text-xs font-bold transition-all ${
              currentLesson.lessonNumber === 1 || !isPrevUnlocked
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title={
              currentLesson.lessonNumber === 1
                ? 'الدرس الأول'
                : !isPrevUnlocked
                ? 'الدرس السابق مغلق'
                : 'الدرس السابق'
            }
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold px-2 py-1 bg-zinc-100 text-zinc-800 rounded font-arabic">
            الدرس {currentLesson.lessonNumber} من 10
          </span>
          <button
            onClick={onNextLesson}
            disabled={currentLesson.lessonNumber === 10 || !isNextUnlocked}
            className={`p-2 rounded-lg border text-xs font-bold transition-all ${
              currentLesson.lessonNumber === 10 || !isNextUnlocked
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title={
              currentLesson.lessonNumber === 10
                ? 'الدرس الأخير'
                : !isNextUnlocked
                ? 'الدرس التالي مغلق'
                : 'الدرس التالي'
            }
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Lesson Header Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-right">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1">
          {currentLesson.imageUrl && (
            <div className="w-full sm:w-44 md:w-48 h-36 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 bg-zinc-50 shadow-2xs relative">
              <img
                src={currentLesson.imageUrl}
                alt={currentLesson.titleAr}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono inline-block">
                UNIT {currentLesson.unitNumber} • LESSON {currentLesson.lessonNumber}
              </span>
              {currentLesson.transcripts[0]?.bookReference && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-arabic inline-flex items-center gap-1">
                  📖 {currentLesson.transcripts[0].bookReference.replace("Student's Book", "كتاب الطالب").replace('pp.', 'ص').replace('p.', 'ص')}
                </span>
              )}
              {currentExercises && currentExercises.length > 0 && currentExercises[0]?.pageNumber && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-arabic inline-flex items-center gap-1">
                  ✍️ كتاب النشاط: ص {currentExercises[0].pageNumber}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 mt-1 font-arabic">
              {currentLesson.titleAr.includes('(') ? (
                (() => {
                  const match = currentLesson.titleAr.match(/^(.*?)\s*(\([^)]+\))\s*$/);
                  if (match) {
                    return (
                      <span className="flex flex-wrap items-baseline gap-1.5">
                        <span>{match[1]}</span>
                        <span dir="ltr" className="inline-block text-xl text-zinc-700 font-sans font-bold">
                          {match[2]}
                        </span>
                      </span>
                    );
                  }
                  return currentLesson.titleAr;
                })()
              ) : (
                currentLesson.titleAr
              )}
            </h2>
            <p className="text-sm text-zinc-500 font-sans" dir="ltr">
              {currentLesson.titleEn}
            </p>
            {currentLesson.subtitleAr && (
              <p className="text-xs text-zinc-600 font-arabic pt-0.5">
                {currentLesson.subtitleAr}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: Listening and Reading Text with Audio Player */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1 text-right">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-1.5">
            <span>1. الاستماع والقراءة التفاعلية</span>
            <span dir="ltr" className="inline-block text-xs font-semibold text-zinc-500 font-sans">
              (Listening &amp; Reading)
            </span>
          </h3>
        </div>

        {selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 1 && (
          <HolidayActivitiesShowcase />
        )}

        {selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 2 && (
          <IraqLandmarksShowcase />
        )}

        {selectedUnitId === 'unit-1' && currentLesson.lessonNumber >= 3 && (
          <Unit1LessonShowcase lessonNumber={currentLesson.lessonNumber} />
        )}

        {selectedUnitId === 'unit-2' && currentLesson.lessonNumber === 1 && (
          <FourSeasonsShowcase />
        )}

        <AudioTranscriptPlayer
          transcripts={currentLesson.transcripts}
          lessonTitle={currentLesson.titleEn}
        />
      </section>

      {/* SECTION 2: Activity Book Exercises */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1 text-right">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 font-arabic flex flex-wrap items-baseline gap-1.5">
            <span>2. تمارين كتاب النشاط التفاعلية</span>
            <span dir="ltr" className="inline-block text-xs font-semibold text-zinc-500 font-sans">
              (Activity Book Exercises)
            </span>
          </h3>
        </div>

        {selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 1 ? (
          <Lesson1Exercises onProgressUpdate={() => {}} />
        ) : selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 2 ? (
          <Lesson2Exercises onProgressUpdate={() => {}} />
        ) : (
          <GenericLessonExercises
            exercises={getUnitExercises(selectedUnitId, currentLesson.lessonNumber)}
            onProgressUpdate={() => {}}
          />
        )}
      </section>

      {/* Bottom Lesson Navigation */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        <button
          onClick={onPrevLesson}
          disabled={currentLesson.lessonNumber === 1 || !isPrevUnlocked}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all font-arabic ${
            currentLesson.lessonNumber === 1 || !isPrevUnlocked
              ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>الدرس السابق</span>
        </button>

        <button
          onClick={onBackToLessons}
          className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline font-arabic text-center order-last sm:order-none w-full sm:w-auto mt-1 sm:mt-0"
        >
          قائمة دروس {getUnitLabelAr(selectedUnitId)}
        </button>

        <button
          onClick={onNextLesson}
          disabled={currentLesson.lessonNumber === 10 || !isNextUnlocked}
          className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all font-arabic ${
            currentLesson.lessonNumber === 10 || !isNextUnlocked
              ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
          }`}
        >
          <span>الدرس التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
