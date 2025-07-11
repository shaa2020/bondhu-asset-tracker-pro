
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddMeetingDialogProps {
  onAddMeeting: (meeting: any) => void;
}

export const AddMeetingDialog = ({ onAddMeeting }: AddMeetingDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  const handleSubmit = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
      toast({
        title: "ত্রুটি / Error",
        description: "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন / Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const meeting = {
      ...newMeeting,
      id: Date.now().toString(),
      status: 'upcoming',
      attendees: 0,
      totalMembers: 23
    };

    onAddMeeting(meeting);
    setNewMeeting({
      title: '',
      description: '',
      date: '',
      time: '',
      location: ''
    });
    setOpen(false);

    toast({
      title: "সফল / Success",
      description: "নতুন সভা যোগ করা হয়েছে / New meeting added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          নতুন সভা
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>নতুন সভা যোগ করুন / Add New Meeting</DialogTitle>
          <DialogDescription>
            নতুন সভার তথ্য দিন / Enter new meeting information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">শিরোনাম / Title *</Label>
            <Input
              id="title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              placeholder="সভার নাম"
            />
          </div>
          <div>
            <Label htmlFor="description">বিবরণ / Description</Label>
            <Textarea
              id="description"
              value={newMeeting.description}
              onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
              placeholder="সভার উদ্দেশ্য ও আলোচ্য বিষয়"
            />
          </div>
          <div>
            <Label htmlFor="date">তারিখ / Date *</Label>
            <Input
              id="date"
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="time">সময় / Time *</Label>
            <Input
              id="time"
              type="time"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="location">স্থান / Location</Label>
            <Input
              id="location"
              value={newMeeting.location}
              onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
              placeholder="সভার স্থান"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            বাতিল / Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            যোগ করুন / Add Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
