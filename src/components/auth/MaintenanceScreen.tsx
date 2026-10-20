import React, { useState } from 'react';
import {
  Lock,
  ShieldAlert,
  KeyRound,
  AlertCircle,
  X,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  verifyTeacherPin,
  hashTeacherPin,
} from '../../services/firebase';

interface MaintenanceScreenProps {
  maintenanceMessageAr?: string;
  onTeacherLoginSuccess: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({
  maintenanceMessageAr,
  onTeacherLoginSuccess,
}) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [teacherPinInput, setTeacherPinInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [teacherErrorMessage, setTeacherErrorMessage] = useState<string | null>(null);

  const handleVerifyTeacherPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherErrorMessage(null);

    const cleanPin = teacherPinInput.trim();
    if (!cleanPin) {
      setTeacherErrorMessage('يرجى إدخال الرمز السري للأستاذ');
      return;
    }

    setIsVerifying(true);
    try {
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
    } catch (err) {
      console.error(err);
      setTeacherErrorMessage('حدث خطأ أثناء التحقق، يرجى المحاولة ثانية.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none font-sans"
      dir="rtl"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Brand & Discreet Admin Button */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
            E1
          </div>
          <div>
            <span className="text-sm font-bold text-slate-200 block leading-tight font-sans">
              English for Iraq
            </span>
            <span className="text-[10px] text-slate-400 font-arabic block leading-tight">
              الصف الأول المتوسط
            </span>
          </div>
        </div>

        {/* Discreet Teacher/Admin Access */}
        <button
          onClick={() => {
            setTeacherErrorMessage(null);
            setTeacherPinInput('');
            setIsAdminModalOpen(true);
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 font-arabic flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          title="دخول المشرف الإداري"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>بوابة الإدارة</span>
        </button>
      </header>

      {/* Main Closure Announcement Card */}
      <main className="w-full max-w-lg mx-auto my-auto z-10 text-center py-8">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Animated Lock Badge */}
          <div className="inline-flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
                <ShieldAlert className="w-10 h-10 animate-pulse text-rose-500" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
                <Lock className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold font-arabic">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>إشعار إداري عاجل</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3 py-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-arabic tracking-tight">
              المنصة مغلقة إلى إشعار آخر
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-relaxed max-w-md mx-auto">
              {maintenanceMessageAr ||
                'نود إعلامكم بأن المنصة مغلقة حالياً إلى إشعار آخر بأمر مدرس المادة.'}
            </p>
          </div>

          {/* Teacher Signature */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-arabic">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-slate-500" />
              <span>إشراف مدرس المادة:</span>
            </span>
            <span className="font-bold text-slate-200">أ. حسام محمود منصور</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center z-10 text-[11px] text-slate-500 font-arabic">
        منصة English for Iraq التفاعلية • جميع الحقوق محفوظة © {new Date().getFullYear()}
      </footer>

      {/* ======================================================== */}
      {/* ADMIN / TEACHER PIN ENTRY MODAL                          */}
      {/* ======================================================== */}
      {isAdminModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsAdminModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative space-y-5 text-right font-arabic"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    تسجيل دخول المشرف الإداري
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    خاص بالأستاذ حسام محمود منصور فقط
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Message */}
            {teacherErrorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{teacherErrorMessage}</span>
              </div>
            )}

            {/* PIN Form */}
            <form onSubmit={handleVerifyTeacherPin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  أدخل الرمز السري للأستاذ (Teacher PIN):
                </label>
                <input
                  type="password"
                  value={teacherPinInput}
                  onChange={(e) => setTeacherPinInput(e.target.value)}
                  placeholder="••••"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center text-lg tracking-widest focus:border-amber-400 focus:outline-hidden transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 shadow-md"
                >
                  {isVerifying ? (
                    <span>جاري التحقق...</span>
                  ) : (
                    <>
                      <span>تأكيد الدخول وتخطي الإغلاق</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
