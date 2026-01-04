"use client";
import React from "react";

// const servicesData = [
//   { id: 1, image: '/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-101.jpg' },
//   { id: 2, image: "/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-106.jpg" },
//   { id: 3, image: "/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-108.jpg" },
//   { id: 4, image: "/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-103.jpg" },
// ];

const servicesData = [
  { id: 1, image: '/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-101.jpg' },
  { id: 2, image: "/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-101.jpg" },
  { id: 3, image: "/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-101.jpg" },
  { id: 4, image: "/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-101.jpg" },
];

const Parallax = () => {
  return (
    <div>
      {servicesData.map((service) => (
        <div
          key={service.id}
          className="slide relative flex min-h-screen bg-cover"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>
  );
};

export default Parallax;
