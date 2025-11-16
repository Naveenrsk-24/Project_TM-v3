"use client";
import Link from "next/link";
import { useState } from "react";
import { SERVICES, LOCATIONS } from "@/lib/services-data";

export default function ServicesLocationsHub({ serviceId }) {
  const [activeTab, setActiveTab] = useState("categories");
  
  const service = SERVICES[serviceId];
  const locations = LOCATIONS;

  if (!service) return null;

  const citiesWithLocalities = Object.values(locations).filter(
    (loc) => loc.localities && loc.localities.length > 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Compact Tab Navigation */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "categories"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("locations")}
          className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "locations"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Cities
        </button>
        <button
          onClick={() => setActiveTab("localities")}
          className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === "localities"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Localities
        </button>
      </div>

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {service.niches.map((niche) => (
            <Link
              key={niche.slug}
              href={`/${service.slug}/${niche.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
                  {niche.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {niche.description}
                </p>
              </div>
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Locations Tab */}
      {activeTab === "locations" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(locations).map((loc) => (
            <Link
              key={loc.slug}
              href={`/${service.slug}/${loc.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-indigo-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">
                  {loc.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {loc.description}
                </p>
              </div>
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Localities Tab */}
      {activeTab === "localities" && (
        <div className="space-y-6">
          {citiesWithLocalities.map((city) => (
            <div key={city.slug} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                {city.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {city.localities.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/${service.slug}/${city.slug}/${area.slug}`}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-3 hover:shadow-md hover:scale-105 transition-all duration-200 border border-gray-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                        {area.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {area.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}