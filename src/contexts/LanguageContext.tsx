
import React, { createContext, useContext, useState } from 'react';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  bn: {
    // Navigation
    'dashboard': 'ড্যাশবোর্ড',
    'members': 'সদস্যগণ',
    'payments': 'পেমেন্ট',
    'investments': 'বিনিয়োগ',
    'meetings': 'সভা',
    'profile': 'প্রোফাইল',
    'login': 'লগইন',
    'logout': 'লগআউট',
    
    // Dashboard
    'welcome': 'স্বাগতম',
    'totalFund': 'মোট তহবিল',
    'thisMonth': 'এই মাসে',
    'totalMembers': 'মোট সদস্য',
    'pendingPayments': 'অপেক্ষমান পেমেন্ট',
    'recentActivity': 'সাম্প্রতিক কার্যকলাপ',
    
    // Login
    'email': 'ইমেইল',
    'password': 'পাসওয়ার্ড',
    'loginButton': 'লগইন করুন',
    'adminLogin': 'অ্যাডমিন: admin@bondhu.com',
    'memberLogin': 'সদস্য: member@bondhu.com',
    'demoPassword': 'পাসওয়ার্ড: password123',
    
    // Members
    'memberList': 'সদস্য তালিকা',
    'addMember': 'নতুন সদস্য',
    'name': 'নাম',
    'nid': 'জাতীয় পরিচয়পত্র',
    'phone': 'ফোন',
    'joinDate': 'যোগদানের তারিখ',
    'status': 'অবস্থা',
    'active': 'সক্রিয়',
    'inactive': 'নিষ্ক্রিয়',
    
    // Payments
    'monthlyContributions': 'মাসিক অবদান',
    'generateReceipt': 'রশিদ তৈরি করুন',
    'amount': 'পরিমাণ',
    'month': 'মাস',
    'paid': 'পরিশোধিত',
    'unpaid': 'অপরিশোধিত',
    'markAsPaid': 'পরিশোধিত হিসেবে চিহ্নিত করুন',
    
    // Currency
    'taka': '৳',
    'currency': 'টাকা'
  },
  en: {
    // Navigation
    'dashboard': 'Dashboard',
    'members': 'Members',
    'payments': 'Payments',
    'investments': 'Investments',
    'meetings': 'Meetings',
    'profile': 'Profile',
    'login': 'Login',
    'logout': 'Logout',
    
    // Dashboard
    'welcome': 'Welcome',
    'totalFund': 'Total Fund',
    'thisMonth': 'This Month',
    'totalMembers': 'Total Members',
    'pendingPayments': 'Pending Payments',
    'recentActivity': 'Recent Activity',
    
    // Login
    'email': 'Email',
    'password': 'Password',
    'loginButton': 'Login',
    'adminLogin': 'Admin: admin@bondhu.com',
    'memberLogin': 'Member: member@bondhu.com',
    'demoPassword': 'Password: password123',
    
    // Members
    'memberList': 'Member List',
    'addMember': 'Add Member',
    'name': 'Name',
    'nid': 'NID',
    'phone': 'Phone',
    'joinDate': 'Join Date',
    'status': 'Status',
    'active': 'Active',
    'inactive': 'Inactive',
    
    // Payments
    'monthlyContributions': 'Monthly Contributions',
    'generateReceipt': 'Generate Receipt',
    'amount': 'Amount',
    'month': 'Month',
    'paid': 'Paid',
    'unpaid': 'Unpaid',
    'markAsPaid': 'Mark as Paid',
    
    // Currency
    'taka': '৳',
    'currency': 'BDT'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['bn']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
