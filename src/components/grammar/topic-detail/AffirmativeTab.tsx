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

        {/* Clean Visual Formula Chips */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-zinc-50/70 rounded-2xl border border-zinc-200 shadow-2xs"
          dir="ltr"
        >
          {affirmative.formulaChips.map((chip, idx) => (
            <span
              key={idx}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs ${
                chip.isHighlight
                  ? 'bg-blue-600 text-white font-mono text-sm sm:text-base ring-2 ring-blue-300'
                  : chip.text === '+' || chip.text === 'أو'
                  ? 'text-blue-600 font-black text-base shadow-none'
                  : 'bg-white border border-zinc-200 text-zinc-900 font-arabic'
              }`}
            >
              {chip.text}
            </span>
          ))}
        </div>

        {/* كارت ملاحظة جوهري نظيف وأبيض */}
        {currentTopic.id === 'topic-past-continuous' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 border border-emerald-100">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
              <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">1. فاعل مفرد (Singular)</span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-mono font-bold">was + v-ing</span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  مع الضمائر (I, He, She, It) أو أي اسم مفرد (Ali, The boy):
                </p>
                <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                  Ali ➔ <span className="text-emerald-600 font-bold">was playing</span> &nbsp;|&nbsp; I ➔ <span className="text-emerald-600 font-bold">was writing</span>
                </p>
              </div>

              <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">2. فاعل جمع (Plural)</span>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-mono font-bold">were + v-ing</span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  مع الضمائر (We, You, They) أو أي اسم جمع (The boys, Students):
                </p>
                <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                  They ➔ <span className="text-blue-600 font-bold">were watching</span> &nbsp;|&nbsp; Boys ➔ <span className="text-blue-600 font-bold">were swimming</span>
                </p>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'topic-past-simple' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة هامة: الفعل الماضي نوعان (لا ثالث لهما)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  القاعدة الذهبية التي يجب أن تميزها قبل حل أي جملة
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
              <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">1. فعل قياسي (Regular)</span>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-mono font-bold">+ed</span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  نضيف لنهايته (ed) أو (d) فقط حسب قواعد الإملاء:
                </p>
                <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                  play ➔ <span className="text-blue-600 font-bold">played</span> &nbsp;|&nbsp; visit ➔ <span className="text-blue-600 font-bold">visited</span>
                </p>
              </div>

              <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-zinc-900 font-arabic">2. فعل شاذ (Irregular)</span>
                  <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md font-mono font-bold">يُحفظ نصاً</span>
                </div>
                <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                  يتغير شكله بالكامل ولا يقبل ed أبداً، ويجب حفظه من جدول أفعال المنهج:
                </p>
                <p className="text-xs font-mono text-zinc-800 bg-white border border-zinc-200 p-2 rounded-lg" dir="ltr">
                  go ➔ <span className="text-indigo-600 font-bold">went</span> &nbsp;|&nbsp; see ➔ <span className="text-indigo-600 font-bold">saw</span> &nbsp;|&nbsp; do ➔ <span className="text-indigo-600 font-bold">did</span>
                </p>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'u2-topic-future-will' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  ملاحظة جوهرية: الفعل بعد will يكون مجرداً دائماً (Infinitive)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  خالٍ من أي إضافة: لا s، لا ed، ولا ing
                </span>
              </div>
            </div>
            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                في المستقبل البسيط مع will، يأتي الفاعل بجميع أشكاله (I, He, She, They, We...) متبوعاً بالأداة <span className="bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold px-2 py-0.5 rounded-md">will</span> ثم الفعل بصورته الأصلية المجردة.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-800 text-left">
                  It <span className="text-blue-700 font-bold">will rain</span> tomorrow.
                </div>
                <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-indigo-800 text-left">
                  I <span className="text-indigo-700 font-bold">will visit</span> my friend next week.
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'u2-topic-comparatives' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  دلالة المقارنة في الامتحان الوزاري والشهري: وجود كلمة (than)
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  بين صفة قصيرة (-er) أو صفة طويلة (more + adj)
                </span>
              </div>
            </div>
            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                عندما ترى كلمة <span className="bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold px-2 py-0.5 rounded-md">than</span> (بمعنى: مِن) بعد الفراغ في الامتحان، اختر أو اكتب دائماً صيغة المقارنة:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-800 text-left">
                  صفة قصيرة: cold ➔ <span className="text-blue-700 font-bold">colder than</span>
                </div>
                <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-indigo-800 text-left">
                  صفة طويلة: interesting ➔ <span className="text-indigo-700 font-bold">more interesting than</span>
                </div>
              </div>
            </div>
          </div>
        ) : currentTopic.id === 'topic-present-simple' ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 text-right">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-sm sm:text-base font-black font-arabic text-zinc-900">
                  قاعدة المفرد والجمع في المضارع البسيط
                </h5>
                <span className="text-xs text-zinc-500 font-arabic">
                  متى نضيف s ومتى يبقى الفعل مجرداً؟
                </span>
              </div>
            </div>
            <div className="bg-zinc-50/70 p-3.5 rounded-xl border border-zinc-200/80 space-y-2">
              <p className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                • مع الفاعل المفرد (He, She, It, Ali, My father): نضيف للفعل <span className="bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold px-2 py-0.5 rounded-md">s / es</span>.
                <br />
                • مع الفاعل الجمع والضمير I (They, We, You, I, The students): الفعل يبقى <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold px-2 py-0.5 rounded-md">Base (مجرداً)</span> بدون أي زيادة.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs sm:text-sm" dir="ltr">
                <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-800 text-left">
                  مفرد: He <span className="text-blue-700 font-bold underline">watches</span> TV every day.
                </div>
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-left">
                  جمع / I: They <span className="text-emerald-700 font-black underline">watch</span> TV every day.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed whitespace-pre-line bg-zinc-50/70 p-4 rounded-2xl border border-zinc-200">
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
                className="p-4 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between shadow-2xs hover:border-blue-200 transition-colors"
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
          <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-4 text-right space-y-2">
            <span className="text-xs font-bold text-amber-900 font-arabic flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>دلائل الزمن المتكررة في جمل الإثبات:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-arabic">
              {currentTopic.timeMarkers.map((tm, idx) => (
                <div key={idx} className="p-2 bg-white rounded-xl border border-zinc-200">
                  • {tm}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* شلون يجي بالامتحان؟ (تطبيقات امتحانية للإثبات مع بناء الجملة خطوة بخطوة وتظليل التغيير) */}
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
