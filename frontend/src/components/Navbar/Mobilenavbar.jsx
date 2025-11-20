'use client';
import React, { useState } from 'react';
import LogoImage from '../../../public/Logo/TMlogo.png';
import Image from 'next/image';

const Mobilenavbar = ({ toggleNavbar }) => {
  const [sidenavbardropdown, setSidenavbardropdown] = useState(false);

  const sideNavdropdownshow = () => {
    setSidenavbardropdown(!sidenavbardropdown);
  };

  return (
    <div className="fixed top-0 w-11/12 h-full sm:w-6/12 bg-white z-50 overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col">
        <nav className="flex justify-between items-center py-6">
          <a href="/" className="text-3xl font-semibold">
            <Image src={LogoImage} width={150} height={150} alt="Logo" />
          </a>
          <button
            className="navbar-burger flex items-center py-3 px-4 bg-black text-white rounded-3xl focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Close menu</title>
              <path
                fillRule="evenodd"
                d="M10 8.586L3.707 2.293 2.293 3.707 8.586 10l-6.293 6.293 1.414 1.414L10 11.414l6.293 6.293 1.414-1.414L11.414 10l6.293-6.293-1.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
        <div className="flex-grow overflow-y-auto">
          <ul className="flex flex-col items-start gap-8">
            <NavItem href="/" label="Home" />
            <NavDropdown
              label="Services"
              isOpen={sidenavbardropdown}
              toggleDropdown={sideNavdropdownshow}
              dropdownItems={[
                { href: "/portfolio/tamil-weddings", label: "Wedding Photography", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/portfolio/portraits", label: "Portrait Sessions", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/portfolio/pre-weddings", label: "Event Photography", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/portfolio/telugu-weddings", label: "Product Photography", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/Section/FashionPhotography", label: "Fashion Photography", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/Section/RealEstate", label: "Real Estate Photography", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/Section/Drone", label: "Drone Photography & Videography", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/Section/PhotoEditing", label: "Photo Retouching & Editing", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
                { href: "/Section/CorporateHeadshots", label: "Corporate Headshots", Icon: "/Weddings/beautiful-husband-wife-posing-beach.jpg" },
              ]}
            />
            <NavItem href="/gallery" label="Gallery" />
            <NavItem href="/aboutus" label="About Us" />
            <NavItem href="/blogs" label="Blogs" />
            <NavItem href="/contactus" label="Contact us" />
            <NavItem href="/Careers" label="Careers" />
          </ul>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ href, label, Icon }) => (
  <li className="flex items-center">
    {Icon && (
      <Image src={Icon} alt={`${label} icon`} width={24} height={24} className="mr-2" />
    )}
    <a href={href} className="text-md font-semibold text-gray-700 hover:text-blue-700 transition ease-linear duration-300">
      {label}
    </a>
  </li>
);

const NavDropdown = ({ label, isOpen, toggleDropdown, dropdownItems }) => (
  <li className="relative">
    <button
      className="flex items-center justify-between text-md font-semibold text-gray-700 hover:text-blue-700 transition ease-linear duration-300 w-full"
      onClick={toggleDropdown}
    >
      {label}
      <svg className="ml-1 h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        {isOpen ? (
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
    {isOpen && (
      <div className="mt-2 rounded-md bg-gray-50 w-72">
        <ul className="flex flex-col gap-2">
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                {item.Icon && (
                  <Image src={item.Icon} alt={`${item.label} icon`} width={24} height={24} className="mr-2" />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </li>
);

export default Mobilenavbar;
