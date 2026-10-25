import React, { useState } from 'react';
import { Volume2, Languages, RotateCcw, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface InterestsViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const InterestsView: React.FC<InterestsViewProps> = ({ currentTopic, onSpeak }) => {
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

  // مقياس نسب ظروف التكرار التفاعلي الملون
  const frequencyScale = [
    { word: 'always', percent: '100%', ar: 'دائماً', color: 'bg-emerald-600 text-white', ring: 'ring-emerald-200' },
    { word: 'usually', percent: '80%', ar: 'عادةً', color: 'bg-teal-600 text-white', ring: 'ring-teal-200' },
    { word: 'often', percent: '70%', ar: 'غالباً', color: 'bg-blue-600 text-white', ring: 'ring-blue-200' },
    { word: 'sometimes', percent: '50%', ar: 'أحياناً', color: 'bg-amber-500 text-white', ring: 'ring-amber-200' },
    { word: 'never', percent: '0%', ar: 'أبداً (نفي)', color: 'bg-rose-600 text-white', ring: 'ring-rose-200' },
  ];

  const isFrequencyTopic = currentTopic.id === 'topic-adverbs-frequency';

  return (
    <div className="space-y-6">
      {/* مقياس نسب ظروف التكرار إذا كان الموضوع ظروف التكرار */}
      {isFrequencyTopic && (
        <div className="bg-white border border-zinc-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xs space-y-4 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-bold text-teal-700 font-arabic block">
                مقياس نسب التكرار الذهبي (من 100% إلى 0%)
              </span>
              <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                ظروف التكرار الخمسة ونسب تكرار كل ظرف
              </h4>
            </div>
            <span
              className="text-xs font-mono font-bold px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-xl self-start sm:self-auto"
              dir="ltr"
            >
              Frequency Scale
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {frequencyScale.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-zinc-50/80 border border-zinc-200/90 rounded-2xl text-center space-y-1.5 shadow-2xs hover:bg-white transition-all"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold font-mono shadow-2xs ${item.color}`}
                    dir="ltr"
                  >
                    {item.percent}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSpeak(item.word)}
                    className="p-1 rounded bg-white border border-zinc-200 text-zinc-600 hover:text-teal-700 cursor-pointer shadow-2xs"
                    title={`استمع لـ ${item.word}`}
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="font-mono font-black text-sm text-zinc-900" dir="ltr">
                  {item.word}
                </div>
                <div className="text-xs font-arabic font-bold text-zinc-600">
                  {item.ar}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-teal-50/60 border border-teal-200/90 rounded-2xl p-3.5 text-right flex items-start gap-2.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p className="text-xs text-teal-950 font-arabic leading-relaxed">
              <strong>قاعدة ذهبية لموقع ظروف التكرار:</strong> تأتي <strong>قبل الفعل الرئيسي</strong> (مثل: <span className="font-mono text-zinc-800" dir="ltr">I always get up early</span>)، وتأتي <strong>بعد أفعال الكينونة (am, is, are)</strong> (مثل: <span className="font-mono text-zinc-800" dir="ltr">He is always happy</span>).
            </p>
          </div>
        </div>
      )}

      {/* بطاقة القواعد الرئيسية (Interests / Adverbs / Dates) */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-teal-700 font-arabic block">
              {currentTopic.id === 'u2-topic-dates-ordinals'
                ? 'الأعداد الترتيبية وقراءة وكتابة التواريخ'
                : currentTopic.id === 'topic-adverbs-frequency'
                ? 'قواعد ظروف التكرار وموقعها في الجملة'
                : 'التعبير عن الهوايات والاهتمامات'}
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              {currentTopic.id === 'u2-topic-dates-ordinals'
                ? 'الأعداد الترتيبية (1st, 2nd, 3rd) والتواريخ وحروف الجر (in / on / at)'
                : currentTopic.id === 'topic-adverbs-frequency'
                ? 'موقع ظروف التكرار مع الأفعال العادية وأفعال الكينونة'
                : 'قواعد like, love, enjoy والعبارة interested in'}
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-zinc-100 text-zinc-700 rounded-xl border border-zinc-200 self-start sm:self-auto"
            dir="ltr"
          >
            {currentTopic.id === 'u2-topic-dates-ordinals'
              ? 'Dates & Ordinals'
              : currentTopic.id === 'topic-adverbs-frequency'
              ? 'Adverbs Rules'
              : 'Interests Rules'}
          </span>
        </div>

        <div className="space-y-5">
          {currentTopic.interestsSections?.map((sec, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 bg-zinc-50/80 border border-zinc-200/90 rounded-xl sm:rounded-2xl space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
                <h5 className="text-sm sm:text-base font-black text-zinc-900 font-arabic">
                  {sec.titleAr}
                </h5>
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-teal-200"></span>
              </div>

              {/* رقائق معادلة القاعدة بكبسولات ملونة واضحة */}
              <div
                className="flex flex-wrap items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono text-xs"
                dir="ltr"
              >
                {sec.formulaChips.map((chip, cIdx) => (
                  <span
                    key={cIdx}
                    className={`px-2 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold text-center ${
                      chip.isHighlight
                        ? 'bg-teal-600 text-white font-mono shadow-xs ring-2 ring-teal-200'
                        : chip.text === '+' || chip.text === 'أو' || chip.text === '•'
                        ? 'text-teal-600 font-bold px-0.5 sm:px-1 shadow-none'
                        : chip.text.includes('ing') || chip.text.includes('Verb') || chip.text.includes('فعل')
                        ? 'bg-emerald-600 text-white font-mono shadow-2xs'
                        : chip.text.includes('am / is / are') || chip.text.includes('like') || chip.text.includes('interested') || chip.text.includes('do / does') || chip.text.includes('How often')
                        ? 'bg-indigo-600 text-white font-mono shadow-2xs'
                        : 'bg-zinc-100 border border-zinc-200 text-zinc-800 font-arabic'
                    }`}
                  >
                    <span>{chip.text}</span>
                    {chip.note && (
                      <span className="font-arabic text-[9px] sm:text-[10px] block font-normal opacity-90 mt-0.5">
                        ({chip.note})
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed whitespace-pre-line">
                {sec.explanationAr}
              </p>

              {/* أمثلة القاعدة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {sec.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 bg-white border border-zinc-200/90 rounded-xl flex items-center justify-between gap-3 shadow-2xs text-left"
                    dir="ltr"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans" dir="ltr">
                        {ex.en}
                      </p>
                      <p className="text-xs text-zinc-500 font-arabic text-right mt-0.5" dir="rtl">
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
          ))}
        </div>
      </div>

      {/* التمارين الامتحانية الشهرية */}
      {currentTopic.examPractice && currentTopic.examPractice.length > 0 && (
        <div className="bg-white border border-zinc-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xs space-y-5 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-bold text-teal-700 font-arabic block">
                اختبار تفاعلي ذاتي للطالب
              </span>
              <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
                {currentTopic.id === 'u2-topic-dates-ordinals'
                  ? 'تمارين امتحانية شهرية على الأعداد الترتيبية والتواريخ'
                  : currentTopic.id === 'topic-adverbs-frequency'
                  ? 'تمارين امتحانية شهرية على ظروف التكرار'
                  : 'تمارين امتحانية شهرية على التعبير عن الاهتمام'}
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
                    <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-900 text-xs font-bold flex items-center justify-center font-mono shadow-2xs">
                      {idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {q.questionAr && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                            visibleTranslations[q.id]
                              ? 'bg-teal-50 text-teal-800 border-teal-200 shadow-2xs'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                          title="ترجمة السؤال"
                        >
                          <Languages className="w-3 h-3 text-teal-600" />
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" dir="ltr">
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
                          btnClass = 'bg-teal-600 text-white border-teal-600 shadow-xs';
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

export default InterestsView;
