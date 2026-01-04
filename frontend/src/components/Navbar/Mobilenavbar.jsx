'use client';
import React, { useState } from 'react';
import LogoImage from '../../../public/Logo/TMlogo.png';
import Image from 'next/image';

// social icons
import InstagramIcon from "../../../public/Icons/instagram.png";
import YoutubeIcon from "../../../public/Icons/youtube.png";

const Mobilenavbar = ({ toggleNavbar }) => {
  const [sidenavbardropdown, setSidenavbardropdown] = useState(false);

  const sideNavdropdownshow = () => {
    setSidenavbardropdown(!sidenavbardropdown);
  };

  return (
    <div className="fixed top-0 w-12/12 h-full sm:w-6/12 bg-white z-50 overflow-hidden shadow-xl">
      <div className="container mx-auto px-4 h-full flex flex-col">
        
        {/* TOP NAV */}
        <nav className="flex justify-between items-center py-6">
          <a href="/" className="text-3xl font-semibold">
            <Image src={LogoImage} width={150} height={150} alt="Logo" />
          </a>

          <button
            className="navbar-burger flex items-center py-3 px-4 bg-black text-white rounded-3xl focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <title>Close menu</title>
              <path
                fillRule="evenodd"
                d="M10 8.586L3.707 2.293 2.293 3.707 8.586 10l-6.293 6.293 1.414 1.414L10 11.414l6.293 6.293 1.414-1.414L11.414 10l6.293-6.293-1.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>

        {/* MENU ITEMS */}
        <div className="flex-grow overflow-y-auto mb-10">
          <ul className="flex flex-col items-start gap-8">
            <NavItem href="/weddings" label="Weddings" />
            <NavItem href="/baby-shoots" label="Baby Shoots" />
            <NavItem href="/maternity-shoots" label="Maternity Shoots" />
            <NavItem href="/portfolio" label="Portfolio" />
            <NavItem href="/aboutus" label="About us" />
            <NavItem href="/contactus" label="Contact Us" />
          </ul>
        </div>

        {/* SOCIAL ICONS AT BOTTOM */}
        <div className="w-full flex justify-center items-center gap-10 pb-6 border-t pt-6">
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Image 
              src={InstagramIcon}
              alt="Instagram Icon"
              width={32}
              height={32}
              className="object-contain"
            />
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Image 
              src={YoutubeIcon}
              alt="YouTube Icon"
              width={36}
              height={36}
              className="object-contain"
            />
          </a>

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
    <a 
      href={href}
      className="text-md font-semibold text-gray-700 hover:text-blue-700 transition ease-linear duration-300"
    >
      {label}
    </a>
  </li>
);

export default Mobilenavbar;
