
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ChevronLeft, ShieldCheck, CheckCircle, Phone, MessageCircle, Info, Calendar, Zap, Shield, ChevronRight, CreditCard, Star, FileCheck, Search, Activity, BadgePercent, Wifi, Utensils, Waves, MessageSquareText, Sparkles, Loader2 } from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';
import { AppState, Inspection } from '../types';
import BookingModal from '../components/BookingModal';
import { getNeighborhoodInsights } from '../services/gemini';

interface PropertyDetailProps {
  appState: AppState;
  onBook: (inspection: Inspection) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ appState, onBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [payMonthly, setPayMonthly] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const property = MOCK_PROPERTIES.find(p => p.id === id);

  useEffect(() => {
    if (property) {
      setLoadingInsights(true);
      getNeighborhoodInsights(property.location, property.landmark).then(res => {
        setInsights(res);
        setLoadingInsights(false);
      });
    }
  }, [id]);

  if (!property) {
    return <div className="p-8 text-center">Property not found.</div>;
  }

  const formatPrice = (price: number, isMonthly: boolean) => {
    if (property.rentType === 'short-let') {
        const val = appState.currency === 'USD' ? price / 1600 : price;
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: appState.currency, maximumFractionDigits: 0 }).format(val);
    }
    const base = isMonthly && property.rentType !== 'sale' ? (price * 1.12) / 12 : price;
    const val = appState.currency === 'USD' ? base / 1600 : base;
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: appState.currency, maximumFractionDigits: 0 }).format(val);
  };

  const getAgentScore = () => property.agent.rating * 20;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello ${property.agent.name}, I'm interested in "${property.title}" listed on Aaye. Is it still available?`);
    window.open(`https://wa.me/${property.agent.phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="pb-40 animate-in fade-in duration-500 bg-white">
      {/* Immersive Gallery */}
      <div className="relative h-80 overflow-hidden group">
        <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl active:scale-90 transition-all z-20"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end z-10">
          <div>
            <div className="flex gap-2 mb-2">
               <span className={`text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30`}>
                 {property.rentType === 'short-let' ? 'Shortlet' : property.rentType}
               </span>
               {property.tags.slice(0, 1).map(tag => (
                 <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30">
                   {tag}
                 </span>
               ))}
            </div>
            <h1 className="text-2xl font-black text-white leading-tight">{property.title}</h1>
          </div>
          <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-3xl flex flex-col items-center shadow-2xl border border-white/50">
            <span className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1 tracking-tighter">TRUST</span>
            <span className={`text-xl font-black ${property.trustScore > 80 ? 'text-green-600' : 'text-orange-500'}`}>
              {property.trustScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 -mt-6 relative z-10 bg-white rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        
        {/* AI Neighborhood Insights */}
        <section className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-blue-600" size={18} />
              <h3 className="font-black text-gray-900 text-xs uppercase tracking-wider">Neighborhood Vibe Check</h3>
            </div>
            <div className="text-[8px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">AI Guide</div>
          </div>
          
          {loadingInsights ? (
             <div className="flex items-center gap-3 py-4">
               <Loader2 className="animate-spin text-blue-400" size={16} />
               <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Generating Local Insights...</span>
             </div>
          ) : (
            <div className="text-xs text-blue-900 leading-relaxed font-medium space-y-2 whitespace-pre-wrap">
              {insights}
            </div>
          )}
        </section>

        {/* Amenities Section */}
        {property.rentType === 'short-let' && property.details.amenities && (
          <section>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Prime Amenities</h3>
            <div className="grid grid-cols-4 gap-4">
               {property.details.amenities.map(amenity => (
                 <div key={amenity} className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-gray-50 rounded-2xl text-gray-700">
                      {amenity === 'Wifi' && <Wifi size={20} />}
                      {amenity === 'Pool' && <Waves size={20} />}
                      {amenity === 'Chef Services' && <Utensils size={20} />}
                      {!['Wifi', 'Pool', 'Chef Services'].includes(amenity) && <CheckCircle size={20} />}
                    </div>
                    <span className="text-[9px] font-black text-gray-500 uppercase">{amenity}</span>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* TRUST SCORE WIDGET */}
        <section className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={20} />
              <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider">Aaye Trust Analysis</h3>
            </div>
          </div>

          <div className="space-y-5">
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <FileCheck size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-800">Agent Credibility</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{property.agent.rating} Star Verified History</p>
                  </div>
                </div>
                <span className="text-xs font-black text-gray-900">{getAgentScore()}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${getAgentScore()}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Agent Card */}
        <div className="bg-gray-50 rounded-[32px] p-5 flex items-center justify-between border border-gray-100">
           <div className="flex items-center gap-4">
             <div className="relative">
               <div className="w-16 h-16 bg-white rounded-[20px] overflow-hidden border-2 border-white shadow-md">
                 <img src={property.agent.avatar || `https://i.pravatar.cc/150?u=${property.agent.name}`} alt="" />
               </div>
               <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-lg border-2 border-white">
                 <ShieldCheck size={12} />
               </div>
             </div>
             <div>
               <h4 className="font-black text-gray-900">{property.agent.name}</h4>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Master Host</p>
             </div>
           </div>
           <div className="flex gap-2">
             <button 
              onClick={handleWhatsApp}
              className="p-4 bg-[#25D366] text-white rounded-2xl shadow-lg active:scale-90 transition-all"
             >
               <MessageSquareText size={22} />
             </button>
             <button className="p-4 bg-white text-blue-600 rounded-2xl shadow-sm border border-gray-100 active:scale-90 transition-all">
               <Phone size={22} />
             </button>
           </div>
        </div>
      </div>

      {/* FIXED FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-4 pb-8">
        <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 p-5 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[32px]">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1">
              {property.rentType === 'short-let' ? 'Per Night' : 'Total Price'}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-gray-900">{formatPrice(property.price, payMonthly)}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowBooking(true)}
            className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-900/30 active:scale-95 transition-all hover:bg-green-700"
          >
            {property.rentType === 'short-let' ? 'Reserve Now' : 'Book Visit'}
          </button>
        </div>
      </div>

      <BookingModal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)} 
        property={property}
        onConfirm={(inspection) => {
          onBook(inspection);
          setShowBooking(false);
          navigate('/inspect');
        }}
      />
    </div>
  );
};

export default PropertyDetail;
