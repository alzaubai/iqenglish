import React, { useState } from 'react';
import { KeyRound, AlertCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import { PlatformConfig, verifyStudentCodeOnline } from '../../services/firebase';

interface StudentCodeVerificationFormProps {
  platformConfig: PlatformConfig;
  onCodeVerified: (code: string, isExternal: boolean) => void;
  onSwitchToTeacher: () => void;
}

export const StudentCodeVerificationForm: React.FC<StudentCodeVerificationFormProps> = ({
  platformConfig,
  onCodeVerified,
  onSwitchToTeacher,
}) => {
  const [enteredCode, setEnteredCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanCode = enteredCode.trim().toUpperCase();

    if (!cleanCode) {
      setErrorMessage('يرجى إدخال كود التفعيل المستلم من الأستاذ');
      return;
    }

    if (cleanCode === 'IQ-2026' || cleanCode === 'IQ-XXXX') {
      setErrorMessage('هذا كود توضيحي فقط وغير صالح للتفعيل. يرجى إدخال الكود الفعلي المستلم من أستاذ المادة.');
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
      onCodeVerified(cleanCode, true);
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
      onCodeVerified(cleanCode, false);
      return;
    }

    const isMaster = cleanCode === (platformConfig.masterCode || 'IQ-7788').toUpperCase();
    const isAllowed = (platformConfig.allowedCodes || []).some(
      (c) => c.toUpperCase() === cleanCode
    );

    if (isMaster || isAllowed) {
      onCodeVerified(cleanCode, false);
      return;
    }

    // Direct online fallback check (guarantees student codes never fail)
    setIsSubmitting(true);
    try {
      const isValidOnline = await verifyStudentCodeOnline(cleanCode);
      if (isValidOnline) {
        onCodeVerified(cleanCode, false);
      } else {
        setErrorMessage('كود التفعيل غير صحيح. راجع أستاذ المادة.');
      }
    } catch {
      setErrorMessage('كود التفعيل غير صحيح. راجع أستاذ المادة.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
            placeholder="IQ-XXXX"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-700 focus:ring-0 text-center font-mono font-bold text-base tracking-widest text-slate-800 uppercase placeholder:text-slate-300 transition-colors"
            autoFocus
          />
          <span className="text-[11px] text-slate-400 font-arabic block pt-0.5">
            الكود يُعطى لطلاب الأستاذ حصراً (مثال شكلي: IQ-XXXX).
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
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors font-arabic"
        >
          <span>{isSubmitting ? 'جاري التحقق...' : 'التحقق من الكود والمتابعة'}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </form>

      {/* Teacher Login Link */}
      <div className="pt-4 mt-5 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={onSwitchToTeacher}
          className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100/60 font-arabic cursor-pointer transition-colors gap-1.5 mx-auto"
        >
          <GraduationCap className="w-4 h-4 text-slate-600" />
          <span>دخول أستاذ المادة</span>
        </button>
      </div>
    </>
  );
};
