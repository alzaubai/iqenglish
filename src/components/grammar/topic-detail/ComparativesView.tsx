import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';
import { ExamPracticeTab } from './ExamPracticeTab';

interface ComparativesViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const ComparativesView: React.FC<ComparativesViewProps> = ({ currentTopic, onSpeak }) => {
  const [activeSubTab, setActiveSubTab] = useState<'rules' | 'comparative' | 'superlative' | 'practice'>('rules');

  const spellingRules = currentTopic.overview?.spellingRules || [];
  const timeMarkers = currentTopic.overview?.timeMarkers || [];

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* Dedicated Modern Sub-Tabs for Comparatives & Superlatives */}
      <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
        {[
          { id: 'rules', label: '1. قواعد الإملاء والشواذ (er / est)' },
          { id: 'comparative', label: '2. صيغة المقارنة (Comparative: than)' },
          { id: 'superlative', label: '3. صيغة التفضيل (Superlative: the)' },
          { id: 'practice', label: '4. نماذج وتمارين امتحانية' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
              activeSubTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SPELLING RULES & IRREGULAR ADJECTIVES */}
      {activeSubTab === 'rules' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  قواعد إضافة المقارنة والتفضيل للصفات
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تعتمد إضافة (er / est) على عدد مقاطع الصفة ونهايتها الإملائية:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spellingRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {rule.titleAr}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-zinc-200 text-slate-600">
                      قاعدة {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rule.descAr}
                  </p>
                  <div className="space-y-1.5 pt-1 border-t border-zinc-200/60">
                    {rule.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white border border-zinc-200/50"
                      >
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onSpeak(`${ex.base}, ${ex.changed}`)}
                            className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="استمع للنطق"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-slate-900" dir="ltr">
                            {ex.base}
                          </span>
                          <span className="text-slate-400">→</span>
                          <span className="font-mono font-bold text-emerald-700" dir="ltr">
                            {ex.changed}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-arabic">
                          {ex.ar}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Irregular Adjectives Table */}
          {timeMarkers.length > 0 && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 border-b border-amber-200/70 pb-2">
                <span className="text-sm font-black text-amber-900">
                  الصفات الشاذة غير القياسية (حفظ مهم جداً في الامتحان):
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeMarkers.map((marker, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-2xl border border-amber-200/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSpeak(`${marker.marker}, ${marker.ar}`)}
                        className="p-1 rounded text-amber-700 hover:bg-amber-50"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-slate-900" dir="ltr">
                        {marker.marker}
                      </span>
                    </div>
                    <span className="text-xs text-amber-900 font-bold font-arabic">
                      {marker.ar}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMPARATIVE (than) */}
      {activeSubTab === 'comparative' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  صيغة المقارنة بين شيئين أو شخصين (Comparative with &apos;than&apos;)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  نستخدمها للمقارنة بين طرفين، وتتطلب وجود كلمة (than = من) بعد الصفة:
                </p>
              </div>
            </div>

            {/* Formula visual box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold text-blue-900" dir="ltr">
              <span className="bg-white px-2.5 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                Subject 1
              </span>
              <span>+</span>
              <span className="bg-white px-2.5 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                is / are
              </span>
              <span>+</span>
              <span className="bg-blue-600 text-white px-2.5 py-1.5 rounded-xl shadow-2xs">
                adjective-er / more + adj
              </span>
              <span>+</span>
              <span className="bg-emerald-600 text-white px-2.5 py-1.5 rounded-xl shadow-2xs">
                than
              </span>
              <span>+</span>
              <span className="bg-white px-2.5 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                Subject 2
              </span>
            </div>

            {/* Examples from curriculum */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                أمثلة منهجية من كتاب الأول متوسط:
              </span>
              {[
                { en: 'England is colder than Iraq.', ar: 'إنجلترا أكثر برودة من العراق.' },
                { en: 'Autumn is cooler than summer.', ar: 'الخريف ألطف جواً من الصيف.' },
                { en: 'Football is more exciting than tennis.', ar: 'كرة القدم أكثر إثارة وتشويقاً من التنس.' },
                { en: 'My marks are better than last month.', ar: 'درجاتي أفضل من الشهر الماضي (شاذة).' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSpeak(item.en)}
                      className="p-1.5 rounded-xl bg-white border border-zinc-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div>
                      <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                        {item.en}
                      </p>
                      <p className="text-xs text-slate-500 font-arabic mt-0.5">
                        {item.ar}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    مقارنة
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPERLATIVE (the) */}
      {activeSubTab === 'superlative' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  صيغة التفضيل المطلق (Superlative with &apos;the&apos;)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  نستخدمها لتمييز عنصر واحد عن مجموعة كاملة، وتتطلب وجود أداة التعريف (the) قبل الصفة:
                </p>
              </div>
            </div>

            {/* Formula visual box */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold text-indigo-900" dir="ltr">
              <span className="bg-white px-2.5 py-1.5 rounded-xl border border-indigo-200 shadow-2xs">
                Subject
              </span>
              <span>+</span>
              <span className="bg-white px-2.5 py-1.5 rounded-xl border border-indigo-200 shadow-2xs">
                is / are
              </span>
              <span>+</span>
              <span className="bg-indigo-600 text-white px-2.5 py-1.5 rounded-xl shadow-2xs">
                the
              </span>
              <span>+</span>
              <span className="bg-purple-600 text-white px-2.5 py-1.5 rounded-xl shadow-2xs">
                adjective-est / most + adj
              </span>
              <span>+</span>
              <span className="bg-white px-2.5 py-1.5 rounded-xl border border-indigo-200 shadow-2xs">
                Complement (المجموعة أو المكان)
              </span>
            </div>

            {/* Examples from curriculum */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                أمثلة منهج الأول متوسط:
              </span>
              {[
                { en: 'July is the hottest month in Iraq.', ar: 'شهر تموز هو أكثر الشهور حرارة في العراق.' },
                { en: 'Bobsleighing is the fastest winter sport in the world.', ar: 'الزلاجة الجماعية هي أسرع رياضة شتوية في العالم.' },
                { en: 'English is the most interesting subject.', ar: 'اللغة الإنجليزية هي أمتع مادة دراسية.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSpeak(item.en)}
                      className="p-1.5 rounded-xl bg-white border border-zinc-200 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div>
                      <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                        {item.en}
                      </p>
                      <p className="text-xs text-slate-500 font-arabic mt-0.5">
                        {item.ar}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    تفضيل
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EXAM PRACTICE */}
      {activeSubTab === 'practice' && (
        <ExamPracticeTab currentTopic={currentTopic} onSpeak={onSpeak} />
      )}
    </div>
  );
};
