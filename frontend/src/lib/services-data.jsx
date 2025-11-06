// lib/services-data.js
// Central data source for all photography services

export const SERVICES = {
  weddings: {
    id: 'weddings',
    title: 'Wedding Photography',
    bgImage: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    ctaLabel: "Book Your Shoot",
    ctaLink:"/contactus",
    slug: 'weddings',
    description: 'Capture your special day with stunning wedding photography that tells your unique love story.',
    icon: '💍',
    basePrice: '₹50,000',
    features: ['Full Day Coverage', 'Pre-wedding Shoot', 'Edited Photos', 'Online Gallery'],
    niches: [
      { slug: 'muslim', title: 'Muslim Weddings', description: 'Traditional nikah ceremonies' },
      { slug: 'hindu', title: 'Hindu Weddings', description: 'Sacred rituals and ceremonies' },
      { slug: 'christian', title: 'Christian Weddings', description: 'Church and garden weddings' },
      { slug: 'destination', title: 'Destination Weddings', description: 'Exotic location weddings' },
      { slug: 'intimate', title: 'Intimate Weddings', description: 'Small, close-knit celebrations' },
      { slug: 'luxury', title: 'Luxury Weddings', description: 'Grand palace and hotel weddings' }
    ],
    popular: true
  },
  
  'baby-shoots': {
    id: 'baby-shoots',
    title: 'Baby Photography',
    bgImage: "/Weddings/groom-putting-ring-bride-s-finger.jpg",
    ctaLabel: "Book Your Shoot",
    ctaLink:"/contactus",
    slug: 'baby-shoots',
    description: 'Precious moments with your newborn and growing baby captured beautifully.',
    icon: '👶',
    basePrice: '₹8,000',
    features: ['Studio Setup', 'Props Included', '50+ Edited Photos', 'Same Day Turnaround'],
    niches: [
      { slug: 'newborn', title: 'Newborn Photography', description: '0-14 days old babies' },
      { slug: 'milestone', title: 'Milestone Shoots', description: '3, 6, 9 month sessions' },
      { slug: 'cake-smash', title: 'Cake Smash', description: 'First birthday celebrations' },
      { slug: 'siblings', title: 'Sibling Shoots', description: 'Brother-sister bonding' }
    ],
    popular: true
  },

  'corporate-headshots': {
    id: 'corporate-headshots',
    title: 'Corporate Headshots',
    slug: 'corporate-headshots',
    description: 'Professional headshots for LinkedIn, company websites, and business profiles.',
    icon: '👔',
    basePrice: '₹3,000',
    features: ['Studio Lighting', 'Multiple Outfits', '10 Edited Photos', 'LinkedIn Optimized'],
    niches: [
      { slug: 'linkedin', title: 'LinkedIn Headshots', description: 'Professional profile photos' },
      { slug: 'executive', title: 'Executive Portraits', description: 'C-suite photography' },
      { slug: 'team', title: 'Team Photography', description: 'Company-wide sessions' },
      { slug: 'personal-branding', title: 'Personal Branding', description: 'Entrepreneur shoots' }
    ],
    popular: false
  },

  'maternity-shoots': {
    id: 'maternity-shoots',
    title: 'Maternity Photography',
    slug: 'maternity-shoots',
    description: 'Celebrate the journey to motherhood with elegant maternity portraits.',
    icon: '🤰',
    basePrice: '₹12,000',
    features: ['Outdoor & Studio', 'Maternity Gowns', '40+ Photos', 'Partner Included'],
    niches: [
      { slug: 'outdoor', title: 'Outdoor Maternity', description: 'Beach and garden shoots' },
      { slug: 'studio', title: 'Studio Maternity', description: 'Classic indoor portraits' },
      { slug: 'couple', title: 'Couple Maternity', description: 'With your partner' },
      { slug: 'creative', title: 'Creative Maternity', description: 'Artistic concepts' }
    ],
    popular: false
  },

  'pre-wedding': {
    id: 'pre-wedding',
    title: 'Pre-Wedding Photography',
    slug: 'pre-wedding',
    description: 'Romantic couple shoots before your big day at stunning locations.',
    icon: '💑',
    basePrice: '₹25,000',
    features: ['Location Scouting', 'Outfit Changes', '100+ Photos', 'Cinematic Video'],
    niches: [
      { slug: 'beach', title: 'Beach Pre-Wedding', description: 'Coastal romantic shoots' },
      { slug: 'heritage', title: 'Heritage Locations', description: 'Palaces and forts' },
      { slug: 'urban', title: 'Urban Pre-Wedding', description: 'City streets and cafes' },
      { slug: 'nature', title: 'Nature Pre-Wedding', description: 'Mountains and forests' }
    ],
    popular: true
  },

  'birthday-photography': {
    id: 'birthday-photography',
    title: 'Birthday Photography',
    slug: 'birthday-photography',
    description: 'Capture the joy and excitement of birthday celebrations.',
    icon: '🎂',
    basePrice: '₹10,000',
    features: ['Event Coverage', 'Candid Shots', '200+ Photos', 'Highlights Video'],
    niches: [
      { slug: 'kids', title: 'Kids Birthday', description: 'Children party photography' },
      { slug: 'first-birthday', title: 'First Birthday', description: 'Special milestone' },
      { slug: 'milestone', title: 'Milestone Birthdays', description: '18th, 21st, 50th celebrations' },
      { slug: 'themed', title: 'Themed Parties', description: 'Costume and themed events' }
    ],
    popular: false
  },

  'engagement-shoots': {
    id: 'engagement-shoots',
    title: 'Engagement Photography',
    slug: 'engagement-shoots',
    description: 'Document the beginning of your forever with engagement ceremony photography.',
    icon: '💍',
    basePrice: '₹18,000',
    features: ['Full Ceremony', 'Candid & Posed', '150+ Photos', 'Family Portraits'],
    niches: [
      { slug: 'traditional', title: 'Traditional Engagement', description: 'Cultural ceremonies' },
      { slug: 'modern', title: 'Modern Engagement', description: 'Contemporary celebrations' },
      { slug: 'proposal', title: 'Proposal Photography', description: 'The moment he asks' },
      { slug: 'ring-ceremony', title: 'Ring Ceremony', description: 'Exchange documentation' }
    ],
    popular: false
  },

  'fashion-photography': {
    id: 'fashion-photography',
    title: 'Fashion Photography',
    slug: 'fashion-photography',
    description: 'Editorial, lookbook, and runway photography for fashion brands and models.',
    icon: '👗',
    basePrice: '₹15,000',
    features: ['Professional Lighting', 'Styling Support', 'Retouching', 'Commercial Rights'],
    niches: [
      { slug: 'editorial', title: 'Editorial Fashion', description: 'Magazine-style shoots' },
      { slug: 'lookbook', title: 'Lookbook Photography', description: 'Brand collections' },
      { slug: 'ecommerce', title: 'E-commerce Fashion', description: 'Product on model' },
      { slug: 'street-style', title: 'Street Style', description: 'Urban fashion photography' }
    ],
    popular: false
  },

  'product-photography': {
    id: 'product-photography',
    title: 'Product Photography',
    slug: 'product-photography',
    description: 'Professional product images for e-commerce, catalogs, and marketing.',
    icon: '📦',
    basePrice: '₹5,000',
    features: ['White Background', 'Lifestyle Shots', 'Fast Turnaround', 'Multiple Angles'],
    niches: [
      { slug: 'ecommerce', title: 'E-commerce Products', description: 'Online store images' },
      { slug: 'jewelry', title: 'Jewelry Photography', description: 'Precious items' },
      { slug: 'food', title: 'Food Photography', description: 'Restaurant menus' },
      { slug: 'lifestyle', title: 'Lifestyle Products', description: 'Products in use' }
    ],
    popular: false
  },

  'event-photography': {
    id: 'event-photography',
    title: 'Event Photography',
    slug: 'event-photography',
    description: 'Professional coverage of corporate events, conferences, and parties.',
    icon: '🎉',
    basePrice: '₹12,000',
    features: ['Full Event Coverage', 'Candid Shots', 'Same Day Edits', 'Online Gallery'],
    niches: [
      { slug: 'corporate', title: 'Corporate Events', description: 'Business conferences' },
      { slug: 'conference', title: 'Conference Photography', description: 'Seminars and talks' },
      { slug: 'award', title: 'Award Ceremonies', description: 'Recognition events' },
      { slug: 'party', title: 'Party Photography', description: 'Social gatherings' }
    ],
    popular: false
  },

  'portfolio-shoots': {
    id: 'portfolio-shoots',
    title: 'Portfolio Photography',
    slug: 'portfolio-shoots',
    description: 'Build your modeling or acting portfolio with professional photos.',
    icon: '📸',
    basePrice: '₹8,000',
    features: ['Multiple Looks', 'Indoor & Outdoor', '50+ Shots', 'Print Ready'],
    niches: [
      { slug: 'modeling', title: 'Modeling Portfolio', description: 'Fashion model cards' },
      { slug: 'actor', title: 'Actor Headshots', description: 'Casting submissions' },
      { slug: 'dancer', title: 'Dancer Portfolio', description: 'Movement photography' },
      { slug: 'musician', title: 'Musician Portfolio', description: 'Artist promotional shots' }
    ],
    popular: false
  },

  'family-photography': {
    id: 'family-photography',
    title: 'Family Photography',
    slug: 'family-photography',
    description: 'Timeless family portraits and reunion photography.',
    icon: '👨‍👩‍👧‍👦',
    basePrice: '₹10,000',
    features: ['Outdoor Locations', 'All Family Members', '60+ Photos', 'Print Packages'],
    niches: [
      { slug: 'outdoor', title: 'Outdoor Family', description: 'Park and beach sessions' },
      { slug: 'studio', title: 'Studio Family', description: 'Classic indoor portraits' },
      { slug: 'reunion', title: 'Family Reunion', description: 'Extended family gatherings' },
      { slug: 'generational', title: 'Generational Photos', description: 'Multiple generations' }
    ],
    popular: false
  }
};

