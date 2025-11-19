
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

  'maternity-shoots': {
    id: 'maternity-shoots',
    title: 'Maternity Photography',
    bgImage: "/Weddings/groom-putting-ring-bride-s-finger.jpg",
    ctaLabel: "Book Your Shoot",
    ctaLink:"/contactus",
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
      { slug: 'ecr', name: 'ECR', description: 'Beach-side photography locations' },
      { slug: 'omr', name: 'OMR', description: 'IT corridor photography' },
      { slug: 't-nagar', name: 'T. Nagar', description: 'Central Chennai photography' },
      { slug: 'adyar', name: 'Adyar', description: 'Premium photography services' },
      { slug: 'velachery', name: 'Velachery', description: 'South Chennai photography' },
      { slug: 'anna-nagar', name: 'Anna Nagar', description: 'West Chennai photography' }
    ]
  },
  
  // Tier 2 - Tourist/Wedding Destinations
  mahabalipuram: {
    slug: 'mahabalipuram',
    name: 'Mahabalipuram',
    type: 'destination',
    tier: 2,
    description: 'Heritage site photography in Mahabalipuram'
  },

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