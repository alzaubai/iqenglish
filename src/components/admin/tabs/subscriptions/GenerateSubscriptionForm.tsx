import React from 'react';
import {
  Globe,
  Clock,
  User,
  Users,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Copy,
  Info,
  Tag,
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
  isGroupCodeInput: boolean;
  setIsGroupCodeInput: (val: boolean) => void;
  customCodeInput: string;
  setCustomCodeInput: (val: string) => void;
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
  isGroupCodeInput,
  setIsGroupCodeInput,
  customCodeInput,
  setCustomCodeInput,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-700" />
          <span>توليد أكواد الاشتراكات والتجربة</span>
        </h3>
        <p className="text-xs text-slate-500 font-arabic mt-1 leading-relaxed">
          اختر نوع الكود (فردي لطالب محدد، أو كود جماعي تجريبي لكروب كامل)، ثم حدد المدة واضغط زر التوليد.
        </p>
      </div>

      {/* Code Type Switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setIsGroupCodeInput(false)}
          className={`py-2 px-3 rounded-lg text-xs font-bold font-arabic transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            !isGroupCodeInput
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>👤 كود فردي (طالب واحد - جهاز واحد)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setIsGroupCodeInput(true);
            if (['3_months', '6_months', '1_year'].includes(subDurationInput)) {
              setSubDurationInput('1_day');
            }
          }}
          className={`py-2 px-3 rounded-lg text-xs font-bold font-arabic transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isGroupCodeInput
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-purple-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>👥 كود تجريبي جماعي (كروب كامل)</span>
        </button>
      </div>

      {isGroupCodeInput ? (
        /* ================= GROUP CODE FORM ================= */
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-4">
          <div className="flex items-start gap-2.5 text-purple-900 text-xs font-arabic">
            <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>ميزة الكود الجماعي التجريبي:</strong> كود واحد تنشره في كروب أولياء الأمور أو التليكرام/الواتساب. يدخل به مئات الطلاب معاً، وكل طالب يبدأ العداد التجريبي الخاص به من لحظة تسجيله للدخول بدون قفل على جهاز واحد.
            </p>
          </div>

          {/* Group Durations */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-purple-950 font-arabic flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>مدة التجربة لكل طالب في الكروب:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: '1_hour' as SubscriptionDuration, label: '⏱️ ساعة واحدة' },
                { id: '1_day' as SubscriptionDuration, label: '📅 يوم كامل (24س)' },
                { id: '3_days' as SubscriptionDuration, label: '🗓️ 3 أيام' },
                { id: '1_week' as SubscriptionDuration, label: '📆 أسبوع كامل' },
                { id: '1_month' as SubscriptionDuration, label: '🌟 شهر كامل' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSubDurationInput(item.id)}
                  className={`py-2 px-2 rounded-xl border text-xs font-bold font-arabic transition-all cursor-pointer text-center ${
                    subDurationInput === item.id
                      ? 'bg-purple-700 text-white border-purple-700 shadow-2xs'
                      : 'bg-white hover:bg-purple-100 border-purple-200 text-purple-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs for Group Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Custom Code Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-purple-950 font-arabic flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-600" />
                <span>كود مخصص سهل الحفظ (اختياري):</span>
              </label>
              <input
                type="text"
                value={customCodeInput}
                onChange={(e) => setCustomCodeInput(e.target.value.toUpperCase())}
                placeholder="مثال: FIRST2026 أو TRIAL24 (أو اتركه فارغاً)"
                className="w-full px-4 py-2.5 rounded-xl border border-purple-200 bg-white focus:border-purple-600 focus:ring-0 font-arabic text-xs text-slate-800 placeholder:text-slate-400 font-mono"
              />
              <span className="text-[11px] text-purple-700 font-arabic block">
                إذا تركته فارغاً، سينشئ النظام كوداً ذكياً مثل (GRP-1D-XXXX).
              </span>
            </div>

            {/* Note Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-purple-950 font-arabic flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>اسم الكروب أو الملاحظة (اختياري):</span>
              </label>
              <input
                type="text"
                value={subNoteInput}
                onChange={(e) => setSubNoteInput(e.target.value)}
                placeholder="مثال: كروب أولياء أمور الأول متوسط - تليكرام"
                className="w-full px-4 py-2.5 rounded-xl border border-purple-200 bg-white focus:border-purple-600 focus:ring-0 font-arabic text-xs text-slate-800 placeholder:text-slate-400"
              />
              <span className="text-[11px] text-purple-700 font-arabic block">
                تساعدك في تمييز الكود في قائمة الأكواد ومعرفة عدد الطلاب المشتركين منه.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ================= INDIVIDUAL CODE FORM ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Duration Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>الخطوة 1: اختيار مدة صلاحية الاشتراك:</span>
            </label>

            {/* Standard Durations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['1_month', '3_months', '6_months', '1_year'] as SubscriptionDuration[]).map((dur) => {
                const meta = SUBSCRIPTION_DURATIONS_MAP[dur];
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSubDurationInput(dur)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold font-arabic transition-all cursor-pointer text-center ${
                      subDurationInput === dur
                        ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {meta?.labelAr || dur}
                  </button>
                );
              })}
            </div>

            {/* Trial Duration Dropdown */}
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="trial-duration-select" className="text-xs font-bold text-amber-900 font-arabic flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>الاشتراكات التجريبية الفردية:</span>
                </label>
                {(subDurationInput === '1_hour' || subDurationInput === '1_day' || subDurationInput === '3_days' || subDurationInput === '1_week') && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-arabic">
                    محدد حالياً
                  </span>
                )}
              </div>
              <select
                id="trial-duration-select"
                value={
                  subDurationInput === '1_hour' || subDurationInput === '1_day' || subDurationInput === '3_days' || subDurationInput === '1_week'
                    ? subDurationInput
                    : ''
                }
                onChange={(e) => {
                  if (e.target.value) {
                    setSubDurationInput(e.target.value as SubscriptionDuration);
                  }
                }}
                className="w-full px-3 py-2 rounded-lg bg-white border border-amber-300 font-arabic text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer text-right"
                dir="rtl"
              >
                <option value="" disabled>
                  -- اختر مدة الاشتراك التجريبي الفردي --
                </option>
                <option value="1_hour">⏱️ تجريبي فردي: ساعة واحدة (60 دقيقة)</option>
                <option value="1_day">📅 تجريبي فردي: يوم كامل (24 ساعة)</option>
                <option value="3_days">🗓️ تجريبي فردي: 3 أيام</option>
                <option value="1_week">📆 تجريبي فردي: أسبوع كامل (7 أيام)</option>
              </select>
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
      )}

      {/* Main Generate Button & Fast Generation Options */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onGenerate()}
          disabled={isGeneratingSubCode}
          className={`px-6 py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer font-arabic transition-all shadow-xs disabled:opacity-50 ${
            isGroupCodeInput
              ? 'bg-purple-700 hover:bg-purple-800'
              : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          {isGeneratingSubCode ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white/80" />
              <span>جاري توليد الكود...</span>
            </>
          ) : isGroupCodeInput ? (
            <>
              <Users className="w-4 h-4 text-purple-200" />
              <span>
                إنشاء كود تجريبي جماعي للكروب ({SUBSCRIPTION_DURATIONS_MAP[subDurationInput]?.labelAr || 'المحدد'})
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                توليد كود اشتراك فردي ({SUBSCRIPTION_DURATIONS_MAP[subDurationInput]?.labelAr || 'المحدد'})
              </span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 font-arabic">توليد فوري سريع:</span>
          {isGroupCodeInput ? (
            /* Quick options for group code */
            ([
              { dur: '1_hour' as SubscriptionDuration, label: 'ساعة للكروب' },
              { dur: '1_day' as SubscriptionDuration, label: 'يوم للكروب' },
              { dur: '3_days' as SubscriptionDuration, label: '3 أيام للكروب' },
              { dur: '1_week' as SubscriptionDuration, label: 'أسبوع للكروب' },
            ]).map((item) => (
              <button
                key={item.dur}
                type="button"
                onClick={() => onGenerate(item.dur)}
                disabled={isGeneratingSubCode}
                className="px-2.5 py-1.5 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-bold font-arabic cursor-pointer transition-colors disabled:opacity-50"
              >
                +{item.label}
              </button>
            ))
          ) : (
            /* Quick options for individual code */
            (['1_hour', '1_day', '1_week', '1_month', '3_months', '6_months', '1_year'] as SubscriptionDuration[]).map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => onGenerate(dur)}
                disabled={isGeneratingSubCode}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold font-arabic cursor-pointer transition-colors disabled:opacity-50"
              >
                +{dur === '1_hour' ? 'ساعة تجريبية' : dur === '1_day' ? 'يوم تجريبي' : dur === '1_week' ? 'أسبوع تجريبي' : dur === '1_month' ? 'شهر' : dur === '3_months' ? '3 أشهر' : dur === '6_months' ? '6 أشهر' : 'سنة'}
              </button>
            ))
          )}
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
