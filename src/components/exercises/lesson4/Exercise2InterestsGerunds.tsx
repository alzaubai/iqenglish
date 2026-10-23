import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, BookOpen, AlertTriangle } from 'lucide-react';
import { lesson4ActivityData, NotCorrectItem } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise2InterestsGerundsProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise2InterestsGerunds: React.FC<Exercise2InterestsGerundsProps> = ({ onProgressUpdate }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showGrammarCard, setShowGrammarCard] = useState(true);

  const items = lesson4ActivityData.page10Ex2NotCorrect;
  const grammar = lesson4ActivityData.page10GrammarBox;

  const handleSelect = (itemId: string, optIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: optIndex }));
  };

  const isItemCorrect = (item: NotCorrectItem) => {
    const selectedIdx = selectedOptions[item.id];
    if (selectedIdx === undefined) return false;
    // The student must tick the option that is NOT grammatically correct (isCorrectGrammar === false)
    return item.options[selectedIdx]?.isCorrectGrammar === false;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isItemCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setSelectedOptions({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, number> = {};
    items.forEach((it) => {
      const wrongIdx = it.options.findIndex((opt) => opt.isCorrectGrammar === false);
      if (wrongIdx !== -1) {
        model[it.id] = wrongIdx;
      }
    });
    setSelectedOptions(model);
    setIsChecked(true);
  };

  return (
    <div className="space-y-5" dir="ltr">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
              Activity Book • Pages 10 & 11 • Exercise 2
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
              Tick (✓) the option that is NOT correct.
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowGrammarCard(!showGrammarCard)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer font-arabic"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showGrammarCard ? 'إخفاء صندوق القاعدة' : 'عرض قاعدة الاهتمامات'}</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
          انتبه للمطلوب الوزاري الدقيق: ضع علامة (✓) على الخيار <strong>غير الصحيح قواعدياً</strong> في كل جملة من الجمل الأربع:
        </p>
      </div>

      {/* Grammar Rule Card (AB p. 10) */}
      {showGrammarCard && (
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-zinc-50 rounded-2xl border border-indigo-200/80 p-5 shadow-sm space-y-4 text-right" dir="rtl">
          <div className="flex items-center gap-2 border-b border-indigo-100 pb-2.5">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center font-sans">
              ℹ️
            </span>
            <h5 className="font-bold text-sm text-zinc-900 font-arabic">
              {grammar.titleAr} ({grammar.titleEn})
            </h5>
          </div>

          <p className="text-xs text-zinc-700 leading-relaxed font-arabic">
            {grammar.ruleAr}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-arabic">
            <div className="bg-white p-3 rounded-xl border border-indigo-200 space-y-1.5">
              <span className="font-bold text-indigo-900 block text-xs">
                {grammar.case1Title}
              </span>
              <ul className="text-zinc-600 space-y-1 text-[11px] list-disc list-inside">
                {grammar.case1Examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-1.5">
              <span className="font-bold text-emerald-900 block text-xs">
                {grammar.case2Title}
              </span>
              <ul className="text-zinc-600 space-y-1 text-[11px] list-disc list-inside">
                {grammar.case2Examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold font-arabic">
            {grammar.warningAr}
          </div>
        </div>
      )}

      {/* The 4 Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const selectedIdx = selectedOptions[item.id];
          const correct = isItemCorrect(item);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-rose-300 bg-rose-50/40'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-black flex items-center justify-center font-sans uppercase">
                    {item.letter}
                  </span>
                  <span className="text-sm font-black text-zinc-900 font-sans">
                    {item.promptEn}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 font-arabic">
                  {item.promptAr}
                </span>
              </div>

              {/* Options Checkboxes */}
              <div className="space-y-2">
                {item.options.map((opt, optIdx) => {
                  const isChosen = selectedIdx === optIdx;
                  const isThisWrongGrammar = opt.isCorrectGrammar === false;

                  return (
                    <button
                      key={opt.text}
                      type="button"
                      onClick={() => handleSelect(item.id, optIdx)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 font-sans ${
                        isChosen
                          ? isChecked
                            ? isThisWrongGrammar
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-black shrink-0 ${
                          isChosen
                            ? 'bg-white text-zinc-900 border-white'
                            : 'border-zinc-300 bg-white text-transparent'
                        }`}>
                          ✓
                        </span>
                        <span className="truncate">{opt.text}</span>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded font-arabic shrink-0 ${
                        isChosen ? 'bg-white/20 text-white' : 'bg-zinc-200/80 text-zinc-600'
                      }`} dir="rtl">
                        {opt.type === 'bare_infinitive' ? 'فعل مجرد' : opt.type === 'gerund' ? 'Gerund' : 'اسم'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isChecked && (
                <div className={`p-2.5 rounded-lg text-xs font-arabic text-right space-y-1 ${
                  correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/70 text-rose-900'
                }`} dir="rtl">
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>إجابة صحيحة! أحسنت باختيار الخيار غير الصحيح.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>تأشير خاطئ! تذكر أن المطلوب تأشير الخيار غير الصحيح نحواً.</span>
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

      {/* Footer Buttons */}
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
          onClick={solveAll}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
        >
          عرض الحل النموذجي
        </button>
      </div>
    </div>
  );
};
