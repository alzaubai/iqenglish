import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Languages, Info } from 'lucide-react';
import { lesson3ActivityData, ActionTypeItem } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface ExerciseBActionTypesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const ACTION_OPTIONS = [
  {
    type: 'a',
    labelEn: 'a completed past action',
    labelAr: 'حدث ماضٍ مكتمل ومحدد',
    descEn: 'An action that started and finished at a definite time in the past.',
    descAr: 'حدث بدأ وانتهى في وقت محدد بالماضي (Past Simple).',
  },
  {
    type: 'b',
    labelEn: 'general background',
    labelAr: 'خلفية عامة مستمرة للحدث',
    descEn: 'Describes what was already happening around the main events.',
    descAr: 'يصف ما كان يحدث ويستمر في خلفية المشهد (Past Continuous).',
  },
  {
    type: 'c',
    labelEn: 'interrupted action',
    labelAr: 'حدث قاطعه حدث آخر مفاجئ',
    descEn: 'A continuous action that was stopped or interrupted by a shorter action.',
    descAr: 'حدث كان مستمراً ثم قطعه فجأة حدث قصير ومفاجئ.',
  },
] as const;

export const ExerciseBActionTypes: React.FC<ExerciseBActionTypesProps> = ({ onProgressUpdate }) => {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const items = lesson3ActivityData.page8ExBActionTypes;

  const toggleTranslation = (id: string) => {
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (itemId: string, type: string) => {
    setSelectedTypes((prev) => ({ ...prev, [itemId]: type }));
  };

  const checkAnswers = () => {
    setIsChecked(true);
    const allCorrect = items.every((it) => selectedTypes[it.id] === it.correctType);
    if (allCorrect) {
      confetti({ particleCount: 40, spread: 60 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setSelectedTypes({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    items.forEach((it) => {
      model[it.id] = it.correctType;
    });
    setSelectedTypes(model);
    setIsChecked(true);
  };

  return (
    <div className="space-y-5" dir="ltr">
      {/* Header matching Student's Book Page 6 Ex B */}
      <div className="bg-white rounded-2xl border border-sky-200/80 p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-100 text-sky-800 border border-sky-300 font-arabic">
                📘 كتاب الطالب (Student's Book)
              </span>
              <span className="text-xs font-bold text-zinc-500 font-sans">
                Page 6 • Exercise B
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
              Match the highlighted verbs to the type of action.
            </h4>
          </div>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed relative z-10" dir="rtl">
          طابق الأفعال المظللة في الجمل مع نوع الحدث الزمني المناسب (حدث ماضٍ مكتمل، خلفية عامة مستمرة، حدث قاطعه حدث آخر):
        </p>
      </div>

      {/* Action Types Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ACTION_OPTIONS.map((opt) => (
          <div
            key={opt.type}
            className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1.5 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-zinc-900 text-white text-xs font-black flex items-center justify-center font-sans uppercase">
                {opt.type}
              </span>
              <span className="font-bold text-xs text-zinc-900 font-sans">
                {opt.labelEn}
              </span>
            </div>
            <p className="text-[11px] font-bold text-zinc-700 font-arabic text-right" dir="rtl">
              {opt.labelAr}
            </p>
            <p className="text-[11px] text-zinc-500 font-sans">
              {opt.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Sentence Cards */}
      <div className="space-y-3.5">
        {items.map((item) => {
          const selected = selectedTypes[item.id];
          const isCorrect = selected === item.correctType;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 transition-all space-y-3 text-left ${
                isChecked
                  ? isCorrect
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-rose-300 bg-rose-50/40'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-800 text-xs font-black flex items-center justify-center font-sans">
                    {item.number}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
                    {item.sentenceEn}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTranslation(item.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border font-arabic flex items-center gap-1 transition-all cursor-pointer ${
                    showTranslations[item.id]
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{showTranslations[item.id] ? 'إخفاء الترجمة' : 'ترجمة الجملة'}</span>
                </button>
              </div>

              {showTranslations[item.id] && (
                <div className="text-xs text-zinc-700 font-arabic bg-zinc-50 p-2.5 rounded-lg text-right" dir="rtl">
                  {item.sentenceAr}
                </div>
              )}

              {/* Selection Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block font-sans">
                  Select Action Type:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ACTION_OPTIONS.map((opt) => {
                    const isBtnSelected = selected === opt.type;
                    return (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => handleSelect(item.id, opt.type)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 font-sans ${
                          isBtnSelected
                            ? isChecked
                              ? isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded text-[11px] font-black flex items-center justify-center uppercase shrink-0 ${
                          isBtnSelected ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'
                        }`}>
                          {opt.type}
                        </span>
                        <span className="truncate">{opt.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback and Explanation */}
              {isChecked && (
                <div className={`p-3 rounded-lg text-xs font-arabic text-right space-y-1 ${
                  isCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'
                }`} dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>إجابة صحيحة! نوع الحدث: ({item.correctType}) - {item.correctTypeLabelAr}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>الإجابة النموذجية: ({item.correctType}) - {item.correctTypeLabelAr}</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-700 leading-relaxed pr-5">
                    {item.explanationAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAnswers}
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
          onClick={solveAll}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
        >
          عرض الحل النموذجي
        </button>
      </div>
    </div>
  );
};
