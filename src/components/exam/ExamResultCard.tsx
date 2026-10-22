import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lightbulb,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { ExamQuestion } from '../../services/firebase/types';

interface ExamResultCardProps {
  studentName: string;
  earnedScore: number;
  totalPoints: number;
  questions?: ExamQuestion[];
  selectedAnswers?: Record<string, string>;
  onClose: () => void;
}

export const ExamResultCard: React.FC<ExamResultCardProps> = ({
  studentName,
  earnedScore,
  totalPoints,
  questions = [],
  selectedAnswers = {},
  onClose,
}) => {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="text-center py-4 sm:py-6 space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border-2 border-slate-300 shadow-xs">
        <CheckCircle2 className="w-9 h-9 text-emerald-600" />
      </div>

      <div>
        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-arabic inline-block mb-2">
          تم تسليم الامتحان بنجاح
        </span>
        <h4 className="text-2xl font-bold text-slate-800 font-arabic">
          أحسنت يا {studentName}!
        </h4>
        <p className="text-xs text-slate-500 font-arabic mt-1">
          تم إرسال درجتك إلى لوحة الأستاذ وتسجيلها في القائمة فوراً
        </p>
      </div>

      {/* Score Display Card */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl max-w-xs mx-auto text-center space-y-1">
        <span className="text-xs text-slate-500 font-arabic block">درجتك النهائية:</span>
        <strong className="text-4xl font-bold text-slate-800 font-mono block">
          {earnedScore} <span className="text-xl text-slate-400 font-normal">/ {totalPoints}</span>
        </strong>
        <span className="text-xs font-bold text-slate-700 font-arabic block pt-1">
          {earnedScore >= totalPoints * 0.8
            ? 'ممتاز جداً! إجابات رائعة'
            : earnedScore >= totalPoints * 0.5
            ? 'جيد جداً! واصل المراجعة'
            : 'حاول مراجعة الدروس والقواعد ثانية'}
        </span>
        <div className="text-[11px] text-slate-500 font-arabic pt-2 border-t border-slate-200 mt-2">
          إشراف وتصحيح مدرس المادة
        </div>
      </div>

      {/* Question Review Section */}
      {questions.length > 0 && (
        <div className="max-w-xl mx-auto text-right space-y-3 pt-2">
          <button
            type="button"
            onClick={() => setShowReview((prev) => !prev)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-arabic font-bold text-sm border border-slate-200 cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>مراجعة الإجابات والحلول النموذجية</span>
              <span className="text-xs font-mono font-normal text-slate-500 px-2 py-0.5 rounded-md bg-white border border-slate-200">
                {questions.length} أسئلة
              </span>
            </div>
            {showReview ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showReview && (
            <div className="space-y-4 pt-1 animate-in fade-in duration-200">
              {questions.map((q, idx) => {
                const userAns = (selectedAnswers[q.id] || '').trim();
                const correctAns = (q.correctAnswer || '').trim();
                const isCorrect = userAns.toLowerCase() === correctAns.toLowerCase();
                const isAnswered = Boolean(userAns);
                const qPoints = q.points || 2;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-4 rounded-2xl border transition-all text-right space-y-3 ${
                      !isAnswered
                        ? 'bg-amber-50/60 border-amber-200'
                        : isCorrect
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-white text-xs font-bold font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-700 font-arabic">
                          السؤال {idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold font-arabic flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>+{qPoints} درجة</span>
                          </span>
                        ) : !isAnswered ? (
                          <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold font-arabic flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                            <span>لم تُجب (0 درجة)</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold font-arabic flex items-center gap-1">
                            <X className="w-3.5 h-3.5 text-rose-700" />
                            <span>0 درجة</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-1">
                      <p
                        className="text-sm font-bold text-slate-900 font-sans leading-relaxed text-left"
                        dir="ltr"
                      >
                        {q.questionEn}
                      </p>
                    </div>

                    {/* Answers Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {/* Student's Answer */}
                      <div
                        className={`p-2.5 rounded-xl border text-xs font-arabic space-y-1 ${
                          !isAnswered
                            ? 'bg-amber-100/60 border-amber-300 text-amber-900'
                            : isCorrect
                            ? 'bg-emerald-100/60 border-emerald-300 text-emerald-950'
                            : 'bg-rose-100/60 border-rose-300 text-rose-950'
                        }`}
                      >
                        <span className="text-[10px] font-bold block opacity-75">
                          إجابتك:
                        </span>
                        <div
                          className="font-bold text-sm font-sans text-left"
                          dir="ltr"
                        >
                          {isAnswered ? userAns : '(لم يتم اختيار إجابة)'}
                        </div>
                      </div>

                      {/* Model Answer */}
                      <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-100/60 text-emerald-950 text-xs font-arabic space-y-1">
                        <span className="text-[10px] font-bold block opacity-75">
                          الحل النموذجي:
                        </span>
                        <div
                          className="font-bold text-sm font-sans text-emerald-900 text-left"
                          dir="ltr"
                        >
                          {correctAns}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    {q.explanationAr && (
                      <div className="p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-700 font-arabic space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>الشرح والتوضيح:</span>
                        </div>
                        <p className="leading-relaxed text-slate-600">
                          {q.explanationAr}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div>
        <button
          onClick={onClose}
          className="py-3 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer shadow-sm transition-all font-arabic"
        >
          العودة للمنهاج والدروس
        </button>
      </div>
    </div>
  );
};
