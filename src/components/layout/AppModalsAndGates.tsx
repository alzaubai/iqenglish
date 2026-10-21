import React from 'react';
import { Lock } from 'lucide-react';
import { StudentSession, QuickExam } from '../../services/firebase';
import { MandatoryExamOverlay } from '../exam/MandatoryExamOverlay';
import { StudentQuickExamModal } from '../exam/StudentQuickExamModal';
import { StudentGradesHistoryModal } from '../exam/StudentGradesHistoryModal';

interface AppModalsAndGatesProps {
  studentSession: StudentSession | null;
  isTeacherLoggedIn: boolean;
  isExternalSubscriber: boolean;
  activeExam: QuickExam | null;
  hasCompletedActiveExam: boolean;
  isStudentExamModalOpen: boolean;
  setIsStudentExamModalOpen: (open: boolean) => void;
  isStudentHistoryModalOpen: boolean;
  setIsStudentHistoryModalOpen: (open: boolean) => void;
  onLogoutStudent: () => void;
}

export const AppModalsAndGates: React.FC<AppModalsAndGatesProps> = ({
  studentSession,
  isTeacherLoggedIn,
  isExternalSubscriber,
  activeExam,
  hasCompletedActiveExam,
  isStudentExamModalOpen,
  setIsStudentExamModalOpen,
  isStudentHistoryModalOpen,
  setIsStudentHistoryModalOpen,
  onLogoutStudent,
}) => {
  return (
    <>
      {/* External Subscription Expired Gate */}
      {isExternalSubscriber &&
        studentSession?.subscriptionExpiresAt &&
        new Date().getTime() > new Date(studentSession.subscriptionExpiresAt).getTime() && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            dir="rtl"
          >
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-arabic">
                {studentSession.subscriptionDuration === '1_hour'
                  ? 'انتهت فترة التجربة المجانية (ساعة واحدة)'
                  : 'انتهت فترة اشتراكك الإلكتروني'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
                عزيزي الطالب <strong className="text-slate-800">{studentSession.fullName}</strong>،{' '}
                {studentSession.subscriptionDuration === '1_hour'
                  ? 'لقد انتهت فترة المعاينة التجريبية للمنصة (60 دقيقة). للاشتراك ومواصلة التعلم، يرجى التواصل مع مدرس المادة.'
                  : 'لقد انتهت صلاحية الكود الخاص باشتراكك. لتجديد الاشتراك ومواصلة التعلم، يرجى التواصل مع مدرس المادة.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onLogoutStudent}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic"
                >
                  تسجيل الخروج وإدخال كود جديد
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Mandatory Exam Overlay Gate (Enforces exam if active & not completed yet) */}
      {activeExam &&
        activeExam.isActive &&
        !isTeacherLoggedIn &&
        studentSession &&
        !hasCompletedActiveExam &&
        !isStudentExamModalOpen && (
          <MandatoryExamOverlay
            exam={activeExam}
            student={studentSession}
            onStartExam={() => setIsStudentExamModalOpen(true)}
          />
        )}

      {/* Student Quick Exam Modal */}
      {activeExam && studentSession && (activeExam.isActive || isStudentExamModalOpen) && (
        <StudentQuickExamModal
          isOpen={isStudentExamModalOpen}
          onClose={() => setIsStudentExamModalOpen(false)}
          exam={activeExam}
          student={studentSession}
        />
      )}

      {/* Student Grades & History Modal */}
      {studentSession && (
        <StudentGradesHistoryModal
          isOpen={isStudentHistoryModalOpen}
          onClose={() => setIsStudentHistoryModalOpen(false)}
          student={studentSession}
        />
      )}
    </>
  );
};
