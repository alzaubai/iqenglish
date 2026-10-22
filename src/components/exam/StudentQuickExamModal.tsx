import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Award, X, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  QuickExam,
  StudentSession,
  submitStudentExamResult,
  checkExistingExamSubmission,
} from '../../services/firebase';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ExamResultCard } from './ExamResultCard';
import { ExamQuestionsForm } from './ExamQuestionsForm';
import { ExamTimerBanners } from './ExamTimerBanners';

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
  const [hasConfirmedPartialSubmit, setHasConfirmedPartialSubmit] = useState(false);

  // Forced shutdown state when teacher ends exam mid-session
  const [isForceEnding, setIsForceEnding] = useState(false);
  const [countdown, setCountdown] = useState(EXAM_FORCE_CLOSE_COUNTDOWN_SECONDS);
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const hasAutoSubmittedRef = useRef(false);
  const selectedAnswersRef = useRef(selectedAnswers);
  selectedAnswersRef.current = selectedAnswers;

  // Exam Duration Countdown Timer (in seconds)
  const durationTotalSeconds = (exam.durationMinutes || 15) * 60;
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(() => {
    try {
      const savedStart = sessionStorage.getItem(`exam_start_${exam.id}_${student.id}`);
      if (savedStart) {
        const elapsed = Math.floor((Date.now() - parseInt(savedStart, 10)) / 1000);
        return Math.max(0, durationTotalSeconds - elapsed);
      }
      sessionStorage.setItem(`exam_start_${exam.id}_${student.id}`, Date.now().toString());
    } catch {}
    return durationTotalSeconds;
  });

  // Security: Strip correctAnswer from UI questions so it cannot be inspected in React DevTools/DOM
  const sanitizedQuestions = useMemo(() => {
    return (exam?.questions || []).map(({ correctAnswer, ...q }) => q as any);
  }, [exam?.questions]);

  // Calculate score for whatever questions are currently answered (unanswered = 0 points)
  const calculateCurrentScore = (answers: Record<string, string>) => {
    let score = 0;
    exam.questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        score += q.points || 2;
      }
    });
    const totalPossiblePoints = exam.questions.reduce((acc, q) => acc + (q.points || 2), 0);
    return { score, totalPossiblePoints };
  };

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
        if (parsed.answers) {
          setSelectedAnswers(parsed.answers);
        }
        return;
      } catch {}
    }

    // Verify against Firestore to prevent clearing cookies / Incognito retakes
    checkExistingExamSubmission(exam.id, student.id).then((remoteSub) => {
      if (remoteSub) {
        setIsSubmitted(true);
        setEarnedScore(remoteSub.score);
        setTotalPoints(remoteSub.totalPoints);
        if (remoteSub.answers) {
          setSelectedAnswers(remoteSub.answers);
        }
        localStorage.setItem(
          localKey,
          JSON.stringify({ score: remoteSub.score, totalPoints: remoteSub.totalPoints, answers: remoteSub.answers })
        );
      } else {
        setIsSubmitted(false);
        setSelectedAnswers({});
      }
    });
  }, [exam?.id, student?.id]);

  // Exam Duration countdown timer
  useEffect(() => {
    if (!isOpen || isSubmitted || isForceEnding) return;

    if (examTimeRemaining <= 0) {
      if (!hasAutoSubmittedRef.current) {
        hasAutoSubmittedRef.current = true;
        setIsTimeExpired(true);
        handleAutoSubmitProgress('timeout');
      }
      return;
    }

    const interval = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasAutoSubmittedRef.current) {
            hasAutoSubmittedRef.current = true;
            setIsTimeExpired(true);
            handleAutoSubmitProgress('timeout');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isSubmitted, isForceEnding, examTimeRemaining]);

  // Watch for teacher stopping the active exam while student is solving
  useEffect(() => {
    if (!isOpen || !exam || exam.isActive || isSubmitted || hasAutoSubmittedRef.current) {
      return;
    }

    hasAutoSubmittedRef.current = true;
    setIsForceEnding(true);
    handleAutoSubmitProgress('teacher_stopped');
  }, [exam?.isActive, isOpen, exam, student, isSubmitted]);

  // Auto-submit current progress and grade whatever questions were answered
  const handleAutoSubmitProgress = async (reason: 'timeout' | 'teacher_stopped') => {
    const currentAnswers = selectedAnswersRef.current;
    const { score: autoScore, totalPossiblePoints } = calculateCurrentScore(currentAnswers);

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

    const localKey = STORAGE_KEYS.examDone(exam.id, student.id);
    localStorage.setItem(
      localKey,
      JSON.stringify({
        score: autoScore,
        totalPoints: totalPossiblePoints,
        submittedAt: new Date().toISOString(),
        answers: currentAnswers,
      })
    );

    setEarnedScore(autoScore);
    setTotalPoints(totalPossiblePoints);
    setIsSubmitted(true);
  };

  // Countdown timer when force-ending by teacher
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

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    setValidationError(null);
    setHasConfirmedPartialSubmit(false);
  };

  const handleSubmitExam = async () => {
    const unanswered = exam.questions.filter((q) => !selectedAnswers[q.id]);
    if (unanswered.length > 0 && !hasConfirmedPartialSubmit) {
      setValidationError(
        `تنبيه: لديك ${unanswered.length} أسئلة لم تقم بالإجابة عليها. إذا قمت بالتسليم الآن سيتم احتساب درجات الأسئلة التي حللتها فقط وتثبيتها. اضغط زر التسليم مرة ثانية للتأكيد النهائي أو أكمل إجابة الأسئلة المتبقية.`
      );
      setHasConfirmedPartialSubmit(true);
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    const { score, totalPossiblePoints } = calculateCurrentScore(selectedAnswers);

    try {
      await submitStudentExamResult({
        examId: exam.id,
        examTitle: exam.title,
        studentId: student.id,
        studentName: student.fullName,
        studentSection: student.section,
        studentCode: student.code,
        score: score,
        totalPoints: totalPossiblePoints,
        submittedAt: new Date().toISOString(),
        answers: selectedAnswers,
      });

      const localKey = STORAGE_KEYS.examDone(exam.id, student.id);
      localStorage.setItem(
        localKey,
        JSON.stringify({
          score: score,
          totalPoints: totalPossiblePoints,
          submittedAt: new Date().toISOString(),
          answers: selectedAnswers,
        })
      );

      setEarnedScore(score);
      setTotalPoints(totalPossiblePoints);
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

  const minutesRemaining = Math.floor(examTimeRemaining / 60);
  const secondsRemaining = examTimeRemaining % 60;
  const formattedTimeRemaining = `${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;

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
                الطالب: <strong className="text-white">{student.fullName}</strong> • شعبة {student.section}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                  examTimeRemaining <= 120
                    ? 'bg-rose-500/20 text-rose-200 border-rose-400 animate-pulse'
                    : 'bg-white/10 text-white border-white/20'
                }`}
                title="الوقت المتبقي للامتحان"
              >
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{formattedTimeRemaining}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6">
          <ExamTimerBanners
            isTimeExpired={isTimeExpired}
            isForceEnding={isForceEnding}
            countdown={countdown}
            onClose={onClose}
          />

          {isSubmitted ? (
            <ExamResultCard
              studentName={student.fullName}
              earnedScore={earnedScore}
              totalPoints={totalPoints}
              questions={exam.questions}
              selectedAnswers={selectedAnswers}
              onClose={onClose}
            />
          ) : (
            <ExamQuestionsForm
              questions={sanitizedQuestions}
              selectedAnswers={selectedAnswers}
              onSelectOption={handleSelectOption}
              onSubmitExam={handleSubmitExam}
              isSubmitting={isSubmitting}
              validationError={validationError}
            />
          )}
        </div>
      </div>
    </div>
  );
};
