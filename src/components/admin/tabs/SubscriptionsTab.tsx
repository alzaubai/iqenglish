import React, { useState } from 'react';
import {
  PlatformConfig,
  SubscriptionDuration,
  generateExternalSubscriptionCode,
  resetSubscriptionDevice,
  extendSubscription,
  toggleSubscriptionStatus,
  deleteExternalSubscription,
} from '../../../services/firebase';
import { SubscriptionStatsCards } from './subscriptions/SubscriptionStatsCards';
import { GenerateSubscriptionForm } from './subscriptions/GenerateSubscriptionForm';
import { SubscriptionsList } from './subscriptions/SubscriptionsList';

interface SubscriptionsTabProps {
  platformConfig: PlatformConfig;
}

export const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({ platformConfig }) => {
  const [subDurationInput, setSubDurationInput] = useState<SubscriptionDuration>('3_months');
  const [subNoteInput, setSubNoteInput] = useState('');
  const [isGroupCodeInput, setIsGroupCodeInput] = useState(false);
  const [customCodeInput, setCustomCodeInput] = useState('');
  const [isGeneratingSubCode, setIsGeneratingSubCode] = useState(false);
  const [copiedSubCode, setCopiedSubCode] = useState<string | null>(null);
  const [subMessage, setSubMessage] = useState<string | null>(null);
  const [subSearchQuery, setSubSearchQuery] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState<
    'all' | 'available' | 'active' | 'expired' | 'suspended' | 'group'
  >('all');

  const externalSubscriptions = platformConfig.externalSubscriptions || [];

  const handleGenerateSubscriptionCode = async (durationOverride?: SubscriptionDuration) => {
    setIsGeneratingSubCode(true);
    const targetDuration = durationOverride || subDurationInput;
    try {
      const newCode = await generateExternalSubscriptionCode(
        targetDuration,
        subNoteInput.trim() || undefined,
        isGroupCodeInput,
        customCodeInput.trim() || undefined
      );
      setSubMessage(
        isGroupCodeInput
          ? `تم إنشاء كود تجريبي جماعي بنجاح: ${newCode} (صالح لجميع طلاب الكروب)`
          : `تم توليد كود اشتراك جديد بنجاح: ${newCode}`
      );
      setCopiedSubCode(newCode);
      setSubNoteInput('');
      setCustomCodeInput('');
      setTimeout(() => setSubMessage(null), 6000);
    } catch {
      setSubMessage('حدث خطأ أثناء توليد الكود، يرجى المحاولة ثانية.');
      setTimeout(() => setSubMessage(null), 4000);
    } finally {
      setIsGeneratingSubCode(false);
    }
  };

  const handleCopySubCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSubCode(code);
      setTimeout(() => setCopiedSubCode(null), 2500);
    } catch {
      // fallback
    }
  };

  const handleResetDevice = async (code: string, studentName?: string) => {
    if (confirm(`هل أنت متأكد من فك قفل الجهاز للطالب "${studentName || code}"؟ سيتمكن من الدخول من هاتفه الجديد.`)) {
      try {
        await resetSubscriptionDevice(code);
        setSubMessage(`تم فك قفل الجهاز للكود ${code} بنجاح.`);
        setTimeout(() => setSubMessage(null), 4000);
      } catch {
        // handled
      }
    }
  };

  const handleExtendSubscription = async (code: string, daysToAdd: number = 30) => {
    try {
      await extendSubscription(code, daysToAdd);
      setSubMessage(`تم تمديد صلاحية الاشتراك ${daysToAdd} يوماً إضافياً بنجاح.`);
      setTimeout(() => setSubMessage(null), 4000);
    } catch {
      // handled
    }
  };

  const handleToggleSubStatus = async (code: string, currentStatus?: string) => {
    const next = currentStatus === 'suspended' ? 'active' : 'suspended';
    try {
      await toggleSubscriptionStatus(code, next as any);
      setSubMessage(next === 'suspended' ? `تم إيقاف الاشتراك مؤقتاً.` : `تم استئناف الاشتراك بنجاح.`);
      setTimeout(() => setSubMessage(null), 3000);
    } catch {
      // handled
    }
  };

  const handleDeleteSub = async (code: string) => {
    if (confirm(`تحذير: هل أنت متأكد من حذف كود الاشتراك (${code}) نهائياً من قاعدة البيانات؟`)) {
      try {
        await deleteExternalSubscription(code);
        setSubMessage(`تم حذف الكود ${code} نهائياً.`);
        setTimeout(() => setSubMessage(null), 3000);
      } catch {
        // handled
      }
    }
  };

  const totalSubsCount = externalSubscriptions.length;
  const activeSubsCount = externalSubscriptions.filter(
    (s) => (s.isGroupCode || s.isUsed) && s.status !== 'suspended' && (!s.expiresAt || new Date() <= new Date(s.expiresAt))
  ).length;
  const availableSubsCount = externalSubscriptions.filter((s) => !s.isUsed && !s.isGroupCode).length;
  const expiredSubsCount = externalSubscriptions.filter(
    (s) => s.status === 'suspended' || (s.expiresAt && new Date() > new Date(s.expiresAt))
  ).length;

  const filteredExternalSubscriptions = externalSubscriptions.filter((item) => {
    const isExpired = Boolean(item.expiresAt && new Date() > new Date(item.expiresAt));
    if (subStatusFilter === 'group' && !item.isGroupCode) return false;
    if (subStatusFilter === 'available' && (item.isUsed || item.isGroupCode)) return false;
    if (subStatusFilter === 'active' && (!item.isUsed && !item.isGroupCode || item.status === 'suspended' || isExpired)) return false;
    if (subStatusFilter === 'expired' && !isExpired) return false;
    if (subStatusFilter === 'suspended' && item.status !== 'suspended') return false;

    if (subSearchQuery.trim()) {
      const q = subSearchQuery.toLowerCase().trim();
      const codeMatch = item.code.toLowerCase().includes(q);
      const nameMatch = item.usedByStudentName?.toLowerCase().includes(q);
      const govMatch = item.governorate?.toLowerCase().includes(q);
      const noteMatch = item.note?.toLowerCase().includes(q);
      return codeMatch || nameMatch || govMatch || noteMatch;
    }
    return true;
  });

  return (
    <div className="space-y-5 text-right">
      <SubscriptionStatsCards
        totalSubsCount={totalSubsCount}
        activeSubsCount={activeSubsCount}
        availableSubsCount={availableSubsCount}
        expiredSubsCount={expiredSubsCount}
      />

      <GenerateSubscriptionForm
        subDurationInput={subDurationInput}
        setSubDurationInput={setSubDurationInput}
        subNoteInput={subNoteInput}
        setSubNoteInput={setSubNoteInput}
        isGeneratingSubCode={isGeneratingSubCode}
        onGenerate={handleGenerateSubscriptionCode}
        subMessage={subMessage}
        copiedSubCode={copiedSubCode}
        onCopySubCode={handleCopySubCode}
        isGroupCodeInput={isGroupCodeInput}
        setIsGroupCodeInput={setIsGroupCodeInput}
        customCodeInput={customCodeInput}
        setCustomCodeInput={setCustomCodeInput}
      />

      <SubscriptionsList
        filteredExternalSubscriptions={filteredExternalSubscriptions}
        subStatusFilter={subStatusFilter}
        setSubStatusFilter={setSubStatusFilter}
        subSearchQuery={subSearchQuery}
        setSubSearchQuery={setSubSearchQuery}
        copiedSubCode={copiedSubCode}
        onCopySubCode={handleCopySubCode}
        onResetDevice={handleResetDevice}
        onExtendSubscription={handleExtendSubscription}
        onToggleSubStatus={handleToggleSubStatus}
        onDeleteSub={handleDeleteSub}
      />
    </div>
  );
};
