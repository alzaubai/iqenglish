import React, { useState } from 'react';
import { Volume2, Calendar, Clock, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

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

  const practiceItems: any[] = (currentTopic as any).examApplications || [];

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

      {/* TAB 2: WRITING VS SAYING DATES */}
      {activeTab === 'dates' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  الفرق بين كتابة ونطق التواريخ (Writing vs. Saying Dates)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  في كتاب الطالب صفحة 19، نكتب التاريخ باختصار ولكن ننطقه بإضافة (the) و (of):
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200" dir="ltr">
                Book P.19
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  طريقة الكتابة (Written Form):
                </span>
                <p className="text-xs text-slate-500">
                  نكتب اليوم كرقم ترتيبي يليه الشهر بدون the وبدون of:
                </p>
                <div className="p-3 bg-white rounded-xl border border-zinc-200 font-mono text-sm font-bold text-slate-900" dir="ltr">
                  1st July &nbsp;•&nbsp; 23rd March &nbsp;•&nbsp; 14th July
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                <span className="text-xs font-bold text-indigo-900 block">
                  طريقة النطق الشفوي (Spoken Form):
                </span>
                <p className="text-xs text-indigo-700">
                  عند القراءة الصوتية نضيف أداة التعريف (the) وكلمة (of):
                </p>
                <div className="p-3 bg-white rounded-xl border border-indigo-200 font-mono text-sm font-bold text-indigo-950" dir="ltr">
                  the first of July &nbsp;•&nbsp; the twenty-third of March
                </div>
              </div>
            </div>

            {/* Interactive Audio Examples */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                أمثلة تدريبية ناطقة من المنهاج:
              </span>
              {[
                { written: '1st July', spoken: 'the first of July', ar: 'الأول من شهر تموز' },
                { written: '23rd March', spoken: 'the twenty-third of March', ar: 'الثالث والعشرون من شهر آذار' },
                { written: '25th December', spoken: 'the twenty-fifth of December', ar: 'الخامس والعشرون من شهر كانون الأول' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSpeak(item.spoken)}
                      className="p-1.5 rounded-xl bg-white border border-zinc-200 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500" dir="ltr">
                          كتابة: {item.written}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-xs font-mono font-bold text-indigo-700" dir="ltr">
                          نطقاً: "{item.spoken}"
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-arabic mt-0.5">
                        {item.ar}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PREPOSITIONS IN VS ON */}
      {activeTab === 'prepositions' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  حروف الجر مع التواريخ (Prepositions of Time: in vs. on)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  قاعدة وزارية مهمة تتكرر في كافة الامتحانات الشهرية:
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200" dir="ltr">
                in vs on
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-emerald-900" dir="ltr">
                    on + الأيام والتواريخ الكاملة
                  </span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-emerald-800 border border-emerald-200">
                    أيام وتواريخ
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  نستخدم (on) دائماً إذا وجدنا يوم من أيام الأسبوع أو تاريخاً محدداً برقم اليوم:
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
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  نماذج أسئلة الامتحانات على التواريخ والأعداد
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  أسئلة اختيارات وإملاء من كتاب النشاط وامتحانات نصف السنة:
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {practiceItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-white transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      السؤال {idx + 1}: {item.examType || 'اختيارات / حروف جر'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSpeak(item.sentence)}
                      className="p-1 text-slate-500 hover:text-slate-800"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                    {item.sentence}
                  </p>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <strong className="block mb-0.5">الحل الصحيح والتعليل:</strong>
                    <span>{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
