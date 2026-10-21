import React from 'react';
import { AlertTriangle, Volume2 } from 'lucide-react';
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

        {/* Formula Chips */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-zinc-50/70 rounded-2xl border border-zinc-200 shadow-2xs"
          dir="ltr"
        >
          {negative.formulaChips.map((chip, idx) => (
            <span
              key={idx}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs ${
                chip.isHighlight
                  ? 'bg-rose-600 text-white font-mono text-sm sm:text-base ring-2 ring-rose-300'
                  : chip.text === '+'
                  ? 'text-rose-600 font-black text-base shadow-none'
                  : 'bg-white border border-zinc-200 text-zinc-900 font-arabic'
              }`}
            >
              {chip.text}
            </span>
          ))}
        </div>

        {/* كارت ملاحظة: القاعدة الذهبية للنفي */}
        {currentTopic.id === 'topic-past-continuous' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة جداً: القاعدة الذهبية لنفي الماضي المستمر
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  أكبر خطأ يقع فيه طلاب الأول متوسط: إياك أن تحذف ing في النفي!
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                نفي الماضي المستمر سهل جداً: نضع <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">not</span> بعد الفعل المساعد was أو were مباشرة لتصبح (<span className="font-mono font-bold text-rose-700">wasn't</span> / <span className="font-mono font-bold text-rose-700">weren't</span>)، ويبقى الفعل <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">محافظاً على إضافة (ing)</span> ولا يحذف منه أي شيء!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: He wasn't <span className="line-through text-rose-600 font-bold">play</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: He wasn't <span className="text-emerald-700 font-black underline">playing</span>
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'topic-past-simple' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة جداً: القاعدة الذهبية لنفي الماضي البسيط
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  إرجاع الفعل إلى مصدره المجرد خالي من أي إضافة
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                عند النفي بـ <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">didn't</span>، يجب تحويل الفعل إلى <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">المصدر المجرد (Infinitive)</span>: نحذف منه ed إذا كان قياسياً، ونعيده لأصله المضارع إذا كان شاذاً!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: He didn't <span className="line-through text-rose-600 font-bold">went</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: He didn't <span className="text-emerald-700 font-black underline">go</span>
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'u2-topic-future-will' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة جداً: اختصار نفي المستقبل (won't)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  سؤال إملاء وتحويل وزاري متكرر
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                نفي will not يُختصر دائماً إلى <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">won't</span> مع الفاصلة العليا، ويبقى الفعل بعدها مجرداً (Base) تماماً دون أي إضافة!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  إملاء خاطئ: <span className="line-through text-rose-600 font-bold">willn't</span>
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الإملاء الصحيح: <span className="text-emerald-700 font-black underline">won't</span> + مجرد
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'u2-topic-comparatives' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة جداً: أداة التعريف (the) إجبارية قبل صيغة التفضيل
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  أهم قاعدة لأسئلة الاختيارات الوزارية والشهرية
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                إذا رأيت أداة التعريف <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">the</span> قبل الفراغ، فاختر فوراً الصفة المنتهية بـ <span className="font-mono font-bold text-rose-700">-est</span> أو المسبوقة بـ <span className="font-mono font-bold text-rose-700">most</span>!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: July is the <span className="line-through text-rose-600 font-bold">hotter</span> month
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: July is the <span className="text-emerald-700 font-black underline">hottest</span> month
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'topic-present-simple' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  قاعدة ذهبية في نفي المضارع: حذف s الشخص الثالث
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  بعد doesn't و don't يرجع الفعل دائماً إلى أصله المجرد (Base)
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                عند النفي بـ <span className="bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold px-2 py-0.5 rounded-md">doesn't</span> مع المفرد، نسحب حرف الـ (s/es) من الفعل ليعود مجرداً خالي من أي إضافة!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: He doesn't <span className="line-through text-rose-600 font-bold">plays</span> tennis
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: He doesn't <span className="text-emerald-700 font-black underline">play</span> tennis
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
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
                className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-rose-200 transition-colors"
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

      {/* شلون يجي بالامتحان؟ (تطبيقات امتحانية على النفي مع بناء الجملة خطوة بخطوة وتظليل التغيير) */}
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
