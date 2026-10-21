import React from 'react';
import { HelpCircle, Volume2 } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';
import { HighlightedSentence } from './HighlightedSentence';
import { ExamApplicationsList } from './ExamApplicationsList';

interface QuestionTabProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const QuestionTab: React.FC<QuestionTabProps> = ({ currentTopic, onSpeak }) => {
  const question = currentTopic.question;
  if (!question) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h4 className="text-base sm:text-lg font-black text-indigo-950 font-arabic">
            {currentTopic.id === 'u2-topic-comparatives'
              ? 'صيغة السؤال في المقارنة والتفضيل (Which)'
              : 'صيغة السؤال (Question)'}
          </h4>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200"
            dir="ltr"
          >
            {currentTopic.id === 'u2-topic-comparatives' ? 'Which / Comparison Question' : 'Question Formula'}
          </span>
        </div>

        {/* Formula Chips */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-zinc-50/70 rounded-2xl border border-zinc-200 shadow-2xs"
          dir="ltr"
        >
          {question.formulaChips.map((chip, idx) => (
            <span
              key={idx}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs ${
                chip.isHighlight
                  ? 'bg-indigo-600 text-white font-mono text-sm sm:text-base ring-2 ring-indigo-300'
                  : chip.text === '+'
                  ? 'text-indigo-600 font-black text-base shadow-none'
                  : 'bg-white border border-zinc-200 text-zinc-900 font-arabic'
              }`}
            >
              {chip.text}
            </span>
          ))}
        </div>

        {/* كارت ملاحظة: خطوات تكوين السؤال */}
        {currentTopic.id === 'topic-past-continuous' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: سر تكوين السؤال في الماضي المستمر
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  ثلاث خطوات لتحويل أي جملة ماضٍ مستمر إلى سؤال امتحاني ناجح
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                <p>1. نبدأ السؤال دائماً بتقديم الفعل المساعد <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Was</span> أو <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Were</span> بحرف كبير في البداية قبل الفاعل.</p>
                <p>2. يبقى الفعل الرئيسي بعد الفاعل <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">محتفظاً بـ (ing)</span> كما هو دون حذف.</p>
                <p>3. نضع علامة الاستفهام <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">?</span> في نهاية الجملة.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: Were they <span className="line-through text-rose-600 font-bold">watch</span> TV?
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: Were they <span className="text-emerald-700 font-black underline">watching</span> TV?
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'topic-past-simple' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: سر تكوين السؤال في الماضي البسيط (Did)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  ثلاث خطوات أساسية: تقديم Did وإرجاع الفعل مجرداً
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                <p>1. نبدأ السؤال دائماً بـ <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Did</span> بحرف كبير في البداية.</p>
                <p>2. يرجع الفعل الرئيسي بعدها إلى <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">مصدر مجرد (Base)</span> خالي من ed أو الشذوذ.</p>
                <p>3. نضع علامة الاستفهام <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">?</span> في نهاية الجملة.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: Did Ali <span className="line-through text-rose-600 font-bold">played</span>?
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: Did Ali <span className="text-emerald-700 font-black underline">play</span>?
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'u2-topic-future-will' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: خطوات تكوين السؤال في زمن المستقبل
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  تقديم Will في البداية مع الفعل المجرد
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                <p>1. نبدأ السؤال بتقديم <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Will</span> بحرف كبير في بداية الجملة قبل الفاعل.</p>
                <p>2. يبقى الفعل الرئيسي مجرداً (Base) خالي من أي إضافة.</p>
                <p>3. نضع علامة الاستفهام <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">?</span> في النهاية.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: Will it <span className="line-through text-rose-600 font-bold">rains</span> tomorrow?
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: Will it <span className="text-emerald-700 font-black underline">rain</span> tomorrow?
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'u2-topic-comparatives' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: السؤال بـ (Which = أي) للاختيار والمقارنة
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  أسئلة قطع الكتاب وفصول السنة والرياضات
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                <p>1. نستخدم <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Which</span> عندما نسأل للاختيار والمقارنة بين أمرين: <span className="font-mono text-zinc-900" dir="ltr">Which month is colder, January or July?</span></p>
                <p>2. نسأل عن التفضيل المطلق بـ: <span className="font-mono text-zinc-900" dir="ltr">Which is the fastest sport?</span></p>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'topic-present-simple' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  قاعدة تكوين السؤال في المضارع البسيط (Do / Does)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  استخدام Does مع المفرد و Do مع الجمع مع إرجاع الفعل مجرداً
                </span>
              </div>
            </div>

            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2.5">
              <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed space-y-1.5">
                <p>1. نستخدم <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Does</span> في البداية مع المفرد (He, She, It, Ali).</p>
                <p>2. نستخدم <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold px-2 py-0.5 rounded-md">Do</span> في البداية مع الجمع و I و you (They, We, You).</p>
                <p>3. قاعدة ذهبية: الفعل بعد Does و Do يرجع <span className="font-bold text-indigo-700 underline">مجرداً خالي من s</span> تماماً!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-rose-800 text-left">
                  خطأ شائع: Does he <span className="line-through text-rose-600 font-bold">plays</span> tennis?
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  الصحيح دائماً: Does he <span className="text-emerald-700 font-black underline">play</span> tennis?
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
          {question.explanationAr}
        </div>

        {/* Question Examples */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-indigo-900 font-arabic block">
            {currentTopic.id === 'u2-topic-comparatives' ? 'أمثلة الأسئلة الناطقة في جمل المنهج:' : 'أمثلة السؤال الناطقة والإجابات القصيرة:'}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-indigo-200 transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                    <HighlightedSentence
                      sentence={ex.en}
                      highlight={ex.highlight}
                      colorClass="text-indigo-600 font-black underline decoration-indigo-300 decoration-2"
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

      {/* شلون يجي بالامتحان؟ (تطبيقات امتحانية على الاستفهام مع بناء الجملة خطوة بخطوة وتظليل التغيير) */}
      {question.examApplications && question.examApplications.length > 0 && (
        <ExamApplicationsList
          applications={question.examApplications}
          colorScheme="indigo"
          titleAr="صيغ وتطبيقات امتحانية (تطبيقات امتحانية على الاستفهام)"
          subtitleAr={
            currentTopic.id === 'u2-topic-future-will'
              ? "تفصيخ وبناء الجملة وتظليل Will والمصدر المجرد وعلامة الاستفهام (?)"
              : currentTopic.id === 'topic-past-continuous'
              ? "تفصيخ وبناء الجملة وتظليل Was/Were والفعل (ing) وعلامة الاستفهام (?)"
              : currentTopic.id === 'u2-topic-comparatives'
              ? "صيغة السؤال في المقارنة والتفضيل مع Which وعلامة الاستفهام (?)"
              : "تفصيخ وبناء الجملة وتظليل Did والمصدر المجرد وعلامة الاستفهام (?)"
          }
          onSpeak={onSpeak}
        />
      )}
    </div>
  );
};
