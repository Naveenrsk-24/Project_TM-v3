"use client";
import React from "react";
import Link from "next/link";

const servicesData = [
  { id: 1, image: "/hero_lossless.webp" },
  { id: 2, image: "/Home/Parallax2.avif" },
  { id: 3, image: "/Home/Parallax3.avif" },
  { id: 4, image: "/Home/Parallax1.avif" },
];
const Parallax = () => {
  return (
    <div>
      {servicesData.map((service) => (
        <div
          key={service.id}
          id={service.id}
          className="relative flex flex-col sm:flex-row min-h-screen p-4 sm:p-8 md:p-16 bg-cover"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
        </div>
      ))}
    </div>
  );
};

export default Parallax;
