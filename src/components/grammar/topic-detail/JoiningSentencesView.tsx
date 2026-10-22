import React, { useState } from 'react';
import { Volume2, Languages, RotateCcw, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface JoiningSentencesViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const JoiningSentencesView: React.FC<JoiningSentencesViewProps> = ({
  currentTopic,
  onSpeak,
}) => {
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setPracticeAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
    if (isCorrect) {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
    }
  };

  const handleResetPractice = () => {
    setPracticeAnswers({});
    setRevealedAnswers({});
  };

  // مساعد لسمة كل أداة ربط لتمييزها بصرياً
  const getConnectorTheme = (name: string) => {
    const lower = name.toLowerCase().trim();
    if (lower === 'and') {
      return {
        badgeBg: 'bg-emerald-600',
        cardBg: 'bg-emerald-50/50',
        cardBorder: 'border-emerald-200/90',
        pillBg: 'bg-emerald-100 text-emerald-900',
        ringColor: 'ring-emerald-200',
        formula: ['فكرة أولى مثبتة', '+', 'and', '+', 'فكرة ثانية متوافقة'],
        formulaHighlight: 'and',
        categoryAr: 'إضافة وترابط (Addition)',
      };
    }
    if (lower === 'but') {
      return {
        badgeBg: 'bg-rose-600',
        cardBg: 'bg-rose-50/50',
        cardBorder: 'border-rose-200/90',
        pillBg: 'bg-rose-100 text-rose-900',
        ringColor: 'ring-rose-200',
        formula: ['جملة أولى', '+', ', but', '+', 'جملة مناقضة أو معاكسة'],
        formulaHighlight: ', but',
        categoryAr: 'تناقض واختلاف (Contrast)',
      };
    }
    // or
    return {
      badgeBg: 'bg-purple-600',
      cardBg: 'bg-purple-50/50',
      cardBorder: 'border-purple-200/90',
      pillBg: 'bg-purple-100 text-purple-900',
      ringColor: 'ring-purple-200',
      formula: ['خيار أول', '+', 'or', '+', 'خيار ثانٍ بديل'],
      formulaHighlight: 'or',
      categoryAr: 'تخيير وبدائل (Choice)',
    };
  };

  return (
    <div className="space-y-6">
      {/* 1. بطاقات أدوات الربط الثلاثة بتمايز لوني رائع */}
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-700 font-arabic block">
              أدوات الربط الثلاثة المقررة في منهاج الصف الأول متوسط
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              الفرق الجوهري بين and و but و or في ربط الجمل
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-zinc-100 text-zinc-700 rounded-xl border border-zinc-200 self-start sm:self-auto"
            dir="ltr"
          >
            {'{ and, but, or }'}
          </span>
        </div>

        {/* الكروت الثلاثة المتمايزة */}
        <div className="space-y-5">
          {currentTopic.connectorsList?.map((conn, idx) => {
            const theme = getConnectorTheme(conn.name);

            return (
              <div
                key={idx}
                className={`p-5 sm:p-6 ${theme.cardBg} border ${theme.cardBorder} rounded-2xl space-y-4 shadow-xs`}
              >
                {/* الرأس: شارة الأداة + تصنيفها + معناها العربي */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3.5 py-1.5 rounded-xl ${theme.badgeBg} text-white font-mono font-black text-sm shadow-2xs ring-2 ${theme.ringColor}`}
                      dir="ltr"
                    >
                      {conn.name}
                    </span>
                    <span className="text-xs font-bold text-zinc-600 font-arabic">
                      {theme.categoryAr}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${theme.pillBg} px-3 py-1 rounded-xl font-arabic border border-zinc-200/60 shadow-2xs`}>
                    المعنى: {conn.meaningAr}
                  </span>
                </div>

                {/* كبسولات معادلة الأداة */}
                <div
                  className="flex flex-wrap items-center justify-center gap-1.5 py-2 px-3 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono text-xs"
                  dir="ltr"
                >
                  {theme.formula.map((token, tIdx) => (
                    <span
                      key={tIdx}
                      className={
                        token === theme.formulaHighlight
                          ? `${theme.badgeBg} text-white px-3 py-1 rounded-lg font-mono font-black shadow-xs ring-2 ${theme.ringColor}`
                          : token === '+'
                          ? 'text-zinc-400 font-bold px-1'
                          : 'bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded-lg border border-zinc-200 font-arabic font-bold'
                      }
                    >
                      {token}
                    </span>
                  ))}
                </div>

                {/* شرح وظيفة الأداة */}
                <p className="text-xs sm:text-sm text-zinc-800 font-arabic leading-relaxed font-medium">
                  {conn.functionAr}
                </p>

                {/* تنبيه خاص بالفارزة لـ but */}
                {conn.name.toLowerCase().trim() === 'but' && (
                  <div className="p-3 bg-white rounded-xl border border-rose-200 flex items-start gap-2 shadow-2xs text-right">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-950 font-arabic leading-relaxed">
                      <strong>ملاحظة وزارية حاسمة:</strong> نضع دائماً فارزة (<span className="font-mono font-black">,</span>) مباشرة قبل كلمة <span className="font-mono font-bold">but</span> عند ربط جملتين كاملتين (مثل: <span className="font-mono text-zinc-800" dir="ltr">I like tea, but I don't like coffee.</span>).
                    </p>
                  </div>
                )}

                {/* أمثلة الأداة المنهجية */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-zinc-700 font-arabic block">
                    أمثلة كتاب الطالب والنشاط:
                  </span>
                  {conn.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-3 bg-white border border-zinc-200/90 rounded-xl flex items-center justify-between shadow-2xs"
                    >
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans text-left" dir="ltr">
                          {ex.en}
                        </p>
                        <p className="text-xs text-zinc-600 font-arabic mt-0.5 text-right" dir="rtl">
                          {ex.ar}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSpeak(ex.en)}
                        className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shadow-2xs shrink-0"
                        title="استمع للمثال"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. التمارين الامتحانية الشهرية على أدوات الربط */}
      {currentTopic.examPractice && currentTopic.examPractice.length > 0 && (
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-700 font-arabic block">
                اختبار تفاعلي ذاتي للطالب
              </span>
              <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                تمارين امتحانية شهرية على أدوات الربط (and / but / or)
              </h4>
            </div>
            <button
              type="button"
              onClick={handleResetPractice}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic shadow-2xs self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التمرين</span>
            </button>
          </div>

          <div className="space-y-4">
            {currentTopic.examPractice.map((q, idx) => {
              const isRevealed = revealedAnswers[q.id];
              const selected = practiceAnswers[q.id];
              const isCorrect = selected === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isRevealed
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50 shadow-xs'
                        : 'border-rose-300 bg-rose-50/50 shadow-xs'
                      : 'border-zinc-200/90 bg-white shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center font-mono shadow-2xs">
                      {idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {q.questionAr && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                            visibleTranslations[q.id]
                              ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-2xs'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                          title="ترجمة السؤال"
                        >
                          <Languages className="w-3 h-3 text-amber-600" />
                          <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onSpeak(q.questionEn)}
                        className="p-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 cursor-pointer shadow-2xs"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h5
                    className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight mb-2 text-left"
                    dir="ltr"
                  >
                    {q.questionEn}
                  </h5>

                  {q.questionAr && visibleTranslations[q.id] && (
                    <p className="text-xs text-zinc-600 font-arabic mb-3 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/80 animate-in fade-in duration-150 text-right" dir="rtl">
                      {q.questionAr}
                    </p>
                  )}

                  {q.options && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" dir="ltr">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === opt;
                        let btnClass = 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800';
                        if (isRevealed) {
                          if (opt === q.correctAnswer) {
                            btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs';
                          } else if (isChosen && !isCorrect) {
                            btnClass = 'bg-rose-500 text-white border-rose-500 font-bold shadow-xs';
                          } else {
                            btnClass = 'bg-zinc-50 text-zinc-400 border-zinc-200 opacity-60';
                          }
                        } else if (isChosen) {
                          btnClass = 'bg-amber-600 text-white border-amber-600 shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, opt, opt === q.correctAnswer)}
                            className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isRevealed && (
                    <div className="mt-3 p-3 rounded-xl text-xs font-arabic bg-zinc-50 border border-zinc-200/90 text-zinc-700 leading-relaxed shadow-2xs">
                      <span className="font-bold text-zinc-900">توضيح:</span> {q.explanationAr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default JoiningSentencesView;
