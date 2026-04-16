import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Search, Plus, UserCircle, Phone, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '../utils/currency';
import { iconSpacing, rtlFlex } from '../utils/rtl';

export function Customers() {
  const navigate = useNavigate();
  const { customers, addCustomer, deleteCustomer } = useApp();
  const { t, language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    );
  }, [customers, searchQuery]);

  const handleAddCustomer = () => {
    if (!newCustomerName.trim()) {
      toast.error(language === 'ar' ? 'الرجاء إدخال اسم العميل' : 'Please enter customer name');
      return;
    }

    addCustomer({
      name: newCustomerName,
      phone: newCustomerPhone,
    });

    toast.success(t.customers.customerAdded);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setShowAddDialog(false);
  };

  const handleDeleteCustomer = (id: string, name: string) => {
    if (confirm(t.customers.deleteConfirm)) {
      deleteCustomer(id);
      toast.success(t.customers.customerDeleted);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.customers.title}</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
            <Input
              type="text"
              placeholder={t.customers.searchCustomers}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isRTL ? 'pr-10' : 'pl-10'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-4">
        {/* Add Button */}
        <Button
          onClick={() => setShowAddDialog(true)}
          className={`w-full bg-green-600 hover:bg-green-700 text-white mb-4 h-12 rounded-xl ${rtlFlex(isRTL)}`}
        >
          <Plus className={`w-5 h-5 ${iconSpacing(isRTL)}`} />
          {t.customers.addCustomer}
        </Button>

        {/* Customer List */}
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <UserCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? t.customers.noCustomers : t.customers.noCustomers}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              {searchQuery 
                ? (language === 'ar' ? 'جرب بحثاً مختلفاً' : 'Try a different search')
                : (language === 'ar' ? 'أضف عميلك الأول للبدء' : 'Add your first customer to get started')
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className={`flex items-start justify-between mb-3 ${rtlFlex(isRTL)}`}>
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/customer/${customer.id}`)}
                  >
                    <div className={`flex items-center mb-1 ${rtlFlex(isRTL)}`}>
                      <UserCircle className={`w-5 h-5 text-gray-400 ${iconSpacing(isRTL)}`} />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {customer.name}
                      </h3>
                    </div>
                    {customer.phone && (
                      <div className={`flex items-center text-sm text-gray-500 dark:text-gray-400 ${rtlFlex(isRTL)}`}>
                        <Phone className={`w-4 h-4 ${iconSpacing(isRTL)}`} />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className={`pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between ${rtlFlex(isRTL)}`}>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t.customers.totalDebt}</span>
                  <span className={`font-semibold ${
                    customer.totalDebt > 0 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-green-600 dark:text-green-500'
                  }`}>
                    {formatCurrency(customer.totalDebt, language)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Customer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.customers.addCustomer}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="customerName">{t.customers.name} *</Label>
              <Input
                id="customerName"
                placeholder={t.customers.enterName}
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="mt-1"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">{t.customers.phone}</Label>
              <Input
                id="customerPhone"
                type="tel"
                placeholder={t.customers.enterPhone}
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
                className="mt-1"
                dir="ltr"
              />
            </div>
          </div>
          <DialogFooter className={rtlFlex(isRTL)}>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {t.common.cancel}
            </Button>
            <Button
              onClick={handleAddCustomer}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {t.customers.addCustomer}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
