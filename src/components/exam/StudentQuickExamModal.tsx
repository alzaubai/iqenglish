import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Send,
  X,
  Award,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  QuickExam,
  StudentSession,
  submitStudentExamResult
} from '../../services/firebase';

interface StudentQuickExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: QuickExam;
  student: StudentSession;
}

export const StudentQuickExamModal: React.FC<StudentQuickExamModalProps> = ({
  isOpen,
  onClose,
  exam,
  student,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [earnedScore, setEarnedScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Check if previously submitted locally
  useEffect(() => {
    if (!exam) return;
    const localKey = `iq_exam_done_${exam.id}_${student.id}`;
    const saved = localStorage.getItem(localKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsSubmitted(true);
      setEarnedScore(parsed.score);
      setTotalPoints(parsed.totalPoints);
    } else {
      setIsSubmitted(false);
      setSelectedAnswers({});
    }
  }, [exam?.id, student?.id]);

  if (!isOpen || !exam) return null;

  const totalPossible = exam.questions.reduce((acc, q) => acc + (q.points || 2), 0);

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    setValidationError(null);
  };

  const handleSubmitExam = async () => {
    // Check if all questions are answered
    const unanswered = exam.questions.filter((q) => !selectedAnswers[q.id]);
    if (unanswered.length > 0) {
      setValidationError(`يرجى الإجابة عن جميع الأسئلة (${unanswered.length} أسئلة متبقية)`);
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    // Calculate score
    let score = 0;
    exam.questions.forEach((q) => {
      const userAns = selectedAnswers[q.id];
      if (userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        score += q.points || 2;
      }
    });

    try {
      // 1. Submit to Firebase Firestore
      await submitStudentExamResult({
        examId: exam.id,
        examTitle: exam.title,
        studentName: student.fullName,
        studentSection: student.section,
        studentCode: student.code,
        score: score,
        totalPoints: totalPossible,
        submittedAt: new Date().toISOString(),
        answers: selectedAnswers,
      });

      // 2. Save locally to prevent resubmission
      const localKey = `iq_exam_done_${exam.id}_${student.id}`;
      localStorage.setItem(
        localKey,
        JSON.stringify({ score, totalPoints: totalPossible })
      );

      setEarnedScore(score);
      setTotalPoints(totalPossible);
      setIsSubmitted(true);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
      setValidationError('حدث خطأ أثناء إرسال الإجابات، يرجى المحاولة ثانية.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-950/70 backdrop-blur-md overflow-y-auto"
      dir="rtl"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-zinc-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-arabic">
                {exam.title}
              </h3>
              <span className="text-xs text-zinc-300 font-arabic block mt-0.5">
                الطالب: <strong className="text-white">{student.fullName}</strong> • شعبة {student.section}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6">
          {/* VIEW: RESULT CARD IF ALREADY SUBMITTED */}
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-arabic inline-block mb-2">
                  تم تسليم الامتحان بنجاح ✔️
                </span>
                <h4 className="text-2xl font-black text-zinc-900 font-arabic">
                  أحسنت يا {student.fullName}!
                </h4>
                <p className="text-xs text-zinc-500 font-arabic mt-1">
                  تم إرسال درجتك إلى لوحة الأستاذ وتسجيلها في القائمة فوراً
                </p>
              </div>

              {/* Score Display Card */}
              <div className="p-6 bg-zinc-50 border-2 border-zinc-200 rounded-3xl max-w-xs mx-auto text-center space-y-1">
                <span className="text-xs text-zinc-500 font-arabic block">درجتك النهائية:</span>
                <strong className="text-4xl font-black text-zinc-900 font-mono block">
                  {earnedScore} <span className="text-xl text-zinc-400 font-normal">/ {totalPoints}</span>
                </strong>
                <span className="text-xs font-bold text-emerald-700 font-arabic block pt-1">
                  {earnedScore >= totalPoints * 0.8
                    ? 'ممتاز جداً! إجابات رائعة 🌟'
                    : earnedScore >= totalPoints * 0.5
                    ? 'جيد جداً! واصل المراجعة 👍'
                    : 'حاول مراجعة الدروس والقواعد ثانية 💪'}
                </span>
              </div>

              <button
                onClick={onClose}
                className="py-3 px-8 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm cursor-pointer shadow-sm transition-all font-arabic"
              >
                العودة للمنهاج والدروس
              </button>
            </div>
          ) : (
            /* VIEW: EXAM QUESTIONS FORM */
            <div className="space-y-6 text-right">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 text-xs font-arabic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  اختر الإجابة الصحيحة لكل سؤال، وعند الانتهاء اضغط زر <strong>تسليم الإجابات</strong> بالأسفل.
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                {exam.questions.map((q, idx) => {
                  const currentChoice = selectedAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-4 sm:p-5 rounded-2xl border-2 border-zinc-200 bg-white shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 text-left" dir="ltr">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
                              {q.questionEn}
                            </span>
                          </div>
                          {q.questionAr && (
                            <p className="text-xs text-zinc-500 font-arabic pt-0.5 text-right" dir="rtl">
                              {q.questionAr}
                            </p>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400 font-bold shrink-0">
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
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`p-3 rounded-xl border-2 text-left font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isSelected
                                  ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                                  : 'border-zinc-200 bg-zinc-50/70 hover:bg-zinc-100 text-zinc-800'
                              }`}
                            >
                              <span>{opt}</span>
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? 'border-white bg-white'
                                    : 'border-zinc-300 bg-white'
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-zinc-950" />}
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
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all font-arabic"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'جاري إرسال الإجابة للأستاذ...' : 'تسليم الإجابات واعتماد الدرجة'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
