import React, { useState } from 'react';
import {
  KeyRound,
  User,
  GraduationCap,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Lock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  StudentSession,
  PlatformConfig,
  setStoredStudentSession,
  registerStudentInFirebase,
  findExistingStudent,
  verifyStudentCodeOnline,
  verifyTeacherPin,
  hashTeacherPin,
  markSingleUseCodeAsUsed,
  getOrCreateDeviceId,
  getDeviceSummary,
  activateExternalSubscription,
  SUBSCRIPTION_DURATIONS_MAP,
} from '../../services/firebase';

const IRAQ_GOVERNORATES = [
  'بغداد',
  'البصرة',
  'نينوى (الموصل)',
  'أربيل',
  'النجف الأشرف',
  'كربلاء المقدسة',
  'كركوك',
  'ذي قار (الناصرية)',
  'بابل (الحلة)',
  'الأنبار',
  'ديالى',
  'صلاح الدين',
  'واسط (الكوت)',
  'ميسان (العمارة)',
  'المثنى (السماوة)',
  'القادسية (الديوانية)',
  'دهوك',
  'السليمانية',
];

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
  const [isExternalSub, setIsExternalSub] = useState(false);
  const [governorate, setGovernorate] = useState('بغداد');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Teacher PIN state
  const [teacherPinInput, setTeacherPinInput] = useState('');
  const [teacherErrorMessage, setTeacherErrorMessage] = useState<string | null>(null);

  // Student Step 1: Verify Code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanCode = enteredCode.trim().toUpperCase();

    if (!cleanCode) {
      setErrorMessage('يرجى إدخال كود التفعيل المستلم من الأستاذ');
      return;
    }

    const isRevoked = (platformConfig.revokedCodes || []).some(
      (c) => c.toUpperCase() === cleanCode
    );

    if (isRevoked) {
      setErrorMessage(
        'تم إلغاء تفعيل هذا الكود. لا يمكنك الدخول به ثانية، يرجى مراجعة أستاذ المادة لاستلام كود جديد.'
      );
      return;
    }

    // 1. Check External Subscriptions (Paid Online Subscribers)
    const externalSub = (platformConfig.externalSubscriptions || []).find(
      (s) => s.code.toUpperCase() === cleanCode
    );

    if (externalSub) {
      if (externalSub.status === 'suspended') {
        setErrorMessage('عذراً، هذا الاشتراك موقوف مؤقتاً من قبل أستاذ المادة.');
        return;
      }
      if (
        externalSub.status === 'expired' ||
        (externalSub.expiresAt && new Date() > new Date(externalSub.expiresAt))
      ) {
        setErrorMessage(
          externalSub.duration === '1_hour'
            ? 'عذراً، لقد انتهت صلاحية هذا الكود التجريبي (ساعة واحدة). للاشتراك الكامل يرجى التواصل مع أستاذ المادة.'
            : 'عذراً، لقد انتهت صلاحية هذا الاشتراك. يرجى التواصل مع أستاذ المادة لتجديد الاشتراك.'
        );
        return;
      }
      setIsExternalSub(true);
      setStep(2);
      setErrorMessage(null);
      return;
    }

    // 2. Check Single-Use Codes (one student, one-time only)
    const singleCode = (platformConfig.singleUseCodes || []).find(
      (c) => c.code.toUpperCase() === cleanCode
    );

    if (singleCode) {
      if (singleCode.isUsed) {
        setErrorMessage(
          `هذا الكود مخصص لطالب واحد فقط وقد تم استخدامه مسبقاً (${singleCode.usedByStudentName || 'طالب آخر'}). راجع أستاذ المادة.`
        );
        return;
      }
      setIsExternalSub(false);
      setStep(2);
      setErrorMessage(null);
      return;
    }

    const isMaster = cleanCode === (platformConfig.masterCode || 'IQ-2026').toUpperCase();
    const isAllowed = (platformConfig.allowedCodes || []).some(
      (c) => c.toUpperCase() === cleanCode
    );

    if (isMaster || isAllowed) {
      setIsExternalSub(false);
      setStep(2);
      setErrorMessage(null);
      return;
    }

    // Direct online fallback check (guarantees student codes never fail)
    setIsSubmitting(true);
    try {
      const isValidOnline = await verifyStudentCodeOnline(cleanCode);
      if (isValidOnline) {
        setIsExternalSub(false);
        setStep(2);
        setErrorMessage(null);
      } else {
        setErrorMessage('كود التفعيل غير صحيح. راجع أستاذ المادة.');
      }
    } catch {
      setErrorMessage('كود التفعيل غير صحيح. راجع أستاذ المادة.');
    } finally {
      setIsSubmitting(false);
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

    const cleanCode = enteredCode.trim().toUpperCase();

    // ========================================================
    // EXTERNAL ONLINE SUBSCRIBER REGISTRATION & DEVICE LOCK
    // ========================================================
    if (isExternalSub) {
      setIsSubmitting(true);
      try {
        const deviceId = getOrCreateDeviceId();
        const deviceInfo = getDeviceSummary();
        const studentId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

        const activationResult = await activateExternalSubscription(
          cleanCode,
          cleanName,
          studentId,
          governorate,
          deviceId,
          deviceInfo
        );

        if (!activationResult.success) {
          setErrorMessage(activationResult.message || 'تعذر تفعيل كود الاشتراك.');
          setIsSubmitting(false);
          return;
        }

        const externalSubObj = (platformConfig.externalSubscriptions || []).find(
          (s) => s.code.toUpperCase() === cleanCode
        );

        const sessionToSave: StudentSession = {
          id: externalSubObj?.usedByStudentId || studentId,
          fullName: cleanName,
          section: 'مشترك أونلاين',
          code: cleanCode,
          registeredAt: externalSubObj?.usedAt || new Date().toISOString(),
          totalTimeSpentMinutes: 0,
          visitCount: 1,
          isExternalSubscriber: true,
          governorate: governorate,
          subscriptionDuration: externalSubObj?.duration || '3_months',
          subscriptionExpiresAt: activationResult.expiresAt,
          deviceId: deviceId,
        };

        setStoredStudentSession(sessionToSave);
        await registerStudentInFirebase(sessionToSave);

        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });

        onActivated(sessionToSave);
      } catch (err) {
        console.error(err);
        setErrorMessage('حدث خطأ أثناء تفعيل الاشتراك، يرجى المحاولة ثانية.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // ========================================================
    // REGULAR SCHOOL STUDENT REGISTRATION
    // ========================================================
    if (!section) {
      setErrorMessage('يرجى اختيار الشعبة');
      return;
    }

    // Check if this specific student (name + code) was previously deleted/revoked
    // This blocks only the deleted student - other students using the same code are unaffected
    const isStudentRevoked = (platformConfig.revokedStudents || []).some(
      (r) =>
        r.code.toUpperCase() === cleanCode &&
        r.name.trim().toLowerCase() === cleanName.toLowerCase()
    );

    if (isStudentRevoked) {
      setErrorMessage(
        'تم إلغاء تفعيل حسابك بهذا الكود من قبل أستاذ المادة. يرجى مراجعة الأستاذ لاستلام كود جديد.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Check single-use code ownership
      const singleCodeObj = (platformConfig.singleUseCodes || []).find(
        (c) => c.code.toUpperCase() === cleanCode
      );

      if (singleCodeObj && singleCodeObj.isUsed) {
        if (singleCodeObj.usedByStudentName?.trim().toLowerCase() !== cleanName.toLowerCase()) {
          setErrorMessage(
            `هذا الكود مستخدم مسبقاً لطالب آخر (${singleCodeObj.usedByStudentName}) ولا يمكن استخدامه باسم مختلف.`
          );
          setIsSubmitting(false);
          return;
        }
      }

      // 1. Check if student already exists with this name and section to prevent duplicates
      const existingStudent = await findExistingStudent(cleanName, section);

      let sessionToSave: StudentSession;
      if (existingStudent) {
        // Reuse existing student ID to preserve all historical grades and avoid duplicate records
        sessionToSave = {
          ...existingStudent,
          fullName: cleanName,
          section: section,
          code: cleanCode,
        };
      } else {
        const studentId = `std_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        sessionToSave = {
          id: studentId,
          fullName: cleanName,
          section: section,
          code: cleanCode,
          registeredAt: new Date().toISOString(),
          totalTimeSpentMinutes: 0,
          visitCount: 1,
        };
      }

      setStoredStudentSession(sessionToSave);
      await registerStudentInFirebase(sessionToSave);

      // Mark single-use code as used if not already marked
      if (singleCodeObj && !singleCodeObj.isUsed) {
        await markSingleUseCodeAsUsed(cleanCode, cleanName, sessionToSave.id, section);
      }

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });

      onActivated(sessionToSave);
    } catch (err) {
      console.error(err);
      setErrorMessage('حدث خطأ أثناء الحفظ، يرجى المحاولة ثانية');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Teacher PIN Verification -> Enters directly to MAIN PAGE with Teacher Controls!
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
              ? 'دخول أستاذ المادة: أ. حسام محمود منصور • لوحة التحكم'
              : 'الصف الأول المتوسط • إشراف مدرس المادة: أ. حسام محمود منصور'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* MODE: TEACHER PIN VERIFICATION                           */}
        {/* ======================================================== */}
        {mode === 'teacher' ? (
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
                onClick={() => {
                  setMode('student');
                  setTeacherErrorMessage(null);
                }}
                className="inline-flex items-center justify-center min-h-[44px] px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100/60 font-arabic cursor-pointer transition-colors"
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
                  <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-slate-700" />
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-700 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-slate-800 uppercase placeholder:text-slate-300 transition-colors"
                    autoFocus
                  />
                  <span className="text-[11px] text-slate-400 font-arabic block pt-0.5">
                    الكود يُعطى لطلاب الأستاذ حصراً.
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-slate-700" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors font-arabic"
                >
                  <span>التحقق من الكود والمتابعة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Enter Student Name + Section / Governorate */}
            {step === 2 && (
              <form onSubmit={handleSaveStudentProfile} className="space-y-4 text-right">
                {isExternalSub ? (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-800 text-xs font-arabic">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-bold text-slate-800">
                        اشتراك أونلاين: <strong className="font-mono text-slate-900">{enteredCode.toUpperCase()}</strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      جميع الدروس العشرة ومواضيع القواعد مفتوحة لك بالكامل فور الدخول.
                    </span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-800 text-xs font-arabic">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      تم قبول الكود: <strong className="font-mono">{enteredCode.toUpperCase()}</strong>
                    </span>
                  </div>
                )}

                {/* Student Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-700" />
                    <span>{isExternalSub ? 'اسم الطالب الكامل:' : 'اسم الطالب الثلاثي:'}</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={isExternalSub ? 'مثال: حيدر كرار جاسم' : 'مثال: علي حيدر حسن'}
                    className="w-full px-4 py-2.5 min-h-[44px] rounded-xl border border-slate-300 focus:border-slate-700 focus:ring-0 font-arabic text-base sm:text-sm text-slate-800 placeholder:text-slate-400 transition-colors"
                    autoFocus
                  />
                </div>

                {/* External Sub: Governorate Selector */}
                {isExternalSub ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-700" />
                      <span>المحافظة:</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full px-4 py-2.5 min-h-[44px] rounded-xl border border-slate-300 focus:border-slate-700 focus:ring-0 font-arabic text-base sm:text-sm text-slate-800 bg-white transition-colors cursor-pointer"
                    >
                      {IRAQ_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  /* School Students: Section Selector */
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
                      <span>الشعبة:</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['أ', 'ب', 'ج', 'د'].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => setSection(sec)}
                          className={`py-2 rounded-lg border font-bold text-xs font-arabic transition-all cursor-pointer ${
                            section === sec
                              ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          شعبة {sec}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-slate-700" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors font-arabic"
                >
                  <span>
                    {isSubmitting
                      ? 'جاري الدخول...'
                      : isExternalSub
                      ? 'تأكيد الدخول وفتح كافة الدروس'
                      : 'دخول المنصة وحفظ البيانات'}
                  </span>
                </button>
              </form>
            )}

            {/* Teacher Login Link */}
            <div className="pt-4 mt-5 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode('teacher');
                  setTeacherErrorMessage(null);
                }}
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100/60 font-arabic cursor-pointer transition-colors gap-1.5 mx-auto"
              >
                <GraduationCap className="w-4 h-4 text-slate-600" />
                <span>دخول أستاذ المادة</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Clean Footer */}
      <footer className="text-center text-xs text-slate-400 font-arabic pt-4" dir="rtl">
        <span>English for Iraq • الصف الأول المتوسط • إعداد وإشراف مدرس المادة: أ. حسام محمود منصور</span>
      </footer>
    </div>
  );
};
