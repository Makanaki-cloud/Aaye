
import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, LayoutGrid, Search, Map as MapIcon, Compass, Info, X, MapPin, Navigation } from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { AppState, Property } from '../types';
import { useNavigate } from 'react-router-dom';

const Explore: React.FC<{ appState: AppState }> = ({ appState }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [selectedMapProperty, setSelectedMapProperty] = useState<Property | null>(null);

  const formatPrice = (price: number) => {
    const val = appState.currency === 'USD' ? price / 1600 : price;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: appState.currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Simulated coordinates for mock map positioning
  const mapMarkers = useMemo(() => [
    { top: '15%', left: '45%', propertyId: '3', label: 'Phase 1 - Maitama' }, // Luxury Apartment
    { top: '55%', left: '70%', propertyId: '1', label: 'Phase 2 - Guzape' }, // Duplex
    { top: '35%', left: '25%', propertyId: '2', label: 'Phase 2 - Katampe' }, // Land
  ], []);

  return (
    <div className="pb-12 bg-gray-50 min-h-screen">
      {/* Search & Filter Header */}
      <div className="sticky top-[53px] z-40 bg-white shadow-sm border-b">
        <div className="p-4 flex gap-2 overflow-x-auto hide-scrollbar">
          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-black/10 whitespace-nowrap">
            <Filter size={14} />
            Refine
          </button>
          {['District', 'Price Range', 'Prop Type', 'Phase'].map(filter => (
            <button key={filter} className="flex items-center gap-1 bg-white text-gray-600 px-5 py-2.5 rounded-2xl text-xs font-bold border border-gray-200 whitespace-nowrap active:bg-gray-50">
              {filter}
              <ChevronDown size={14} />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex justify-between items-center bg-white border-b lg:border-none">
        <div>
          <h3 className="font-black text-gray-900 text-lg">Verified Listings</h3>
          <p className="text-xs text-gray-500 font-medium">Abuja Central & Suburban Zones</p>
        </div>
        <div className="flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
          <button 
            onClick={() => setView('grid')}
            className={`p-2 rounded-xl transition-all duration-300 ${view === 'grid' ? 'bg-white shadow-md text-green-600' : 'text-gray-400'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setView('map')}
            className={`p-2 rounded-xl transition-all duration-300 ${view === 'map' ? 'bg-white shadow-md text-green-600' : 'text-gray-400'}`}
          >
            <MapIcon size={18} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-6 grid gap-8 mt-4">
            {MOCK_PROPERTIES.map(prop => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                currency={appState.currency} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-210px)] w-full relative animate-in zoom-in-95 duration-500 overflow-hidden bg-[#e5e7eb]">
          {/* MOCK MAP BACKGROUND LAYER */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
               {Array.from({length: 144}).map((_, i) => (
                 <div key={i} className="border border-gray-900/10"></div>
               ))}
            </div>
            
            {/* Phase Boundaries */}
            <div className="absolute top-[5%] left-[5%] w-[50%] h-[40%] bg-green-600/5 border-2 border-dashed border-green-600/20 rounded-[40px] flex items-center justify-center">
               <span className="text-[10px] font-black text-green-800/40 uppercase tracking-widest">Phase 1 (Prime Core)</span>
            </div>
            <div className="absolute bottom-[5%] right-[5%] w-[60%] h-[50%] bg-blue-600/5 border-2 border-dashed border-blue-600/20 rounded-[40px] flex items-center justify-center">
               <span className="text-[10px] font-black text-blue-800/40 uppercase tracking-widest">Phase 2 (Growth Corridor)</span>
            </div>

            {/* Simulated Main Roads */}
            <div className="absolute top-[25%] left-0 w-full h-4 bg-gray-400/20 -rotate-12"></div>
            <div className="absolute top-0 left-[60%] w-4 h-full bg-gray-400/20 rotate-6"></div>
          </div>

          {/* District Labels */}
          <div className="absolute top-[12%] left-[45%] bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md text-[8px] font-black text-gray-400 shadow-sm border border-white/50">MAITAMA</div>
          <div className="absolute top-[55%] left-[75%] bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md text-[8px] font-black text-gray-400 shadow-sm border border-white/50">GUZAPE</div>
          <div className="absolute top-[35%] left-[20%] bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md text-[8px] font-black text-gray-400 shadow-sm border border-white/50">KATAMPE</div>

          {/* Interactive Markers */}
          {mapMarkers.map((marker, i) => {
            const property = MOCK_PROPERTIES.find(p => p.id === marker.propertyId)!;
            const isActive = selectedMapProperty?.id === property.id;
            
            return (
              <div 
                key={i}
                style={{ top: marker.top, left: marker.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button 
                  onClick={() => setSelectedMapProperty(property)}
                  className={`flex flex-col items-center group transition-transform active:scale-90`}
                >
                  <div className={`px-3 py-1.5 rounded-full font-black text-[10px] shadow-2xl transition-all duration-300 flex items-center gap-1 border-2 ${
                    isActive ? 'bg-green-600 border-white text-white scale-110' : 'bg-white border-green-600 text-green-700'
                  }`}>
                    {formatPrice(property.price)}
                    {isActive && <Navigation size={10} className="fill-current" />}
                  </div>
                  <div className={`w-0.5 h-2 bg-green-600 transition-all ${isActive ? 'h-3' : 'h-2'}`}></div>
                </button>
              </div>
            );
          })}

          {/* Map Info Legend */}
          <div className="absolute top-4 left-4 z-30 space-y-2">
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 max-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <Info size={14} className="text-blue-600" />
                <h4 className="text-[10px] font-black text-gray-900 uppercase">Zone Key</h4>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-bold text-gray-600">Phase 1: High Liquidity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[9px] font-bold text-gray-600">Phase 2: High Yield</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Property Snippet Card (Shown on marker click) */}
          {selectedMapProperty && (
            <div className="absolute bottom-6 left-6 right-6 z-40 animate-in slide-in-from-bottom duration-300">
              <div className="bg-white rounded-[32px] p-4 shadow-2xl border border-gray-100 flex gap-4 relative overflow-hidden group">
                <button 
                  onClick={() => setSelectedMapProperty(null)}
                  className="absolute top-3 right-3 p-1.5 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={16} />
                </button>
                
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                  <img src={selectedMapProperty.images[0]} className="w-full h-full object-cover" alt="" />
                </div>
                
                <div className="flex-1 pr-4 py-1">
                  <div className="flex items-center gap-1 mb-1">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      selectedMapProperty.trustScore > 85 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {selectedMapProperty.trustScore}% Trust
                    </span>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">• {selectedMapProperty.type}</span>
                  </div>
                  <h4 className="font-black text-gray-900 text-sm leading-tight mb-1">{selectedMapProperty.title}</h4>
                  <div className="flex items-center gap-1 text-gray-500 mb-3">
                    <MapPin size={12} className="text-green-600" />
                    <span className="text-[10px] font-bold">{selectedMapProperty.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-black text-green-700 text-sm">{formatPrice(selectedMapProperty.price)}</p>
                    <button 
                      onClick={() => navigate(`/property/${selectedMapProperty.id}`)}
                      className="text-[10px] font-black text-gray-900 underline underline-offset-4"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compass Overlay */}
          <div className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 text-gray-400">
            <Compass size={24} className="animate-[spin_10s_linear_infinite]" />
          </div>
        </div>
      )}
      
      {/* Search Estates Overlay FAB */}
      <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${selectedMapProperty && view === 'map' ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <button className="bg-gray-900 text-white px-10 py-5 rounded-full flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] font-black text-xs active:scale-95 transition-all group overflow-hidden relative">
          <div className="absolute inset-0 bg-green-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          <Search size={16} className="relative z-10" />
          <span className="relative z-10">Search Local Districts</span>
        </button>
      </div>
    </div>
  );
};

export default Explore;
