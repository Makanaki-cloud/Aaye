
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Video, MapPin, Info, CheckCircle2, Loader2, Sparkles, X, Plus, Zap, ShieldCheck, User, Mail, Phone, FileText, Globe, Star, Shield, Crown, Check } from 'lucide-react';
import { NIGERIAN_CITIES } from '../constants';

const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    features: ['1 Active Listing', 'Basic Support', 'Standard Verification'],
    limit: 1,
    color: 'gray',
    icon: <User size={20} />
  },
  {
    id: 'pro',
    name: 'Pro Host',
    price: '₦12,500',
    period: '/month',
    features: ['10 Active Listings', 'Featured Listing Access', 'Priority Verification', 'WhatsApp Integration'],
    limit: 10,
    color: 'green',
    popular: true,
    icon: <Shield size={20} />
  },
  {
    id: 'elite',
    name: 'Elite Agency',
    price: '₦45,000',
    period: '/month',
    features: ['Unlimited Listings', 'Video Tours Enabled', 'Dedicated Manager', 'Top-of-Search Placement', 'Verified Badge'],
    limit: 999,
    color: 'blue',
    icon: <Crown size={20} />
  }
];

const Host: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [media, setMedia] = useState<{type: 'image' | 'video', url: string}[]>([]);
  
  // Registration Form State
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    profilePic: '',
    selectedCities: [] as string[]
  });

  const handleMediaUpload = (type: 'image' | 'video') => {
    const mockUrl = type === 'image' 
      ? `https://picsum.photos/seed/${Math.random()}/800/600`
      : 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
    
    setMedia(prev => [...prev, { type, url: mockUrl }]);
  };

  const handleProfilePicUpload = () => {
    setRegData(prev => ({ ...prev, profilePic: `https://i.pravatar.cc/150?u=${Math.random()}` }));
  };

  const toggleCity = (city: string) => {
    setRegData(prev => ({
      ...prev,
      selectedCities: prev.selectedCities.includes(city)
        ? prev.selectedCities.filter(c => c !== city)
        : [...prev.selectedCities, city]
    }));
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleRegisterAgent = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsRegistered(true);
    }, 1200);
  };

  const handleSelectPlan = (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      setStep(1); // Start listing flow
    }, 1000);
  };

  const renderRegistrationForm = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <div className="relative inline-block group">
          <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
            {regData.profilePic ? (
              <img src={regData.profilePic} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <User size={40} className="text-gray-300" />
            )}
          </div>
          <button 
            onClick={handleProfilePicUpload}
            className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-lg border-2 border-white hover:bg-green-700 active:scale-90 transition-all"
          >
            <Camera size={16} />
          </button>
        </div>
        <h3 className="mt-4 font-black text-gray-900">Agent Registration</h3>
        <p className="text-xs text-gray-500 font-medium">Build your hosting brand on Aaye</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Identity</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-green-500 outline-none" 
              value={regData.name}
              onChange={e => setRegData({...regData, name: e.target.value})}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-green-500 outline-none" 
              value={regData.email}
              onChange={e => setRegData({...regData, email: e.target.value})}
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="tel" 
              placeholder="Phone Number (WhatsApp preferred)" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-green-500 outline-none" 
              value={regData.phone}
              onChange={e => setRegData({...regData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Professional Bio</label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 text-gray-400" size={18} />
            <textarea 
              placeholder="Describe your hosting style or management portfolio..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-green-500 outline-none min-h-[100px]"
              value={regData.bio}
              onChange={e => setRegData({...regData, bio: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Globe size={14} className="text-green-600" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operating Cities</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {NIGERIAN_CITIES.map(city => (
              <button
                key={city}
                onClick={() => toggleCity(city)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                  regData.selectedCities.includes(city)
                    ? 'bg-green-600 border-green-600 text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleRegisterAgent}
        disabled={loading || !regData.name || !regData.email}
        className="w-full bg-gray-900 text-white py-5 rounded-[24px] font-black text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={16} />}
        {loading ? 'Submitting Application...' : 'Register as Professional Agent'}
      </button>
    </div>
  );

  const renderSubscriptionPlans = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      <div className="text-center mb-8">
        <h2 className="text-xl font-black text-gray-900">Choose Your Plan</h2>
        <p className="text-xs text-gray-500 mt-1">Unlock powerful features to grow your rental business.</p>
      </div>

      <div className="space-y-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div 
            key={plan.id}
            className={`relative p-6 rounded-[32px] border-2 transition-all group ${
              plan.popular ? 'border-green-600 bg-green-50 shadow-xl shadow-green-100' : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${plan.popular ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {plan.icon}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 leading-tight">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-black text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-[10px] font-bold text-gray-400">{plan.period}</span>}
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-medium text-gray-600">
                  <div className={`p-0.5 rounded-full ${plan.popular ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSelectPlan(plan.id)}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                plan.popular 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                  : 'bg-gray-900 text-white'
              }`}
            >
              {loading && selectedPlan === plan.id ? <Loader2 className="animate-spin mx-auto" size={16} /> : `Select ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center text-[10px] text-gray-400 font-bold px-4">
        * You can upgrade or downgrade your plan at any time from your agent dashboard.
      </p>
    </div>
  );

  const renderListingStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Apartment Title</label>
              <input type="text" placeholder="e.g. Executive 2BR Maitama Shortlet" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Location City</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none">
                {regData.selectedCities.length > 0 ? (
                  regData.selectedCities.map(city => <option key={city}>{city}</option>)
                ) : (
                  NIGERIAN_CITIES.map(city => <option key={city}>{city}</option>)
                )}
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Price per Night (₦)</label>
              <input type="number" placeholder="50,000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Property Media</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleMediaUpload('image')}
                  className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50 hover:bg-white hover:border-green-500 transition-all text-gray-400 hover:text-green-600"
                >
                  <Camera size={32} />
                  <span className="text-[10px] font-black uppercase">Add Photos</span>
                </button>
                <button 
                  onClick={() => handleMediaUpload('video')}
                  disabled={selectedPlan === 'starter'}
                  className={`flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed rounded-[32px] transition-all text-gray-400 ${
                    selectedPlan === 'starter' 
                    ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed' 
                    : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  <Video size={32} />
                  <span className="text-[10px] font-black uppercase">Add Video</span>
                  {selectedPlan === 'starter' && <span className="text-[8px] text-orange-500 font-black">Elite Feature</span>}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {media.map((item, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group">
                    <img src={item.type === 'image' ? item.url : 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" alt="" />
                    {item.type === 'video' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Video className="text-white" size={20} /></div>}
                    <button 
                      onClick={() => removeMedia(i)}
                      className="absolute top-1 right-1 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 block">Boost Visibility</label>
              <button 
                onClick={() => setIsFeatured(!isFeatured)}
                disabled={selectedPlan === 'starter'}
                className={`w-full text-left p-6 rounded-[32px] border-2 transition-all relative overflow-hidden group ${
                  selectedPlan === 'starter' ? 'opacity-50 grayscale cursor-not-allowed border-gray-100' :
                  isFeatured ? 'border-orange-500 bg-orange-50 shadow-xl shadow-orange-100' : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                {selectedPlan === 'starter' && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-20 flex items-center justify-center">
                    <div className="bg-gray-900 text-white text-[10px] px-4 py-2 rounded-full font-black uppercase">Upgrade to Boost</div>
                  </div>
                )}
                {isFeatured && <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-[8px] font-black uppercase tracking-tighter rounded-bl-xl">Selected</div>}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-4 rounded-2xl transition-colors ${isFeatured ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Zap size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900 leading-tight">Featured Listing Upgrade</h4>
                    <p className="text-xs text-gray-500 mt-1">Get 5x more views by appearing at the top of search results and explore map.</p>
                    <div className="mt-4 flex items-center justify-between">
                       <span className="text-sm font-black text-orange-600">₦15,000 /month</span>
                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isFeatured ? 'bg-orange-500 border-orange-500' : 'border-gray-200'}`}>
                          {isFeatured && <CheckCircle2 size={14} className="text-white" />}
                       </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center py-6 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl shadow-green-100">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Ready to Go Live!</h3>
            <p className="text-sm text-gray-500 max-w-[240px] mb-8">Your listing is verified. It will be visible to thousands of guests looking for short-lets.</p>
            <div className="w-full bg-gray-50 rounded-3xl p-6 text-left border border-gray-100">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Listing Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Platform Listing Fee</span>
                  <span className="text-gray-900 font-bold">₦0.00 (FREE)</span>
                </div>
                {isFeatured && (
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-600 font-bold flex items-center gap-1">
                      <Zap size={12} /> Featured Upgrade
                    </span>
                    <span className="text-orange-600 font-bold">₦15,000.00</span>
                  </div>
                )}
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="font-black text-gray-900">Total Due</span>
                  <span className="text-lg font-black text-gray-900">{isFeatured ? '₦15,000.00' : '₦0.00'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="p-6 flex items-center justify-between border-b sticky top-0 bg-white z-40">
        <button onClick={() => {
          if (!isRegistered) navigate(-1);
          else if (!isSubscribed) setIsRegistered(false);
          else if (step > 1) setStep(step - 1);
          else setIsSubscribed(false);
        }} className="p-2 bg-gray-50 rounded-xl">
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-black text-sm uppercase tracking-widest">
          {!isRegistered ? 'Host Registration' : !isSubscribed ? 'Agent Plans' : 'New Listing'}
        </h2>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-8">
        {!isRegistered ? (
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-gray-900 leading-tight">Become a Verified Aaye Agent</h1>
            <p className="text-xs text-gray-500 mt-2 font-medium">Join 500+ professionals managing apartments in Nigeria</p>
          </div>
        ) : !isSubscribed ? (
          <div className="text-center mb-2">
             <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Star size={12} fill="currentColor" /> Welcome, {regData.name.split(' ')[0]}
             </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`h-1.5 flex-1 rounded-full mx-1 transition-all ${step >= i ? 'bg-green-600' : 'bg-gray-100'}`}></div>
               ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Step {step} of 3</p>
              <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${isFeatured ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                 <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">
                   {SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.name} Tier
                 </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-6 pb-12">
        {!isRegistered ? renderRegistrationForm() : !isSubscribed ? renderSubscriptionPlans() : renderListingStep()}
      </div>

      {isSubscribed && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/95 backdrop-blur-xl border-t z-50">
          <button 
            onClick={() => step < 3 ? setStep(step + 1) : navigate('/profile')}
            className="w-full bg-gray-900 text-white py-5 rounded-[24px] font-black text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20"></div>
            <span>{step === 3 ? (isFeatured ? 'Pay & Publish' : 'Publish Listing') : 'Continue to Next Step'}</span>
            <Plus size={16} />
          </button>
          {step === 3 && (
            <div className="mt-4 flex items-center gap-2 justify-center opacity-40">
              <ShieldCheck size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment Processing</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Host;
