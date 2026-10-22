import React, { useState } from 'react';
import { Sparkles, AlertCircle, Send, Languages } from 'lucide-react';
import { QuickExam } from '../../services/firebase';

interface ExamQuestionsFormProps {
  questions: QuickExam['questions'];
  selectedAnswers: Record<string, string>;
  onSelectOption: (questionId: string, option: string) => void;
  onSubmitExam: () => void;
  isSubmitting: boolean;
  validationError: string | null;
}

export const ExamQuestionsForm: React.FC<ExamQuestionsFormProps> = ({
  questions,
  selectedAnswers,
  onSelectOption,
  onSubmitExam,
  isSubmitting,
  validationError,
}) => {
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="space-y-6 text-right">
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-xs font-arabic flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-slate-600 shrink-0" />
        <span>
          اختر الإجابة الصحيحة لكل سؤال من أسئلة كتاب النشاط، وعند الانتهاء اضغط زر <strong>تسليم الإجابات</strong> بالأسفل.
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {questions.map((q, idx) => {
          const currentChoice = selectedAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 text-left" dir="ltr">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-white text-xs font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-800 font-sans">
                      {q.questionEn}
                    </span>
                  </div>
                  {q.questionAr && (
                    <div className="pt-1 text-right" dir="rtl">
                      <button
                        type="button"
                        onClick={() => toggleTranslation(q.id)}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border font-arabic transition-all inline-flex items-center gap-1 cursor-pointer ${
                          visibleTranslations[q.id]
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="ترجمة السؤال"
                      >
                        <Languages className="w-3 h-3 text-indigo-600" />
                        <span>{visibleTranslations[q.id] ? 'إخفاء الترجمة' : 'ترجمة السؤال'}</span>
                      </button>
                      {visibleTranslations[q.id] && (
                        <p className="text-xs text-slate-700 font-arabic mt-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200/80 animate-in fade-in duration-150">
                          {q.questionAr}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-bold shrink-0">
                  {q.points || 2} pts
                </span>
              </div>

              {/* Options Radio List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1" dir="ltr">
                {q.options.map((opt, oIdx) => {
                  const isSelected = currentChoice === opt;

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => onSelectOption(q.id, opt)}
                      className={`p-3 rounded-xl border text-left font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'border-slate-800 bg-slate-800 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-white bg-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-slate-800" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {validationError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-arabic flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmitExam}
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all font-arabic"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'جاري إرسال الإجابة للأستاذ...' : 'تسليم الإجابات واعتماد الدرجة'}</span>
        </button>
      </div>
    </div>
  );
};
