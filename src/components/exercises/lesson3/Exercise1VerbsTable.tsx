import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, HelpCircle, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { lesson3ActivityData, VerbItem } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise1VerbsTableProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise1VerbsTable: React.FC<Exercise1VerbsTableProps> = ({ onProgressUpdate }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showRules, setShowRules] = useState(true);

  const verbs = lesson3ActivityData.page8Ex1Verbs;
  const col1Verbs = verbs.filter((v) => v.column === 1);
  const col2Verbs = verbs.filter((v) => v.column === 2);
  const col3Verbs = verbs.filter((v) => v.column === 3);

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isVerbCorrect = (v: VerbItem) => {
    const val = (answers[v.id] || '').trim().toLowerCase();
    if (v.id === 'v-be') {
      return val === 'was' || val === 'were' || val === 'was / were' || val === 'was/were';
    }
    return val === v.past.toLowerCase();
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = verbs.every(isVerbCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const fillModelAnswers = () => {
    const model: Record<string, string> = {};
    verbs.forEach((v) => {
      model[v.id] = v.past;
    });
    setAnswers(model);
    setIsChecked(true);
  };

  const renderColumn = (colTitleEn: string, colTitleAr: string, colNum: 1 | 2 | 3, items: VerbItem[], badgeColor: string) => (
    <div className="flex-1 min-w-[260px] bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <div className={`p-3 border-b ${badgeColor} text-center space-y-0.5`}>
        <div className="text-xs font-black uppercase tracking-wider text-zinc-900 font-sans">
          Column {colNum}: {colTitleEn}
        </div>
        <div className="text-xs font-bold text-zinc-700 font-arabic">
          {colTitleAr}
        </div>
      </div>

      <div className="p-3 space-y-2.5 flex-1">
        <div className="grid grid-cols-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-2 pb-1 border-b border-zinc-100">
          <span>Infinitive (المجرد)</span>
          <span>Past Simple (الماضي)</span>
        </div>

        {items.map((verb) => {
          const val = answers[verb.id] || '';
          const correct = isVerbCorrect(verb);
          return (
            <div
              key={verb.id}
              className={`p-2 rounded-lg border transition-all space-y-1 ${
                isChecked
                  ? correct
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-rose-300 bg-rose-50/50'
                  : 'border-zinc-200 bg-zinc-50/40 hover:border-zinc-300'
              }`}
            >
              <div className="grid grid-cols-2 items-center gap-2">
                <div>
                  <span className="font-bold text-sm text-zinc-900 block font-sans">
                    {verb.infinitive}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-arabic">
                    {verb.infinitiveAr}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleInputChange(verb.id, e.target.value)}
                    placeholder={verb.id === 'v-be' ? 'was / were' : 'Past form...'}
                    className={`w-full px-2.5 py-1.5 text-xs font-bold font-sans rounded-md border text-center transition-all outline-none ${
                      isChecked
                        ? correct
                          ? 'border-emerald-500 bg-emerald-100/60 text-emerald-900'
                          : 'border-rose-400 bg-rose-100/60 text-rose-900'
                        : 'border-zinc-300 bg-white focus:border-zinc-900 text-zinc-900'
                    }`}
                  />
                  {isChecked && (
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                      {correct ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isChecked && !correct && (
                <div className="text-[11px] text-rose-700 font-semibold font-sans pt-1 border-t border-rose-200/60 flex items-center justify-between">
                  <span>الجواب الصحيح: <strong className="font-bold underline">{verb.past}</strong></span>
                  {verb.hint && <span className="text-[10px] text-zinc-600">({verb.hint})</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
              Activity Book • Page 8 • Exercises 1, 2 & 3
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
              Complete the table with the past simple forms.
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowRules(!showRules)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer font-arabic"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>{showRules ? 'إخفاء الشرح والقواعد' : 'عرض شرح الأعمدة الثلاثة'}</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
          أكمل الجدول بكتابة صيغة الماضي البسيط لكل فعل في العمود المناسب (الأفعال القياسية، الأفعال الشاذة المتغيرة، والأفعال الشاذة الثابتة):
        </p>
      </div>

      {/* 3 Columns Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderColumn('Regular (-ed)', 'أفعال قياسية يُضاف لها ed', 1, col1Verbs, 'bg-emerald-50 border-emerald-200')}
        {renderColumn('Irregular (Changed)', 'أفعال شاذة يتغير شكلها', 2, col2Verbs, 'bg-amber-50 border-amber-200')}
        {renderColumn('Irregular (No change)', 'أفعال شاذة تبقى كما هي', 3, col3Verbs, 'bg-indigo-50 border-indigo-200')}
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAll}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm font-arabic shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>فحص الإجابات</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>
        </div>

        <button
          type="button"
          onClick={fillModelAnswers}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
        >
          عرض الحل النموذجي الكامل
        </button>
      </div>

      {/* Rule and Explanations Card (Exercises 2 & 3) */}
      {showRules && (
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-zinc-50 rounded-2xl border border-amber-200/80 p-5 shadow-sm space-y-4 text-right" dir="rtl">
          <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2.5">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h5 className="font-bold text-sm text-zinc-900 font-arabic">
              {lesson3ActivityData.page8Ex2Rules.titleAr}
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs font-arabic">
            <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 space-y-1.5">
              <span className="font-bold text-emerald-800 block text-xs">
                {lesson3ActivityData.page8Ex2Rules.col1Title}
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {lesson3ActivityData.page8Ex2Rules.col1Rule}
              </p>
              <div className="pt-1 text-[11px] text-zinc-500">
                <strong>أمثلة إضافية:</strong> {lesson3ActivityData.page8Ex2Rules.col1Examples.join(' • ')}
              </div>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-amber-200 space-y-1.5">
              <span className="font-bold text-amber-800 block text-xs">
                {lesson3ActivityData.page8Ex2Rules.col2Title}
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {lesson3ActivityData.page8Ex2Rules.col2Rule}
              </p>
              <div className="pt-1 text-[11px] text-zinc-500">
                <strong>أمثلة إضافية:</strong> {lesson3ActivityData.page8Ex2Rules.col2Examples.join(' • ')}
              </div>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-indigo-200 space-y-1.5">
              <span className="font-bold text-indigo-800 block text-xs">
                {lesson3ActivityData.page8Ex2Rules.col3Title}
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {lesson3ActivityData.page8Ex2Rules.col3Rule}
              </p>
              <div className="pt-1 text-[11px] text-zinc-500">
                <strong>أمثلة إضافية:</strong> {lesson3ActivityData.page8Ex2Rules.col3Examples.join(' • ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
