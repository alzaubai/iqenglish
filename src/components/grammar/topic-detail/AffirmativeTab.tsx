import React from 'react';
import { AlertTriangle, Sparkles, Volume2, Lightbulb } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';
import { HighlightedSentence } from './HighlightedSentence';
import { ExamApplicationsList } from './ExamApplicationsList';

interface AffirmativeTabProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const AffirmativeTab: React.FC<AffirmativeTabProps> = ({ currentTopic, onSpeak }) => {
  const affirmative = currentTopic.affirmative;
  if (!affirmative) return null;

  return (
    <div className="space-y-6">
      {/* Formula Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h4 className="text-base sm:text-lg font-black text-blue-950 font-arabic">
            {currentTopic.id === 'u2-topic-comparatives'
              ? 'صيغة المقارنة بين اثنين (Comparative with than)'
              : 'صيغة القاعدة في حالة الإثبات (Affirmative)'}
          </h4>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200"
            dir="ltr"
          >
            {currentTopic.id === 'u2-topic-comparatives' ? 'Comparative Formula' : 'Affirmative Formula'}
          </span>
        </div>

        {/* Vibrant Visual Formula Chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 block">
            شريط كروت القاعدة التفاعلية:
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-3.5 sm:p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl shadow-2xs"
            dir="ltr"
          >
            {affirmative.formulaChips.map((chip, idx) => {
              const isSymbol = chip.text === '+' || chip.text === 'أو' || chip.text === '➔';
              const textLower = chip.text.toLowerCase();
              const isAux =
                textLower.includes('was') ||
                textLower.includes('were') ||
                textLower.includes('is') ||
                textLower.includes('are') ||
                textLower.includes('will') ||
                textLower.includes('s / es');
              const isVerb =
                textLower.includes('v-ing') ||
                textLower.includes('ed') ||
                textLower.includes('فعل') ||
                textLower.includes('base') ||
                textLower.includes('infinitive') ||
                textLower.includes('past') ||
                textLower.includes('p.p');

              return (
                <span
                  key={idx}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                    isSymbol
                      ? 'text-blue-600 font-black text-base shadow-none px-1'
                      : chip.isHighlight
                      ? isAux
                        ? 'bg-blue-600 text-white font-mono font-black shadow-xs ring-2 ring-blue-200'
                        : isVerb
                        ? 'bg-emerald-600 text-white font-mono font-black shadow-xs ring-2 ring-emerald-200'
                        : 'bg-indigo-600 text-white font-mono font-black shadow-xs ring-2 ring-indigo-200'
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

        {/* 1. PAST CONTINUOUS: Singular vs Plural Comparison Cards */}
        {currentTopic.id === 'topic-past-continuous' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 border border-emerald-100 shadow-2xs">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: اختيار الفعل المساعد (was أو were) حسب الفاعل
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  الخطوة الأولى والأساسية لحل أي جملة ماضٍ مستمر في الامتحان
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
              {/* Singular Card */}
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-2.5 text-right shadow-2xs">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-emerald-900 font-arabic flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span>1. فاعل مفرد (Singular)</span>
                  </span>
                  <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    was + v-ing
                  </span>
                </div>
                <p className="text-xs text-emerald-850 font-arabic leading-relaxed">
                  مع الضمائر (<strong>I, He, She, It</strong>) أو أي اسم مفرد (Ali, The boy):
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200/80 font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>Ali ➔ <strong className="text-emerald-700 font-black">was playing</strong></span>
                  <button
                    type="button"
                    onClick={() => onSpeak('Ali was playing football.')}
                    className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50"
                    title="استمع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Plural Card */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2.5 text-right shadow-2xs">
                <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-blue-900 font-arabic flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    <span>2. فاعل جمع (Plural)</span>
                  </span>
                  <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    were + v-ing
                  </span>
                </div>
                <p className="text-xs text-blue-850 font-arabic leading-relaxed">
                  مع الضمائر (<strong>We, You, They</strong>) أو أي اسم جمع (The boys, Students):
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-blue-200/80 font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>They ➔ <strong className="text-blue-700 font-black">were watching</strong></span>
                  <button
                    type="button"
                    onClick={() => onSpeak('They were watching TV.')}
                    className="p-1 rounded-lg text-blue-600 hover:bg-blue-50"
                    title="استمع"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PAST SIMPLE: Regular vs Irregular Comparison Cards */}
        {currentTopic.id === 'topic-past-simple' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100 shadow-2xs">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: الفعل الماضي نوعان (لا ثالث لهما)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  القاعدة الذهبية التي يجب أن تميزها قبل حل أي جملة ماضٍ بسيط
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
              {/* Regular Card */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2.5 text-right shadow-2xs">
                <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-blue-900 font-arabic flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    <span>1. فعل قياسي (Regular)</span>
                  </span>
                  <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    + ed / d
                  </span>
                </div>
                <p className="text-xs text-blue-850 font-arabic leading-relaxed">
                  نضيف لنهايته (ed) أو (d) فقط حسب قواعد الإملاء دون تغيير في أصل الكلمة:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-blue-200/80 font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>play ➔ <strong className="text-blue-700 font-black">played</strong></span>
                  <button
                    type="button"
                    onClick={() => onSpeak('play, played')}
                    className="p-1 rounded text-blue-600 hover:bg-blue-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Irregular Card */}
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-200 space-y-2.5 text-right shadow-2xs">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-indigo-900 font-arabic flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0"></span>
                    <span>2. فعل شاذ (Irregular)</span>
                  </span>
                  <span className="text-xs bg-indigo-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    حفظ غيباً
                  </span>
                </div>
                <p className="text-xs text-indigo-850 font-arabic leading-relaxed">
                  يتغير شكله بالكامل ولا يقبل ed أبداً، ويجب حفظه نصاً من جدول الأفعال:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-indigo-200/80 font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>go ➔ <strong className="text-indigo-700 font-black">went</strong></span>
                  <button
                    type="button"
                    onClick={() => onSpeak('go, went')}
                    className="p-1 rounded text-indigo-600 hover:bg-indigo-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRESENT SIMPLE: Singular vs Plural / I Comparison Cards */}
        {currentTopic.id === 'topic-present-simple' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100 shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  قاعدة المفرد والجمع في زمن المضارع البسيط
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  متى نضيف s الشخص الثالث ومتى يبقى الفعل مجرداً؟
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
              {/* Singular + s */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2.5 text-right shadow-2xs">
                <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-blue-900 font-arabic flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    <span>1. فاعل مفرد (He / She / It)</span>
                  </span>
                  <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    Verb + s / es
                  </span>
                </div>
                <p className="text-xs text-blue-850 font-arabic leading-relaxed">
                  مع (<strong>He, She, It</strong>) أو أي اسم مفرد (Ali, Noor): نضيف للفعل s أو es:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-blue-200/80 font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>He <strong className="text-blue-700 font-black">watches</strong> TV every day.</span>
                  <button
                    type="button"
                    onClick={() => onSpeak('He watches TV every day.')}
                    className="p-1 rounded text-blue-600 hover:bg-blue-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Plural / I + Base */}
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-2.5 text-right shadow-2xs">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="font-bold text-xs sm:text-sm text-emerald-900 font-arabic flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span>2. فاعل جمع والمتكلم (I / They / We / You)</span>
                  </span>
                  <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold shadow-2xs" dir="ltr">
                    Base Verb
                  </span>
                </div>
                <p className="text-xs text-emerald-850 font-arabic leading-relaxed">
                  مع (<strong>I, We, They, You</strong>) أو أي اسم جمع: يبقى الفعل مجرداً تماماً:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200/80 font-mono text-xs text-slate-900 flex items-center justify-between shadow-2xs" dir="ltr">
                  <span>They <strong className="text-emerald-700 font-black">watch</strong> TV every day.</span>
                  <button
                    type="button"
                    onClick={() => onSpeak('They watch TV every day.')}
                    className="p-1 rounded text-emerald-600 hover:bg-emerald-50"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Explanation text */}
        <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed whitespace-pre-line bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200 shadow-2xs">
          {affirmative.explanationAr}
        </div>

        {/* Spoken Examples with Time Markers */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-blue-900 font-arabic block">
            {currentTopic.id === 'u2-topic-comparatives' ? 'أمثلة المقارنة الناطقة في جمل المنهج:' : 'أمثلة ناطقة مع دلالات الزمن:'}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {affirmative.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-blue-300 transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                    <HighlightedSentence
                      sentence={ex.en}
                      highlight={ex.highlight}
                      colorClass="text-blue-600 font-black underline decoration-blue-300 decoration-2"
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

        {/* Time markers note (if available) */}
        {currentTopic.timeMarkers && (
          <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-4 text-right space-y-2 shadow-2xs">
            <span className="text-xs font-bold text-amber-900 font-arabic flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>دلائل الزمن المتكررة في جمل الإثبات:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-arabic">
              {currentTopic.timeMarkers.map((tm, idx) => (
                <div key={idx} className="p-2 bg-white rounded-xl border border-zinc-200 shadow-2xs">
                  • {tm}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exam Applications */}
      {affirmative.examApplications && affirmative.examApplications.length > 0 && (
        <ExamApplicationsList
          applications={affirmative.examApplications}
          colorScheme="blue"
          titleAr="صيغ وتطبيقات امتحانية (تطبيقات امتحانية على الإثبات)"
          subtitleAr="تفصيخ وبناء عناصر الجملة خطوة بخطوة وتظليل الكلمة التي تغيّرت"
          onSpeak={onSpeak}
        />
      )}
    </div>
  );
};
export default AffirmativeTab;
