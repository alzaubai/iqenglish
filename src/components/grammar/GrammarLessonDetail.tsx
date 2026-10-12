import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Volume2,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Search
} from 'lucide-react';
import { GrammarLesson } from '../../types/grammar';
import { SpeechEngine } from '../../utils/speech';
import { IraqiTeacherGrammarLesson1 } from './IraqiTeacherGrammarLesson1';
import { IraqiTeacherGrammarLesson2 } from './IraqiTeacherGrammarLesson2';

interface GrammarLessonDetailProps {
  lesson: GrammarLesson;
  onBackToLessons: () => void;
  onBackToUnits: () => void;
  onSelectLesson: (lessonId: string) => void;
  totalLessonsInUnit: number;
}

export const GrammarLessonDetail: React.FC<GrammarLessonDetailProps> = ({
  lesson,
  onBackToLessons,
  onBackToUnits,
  onSelectLesson,
}) => {
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);
  const [verbFilter, setVerbFilter] = useState<'all' | 'regular' | 'irregular'>('all');
  const [verbSearch, setVerbSearch] = useState<string>('');

  // Quiz State: map of questionId -> selectedOptionIndex
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const handleSpeak = (text: string) => {
    setPlayingAudioText(text);
    SpeechEngine.speakText(text, {
      rate: 0.85,
      onEnd: () => setPlayingAudioText(null),
      onError: () => setPlayingAudioText(null),
    });
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Navigation & Lesson Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToLessons}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لقائمة دروس القواعد</span>
          </button>
          <button
            onClick={onBackToUnits}
            className="px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
          >
            قائمة الوحدات
          </button>
        </div>

        {/* Quick switcher between lesson 1 and 2 */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => onSelectLesson('grammar-u1-l1')}
            disabled={lesson.lessonNumber === 1}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              lesson.lessonNumber === 1
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title="الدرس السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-3 py-1 bg-zinc-100 text-zinc-800 rounded-xl font-arabic">
            الدرس {lesson.lessonNumber} من 2 (المتاحين)
          </span>

          <button
            onClick={() => onSelectLesson('grammar-u1-l2')}
            disabled={lesson.lessonNumber === 2}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              lesson.lessonNumber === 2
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title="الدرس التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-xs text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono">
              UNIT {lesson.unitNumber} • LESSON {lesson.lessonNumber}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2.5 font-arabic">
              {lesson.titleAr}
            </h2>
            <p className="text-sm text-zinc-500 font-sans mt-0.5" dir="ltr">
              {lesson.titleEn}
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-3 leading-relaxed">
              {lesson.subtitleAr}
            </p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-center shrink-0 self-start sm:self-center">
            <span className="text-xs text-zinc-500 font-arabic block">المنهاج الرسمي</span>
            <span className="text-xs font-bold text-zinc-900 font-arabic block mt-0.5">
              الأول المتوسط
            </span>
          </div>
        </div>
      </div>

      {/* Topics Content */}
      {lesson.lessonNumber === 1 ? (
        <IraqiTeacherGrammarLesson1 />
      ) : lesson.lessonNumber === 2 ? (
        <IraqiTeacherGrammarLesson2 />
      ) : (
        <div className="space-y-8">
          {lesson.topics.map((topic, topicIdx) => (
            <div key={topic.id} className="space-y-6">
              {/* Topic Summary Card */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs text-right">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-900 text-amber-400 flex items-center justify-center font-black text-sm font-mono">
                    {topicIdx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 font-arabic">
                    {topic.titleAr}
                  </h3>
                </div>
                <p className="text-sm text-zinc-700 font-arabic leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
                  {topic.summaryAr}
                </p>
              </div>

              {/* Rules Breakdown */}
              <div className="space-y-5">
                {topic.rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs text-right"
                  >
                    {/* Rule Header */}
                    <div className="bg-zinc-50/80 border-b border-zinc-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-zinc-900 font-arabic">
                        {rule.titleAr}
                      </h4>
                      {rule.titleEn && (
                        <span className="text-xs font-medium text-zinc-500 font-sans" dir="ltr">
                          {rule.titleEn}
                        </span>
                      )}
                    </div>

                    <div className="p-5 sm:p-6 space-y-5">
                      {/* Formula Box - Light & Clean */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-950 p-5 sm:p-6 rounded-2xl shadow-xs space-y-2">
                        <div className="text-[11px] font-bold tracking-wider uppercase text-blue-800 font-mono">
                          صيغة القاعدة (Formula):
                        </div>
                        <div
                          className="text-base sm:text-lg font-bold text-blue-950 font-mono tracking-wide leading-relaxed"
                          dir="ltr"
                        >
                          {rule.formula}
                        </div>
                        {rule.formulaNoteAr && (
                          <div className="text-xs text-blue-900 font-arabic pt-2 border-t border-blue-200/80">
                            <span className="font-bold text-blue-950">ملاحظة:</span> {rule.formulaNoteAr}
                          </div>
                        )}
                      </div>

                      {/* Explanation */}
                      <div className="text-sm text-zinc-700 font-arabic leading-relaxed">
                        {rule.explanationAr}
                      </div>

                      {/* Real Curriculum Examples */}
                      <div className="space-y-2.5 pt-2">
                        <div className="text-xs font-bold text-zinc-800 font-arabic flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                          <span>أمثلة ناطقة من المنهج:</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {rule.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-200 rounded-2xl p-4 transition-colors flex flex-col justify-between"
                            >
                              <div className="space-y-1.5">
                                <p className="text-sm sm:text-base font-bold text-zinc-900 font-sans tracking-tight" dir="ltr">
                                  {ex.en}
                                </p>
                                <p className="text-xs sm:text-sm text-zinc-600 font-arabic">
                                  {ex.ar}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-zinc-200/60 mt-3 flex justify-end">
                                <button
                                  onClick={() => handleSpeak(ex.en)}
                                  className={`px-3 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                                    playingAudioText === ex.en
                                      ? 'bg-zinc-900 text-white border-zinc-900 ring-2 ring-zinc-400'
                                      : 'bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-200 shadow-2xs'
                                  }`}
                                  title="استمع للنطق الإنجليزي"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span className="font-arabic text-[11px]">
                                    {playingAudioText === ex.en ? 'جاري النطق...' : 'استماع'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verb Table (if present) */}
              {topic.verbTables && topic.verbTables.length > 0 && (
                <div className="space-y-4">
                  {topic.verbTables.map((vt, vtIdx) => {
                    const filteredRows = vt.rows.filter((row) => {
                      const matchesFilter =
                        verbFilter === 'all' || row.type === verbFilter;
                      const matchesSearch =
                        row.base.toLowerCase().includes(verbSearch.toLowerCase()) ||
                        row.past.toLowerCase().includes(verbSearch.toLowerCase()) ||
                        row.meaningAr.includes(verbSearch);
                      return matchesFilter && matchesSearch;
                    });

                    return (
                      <div
                        key={vtIdx}
                        className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-xs space-y-4 text-right"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-bold text-zinc-900 font-arabic flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-zinc-900" />
                              <span>{vt.titleAr}</span>
                            </h4>
                            {vt.descriptionAr && (
                              <p className="text-xs text-zinc-500 font-arabic mt-1">
                                {vt.descriptionAr}
                              </p>
                            )}
                          </div>

                          {/* Search & Filter Controls */}
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                              <input
                                type="text"
                                value={verbSearch}
                                onChange={(e) => setVerbSearch(e.target.value)}
                                placeholder="ابحث عن فعل..."
                                className="px-3 py-1.5 pl-8 text-xs rounded-xl border border-zinc-200 focus:outline-hidden focus:border-zinc-900 w-36 font-arabic bg-zinc-50/50"
                              />
                              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                            </div>
                            <div className="flex rounded-xl border border-zinc-200 p-1 bg-zinc-50 text-xs">
                              <button
                                onClick={() => setVerbFilter('all')}
                                className={`px-2.5 py-1 text-xs font-bold rounded-lg font-arabic transition-all cursor-pointer ${
                                  verbFilter === 'all'
                                    ? 'bg-zinc-900 text-white shadow-2xs'
                                    : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                              >
                                الكل
                              </button>
                              <button
                                onClick={() => setVerbFilter('regular')}
                                className={`px-2.5 py-1 text-xs font-bold rounded-lg font-arabic transition-all cursor-pointer ${
                                  verbFilter === 'regular'
                                    ? 'bg-zinc-900 text-white shadow-2xs'
                                    : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                              >
                                قياسي
                              </button>
                              <button
                                onClick={() => setVerbFilter('irregular')}
                                className={`px-2.5 py-1 text-xs font-bold rounded-lg font-arabic transition-all cursor-pointer ${
                                  verbFilter === 'irregular'
                                    ? 'bg-zinc-900 text-white shadow-2xs'
                                    : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                              >
                                شاذ
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Verbs Table */}
                        <div className="overflow-x-auto rounded-2xl border border-zinc-200">
                          <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                              <tr className="bg-zinc-100/75 border-b border-zinc-200 text-zinc-800 font-bold font-arabic">
                                <th className="p-3.5">المجرد (Infinitive)</th>
                                <th className="p-3.5">الماضي (Past)</th>
                                <th className="p-3.5">المعنى بالعربية</th>
                                <th className="p-3.5 text-center">النوع</th>
                                <th className="p-3.5 text-center">نطق</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200/80">
                              {filteredRows.map((verb, vIdx) => (
                                <tr key={vIdx} className="hover:bg-zinc-50/80 transition-colors">
                                  <td className="p-3.5 font-mono font-bold text-zinc-900" dir="ltr">
                                    {verb.base}
                                  </td>
                                  <td className="p-3.5 font-mono font-bold text-indigo-700" dir="ltr">
                                    {verb.past}
                                  </td>
                                  <td className="p-3.5 font-arabic text-zinc-700">
                                    {verb.meaningAr}
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-arabic inline-block ${
                                        verb.type === 'regular'
                                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                                      }`}
                                    >
                                      {verb.type === 'regular' ? 'قياسي' : 'شاذ'}
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <button
                                      onClick={() => handleSpeak(`${verb.base}... ${verb.past}`)}
                                      className="p-1.5 rounded-lg hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer inline-flex items-center justify-center"
                                      title="استمع للنطق"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Exam Tips Box */}
              {topic.examTips && topic.examTips.length > 0 && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs text-right space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold font-arabic text-base">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <span>ملاحظات امتحانية هامة:</span>
                  </div>
                  <ul className="space-y-2 pr-4 list-disc text-xs sm:text-sm text-zinc-700 font-arabic leading-relaxed">
                    {topic.examTips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="leading-relaxed">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Practice Quiz */}
              {topic.quiz && topic.quiz.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs space-y-5 text-right">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 font-arabic flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-zinc-900" />
                        <span>اختبر معلوماتك في هذا الدرس (كويز تفاعلي)</span>
                      </h4>
                      <p className="text-xs text-zinc-500 font-arabic mt-0.5">
                        اختر الإجابة الصحيحة لكل سؤال، وستظهر لك النتيجة فوراً مع التوضيح.
                      </p>
                    </div>
                    {Object.keys(quizAnswers).length > 0 && (
                      <button
                        onClick={handleResetQuiz}
                        className="text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-1 font-arabic cursor-pointer self-start sm:self-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>إعادة الكويز</span>
                      </button>
                    )}
                  </div>

                  {/* Questions List */}
                  <div className="space-y-5">
                    {topic.quiz.map((q, qIdx) => {
                      const selectedIdx = quizAnswers[q.id];
                      const isAnswered = selectedIdx !== undefined;
                      const isCorrect = isAnswered && selectedIdx === q.correctIndex;

                      return (
                        <div
                          key={q.id}
                          className="p-4 sm:p-5 rounded-2xl border border-zinc-200 bg-zinc-50/60 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <span className="text-[11px] font-black uppercase text-zinc-400 font-mono">
                                QUESTION {qIdx + 1}
                              </span>
                              <p className="text-sm sm:text-base font-bold text-zinc-900 font-sans" dir="ltr">
                                {q.questionTextEn}
                              </p>
                              {q.questionTextAr && (
                                <p className="text-xs text-zinc-600 font-arabic">
                                  {q.questionTextAr}
                                </p>
                              )}
                            </div>

                            {isAnswered && (
                              <div className="shrink-0 pt-1">
                                {isCorrect ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-arabic">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>إجابة صحيحة!</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full font-arabic">
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>إجابة خاطئة</span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt, optIdx) => {
                              let optionStyle =
                                'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50';
                              if (isAnswered) {
                                if (optIdx === q.correctIndex) {
                                  optionStyle =
                                    'bg-emerald-500 text-white border-emerald-600 font-bold shadow-xs';
                                } else if (optIdx === selectedIdx) {
                                  optionStyle =
                                    'bg-rose-500 text-white border-rose-600 font-bold shadow-xs';
                                } else {
                                  optionStyle =
                                    'bg-zinc-100/50 border-zinc-200 text-zinc-400 opacity-60';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                  className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm text-right transition-all font-sans cursor-pointer flex items-center justify-between ${optionStyle}`}
                                  dir="ltr"
                                >
                                  <span>{opt}</span>
                                  {isAnswered && optIdx === q.correctIndex && (
                                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation Box */}
                          {isAnswered && (
                            <div className="text-xs text-zinc-700 bg-zinc-100 p-3 rounded-xl border border-zinc-200 font-arabic leading-relaxed mt-2">
                              <span className="font-bold">التوضيح:</span> {q.explanationAr}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Switcher */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex items-center justify-between">
        <button
          onClick={() => onSelectLesson('grammar-u1-l1')}
          disabled={lesson.lessonNumber === 1}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all font-arabic ${
            lesson.lessonNumber === 1
              ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>الدرس 1 (الماضي البسيط)</span>
        </button>
        <button
          onClick={onBackToLessons}
          className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline font-arabic"
        >
          قائمة دروس القواعد
        </button>
        <button
          onClick={() => onSelectLesson('grammar-u1-l2')}
          disabled={lesson.lessonNumber === 2}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all font-arabic ${
            lesson.lessonNumber === 2
              ? 'opacity-30 cursor-not-allowed text-zinc-400 bg-zinc-100'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer'
          }`}
        >
          <span>الدرس 2 (Was/Were والصفات)</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
