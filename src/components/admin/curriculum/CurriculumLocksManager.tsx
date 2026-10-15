import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  ChevronDown,
  Check,
  Lock,
  Unlock,
  Sliders,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { CURRICULUM_UNITS, ExamUnit } from '../../../data/curriculumStructure';

interface CurriculumLocksManagerProps {
  unlockedLessonIds: string[];
  onToggleLesson: (lessonId: string) => void;
  onUnlockUnitLessons: (unitLessonIds: string[]) => void;
  onLockUnitLessons: (unitLessonIds: string[]) => void;
  unlockedGrammarTopicIds: string[];
  onToggleGrammarTopic: (topicId: string) => void;
  onUnlockUnitGrammar: (unitTopicIds: string[]) => void;
  onLockUnitGrammar: (unitTopicIds: string[]) => void;
}

export const CurriculumLocksManager: React.FC<CurriculumLocksManagerProps> = ({
  unlockedLessonIds,
  onToggleLesson,
  onUnlockUnitLessons,
  onLockUnitLessons,
  unlockedGrammarTopicIds,
  onToggleGrammarTopic,
  onUnlockUnitGrammar,
  onLockUnitGrammar,
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUnit: ExamUnit =
    CURRICULUM_UNITS.find((u) => u.id === selectedUnitId) || CURRICULUM_UNITS[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUnitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsUnitDropdownOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculations for current unit
  const currentUnitLessonIds = currentUnit.lessons.map((l) => l.id);
  const unlockedLessonsCount = currentUnitLessonIds.filter((id) =>
    unlockedLessonIds.includes(id)
  ).length;

  const currentUnitGrammarIds = currentUnit.grammarTopics.map((t) => t.id);
  const unlockedGrammarCount = currentUnitGrammarIds.filter((id) =>
    unlockedGrammarTopicIds.includes(id)
  ).length;

  return (
    <div className="space-y-6 text-right font-arabic">
      {/* 1. Header & Unit Cascading Dropdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-5 h-5 text-slate-700" />
            <span>التحكم بقفل وفتح المنهاج (الوحدات • الدروس • القواعد)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            اختر الوحدة الدراسية أولاً، ثم افتح أو اقفل الدروس ومواضيع القواعد تدريجياً حسب تقدمك في الدوام لمنع الطلاب من استباق الدروس:
          </p>
        </div>

        {/* Unit Selector Dropdown */}
        <div className="space-y-2 relative" ref={dropdownRef}>
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>اختر الوحدة الدراسية لتعديل قفل دروسها:</span>
          </label>

          <button
            type="button"
            onClick={() => setIsUnitDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 border-slate-300 hover:border-slate-800 bg-slate-50/50 hover:bg-white text-slate-900 text-right cursor-pointer transition-all shadow-xs focus:outline-none focus:border-slate-800"
            aria-haspopup="listbox"
            aria-expanded={isUnitDropdownOpen}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                U{currentUnit.unitNumber}
              </span>
              <div className="min-w-0 text-right">
                <span className="text-xs sm:text-sm font-bold block truncate text-slate-900">
                  {currentUnit.titleAr}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {currentUnit.titleEn}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 mr-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {unlockedLessonsCount} من {currentUnit.lessons.length} مفتوحة
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                  isUnitDropdownOpen ? 'rotate-180 text-slate-900' : ''
                }`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isUnitDropdownOpen && (
            <div className="absolute top-full right-0 left-0 mt-1.5 z-40 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 max-h-72 overflow-y-auto">
              <div className="p-1.5 space-y-1">
                {CURRICULUM_UNITS.map((unit) => {
                  const isSelected = unit.id === currentUnit.id;
                  const unitUnlocked = unit.lessons
                    .map((l) => l.id)
                    .filter((id) => unlockedLessonIds.includes(id)).length;

                  return (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => {
                        setSelectedUnitId(unit.id);
                        setIsUnitDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-right cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-slate-900 text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {unit.unitNumber}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm block truncate">
                            {unit.titleAr}
                          </span>
                          <span
                            className={`text-[10px] block truncate ${
                              isSelected ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            {unit.titleEn}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 mr-2">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {unitUnlocked} دروس مفتوحة
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. SECTION: Lessons Locking for Selected Unit */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-700 shrink-0" />
              <span>
                دروس {currentUnit.titleAr} ({unlockedLessonsCount} من {currentUnit.lessons.length} مفتوحة)
              </span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              انقر على أيقونة القفل لفتح أو قفل الدرس للطلاب فوراً:
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onUnlockUnitLessons(currentUnitLessonIds)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
            >
              فتح جميع دروس الوحدة
            </button>
            <button
              type="button"
              onClick={() => onLockUnitLessons(currentUnitLessonIds)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer transition-colors"
            >
              قفل جميع دروس الوحدة
            </button>
          </div>
        </div>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {currentUnit.lessons.map((lesson) => {
            const isUnlocked = unlockedLessonIds.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                  isUnlocked
                    ? 'bg-white border-slate-200 shadow-2xs'
                    : 'bg-slate-50/70 border-dashed border-slate-300 opacity-75'
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[11px] font-mono font-bold text-slate-400 block">
                    Lesson {lesson.lessonNumber}
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {lesson.titleAr}
                  </h5>
                  {lesson.subtitleAr && (
                    <span className="text-[10px] text-slate-500 block truncate">
                      {lesson.subtitleAr}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onToggleLesson(lesson.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-colors shrink-0 ${
                    isUnlocked
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
                  }`}
                  title={isUnlocked ? 'قفل هذا الدرس' : 'فتح هذا الدرس'}
                >
                  {isUnlocked ? (
                    <Unlock className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SECTION: Grammar Topics Locking for Selected Unit */}
      <div className="space-y-4 pt-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-700 shrink-0" />
              <span>
                مواضيع قواعد {currentUnit.titleAr} ({unlockedGrammarCount} من {currentUnit.grammarTopics.length} مفتوحة)
              </span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              تحكم بظهور مواضيع القواعد في تبويب القواعد للطلاب:
            </p>
          </div>

          {currentUnit.grammarTopics.length > 0 && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => onUnlockUnitGrammar(currentUnitGrammarIds)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
              >
                فتح جميع قواعد الوحدة
              </button>
              <button
                type="button"
                onClick={() => onLockUnitGrammar(currentUnitGrammarIds)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer transition-colors"
              >
                قفل جميع قواعد الوحدة
              </button>
            </div>
          )}
        </div>

        {/* Grammar Topics Grid */}
        {currentUnit.grammarTopics.length === 0 ? (
          <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0" />
            <span>لا توجد مواضيع قواعد مسجلة لهذه الوحدة حالياً.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentUnit.grammarTopics.map((topic, idx) => {
              const isUnlocked = unlockedGrammarTopicIds.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                    isUnlocked
                      ? 'bg-white border-slate-200 shadow-2xs'
                      : 'bg-slate-50/70 border-dashed border-slate-300 opacity-75'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[11px] font-mono font-bold text-slate-400 block">
                      Topic 0{idx + 1}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      {topic.titleAr}
                    </h5>
                    {topic.titleEn && (
                      <span className="text-[10px] text-slate-500 block truncate" dir="ltr">
                        {topic.titleEn}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleGrammarTopic(topic.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-colors shrink-0 ${
                      isUnlocked
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
                    }`}
                    title={isUnlocked ? 'قفل هذا الموضوع القواعدي' : 'فتح هذا الموضوع القواعدي'}
                  >
                    {isUnlocked ? (
                      <Unlock className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
