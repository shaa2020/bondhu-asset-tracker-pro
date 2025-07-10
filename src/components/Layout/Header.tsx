
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();

  return (
    <header className="bg-emerald-600 text-white px-4 py-3 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">বন্ধু এসেট সমিতি</h1>
          <p className="text-sm opacity-90">Bondhu Asset Somity</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="text-white hover:bg-emerald-700"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === 'bn' ? 'EN' : 'বাং'}
          </Button>
          {user && (
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs opacity-75">{user.role === 'admin' ? 'অ্যাডমিন' : 'সদস্য'}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
