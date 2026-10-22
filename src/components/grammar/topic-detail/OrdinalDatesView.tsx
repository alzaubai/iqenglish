import React, { useState } from 'react';
import { Volume2, Calendar, Clock, Sparkles, BookOpen } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';
import { ExamPracticeTab } from './ExamPracticeTab';

interface OrdinalDatesViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const OrdinalDatesView: React.FC<OrdinalDatesViewProps> = ({ currentTopic, onSpeak }) => {
  const [activeTab, setActiveTab] = useState<'ordinals' | 'dates' | 'prepositions' | 'practice'>('ordinals');

  const ordinalsList = [
    { num: '1st', word: 'first', ar: 'الأول' },
    { num: '2nd', word: 'second', ar: 'الثاني' },
    { num: '3rd', word: 'third', ar: 'الثالث' },
    { num: '4th', word: 'fourth', ar: 'الرابع' },
    { num: '5th', word: 'fifth', ar: 'الخامس (تغير ve إلى f)' },
    { num: '6th', word: 'sixth', ar: 'السادس' },
    { num: '7th', word: 'seventh', ar: 'السابع' },
    { num: '8th', word: 'eighth', ar: 'الثامن (إضافة h فقط)' },
    { num: '9th', word: 'ninth', ar: 'التاسع (حذف e)' },
    { num: '10th', word: 'tenth', ar: 'العاشر' },
    { num: '11th', word: 'eleventh', ar: 'الحادي عشر' },
    { num: '12th', word: 'twelfth', ar: 'الثاني عشر (ve تصبح f)' },
    { num: '13th', word: 'thirteenth', ar: 'الثالث عشر' },
    { num: '20th', word: 'twentieth', ar: 'العشرون (y تصبح ie)' },
    { num: '21st', word: 'twenty-first', ar: 'الحادي والعشرون' },
    { num: '22nd', word: 'twenty-second', ar: 'الثاني والعشرون' },
    { num: '23rd', word: 'twenty-third', ar: 'الثالث والعشرون' },
    { num: '30th', word: 'thirtieth', ar: 'الثلاثون' },
    { num: '31st', word: 'thirty-first', ar: 'الحادي والثلاثون' },
  ];

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* Sub-Tabs Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
        {[
          { id: 'ordinals', label: '1. جدول الأعداد الترتيبية (1st - 31st)' },
          { id: 'dates', label: '2. قراءة وكتابة التواريخ (Saying & Writing)' },
          { id: 'prepositions', label: '3. حروف الجر مع التواريخ (in / on)' },
          { id: 'practice', label: '4. تمارين ونماذج امتحانية' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ORDINALS TABLE */}
      {activeTab === 'ordinals' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  الأعداد الترتيبية (Ordinal Numbers)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تُستخدم لترتيب الأيام والمراكز، وتتميز بنهايات (st, nd, rd, th):
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {ordinalsList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs sm:text-sm font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                      {item.num}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSpeak(item.word)}
                      className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                      title="استمع للنطق"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className="font-mono text-xs font-bold text-slate-900 block" dir="ltr">
                      {item.word}
                    </span>
                    <span className="text-[11px] text-slate-500 font-arabic block mt-0.5">
                      {item.ar}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WRITING & SAYING DATES */}
      {activeTab === 'dates' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  الفرق بين كتابة التاريخ ولفظه شفهياً
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  في كتابة التاريخ نكتب رقماً مختصراً، لكن عند القراءة نضيف (the) و (of):
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-900 block">
                  1. الطريقة الشائعة (اليوم ثم الشهر):
                </span>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <p className="text-xs text-slate-500">نكتب (Writing):</p>
                  <p className="font-mono font-bold text-sm text-slate-900" dir="ltr">
                    1st July أو 1 July
                  </p>
                  <p className="text-xs text-slate-500 pt-1">نلفظ شفهياً (Saying):</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSpeak('the first of July')}
                      className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <p className="font-mono font-bold text-sm text-emerald-700" dir="ltr">
                      &quot;the first of July&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <span className="text-xs font-bold text-purple-900 block">
                  2. الطريقة الثانية (الشهر ثم اليوم):
                </span>
                <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-1">
                  <p className="text-xs text-slate-500">نكتب (Writing):</p>
                  <p className="font-mono font-bold text-sm text-slate-900" dir="ltr">
                    July 1st أو July 1
                  </p>
                  <p className="text-xs text-slate-500 pt-1">نلفظ شفهياً (Saying):</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSpeak('July the first')}
                      className="p-1 text-purple-700 hover:bg-purple-50 rounded"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <p className="font-mono font-bold text-sm text-purple-700" dir="ltr">
                      &quot;July the first&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PREPOSITIONS IN / ON */}
      {activeTab === 'prepositions' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  قواعد حروف الجر مع التواريخ والأيام والشهور
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  سؤال وزاري متكرر جداً في الاختيارات بين (in) و (on):
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-emerald-900" dir="ltr">
                    on + الأيام والتواريخ الكاملة
                  </span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-emerald-800 border border-emerald-200">
                    أيام محددة
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  نستخدم (on) مع أيام الأسبوع ومع أي تاريخ محدد بيوم كامل:
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 font-mono text-xs font-bold text-slate-900 space-y-1" dir="ltr">
                  <div>• on Monday, on Friday</div>
                  <div>• on the 1st of July, on 4th October</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-blue-900" dir="ltr">
                    in + الأشهر والسنوات والفصول
                  </span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-blue-800 border border-blue-200">
                    فترات طويلة
                  </span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  نستخدم (in) إذا جاء اسم الشهر مفرداً بدون يوم، أو سنة، أو فصل من فصول السنة:
                </p>
                <div className="p-3 bg-white rounded-xl border border-blue-200 font-mono text-xs font-bold text-slate-900 space-y-1" dir="ltr">
                  <div>• in July, in October</div>
                  <div>• in summer, in winter, in 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE */}
      {activeTab === 'practice' && (
        <ExamPracticeTab currentTopic={currentTopic} onSpeak={onSpeak} />
      )}
    </div>
  );
};
