import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  ChevronDown,
  Check,
  RotateCcw,
  BookMarked,
  Layers,
  Info,
  CheckSquare,
  Square,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { CURRICULUM_UNITS, ExamUnit } from '../../../data/curriculumStructure';

interface ExamSourceCascaderProps {
  selectedUnitId: string;
  onSelectUnit: (unit: ExamUnit) => void;
  selectedLessonIds: string[];
  onToggleLesson: (lessonId: string) => void;
  onSelectAllLessons: (lessonIds: string[]) => void;
  onClearLessons: () => void;
  isGrammarActive: boolean;
  onToggleGrammarActive: () => void;
  selectedGrammarTopicIds: string[];
  onToggleGrammarTopic: (topicId: string) => void;
  onSelectAllGrammarTopics: (topicIds: string[]) => void;
  onClearGrammarTopics: () => void;
  onResetSelection: () => void;
}

export const ExamSourceCascader: React.FC<ExamSourceCascaderProps> = ({
  selectedUnitId,
  onSelectUnit,
  selectedLessonIds,
  onToggleLesson,
  onSelectAllLessons,
  onClearLessons,
  isGrammarActive,
  onToggleGrammarActive,
  selectedGrammarTopicIds,
  onToggleGrammarTopic,
  onSelectAllGrammarTopics,
  onClearGrammarTopics,
  onResetSelection,
}) => {
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isGrammarPanelOpen, setIsGrammarPanelOpen] = useState(false);
  const unitDropdownRef = useRef<HTMLDivElement>(null);

  const currentUnit =
    CURRICULUM_UNITS.find((u) => u.id === selectedUnitId) || CURRICULUM_UNITS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        unitDropdownRef.current &&
        !unitDropdownRef.current.contains(e.target as Node)
      ) {
        setIsUnitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsUnitDropdownOpen(false);
        setIsGrammarPanelOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalLessonsInUnit = currentUnit.lessons.length;
  const selectedLessonsCount = selectedLessonIds.filter((id) =>
    currentUnit.lessons.some((l) => l.id === id)
  ).length;

  const totalGrammarTopicsInUnit = currentUnit.grammarTopics.length;
  const selectedGrammarCount = selectedGrammarTopicIds.filter((id) =>
    currentUnit.grammarTopics.some((t) => t.id === id)
  ).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-5 text-right font-arabic">
      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700 shrink-0" />
            <span>تحديد محتوى الامتحان (الوحدة • الدروس • القواعد)</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            اختر الوحدة أولاً، ثم حدد الدروس ومواضيع القواعد المطلوبة خطوة بخطوة:
          </p>
        </div>

        {/* Reset Selection Button */}
        <button
          type="button"
          onClick={onResetSelection}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer transition-colors self-start sm:self-auto"
          title="إعادة ضبط الاختيارات للوضع الافتراضي"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. UNIT SELECTOR (Dropdown - Single Button) */}
      {/* ======================================================== */}
      <div className="space-y-2 relative" ref={unitDropdownRef}>
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-600" />
          <span>الوحدة الدراسية (Unit):</span>
        </label>

        {/* Single Unit Trigger Button */}
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
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                currentUnit.hasQuestions
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {currentUnit.hasQuestions ? 'الأسئلة جاهزة' : 'قيد الإضافة'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                isUnitDropdownOpen ? 'rotate-180 text-slate-900' : ''
              }`}
            />
          </div>
        </button>

        {/* Units Dropdown Menu */}
        {isUnitDropdownOpen && (
          <div className="absolute top-full right-0 left-0 mt-1.5 z-40 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 max-h-72 overflow-y-auto">
            <div className="p-1.5 space-y-1">
              {CURRICULUM_UNITS.map((unit) => {
                const isSelected = unit.id === currentUnit.id;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => {
                      onSelectUnit(unit);
                      setIsUnitDropdownOpen(false);
                      setIsGrammarPanelOpen(false);
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
                            : unit.hasQuestions
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {unit.hasQuestions ? 'متاح' : '10 دروس'}
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

      {/* ======================================================== */}
      {/* 2. LESSONS SELECTOR (Only for selected unit) */}
      {/* ======================================================== */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span>
                دروس {currentUnit.titleAr} ({selectedLessonsCount} من {totalLessonsInUnit} محددة):
              </span>
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              اختر درساً واحداً أو عدة دروس لتوليد أسئلة الامتحان منها:
            </p>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onSelectAllLessons(currentUnit.lessons.map((l) => l.id))}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
            >
              اختيار الكل
            </button>
            <button
              type="button"
              onClick={onClearLessons}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer transition-colors"
            >
              مسح
            </button>
          </div>
        </div>

        {/* Empty State for Lessons */}
        {currentUnit.lessons.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0" />
            <span>لا توجد دروس مدخلة لهذه الوحدة بعد.</span>
          </div>
        ) : (
          /* Lessons Compact List (Checkboxes - Mobile First, no crowded cards) */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1">
            {currentUnit.lessons.map((lesson) => {
              const isChecked = selectedLessonIds.includes(lesson.id);
              return (
                <label
                  key={lesson.id}
                  onClick={() => onToggleLesson(lesson.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-right cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                        isChecked
                          ? 'bg-white text-slate-900'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {lesson.lessonNumber}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block truncate">
                        {lesson.titleAr}
                      </span>
                      {lesson.subtitleAr && (
                        <span
                          className={`text-[10px] block truncate ${
                            isChecked ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        >
                          {lesson.subtitleAr}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="shrink-0 mr-2">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 3. GRAMMAR SELECTOR BUTTON & PANEL */}
      {/* ======================================================== */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onToggleGrammarActive();
              setIsGrammarPanelOpen((prev) => !prev);
            }}
            className={`px-4 py-2.5 rounded-xl border font-bold text-xs cursor-pointer transition-all flex items-center gap-2 ${
              isGrammarActive
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>قواعد {currentUnit.titleAr}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                isGrammarActive
                  ? 'bg-white/20 text-white font-bold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isGrammarActive
                ? `${selectedGrammarCount} موضوع محدد`
                : 'مغلقة (انقر للتضمين)'}
            </span>
          </button>

          {isGrammarActive && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onSelectAllGrammarTopics(
                    currentUnit.grammarTopics.map((t) => t.id)
                  )
                }
                className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                تحديد كل القواعد
              </button>
              <button
                type="button"
                onClick={onClearGrammarTopics}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                مسح
              </button>
            </div>
          )}
        </div>

        {/* Grammar Topics Panel */}
        {isGrammarActive && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
                <span>اختر مواضيع القواعد النحوية المطلوبة في الامتحان:</span>
              </span>
              <span className="text-slate-500 text-[11px]">
                {selectedGrammarCount} من {totalGrammarTopicsInUnit}
              </span>
            </div>

            {currentUnit.grammarTopics.length === 0 ? (
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>لا توجد مواضيع قواعد مسجلة لهذه الوحدة بعد.</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {currentUnit.grammarTopics.map((topic) => {
                  const isTopicSelected = selectedGrammarTopicIds.includes(
                    topic.id
                  );
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => onToggleGrammarTopic(topic.id)}
                      className={`px-3 py-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2 ${
                        isTopicSelected
                          ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                          isTopicSelected
                            ? 'border-white bg-white text-slate-900 font-bold'
                            : 'border-slate-300'
                        }`}
                      >
                        {isTopicSelected ? '✓' : ''}
                      </span>
                      <span>{topic.titleAr}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 4. SELECTION SUMMARY BAR */}
      {/* ======================================================== */}
      <div className="p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-normal">الملخص الحالي:</span>
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-bold border border-slate-700">
            {currentUnit.titleAr.split(':')[0]}
          </span>
          <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-bold border border-slate-700">
            {selectedLessonsCount} دروس محددة
          </span>
          {isGrammarActive && (
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-bold border border-slate-700">
              {selectedGrammarCount} قواعد محددة
            </span>
          )}
        </div>

        {!currentUnit.hasQuestions && (
          <span className="text-amber-300 text-[11px] font-bold flex items-center gap-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>بنك أسئلة هذه الوحدة قيد الإعداد</span>
          </span>
        )}
      </div>
    </div>
  );
};
