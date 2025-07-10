
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "সফল লগইন / Login Successful",
          description: "স্বাগতম! / Welcome!",
        });
      } else {
        toast({
          title: "লগইন ব্যর্থ / Login Failed",
          description: "ইমেইল বা পাসওয়ার্ড ভুল / Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "ত্রুটি / Error",
        description: "কিছু ভুল হয়েছে / Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-2xl">🏦</span>
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-700">বন্ধু এসেট সমিতি</CardTitle>
          <CardDescription>Bondhu Asset Somity</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t('email')}</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t('password')}</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? 'লগইন হচ্ছে...' : t('loginButton')}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-800 mb-2">ডেমো অ্যাকাউন্ট / Demo Accounts:</p>
            <p className="text-blue-700">{t('adminLogin')}</p>
            <p className="text-blue-700">{t('memberLogin')}</p>
            <p className="text-blue-700 mt-1">{t('demoPassword')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
