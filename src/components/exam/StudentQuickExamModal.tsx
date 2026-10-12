import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Award,
  Send,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  QuickExam,
  StudentSession,
  submitStudentExamResult,
  checkExistingExamSubmission,
} from '../../services/firebase';
import { STORAGE_KEYS } from '../../constants/storageKeys';

// Configuration: countdown seconds before force-closing after teacher stops exam
export const EXAM_FORCE_CLOSE_COUNTDOWN_SECONDS = 10;

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

  // Forced shutdown state when teacher ends exam mid-session
  const [isForceEnding, setIsForceEnding] = useState(false);
  const [countdown, setCountdown] = useState(EXAM_FORCE_CLOSE_COUNTDOWN_SECONDS);
  const hasAutoSubmittedRef = useRef(false);
  const selectedAnswersRef = useRef(selectedAnswers);
  selectedAnswersRef.current = selectedAnswers;

  // Check if previously submitted locally or in remote database
  useEffect(() => {
    if (!exam || !student) return;
    const localKey = STORAGE_KEYS.examDone(exam.id, student.id);
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIsSubmitted(true);
        setEarnedScore(parsed.score);
        setTotalPoints(parsed.totalPoints);
        return;
      } catch {}
    }

    // Verify against Firestore to prevent clearing cookies / Incognito retakes
    checkExistingExamSubmission(exam.id, student.id).then((remoteSub) => {
      if (remoteSub) {
        setIsSubmitted(true);
        setEarnedScore(remoteSub.score);
        setTotalPoints(remoteSub.totalPoints);
        localStorage.setItem(
          localKey,
          JSON.stringify({ score: remoteSub.score, totalPoints: remoteSub.totalPoints })
        );
      } else {
        setIsSubmitted(false);
        setSelectedAnswers({});
      }
    });
  }, [exam?.id, student?.id]);

  // Watch for teacher stopping the active exam while student is solving
  useEffect(() => {
    if (!isOpen || !exam || exam.isActive || isSubmitted || hasAutoSubmittedRef.current) {
      return;
    }

    // Teacher has stopped the exam! Auto-submit current progress
    hasAutoSubmittedRef.current = true;
    setIsForceEnding(true);

    const currentAnswers = selectedAnswersRef.current;
    let autoScore = 0;
    exam.questions.forEach((q) => {
      const userAns = currentAnswers[q.id];
      if (userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        autoScore += q.points || 2;
      }
    });

    const totalPossiblePoints = exam.questions.reduce((acc, q) => acc + (q.points || 2), 0);

    // Save submission to remote Firestore
    submitStudentExamResult({
      examId: exam.id,
      examTitle: exam.title,
      studentId: student.id,
      studentName: student.fullName,
      studentSection: student.section,
      studentCode: student.code,
      score: autoScore,
      totalPoints: totalPossiblePoints,
      submittedAt: new Date().toISOString(),
      answers: currentAnswers,
    }).catch(console.error);

    // Save locally
    const localKey = STORAGE_KEYS.examDone(exam.id, student.id);
    localStorage.setItem(
      localKey,
      JSON.stringify({
        score: autoScore,
        totalPoints: totalPossiblePoints,
        submittedAt: new Date().toISOString(),
      })
    );

    setEarnedScore(autoScore);
    setTotalPoints(totalPossiblePoints);
    setIsSubmitted(true);
  }, [exam?.isActive, isOpen, exam, student, isSubmitted]);

  // Countdown timer when force-ending
  useEffect(() => {
    if (!isForceEnding) return;

    if (countdown <= 0) {
      onClose();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isForceEnding, countdown, onClose]);

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
        studentId: student.id,
        studentName: student.fullName,
        studentSection: student.section,
        studentCode: student.code,
        score: score,
        totalPoints: totalPossible,
        submittedAt: new Date().toISOString(),
        answers: selectedAnswers,
      });

      // 2. Save locally
      const localKey = STORAGE_KEYS.examDone(exam.id, student.id);
      localStorage.setItem(
        localKey,
        JSON.stringify({
          score: score,
          totalPoints: totalPossible,
          submittedAt: new Date().toISOString(),
        })
      );

      setEarnedScore(score);
      setTotalPoints(totalPossible);
      setIsSubmitted(true);

      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55 },
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      dir="rtl"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-800 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-arabic">
                {exam.title}
              </h3>
              <span className="text-xs text-slate-300 font-arabic block mt-0.5">
                الطالب: <strong className="text-white">{student.fullName}</strong> • شعبة {student.section} • إشراف: أ. حسام محمود منصور
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6">
          {/* TEACHER STOPPED EXAM NOTICE BANNER */}
          {isForceEnding && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-arabic space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <span>قام مدرس المادة (أ. حسام محمود منصور) بإنهاء وقت الامتحان</span>
              </div>
              <p className="text-amber-700 leading-relaxed">
                تم حفظ إجاباتك الحالية واحتساب نتيجتك وإرسالها للأستاذ تلقائياً بنجاح. ستُغلق هذه الشاشة تلقائياً بعد <strong>{countdown}</strong> ثوانٍ.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-1.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  إغلاق ومتابعة الدروس الآن ({countdown})
                </button>
              </div>
            </div>
          )}

          {/* VIEW: RESULT CARD IF ALREADY SUBMITTED */}
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border-2 border-slate-300 shadow-xs">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-arabic inline-block mb-2">
                  تم تسليم الامتحان بنجاح
                </span>
                <h4 className="text-2xl font-bold text-slate-800 font-arabic">
                  أحسنت يا {student.fullName}!
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
                  إشراف وتصحيح مدرس المادة: أ. حسام محمود منصور
                </div>
              </div>

              <button
                onClick={onClose}
                className="py-3 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer shadow-sm transition-all font-arabic"
              >
                العودة للمنهاج والدروس
              </button>
            </div>
          ) : (
            /* VIEW: EXAM QUESTIONS FORM */
            <div className="space-y-6 text-right">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-xs font-arabic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-600 shrink-0" />
                <span>
                  اختر الإجابة الصحيحة لكل سؤال من أسئلة كتاب النشاط، وعند الانتهاء اضغط زر <strong>تسليم الإجابات</strong> بالأسفل.
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                {exam.questions.map((q, idx) => {
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
                            <p className="text-xs text-slate-500 font-arabic pt-0.5 text-right" dir="rtl">
                              {q.questionAr}
                            </p>
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
                              onClick={() => handleSelectOption(q.id, opt)}
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
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all font-arabic"
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
