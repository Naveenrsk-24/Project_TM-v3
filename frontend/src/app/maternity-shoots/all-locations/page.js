import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/services-data";

export const metadata = {
  title: "All Maternity Shoot Locations | TM Studios",
  description: "Explore all maternity photography locations across major cities and localities.",
};

export default function MaternityAllLocations() {
  const service = SERVICES["maternity-shoots"];
  const locations = LOCATIONS;

  const citiesWithLocalities = Object.values(locations).filter(
    (loc) => loc.localities?.length > 0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
        All Maternity Shoot Locations
      </h1>

      {/* Main Cities */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4">Cities</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Object.values(locations).map((loc) => (
            <Link
              key={loc.slug}
              href={`/maternity-shoots/${loc.slug}`}
              className="block p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold">{loc.name}</h3>
              <p className="text-sm text-gray-600">{loc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Localities */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Localities</h2>

        <div className="space-y-12">
          {citiesWithLocalities.map((city) => (
            <div key={city.slug}>
              <h3 className="text-xl font-bold text-indigo-700 mb-3">{city.name}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {city.localities.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/maternity-shoots/${city.slug}/${area.slug}`}
                    className="block p-4 rounded-lg bg-white border shadow-sm hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold">{area.name}</h4>
                    <p className="text-sm text-gray-600">{area.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
