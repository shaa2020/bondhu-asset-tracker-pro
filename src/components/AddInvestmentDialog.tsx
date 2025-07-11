
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddInvestmentDialogProps {
  onAddInvestment: (investment: any) => void;
}

export const AddInvestmentDialog = ({ onAddInvestment }: AddInvestmentDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    title: '',
    type: '',
    location: '',
    purchasePrice: 0,
    description: ''
  });

  const handleSubmit = () => {
    if (!newInvestment.title || !newInvestment.type || !newInvestment.purchasePrice) {
      toast({
        title: "ত্রুটি / Error",
        description: "সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন / Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const investment = {
      ...newInvestment,
      id: Date.now().toString(),
      currentValue: newInvestment.purchasePrice,
      purchaseDate: new Date().toISOString().split('T')[0],
      status: 'active',
      roi: 0
    };

    onAddInvestment(investment);
    setNewInvestment({
      title: '',
      type: '',
      location: '',
      purchasePrice: 0,
      description: ''
    });
    setOpen(false);

    toast({
      title: "সফল / Success",
      description: "নতুন বিনিয়োগ যোগ করা হয়েছে / New investment added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          নতুন বিনিয়োগ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>নতুন বিনিয়োগ যোগ করুন / Add New Investment</DialogTitle>
          <DialogDescription>
            নতুন বিনিয়োগের তথ্য দিন / Enter new investment information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">শিরোনাম / Title *</Label>
            <Input
              id="title"
              value={newInvestment.title}
              onChange={(e) => setNewInvestment({...newInvestment, title: e.target.value})}
              placeholder="বিনিয়োগের নাম"
            />
          </div>
          <div>
            <Label htmlFor="type">ধরন / Type *</Label>
            <Select value={newInvestment.type} onValueChange={(value) => setNewInvestment({...newInvestment, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="বিনিয়োগের ধরন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="জমি / Land">জমি / Land</SelectItem>
                <SelectItem value="বাণিজ্যিক / Commercial">বাণিজ্যিক / Commercial</SelectItem>
                <SelectItem value="কৃষি / Agriculture">কৃষি / Agriculture</SelectItem>
                <SelectItem value="আবাসিক / Residential">আবাসিক / Residential</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="location">অবস্থান / Location</Label>
            <Input
              id="location"
              value={newInvestment.location}
              onChange={(e) => setNewInvestment({...newInvestment, location: e.target.value})}
              placeholder="বিনিয়োগের স্থান"
            />
          </div>
          <div>
            <Label htmlFor="price">ক্রয়মূল্য / Purchase Price *</Label>
            <Input
              id="price"
              type="number"
              value={newInvestment.purchasePrice}
              onChange={(e) => setNewInvestment({...newInvestment, purchasePrice: parseInt(e.target.value)})}
              placeholder="০"
            />
          </div>
          <div>
            <Label htmlFor="description">বিবরণ / Description</Label>
            <Textarea
              id="description"
              value={newInvestment.description}
              onChange={(e) => setNewInvestment({...newInvestment, description: e.target.value})}
              placeholder="বিনিয়োগ সম্পর্কে বিস্তারিত"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            বাতিল / Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            যোগ করুন / Add Investment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
