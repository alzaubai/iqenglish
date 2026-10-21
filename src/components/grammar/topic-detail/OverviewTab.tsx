import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Lightbulb, Volume2, Award, Search } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface OverviewTabProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ currentTopic, onSpeak }) => {
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');
  const [verbSearch, setVerbSearch] = useState<string>('');

  const overview = currentTopic.overview;
  if (!overview) return null;

  const filteredVerbs = useMemo(() => {
    if (!overview.textbookVerbs) return [];
    return overview.textbookVerbs.filter((v) => {
      const matchesType = verbFilter === 'all' || v.type === verbFilter;
      const q = verbSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.ar.includes(q);
      return matchesType && matchesSearch;
    });
  }, [overview.textbookVerbs, verbFilter, verbSearch]);

  return (
    <div className="space-y-6">
      {/* Card 1.1: الاستخدام / لماذا ومتى نستخدم هذا الزمن؟ */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600 text-white rounded-xl">
              <BookOpen className="w-5 h-5" />
            </span>
            <h4 className="text-base sm:text-lg font-black text-blue-950 font-arabic">
              {overview.usageTitleAr}
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-200"
            dir="ltr"
          >
            Usage & Meaning
          </span>
        </div>

        <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-2xl shadow-2xs space-y-2">
          <p className="text-sm sm:text-base font-bold text-zinc-900 font-arabic leading-relaxed">
            {overview.usageDescAr}
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-700 font-arabic pt-1">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              {overview.quickNoteAr ||
                'ملاحظة فهم سريعة: راجع القاعدة وأمثلتها بدقة قبل الانتقال إلى التمارين.'}
            </span>
          </div>
        </div>
      </div>

      {/* Card 1.2: دلالات الزمن (Time Markers) */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500 text-white rounded-xl">
              <Lightbulb className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base sm:text-lg font-black text-amber-950 font-arabic">
                {currentTopic.id === 'u2-topic-comparatives'
                  ? 'الكلمات المفتاحية والدلالات في المقارنة والتفضيل'
                  : `دلالات زمن ${currentTopic.titleAr} (Time Markers)`}
              </h4>
              <span className="text-xs text-zinc-500 font-arabic">
                {currentTopic.id === 'u2-topic-comparatives'
                  ? 'الكلمات التي تحدد اختيار المقارنة (than) أو التفضيل (the) في الامتحان'
                  : `إذا وجدت إحدى هذه الكلمات في جملة الامتحان ➔ فالحل يكون في زمن ${currentTopic.titleAr}!`}
              </span>
            </div>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200"
            dir="ltr"
          >
            Keywords
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {overview.timeMarkers.map((tm, idx) => (
            <div
              key={idx}
              className="p-4 bg-zinc-50/70 hover:bg-zinc-50 border border-zinc-200 rounded-2xl transition-all space-y-2.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 bg-amber-600 text-white rounded-xl font-mono font-bold text-sm shadow-2xs"
                  dir="ltr"
                >
                  {tm.marker}
                </span>
                <span className="text-xs font-bold text-amber-950 font-arabic">
                  {tm.ar}
                </span>
              </div>

              <div className="p-3 bg-white border border-zinc-200 rounded-xl flex items-center justify-between">
                <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                  {tm.exampleEn}
                </p>
                <button
                  type="button"
                  onClick={() => onSpeak(tm.exampleEn)}
                  className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer shrink-0 shadow-2xs"
                  title="استمع للمثال"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 1.3: قواعد الإملاء */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-600 text-white rounded-xl">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base sm:text-lg font-black text-emerald-950 font-arabic">
                {overview.spellingTitleAr || 'قواعد إضافة (ed) للأفعال القياسية'}
              </h4>
              <span className="text-xs text-zinc-500 font-arabic">
                {overview.spellingSubtitleAr ||
                  'مهمة جداً في سؤال الإملاء وسؤال تصحيح الفعل للامتحانات الشهرية'}
              </span>
            </div>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200"
            dir="ltr"
          >
            Spelling Rules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overview.spellingRules.map((rule, idx) => (
            <div key={idx} className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-2xl space-y-2.5">
              <h5 className="text-sm font-black text-emerald-950 font-arabic">
                {rule.titleAr}
              </h5>
              <p className="text-xs text-zinc-600 font-arabic leading-relaxed">
                {rule.descAr}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 font-sans" dir="ltr">
                {rule.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="p-2.5 bg-white border border-zinc-200 rounded-xl text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-medium">{ex.base}</span>
                      <span className="text-zinc-400">➔</span>
                      <strong className="text-xs font-bold text-emerald-700 font-mono">
                        {ex.changed}
                      </strong>
                      <button
                        type="button"
                        onClick={() => onSpeak(`${ex.base}, ${ex.changed}`)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                        title="استمع"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-arabic mt-1 text-right" dir="rtl">
                      {ex.ar}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 1.4: جدول أفعال وصفات كتاب الصف الأول المتوسط المقررة */}
      {overview.textbookVerbs && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-600 text-white rounded-xl">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-indigo-950 font-arabic">
                    {currentTopic.id === 'u2-topic-future-will'
                      ? 'أفعال الطقس والأنشطة المستقبلية مع will (المقررة في المنهاج)'
                      : currentTopic.id === 'u2-topic-comparatives'
                      ? 'جدول صفات المقارنة والتفضيل المقررة في المنهاج'
                      : currentTopic.id === 'topic-present-simple'
                      ? 'جدول أفعال المضارع البسيط وإضافة s الشخص الثالث (المقررة في المنهاج)'
                      : 'جدول أفعال كتاب الصف الأول المتوسط (المقررة في المنهاج)'}
                  </h4>
                  <span className="text-xs text-zinc-500 font-arabic">
                    {currentTopic.id === 'topic-past-continuous'
                      ? 'أفعال منهجية مقررة مع تصريف المستمر (V-ing) وتطبيق قواعد الإملاء'
                      : currentTopic.id === 'u2-topic-future-will'
                      ? 'جميع الأفعال بعد will تأتي مصدراً مجرداً (Base) خالياً تماماً من أي إضافة أو شذوذ'
                      : currentTopic.id === 'u2-topic-comparatives'
                      ? 'صفات المقارنة والتفضيل المنهجية للطقس والرياضات مستخرجة من كتاب الطالب والنشاط'
                      : currentTopic.id === 'topic-present-simple'
                      ? 'أفعال روتينية وحياتية مع تطبيق قواعد إضافة s الشخص الثالث وحالات es والشذوذ'
                      : 'أفعال قياسية (Regular) وأفعال شاذة (Irregular) مستخرجة من كتاب الطالب وكتاب النشاط'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-900 rounded-xl font-arabic border border-indigo-200">
                {overview.textbookVerbs.length}{' '}
                {currentTopic.id === 'u2-topic-comparatives' ? 'صفة منهجية' : 'فعل منهجي'}
              </span>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-50/70 p-3 rounded-2xl border border-zinc-200 shadow-2xs">
            {currentTopic.id === 'u2-topic-future-will' ? (
              <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold font-arabic border border-blue-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>قاعدة ذهبية: جميع الأفعال بعد will تبقى مصادر مجردة (Base) بدون أي تغيير أو شذوذ</span>
              </div>
            ) : currentTopic.id === 'topic-past-continuous' ? (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold font-arabic border border-emerald-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>قاعدة ذهبية: جميع أفعال اللغة الإنجليزية تأخذ ing دون شذوذ، مع مراعاة الحالات الإملائية</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setVerbFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    verbFilter === 'all'
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  الكل ({overview.textbookVerbs.length})
                </button>
                <button
                  type="button"
                  onClick={() => setVerbFilter('regular')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    verbFilter === 'regular'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {currentTopic.id === 'topic-past-continuous'
                    ? `إضافة مباشرة (${overview.textbookVerbs.filter((v) => v.type === 'regular').length})`
                    : currentTopic.id === 'u2-topic-comparatives'
                    ? `منتظمة er/est (${overview.textbookVerbs.filter((v) => v.type === 'regular').length})`
                    : currentTopic.id === 'topic-present-simple'
                    ? `إضافة s فقط (${overview.textbookVerbs.filter((v) => v.type === 'regular').length})`
                    : `قياسية Regular (${overview.textbookVerbs.filter((v) => v.type === 'regular').length})`}
                </button>
                <button
                  type="button"
                  onClick={() => setVerbFilter('irregular')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    verbFilter === 'irregular'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {currentTopic.id === 'topic-past-continuous'
                    ? `تغيير إملائي (${overview.textbookVerbs.filter((v) => v.type === 'irregular').length})`
                    : currentTopic.id === 'u2-topic-comparatives'
                    ? `شاذة Irregular (${overview.textbookVerbs.filter((v) => v.type === 'irregular').length})`
                    : currentTopic.id === 'topic-present-simple'
                    ? `إضافة es أو شاذة (${overview.textbookVerbs.filter((v) => v.type === 'irregular').length})`
                    : `شاذة Irregular (${overview.textbookVerbs.filter((v) => v.type === 'irregular').length})`}
                </button>
              </div>
            )}

            {/* Search input */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                value={verbSearch}
                onChange={(e) => setVerbSearch(e.target.value)}
                placeholder="ابحث عن فعل..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-arabic text-right"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 text-zinc-900 font-bold font-arabic border-b border-zinc-200">
                  <th className="p-3">
                    {currentTopic.id === 'u2-topic-comparatives'
                      ? 'الصفة (Adjective)'
                      : 'المصدر المجرد (Base)'}
                  </th>
                  <th className="p-3">
                    {currentTopic.id === 'topic-past-continuous'
                      ? 'صيغة المستمر (V-ing)'
                      : currentTopic.id === 'u2-topic-future-will'
                      ? 'صيغة المستقبل (will + Base)'
                      : currentTopic.id === 'u2-topic-comparatives'
                      ? 'المقارنة والتفضيل (er / est)'
                      : currentTopic.id === 'topic-present-simple'
                      ? 'صيغة المفرد (Verb + s/es)'
                      : 'صيغة الماضي (Past)'}
                  </th>
                  <th className="p-3">المعنى بالعربية</th>
                  <th className="p-3">
                    {currentTopic.id === 'u2-topic-comparatives'
                      ? 'نوع الصفة / القاعدة'
                      : currentTopic.id === 'topic-past-continuous'
                      ? 'قاعدة الإضافة'
                      : currentTopic.id === 'u2-topic-future-will'
                      ? 'حالة الفعل بعد will'
                      : currentTopic.id === 'topic-present-simple'
                      ? 'قاعدة إضافة s'
                      : 'النوع'}
                  </th>
                  <th className="p-3">
                    {currentTopic.id === 'u2-topic-future-will'
                      ? 'جملة منهجية من الوحدة الثانية'
                      : currentTopic.id === 'topic-present-simple'
                      ? 'الملاحظة الإملائية'
                      : 'ملاحظات وموقع المنهج'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredVerbs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-zinc-400 font-arabic">
                      لا توجد أفعال مطابقة للبحث
                    </td>
                  </tr>
                ) : (
                  filteredVerbs.map((v, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="p-3 font-bold font-mono text-zinc-900" dir="ltr">
                        <div className="flex items-center gap-2">
                          <span>{v.base}</span>
                          <button
                            type="button"
                            onClick={() => onSpeak(v.base)}
                            className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                            title="استمع للفعل المجرد"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 font-bold font-mono text-sm" dir="ltr">
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              v.type === 'regular'
                                ? 'text-blue-600 font-bold'
                                : 'text-purple-700 font-black'
                            }
                          >
                            {v.past}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onSpeak(
                                currentTopic.id === 'u2-topic-future-will'
                                  ? v.past
                                  : v.past.replace('/', 'and')
                              )
                            }
                            className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
                            title="استمع للصيغة"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 font-arabic font-medium text-zinc-800">{v.ar}</td>
                      <td className="p-3 font-arabic">
                        {currentTopic.id === 'u2-topic-comparatives' ? (
                          v.type === 'regular' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                              منتظم (er / est)
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
                              شاذ (يحفظ)
                            </span>
                          )
                        ) : currentTopic.id === 'u2-topic-future-will' ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
                            مصدر مجرد (Base)
                          </span>
                        ) : currentTopic.id === 'topic-past-continuous' ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                            فعل مستمر (V-ing)
                          </span>
                        ) : currentTopic.id === 'topic-present-simple' ? (
                          v.type === 'regular' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
                              قياسي (+s / +es)
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
                              شاذ (have ➔ has)
                            </span>
                          )
                        ) : v.type === 'regular' ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
                            قياسي (ed)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
                            شاذ (يحفظ)
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-arabic text-zinc-500 text-[11px]">
                        {v.note || 'منهج الأول متوسط'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
