
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QRReceipt } from '@/components/QRReceipt';
import { MemberPaymentHistory } from '@/components/MemberPaymentHistory';
import { PenaltyManager } from '@/components/PenaltyManager';
import { CheckCircle, XCircle, Download, Printer, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useReactToPrint } from 'react-to-print';

const Payments = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Receipt-${selectedPayment?.receiptId}`,
  });

  // All members data - this should sync with members from Settings/Members pages
  const [allMembers] = useState([
    {
      id: '1',
      name: 'আহমেদ রহমান',
      email: 'ahmed@example.com',
      monthlyContribution: 10000
    },
    {
      id: '2',
      name: 'ফাতিমা খাতুন',
      email: 'fatima@example.com',
      monthlyContribution: 10000
    },
    {
      id: '3',
      name: 'মোহাম্মদ করিম',
      email: 'karim@example.com',
      monthlyContribution: 10000
    },
    {
      id: '4',
      name: 'রাহেলা বেগম',
      email: 'rahela@example.com',
      monthlyContribution: 10000
    },
    {
      id: '5',
      name: 'সাইফুল ইসলাম',
      email: 'saiful@example.com',
      monthlyContribution: 10000
    }
  ]);

  const [payments, setPayments] = useState([
    {
      id: '1',
      memberId: '1',
      memberName: 'আহমেদ রহমান',
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-07-01',
      receiptId: 'BAS-2024-001',
      penalty: 0
    },
    {
      id: '2',
      memberId: '2',
      memberName: 'ফাতিমা খাতুন',
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'unpaid',
      date: null,
      receiptId: 'BAS-2024-002',
      penalty: 0,
      dueDate: '2024-07-05'
    },
    {
      id: '3',
      memberId: '3',
      memberName: 'মোহাম্মদ করিম',
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-07-05',
      receiptId: 'BAS-2024-003',
      penalty: 0
    }
  ]);

  // Calculate days past due
  const calculateDaysPastDue = (dueDate: string) => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Create payment records for all members for current month
  const currentMonth = 'জুলাই ২০২৪';
  const allMemberPayments = allMembers.map(member => {
    const existingPayment = payments.find(p => p.memberId === member.id);
    return existingPayment || {
      id: `temp-${member.id}`,
      memberId: member.id,
      memberName: member.name,
      month: currentMonth,
      amount: member.monthlyContribution,
      status: 'unpaid',
      date: null,
      receiptId: `BAS-2024-${String(member.id).padStart(3, '0')}`,
      penalty: 0,
      dueDate: '2024-07-05'
    };
  });

  const markAsPaid = (paymentId: string) => {
    const tempPayment = allMemberPayments.find(p => p.id === paymentId);
    if (tempPayment && paymentId.startsWith('temp-')) {
      // Add new payment record
      const newPayment = {
        ...tempPayment,
        id: Date.now().toString(),
        status: 'paid',
        date: new Date().toISOString().split('T')[0]
      };
      setPayments([...payments, newPayment]);
    } else {
      // Update existing payment
      setPayments(payments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'paid', date: new Date().toISOString().split('T')[0] }
          : payment
      ));
    }
    
    toast({
      title: "পেমেন্ট আপডেট / Payment Updated",
      description: "পেমেন্ট সফলভাবে পরিশোধিত হিসেবে চিহ্নিত করা হয়েছে",
    });
  };

  const applyPenalty = (paymentId: string, penaltyAmount: number) => {
    if (paymentId.startsWith('temp-')) {
      // Update temporary payment in allMemberPayments calculation
      const tempPayment = allMemberPayments.find(p => p.id === paymentId);
      if (tempPayment) {
        const newPayment = {
          ...tempPayment,
          id: Date.now().toString(),
          penalty: penaltyAmount,
          amount: tempPayment.amount + penaltyAmount
        };
        setPayments([...payments, newPayment]);
      }
    } else {
      // Update existing payment
      setPayments(payments.map(payment => 
        payment.id === paymentId 
          ? { 
              ...payment, 
              penalty: penaltyAmount,
              amount: payment.amount - (payment.penalty || 0) + penaltyAmount
            }
          : payment
      ));
    }
  };

  const generateReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowReceipt(true);
  };

  const paidCount = allMemberPayments.filter(p => p.status === 'paid').length;
  const unpaidCount = allMemberPayments.filter(p => p.status === 'unpaid').length;
  const totalCollected = allMemberPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPenalties = allMemberPayments.reduce((sum, p) => sum + (p.penalty || 0), 0);

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('monthlyContributions')}</h1>
        <div className="text-sm text-gray-600">
          জুলাই ২০২৪ / July 2024
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-emerald-50">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-emerald-600">পরিশোধিত</p>
              <p className="text-lg font-bold text-emerald-700">{paidCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-red-600">বকেয়া</p>
              <p className="text-lg font-bold text-red-700">{unpaidCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-blue-600">মোট সংগ্রহ</p>
              <p className="text-sm font-bold text-blue-700">৳{totalCollected.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-orange-600">জরিমানা</p>
              <p className="text-sm font-bold text-orange-700">৳{totalPenalties.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allMemberPayments.map((payment) => {
          const daysPastDue = payment.status === 'unpaid' && payment.dueDate ? 
            calculateDaysPastDue(payment.dueDate) : 0;
          const hasLatePayment = daysPastDue > 0;

          return (
            <Card key={payment.id} className={`shadow-sm ${hasLatePayment ? 'border-red-200 bg-red-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-semibold">{payment.memberName}</h3>
                    <p className="text-sm text-gray-600">{payment.month}</p>
                    {hasLatePayment && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                        <span className="text-xs text-red-600">
                          {daysPastDue} দিন বিলম্ব
                        </span>
                      </div>
                    )}
                  </div>
                  <Badge 
                    variant={payment.status === 'paid' ? 'default' : 'destructive'}
                    className={payment.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : ''}
                  >
                    {payment.status === 'paid' ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> {t('paid')}</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> {t('unpaid')}</>
                    )}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-emerald-600">
                        ৳ {(payment.amount - (payment.penalty || 0)).toLocaleString()}
                      </p>
                      {payment.penalty > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          +৳{payment.penalty.toLocaleString()} জরিমানা
                        </Badge>
                      )}
                    </div>
                    {payment.penalty > 0 && (
                      <p className="text-sm font-semibold text-gray-700">
                        মোট: ৳ {payment.amount.toLocaleString()}
                      </p>
                    )}
                    {payment.date && (
                      <p className="text-xs text-gray-500">
                        {new Date(payment.date).toLocaleDateString('bn-BD')}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <MemberPaymentHistory 
                      memberName={payment.memberName} 
                      memberId={payment.memberId} 
                    />
                    {payment.status === 'unpaid' && isAdmin && (
                      <>
                        {hasLatePayment && (
                          <PenaltyManager
                            memberId={payment.memberId}
                            memberName={payment.memberName}
                            monthlyAmount={payment.amount - (payment.penalty || 0)}
                            daysPastDue={daysPastDue}
                            onPenaltyApplied={(penaltyAmount) => applyPenalty(payment.id, penaltyAmount)}
                          />
                        )}
                        <Button 
                          size="sm" 
                          onClick={() => markAsPaid(payment.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          {t('markAsPaid')}
                        </Button>
                      </>
                    )}
                    {payment.status === 'paid' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateReceipt(payment)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {t('generateReceipt')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showReceipt && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">পেমেন্ট রশিদ</h2>
              <div className="flex gap-2">
                <Button size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowReceipt(false)}>
                  Close
                </Button>
              </div>
            </div>
            
            <QRReceipt
              ref={receiptRef}
              memberName={selectedPayment.memberName}
              amount={selectedPayment.amount}
              month={selectedPayment.month}
              paymentMethod="ক্যাশ / Cash"
              receiptId={selectedPayment.receiptId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
