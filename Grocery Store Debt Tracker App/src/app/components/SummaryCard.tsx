import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
}

export function SummaryCard({ title, value, icon: Icon, iconColor = 'text-green-600', trend }: SummaryCardProps) {
  const { isRTL } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-green-50 dark:bg-green-900/20 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}