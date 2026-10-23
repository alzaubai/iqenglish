import React, { useState } from 'react';
import { lesson5ActivityData, FrequencyAdverbRule } from '../../../data/activityBookLesson5Data';
import { CheckCircle2, XCircle, RotateCcw, Volume2, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExerciseBRulePosition: React.FC = () => {
  const { titleEn, titleAr, descriptionAr, rules } = lesson5ActivityData.page12RuleB;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelect = (ruleId: string, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [ruleId]: option }));
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const allCorrect = rules.every((r) => selectedAnswers[r.id] === r.correctAnswer);
    if (allCorrect) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = rules.filter((r) => selectedAnswers[r.id] === r.correctAnswer).length;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Exercise Header */}
      <div className="bg-linear-to-r from-purple-700 via-indigo-700 to-indigo-800 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-purple-600/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-purple-950 text-xs font-black">
                  كتاب النشاط ص 12
                </span>
                <span className="text-purple-200 text-xs font-mono">Rule B: Position</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-arabic mt-1">{titleAr}</h2>
              <p className="text-xs sm:text-sm text-purple-100 font-sans">{titleEn}</p>
            </div>
          </div>

          <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold font-arabic">
            {answeredCount} / {rules.length} مكتمل
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-purple-100/90 font-arabic leading-relaxed">
          {descriptionAr}
        </p>
      </div>

      {/* Visual Rule Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rule 1 Summary Card */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 text-right space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold font-arabic">
              القاعدة 1: مع فعل (be)
            </span>
            <span className="text-xs font-black text-emerald-800 font-mono">AFTER be</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
            يأتي ظرف التكرار <strong className="text-emerald-900 underline">بعد</strong> أفعال الكينونة (am / is / are).
          </p>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between font-mono text-xs sm:text-sm">
            <span className="text-zinc-800">
              We <strong className="text-rose-600">are</strong> <span className="text-purple-600 font-bold">never</span> at home.
            </span>
            <button
              onClick={() => playTTS('We are never at home.')}
              className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
              title="استمع للنطق"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rule 2 Summary Card */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 sm:p-5 text-right space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold font-arabic">
              القاعدة 2: مع بقية الأفعال
            </span>
            <span className="text-xs font-black text-blue-800 font-mono">BEFORE main verb</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
            يأتي ظرف التكرار <strong className="text-blue-900 underline">بين الفاعل والفعل</strong> (قبل الفعل الرئيسي).
          </p>
          <div className="bg-white p-3 rounded-xl border border-blue-100 flex items-center justify-between font-mono text-xs sm:text-sm">
            <span className="text-zinc-800">
              My father <span className="text-purple-600 font-bold">always</span> <strong className="text-indigo-600">has</strong> a rest.
            </span>
            <button
              onClick={() => playTTS('My father always has a rest after lunch.')}
              className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
              title="استمع للنطق"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Rules Questions */}
      <div className="space-y-4">
        {rules.map((rule, idx) => {
          const selected = selectedAnswers[rule.id];
          const isCorrect = selected === rule.correctAnswer;

          return (
            <div
              key={rule.id}
              className={`p-5 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-2xs'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base font-arabic">
                    {rule.ruleTitleAr}
                  </h3>
                </div>

                {isSubmitted && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600" />
                    )}
                  </span>
                )}
              </div>

              {/* Prompt En & Ar */}
              <div className="mt-3 bg-zinc-50 p-3 rounded-xl border border-zinc-100 space-y-1 text-left" dir="ltr">
                <p className="font-mono text-sm sm:text-base font-medium text-zinc-900">
                  {rule.promptEn}
                </p>
                <p className="font-arabic text-xs sm:text-sm text-zinc-600 text-right" dir="rtl">
                  {rule.promptAr}
                </p>
              </div>

              {/* Options */}
              <div className="mt-4 flex flex-wrap gap-2.5" dir="ltr">
                {rule.options.map((opt) => {
                  const isSelected = selected === opt;
                  let optStyle = 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200';

                  if (isSelected && !isSubmitted) {
                    optStyle = 'bg-purple-600 text-white border-purple-700 shadow-sm';
                  } else if (isSubmitted) {
                    if (opt === rule.correctAnswer) {
                      optStyle = 'bg-emerald-600 text-white border-emerald-700 shadow-xs font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-600 text-white border-rose-700';
                    } else {
                      optStyle = 'bg-zinc-100 text-zinc-400 border-zinc-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(rule.id, opt)}
                      disabled={isSubmitted}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono border transition-all cursor-pointer ${optStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Example on Submit */}
              {isSubmitted && (
                <div className="mt-4 pt-3 border-t border-zinc-200/80 space-y-2 text-right">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 font-arabic">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{rule.explanationAr}</span>
                  </div>

                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 flex items-center justify-between text-xs sm:text-sm font-mono text-purple-900" dir="ltr">
                    <span>
                      <strong>e.g.</strong> {rule.exampleSentenceEn}
                    </span>
                    <button
                      onClick={() => playTTS(rule.exampleSentenceEn)}
                      className="p-1 rounded-lg bg-purple-200/80 hover:bg-purple-300 text-purple-900 transition-colors"
                      title="استمع للمثال"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Controls & Results */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            disabled={answeredCount < rules.length}
            className={`px-6 py-3 rounded-xl font-bold font-arabic text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
              answeredCount === rules.length
                ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md active:scale-98'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            تحقق من الإجابات ({answeredCount}/{rules.length})
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-purple-50 text-purple-900 px-4 py-2.5 rounded-xl border border-purple-200 font-bold font-arabic text-sm">
              النتيجة: {correctCount} من {rules.length} صحيحة
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold font-arabic text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
