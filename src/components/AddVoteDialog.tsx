
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Vote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddVoteDialogProps {
  onAddVote: (vote: any) => void;
}

export const AddVoteDialog = ({ onAddVote }: AddVoteDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [newVote, setNewVote] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const handleSubmit = () => {
    if (!newVote.title || !newVote.deadline) {
      toast({
        title: "ত্রুটি / Error",
        description: "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন / Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const vote = {
      ...newVote,
      id: Date.now().toString(),
      status: 'active',
      yesVotes: 0,
      noVotes: 0,
      totalVotes: 0,
      totalMembers: 23,
      userVoted: false
    };

    onAddVote(vote);
    setNewVote({
      title: '',
      description: '',
      deadline: ''
    });
    setOpen(false);

    toast({
      title: "সফল / Success",
      description: "নতুন ভোট যোগ করা হয়েছে / New vote added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Vote className="h-4 w-4 mr-2" />
          নতুন ভোট
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>নতুন ভোট যোগ করুন / Add New Vote</DialogTitle>
          <DialogDescription>
            নতুন ভোটের তথ্য দিন / Enter new vote information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">শিরোনাম / Title *</Label>
            <Input
              id="title"
              value={newVote.title}
              onChange={(e) => setNewVote({...newVote, title: e.target.value})}
              placeholder="ভোটের বিষয়"
            />
          </div>
          <div>
            <Label htmlFor="description">বিবরণ / Description</Label>
            <Textarea
              id="description"
              value={newVote.description}
              onChange={(e) => setNewVote({...newVote, description: e.target.value})}
              placeholder="ভোটের বিস্তারিত বিবরণ"
            />
          </div>
          <div>
            <Label htmlFor="deadline">শেষ তারিখ / Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={newVote.deadline}
              onChange={(e) => setNewVote({...newVote, deadline: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            বাতিল / Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            যোগ করুন / Add Vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
