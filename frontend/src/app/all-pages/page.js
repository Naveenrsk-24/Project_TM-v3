import React from 'react';
import { Camera, MapPin, Heart, Baby, Flower2 } from 'lucide-react';

// Replace with your actual imports
import { SERVICES, LOCATIONS } from "@/lib/services-data";

// const SERVICES = {
//   weddings: {
//     id: 'weddings',
//     title: 'Wedding Photography',
//     slug: 'weddings',
//     description: 'Capture your special day with stunning wedding photography that tells your unique love story.',
//     icon: '💍',
//     niches: [
//       { slug: 'muslim', title: 'Muslim Weddings', description: 'Traditional nikah ceremonies' },
//       { slug: 'hindu', title: 'Hindu Weddings', description: 'Sacred rituals and ceremonies' },
//       { slug: 'christian', title: 'Christian Weddings', description: 'Church and garden weddings' },
//       { slug: 'destination', title: 'Destination Weddings', description: 'Exotic location weddings' },
//       { slug: 'intimate', title: 'Intimate Weddings', description: 'Small, close-knit celebrations' },
//       { slug: 'luxury', title: 'Luxury Weddings', description: 'Grand palace and hotel weddings' }
//     ]
//   },
//   'baby-shoots': {
//     id: 'baby-shoots',
//     title: 'Baby Photography',
//     slug: 'baby-shoots',
//     description: 'Precious moments with your newborn and growing baby captured beautifully.',
//     icon: '👶',
//     niches: [
//       { slug: 'newborn', title: 'Newborn Photography', description: '0-14 days old babies' },
//       { slug: 'milestone', title: 'Milestone Shoots', description: '3, 6, 9 month sessions' },
//       { slug: 'cake-smash', title: 'Cake Smash', description: 'First birthday celebrations' },
//       { slug: 'siblings', title: 'Sibling Shoots', description: 'Brother-sister bonding' }
//     ]
//   },
//   'maternity-shoots': {
//     id: 'maternity-shoots',
//     title: 'Maternity Photography',
//     slug: 'maternity-shoots',
//     description: 'Celebrate the journey to motherhood with elegant maternity portraits.',
//     icon: '🤰',
//     niches: [
//       { slug: 'outdoor', title: 'Outdoor Maternity', description: 'Beach and garden shoots' },
//       { slug: 'studio', title: 'Studio Maternity', description: 'Classic indoor portraits' },
//       { slug: 'couple', title: 'Couple Maternity', description: 'With your partner' },
//       { slug: 'creative', title: 'Creative Maternity', description: 'Artistic concepts' }
//     ]
//   }
// };

// const LOCATIONS = {
//   chennai: {
//     slug: 'chennai',
//     name: 'Chennai',
//     tier: 1,
//     description: 'Professional photography services across Chennai'
//   },
//   coimbatore: {
//     slug: 'coimbatore',
//     name: 'Coimbatore',
//     tier: 1,
//     description: 'Wedding and event photography in Coimbatore'
//   },
//   madurai: {
//     slug: 'madurai',
//     name: 'Madurai',
//     tier: 1,
//     description: 'Traditional photography services in Madurai'
//   },
//   mahabalipuram: {
//     slug: 'mahabalipuram',
//     name: 'Mahabalipuram',
//     tier: 2,
//     description: 'Heritage site photography in Mahabalipuram'
//   },
//   ooty: {
//     slug: 'ooty',
//     name: 'Ooty',
//     tier: 2,
//     description: 'Hill station photography in Ooty'
//   },
//   kodaikanal: {
//     slug: 'kodaikanal',
//     name: 'Kodaikanal',
//     tier: 2,
//     description: 'Mountain photography in Kodaikanal'
//   }
// };

export default function AllPagesSitemap() {
  const services = Object.values(SERVICES);
  const locations = Object.values(LOCATIONS);

  const getServiceIcon = (slug) => {
    const icons = {
      'weddings': Heart,
      'baby-shoots': Baby,
      'maternity-shoots': Flower2
    };
    return icons[slug] || Camera;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50">
    
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        {services.map((service, index) => {
          const IconComponent = getServiceIcon(service.slug);
          
          return (
            <article key={service.id} className="mb-20">
              {/* Service Card */}
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                {/* Service Header */}
                <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-10 text-white">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
                        <IconComponent className="w-10 h-10" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-5xl">{service.icon}</span>
                        <h2 className="text-4xl font-serif font-bold">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-rose-50 text-lg mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <a
                        href={`/${service.slug}`}
                        className="inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-2 rounded-full font-semibold hover:bg-rose-50 transition-colors"
                      >
                        View Service Page
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  {/* Cities Section */}
                  <section className="mb-12">
                    <div className="mb-8 pb-4 border-b-2 border-rose-200">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-rose-500" />
                        Available in These Cities
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {locations.map((loc) => (
                        <a
                          key={loc.slug}
                          href={`/${service.slug}/${loc.slug}`}
                          className="group block bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg p-5 border-2 border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-serif font-bold text-lg text-gray-800 group-hover:text-rose-600 transition-colors">
                              {loc.name}
                            </h4>
                            <span className="text-rose-400 group-hover:translate-x-1 transition-transform text-xl">
                              →
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {loc.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </section>

                  {/* Niches Section */}
                  <section>
                    <div className="mb-8 pb-4 border-b-2 border-orange-200">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 flex items-center gap-3">
                        <Camera className="w-6 h-6 text-orange-500" />
                        Specialized Services by Location
                      </h3>
                    </div>

                    <div className="space-y-8">
                      {service.niches.map((niche) => (
                        <div
                          key={niche.slug}
                          className="border-l-4 border-orange-400 pl-6"
                        >
                          <div className="mb-5">
                            <h4 className="text-xl font-serif font-bold text-gray-800 mb-2">
                              {niche.title}
                            </h4>
                            <p className="text-gray-600 italic">
                              {niche.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {locations.map((loc) => (
                              <a
                                key={loc.slug}
                                href={`/${service.slug}/${niche.slug}/${loc.slug}`}
                                className="group flex items-center gap-2 bg-white rounded-md px-4 py-3 border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all shadow-sm hover:shadow-md"
                              >
                                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                <span className="text-sm text-gray-700 group-hover:text-orange-600 font-medium transition-colors flex-1">
                                  {loc.name}
                                </span>
                                <span className="text-orange-300 group-hover:text-orange-500 text-xs">
                                  →
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* Classic Footer */}
      <footer className="bg-gray-800 text-white py-12 border-t-4 border-rose-400">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <Camera className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg font-light italic">
            Complete directory of all our photography services across Tamil Nadu
          </p>
          <div className="mt-6 text-gray-400 text-sm">
            © {new Date().getFullYear()} - All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}