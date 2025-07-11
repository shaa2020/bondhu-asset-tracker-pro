
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Calculator, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PenaltyManagerProps {
  memberId: string;
  memberName: string;
  monthlyAmount: number;
  daysPastDue: number;
  onPenaltyApplied: (penaltyAmount: number) => void;
}

export const PenaltyManager = ({ 
  memberId, 
  memberName, 
  monthlyAmount, 
  daysPastDue,
  onPenaltyApplied 
}: PenaltyManagerProps) => {
  const [open, setOpen] = useState(false);
  const [penaltyRate, setPenaltyRate] = useState(5); // 5% default penalty rate
  const [customPenalty, setCustomPenalty] = useState('');
  const { toast } = useToast();

  // Calculate penalty based on days past due and penalty rate
  const calculatePenalty = () => {
    if (daysPastDue <= 0) return 0;
    
    // Simple penalty calculation: (monthly amount * penalty rate / 100) per week overdue
    const weeksOverdue = Math.ceil(daysPastDue / 7);
    return Math.round((monthlyAmount * penaltyRate / 100) * weeksOverdue);
  };

  const applyPenalty = () => {
    const penaltyAmount = customPenalty ? parseInt(customPenalty) : calculatePenalty();
    
    if (penaltyAmount <= 0) {
      toast({
        title: "ত্রুটি / Error",
        description: "জরিমানার পরিমাণ অবশ্যই শূন্যের চেয়ে বেশি হতে হবে",
        variant: "destructive"
      });
      return;
    }

    onPenaltyApplied(penaltyAmount);
    
    toast({
      title: "জরিমানা প্রয়োগ করা হয়েছে / Penalty Applied",
      description: `${memberName} এর জন্য ৳${penaltyAmount} জরিমানা যোগ করা হয়েছে`,
    });
    
    setOpen(false);
    setCustomPenalty('');
  };

  const calculatedPenalty = calculatePenalty();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant="destructive"
          className="bg-red-600 hover:bg-red-700"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          জরিমানা / Penalty
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            জরিমানা ব্যবস্থাপনা / Penalty Management
          </DialogTitle>
          <DialogDescription>
            {memberName} এর জন্য জরিমানা নির্ধারণ করুন
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Payment Info */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>মাসিক অবদান:</span>
                  <span>৳ {monthlyAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>বিলম্ব:</span>
                  <Badge variant="destructive">
                    <Calendar className="h-3 w-3 mr-1" />
                    {daysPastDue} দিন
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Penalty Rate Setting */}
          <div className="space-y-2">
            <Label htmlFor="penalty-rate">জরিমানার হার (প্রতি সপ্তাহে %)</Label>
            <Input
              id="penalty-rate"
              type="number"
              value={penaltyRate}
              onChange={(e) => setPenaltyRate(Number(e.target.value))}
              min="0"
              max="50"
            />
          </div>

          {/* Auto-calculated Penalty */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">স্বয়ংক্রিয় গণনা:</span>
                </div>
                <span className="font-bold text-orange-700">
                  ৳ {calculatedPenalty.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                {Math.ceil(daysPastDue / 7)} সপ্তাহ × {penaltyRate}% হারে
              </p>
            </CardContent>
          </Card>

          {/* Custom Penalty */}
          <div className="space-y-2">
            <Label htmlFor="custom-penalty">কাস্টম জরিমানা (ঐচ্ছিক)</Label>
            <Input
              id="custom-penalty"
              type="number"
              placeholder="কাস্টম পরিমাণ লিখুন"
              value={customPenalty}
              onChange={(e) => setCustomPenalty(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              খালি রাখলে স্বয়ংক্রিয় গণনা ব্যবহার হবে
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={applyPenalty}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              জরিমানা প্রয়োগ করুন
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              বাতিল
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
