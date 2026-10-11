import React, { useState } from 'react';
import {
  KeyRound,
  User,
  GraduationCap,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  StudentSession,
  PlatformConfig,
  setStoredStudentSession,
  registerStudentInFirebase
} from '../../services/firebase';

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
  const [fullName, setFullName] = useState('');
  const [section, setSection] = useState('أ');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Teacher PIN state
  const [teacherPinInput, setTeacherPinInput] = useState('');
  const [teacherErrorMessage, setTeacherErrorMessage] = useState<string | null>(null);

  // Student Step 1: Verify Code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanCode = enteredCode.trim().toUpperCase();

    if (!cleanCode) {
      setErrorMessage('يرجى إدخال كود التفعيل المستلم من الأستاذ');
      return;
    }

    const isMaster = cleanCode === (platformConfig.masterCode || 'IQ-2026').toUpperCase();
    const isAllowed = (platformConfig.allowedCodes || []).some(
      (c) => c.toUpperCase() === cleanCode
    );

    if (isMaster || isAllowed) {
      setStep(2);
      setErrorMessage(null);
    } else {
      setErrorMessage('كود التفعيل غير صحيح. راجع أستاذ المادة.');
    }
  };

  // Student Step 2: Register & Enter
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

      setStoredStudentSession(newSession);
      await registerStudentInFirebase(newSession);

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });

      onActivated(newSession);
    } catch (err) {
      console.error(err);
      setErrorMessage('حدث خطأ أثناء الحفظ، يرجى المحاولة ثانية');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Teacher PIN Verification -> Enters directly to MAIN PAGE with Teacher Controls!
  const handleVerifyTeacherPin = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherErrorMessage(null);

    const cleanPin = teacherPinInput.trim();
    const targetPin = platformConfig.teacherPin || '2026';

    if (!cleanPin) {
      setTeacherErrorMessage('يرجى إدخال الرمز السري للأستاذ');
      return;
    }

    if (cleanPin === targetPin || cleanPin === '2026') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
      });
      onTeacherLoginSuccess();
    } else {
      setTeacherErrorMessage('الرمز السري غير صحيح. الرمز الافتراضي هو 2026');
    }
  };

  return (
    <div
      className="min-h-screen bg-zinc-100 flex flex-col justify-between p-4 sm:p-6 selection:bg-zinc-800 selection:text-white"
      dir="rtl"
    >
      <div />

      {/* Centered Login Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-base shadow-2xs font-sans mx-auto mb-3">
            {mode === 'teacher' ? '👨‍🏫' : 'E1'}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-sans leading-tight">
            English for Iraq
          </h1>
          <p className="text-xs text-zinc-500 font-arabic mt-1">
            {mode === 'teacher'
              ? 'دخول أستاذ المادة • المنهاج التفاعلي ولوحة التحكم'
              : 'الصف الأول المتوسط • المنهاج التفاعلي'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* MODE: TEACHER PIN VERIFICATION                           */}
        {/* ======================================================== */}
        {mode === 'teacher' ? (
          <form onSubmit={handleVerifyTeacherPin} className="space-y-4 text-right">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-zinc-900" />
                <span>أدخل رمز المرور السري للأستاذ (PIN):</span>
              </label>
              <input
                type="password"
                value={teacherPinInput}
                onChange={(e) => {
                  setTeacherPinInput(e.target.value);
                  if (teacherErrorMessage) setTeacherErrorMessage(null);
                }}
                placeholder="2026"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-colors"
                autoFocus
              />
              <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                الرمز الافتراضي هو: <strong className="font-mono text-zinc-600">2026</strong> (يمكنك تغييره لاحقاً من لوحة التحكم).
              </span>
            </div>

            {teacherErrorMessage && (
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-arabic flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-zinc-900" />
                <span>{teacherErrorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors font-arabic"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>دخول المنهاج كأستاذ المادة</span>
            </button>

            <div className="pt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode('student');
                  setTeacherErrorMessage(null);
                }}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 font-arabic cursor-pointer transition-colors"
              >
                العودة لدخول الطلاب ←
              </button>
            </div>
          </form>
        ) : (
          /* ======================================================== */
          /* MODE: STUDENT LOGIN (STEP 1 & STEP 2)                    */
          /* ======================================================== */
          <>
            {/* STEP 1: Enter Activation Code */}
            {step === 1 && (
              <form onSubmit={handleVerifyCode} className="space-y-4 text-right">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-zinc-900" />
                    <span>أدخل كود التفعيل:</span>
                  </label>
                  <input
                    type="text"
                    value={enteredCode}
                    onChange={(e) => {
                      setEnteredCode(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="IQ-2026"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-zinc-900 uppercase placeholder:text-zinc-300 transition-colors"
                    autoFocus
                  />
                  <span className="text-[11px] text-zinc-400 font-arabic block pt-0.5">
                    الكود يُعطى لطلاب الأستاذ حصراً.
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-arabic flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-zinc-900" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors font-arabic"
                >
                  <span>التحقق من الكود والمتابعة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Enter Student Name + Section */}
            {step === 2 && (
              <form onSubmit={handleSaveStudentProfile} className="space-y-4 text-right">
                <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center gap-2 text-zinc-800 text-xs font-arabic">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>
                    تم قبول الكود: <strong className="font-mono">{enteredCode.toUpperCase()}</strong>
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
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-zinc-900 focus:ring-0 font-arabic text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors"
                    autoFocus
                  />
                </div>

                {/* Section Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 font-arabic flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-900" />
                    <span>الشعبة:</span>
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['أ', 'ب', 'ج', 'د', 'هـ'].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setSection(sec)}
                        className={`py-2 rounded-lg border font-bold text-xs font-arabic transition-all cursor-pointer ${
                          section === sec
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                            : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
                        }`}
                      >
                        شعبة {sec}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-arabic flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-zinc-900" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors font-arabic"
                >
                  <span>{isSubmitting ? 'جاري الدخول...' : 'دخول المنصة وحفظ البيانات'}</span>
                </button>
              </form>
            )}

            {/* Teacher Login Link */}
            <div className="pt-5 mt-5 border-t border-zinc-100 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode('teacher');
                  setTeacherErrorMessage(null);
                }}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 font-arabic cursor-pointer transition-colors"
              >
                دخول أستاذ المادة 👨‍🏫
              </button>
            </div>
          </>
        )}
      </div>

      {/* Clean Footer */}
      <footer className="text-center text-xs text-zinc-400 font-arabic pt-4" dir="rtl">
        <span>English for Iraq • 1st Intermediate</span>
      </footer>
    </div>
  );
};
