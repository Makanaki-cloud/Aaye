
import React, { useState } from 'react';
import { Search, MapPin, Building, LandPlot, Home as HomeIcon, LayoutGrid, Sparkles, ShieldCheck } from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { AppState } from '../types';
import { useNavigate } from 'react-router-dom';

const Home: React.FC<{ appState: AppState }> = ({ appState }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    { icon: <LayoutGrid size={20} />, label: 'All', color: 'bg-gray-100' },
    { icon: <HomeIcon size={20} />, label: 'Houses', color: 'bg-blue-50' },
    { icon: <LandPlot size={20} />, label: 'Land', color: 'bg-green-50' },
    { icon: <Building size={20} />, label: 'Offices', color: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Search Header */}
      <section className="bg-green-600 pt-2 pb-12 px-4 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="mb-6 mt-2 relative z-10">
          <p className="text-green-100 text-xs font-black uppercase tracking-widest">Aaye Real Estate</p>
          <div className="flex items-center gap-1 text-white mt-1">
            <MapPin size={18} className="text-green-300" />
            <h2 className="text-2xl font-black">Abuja, Nigeria</h2>
          </div>
        </div>

        <div className="relative group z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600" size={20} />
          <input
            type="text"
            placeholder="Search Estates or Landmarks (e.g. Wuse 2)"
            className="w-full bg-white rounded-2xl py-5 pl-12 pr-4 shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Trust Spotlight Card */}
      <section className="px-4 -mt-10 relative z-20">
        <div className="bg-white border-2 border-green-100 rounded-[32px] p-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-black text-gray-800 text-sm uppercase">Verification Hub</h4>
            </div>
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">Live Support</span>
          </div>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Every property listed on Aaye undergoes a rigorous 4-step physical verification. From AGIS registry to physical beacon checks.
          </p>
          <button 
            onClick={() => navigate('/learn')}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl group hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-green-600" size={16} />
              <span className="text-xs font-black text-gray-700">Check Land Documents</span>
            </div>
            <div className="p-1 bg-white rounded-lg shadow-sm group-hover:translate-x-1 transition-transform">
               <Sparkles size={12} className="text-green-600" />
            </div>
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Categories</h3>
          <button className="text-green-600 text-[10px] font-black uppercase tracking-widest">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
              <div className={`${cat.color} w-16 h-16 rounded-3xl flex items-center justify-center text-gray-700 shadow-sm active:scale-90 transition-all hover:shadow-md`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Hot Shortlets</h3>
          <div className="text-[9px] bg-blue-600 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest animate-pulse">
            New
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {MOCK_PROPERTIES.filter(p => p.rentType === 'short-let').map(prop => (
            <PropertyCard 
              key={prop.id} 
              property={prop} 
              currency={appState.currency} 
            />
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section className="px-4 pb-12">
        <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-gray-900/40">
          <div className="relative z-10">
            <h3 className="font-black text-2xl mb-3 leading-tight">Map-based<br/>Search is Here.</h3>
            <p className="text-gray-400 text-sm mb-8 font-medium">Find apartments in the exact street you want with our interactive neighborhood map.</p>
            <button 
              onClick={() => navigate('/explore')}
              className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-900/40 active:scale-95 transition-all"
            >
              Open Explore Map
            </button>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-600/30 rounded-full -mr-16 -mt-16 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full -ml-8 -mb-8 blur-[40px]"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
