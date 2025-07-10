
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, CreditCard, TrendingUp, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const MobileNavbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('dashboard') },
    { path: '/members', icon: Users, label: t('members') },
    { path: '/payments', icon: CreditCard, label: t('payments') },
    { path: '/investments', icon: TrendingUp, label: t('investments') },
    { path: '/meetings', icon: Calendar, label: t('meetings') },
  ];

  // Add settings for admin users
  if (isAdmin) {
    navItems.push({ path: '/settings', icon: Settings, label: 'সেটিংস' });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center px-1 py-2 text-xs transition-colors ${
                isActive
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`
            }
          >
            <item.icon className="h-4 w-4 mb-1" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={() => logout()}
          className="flex flex-col items-center px-1 py-2 text-xs text-red-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4 mb-1" />
          <span className="text-xs">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};
