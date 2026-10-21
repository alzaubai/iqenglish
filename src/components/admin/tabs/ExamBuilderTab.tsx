import React, { useState, useEffect } from 'react';
import { Play, Pause, Clock, Shuffle, RotateCcw } from 'lucide-react';
import {
  QuickExam,
  saveOrUpdateExam,
  updatePlatformConfig,
  PlatformConfig,
} from '../../../services/firebase';
import {
  UNIT_1_QUESTION_BANK,
  CategorizedExamQuestion,
} from '../../../data/defaultExamQuestions';
import { ExamUnit } from '../../../data/curriculumStructure';
import { ExamSourceCascader } from '../exam/ExamSourceCascader';

interface ExamBuilderTabProps {
  platformConfig: PlatformConfig;
  isExamActiveLocal: boolean;
  setIsExamActiveLocal: (active: boolean) => void;
  examTitle: string;
  setExamTitle: (title: string) => void;
}

export const ExamBuilderTab: React.FC<ExamBuilderTabProps> = ({
  platformConfig,
  isExamActiveLocal,
  setIsExamActiveLocal,
  examTitle,
  setExamTitle,
}) => {
  const [selectedBuilderUnit, setSelectedBuilderUnit] = useState<string>('unit-1');
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(15);
  const [selectedLessonSources, setSelectedLessonSources] = useState<string[]>([
    'lesson-1',
    'lesson-2',
    'lesson-3',
    'grammar',
  ]);
  const [selectedGrammarTopicSources, setSelectedGrammarTopicSources] = useState<string[]>([
    'topic-past-simple',
    'topic-past-continuous',
    'topic-present-simple',
    'topic-adverbs-frequency',
    'topic-possessive-pronouns',
    'topic-joining-sentences',
    'topic-interests',
  ]);
  const [questionCountTarget, setQuestionCountTarget] = useState<number>(5);
  const [selectedQuestions, setSelectedQuestions] = useState<CategorizedExamQuestion[]>([]);
  const [builderStatusMsg, setBuilderStatusMsg] = useState<string | null>(null);

  // Generate initial questions if empty
  useEffect(() => {
    if (selectedQuestions.length === 0) {
      handleGenerateQuestions();
    }
  }, []);

  const handleCascaderSelectUnit = (unit: ExamUnit) => {
    setSelectedBuilderUnit(unit.id);
    setExamTitle(`الامتحان السريع • ${unit.titleAr.split(':')[0]}`);
    if (unit.id === 'unit-1') {
      setSelectedLessonSources(['lesson-1', 'lesson-2', 'lesson-3', 'grammar']);
      setSelectedGrammarTopicSources([
        'topic-past-simple',
        'topic-past-continuous',
        'topic-present-simple',
        'topic-adverbs-frequency',
        'topic-possessive-pronouns',
        'topic-joining-sentences',
        'topic-interests',
      ]);
    } else {
      setSelectedLessonSources(unit.lessons.slice(0, 3).map((l) => l.id));
      setSelectedGrammarTopicSources([]);
    }
  };

  const handleCascaderToggleLesson = (lessonId: string) => {
    setSelectedLessonSources((prev) => {
      if (prev.includes(lessonId)) {
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== lessonId);
      }
      return [...prev, lessonId];
    });
  };

  const handleCascaderSelectAllLessons = (lessonIds: string[]) => {
    setSelectedLessonSources((prev) => [
      ...new Set([...prev.filter((id) => id === 'grammar'), ...lessonIds]),
    ]);
  };

  const handleCascaderClearLessons = () => {
    setSelectedLessonSources((prev) => prev.filter((id) => id === 'grammar'));
  };

  const handleCascaderToggleGrammarActive = () => {
    setSelectedLessonSources((prev) => {
      if (prev.includes('grammar')) {
        const without = prev.filter((id) => id !== 'grammar');
        return without.length > 0 ? without : ['lesson-1'];
      }
      return [...prev, 'grammar'];
    });
  };

  const handleCascaderToggleGrammarTopic = (topicId: string) => {
    setSelectedGrammarTopicSources((prev) => {
      if (prev.includes(topicId)) {
        return prev.filter((id) => id !== topicId);
      }
      return [...prev, topicId];
    });
  };

  const handleCascaderSelectAllGrammarTopics = (topicIds: string[]) => {
    setSelectedGrammarTopicSources(topicIds);
  };

  const handleCascaderClearGrammarTopics = () => {
    setSelectedGrammarTopicSources([]);
  };

  const handleCascaderReset = () => {
    setSelectedBuilderUnit('unit-1');
    setExamTitle('الامتحان السريع • الوحدة الأولى');
    setSelectedLessonSources(['lesson-1', 'lesson-2', 'lesson-3', 'grammar']);
    setSelectedGrammarTopicSources([
      'topic-past-simple',
      'topic-past-continuous',
      'topic-present-simple',
      'topic-adverbs-frequency',
      'topic-possessive-pronouns',
      'topic-joining-sentences',
      'topic-interests',
    ]);
  };

  const handleGenerateQuestions = () => {
    if (selectedBuilderUnit !== 'unit-1') {
      setSelectedQuestions([]);
      setBuilderStatusMsg(
        'هذه الوحدة لا تحتوي على أسئلة مضافة في بنك الأسئلة حالياً. تم تجهيز هيكل الدروس والقواعد، ويمكن إضافة الأسئلة لها مستقبلاً.'
      );
      return;
    }

    const availablePool = UNIT_1_QUESTION_BANK.filter((q) => {
      if (q.lessonId === 'grammar') {
        return (
          selectedLessonSources.includes('grammar') &&
          (!q.grammarTopicId || selectedGrammarTopicSources.includes(q.grammarTopicId))
        );
      }
      return selectedLessonSources.includes(q.lessonId);
    });

    if (availablePool.length === 0) {
      setSelectedQuestions([]);
      setBuilderStatusMsg('يرجى تحديد درس واحد على الأقل أو موضوع قواعد لتوليد الأسئلة.');
      return;
    }

    const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, questionCountTarget);
    setSelectedQuestions(picked);
    setBuilderStatusMsg(null);
  };

  const handleSwapSingleQuestion = (indexToSwap: number) => {
    const currentQ = selectedQuestions[indexToSwap];
    if (!currentQ) return;
    const currentSelectedIds = selectedQuestions.filter(Boolean).map((q) => q.id);

    const candidates = UNIT_1_QUESTION_BANK.filter((q) => {
      if (currentSelectedIds.includes(q.id)) return false;
      if (q.lessonId === 'grammar') {
        return (
          selectedLessonSources.includes('grammar') &&
          (!q.grammarTopicId || selectedGrammarTopicSources.includes(q.grammarTopicId))
        );
      }
      return selectedLessonSources.includes(q.lessonId);
    });

    const sameLessonCandidates = candidates.filter((q) => q.lessonId === currentQ.lessonId);
    const pool = sameLessonCandidates.length > 0 ? sameLessonCandidates : candidates;

    if (pool.length > 0) {
      const newQuestion = pool[Math.floor(Math.random() * pool.length)];
      const updatedList = [...selectedQuestions];
      updatedList[indexToSwap] = newQuestion;
      setSelectedQuestions(updatedList);
    } else {
      setBuilderStatusMsg('لا يوجد أسئلة بديلة أخرى في هذا الموضوع حالياً.');
      setTimeout(() => setBuilderStatusMsg(null), 3000);
    }
  };

  const handleSaveAndLaunchExam = async (activateState: boolean) => {
    setBuilderStatusMsg('جاري حفظ التحديثات وإرسالها للطلاب...');
    try {
      const examId =
        activateState && (!isExamActiveLocal || !platformConfig.activeExamId)
          ? `exam_session_${Date.now()}`
          : platformConfig.activeExamId || 'exam_unit1_quick';

      const examPayload: QuickExam = {
        id: examId,
        title: examTitle.trim() || 'الامتحان السريع • الوحدة الأولى',
        durationMinutes: examDurationMinutes || 15,
        questions: selectedQuestions,
        isActive: activateState,
        createdAt: new Date().toISOString(),
      };

      await saveOrUpdateExam(examPayload);
      await updatePlatformConfig({ activeExamId: examId });

      setIsExamActiveLocal(activateState);
      setBuilderStatusMsg(
        activateState
          ? 'تم اعتماد الأسئلة وإطلاق الامتحان للطلاب بنجاح'
          : 'تم إيقاف وقفل الامتحان عن الطلاب'
      );
      setTimeout(() => setBuilderStatusMsg(null), 4000);
    } catch {
      setBuilderStatusMsg('حدث خطأ أثناء حفظ الامتحان، يرجى التحقق من اتصال الإنترنت.');
      setTimeout(() => setBuilderStatusMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6 text-right">
      {/* Exam Title & Master Actions Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 max-w-md">
          <label className="text-xs font-bold text-slate-700 font-arabic">
            عنوان الامتحان السريع:
          </label>
          <input
            type="text"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            placeholder="الامتحان السريع • الوحدة الأولى"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 font-arabic text-sm text-slate-800 focus:border-slate-800 focus:ring-0"
          />
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-arabic">حالة الامتحان الآن:</span>
            <span
              className={`font-bold font-arabic px-2 py-0.5 rounded-full text-[11px] ${
                isExamActiveLocal
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {isExamActiveLocal ? 'متاح للطلاب ومباشر الآن' : 'مغلق حالياً'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isExamActiveLocal ? (
            <button
              onClick={() => handleSaveAndLaunchExam(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs cursor-pointer font-arabic transition-colors flex items-center gap-1.5"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>إيقاف الامتحان</span>
            </button>
          ) : (
            <button
              onClick={() => handleSaveAndLaunchExam(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer font-arabic transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>اعتماد وإطلاق الامتحان للطلاب</span>
            </button>
          )}
        </div>
      </div>

      {builderStatusMsg && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic">
          {builderStatusMsg}
        </div>
      )}

      {/* Step-by-Step Cascading Source Selector */}
      <ExamSourceCascader
        selectedUnitId={selectedBuilderUnit}
        onSelectUnit={handleCascaderSelectUnit}
        selectedLessonIds={selectedLessonSources}
        onToggleLesson={handleCascaderToggleLesson}
        onSelectAllLessons={handleCascaderSelectAllLessons}
        onClearLessons={handleCascaderClearLessons}
        isGrammarActive={selectedLessonSources.includes('grammar')}
        onToggleGrammarActive={handleCascaderToggleGrammarActive}
        selectedGrammarTopicIds={selectedGrammarTopicSources}
        onToggleGrammarTopic={handleCascaderToggleGrammarTopic}
        onSelectAllGrammarTopics={handleCascaderSelectAllGrammarTopics}
        onClearGrammarTopics={handleCascaderClearGrammarTopics}
        onResetSelection={handleCascaderReset}
      />

      {/* Exam Settings Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700 font-arabic">
                عدد الأسئلة:
              </span>
              {[5, 8].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCountTarget(cnt)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    questionCountTarget === cnt
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cnt} أسئلة
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>المدة:</span>
              </span>
              {[10, 15, 20, 30].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setExamDurationMinutes(mins)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-arabic transition-all cursor-pointer ${
                    examDurationMinutes === mins
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {mins} دقيقة
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateQuestions}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold font-arabic cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-600" />
            <span>إعادة توليد نموذج عشوائي</span>
          </button>
        </div>
      </div>

      {/* Generated Questions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-bold text-slate-800 font-arabic">
            2. مراجعة الأسئلة وتعديلها ({selectedQuestions.length} أسئلة):
          </h4>
          <span className="text-xs text-slate-500 font-arabic">
            اضغط "تبديل" لتغيير أي سؤال لا يعجبك بسؤال بديل فوراً
          </span>
        </div>

        <div className="space-y-3">
          {selectedQuestions.filter(Boolean).map((q, idx) => (
            <div
              key={(q.id || '') + idx}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 text-left" dir="ltr">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-white text-xs font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800 font-sans">
                      {q.questionEn}
                    </span>
                  </div>
                  {q.questionAr && (
                    <p className="text-xs text-slate-500 font-arabic pt-0.5 text-right" dir="rtl">
                      {q.questionAr}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleSwapSingleQuestion(idx)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold font-arabic cursor-pointer transition-colors shrink-0 flex items-center gap-1"
                  title="تغيير هذا السؤال بسؤال آخر من كتاب النشاط"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>تبديل السؤال</span>
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1" dir="ltr">
                {(q.options || []).map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2 rounded-lg text-xs font-sans text-left flex items-center justify-between border ${
                      opt === q.correctAnswer
                        ? 'bg-slate-100 font-bold border-slate-400 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{opt}</span>
                    {opt === q.correctAnswer && <span className="text-slate-800 font-bold">✓</span>}
                  </div>
                ))}
              </div>

              {/* Source lesson reference */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-arabic">
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {q.exerciseRef || q.lessonTitleAr}
                  </span>
                </span>
                <span className="font-mono font-bold text-slate-600">{q.points || 2} درجات</span>
              </div>
            </div>
          ))}
        </div>

        {/* Final Launch Button */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => handleSaveAndLaunchExam(true)}
            className="py-3.5 px-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer shadow-xs transition-colors font-arabic inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>اعتماد هذا النموذج وإطلاق الامتحان للطلاب</span>
          </button>
        </div>
      </div>
    </div>
  );
};
