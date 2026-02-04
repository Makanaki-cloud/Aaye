
import React, { useState } from 'react';
import { Calendar, MessageCircle, Phone, MapPin, MoreHorizontal, CreditCard } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import { Inspection } from '../types';

interface InspectProps {
  inspections: Inspection[];
  onUpdateInspection: (id: string, updates: Partial<Inspection>) => void;
}

const Inspect: React.FC<InspectProps> = ({ inspections, onUpdateInspection }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedFee, setSelectedFee] = useState<{ id: string, amount: string } | null>(null);

  const initiatePayment = (id: string, amount: string) => {
    setSelectedFee({ id, amount });
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedFee) {
      onUpdateInspection(selectedFee.id, { paid: true, status: 'Confirmed' });
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">My Inspections</h2>
          <p className="text-sm text-gray-500">Track your property visits</p>
        </div>
        <button className="p-2 bg-gray-100 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {inspections.length === 0 ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4 opacity-50">
             <Calendar size={48} />
             <p className="text-sm font-medium">No inspections booked yet.</p>
          </div>
        ) : (
          inspections.map((ins) => (
            <div key={ins.id} className="bg-white border rounded-3xl overflow-hidden shadow-sm animate-in slide-in-from-bottom duration-300">
              <div className="p-4 border-b flex gap-3">
                <img src={ins.property.images[0]} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{ins.property.title}</h4>
                  <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                    <MapPin size={10} /> {ins.property.location}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ins.paid ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {ins.status}
                    </span>
                    <span className="text-[10px] text-gray-400 italic">Fee: {ins.fee}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white rounded-lg border">
                    <Calendar size={16} className="text-gray-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{ins.date}</span>
                </div>
                <div className="flex gap-2">
                  {!ins.paid ? (
                    <button 
                      onClick={() => initiatePayment(ins.id, ins.fee)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                    >
                      <CreditCard size={14} />
                      Pay Now
                    </button>
                  ) : (
                    <>
                      <button className="p-2 bg-green-50 text-green-600 rounded-xl border border-green-100 hover:bg-green-100 transition-colors">
                        <MessageCircle size={20} />
                      </button>
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                        <Phone size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        amount={selectedFee?.amount || '₦0'}
        onSuccess={handlePaymentSuccess}
      />

      {inspections.length > 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-white rounded-full shadow-sm text-gray-300">
            <Calendar size={48} />
          </div>
          <div>
            <h4 className="font-bold text-gray-700">Need more inspections?</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Book visits to verify properties before making any payments.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspect;
