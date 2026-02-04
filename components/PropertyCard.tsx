
import React from 'react';
import { MapPin, CheckCircle, ShieldCheck, Heart, Star } from 'lucide-react';
import { Property } from '../types';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  currency: 'NGN' | 'USD';
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, currency, onSave, isSaved }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    const val = currency === 'USD' ? price / 1600 : price;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      <div className="relative aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSave?.(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-md ${
            isSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-500'
          }`}
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
        
        <div className="absolute top-3 left-3 flex gap-2">
           {property.rentType === 'short-let' && (
             <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-lg">
               Shortlet
             </div>
           )}
           {property.isFeatured && (
             <div className="bg-green-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-lg">
               Verified
             </div>
           )}
        </div>

        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
          {property.rentType === 'short-let' ? 'Short Let' : property.rentType}
        </div>
      </div>

      <div className="p-4" onClick={() => navigate(`/property/${property.id}`)}>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 leading-tight">{property.title}</h3>
          <div className="flex items-center gap-1 text-orange-500">
             <Star size={12} fill="currentColor" />
             <span className="text-[10px] font-black">{property.agent.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-xs gap-1 mb-2">
          <MapPin size={14} className="text-green-600" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 mb-3 border-b border-gray-100 pb-3 uppercase tracking-tighter">
          {property.details.beds && <span>{property.details.beds} Beds</span>}
          {property.details.size && <span>{property.details.size}</span>}
          {property.rentType === 'short-let' && <span>Self Check-in</span>}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-black text-gray-900">
              {formatPrice(property.price)}
              {property.rentType === 'short-let' ? (
                <span className="text-xs font-normal text-gray-500"> /night</span>
              ) : property.rentType !== 'sale' && (
                <span className="text-xs font-normal text-gray-500"> /yr</span>
              )}
            </div>
          </div>
          <button className="bg-gray-900 text-white text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest active:scale-95 transition-transform">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
