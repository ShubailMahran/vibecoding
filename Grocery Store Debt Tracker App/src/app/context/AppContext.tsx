import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalDebt: number;
  createdAt: string;
}

export interface TransactionItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  items: TransactionItem[];
  totalAmount: number;
  date: string;
  notes?: string;
  type: 'debt' | 'payment';
}

export interface User {
  id: string;
  email: string;
  storeName: string;
}

interface AppContextType {
  user: User | null;
  customers: Customer[];
  transactions: Transaction[];
  darkMode: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, storeName: string) => Promise<boolean>;
  logout: () => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'totalDebt' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('debtTracker_user');
    const savedCustomers = localStorage.getItem('debtTracker_customers');
    const savedTransactions = localStorage.getItem('debtTracker_transactions');
    const savedDarkMode = localStorage.getItem('debtTracker_darkMode');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('debtTracker_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('debtTracker_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('debtTracker_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('debtTracker_darkMode', JSON.stringify(darkMode));
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app this would call an API
    const savedUser = localStorage.getItem('debtTracker_registeredUser');
    if (savedUser) {
      const registeredUser = JSON.parse(savedUser);
      if (registeredUser.email === email && registeredUser.password === password) {
        setUser({
          id: registeredUser.id,
          email: registeredUser.email,
          storeName: registeredUser.storeName,
        });
        return true;
      }
    }
    return false;
  };

  const signup = async (email: string, password: string, storeName: string): Promise<boolean> => {
    // Mock signup - in real app this would call an API
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In real app, never store plain password
      storeName,
    };
    localStorage.setItem('debtTracker_registeredUser', JSON.stringify(newUser));
    setUser({
      id: newUser.id,
      email: newUser.email,
      storeName: newUser.storeName,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'totalDebt' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      totalDebt: 0,
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev: Customer[]) => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, updatedData: Partial<Customer>) => {
    setCustomers((prev: Customer[]) => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev: Customer[]) => prev.filter(c => c.id !== id));
    setTransactions((prev: Transaction[]) => prev.filter(t => t.customerId !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setTransactions((prev: Transaction[]) => [...prev, newTransaction]);

    // Update customer's total debt safely
    setCustomers((prev: Customer[]) => prev.map(c => {
      if (c.id === transaction.customerId) {
        const amount = transaction.type === 'debt' ? transaction.totalAmount : -transaction.totalAmount;
        return { ...c, totalDebt: c.totalDebt + amount };
      }
      return c;
    }));
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev: Transaction[]) => {
      const transaction = prev.find(t => t.id === id);
      if (transaction) {
        setCustomers((prevCustomers: Customer[]) => prevCustomers.map(c => {
          if (c.id === transaction.customerId) {
             const amount = transaction.type === 'debt' ? -transaction.totalAmount : transaction.totalAmount;
             return { ...c, totalDebt: c.totalDebt + amount };
          }
          return c;
        }));
      }
      return prev.filter(t => t.id !== id);
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        customers,
        transactions,
        darkMode,
        login,
        signup,
        logout,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addTransaction,
        deleteTransaction,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};