import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils/currency';
import { iconSpacing, rtlFlex } from '../utils/rtl';

export function Reports() {
  const { customers, transactions } = useApp();
  const { t, language, isRTL } = useLanguage();
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by customer
    if (selectedCustomer !== 'all') {
      filtered = filtered.filter(t => t.customerId === selectedCustomer);
    }

    // Filter by date range
    const now = new Date();
    if (dateRange === 'today') {
      const today = now.toISOString().split('T')[0];
      filtered = filtered.filter(t => t.date.startsWith(today));
    } else if (dateRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(t => new Date(t.date) >= weekAgo);
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      filtered = filtered.filter(t => new Date(t.date) >= monthAgo);
    } else if (dateRange === 'custom' && startDate && endDate) {
      filtered = filtered.filter(t => t.date >= startDate && t.date <= endDate);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, selectedCustomer, dateRange, startDate, endDate]);

  const stats = useMemo(() => {
    const totalDebt = filteredTransactions
      .filter(t => t.type === 'debt')
      .reduce((sum, t) => sum + t.totalAmount, 0);
    
    const totalPayments = filteredTransactions
      .filter(t => t.type === 'payment')
      .reduce((sum, t) => sum + t.totalAmount, 0);

    return {
      totalDebt,
      totalPayments,
      netDebt: totalDebt - totalPayments,
      transactionCount: filteredTransactions.length,
    };
  }, [filteredTransactions]);

  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, { debt: number; payment: number }>();
    
    filteredTransactions.forEach(transaction => {
      const month = new Date(transaction.date).toISOString().substring(0, 7);
      const existing = monthMap.get(month) || { debt: 0, payment: 0 };
      
      if (transaction.type === 'debt') {
        existing.debt += transaction.totalAmount;
      } else {
        existing.payment += transaction.totalAmount;
      }
      
      monthMap.set(month, existing);
    });

    return Array.from(monthMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
      .map(([month, data]) => ({
        month: new Date(month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        debt: data.debt,
        payment: data.payment,
      }));
  }, [filteredTransactions]);

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'Unknown';
  };

  const exportToPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    
    toast.info(t.common.loading || 'Generating PDF...');
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('debt-tracker-report.pdf');
      toast.success(t.common.save || 'PDF exported successfully');
    } catch (e) {
      toast.error('Error generating PDF');
    }
  };
    
  const exportToExcel = () => {
    const data = filteredTransactions.map(transaction => ({
      [t.transactions.date || 'Date']: new Date(transaction.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US'),
      [t.customers.name || 'Customer']: getCustomerName(transaction.customerId),
      [t.transactions.title || 'Type']: transaction.type === 'debt' ? t.transactions.debt : t.transactions.payment,
      [t.transactions.amount || 'Amount']: transaction.totalAmount,
      [t.transactions.notes || 'Notes']: transaction.notes || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t.transactions.title || 'Transactions');
    
    // Add summary sheet
    const summaryData = [
      { Metric: t.reports.totalDebt || 'Total Debt', Value: stats.totalDebt },
      { Metric: t.reports.totalPayments || 'Total Payments', Value: stats.totalPayments },
      { Metric: t.reports.netDebt || 'Net Debt', Value: stats.netDebt },
    ];
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, t.reports.title || 'Summary');
    
    XLSX.writeFile(workbook, 'debt-tracker-report.xlsx');
    toast.success(t.reports.exportSuccess || 'Excel file exported successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className={`max-w-md mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.reports.title || 'Reports & Analytics'}</h1>
        </div>
      </div>

      <div id="report-content" className="max-w-md mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-900">
        {/* Filters */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <Label>{t.reports.filterByCustomer || 'Filter by Customer'}</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer} dir={isRTL ? 'rtl' : 'ltr'}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.reports.allCustomers || 'All Customers'}</SelectItem>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t.reports.dateRange || 'Date Range'}</Label>
            <Select value={dateRange} onValueChange={setDateRange} dir={isRTL ? 'rtl' : 'ltr'}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.reports.allTime || 'All Time'}</SelectItem>
                <SelectItem value="today">{t.reports.today || 'Today'}</SelectItem>
                <SelectItem value="week">{t.reports.lastWeek || 'Last 7 Days'}</SelectItem>
                <SelectItem value="month">{t.reports.lastMonth || 'Last Month'}</SelectItem>
                <SelectItem value="custom">{t.reports.customRange || 'Custom Range'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <Label className="text-xs" htmlFor="start-date">{t.reports.from || 'Start Date'}</Label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-1"
                  dir="ltr"
                  aria-label={t.reports.from || 'Start Date'}
                />
              </div>
              <div>
                <Label className="text-xs" htmlFor="end-date">{t.reports.to || 'End Date'}</Label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-1"
                  dir="ltr"
                  aria-label={t.reports.to || 'End Date'}
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className={`grid grid-cols-2 gap-4 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.reports.totalDebt || 'Total Debt'}</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-500">
              <span dir="ltr">{formatCurrency(stats.totalDebt, language)}</span>
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.reports.totalPayments || 'Total Payments'}</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-500">
              <span dir="ltr">{formatCurrency(stats.totalPayments, language)}</span>
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm col-span-2 border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.reports.netDebt || 'Net Outstanding'}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              <span dir="ltr">{formatCurrency(stats.netDebt, language)}</span>
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className={`grid grid-cols-2 gap-3 mb-6`} data-html2canvas-ignore>
          <Button
            onClick={exportToPDF}
            variant="outline"
            className={`border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 ${rtlFlex(isRTL)}`}
          >
            <Download className={`w-4 h-4 ${iconSpacing(isRTL)}`} />
            {t.reports.exportPDF || 'Export PDF'}
          </Button>
          <Button
            onClick={exportToExcel}
            variant="outline"
            className={`border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${rtlFlex(isRTL)}`}
          >
            <Download className={`w-4 h-4 ${iconSpacing(isRTL)}`} />
            {t.reports.exportExcel || 'Export Excel'}
          </Button>
        </div>

        {/* Charts */}
        <Tabs defaultValue="transactions" className="mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">{t.transactions.title || 'Transactions'}</TabsTrigger>
            <TabsTrigger value="trends">{t.reports.overview || 'Trends'}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Comparison
              </h3>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="debt" fill="#dc2626" name="Debt" />
                    <Bar dataKey="payment" fill="#16a34a" name="Payment" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                  No data available
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Debt Trends
              </h3>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="debt" stroke="#dc2626" strokeWidth={2} name="Debt" />
                    <Line type="monotone" dataKey="payment" stroke="#16a34a" strokeWidth={2} name="Payment" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                  {t.common.loading || 'No data available'}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Transaction List */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {t.transactions.title || 'Transactions'} ({filteredTransactions.length})
          </h3>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t.common.loading || 'No transactions found'}</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className={`flex items-start justify-between mb-1 ${rtlFlex(isRTL)}`}>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {getCustomerName(transaction.customerId)}
                      </p>
                      <div className={`flex items-center gap-2 mt-1 ${rtlFlex(isRTL)}`}>
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400" dir="ltr">
                          {new Date(transaction.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </span>
                      </div>
                    </div>
                    <div className={isRTL ? 'text-left' : 'text-right'}>
                      <p className={`font-semibold text-sm ${
                        transaction.type === 'debt'
                          ? 'text-red-600 dark:text-red-500'
                          : 'text-green-600 dark:text-green-500'
                      }`}>
                        {transaction.type === 'debt' ? '+' : '-'}
                        <span dir="ltr">{formatCurrency(transaction.totalAmount, language)}</span>
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {transaction.type === 'debt' ? t.transactions.debt : t.transactions.payment}
                      </span>
                    </div>
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
