
import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface QRReceiptProps {
  memberName: string;
  amount: number;
  month: string;
  paymentMethod: string;
  receiptId: string;
}

export const QRReceipt = forwardRef<HTMLDivElement, QRReceiptProps>(
  ({ memberName, amount, month, paymentMethod, receiptId }, ref) => {
    const { t } = useLanguage();
    const qrData = JSON.stringify({
      receiptId,
      memberName,
      amount,
      month,
      date: format(new Date(), 'yyyy-MM-dd'),
      organization: 'Bondhu Asset Somity'
    });

    return (
      <div ref={ref} className="bg-white p-6 max-w-md mx-auto shadow-lg rounded-lg">
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-emerald-600">বন্ধু এসেট সমিতি</h2>
          <p className="text-sm text-gray-600">Bondhu Asset Somity</p>
          <p className="text-xs text-gray-500 mt-1">পেমেন্ট রশিদ / Payment Receipt</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">রশিদ নং / Receipt ID:</span>
            <span className="text-sm font-mono">{receiptId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">সদস্যের নাম / Member:</span>
            <span className="text-sm font-medium">{memberName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">মাস / Month:</span>
            <span className="text-sm">{month}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">পরিমাণ / Amount:</span>
            <span className="text-lg font-bold text-emerald-600">৳ {amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">পেমেন্ট পদ্ধতি / Method:</span>
            <span className="text-sm">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">তারিখ / Date:</span>
            <span className="text-sm">{format(new Date(), 'dd/MM/yyyy')}</span>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={qrData}
            size={120}
            level="M"
            includeMargin={true}
          />
        </div>

        <div className="text-center text-xs text-gray-500 border-t pt-3">
          <p>এই রশিদটি ডিজিটালভাবে যাচাই করা যেতে পারে</p>
          <p>This receipt can be digitally verified</p>
          <p className="mt-2 font-mono">{format(new Date(), 'dd/MM/yyyy HH:mm:ss')}</p>
        </div>
      </div>
    );
  }
);

QRReceipt.displayName = 'QRReceipt';
