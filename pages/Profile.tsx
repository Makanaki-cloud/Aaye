
import React from 'react';
import { Shield, Globe, Power, Heart, Bell, MessageSquare, ChevronRight, Briefcase, PlusCircle, Star } from 'lucide-react';
import { AppState } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  appState: AppState;
  onUpdateState: (updates: Partial<AppState>) => void;
}

const Profile: React.FC<ProfileProps> = ({ appState, onUpdateState }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex items-center gap-4 py-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
          <img src="https://picsum.photos/seed/user/200" alt="Avatar" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Ibrahim Ahmed</h2>
          <p className="text-sm text-gray-500">+234 803 123 4567</p>
          <div className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold mt-1 uppercase">
            <Shield size={10} /> Verified User
          </div>
        </div>
      </div>

      {/* AGENT PORTAL ENTRY */}
      <section className="bg-gradient-to-br from-gray-900 to-black rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
         <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-black text-lg">Agent Portal</h3>
                <p className="text-xs text-gray-400">Manage your apartments & short-lets</p>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl">
                <Briefcase size={20} />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/host')}
                className="flex-1 bg-green-600 text-white py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <PlusCircle size={14} />
                List Apartment
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-2xl font-black text-xs active:scale-95 transition-all"
              >
                Dashboard
              </button>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      </section>

      {/* Settings */}
      <section className="bg-white border rounded-3xl p-5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Globe size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Diaspora Mode</h4>
              <p className="text-[10px] text-gray-400">View prices in USD ($)</p>
            </div>
          </div>
          <button 
            onClick={() => onUpdateState({ currency: appState.currency === 'NGN' ? 'USD' : 'NGN' })}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              appState.currency === 'USD' ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
              appState.currency === 'USD' ? 'right-1' : 'left-1'
            }`}></div>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Power size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Low Data Mode</h4>
              <p className="text-[10px] text-gray-400">Reduce image resolution</p>
            </div>
          </div>
          <button 
            onClick={() => onUpdateState({ lowDataMode: !appState.lowDataMode })}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              appState.lowDataMode ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
              appState.lowDataMode ? 'right-1' : 'left-1'
            }`}></div>
          </button>
        </div>
      </section>

      <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
        {[
          { icon: <Heart size={20} />, label: 'Saved Listings', count: appState.savedListings.length },
          { icon: <Bell size={20} />, label: 'Notifications', count: 2 },
          { icon: <Star size={20} />, label: 'My Reviews' },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-0 transition-colors">
            <div className="flex items-center gap-4 text-gray-700">
              <span className="text-gray-400">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.count !== undefined && (
                <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </button>
        ))}
      </div>

      <button className="w-full py-4 text-red-500 font-bold border-2 border-red-50 rounded-2xl active:bg-red-50 transition-colors">
        Logout
      </button>

      <p className="text-center text-[10px] text-gray-400">Aaye v1.0.4 - Built with ❤️ in Abuja</p>
    </div>
  );
};

export default Profile;
