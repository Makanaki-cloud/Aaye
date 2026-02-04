
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wallet, Eye, Building, TrendingUp, Zap, Crown, Shield, Plus, MoreVertical, Star, Activity } from 'lucide-react';
import { AppState } from '../types';
import { MOCK_PROPERTIES } from '../constants';

interface DashboardProps {
  appState: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ appState }) => {
  const navigate = useNavigate();

  const mockStats = {
    totalEarnings: appState.currency === 'USD' ? 4200 : 6720000,
    totalViews: 12840,
    activeListings: 4,
    avgRating: 4.8,
    pendingInspections: 3
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: appState.currency,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-black text-sm uppercase tracking-widest text-gray-900">Agent Dashboard</h2>
        <button className="p-2 bg-gray-50 rounded-xl text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Profile Brief */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
               <img src="https://picsum.photos/seed/user/150" alt="Agent" />
             </div>
             <div>
               <h3 className="font-black text-gray-900">Ibrahim Ahmed</h3>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Now</span>
               </div>
             </div>
           </div>
           <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl flex flex-col items-center border border-blue-100">
              <span className="text-[8px] font-black uppercase tracking-tighter">TRUST SCORE</span>
              <span className="font-black text-lg">94%</span>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="p-2 bg-green-50 text-green-600 w-fit rounded-xl">
                 <Wallet size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Earnings</p>
                 <h4 className="text-lg font-black text-gray-900 mt-0.5">{formatCurrency(mockStats.totalEarnings)}</h4>
              </div>
           </div>
           <div className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 w-fit rounded-xl">
                 <Eye size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Listing Views</p>
                 <h4 className="text-lg font-black text-gray-900 mt-0.5">{mockStats.totalViews.toLocaleString()}</h4>
              </div>
           </div>
           <div className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 w-fit rounded-xl">
                 <Building size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Ads</p>
                 <h4 className="text-lg font-black text-gray-900 mt-0.5">{mockStats.activeListings} Properties</h4>
              </div>
           </div>
           <div className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="p-2 bg-orange-50 text-orange-600 w-fit rounded-xl">
                 <Star size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Agent Rating</p>
                 <h4 className="text-lg font-black text-gray-900 mt-0.5">{mockStats.avgRating} Stars</h4>
              </div>
           </div>
        </div>

        {/* Subscription Info */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                 <div className="p-3 bg-white/10 rounded-2xl">
                   <Shield className="text-blue-400" />
                 </div>
                 <div>
                   <h4 className="font-black text-lg">Pro Host Plan</h4>
                   <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Renews in 12 days</p>
                 </div>
               </div>
               <button className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20">Manage</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest">Listing Limit</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-black text-xl">4/10</span>
                    <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-400 w-[40%]"></div>
                    </div>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest">Featured Slots</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-black text-xl">2/3</span>
                    <Zap size={14} className="text-orange-400 fill-current" />
                  </div>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </section>

        {/* Property List Preview */}
        <section>
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">My Properties</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">See All</button>
           </div>
           
           <div className="space-y-4">
             {MOCK_PROPERTIES.slice(0, 2).map((prop) => (
               <div key={prop.id} className="bg-white border border-gray-100 rounded-[32px] p-4 flex gap-4 shadow-sm relative overflow-hidden group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src={prop.images[0]} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 py-1">
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-[8px] font-black bg-green-50 text-green-600 px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
                       <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">• {prop.rentType}</span>
                     </div>
                     <h4 className="font-black text-gray-900 text-sm leading-tight mb-2 line-clamp-1">{prop.title}</h4>
                     
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                           <Eye size={12} className="text-gray-400" />
                           <span className="text-[10px] font-black text-gray-600">1.2k</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Activity size={12} className="text-gray-400" />
                           <span className="text-[10px] font-black text-gray-600">14 Leads</span>
                        </div>
                     </div>
                  </div>
                  <button className="absolute top-4 right-4 text-gray-300">
                     <MoreVertical size={16} />
                  </button>
               </div>
             ))}
           </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white border-2 border-dashed border-gray-200 rounded-[40px] p-8 flex flex-col items-center justify-center text-center gap-4">
           <div className="p-4 bg-gray-50 rounded-full text-gray-300">
              <TrendingUp size={32} />
           </div>
           <div>
              <h4 className="font-black text-gray-700">Grow Your Portfolio</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">List more apartments to increase your monthly recurring revenue.</p>
           </div>
           <button 
             onClick={() => navigate('/host')}
             className="bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2"
           >
             <Plus size={16} />
             Add Property
           </button>
        </section>
      </div>

      {/* Floating CTA for Listing */}
      <div className="fixed bottom-24 right-6 z-50">
         <button 
           onClick={() => navigate('/host')}
           className="bg-green-600 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center active:scale-90 transition-all group overflow-hidden"
         >
           <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
         </button>
      </div>
    </div>
  );
};

export default Dashboard;
