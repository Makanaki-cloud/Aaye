
import React, { useState } from 'react';
import { X, Calendar, Clock, CreditCard, CheckCircle2, Loader2, Info } from 'lucide-react';
import { Property, Inspection } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  onConfirm: (inspection: Inspection) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, property, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const dates = [
    { label: 'Today', value: new Date().toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' }) },
    { label: 'Tomorrow', value: new Date(Date.now() + 86400000).toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' }) },
    { label: 'Sat, 14 Dec', value: 'Sat, 14 Dec' },
    { label: 'Sun, 15 Dec', value: 'Sun, 15 Dec' },
  ];

  const times = ['10:00 AM', '12:30 PM', '02:30 PM', '04:00 PM'];

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      const newInspection: Inspection = {
        id: `ins-${Math.random().toString(36).substr(2, 9)}`,
        date: `${selectedDate}, ${selectedTime}`,
        property,
        status: 'Pending Payment',
        fee: '₦2,500',
        paid: false
      };
      onConfirm(newInspection);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-gray-900">Schedule Visit</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Step 1: Select Date */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-green-600" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Date</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDate(d.value)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      selectedDate === d.value ? 'border-green-600 bg-green-50 shadow-md' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{d.label}</p>
                    <p className="text-sm font-bold text-gray-900">{d.value}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-green-600" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Available Slots</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`p-3 rounded-2xl border-2 transition-all ${
                      selectedTime === t ? 'border-green-600 bg-green-50 shadow-md' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-sm font-bold text-gray-900">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Inspection Fee Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
               <Info size={20} className="text-blue-600 flex-shrink-0" />
               <div>
                 <p className="text-xs font-bold text-blue-900">Standard Inspection Fee: ₦2,500</p>
                 <p className="text-[10px] text-blue-700 mt-1">Fees cover logistics and ensure agent availability. Refundable if the agent cancels.</p>
               </div>
            </div>

            <button 
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 shadow-xl shadow-green-900/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : null}
              {loading ? 'Confirming...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
