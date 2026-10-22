import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface ComparativesViewProps {
  currentTopic: GrammarTopicData;
  onSpeak: (text: string) => void;
}

export const ComparativesView: React.FC<ComparativesViewProps> = ({ currentTopic, onSpeak }) => {
  const [activeSubTab, setActiveSubTab] = useState<'rules' | 'comparative' | 'superlative' | 'practice'>('rules');

  const spellingRules = currentTopic.overview?.spellingRules || [];
  const timeMarkers = currentTopic.overview?.timeMarkers || [];
  const practiceItems: any[] = (currentTopic as any).examApplications || [];

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
        </div>
      )}

      {/* TAB 2: COMPARATIVE FORMULA WITH THAN */}
      {activeSubTab === 'comparative' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  صيغة المقارنة بين طرفين (Comparative with than)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تُستخدم للمفاضلة بين شخصين أو شيئين بوجود كلمة الربط (than = من):
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200" dir="ltr">
                Comparative Formula
              </span>
            </div>

            {/* Visual Formula Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 px-4 bg-slate-50 rounded-2xl border border-slate-200" dir="ltr">
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-zinc-200 text-zinc-900">
                Noun 1 (الفاعل الأول)
              </span>
              <span className="text-emerald-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-zinc-200 text-zinc-900">
                is / are
              </span>
              <span className="text-emerald-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white font-mono shadow-xs">
                Adj + er / more + Adj
              </span>
              <span className="text-emerald-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-white font-mono shadow-xs">
                than
              </span>
              <span className="text-emerald-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-zinc-200 text-zinc-900">
                Noun 2 (الطرف الثاني)
              </span>
            </div>

            {/* Examples from curriculum */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                أمثلة منهج الأول متوسط (كتاب الطالب والنشاط):
              </span>
              {[
                { en: 'Winter in England is colder than in Iraq.', ar: 'الشتاء في إنجلترا أبرد منه في العراق.' },
                { en: 'Summer is hotter than winter.', ar: 'فصل الصيف أكثر حرارة من فصل الشتاء.' },
                { en: 'Cars are more expensive than bicycles.', ar: 'السيارات أغلى ثمناً من الدراجات الهوائية.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSpeak(item.en)}
                      className="p-1.5 rounded-xl bg-white border border-zinc-200 text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
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
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    مقارنة
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPERLATIVE FORMULA WITH THE */}
      {activeSubTab === 'superlative' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  صيغة التفضيل لمجموعة (Superlative with the)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تُستخدم لتمييز فرد أو شيء واحد كالأعلى في الصفة بين مجموعة كاملة:
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-xl border border-indigo-200" dir="ltr">
                Superlative Formula
              </span>
            </div>

            {/* Visual Formula Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 px-4 bg-slate-50 rounded-2xl border border-slate-200" dir="ltr">
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-zinc-200 text-zinc-900">
                Noun (المفضل)
              </span>
              <span className="text-indigo-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-zinc-200 text-zinc-900">
                is / are
              </span>
              <span className="text-indigo-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white font-mono shadow-xs">
                the
              </span>
              <span className="text-indigo-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-700 text-white font-mono shadow-xs">
                Adj + est / most + Adj
              </span>
              <span className="text-indigo-600 font-black text-base">+</span>
              <span className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-zinc-200 text-zinc-900">
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
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  نماذج أسئلة الامتحانات الشهرية ونصف السنة
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  تدرب على صيغ الأسئلة الوزارية الشائعة في المقارنة والتفضيل:
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
                      السؤال {idx + 1}: {item.examType || 'اختيارات / تصحيح'}
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
