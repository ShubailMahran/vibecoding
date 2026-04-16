import { RouterProvider } from 'react-router';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </AppProvider>
    </LanguageProvider>
  );
}