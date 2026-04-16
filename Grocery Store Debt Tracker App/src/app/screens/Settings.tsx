import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { LogOut, User, Store, Moon, Sun, Database, Info, Download, Languages } from 'lucide-react';
import { toast } from 'sonner';
import { sampleCustomers, generateSampleTransactions } from '../utils/seedData';

export function Settings() {
  const navigate = useNavigate();
  const { user, logout, darkMode, toggleDarkMode, customers, transactions, addCustomer, addTransaction } = useApp();
  const { t, language, setLanguage, isRTL } = useLanguage();

  const handleLogout = () => {
    if (confirm(t.auth.logoutConfirm)) {
      logout();
      navigate('/login');
      toast.success(t.auth.logoutSuccess);
    }
  };

  const handleClearData = () => {
    if (confirm(t.settings.clearDataConfirm)) {
      localStorage.removeItem('debtTracker_customers');
      localStorage.removeItem('debtTracker_transactions');
      window.location.reload();
    }
  };

  const handleLoadSampleData = () => {
    if (customers.length > 0) {
      if (!confirm(t.settings.loadSampleDataConfirm)) {
        return;
      }
    }

    // Add sample customers and collect their IDs
    const customerIds: string[] = [];
    sampleCustomers.forEach(customer => {
      const id = Date.now().toString() + Math.random();
      customerIds.push(id);
      addCustomer(customer);
    });

    // Wait a bit for customers to be added, then add transactions
    setTimeout(() => {
      const sampleTransactions = generateSampleTransactions(customerIds);
      sampleTransactions.forEach(transaction => {
        addTransaction(transaction);
      });
      toast.success(t.settings.sampleDataLoaded);
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold">{t.settings.title}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.settings.profile}
          </h2>
          
          <div className="space-y-4">
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Store className="w-5 h-5 text-green-600 dark:text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.settings.storeName}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.storeName || 'N/A'}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.settings.email}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.email || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.settings.appearance}
          </h2>
          
          {/* Dark Mode */}
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-500" />
                ) : (
                  <Sun className="w-5 h-5 text-purple-600 dark:text-purple-500" />
                )}
              </div>
              <div>
                <Label htmlFor="dark-mode" className="font-medium">
                  {t.settings.darkMode}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.settings.darkModeDesc}
                </p>
              </div>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>

          {/* Language Toggle */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Languages className="w-5 h-5 text-orange-600 dark:text-orange-500" />
              </div>
              <div>
                <Label htmlFor="language" className="font-medium">
                  {t.settings.language}
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? t.settings.english : t.settings.arabic}
                </p>
              </div>
            </div>
            <Switch
              id="language"
              checked={language === 'ar'}
              onCheckedChange={toggleLanguage}
            />
          </div>
        </div>

        {/* Data Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.settings.dataStats}
          </h2>
          
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t.settings.totalCustomers}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {customers.length}
              </span>
            </div>
            
            <div className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t.settings.totalTransactions}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {transactions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.settings.dataManagement}
          </h2>
          
          <Button
            onClick={handleClearData}
            variant="outline"
            className={`w-full border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Database className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.settings.clearData}
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t.settings.clearDataDesc}
          </p>

          <Button
            onClick={handleLoadSampleData}
            variant="outline"
            className={`w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t.settings.loadSampleData}
          </Button>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className={`flex items-start gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Info className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {t.settings.about}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.settings.version}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t.settings.description}
          </p>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {t.settings.localStorageNote}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className={`w-full bg-red-600 hover:bg-red-700 text-white h-12 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <LogOut className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.auth.logout}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
