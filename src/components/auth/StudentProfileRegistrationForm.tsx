import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
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
  markSingleUseCodeAsUsed,
  getOrCreateDeviceId,
  getDeviceSummary,
  activateExternalSubscription,
} from '../../services/firebase';
import { IRAQ_GOVERNORATES } from './constants';

interface StudentProfileRegistrationFormProps {
  enteredCode: string;
  isExternalSub: boolean;
  platformConfig: PlatformConfig;
  onActivated: (session: StudentSession) => void;
}

export const StudentProfileRegistrationForm: React.FC<StudentProfileRegistrationFormProps> = ({
  enteredCode,
  isExternalSub,
  platformConfig,
  onActivated,
}) => {
  const [fullName, setFullName] = useState('');
  const [section, setSection] = useState('أ');
  const [governorate, setGovernorate] = useState('بغداد');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Check if student already exists with this name and section to prevent duplicates
      const existingStudent = await findExistingStudent(cleanName, section);

      let sessionToSave: StudentSession;
      if (existingStudent) {
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

  return (
    <form onSubmit={handleSaveStudentProfile} className="space-y-4 text-right">
      {isExternalSub ? (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-800 text-xs font-arabic">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-bold text-slate-800">
              اشتراك أونلاين:{' '}
              <strong className="font-mono text-slate-900">{enteredCode.toUpperCase()}</strong>
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
  );
};
