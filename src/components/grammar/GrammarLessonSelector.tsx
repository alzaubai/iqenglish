import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { GrammarUnit } from '../../types/grammar';

interface GrammarLessonSelectorProps {
  unit: GrammarUnit;
  selectedLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  onBackToUnits: () => void;
}

export const GrammarLessonSelector: React.FC<GrammarLessonSelectorProps> = ({
  unit,
  selectedLessonId,
  onSelectLesson,
  onBackToUnits,
}) => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToUnits}
            className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لقائمة الوحدات</span>
          </button>
          <span className="text-zinc-300">/</span>
          <span className="text-xs font-bold text-zinc-700 font-arabic">
            قواعد {unit.titleAr}
          </span>
        </div>
        <div className="text-xs font-bold text-zinc-600 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg font-arabic self-start sm:self-auto">
          المنهاج العراقي • 1st Intermediate
        </div>
      </div>

      {/* Unit Overview Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs text-right">
        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono">
          UNIT {unit.unitNumber} GRAMMAR
        </span>
        <h2 className="text-2xl font-black text-zinc-900 mt-2.5 font-arabic">
          دروس قواعد {unit.titleAr}
        </h2>
        <p className="text-sm text-zinc-600 mt-1.5 font-arabic leading-relaxed">
          {unit.descriptionAr}
        </p>
      </div>

      {/* 10 Lessons Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-right">
          <h3 className="text-sm font-bold text-zinc-700 font-arabic flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-zinc-900" />
            <span>اختر الدرس للاطلاع على القواعد:</span>
          </h3>
          <span className="text-xs text-zinc-500 font-arabic">10 دروس</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unit.lessons.map((lesson) => {
            const isAvailable = lesson.lessonNumber === 1 || lesson.lessonNumber === 2;
            const isSelected = selectedLessonId === lesson.id;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  if (isAvailable) {
                    onSelectLesson(lesson.id);
                  }
                }}
                className={`rounded-2xl border p-5 transition-all text-right flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-zinc-900 bg-zinc-50/90 border-zinc-900 shadow-md'
                    : isAvailable
                    ? 'bg-white border-zinc-200 hover:border-zinc-800 hover:shadow-md cursor-pointer group'
                    : 'bg-zinc-50/60 border-zinc-200/80 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono">
                      LESSON {lesson.lessonNumber}
                    </span>
                    {isAvailable ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-arabic">
                        <CheckCircle className="w-3 h-3" />
                        <span>شرح مفصل ومكتمل</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full font-arabic">
                        <Clock className="w-3 h-3" />
                        <span>قيد الإعداد</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic group-hover:text-zinc-950">
                    {lesson.titleAr}
                  </h4>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5" dir="ltr">
                    {lesson.titleEn}
                  </p>
                  <p className="text-xs text-zinc-600 font-arabic mt-2.5 leading-relaxed">
                    {lesson.subtitleAr}
                  </p>

                  {/* Highlights tag */}
                  {isAvailable && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {lesson.lessonNumber === 1 && (
                        <>
                          <span className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md font-arabic">
                            الماضي البسيط
                          </span>
                          <span className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md font-arabic">
                            الأفعال الشاذة والقياسية
                          </span>
                          <span className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md font-arabic">
                            النفي والسؤال
                          </span>
                        </>
                      )}
                      {lesson.lessonNumber === 2 && (
                        <>
                          <span className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md font-arabic">
                            Was / Were
                          </span>
                          <span className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md font-arabic">
                            صفات -ed و -ing
                          </span>
                          <span className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md font-arabic">
                            أدوات الربط (so / then)
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400 font-arabic">
                    {isAvailable ? 'شرح + جدول أفعال + كويز' : 'الدرس غير متاح حالياً'}
                  </span>
                  {isAvailable ? (
                    <button className="text-xs font-bold text-zinc-900 group-hover:underline flex items-center gap-1 font-arabic cursor-pointer">
                      <span>فتح القواعد</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  ) : (
                    <span className="text-xs text-zinc-400 font-arabic">قريباً</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
