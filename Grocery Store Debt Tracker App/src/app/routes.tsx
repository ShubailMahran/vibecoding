import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './screens/Login';
import { Signup } from './screens/Signup';
import { Dashboard } from './screens/Dashboard';
import { Customers } from './screens/Customers';
import { CustomerDetails } from './screens/CustomerDetails';
import { AddTransaction } from './screens/AddTransaction';
import { Reports } from './screens/Reports';
import { Settings } from './screens/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/customers',
    element: <Customers />,
  },
  {
    path: '/customer/:id',
    element: <CustomerDetails />,
  },
  {
    path: '/add-transaction',
    element: <AddTransaction />,
  },
  {
    path: '/reports',
    element: <Reports />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
