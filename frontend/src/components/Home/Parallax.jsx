"use client";
import React from "react";
import Link from "next/link";

const servicesData = [
  {
    id: 1,
    title: "Wedding Photography",
    description: [
      "Capturing timeless wedding moments with elegance",
      "Pre-wedding & engagement photo sessions",
      "Storytelling through candid and cinematic styles",
      "Professional editing for a magazine-quality finish",
      "Personalized wedding albums and films",
    ],
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
    buttonText: "View More",
    href: "/services/wedding-photography",
  },
  {
    id: 2,
    title: "Portrait Photography",
    description: [
      "Studio and outdoor portrait sessions",
      "Professional lighting and retouching",
      "Creative concepts for individuals and families",
      "Model, actor & influencer portfolio shoots",
    ],
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
    buttonText: "View More",
    href: "/services/portrait-photography",
  },
  {
    id: 3,
    title: "Product & Brand Photography",
    description: [
      "High-quality visuals for eCommerce and branding",
      "Creative flat-lays and lifestyle product shots",
      "Lighting setups for reflective and detailed products",
      "Perfect for online stores, restaurants, and agencies",
    ],
    image:
      "https://images.unsplash.com/photo-1602524812239-1f84a3c74c49?auto=format&fit=crop&w=1600&q=80",
    buttonText: "View More",
    href: "/services/product-photography",
  },
  {
    id: 4,
    title: "Event & Corporate Photography",
    description: [
      "Professional coverage for conferences & events",
      "Corporate portraits and team photos",
      "Candid shots capturing real moments",
      "On-site editing and quick delivery options",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    buttonText: "View More",
    href: "/services/event-photography",
  },
];

const Parallax = () => {
  return (
    <div>
      {servicesData.map((service) => (
        <div
          key={service.id}
          id={service.id}
          className="slide relative flex flex-col sm:flex-row min-h-screen p-4 sm:p-8 md:p-16 bg-cover"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <div className="title h-full sm:w-full md:w-1/2 bg-black/70 backdrop-blur-sm shadow-lg p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8 text-yellow-400 font-bold">
              {service.title}
            </h1>
            <ul className="text-lg sm:text-xl md:text-2xl text-white space-y-2">
              {service.description.map((desc, index) => (
                <li key={index}>• {desc}</li>
              ))}
            </ul>
            {service.buttonText && (
              <Link href={service.href} passHref>
                <button className="md:text-lg mt-6 shadow-md text-sm text-black bg-yellow-400 px-5 py-2 hover:bg-yellow-500 transition-all duration-300 rounded-md">
                  {service.buttonText}
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Parallax;
