import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils/currency';
import { iconSpacing, rtlFlex } from '../utils/rtl';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

export function AddTransaction() {
  const navigate = useNavigate();
  const { customers, addTransaction } = useApp();
  const { t, language, isRTL } = useLanguage();
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 1, price: 0 }]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [type, setType] = useState<'debt' | 'payment'>('debt');

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    if (type === 'payment') return items[0].price;
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId) {
      toast.error('Please select a customer');
      return;
    }

    if (type === 'debt' && items.some(item => !item.name.trim())) {
      toast.error('Please fill in all item names');
      return;
    }

    const total = calculateTotal();

    if (total <= 0) {
      toast.error('Total amount must be greater than 0');
      return;
    }

    addTransaction({
      customerId,
      items: type === 'debt' ? items : [],
      totalAmount: total,
      date,
      notes: notes.trim() || undefined,
      type,
    });

    toast.success(
      type === 'debt' 
        ? t.common.save
        : t.common.save
    );
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className={`max-w-md mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2 ${rtlFlex(isRTL)}`}
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180 ml-2' : 'mr-2'}`} />
            {t.common.back}
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.transactions.addTransaction}</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
          {/* Transaction Type */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <Label>{t.transactions.title || 'Transaction Type'}</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setType('debt')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  type === 'debt'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <p className="font-semibold">{t.transactions.debt}</p>
              </button>
              <button
                type="button"
                onClick={() => setType('payment')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  type === 'payment'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <p className="font-semibold">{t.transactions.payment}</p>
              </button>
            </div>
          </div>

          {/* Customer Selection */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <Label htmlFor="customer">{t.customers.name} *</Label>
            <Select value={customerId} onValueChange={setCustomerId} dir={isRTL ? 'rtl' : 'ltr'}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={t.common.search} />
              </SelectTrigger>
              <SelectContent>
                {customers.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No customers found.
                  </div>
                ) : (
                  customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Items (only for debt transactions) */}
          {type === 'debt' && (
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className={`flex items-center justify-between mb-2 ${rtlFlex(isRTL)}`}>
                <Label>{t.transactions.notes || 'Items'}</Label>
                <Button
                  type="button"
                  onClick={handleAddItem}
                  variant="outline"
                  size="sm"
                  className={`h-8 text-xs flex items-center ${rtlFlex(isRTL)}`}
                >
                  <Plus className={`w-3 h-3 ${iconSpacing(isRTL)}`} />
                  {t.common.add}
                </Button>
              </div>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3"
                  >
                    <div className={`flex items-start justify-between ${rtlFlex(isRTL)}`}>
                      <Label className="text-sm">{t.common.add} {index + 1}</Label>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-700"
                          title={t.transactions.removeItem || 'Remove item'}
                          aria-label={t.transactions.removeItem || 'Remove item'}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <Input
                      placeholder={t.transactions.notes || 'Item'}
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">{t.transactions.quantity || 'Qty'}</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)
                          }
                          className="mt-1"
                          dir="ltr"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs">{t.transactions.price || 'Price'}</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(index, 'price', parseFloat(e.target.value) || 0)
                          }
                          className="mt-1"
                          dir="ltr"
                          required
                        />
                      </div>
                    </div>
                    <div className={`text-sm text-gray-600 dark:text-gray-300 ${isRTL ? 'text-left' : 'text-right'}`}>
                      {t.transactions.amount}: {formatCurrency(item.quantity * item.price, language)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amount (for payment transactions) */}
          {type === 'payment' && (
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <Label htmlFor="amount">{t.transactions.amount} *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={items[0].price}
                onChange={(e) => handleItemChange(0, 'price', parseFloat(e.target.value) || 0)}
                className="mt-1"
                placeholder="0.00"
                dir="ltr"
                required
              />
            </div>
          )}

          {/* Date */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <Label htmlFor="date">{t.transactions.date} *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
              dir="ltr"
              required
            />
          </div>

          {/* Notes */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <Label htmlFor="notes">{t.transactions.notes}</Label>
            <Textarea
              id="notes"
              placeholder="..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 resize-none"
              dir={isRTL ? 'rtl' : 'ltr'}
              rows={3}
            />
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className={`flex items-center justify-between mb-6 ${rtlFlex(isRTL)}`}>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.transactions.amount}:
              </span>
              <span className={`text-2xl font-bold ${
                type === 'debt' 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-green-600 dark:text-green-500'
              }`}>
                {formatCurrency(calculateTotal(), language)}
              </span>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 text-base font-semibold ${
                type === 'debt'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {t.common.save}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
