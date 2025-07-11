
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, CreditCard, AlertCircle, Settings, UserPlus, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();
  
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, member: 'রহিম উদ্দিন', action: 'Monthly payment completed', amount: '৳ 10,000', time: '2 hours ago', type: 'payment' },
    { id: 2, member: 'সালমা বেগম', action: 'Joined the group', amount: '', time: '1 day ago', type: 'member' },
    { id: 3, member: 'করিম মিয়া', action: 'Payment overdue', amount: '৳ 10,000', time: '3 days ago', type: 'warning' },
    { id: 4, member: 'ফাতেমা খাতুন', action: 'Investment approved', amount: '৳ 50,000', time: '5 days ago', type: 'investment' },
  ]);

  // Chart data
  const monthlyData = [
    { month: 'জান', amount: 200000, members: 20 },
    { month: 'ফেব', amount: 220000, members: 21 },
    { month: 'মার', amount: 240000, members: 22 },
    { month: 'এপ্রিল', amount: 235000, members: 22 },
    { month: 'মে', amount: 245000, members: 23 },
    { month: 'জুন', amount: 250000, members: 23 },
  ];

  const paymentStatusData = [
    { name: 'পরিশোধিত', value: 18, color: '#10b981' },
    { name: 'বাকি', value: 5, color: '#f59e0b' },
  ];

  const investmentData = [
    { category: 'রিয়েল এস্টেট', amount: 800000 },
    { category: 'ব্যবসা', amount: 600000 },
    { category: 'শেয়ার', amount: 400000 },
    { category: 'ব্যাংক', amount: 200000 },
  ];

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

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#10b981",
    },
    members: {
      label: "Members",
      color: "#3b82f6",
    },
  };

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        member: 'নতুন সদস্য',
        action: 'New activity',
        amount: '৳ 5,000',
        time: 'Just now',
        type: 'payment'
      };
      
      // Randomly add new activities (simulate real updates)
      if (Math.random() > 0.95) {
        setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-4 w-4 text-emerald-600" />;
      case 'member': return <Users className="h-4 w-4 text-blue-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'investment': return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-800">{t('welcome')}, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">আজকের তারিখ: {new Date().toLocaleDateString('bn-BD')}</p>
      </div>

      {/* Admin Quick Actions */}
      {isAdmin && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Settings className="h-5 w-5" />
              অ্যাডমিন অ্যাকশন / Admin Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Link to="/settings">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  সেটিংস / Settings
                </Button>
              </Link>
              <Link to="/members">
                <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  <UserPlus className="h-4 w-4 mr-2" />
                  নতুন সদস্য / Add Member
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
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
            <Activity className="h-5 w-5" />
            {t('recentActivity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.member}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>মাসিক প্রবণতা / Monthly Trend</CardTitle>
            <CardDescription>Fund growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="var(--color-amount)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-amount)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>পেমেন্ট স্ট্যাটাস / Payment Status</CardTitle>
            <CardDescription>Current month payment overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {paymentStatusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>বিনিয়োগ বন্টন / Investment Distribution</CardTitle>
          <CardDescription>Current investment allocation across sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investmentData}>
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
