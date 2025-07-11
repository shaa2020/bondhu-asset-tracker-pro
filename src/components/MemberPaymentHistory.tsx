
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';

interface PaymentRecord {
  month: string;
  amount: number;
  status: 'paid' | 'unpaid';
  date?: string;
  receiptId?: string;
}

interface MemberPaymentHistoryProps {
  memberName: string;
  memberId: string;
}

export const MemberPaymentHistory = ({ memberName, memberId }: MemberPaymentHistoryProps) => {
  const [open, setOpen] = useState(false);

  // Mock payment history - in real app this would come from database
  const paymentHistory: PaymentRecord[] = [
    {
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-07-05',
      receiptId: 'BAS-2024-001'
    },
    {
      month: 'জুন ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-06-03',
      receiptId: 'BAS-2024-002'
    },
    {
      month: 'মে ২০২৪',
      amount: 10000,
      status: 'unpaid'
    },
    {
      month: 'এপ্রিল ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-04-07',
      receiptId: 'BAS-2024-003'
    },
    {
      month: 'মার্চ ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-03-05',
      receiptId: 'BAS-2024-004'
    }
  ];

  const totalPaid = paymentHistory.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalUnpaid = paymentHistory.filter(p => p.status === 'unpaid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          পেমেন্ট ইতিহাস
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{memberName} - পেমেন্ট ইতিহাস</DialogTitle>
          <DialogDescription>
            সদস্যের মাসিক অবদানের সম্পূর্ণ ইতিহাস
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-emerald-50">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xs text-emerald-600">মোট পরিশোধিত</p>
                  <p className="text-lg font-bold text-emerald-700">৳ {totalPaid.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xs text-red-600">বকেয়া</p>
                  <p className="text-lg font-bold text-red-700">৳ {totalUnpaid.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">মাসিক পেমেন্ট রেকর্ড</h3>
            {paymentHistory.map((payment, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{payment.month}</p>
                      <p className="text-xs text-gray-600">৳ {payment.amount.toLocaleString()}</p>
                      {payment.date && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(payment.date).toLocaleDateString('bn-BD')}
                        </div>
                      )}
                      {payment.receiptId && (
                        <p className="text-xs text-gray-500">রশিদ: {payment.receiptId}</p>
                      )}
                    </div>
                    <Badge 
                      variant={payment.status === 'paid' ? 'default' : 'destructive'}
                      className={payment.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : ''}
                    >
                      {payment.status === 'paid' ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> পরিশোধিত</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> বকেয়া</>
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
