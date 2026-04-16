import { Customer, Transaction } from '../context/AppContext';

export const sampleCustomers: Omit<Customer, 'id'>[] = [
  {
    name: 'Maria Santos',
    phone: '09171234567',
    totalDebt: 250.50,
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    name: 'Juan Dela Cruz',
    phone: '09187654321',
    totalDebt: 450.75,
    createdAt: '2026-03-10T14:30:00Z',
  },
  {
    name: 'Anna Reyes',
    phone: '09198765432',
    totalDebt: 125.00,
    createdAt: '2026-03-20T09:15:00Z',
  },
  {
    name: 'Pedro Garcia',
    phone: '09123456789',
    totalDebt: 0,
    createdAt: '2026-04-01T11:00:00Z',
  },
];

export const generateSampleTransactions = (customerIds: string[]): Omit<Transaction, 'id'>[] => {
  if (customerIds.length < 3) return [];

  return [
    {
      customerId: customerIds[0],
      items: [
        { name: 'Rice 5kg', quantity: 1, price: 250.00 },
        { name: 'Eggs 1 dozen', quantity: 1, price: 90.00 },
      ],
      totalAmount: 340.00,
      date: '2026-03-15T10:00:00Z',
      type: 'debt',
      notes: 'Regular monthly purchase',
    },
    {
      customerId: customerIds[0],
      items: [],
      totalAmount: 89.50,
      date: '2026-04-10T14:30:00Z',
      type: 'payment',
      notes: 'Partial payment',
    },
    {
      customerId: customerIds[1],
      items: [
        { name: 'Cooking Oil 1L', quantity: 2, price: 85.00 },
        { name: 'Sugar 1kg', quantity: 1, price: 65.00 },
        { name: 'Coffee 200g', quantity: 1, price: 120.00 },
      ],
      totalAmount: 355.00,
      date: '2026-03-25T16:00:00Z',
      type: 'debt',
    },
    {
      customerId: customerIds[1],
      items: [
        { name: 'Bread', quantity: 3, price: 45.00 },
      ],
      totalAmount: 135.00,
      date: '2026-04-05T08:30:00Z',
      type: 'debt',
    },
    {
      customerId: customerIds[2],
      items: [
        { name: 'Milk 1L', quantity: 2, price: 75.00 },
        { name: 'Butter 200g', quantity: 1, price: 95.00 },
      ],
      totalAmount: 245.00,
      date: '2026-03-28T12:00:00Z',
      type: 'debt',
    },
    {
      customerId: customerIds[2],
      items: [],
      totalAmount: 120.00,
      date: '2026-04-12T10:00:00Z',
      type: 'payment',
    },
    {
      customerId: customerIds[3],
      items: [
        { name: 'Instant Noodles', quantity: 10, price: 15.00 },
      ],
      totalAmount: 150.00,
      date: '2026-04-08T15:00:00Z',
      type: 'debt',
    },
    {
      customerId: customerIds[3],
      items: [],
      totalAmount: 150.00,
      date: '2026-04-15T09:00:00Z',
      type: 'payment',
      notes: 'Full payment',
    },
  ];
};
