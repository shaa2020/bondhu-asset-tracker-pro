
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Phone, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Members = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  const [members] = useState([
    {
      id: '1',
      name: 'আহমেদ রহমান',
      nid: '1234567890',
      phone: '+8801712345678',
      email: 'ahmed@example.com',
      address: 'ধানমন্ডি, ঢাকা',
      joinDate: '2024-01-01',
      status: 'active',
      monthlyContribution: 10000,
      totalPaid: 60000
    },
    {
      id: '2',
      name: 'ফাতিমা খাতুন',
      nid: '9876543210',
      phone: '+8801987654321',
      email: 'fatima@example.com',
      address: 'চট্টগ্রাম',
      joinDate: '2024-02-01',
      status: 'active',
      monthlyContribution: 10000,
      totalPaid: 50000
    },
    {
      id: '3',
      name: 'মোহাম্মদ করিম',
      nid: '5555666677',
      phone: '+8801555666677',
      email: 'karim@example.com',
      address: 'সিলেট',
      joinDate: '2024-03-01',
      status: 'active',
      monthlyContribution: 10000,
      totalPaid: 40000
    }
  ]);

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('memberList')}</h1>
        {isAdmin && (
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('addMember')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {members.map((member) => (
          <Card key={member.id} className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-gray-600">NID: {member.nid}</p>
                </div>
                <Badge 
                  variant={member.status === 'active' ? 'default' : 'secondary'}
                  className={member.status === 'active' ? 'bg-emerald-100 text-emerald-800' : ''}
                >
                  {member.status === 'active' ? t('active') : t('inactive')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {member.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('joinDate')}: {new Date(member.joinDate).toLocaleDateString('bn-BD')}
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    <p className="text-sm text-gray-600">মাসিক অবদান</p>
                    <p className="font-semibold text-emerald-600">৳ {member.monthlyContribution.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">মোট পরিশোধিত</p>
                    <p className="font-semibold">৳ {member.totalPaid.toLocaleString()}</p>
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

export default Members;
