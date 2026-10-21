import React from 'react';
import {
  Award,
  PenTool,
  Sliders,
  BarChart3,
  ShieldCheck,
  Globe,
  LucideIcon,
} from 'lucide-react';

export type DashboardTabId =
  | 'results'
  | 'builder'
  | 'lessons'
  | 'analytics'
  | 'codes'
  | 'subscriptions';

interface TabItem {
  id: DashboardTabId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  count?: number;
  category: 'exams' | 'curriculum' | 'management';
}

interface DashboardTabsNavProps {
  activeTab: DashboardTabId;
  onSelectTab: (tabId: DashboardTabId) => void;
  submissionsCount: number;
  studentsCount: number;
  subscriptionsCount?: number;
}

export const DashboardTabsNav: React.FC<DashboardTabsNavProps> = ({
  activeTab,
  onSelectTab,
  submissionsCount,
  studentsCount,
  subscriptionsCount,
}) => {
  const tabs: TabItem[] = [
    {
      id: 'results',
      label: 'نتائج الامتحانات والغياب',
      shortLabel: 'النتائج والغياب',
      icon: Award,
      count: submissionsCount,
      category: 'exams',
    },
    {
      id: 'builder',
      label: 'إعداد الامتحانات السريعة',
      shortLabel: 'إعداد الامتحان',
      icon: PenTool,
      category: 'exams',
    },
    {
      id: 'lessons',
      label: 'قفل وفتح المنهج والقواعد',
      shortLabel: 'المنهج والقواعد',
      icon: Sliders,
      category: 'curriculum',
    },
    {
      id: 'analytics',
      label: 'إحصائيات المنصة وتواجد الطلاب',
      shortLabel: 'إحصائيات الطلاب',
      icon: BarChart3,
      count: studentsCount,
      category: 'management',
    },
    {
      id: 'codes',
      label: 'أكواد التفعيل و PIN',
      shortLabel: 'الأكواد و PIN',
      icon: ShieldCheck,
      category: 'management',
    },
    {
      id: 'subscriptions',
      label: 'الاشتراكات الأونلاين والأجهزة',
      shortLabel: 'الاشتراكات والأجهزة',
      icon: Globe,
      count: subscriptionsCount,
      category: 'management',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs font-arabic" dir="rtl">
      {/* Category Labels & Clean Segmented Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`p-2.5 sm:py-3 sm:px-3 rounded-xl font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 sm:gap-2 text-right relative ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
                  : 'bg-slate-50/70 hover:bg-slate-100/90 text-slate-700 border border-slate-200/60'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                />
                <span className="text-xs truncate font-arabic font-bold hidden sm:inline">
                  {tab.label}
                </span>
                <span className="text-xs truncate font-arabic font-bold sm:hidden">
                  {tab.shortLabel}
                </span>
              </div>

              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
