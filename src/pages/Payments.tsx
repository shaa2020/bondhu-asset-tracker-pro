
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QRReceipt } from '@/components/QRReceipt';
import { CheckCircle, XCircle, Download, Printer } from 'lucide-react';
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
    content: () => receiptRef.current,
    documentTitle: `Receipt-${selectedPayment?.receiptId}`,
  });

  const [payments, setPayments] = useState([
    {
      id: '1',
      memberName: 'আহমেদ রহমান',
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-07-01',
      receiptId: 'BAS-2024-001'
    },
    {
      id: '2',
      memberName: 'ফাতিমা খাতুন',
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'unpaid',
      date: null,
      receiptId: 'BAS-2024-002'
    },
    {
      id: '3',
      memberName: 'মোহাম্মদ করিম',
      month: 'জুলাই ২০২৪',
      amount: 10000,
      status: 'paid',
      date: '2024-07-05',
      receiptId: 'BAS-2024-003'
    }
  ]);

  const markAsPaid = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'paid', date: new Date().toISOString().split('T')[0] }
        : payment
    ));
    toast({
      title: "পেমেন্ট আপডেট / Payment Updated",
      description: "পেমেন্ট সফলভাবে পরিশোধিত হিসেবে চিহ্নিত করা হয়েছে",
    });
  };

  const generateReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowReceipt(true);
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('monthlyContributions')}</h1>
        <div className="text-sm text-gray-600">
          জুলাই ২০২৪ / July 2024
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {payments.map((payment) => (
          <Card key={payment.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-semibold">{payment.memberName}</h3>
                  <p className="text-sm text-gray-600">{payment.month}</p>
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
                  <p className="text-lg font-bold text-emerald-600">৳ {payment.amount.toLocaleString()}</p>
                  {payment.date && (
                    <p className="text-xs text-gray-500">
                      {new Date(payment.date).toLocaleDateString('bn-BD')}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {payment.status === 'unpaid' && isAdmin && (
                    <Button 
                      size="sm" 
                      onClick={() => markAsPaid(payment.id)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {t('markAsPaid')}
                    </Button>
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
        ))}
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
