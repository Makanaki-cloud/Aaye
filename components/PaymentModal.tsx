
import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setLoading(true);
    // Simulate Stripe payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">Secure Payment</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
              <X size={20} />
            </button>
          </div>

          {!success ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Amount</p>
                  <p className="text-2xl font-black text-gray-900">{amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">Powered by</p>
                  <p className="font-bold text-blue-600 text-sm">Stripe</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Card Number" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    defaultValue="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-[10px] justify-center">
                <Lock size={12} />
                <span>Your transaction is encrypted and secure</span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-blue-300"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                {loading ? 'Processing...' : `Pay ${amount}`}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Payment Successful</h4>
              <p className="text-sm text-gray-500">Your inspection has been confirmed. Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
