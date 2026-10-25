import React from 'react';
import { HelpCircle, Check, X, Volume2 } from 'lucide-react';
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
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h4 className="text-base sm:text-lg font-black text-indigo-950 font-arabic">
            {currentTopic.id === 'u2-topic-comparatives'
              ? 'صيغة السؤال في المقارنة والتفضيل (Which)'
              : 'صيغة السؤال والاستفهام (Question)'}
          </h4>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200"
            dir="ltr"
          >
            {currentTopic.id === 'u2-topic-comparatives' ? 'Which / Comparison Question' : 'Question Formula'}
          </span>
        </div>

        {/* Vibrant Visual Formula Chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 block">
            شريط كروت السؤال التفاعلية:
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl shadow-2xs"
            dir="ltr"
          >
            {question.formulaChips.map((chip, idx) => {
              const isSymbol = chip.text === '+' || chip.text === 'أو' || chip.text === '➔';
              const textLower = chip.text.toLowerCase();
              const isQuestionMark = chip.text.includes('?');
              const isQWord =
                textLower.includes('did') ||
                textLower.includes('was') ||
                textLower.includes('were') ||
                textLower.includes('do') ||
                textLower.includes('does') ||
                textLower.includes('will') ||
                textLower.includes('wh-') ||
                textLower.includes('which');
              const isVerb =
                textLower.includes('base') ||
                textLower.includes('infinitive') ||
                textLower.includes('v-ing') ||
                textLower.includes('فعل') ||
                textLower.includes('p.p');

              return (
                <span
                  key={idx}
                  className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all text-center ${
                    isQuestionMark
                      ? 'bg-amber-500 text-white font-mono font-black shadow-xs ring-2 ring-amber-200'
                      : isSymbol
                      ? 'text-indigo-600 font-black text-xs sm:text-base shadow-none px-0.5 sm:px-1'
                      : chip.isHighlight
                      ? isQWord
                        ? 'bg-indigo-600 text-white font-mono font-black shadow-xs ring-2 ring-indigo-200'
                        : isVerb
                        ? 'bg-emerald-600 text-white font-mono font-black shadow-xs ring-2 ring-emerald-200'
                        : 'bg-indigo-600 text-white font-mono font-black shadow-xs ring-2 ring-indigo-200'
                      : 'bg-white border border-slate-300 text-slate-800 font-mono font-bold shadow-2xs'
                  }`}
                >
                  <span>{chip.text}</span>
                  {chip.note && (
                    <span className="font-arabic text-[9px] sm:text-[10px] block font-normal opacity-90 mt-0.5">
                      ({chip.note})
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* 1. PAST CONTINUOUS: Question Card + Short Answers */}
        {currentTopic.id === 'topic-past-continuous' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100 shadow-2xs">
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

            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-200 space-y-2.5 shadow-2xs">
              <div className="text-xs sm:text-sm text-zinc-800 font-arabic leading-relaxed space-y-1.5">
                <p>1. نقدّم الفعل المساعد <span className="bg-indigo-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">Was</span> أو <span className="bg-indigo-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">Were</span> بحرف كبير في بداية الجملة.</p>
                <p>2. يبقى الفعل الرئيسي بعد الفاعل <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md">محتفظاً بـ (ing)</span> كما هو دون حذف.</p>
                <p>3. نضع علامة الاستفهام <span className="bg-amber-500 text-white font-mono font-bold px-2 py-0.5 rounded-md">?</span> في النهاية.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl text-rose-800 text-left shadow-2xs">
                  خطأ: Were they <span className="line-through text-rose-600 font-black">watch</span> TV? ✗
                </div>
                <div className="p-2.5 bg-white border border-emerald-300 rounded-xl text-emerald-800 font-bold text-left shadow-2xs flex items-center justify-between">
                  <span>Were they <span className="text-emerald-700 font-black underline">watching</span> TV? ✓</span>
                  <button
                    type="button"
                    onClick={() => onSpeak('Were they watching TV?')}
                    className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Short Answers Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-2 text-right shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 border-b border-emerald-100 pb-1.5 font-arabic">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>الإجابة القصيرة بالإثبات (Yes):</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-800" dir="ltr">
                  <div>• Yes, he / she / it <strong className="text-emerald-700 font-black">was</strong>.</div>
                  <div>• Yes, they / we / you <strong className="text-emerald-700 font-black">were</strong>.</div>
                </div>
              </div>
              <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-200 space-y-2 text-right shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 border-b border-rose-100 pb-1.5 font-arabic">
                  <X className="w-4 h-4 text-rose-700" />
                  <span>الإجابة القصيرة بالنفي (No):</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-800" dir="ltr">
                  <div>• No, he / she / it <strong className="text-rose-700 font-black">wasn&apos;t</strong>.</div>
                  <div>• No, they / we / you <strong className="text-rose-700 font-black">weren&apos;t</strong>.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PAST SIMPLE: Question Card + Short Answers */}
        {currentTopic.id === 'topic-past-simple' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100 shadow-2xs">
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

            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-200 space-y-2.5 shadow-2xs">
              <div className="text-xs sm:text-sm text-zinc-800 font-arabic leading-relaxed space-y-1.5">
                <p>1. نبدأ السؤال دائماً بـ <span className="bg-indigo-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">Did</span> بحرف كبير في البداية.</p>
                <p>2. يرجع الفعل الرئيسي بعدها إلى <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md">مصدر مجرد (Base)</span> خالي من ed أو الشذوذ.</p>
                <p>3. نضع علامة الاستفهام <span className="bg-amber-500 text-white font-mono font-bold px-2 py-0.5 rounded-md">?</span> في النهاية.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl text-rose-800 text-left shadow-2xs">
                  خطأ: Did Ali <span className="line-through text-rose-600 font-black">played</span>? ✗
                </div>
                <div className="p-2.5 bg-white border border-emerald-300 rounded-xl text-emerald-800 font-bold text-left shadow-2xs flex items-center justify-between">
                  <span>Did Ali <span className="text-emerald-700 font-black underline">play</span>? ✓</span>
                  <button
                    type="button"
                    onClick={() => onSpeak('Did Ali play football?')}
                    className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Short Answers Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-2 text-right shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 border-b border-emerald-100 pb-1.5 font-arabic">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>الإجابة القصيرة بالإثبات (Yes):</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-800" dir="ltr">
                  <div>• Yes, I / he / she / they <strong className="text-emerald-700 font-black">did</strong>.</div>
                </div>
              </div>
              <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-200 space-y-2 text-right shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 border-b border-rose-100 pb-1.5 font-arabic">
                  <X className="w-4 h-4 text-rose-700" />
                  <span>الإجابة القصيرة بالنفي (No):</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-800" dir="ltr">
                  <div>• No, I / he / she / they <strong className="text-rose-700 font-black">didn&apos;t</strong>.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRESENT SIMPLE: Do / Does Question Card */}
        {currentTopic.id === 'topic-present-simple' && (
          <div className="bg-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 border border-indigo-100 shadow-2xs">
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

            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-200 space-y-2.5 shadow-2xs">
              <div className="text-xs sm:text-sm text-zinc-800 font-arabic leading-relaxed space-y-1.5">
                <p>1. نستخدم <span className="bg-indigo-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">Does</span> في البداية مع المفرد (He, She, It, Ali).</p>
                <p>2. نستخدم <span className="bg-indigo-600 text-white font-mono font-bold px-2 py-0.5 rounded-md">Do</span> في البداية مع الجمع و I و you (They, We, You).</p>
                <p>3. قاعدة ذهبية: الفعل بعد Does و Do يرجع <span className="font-bold text-indigo-700 underline">مجرداً خالي من s</span> تماماً!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-white border border-rose-200 rounded-xl text-rose-800 text-left shadow-2xs">
                  خطأ: Does he <span className="line-through text-rose-600 font-black">plays</span> tennis? ✗
                </div>
                <div className="p-2.5 bg-white border border-emerald-300 rounded-xl text-emerald-800 font-bold text-left shadow-2xs flex items-center justify-between">
                  <span>Does he <span className="text-emerald-700 font-black underline">play</span> tennis? ✓</span>
                  <button
                    type="button"
                    onClick={() => onSpeak('Does he play tennis?')}
                    className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Short Answers Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-2 text-right shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 border-b border-emerald-100 pb-1.5 font-arabic">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>الإجابة القصيرة بالإثبات (Yes):</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-800" dir="ltr">
                  <div>• Yes, he / she / it <strong className="text-emerald-700 font-black">does</strong>.</div>
                  <div>• Yes, they / we / you / I <strong className="text-emerald-700 font-black">do</strong>.</div>
                </div>
              </div>
              <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-200 space-y-2 text-right shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 border-b border-rose-100 pb-1.5 font-arabic">
                  <X className="w-4 h-4 text-rose-700" />
                  <span>الإجابة القصيرة بالنفي (No):</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-slate-800" dir="ltr">
                  <div>• No, he / she / it <strong className="text-rose-700 font-black">doesn&apos;t</strong>.</div>
                  <div>• No, they / we / you / I <strong className="text-rose-700 font-black">don&apos;t</strong>.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Explanation text */}
        <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200 shadow-2xs">
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
                className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-indigo-300 transition-colors"
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
export default QuestionTab;
