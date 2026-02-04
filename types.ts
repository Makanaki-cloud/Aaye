
export type PropertyType = 'land' | 'apartment' | 'duplex' | 'terrace' | 'commercial';
export type RentType = 'annual' | 'bi-annual' | 'short-let' | 'sale';
export type VerificationLevel = 'none' | 'verified' | 'premium' | 'developer';
export type TitleType = 'C of O' | 'R of O' | 'Gazette' | 'Deed' | 'Allocation' | 'None';

export interface VerificationStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  metrics: {
    cleanliness: number;
    communication: number;
    location: number;
  };
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  location: string;
  city: string; // New field for Nigerian cities
  landmark: string;
  estate?: string;
  images: string[];
  video?: string; // New field for video capability
  agent: {
    name: string;
    verified: boolean;
    phone: string;
    rating: number;
    totalReviews?: number;
    avatar?: string;
  };
  details: {
    beds?: number;
    baths?: number;
    size?: string;
    powerSupport?: '24/7' | 'Shared' | 'Inverter' | 'None';
    amenities?: string[];
  };
  rentType: RentType;
  titleType: TitleType;
  isNegotiable: boolean;
  isFeatured?: boolean;
  tags: string[];
  trustScore: number; 
  verificationSteps: VerificationStep[];
  reviews?: Review[]; // Guest evaluation system
}

export interface Inspection {
  id: string;
  date: string;
  property: Property;
  status: 'Confirmed' | 'Pending Payment' | 'Completed' | 'Cancelled';
  fee: string;
  paid: boolean;
}

export interface AppState {
  currency: 'NGN' | 'USD';
  exchangeRate: number;
  lowDataMode: boolean;
  savedListings: string[];
  userRole: 'guest' | 'agent';
}
