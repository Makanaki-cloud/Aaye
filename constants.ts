
import { Property, VerificationStep } from './types';

const defaultSteps: VerificationStep[] = [
  { label: 'Physical Check', status: 'completed', date: '2 days ago' },
  { label: 'Document Review', status: 'completed', date: 'Yesterday' },
  { label: 'AGIS Registry Search', status: 'current' },
  { label: 'Verified', status: 'pending' }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '4',
    title: 'Luxury Ikoyi Waterfront Penthouse',
    type: 'apartment',
    price: 150000,
    location: 'Banana Island, Lagos',
    city: 'Lagos',
    landmark: 'Near Civic Center',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
    agent: { 
      name: 'Bolanle Shortlets', 
      verified: true, 
      phone: '+2349000000004', 
      rating: 4.9, 
      totalReviews: 124,
      avatar: 'https://i.pravatar.cc/150?u=bolanle'
    },
    details: { 
      beds: 3, 
      baths: 3, 
      powerSupport: '24/7',
      amenities: ['Pool', 'Gym', 'Chef Services', 'Wifi']
    },
    rentType: 'short-let',
    titleType: 'None',
    isNegotiable: false,
    isFeatured: true,
    tags: ['Waterfront', 'Premium', 'Self-Checkin'],
    trustScore: 98,
    verificationSteps: [
      { label: 'Physical Check', status: 'completed', date: '1 week ago' },
      { label: 'Verified', status: 'completed', date: '5 days ago' }
    ],
    reviews: [
      {
        id: 'r1',
        user: 'Tunde W.',
        rating: 5,
        comment: 'Amazing place! The view of the lagoon is breathtaking. Bolanle was super responsive.',
        date: '2 days ago',
        metrics: { cleanliness: 5, communication: 5, location: 5 }
      }
    ]
  },
  {
    id: '1',
    title: 'Modern 4 Bedroom Duplex',
    type: 'duplex',
    price: 85000000,
    location: 'Guzape, Abuja',
    city: 'Abuja',
    landmark: 'Behind Shoprite Wuse',
    estate: 'Guzape Hills',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'],
    agent: { name: 'Alhaji Yusuf Props', verified: true, phone: '+2348000000001', rating: 4.8 },
    details: { beds: 4, baths: 5, size: '450sqm', powerSupport: '24/7' },
    rentType: 'sale',
    titleType: 'C of O',
    isNegotiable: true,
    isFeatured: true,
    tags: ['Brand New', 'Swimming Pool', 'Solar Ready'],
    trustScore: 94,
    verificationSteps: defaultSteps
  }
];

export const NIGERIAN_CITIES = [
  'Abuja', 'Lagos', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Benin City', 'Warri', 'Uyo', 'Calabar'
];

export const DOCUMENT_GUIDES = [
  {
    title: 'Certificate of Occupancy (C of O)',
    desc: 'The gold standard. Issued by the state government.',
    risk: 'Low',
    validity: '99 Years'
  },
  {
    title: 'Right of Occupancy (R of O)',
    desc: 'A formal recognition of land right, often precursor to C of O.',
    risk: 'Medium',
    validity: 'Indeterminate'
  }
];
