import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { SummaryCard } from '../components/SummaryCard';
import { Button } from '../components/ui/button';
import { DollarSign, Users, TrendingUp, Plus, Receipt } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, customers, transactions } = useApp();
  const { t, language, isRTL } = useLanguage();

  const stats = useMemo(() => {
    const totalDebt = customers.reduce((sum, customer) => sum + customer.totalDebt, 0);
    const totalCustomers = customers.length;
    
    // Today's transactions
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.date.startsWith(today));

    return {
      totalDebt,
      totalCustomers,
      todayTransactions: todayTransactions.length,
    };
  }, [customers, transactions]);

  // Recent transactions
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-semibold mb-1">
            {language === 'ar' ? 'مرحباً بعودتك! 👋' : 'Welcome back! 👋'}
          </h1>
          <p className="text-green-100 text-sm">{user?.storeName || t.dashboard.title}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <SummaryCard
            title={t.dashboard.totalDebt}
            value={formatCurrency(stats.totalDebt, language)}
            icon={DollarSign}
            iconColor="text-red-600"
          />
          <SummaryCard
            title={t.dashboard.totalCustomers}
            value={stats.totalCustomers}
            icon={Users}
            iconColor="text-blue-600"
          />
        </div>

        <div className="mb-6">
          <SummaryCard
            title={t.dashboard.todayTransactions}
            value={stats.todayTransactions}
            icon={TrendingUp}
            iconColor="text-green-600"
          />
        </div>

        {/* Quick Action */}
        <Button
          onClick={() => navigate('/add-transaction')}
          className={`w-full bg-green-600 hover:bg-green-700 text-white h-14 rounded-xl text-base font-semibold mb-6 shadow-md ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.transactions.addTransaction}
        </Button>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="font-semibold text-gray-900 dark:text-white">{t.dashboard.recentTransactions}</h2>
            <button
              onClick={() => navigate('/reports')}
              className="text-sm text-green-600 dark:text-green-500 font-medium"
            >
              {t.dashboard.viewAll}
            </button>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t.dashboard.noTransactions}</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                {language === 'ar' 
                  ? 'ابدأ بإضافة عميل وإنشاء معاملة'
                  : 'Start by adding a customer and creating a transaction'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {getCustomerName(transaction.customerId)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                  </div>
                  <div className={`${isRTL ? 'text-left' : 'text-right'}`}>
                    <p className={`font-semibold text-sm ${
                      transaction.type === 'debt' 
                        ? 'text-red-600 dark:text-red-500' 
                        : 'text-green-600 dark:text-green-500'
                    }`}>
                      {transaction.type === 'debt' ? '+' : '-'}
                      {formatCurrency(transaction.totalAmount, language)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.type === 'debt' ? t.transactions.debt : t.transactions.payment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
