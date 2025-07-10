
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, Calendar, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Investments = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  const [investments] = useState([
    {
      id: '1',
      title: 'ধানমন্ডি আবাসিক প্লট',
      type: 'জমি / Land',
      location: 'ধানমন্ডি, ঢাকা',
      purchasePrice: 5000000,
      currentValue: 5500000,
      purchaseDate: '2024-03-15',
      status: 'active',
      roi: 10,
      description: '৫ কাঠা আবাসিক জমি'
    },
    {
      id: '2',
      title: 'চট্টগ্রাম বাণিজ্যিক স্থান',
      type: 'বাণিজ্যিক / Commercial',
      location: 'চট্টগ্রাম',
      purchasePrice: 3000000,
      currentValue: 3200000,
      purchaseDate: '2024-01-20',
      status: 'active',
      roi: 6.7,
      description: 'দোকান ভাড়া দেওয়ার জন্য'
    },
    {
      id: '3',
      title: 'সিলেট টি গার্ডেন',
      type: 'কৃষি / Agriculture',
      location: 'সিলেট',
      purchasePrice: 2000000,
      currentValue: 2100000,
      purchaseDate: '2024-02-10',
      status: 'under_review',
      roi: 5,
      description: 'চা বাগান বিনিয়োগ'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'সক্রিয়';
      case 'under_review': return 'পর্যালোচনাধীন';
      case 'sold': return 'বিক্রিত';
      default: return status;
    }
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.purchasePrice, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGain = totalCurrentValue - totalInvestment;

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('investments')}</h1>
        {isAdmin && (
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            নতুন বিনিয়োগ
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">মোট বিনিয়োগ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">৳ {totalInvestment.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">বর্তমান মূল্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-emerald-600">৳ {totalCurrentValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">মোট লাভ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${totalGain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              ৳ {totalGain.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment List */}
      <div className="grid grid-cols-1 gap-4">
        {investments.map((investment) => (
          <Card key={investment.id} className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{investment.title}</CardTitle>
                  <p className="text-sm text-gray-600">{investment.type}</p>
                </div>
                <Badge className={getStatusColor(investment.status)}>
                  {getStatusText(investment.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {investment.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  ক্রয়ের তারিখ: {new Date(investment.purchaseDate).toLocaleDateString('bn-BD')}
                </div>
                <p className="text-sm text-gray-700">{investment.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-xs text-gray-500">ক্রয়মূল্য</p>
                    <p className="font-semibold">৳ {investment.purchasePrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">বর্তমান মূল্য</p>
                    <p className="font-semibold text-emerald-600">৳ {investment.currentValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">ROI: {investment.roi}%</span>
                  </div>
                  <div className="text-sm font-medium">
                    লাভ: ৳ {(investment.currentValue - investment.purchasePrice).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Investments;
