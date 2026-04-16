import { Home, Users, FileText, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useLanguage } from '../i18n/LanguageContext';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t.nav.dashboard, path: '/dashboard' },
    { icon: Users, label: t.nav.customers, path: '/customers' },
    { icon: FileText, label: t.nav.reports, path: '/reports' },
    { icon: Settings, label: t.nav.settings, path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-green-600 dark:text-green-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}