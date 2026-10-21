import React, { useState } from 'react';
import { Lock, AlertCircle, ShieldCheck } from 'lucide-react';
import { verifyTeacherPin, hashTeacherPin } from '../../services/firebase';

interface TeacherAuthCardProps {
  onAuthenticated: () => void;
}

export const TeacherAuthCard: React.FC<TeacherAuthCardProps> = ({ onAuthenticated }) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (!clean) {
      setPinError(true);
      return;
    }
    setIsVerifying(true);
    try {
      const isValid = await verifyTeacherPin(clean);
      if (isValid) {
        setPinError(false);
        const token = await hashTeacherPin(clean);
        localStorage.setItem('iq_teacher_token', token);
        setPinInput('');
        onAuthenticated();
      } else {
        setPinError(true);
      }
    } catch {
      setPinError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-5 shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center border border-slate-300 shadow-2xs">
        <Lock className="w-7 h-7 text-slate-700" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 font-arabic">
          تأكيد هوية أستاذ المادة
        </h2>
        <p className="text-xs text-slate-500 font-arabic mt-1">
          يرجى إدخال رمز المرور السري (PIN) للدخول إلى لوحة التحكم
        </p>
      </div>

      <form onSubmit={handleVerifyPin} className="space-y-4 text-right">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 font-arabic">
            الرمز السري (PIN):
          </label>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => {
              setPinInput(e.target.value);
              if (pinError) setPinError(false);
            }}
            placeholder="••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-slate-800 placeholder:text-slate-300 transition-colors"
            autoFocus
          />
          <span className="text-[11px] text-slate-400 font-arabic block pt-0.5">
            خاص بمدرس المادة حصراً.
          </span>
        </div>

        {pinError && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-slate-700" />
            <span>الرمز السري غير صحيح، يرجى المحاولة ثانية.</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isVerifying ? 'جاري التحقق...' : 'دخول لوحة التحكم'}</span>
        </button>
      </form>
    </div>
  );
};