// Location data - Tamil Nadu focused
export const LOCATIONS = {
  // Tier 1 - Major Cities
  chennai: {
    slug: 'chennai',
    name: 'Chennai',
    type: 'city',
    tier: 1,
    description: 'Professional photography services across Chennai',
    localities: [
      { slug: 'ecr', name: 'ECR (East Coast Road)', description: 'Beach-side photography locations' },
      { slug: 'omr', name: 'OMR (Old Mahabalipuram Road)', description: 'IT corridor photography' },
      { slug: 't-nagar', name: 'T. Nagar', description: 'Central Chennai photography' },
      { slug: 'adyar', name: 'Adyar', description: 'Premium photography services' },
      { slug: 'velachery', name: 'Velachery', description: 'South Chennai photography' },
      { slug: 'anna-nagar', name: 'Anna Nagar', description: 'West Chennai photography' }
    ]
  },
  
  coimbatore: {
    slug: 'coimbatore',
    name: 'Coimbatore',
    type: 'city',
    tier: 1,
    description: 'Wedding and event photography in Coimbatore',
    localities: []
  },

  madurai: {
    slug: 'madurai',
    name: 'Madurai',
    type: 'city',
    tier: 1,
    description: 'Traditional photography services in Madurai',
    localities: []
  },

  // Tier 2 - Tourist/Wedding Destinations
  mahabalipuram: {
    slug: 'mahabalipuram',
    name: 'Mahabalipuram',
    type: 'destination',
    tier: 2,
    description: 'Heritage site photography in Mahabalipuram'
  },

  ooty: {
    slug: 'ooty',
    name: 'Ooty',
    type: 'destination',
    tier: 2,
    description: 'Hill station photography in Ooty'
  },

  kodaikanal: {
    slug: 'kodaikanal',
    name: 'Kodaikanal',
    type: 'destination',
    tier: 2,
    description: 'Mountain photography in Kodaikanal'
  }
};

// Helper function to get service by slug
export function getServiceBySlug(slug) {
  return SERVICES[slug] || null;
}

// Helper function to get location by slug
export function getLocationBySlug(slug) {
  return LOCATIONS[slug] || null;
}

// Helper function to get all services as array
export function getAllServices() {
  return Object.values(SERVICES);
}

// Helper function to get popular services
export function getPopularServices() {
  return Object.values(SERVICES).filter(service => service.popular);
}