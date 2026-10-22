import React, { useState } from 'react';
import { Volume2, Languages, Sparkles, CheckCircle2, BookOpen, Table, HelpCircle } from 'lucide-react';
import { unit3GrammarLessons } from '../../../data/unit3GrammarTopics';

interface Unit3GrammarViewProps {
  topicId: string;
  onSpeak: (text: string) => void;
}

export const Unit3GrammarView: React.FC<Unit3GrammarViewProps> = ({ topicId, onSpeak }) => {
  // Find matching lesson & topic from unit3GrammarLessons
  const matchedLesson = unit3GrammarLessons.find((l) =>
    l.topics.some((t) => t.id === topicId)
  ) || unit3GrammarLessons[0];
  const currentTopic =
    matchedLesson.topics.find((t) => t.id === topicId) || matchedLesson.topics[0];

  // Sub-tabs for topic 1 (Present Perfect)
  const [activePresPerfTab, setActivePresPerfTab] = useState<'affirmative' | 'negative' | 'question'>('affirmative');

  // Filter for verb table in topic 2
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectQuizOption = (quizId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optionIndex }));
  };

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* 1. TOPIC HEADER CARD */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-7 shadow-xs text-right">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-zinc-900 text-white">
            UNIT 3 • {matchedLesson.titleAr.split(':')[0]}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            {currentTopic.titleEn}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          {currentTopic.titleAr}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {currentTopic.summaryAr}
        </p>
      </div>

      {/* VIEW A: TOPIC 1 - PRESENT PERFECT TENSE */}
      {currentTopic.id === 'u3-l1-pres-perf' && (
        <div className="space-y-5">
          {/* Sub-Tabs: Affirmative, Negative, Question */}
          <div className="bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap gap-2">
            {[
              { id: 'affirmative', label: '1. الإثبات (have / has + p.p)' },
              { id: 'negative', label: "2. النفي (haven't / hasn't + p.p)" },
              { id: 'question', label: '3. الاستفهام (Have / Has + فاعل)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePresPerfTab(tab.id as any)}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activePresPerfTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {currentTopic.rules.map((rule) => {
            const isMatch =
              (activePresPerfTab === 'affirmative' && rule.id.includes('affirmative')) ||
              (activePresPerfTab === 'negative' && rule.id.includes('negative')) ||
              (activePresPerfTab === 'question' && rule.id.includes('question'));

            if (!isMatch) return null;

            return (
              <div key={rule.id} className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {rule.titleAr}
                  </h4>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200" dir="ltr">
                    {rule.titleEn}
                  </span>
                </div>

                {/* Formula Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-center" dir="ltr">
                  <span className="font-mono text-sm sm:text-base font-black text-emerald-800 block">
                    {rule.formula}
                  </span>
                  {rule.formulaNoteAr && (
                    <span className="text-xs font-bold text-slate-600 font-arabic block mt-1" dir="rtl">
                      {rule.formulaNoteAr}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rule.explanationAr}
                </p>

                {/* Examples */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold text-slate-700 block">
                    أمثلة توضيحية من كتاب الطالب:
                  </span>
                  {rule.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:bg-white transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onSpeak(ex.en)}
                          className="p-1.5 rounded-xl bg-white border border-zinc-200 text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <div>
                          <p className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                            {ex.en}
                          </p>
                          <p className="text-xs text-slate-500 font-arabic mt-0.5">
                            {ex.ar}
                          </p>
                        </div>
                      </div>
                      {ex.highlightWord && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200" dir="ltr">
                          {ex.highlightWord}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW B: TOPIC 2 - REGULAR & IRREGULAR PAST PARTICIPLES TABLE */}
      {currentTopic.id === 'u3-l2-verb-forms' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Table className="w-5 h-5 text-indigo-600" />
                  <span>جدول تصاريف أفعال الوحدة الثالثة المقررة</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  احفظ تصاريف الأفعال (مصدر • ماضي بسيط • تصريف ثالث):
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
                {[
                  { id: 'all', label: 'جميع الأفعال' },
                  { id: 'regular', label: 'القياسية (ed)' },
                  { id: 'irregular', label: 'الشاذة (حفظ)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setVerbFilter(f.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                      verbFilter === f.id
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verb Table */}
            {currentTopic.verbTables?.map((tbl, tblIdx) => {
              const filteredRows = tbl.rows.filter(
                (r) => verbFilter === 'all' || r.type === verbFilter
              );

              return (
                <div key={tblIdx} className="overflow-x-auto">
                  <table className="w-full text-right text-xs border border-zinc-200 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-900 text-white font-arabic">
                      <tr>
                        <th className="p-3">المصدر (Base)</th>
                        <th className="p-3">الماضي (Past)</th>
                        <th className="p-3">التصريف الثالث (p.p)</th>
                        <th className="p-3">المعنى بالعربية</th>
                        <th className="p-3">النوع</th>
                        <th className="p-3 text-center">نطق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white">
                      {filteredRows.map((r, rIdx) => {
                        const ppForm =
                          r.base === 'sweep' ? 'swept' :
                          r.base === 'go' ? 'gone' :
                          r.base === 'see' ? 'seen' :
                          r.base === 'eat' ? 'eaten' :
                          r.base === 'drink' ? 'drunk' :
                          r.base === 'do' ? 'done' :
                          r.base === 'write' ? 'written' :
                          r.base === 'ride' ? 'ridden' :
                          r.base === 'give' ? 'given' :
                          r.past;

                        return (
                          <tr key={rIdx} className="hover:bg-zinc-50 transition-colors">
                            <td className="p-3 font-mono font-bold text-slate-900" dir="ltr">
                              {r.base}
                            </td>
                            <td className="p-3 font-mono text-slate-700" dir="ltr">
                              {r.past}
                            </td>
                            <td className="p-3 font-mono font-black text-indigo-700 bg-indigo-50/40" dir="ltr">
                              {ppForm}
                            </td>
                            <td className="p-3 font-arabic text-slate-700 font-bold">
                              {r.meaningAr}
                            </td>
                            <td className="p-3 font-arabic">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  r.type === 'irregular'
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                              >
                                {r.type === 'irregular' ? 'شاذ' : 'قياسي'}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <button
                                type="button"
                                onClick={() => onSpeak(`${r.base}, ${r.past}, ${ppForm}`)}
                                className="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW C: TOPIC 3 - ADVERBS OF MANNER */}
      {currentTopic.id === 'u3-l3-adverbs' && (
        <div className="space-y-5">
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  قواعد تحويل الصفات إلى ظروف حال (Adverbs of Manner)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  ظرف الحال يصف طريقة حدوث الفعل ويُشتق من الصفة:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTopic.rules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2 hover:bg-white transition-all">
                  <span className="text-xs font-bold text-slate-800 block">
                    {rule.titleAr}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white border border-zinc-200 font-mono text-xs font-bold text-slate-900" dir="ltr">
                    {rule.formula}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rule.explanationAr}
                  </p>
                  <div className="space-y-1 pt-1">
                    {rule.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white border border-zinc-200/50">
                        <span className="font-mono text-slate-900" dir="ltr">
                          {ex.en}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSpeak(ex.en)}
                          className="p-1 text-amber-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ SECTION (IF PRESENT) */}
      {currentTopic.quiz && currentTopic.quiz.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                اختبار تفاعلي سريع للموضوع
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                اختر الإجابة الصحيحة واكتشف الحل مع التعليل الفوري:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentTopic.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      السؤال {qIdx + 1}:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {q.questionTextAr && (
                        <button
                          type="button"
                          onClick={() => toggleTranslation(q.id)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border font-arabic transition-all flex items-center gap-1 cursor-pointer ${
                            visibleTranslations[q.id]
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                              : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                          }`}
                          title="ترجمة السؤال"
                        >
                          <Languages className="w-3 h-3 text-indigo-600" />
                          <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onSpeak(q.questionTextEn)}
                        className="p-1 text-slate-400 hover:text-indigo-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 text-left" dir="ltr">
                    {q.questionTextEn}
                  </p>
                  {q.questionTextAr && visibleTranslations[q.id] && (
                    <p className="text-xs text-slate-600 font-arabic p-2 bg-white rounded-lg border border-zinc-200 text-right animate-in fade-in duration-150" dir="rtl">
                      {q.questionTextAr}
                    </p>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === q.correctIndex;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                            isAnswered
                              ? isOptionCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                : isOptionSelected
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white border-zinc-200 text-slate-400 opacity-60'
                              : 'bg-white border-zinc-200 hover:border-slate-800 text-slate-800'
                          }`}
                          dir="ltr"
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3 rounded-xl border text-xs font-arabic ${
                      isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <strong>{isCorrect ? 'إجابة صحيحة ممتاز! ' : 'انتبه للحل الصحيح: '}</strong>
                      <span>{q.explanationAr}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
