import React, { useState } from 'react';
import {
  KeyRound,
  User,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  School
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  StudentSession,
  PlatformConfig,
  setStoredStudentSession,
  registerStudentInFirebase
} from '../../services/firebase';

interface StudentActivationModalProps {
  isOpen: boolean;
  platformConfig: PlatformConfig;
  onActivated: (session: StudentSession) => void;
  onOpenTeacherLogin?: () => void;
}

export const StudentActivationModal: React.FC<StudentActivationModalProps> = ({
  isOpen,
  platformConfig,
  onActivated,
  onOpenTeacherLogin,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [enteredCode, setEnteredCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [section, setSection] = useState('أ');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanCode = enteredCode.trim().toUpperCase();

    if (!cleanCode) {
      setErrorMessage('يرجى إدخال كود التفعيل المستلم من الأستاذ');
      return;
    }

    // Check against master code or allowed codes list
    const isMaster = cleanCode === (platformConfig.masterCode || 'IQ-2026').toUpperCase();
    const isAllowed = (platformConfig.allowedCodes || []).some(
      (c) => c.toUpperCase() === cleanCode
    );

    if (isMaster || isAllowed) {
      setStep(2);
      setErrorMessage(null);
    } else {
      setErrorMessage('كود التفعيل غير صحيح أو منتهي الصلاحية. راجع أستاذ المادة.');
    }
  };

  const handleSaveStudentProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = fullName.trim();
    if (!cleanName || cleanName.split(' ').length < 2) {
      setErrorMessage('يرجى كتابة الاسم الثنائي أو الثلاثي على الأقل');
      return;
    }

    if (!section) {
      setErrorMessage('يرجى اختيار الشعبة');
      return;
    }

    setIsSubmitting(true);
    try {
      const studentId = `std_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newSession: StudentSession = {
        id: studentId,
        fullName: cleanName,
        section: section,
        code: enteredCode.trim().toUpperCase(),
        registeredAt: new Date().toISOString(),
      };

      // Save locally & sync to Firebase Firestore
      setStoredStudentSession(newSession);
      await registerStudentInFirebase(newSession);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });

      onActivated(newSession);
    } catch (err) {
      console.error(err);
      setErrorMessage('حدث خطأ أثناء حفظ البيانات، يرجى المحاولة ثانية');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Card */}
        <div className="bg-zinc-900 text-white p-6 sm:p-7 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-amber-400 mb-3 shadow-inner">
            <School className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block uppercase">
            English for Iraq • 1st Intermediate
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-arabic mt-1">
            منهاج الأول المتوسط التفاعلي
          </h3>
          <p className="text-xs text-zinc-300 font-arabic mt-1">
            منصة خاصة بطلاب الأستاذ للمتابعة والامتحانات التفاعلية
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* STEP 1: Enter Activation Code */}
          {step === 1 && (
            <form onSubmit={handleVerifyCode} className="space-y-4 text-right">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-zinc-900" />
                  <span>أدخل كود التفعيل الخاص بك:</span>
                </label>
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => {
                    setEnteredCode(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="مثال: IQ-2026"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-200 focus:border-zinc-900 focus:ring-0 text-center font-mono font-black text-lg tracking-wider text-zinc-900 placeholder:text-zinc-300 placeholder:font-normal uppercase transition-colors"
                  autoFocus
                />
                <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                  الكود يُرسل إليك حصراً من قبل مدرس المادة (أ. حسام محمود منصور) في الصف أو عبر المجموعة.
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-arabic flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>التحقق من الكود والمتابعة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Enter Student Info (Name + Section) */}
          {step === 2 && (
            <form onSubmit={handleSaveStudentProfile} className="space-y-4 text-right">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-900 text-xs font-arabic">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  تم قبول الكود بنجاح: <strong className="font-mono">{enteredCode.toUpperCase()}</strong>
                </span>
              </div>

              {/* Student Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-900" />
                  <span>اسم الطالب الثلاثي:</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="مثال: علي حيدر حسن"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-zinc-200 focus:border-zinc-900 focus:ring-0 font-arabic text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors"
                  autoFocus
                />
              </div>

              {/* Section Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-900" />
                  <span>الشعبة:</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['أ', 'ب', 'ج', 'د', 'هـ'].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setSection(sec)}
                      className={`py-2.5 rounded-xl border-2 font-bold text-xs font-arabic transition-all cursor-pointer ${
                        section === sec
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                          : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
                      }`}
                    >
                      شعبة {sec}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-arabic flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isSubmitting ? 'جاري الحفظ والدخول...' : 'دخول المنصة وحفظ البيانات'}</span>
              </button>
            </form>
          )}

          {/* Teacher Login Link at bottom */}
          {onOpenTeacherLogin && (
            <div className="pt-2 border-t border-zinc-100 text-center">
              <button
                type="button"
                onClick={onOpenTeacherLogin}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 font-arabic cursor-pointer transition-colors"
              >
                هل أنت أستاذ المادة؟ <span className="underline">دخول لوحة تحكم الأستاذ</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
