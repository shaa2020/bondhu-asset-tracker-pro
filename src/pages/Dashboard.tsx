
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, CreditCard, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    {
      title: t('totalFund'),
      value: '৳ 2,50,000',
      description: '+৳ 15,000 ' + t('thisMonth'),
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
    {
      title: t('totalMembers'),
      value: '23',
      description: '2 new this month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: t('pendingPayments'),
      value: '5',
      description: 'Due this month',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    { member: 'রহিম উদ্দিন', action: 'Monthly payment completed', amount: '৳ 10,000', time: '2 hours ago' },
    { member: 'সালমা বেগম', action: 'Joined the group', amount: '', time: '1 day ago' },
    { member: 'করিম মিয়া', action: 'Payment overdue', amount: '৳ 10,000', time: '3 days ago' },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-800">{t('welcome')}, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">আজকের তারিখ: {new Date().toLocaleDateString('bn-BD')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('recentActivity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.member}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-medium text-sm text-emerald-600">{activity.amount}</p>
                  )}
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>মাসিক প্রবণতা / Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end justify-between space-x-2">
              {[40, 60, 80, 100, 90, 70].map((height, index) => (
                <div
                  key={index}
                  className="bg-emerald-500 rounded-t"
                  style={{ height: `${height}%`, width: '15%' }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>জান</span>
              <span>ফেব</span>
              <span>মার</span>
              <span>এপ্রিল</span>
              <span>মে</span>
              <span>জুন</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>পেমেন্ট স্ট্যাটাস / Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">পরিশোধিত / Paid</span>
                <span className="text-sm font-medium text-emerald-600">18 members</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">বাকি / Pending</span>
                <span className="text-sm font-medium text-orange-600">5 members</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
