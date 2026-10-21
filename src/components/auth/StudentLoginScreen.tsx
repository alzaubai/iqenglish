import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { StudentSession, PlatformConfig } from '../../services/firebase';
import { TeacherPinForm } from './TeacherPinForm';
import { StudentCodeVerificationForm } from './StudentCodeVerificationForm';
import { StudentProfileRegistrationForm } from './StudentProfileRegistrationForm';

interface StudentLoginScreenProps {
  platformConfig: PlatformConfig;
  onActivated: (session: StudentSession) => void;
  onTeacherLoginSuccess: () => void;
}

export const StudentLoginScreen: React.FC<StudentLoginScreenProps> = ({
  platformConfig,
  onActivated,
  onTeacherLoginSuccess,
}) => {
  // Mode: 'student' (steps 1 & 2) vs 'teacher' (PIN check)
  const [mode, setMode] = useState<'student' | 'teacher'>('student');
  const [step, setStep] = useState<1 | 2>(1);
  const [enteredCode, setEnteredCode] = useState('');
  const [isExternalSub, setIsExternalSub] = useState(false);

  const handleCodeVerified = (code: string, isExternal: boolean) => {
    setEnteredCode(code);
    setIsExternalSub(isExternal);
    setStep(2);
  };

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 selection:bg-slate-700 selection:text-white"
      dir="rtl"
    >
      <div />

      {/* Centered Login Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-base shadow-xs font-sans mx-auto mb-3">
            {mode === 'teacher' ? <GraduationCap className="w-6 h-6 text-white" /> : 'E1'}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 font-sans leading-tight">
            English for Iraq
          </h1>
          <p className="text-xs text-slate-500 font-arabic mt-1">
            {mode === 'teacher'
              ? 'دخول أستاذ المادة • لوحة التحكم'
              : 'الصف الأول المتوسط'}
          </p>
        </div>

        {mode === 'teacher' ? (
          <TeacherPinForm
            onTeacherLoginSuccess={onTeacherLoginSuccess}
            onBackToStudent={() => setMode('student')}
          />
        ) : step === 1 ? (
          <StudentCodeVerificationForm
            platformConfig={platformConfig}
            onCodeVerified={handleCodeVerified}
            onSwitchToTeacher={() => setMode('teacher')}
          />
        ) : (
          <StudentProfileRegistrationForm
            enteredCode={enteredCode}
            isExternalSub={isExternalSub}
            platformConfig={platformConfig}
            onActivated={onActivated}
          />
        )}
      </div>

      {/* Clean Footer */}
      <footer className="text-center text-xs text-slate-400 font-arabic pt-4" dir="rtl">
        <span>English for Iraq • الصف الأول المتوسط</span>
      </footer>
    </div>
  );
};
