
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Phone, MapPin, Calendar, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Members = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [members, setMembers] = useState([
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

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    nid: '',
    phone: '',
    address: '',
    monthlyContribution: 10000
  });

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "ত্রুটি / Error",
        description: "নাম ও ইমেইল আবশ্যক / Name and email are required",
        variant: "destructive",
      });
      return;
    }

    const member = {
      ...newMember,
      id: Date.now().toString(),
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      totalPaid: 0
    };

    setMembers([...members, member]);
    setNewMember({
      name: '',
      email: '',
      nid: '',
      phone: '',
      address: '',
      monthlyContribution: 10000
    });
    setIsAddMemberOpen(false);

    toast({
      title: "সফল / Success",
      description: "নতুন সদস্য যোগ করা হয়েছে / New member added successfully",
    });
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('memberList')}</h1>
        {isAdmin && (
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                {t('addMember')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>নতুন সদস্য যোগ করুন / Add New Member</DialogTitle>
                <DialogDescription>
                  নতুন সদস্যের তথ্য দিন / Enter new member information
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">নাম / Name *</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="সদস্যের নাম"
                  />
                </div>
                <div>
                  <Label htmlFor="email">ইমেইল / Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="nid">এনআইডি / NID</Label>
                  <Input
                    id="nid"
                    value={newMember.nid}
                    onChange={(e) => setNewMember({...newMember, nid: e.target.value})}
                    placeholder="জাতীয় পরিচয়পত্র নম্বর"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">ফোন / Phone</Label>
                  <Input
                    id="phone"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    placeholder="+8801XXXXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="address">ঠিকানা / Address</Label>
                  <Input
                    id="address"
                    value={newMember.address}
                    onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                    placeholder="সম্পূর্ণ ঠিকানা"
                  />
                </div>
                <div>
                  <Label htmlFor="contribution">মাসিক অবদান / Monthly Contribution</Label>
                  <Input
                    id="contribution"
                    type="number"
                    value={newMember.monthlyContribution}
                    onChange={(e) => setNewMember({...newMember, monthlyContribution: parseInt(e.target.value)})}
                    placeholder="10000"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                  বাতিল / Cancel
                </Button>
                <Button onClick={handleAddMember} className="bg-emerald-600 hover:bg-emerald-700">
                  যোগ করুন / Add Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="সদস্য খুঁজুন... / Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMembers.map((member) => (
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

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">কোন সদস্য পাওয়া যায়নি / No members found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Members;
