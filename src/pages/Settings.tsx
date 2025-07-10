
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Key, Users, Settings as SettingsIcon, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'আহমেদ রহমান',
      email: 'ahmed@example.com',
      role: 'admin',
      status: 'active',
      nid: '1234567890',
      phone: '+8801712345678',
      address: 'ধানমন্ডি, ঢাকা',
      joinDate: '2024-01-01',
      monthlyContribution: 10000
    },
    {
      id: '2',
      name: 'ফাতিমা খাতুন',
      email: 'fatima@example.com',
      role: 'member',
      status: 'active',
      nid: '9876543210',
      phone: '+8801987654321',
      address: 'চট্টগ্রাম',
      joinDate: '2024-02-01',
      monthlyContribution: 10000
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
    nid: '',
    phone: '',
    address: '',
    monthlyContribution: 10000
  });

  const [editingMember, setEditingMember] = useState(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.password) {
      toast({
        title: "ত্রুটি / Error",
        description: "সব ক্ষেত্র পূরণ করুন / Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const member = {
      ...newMember,
      id: Date.now().toString(),
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };

    setMembers([...members, member]);
    setNewMember({
      name: '',
      email: '',
      password: '',
      role: 'member',
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

  const handleEditMember = () => {
    if (!editingMember) return;

    setMembers(members.map(member => 
      member.id === editingMember.id ? editingMember : member
    ));
    setEditingMember(null);
    setIsEditMemberOpen(false);

    toast({
      title: "সফল / Success",
      description: "সদস্যের তথ্য আপডেট করা হয়েছে / Member information updated",
    });
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast({
      title: "সফল / Success",
      description: "সদস্য মুছে ফেলা হয়েছে / Member deleted successfully",
    });
  };

  const handleResetPassword = () => {
    if (!resetPasswordEmail) {
      toast({
        title: "ত্রুটি / Error",
        description: "ইমেইল লিখুন / Please enter email address",
        variant: "destructive",
      });
      return;
    }

    // Simulate password reset
    toast({
      title: "সফল / Success",
      description: "পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে / Password reset link sent",
    });
    setResetPasswordEmail('');
    setIsResetPasswordOpen(false);
  };

  const toggleMemberStatus = (memberId: string) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  if (!isAdmin) {
    return (
      <div className="p-4 pb-20">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold mb-2">অ্যাক্সেস অস্বীকৃত / Access Denied</h2>
            <p className="text-gray-600">শুধুমাত্র অ্যাডমিনরা সেটিংস দেখতে পারবেন / Only administrators can access settings</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">সেটিংস / Settings</h1>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            সদস্য ব্যবস্থাপনা
          </TabsTrigger>
          <TabsTrigger value="security">
            <Key className="h-4 w-4 mr-2" />
            নিরাপত্তা
          </TabsTrigger>
          <TabsTrigger value="system">
            <SettingsIcon className="h-4 w-4 mr-2" />
            সিস্টেম
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>সদস্য ব্যবস্থাপনা / Member Management</CardTitle>
                <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="h-4 w-4 mr-2" />
                      নতুন সদস্য
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
                        <Label htmlFor="password">পাসওয়ার্ড / Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newMember.password}
                          onChange={(e) => setNewMember({...newMember, password: e.target.value})}
                          placeholder="পাসওয়ার্ড"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">ভূমিকা / Role</Label>
                        <Select value={newMember.role} onValueChange={(value) => setNewMember({...newMember, role: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">সদস্য / Member</SelectItem>
                            <SelectItem value="admin">অ্যাডমিন / Admin</SelectItem>
                          </SelectContent>
                        </Select>
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                          {member.role === 'admin' ? 'অ্যাডমিন' : 'সদস্য'}
                        </Badge>
                        <Badge variant={member.status === 'active' ? 'default' : 'destructive'}>
                          {member.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-sm text-gray-500">{member.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingMember(member);
                          setIsEditMemberOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleMemberStatus(member.id)}
                      >
                        <Switch checked={member.status === 'active'} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>নিরাপত্তা সেটিংস / Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    পাসওয়ার্ড রিসেট / Reset Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>পাসওয়ার্ড রিসেট / Reset Password</DialogTitle>
                    <DialogDescription>
                      ইমেইল দিন পাসওয়ার্ড রিসেট লিংকের জন্য / Enter email for password reset link
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reset-email">ইমেইল / Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        value={resetPasswordEmail}
                        onChange={(e) => setResetPasswordEmail(e.target.value)}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsResetPasswordOpen(false)}>
                      বাতিল / Cancel
                    </Button>
                    <Button onClick={handleResetPassword}>
                      রিসেট লিংক পাঠান / Send Reset Link
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সিস্টেম সেটিংস / System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">ইমেইল বিজ্ঞপ্তি / Email Notifications</h3>
                  <p className="text-sm text-gray-600">পেমেন্ট রিমাইন্ডার পাঠান</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">অটো ব্যাকআপ / Auto Backup</h3>
                  <p className="text-sm text-gray-600">প্রতিদিন ডেটা ব্যাকআপ করুন</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Google Sheets Sync</h3>
                  <p className="text-sm text-gray-600">গুগল শিটে ডেটা সিঙ্ক করুন</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Member Dialog */}
      <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>সদস্য সম্পাদনা / Edit Member</DialogTitle>
            <DialogDescription>
              সদস্যের তথ্য আপডেট করুন / Update member information
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">নাম / Name</Label>
                <Input
                  id="edit-name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">ইমেইল / Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-role">ভূমিকা / Role</Label>
                <Select value={editingMember.role} onValueChange={(value) => setEditingMember({...editingMember, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">সদস্য / Member</SelectItem>
                    <SelectItem value="admin">অ্যাডমিন / Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-phone">ফোন / Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-address">ঠিকানা / Address</Label>
                <Input
                  id="edit-address"
                  value={editingMember.address}
                  onChange={(e) => setEditingMember({...editingMember, address: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMemberOpen(false)}>
              বাতিল / Cancel
            </Button>
            <Button onClick={handleEditMember} className="bg-emerald-600 hover:bg-emerald-700">
              আপডেট / Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
