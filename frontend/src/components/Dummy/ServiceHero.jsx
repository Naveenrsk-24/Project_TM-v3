// components/ServiceHero.js
"use client";

export default function ServiceHero({ title, subtitle, icon, location }) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-3xl px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-gray-600 mb-8">{subtitle}</p>
        )}
        {location && (
          <p className="text-md text-gray-500 italic mb-8">
            Serving clients in {location}
          </p>
        )}
        <a
          href="#contact"
          className="inline-block px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all"
        >
          Book Your Shoot
        </a>
      </div>
    </section>
  );
}
