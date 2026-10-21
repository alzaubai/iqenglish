import React from 'react';
import { Users, Search, AlertCircle } from 'lucide-react';
import { ExternalSubscriptionCode } from '../../../../services/firebase';
import { SubscriptionRowItem } from './SubscriptionRowItem';

interface SubscriptionsListProps {
  filteredExternalSubscriptions: ExternalSubscriptionCode[];
  subStatusFilter: 'all' | 'available' | 'active' | 'expired' | 'suspended';
  setSubStatusFilter: (
    filter: 'all' | 'available' | 'active' | 'expired' | 'suspended'
  ) => void;
  subSearchQuery: string;
  setSubSearchQuery: (query: string) => void;
  copiedSubCode: string | null;
  onCopySubCode: (code: string) => void;
  onResetDevice: (code: string, studentName?: string) => void;
  onExtendSubscription: (code: string, days: number) => void;
  onToggleSubStatus: (code: string, currentStatus?: string) => void;
  onDeleteSub: (code: string) => void;
}

export const SubscriptionsList: React.FC<SubscriptionsListProps> = ({
  filteredExternalSubscriptions,
  subStatusFilter,
  setSubStatusFilter,
  subSearchQuery,
  setSubSearchQuery,
  copiedSubCode,
  onCopySubCode,
  onResetDevice,
  onExtendSubscription,
  onToggleSubStatus,
  onDeleteSub,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-700" />
            <span>سجل المشتركين والأكواد الأونلاين ({filteredExternalSubscriptions.length})</span>
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            تحكم كامل بكل مشترك: فك قفل الجهاز عند تغيير الهاتف، التمديد، الإيقاف المؤقت أو الحذف.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap gap-1">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'available', label: 'متاح للبيع' },
            { id: 'active', label: 'نشط' },
            { id: 'expired', label: 'منتهي' },
            { id: 'suspended', label: 'موقوف' },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setSubStatusFilter(flt.id as any)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-arabic transition-colors cursor-pointer ${
                subStatusFilter === flt.id
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        <input
          type="text"
          value={subSearchQuery}
          onChange={(e) => setSubSearchQuery(e.target.value)}
          placeholder="ابحث برقم الكود، اسم الطالب، المحافظة، أو الملاحظة..."
          className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-slate-800 font-arabic placeholder:text-slate-400"
        />
      </div>

      {/* Subscriptions List */}
      {filteredExternalSubscriptions.length === 0 ? (
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-arabic space-y-2">
          <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
          <p className="font-bold text-slate-700">لا توجد أكواد مطابقة لبحثك</p>
          <span className="text-[11px] text-slate-400 block">
            يمكنك توليد كود اشتراك جديد من الخانة أعلاه أو تغيير فلتر البحث.
          </span>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {filteredExternalSubscriptions.map((item) => (
            <SubscriptionRowItem
              key={item.code}
              item={item}
              copiedSubCode={copiedSubCode}
              onCopySubCode={onCopySubCode}
              onResetDevice={onResetDevice}
              onExtendSubscription={onExtendSubscription}
              onToggleSubStatus={onToggleSubStatus}
              onDeleteSub={onDeleteSub}
            />
          ))}
        </div>
      )}
    </div>
  );
};
