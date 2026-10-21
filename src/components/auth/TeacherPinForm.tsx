import React, { useState } from 'react';
import { AlertCircle, ShieldCheck, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { verifyTeacherPin, hashTeacherPin } from '../../services/firebase';

interface TeacherPinFormProps {
  onTeacherLoginSuccess: () => void;
  onBackToStudent: () => void;
}

export const TeacherPinForm: React.FC<TeacherPinFormProps> = ({
  onTeacherLoginSuccess,
  onBackToStudent,
}) => {
  const [teacherPinInput, setTeacherPinInput] = useState('');
  const [teacherErrorMessage, setTeacherErrorMessage] = useState<string | null>(null);

  const handleVerifyTeacherPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherErrorMessage(null);

    const cleanPin = teacherPinInput.trim();
    if (!cleanPin) {
      setTeacherErrorMessage('يرجى إدخال الرمز السري للأستاذ');
      return;
    }

    const isValid = await verifyTeacherPin(cleanPin);
    if (isValid) {
      const token = await hashTeacherPin(cleanPin);
      localStorage.setItem('iq_teacher_token', token);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
      });
      onTeacherLoginSuccess();
    } else {
      setTeacherErrorMessage('الرمز السري غير صحيح، يرجى المحاولة ثانية.');
    }
  };

  return (
    <form onSubmit={handleVerifyTeacherPin} className="space-y-4 text-right">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-slate-700" />
          <span>أدخل رمز المرور السري للأستاذ (PIN):</span>
        </label>
        <input
          type="password"
          value={teacherPinInput}
          onChange={(e) => {
            setTeacherPinInput(e.target.value);
            if (teacherErrorMessage) setTeacherErrorMessage(null);
          }}
          placeholder="••••••"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-700 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-slate-800 placeholder:text-slate-300 transition-colors"
          autoFocus
        />
        <span className="text-[11px] text-slate-400 font-arabic block pt-0.5">
          خاص بمدرس المادة حصراً.
        </span>
      </div>

      {teacherErrorMessage && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-slate-700" />
          <span>{teacherErrorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors font-arabic"
      >
        <ShieldCheck className="w-4 h-4" />
        <span>دخول المنهاج كأستاذ المادة</span>
      </button>

      <div className="pt-3 text-center">
        <button
          type="button"
          onClick={onBackToStudent}
          className="inline-flex items-center justify-center min-h-[44px] px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100/60 font-arabic cursor-pointer transition-colors"
        >
          العودة لدخول الطلاب ←
        </button>
      </div>
    </form>
  );
};
