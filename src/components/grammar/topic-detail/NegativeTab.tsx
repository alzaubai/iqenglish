import React from 'react';
import { AlertTriangle, Volume2, Lightbulb } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';
import { HighlightedSentence } from './HighlightedSentence';
import { ExamApplicationsList } from './ExamApplicationsList';

interface NegativeTabProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const NegativeTab: React.FC<NegativeTabProps> = ({ currentTopic, onSpeak }) => {
  const negative = currentTopic.negative;
  if (!negative) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h4 className="text-base sm:text-lg font-black text-rose-950 font-arabic">
            {currentTopic.id === 'u2-topic-comparatives'
              ? 'صيغة التفضيل بين مجموعة (Superlative with the)'
              : 'صيغة القاعدة في حالة النفي (Negative)'}
          </h4>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-rose-50 text-rose-800 rounded-xl border border-rose-200"
            dir="ltr"
          >
            {currentTopic.id === 'u2-topic-comparatives' ? 'Superlative Formula' : 'Negative Formula'}
          </span>
        </div>

        {/* Vibrant Visual Formula Chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 block">
            شريط كروت النفي التفاعلية:
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-3.5 sm:p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl shadow-2xs"
            dir="ltr"
          >
            {negative.formulaChips.map((chip, idx) => {
              const isSymbol = chip.text === '+' || chip.text === 'أو' || chip.text === '➔';
              const textLower = chip.text.toLowerCase();
              const isNegAux =
                textLower.includes("n't") ||
                textLower.includes('not') ||
                textLower.includes("didn't") ||
                textLower.includes("wasn't") ||
                textLower.includes("weren't") ||
                textLower.includes("don't") ||
                textLower.includes("doesn't") ||
                textLower.includes("won't");
              const isVerb =
                textLower.includes('v-ing') ||
                textLower.includes('base') ||
                textLower.includes('infinitive') ||
                textLower.includes('فعل') ||
                textLower.includes('p.p');

              return (
                <span
                  key={idx}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                    isSymbol
                      ? 'text-rose-600 font-black text-base shadow-none px-1'
                      : chip.isHighlight
                      ? isNegAux
                        ? 'bg-rose-600 text-white font-mono font-black shadow-xs ring-2 ring-rose-200'
                        : isVerb
                        ? 'bg-emerald-600 text-white font-mono font-black shadow-xs ring-2 ring-emerald-200'
                        : 'bg-rose-600 text-white font-mono font-black shadow-xs ring-2 ring-rose-200'
                      : 'bg-white border border-slate-300 text-slate-800 font-mono font-bold shadow-2xs'
                  }`}
                >
                  <span>{chip.text}</span>
                  {chip.note && (
                    <span className="font-arabic text-[10px] block font-normal opacity-90 mt-0.5">
                      ({chip.note})
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* 1. PAST CONTINUOUS: Negative Warning Card */}
        {currentTopic.id === 'topic-past-continuous' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100 shadow-2xs">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة جداً: القاعدة الذهبية لنفي الماضي المستمر
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  إياك أن تحذف (ing) في النفي بعد wasn&apos;t أو weren&apos;t!
                </span>
              </div>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-2.5 shadow-2xs">
              <p className="text-xs sm:text-sm text-zinc-800 font-arabic leading-relaxed">
                نضع <span className="bg-rose-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">not</span> بعد الفعل المساعد was أو were مباشرة فتصبح (<span className="font-mono font-bold text-rose-700">wasn&apos;t</span> / <span className="font-mono font-bold text-rose-700">weren&apos;t</span>)، ويبقى الفعل <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md">محتفظاً بـ (ing)</span> دون حذف!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl text-rose-800 text-left shadow-2xs">
                  خطأ شائع: He wasn&apos;t <span className="line-through text-rose-600 font-black">play</span> ✗
                </div>
                <div className="p-2.5 bg-white border border-emerald-300 rounded-xl text-emerald-800 font-bold text-left shadow-2xs flex items-center justify-between">
                  <span>He wasn&apos;t <span className="text-emerald-700 font-black underline">playing</span> ✓</span>
                  <button
                    type="button"
                    onClick={() => onSpeak("He wasn't playing.")}
                    className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contraction Pills */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-arabic">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>طريقة دمج أداة النفي (not):</span>
              </span>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs" dir="ltr">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold shadow-2xs">
                  was + not ➔ <strong className="text-rose-700">wasn&apos;t</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold shadow-2xs">
                  were + not ➔ <strong className="text-rose-700">weren&apos;t</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. PAST SIMPLE: Negative Warning Card */}
        {currentTopic.id === 'topic-past-simple' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100 shadow-2xs">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة جداً: القاعدة الذهبية لنفي الماضي البسيط
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  إرجاع الفعل إلى مصدره المجرد خالي من ed أو الشذوذ بعد didn&apos;t
                </span>
              </div>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-2.5 shadow-2xs">
              <p className="text-xs sm:text-sm text-zinc-800 font-arabic leading-relaxed">
                عند النفي بـ <span className="bg-rose-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">didn&apos;t</span>، يجب تحويل الفعل إلى <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md">المصدر المجرد (Infinitive)</span>: نحذف منه ed إذا كان قياسياً، ونعيده لأصله إذا كان شاذاً!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl text-rose-800 text-left shadow-2xs">
                  خطأ: He didn&apos;t <span className="line-through text-rose-600 font-black">went</span> ✗
                </div>
                <div className="p-2.5 bg-white border border-emerald-300 rounded-xl text-emerald-800 font-bold text-left shadow-2xs flex items-center justify-between">
                  <span>He didn&apos;t <span className="text-emerald-700 font-black underline">go</span> ✓</span>
                  <button
                    type="button"
                    onClick={() => onSpeak("He didn't go.")}
                    className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contraction Pill */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-arabic">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>سؤال الإملاء الوزاري:</span>
              </span>
              <div className="font-mono text-xs" dir="ltr">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold shadow-2xs">
                  did + not ➔ <strong className="text-rose-700">didn&apos;t</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRESENT SIMPLE: Negative Warning Card */}
        {currentTopic.id === 'topic-present-simple' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100 shadow-2xs">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  قاعدة ذهبية في نفي المضارع: حذف s الشخص الثالث بعد doesn&apos;t
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  بعد doesn&apos;t و don&apos;t يرجع الفعل دائماً إلى أصله المجرد (Base)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
              {/* Singular Negative */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-rose-900 font-arabic">
                    1. نفي المفرد (He / She / It)
                  </span>
                  <span className="text-xs bg-rose-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    doesn&apos;t + Base
                  </span>
                </div>
                <p className="text-xs text-rose-850 font-arabic leading-relaxed">
                  نسحب s الشخص الثالث من الفعل ليعود مجرداً خالي من أي إضافة:
                </p>
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>He <strong className="text-rose-700 font-black">doesn&apos;t play</strong> tennis.</span>
                  <button
                    type="button"
                    onClick={() => onSpeak("He doesn't play tennis.")}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Plural Negative */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-rose-900 font-arabic">
                    2. نفي الجمع والمتكلم (I / They / We / You)
                  </span>
                  <span className="text-xs bg-rose-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    don&apos;t + Base
                  </span>
                </div>
                <p className="text-xs text-rose-850 font-arabic leading-relaxed">
                  نضع don&apos;t والفعل يبقى مجرداً كما هو:
                </p>
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>They <strong className="text-rose-700 font-black">don&apos;t watch</strong> TV.</span>
                  <button
                    type="button"
                    onClick={() => onSpeak("They don't watch TV.")}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Explanation text */}
        <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200 shadow-2xs">
          {negative.explanationAr}
        </div>

        {/* Negative Examples */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-rose-900 font-arabic block">
            {currentTopic.id === 'u2-topic-comparatives' ? 'أمثلة التفضيل الناطقة في جمل المنهج:' : 'أمثلة النفي الناطقة مع دلالات الزمن:'}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {negative.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-rose-300 transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                    <HighlightedSentence
                      sentence={ex.en}
                      highlight={ex.highlight}
                      colorClass="text-rose-600 font-black underline decoration-rose-300 decoration-2"
                    />
                  </p>
                  <p className="text-xs text-zinc-500 font-arabic mt-1">
                    {ex.ar}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSpeak(ex.en)}
                  className="p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shrink-0 shadow-2xs"
                  title="استمع للنطق"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Applications */}
      {negative.examApplications && negative.examApplications.length > 0 && (
        <ExamApplicationsList
          applications={negative.examApplications}
          colorScheme="rose"
          titleAr="صيغ وتطبيقات امتحانية (تطبيقات امتحانية على النفي)"
          subtitleAr={
            currentTopic.id === 'u2-topic-future-will'
              ? "تفصيخ وبناء الجملة وإبراز وضع won't والفعل المجرد"
              : currentTopic.id === 'topic-past-continuous'
              ? "تفصيخ وبناء الجملة وإبراز wasn't / weren't مع (ing)"
              : currentTopic.id === 'u2-topic-comparatives'
              ? "تفصيخ وبناء صيغة التفضيل (the ... est / most)"
              : "تفصيخ وبناء الجملة وإبراز وضع didn't وإرجاع الفعل لأصله"
          }
          onSpeak={onSpeak}
        />
      )}
    </div>
  );
};
export default NegativeTab;
