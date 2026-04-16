import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Phone, Calendar, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils/currency';
import { iconSpacing, rtlFlex } from '../utils/rtl';

export function CustomerDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { customers, transactions, deleteTransaction } = useApp();
  const { t, language, isRTL } = useLanguage();

  const customer = useMemo(() => {
    return customers.find(c => c.id === id);
  }, [customers, id]);

  const customerTransactions = useMemo(() => {
    return [...transactions]
      .filter(t => t.customerId === id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, id]);

  const monthlyStats = useMemo(() => {
    const stats = new Map<string, number>();
    customerTransactions.forEach(transaction => {
      const month = new Date(transaction.date).toISOString().substring(0, 7);
      const amount = transaction.type === 'debt' ? transaction.totalAmount : -transaction.totalAmount;
      stats.set(month, (stats.get(month) || 0) + amount);
    });
    return Array.from(stats.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [customerTransactions]);

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t.customers.name || 'Customer not found'}</p>
          <Button onClick={() => navigate('/customers')}>{t.common.back}</Button>
        </div>
      </div>
    );
  }

  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm(t.customers.deleteConfirm || 'Are you sure you want to delete this transaction?')) {
      deleteTransaction(transactionId);
      toast.success(t.common.delete || 'Transaction deleted');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white p-6 pb-8">
        <div className={`max-w-md mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
          <button
            onClick={() => navigate('/customers')}
            className={`flex items-center text-white/90 hover:text-white mb-4 ${rtlFlex(isRTL)}`}
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180 ml-2' : 'mr-2'}`} />
            {t.common.back}
          </button>
          <h1 className="text-2xl font-bold mb-2">{customer.name}</h1>
          {customer.phone && (
            <div className={`flex items-center text-green-100 text-sm ${rtlFlex(isRTL)} inline-flex`}>
              <Phone className={`w-4 h-4 ${iconSpacing(isRTL)}`} />
              <span dir="ltr">{customer.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Total Debt Card */}
      <div className={`max-w-md mx-auto px-4 -mt-4 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t.customers.totalDebt}</p>
          <p className={`text-3xl font-bold ${
            customer.totalDebt > 0 
              ? 'text-red-600 dark:text-red-500' 
              : 'text-green-600 dark:text-green-500'
          }`}>
            {formatCurrency(customer.totalDebt, language)}
          </p>
        </div>
      </div>

      {/* Monthly Summary */}
      {monthlyStats.length > 0 && (
        <div className={`max-w-md mx-auto px-4 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {t.customerDetails.overview || 'Monthly Summary'}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-2">
            {monthlyStats.map(([month, total]) => (
              <div key={month} className={`flex items-center justify-between py-2 ${rtlFlex(isRTL)}`}>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(month).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long' })}
                </span>
                <span className={`font-semibold ${
                  total > 0 ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'
                }`}>
                  {formatCurrency(Math.abs(total), language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions */}
      <div className={`max-w-md mx-auto px-4 pb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {t.transactions.title} ({customerTransactions.length})
        </h2>

        {customerTransactions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">{t.common.loading || 'No transactions yet'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customerTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className={`flex items-start justify-between mb-3 ${rtlFlex(isRTL)}`}>
                  <div className="flex-1">
                    <div className={`flex items-center gap-2 mb-1 ${rtlFlex(isRTL)} flex-wrap`}>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.type === 'debt'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {transaction.type === 'debt' ? t.transactions.debt : t.transactions.payment}
                      </span>
                      <div className={`flex items-center text-xs text-gray-500 dark:text-gray-400 ${rtlFlex(isRTL)}`}>
                        <Calendar className={`w-3 h-3 ${iconSpacing(isRTL)}`} />
                        <span dir="ltr">{new Date(transaction.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                      </div>
                    </div>
                    {transaction.items.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {transaction.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                            • {item.name} ({item.quantity}x) - {formatCurrency(item.price, language)}
                          </div>
                        ))}
                      </div>
                    )}
                    {transaction.notes && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                        {t.transactions.notes || 'Note'}: {transaction.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className={`p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${isRTL ? 'mr-2' : 'ml-2'}`}
                    title={t.transactions.deleteTransaction || 'Delete transaction'}
                    aria-label={t.transactions.deleteTransaction || 'Delete transaction'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className={`flex items-center justify-between ${rtlFlex(isRTL)}`}>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t.transactions.amount || 'Amount'}</span>
                    <span className={`text-lg font-bold ${
                      transaction.type === 'debt'
                        ? 'text-red-600 dark:text-red-500'
                        : 'text-green-600 dark:text-green-500'
                    }`}>
                      {transaction.type === 'debt' ? '+' : '-'}
                      <span dir="ltr">{formatCurrency(transaction.totalAmount, language)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
