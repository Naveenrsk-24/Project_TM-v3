import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/services-data";

export default function ServicesLocationsHub({ serviceId }) {
  const service = SERVICES[serviceId];
  const locations = LOCATIONS;

  if (!service) return null;

  const citiesWithLocalities = Object.values(locations).filter(
    (loc) => loc.localities && loc.localities.length > 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* --- TABS NAV (Client controlled) --- */}
      <div className="tabs flex gap-2 mb-6">
        <button data-tab="categories" className="tab-btn active">Categories</button>
        <button data-tab="locations" className="tab-btn">Cities</button>
        <button data-tab="localities" className="tab-btn">Localities</button>
      </div>

      {/* --- SSR ALL CONTENT (AHREFS CAN SEE THIS) --- */}
      <div id="categories" className="tab-content active">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {service.niches.map((niche) => (
            <Link
              key={niche.slug}
              href={`/${service.slug}/${niche.slug}`}
              className="block p-4 border rounded-xl"
            >
              <h3 className="font-bold">{niche.title}</h3>
              <p className="text-sm text-gray-600">{niche.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div id="locations" className="tab-content">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(locations).map((loc) => (
            <Link
              key={loc.slug}
              href={`/${service.slug}/${loc.slug}`}
              className="block p-4 border rounded-xl"
            >
              <h3 className="font-bold">{loc.name}</h3>
              <p className="text-sm text-gray-600">{loc.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div id="localities" className="tab-content">
        {citiesWithLocalities.map((city) => (
          <div key={city.slug} className="mb-6">
            <h3 className="font-bold text-lg mb-2">{city.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {city.localities.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${service.slug}/${city.slug}/${area.slug}`}
                  className="block p-3 border rounded-xl"
                >
                  <h4 className="font-semibold">{area.name}</h4>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
