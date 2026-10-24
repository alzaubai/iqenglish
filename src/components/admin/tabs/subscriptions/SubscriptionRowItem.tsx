import React from 'react';
import {
  Copy,
  Check,
  Smartphone,
  CalendarPlus,
  Play,
  Pause,
  Trash2,
  Users,
} from 'lucide-react';
import {
  ExternalSubscriptionCode,
  SubscriptionDuration,
  SUBSCRIPTION_DURATIONS_MAP,
} from '../../../../services/firebase';

interface SubscriptionRowItemProps {
  item: ExternalSubscriptionCode;
  copiedSubCode: string | null;
  onCopySubCode: (code: string) => void;
  onResetDevice: (code: string, studentName?: string) => void;
  onExtendSubscription: (code: string, days: number) => void;
  onToggleSubStatus: (code: string, currentStatus?: string) => void;
  onDeleteSub: (code: string) => void;
}

export const SubscriptionRowItem: React.FC<SubscriptionRowItemProps> = ({
  item,
  copiedSubCode,
  onCopySubCode,
  onResetDevice,
  onExtendSubscription,
  onToggleSubStatus,
  onDeleteSub,
}) => {
  const isExpired = Boolean(item.expiresAt && new Date() > new Date(item.expiresAt));
  const durationKey = item.duration as SubscriptionDuration;
  const durationMeta =
    (SUBSCRIPTION_DURATIONS_MAP && durationKey && SUBSCRIPTION_DURATIONS_MAP[durationKey]) ||
    (SUBSCRIPTION_DURATIONS_MAP && SUBSCRIPTION_DURATIONS_MAP['3_months']) ||
    { labelAr: 'اشتراك أونلاين' };

  const isTrial =
    item.duration === '1_hour' ||
    item.duration === '1_day' ||
    item.duration === '3_days' ||
    item.duration === '1_week';

  let timeRemainingText = '';
  if (item.expiresAt) {
    const diff = new Date(item.expiresAt).getTime() - Date.now();
    if (diff <= 0) {
      timeRemainingText = 'منتهي الصلاحية';
    } else if (item.duration === '1_hour') {
      const mins = Math.max(0, Math.ceil(diff / (1000 * 60)));
      timeRemainingText = `متبقي ${mins} دقيقة`;
    } else if (item.duration === '1_day') {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      timeRemainingText = `متبقي ${hours} ساعة و ${mins} دقيقة`;
    } else {
      const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      timeRemainingText = `متبقي ${days} يوم`;
    }
  }

  const formattedExpiry = item.expiresAt
    ? new Date(item.expiresAt).toLocaleDateString('ar-IQ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: isTrial ? '2-digit' : undefined,
        minute: isTrial ? '2-digit' : undefined,
      })
    : null;

  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-right ${
        item.isGroupCode
          ? 'bg-purple-50/30 border-purple-200 hover:border-purple-300'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="space-y-1.5 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-mono font-bold text-sm tracking-wider px-2.5 py-0.5 rounded-lg border ${
              item.isGroupCode
                ? 'text-purple-900 bg-purple-100 border-purple-300'
                : 'text-slate-900 bg-slate-100 border-slate-200'
            }`}
          >
            {item.code}
          </span>

          {item.isGroupCode && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200 font-arabic flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-600" />
              <span>كود كروب تجريبي</span>
            </span>
          )}

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-arabic">
            {durationMeta?.labelAr || 'اشتراك أونلاين'}
          </span>

          {item.status === 'suspended' ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-arabic">
              موقوف مؤقتاً
            </span>
          ) : item.isGroupCode ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-arabic">
              مفتوح للكروب ({item.usedCount || 0} طالب مسجل)
            </span>
          ) : isExpired ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-300 font-arabic">
              منتهي الصلاحية
            </span>
          ) : item.isUsed ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-arabic">
              نشط ({timeRemainingText})
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-arabic">
              {isTrial ? 'متاح للتجربة والإرسال' : 'متاح للبيع والإرسال'}
            </span>
          )}
        </div>

        {/* Details Row */}
        {item.isGroupCode ? (
          <div className="text-xs text-slate-600 font-arabic flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
            <span>
              الكروب / الحملة: <strong className="text-purple-900">{item.note || 'مفتوح للجميع'}</strong>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-purple-700 font-bold">
              <Users className="w-3 h-3" />
              <span>عدد الطلاب الذين دخلوا بالكود: {item.usedCount || 0}</span>
            </span>
            <span className="text-[11px] text-slate-500">
              مدة تجربة كل طالب: {durationMeta?.labelAr}
            </span>
            {item.usedAt && (
              <span className="text-[11px] text-slate-400">
                آخر دخول لطالب: {new Date(item.usedAt).toLocaleDateString('ar-IQ', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        ) : (
          <div className="text-xs text-slate-600 font-arabic flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
            {item.isUsed ? (
              <>
                <span>
                  المشترك: <strong className="text-slate-800">{item.usedByStudentName}</strong>
                  {item.governorate ? ` (${item.governorate})` : ''}
                </span>

                {item.deviceInfo && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Smartphone className="w-3 h-3 text-slate-400" />
                    <span>الجهاز: {item.deviceInfo}</span>
                    {item.deviceId ? (
                      <span className="text-emerald-600 text-[10px] font-bold">(مقفل)</span>
                    ) : (
                      <span className="text-amber-600 text-[10px] font-bold">(غير مقفل)</span>
                    )}
                  </span>
                )}

                {formattedExpiry && (
                  <span className="text-[11px] text-slate-400">
                    ينتهي في: {formattedExpiry}
                  </span>
                )}
              </>
            ) : (
              <span className="text-slate-400 text-[11px]">
                {item.note ? `ملاحظة: ${item.note}` : 'كود فردي غير مستخدم بعد، جاهز لإرساله لأي طالب.'}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto flex-wrap">
        <button
          type="button"
          onClick={() => onCopySubCode(item.code)}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
          title="نسخ الكود لمشاركته"
        >
          {copiedSubCode === item.code ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 text-[11px]">تم النسخ</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">نسخ</span>
            </>
          )}
        </button>

        {!item.isGroupCode && item.isUsed && item.deviceId && (
          <button
            type="button"
            onClick={() => onResetDevice(item.code, item.usedByStudentName)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-amber-50 text-slate-700 hover:text-amber-800 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
            title="فك قفل الجهاز ليتمكن الطالب من الدخول من هاتفه الجديد"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px]">فك قفل الجهاز</span>
          </button>
        )}

        {!item.isGroupCode && item.isUsed && (
          <button
            type="button"
            onClick={() => onExtendSubscription(item.code, 30)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
            title="تمديد الاشتراك 30 يوماً إضافياً"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px]">+30 يوم</span>
          </button>
        )}

        {(item.isGroupCode || item.isUsed) && (
          <button
            type="button"
            onClick={() => onToggleSubStatus(item.code, item.status)}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title={item.status === 'suspended' ? 'استئناف الكود' : 'إيقاف مؤقت للكود'}
          >
            {item.status === 'suspended' ? (
              <Play className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Pause className="w-3.5 h-3.5 text-amber-600" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => onDeleteSub(item.code)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          title="حذف الكود نهائياً"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
