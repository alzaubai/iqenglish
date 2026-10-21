import React from 'react';
import {
  Globe,
  Clock,
  User,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import {
  SubscriptionDuration,
  SUBSCRIPTION_DURATIONS_MAP,
} from '../../../../services/firebase';

interface GenerateSubscriptionFormProps {
  subDurationInput: SubscriptionDuration;
  setSubDurationInput: (dur: SubscriptionDuration) => void;
  subNoteInput: string;
  setSubNoteInput: (val: string) => void;
  isGeneratingSubCode: boolean;
  onGenerate: (durationOverride?: SubscriptionDuration) => void;
  subMessage: string | null;
  copiedSubCode: string | null;
  onCopySubCode: (code: string) => void;
}

export const GenerateSubscriptionForm: React.FC<GenerateSubscriptionFormProps> = ({
  subDurationInput,
  setSubDurationInput,
  subNoteInput,
  setSubNoteInput,
  isGeneratingSubCode,
  onGenerate,
  subMessage,
  copiedSubCode,
  onCopySubCode,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-700" />
          <span>توليد كود اشتراك أونلاين خارجي</span>
        </h3>
        <p className="text-xs text-slate-500 font-arabic mt-1 leading-relaxed">
          اختر مدة الاشتراك (اسم المشتري اختياري تماماً)، ثم اضغط زر التوليد بالأسفل. يتم توليد كود واحد فقط لكل نقرة ويبقى ثابتاً ومحفوظاً في النظام.
        </p>
      </div>

      {/* Form Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Duration Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>الخطوة 1: اختيار مدة صلاحية الاشتراك:</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {(['1_hour', '1_month', '3_months', '6_months', '1_year'] as SubscriptionDuration[]).map((dur) => {
              const meta = (SUBSCRIPTION_DURATIONS_MAP && SUBSCRIPTION_DURATIONS_MAP[dur]) || {
                labelAr:
                  dur === '1_hour'
                    ? 'تجريبي (ساعة واحدة)'
                    : dur === '1_month'
                    ? 'شهر واحد (30 يوم)'
                    : dur === '3_months'
                    ? '3 أشهر (90 يوم)'
                    : dur === '6_months'
                    ? '6 أشهر (180 يوم)'
                    : 'سنة كاملة (365 يوم)',
              };
              return (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setSubDurationInput(dur)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold font-arabic transition-all cursor-pointer text-center ${
                    subDurationInput === dur
                      ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {meta?.labelAr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buyer Note / Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-600" />
            <span>الخطوة 2: اسم أو ملاحظة المشتري (اختياري تماماً):</span>
          </label>
          <input
            type="text"
            value={subNoteInput}
            onChange={(e) => setSubNoteInput(e.target.value)}
            placeholder="اختياري: اتركه فارغاً أو اكتب اسم المشتري (مثال: حيدر كرار - بغداد)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-0 font-arabic text-xs text-slate-800 placeholder:text-slate-400"
          />
          <span className="text-[11px] text-slate-400 font-arabic block">
            يمكنك ترك هذا الحقل فارغاً تماماً وتوليد الكود فوراً بدون كتابة اسم.
          </span>
        </div>
      </div>

      {/* Main Generate Button & Fast Generation Options */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onGenerate()}
          disabled={isGeneratingSubCode}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer font-arabic transition-all shadow-xs disabled:opacity-50"
        >
          {isGeneratingSubCode ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-300" />
              <span>جاري توليد كود اشتراك واحد...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                توليد كود اشتراك واحد الآن ({SUBSCRIPTION_DURATIONS_MAP[subDurationInput]?.labelAr || 'المحدد'})
              </span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 font-arabic">توليد فوري مباشر:</span>
          {(['1_hour', '1_month', '3_months', '6_months', '1_year'] as SubscriptionDuration[]).map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => onGenerate(dur)}
              disabled={isGeneratingSubCode}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold font-arabic cursor-pointer transition-colors disabled:opacity-50"
            >
              +{dur === '1_hour' ? 'ساعة تجريبية' : dur === '1_month' ? 'شهر' : dur === '3_months' ? '3 أشهر' : dur === '6_months' ? '6 أشهر' : 'سنة'}
            </button>
          ))}
        </div>
      </div>

      {subMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-arabic flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{subMessage}</span>
          </div>
          {copiedSubCode && (
            <button
              type="button"
              onClick={() => onCopySubCode(copiedSubCode)}
              className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs font-arabic flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>نسخ الكود</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
