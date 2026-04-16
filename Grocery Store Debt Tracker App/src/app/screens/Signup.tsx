import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { iconSpacing, rtlFlex } from '../utils/rtl';

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const { t, language, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await signup(email, password, storeName);
      if (success) {
        toast.success(t.auth.signupSuccess);
        navigate('/dashboard');
      } else {
        toast.error(language === 'ar' ? 'فشل إنشاء الحساب. حاول مرة أخرى.' : 'Failed to create account. Please try again.');
      }
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ. حاول مرة أخرى.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/login')}
            className={`flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 ${rtlFlex(isRTL)}`}
          >
            <ArrowLeft className={`w-4 h-4 ${iconSpacing(isRTL)}`} />
            {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
          </button>

          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
              <ShoppingBag className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t.auth.createAccount}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {t.auth.signupDescription}
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="storeName">{t.auth.storeName}</Label>
              <Input
                id="storeName"
                type="text"
                placeholder={language === 'ar' ? 'متجر البقالة' : 'My Grocery Store'}
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="mt-1"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {language === 'ar' ? 'الحد الأدنى 6 أحرف' : 'Minimum 6 characters'}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loading}
            >
              {loading ? t.common.loading : t.auth.createAccount}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
