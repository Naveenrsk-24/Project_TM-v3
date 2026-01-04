"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../public/Logo/TMlogo.png";
import Mobilenavbar from "../Navbar/Mobilenavbar";

// Import your uploaded icons
import InstagramIcon from "../../../public/Icons/instagram.png";
import YoutubeIcon from "../../../public/Icons/youtube.png";

const NavBarMain = () => {
  const [mobileNavbarVisible, setMobileNavbarVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleNavbar = () => setMobileNavbarVisible(!mobileNavbarVisible);

  return (
    <div>
      {!mobileNavbarVisible ? (
        <header className="relative z-30 bg-opacity-70 transition-all duration-300">
          <div className="w-full bg-white px-4">
            <nav className="flex justify-between items-center py-2">

              {/* Logo */}
              <Link href="/" aria-label="Navigate to homepage" className="ml-2.5">
                <Image src={LogoImage} alt="Studio Logo" width={110} height={80} />
              </Link>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  aria-label="Open mobile menu"
                  className="navbar-burger flex items-center py-3 px-4 bg-black text-white rounded-3xl"
                  onClick={toggleNavbar}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </div>

              {/* Desktop Menu */}
              <ul className="hidden lg:flex lg:items-center lg:space-x-12">
                {[
                  { name: "Weddings", href: "/weddings" },
                  { name: "Baby Shoots", href: "/baby-shoots" },
                  { name: "Maternity Shoots", href: "/maternity-shoots" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "About Us", href: "/aboutus" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] 
                      after:w-full after:origin-bottom-right after:scale-x-0 after:bg-pink-600 
                      after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons + Contact Button */}
              <div className="hidden lg:flex items-center space-x-5">

                {/* Instagram */}
                <Link
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:opacity-80 transition duration-200"
                >
                  <Image 
                    src={InstagramIcon} 
                    alt="Instagram Icon" 
                    width={26} 
                    height={26} 
                    className="rounded-md"
                  />
                </Link>

                {/* YouTube */}
                <Link
                  href="https://www.youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:opacity-80 transition duration-200"
                >
                  <Image 
                    src={YoutubeIcon} 
                    alt="YouTube Icon" 
                    width={30} 
                    height={30}
                  />
                </Link>

                {/* Contact Us Button */}
                <Link href="/booking" aria-label="Book a wedding photography session">
                  <button
                    className={`relative px-4 py-3 bg-gradient-to-r cursor-pointer from-pink-600 to-rose-500 
                    inline-block text-white hover:text-black border-2 rounded-full font-semibold text-sm 
                    overflow-hidden transition-transform duration-200 ease-in-out transform ${
                      isHovered ? "scale-105 border-transparent text-black" : "border-transparent"
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ zIndex: 0 }}
                  >
                    <span
                      className={`absolute inset-0 bg-white rounded-full transition-transform duration-200 ease-out ${
                        isHovered ? "translate-y-0" : "translate-y-full"
                      }`}
                      style={{ transformOrigin: "bottom", zIndex: -1 }}
                    ></span>
                    Contact Us
                  </button>
                </Link>
              </div>

            </nav>
          </div>
        </header>
      ) : (
        <Mobilenavbar
          setMobileNavbarVisible={setMobileNavbarVisible}
          toggleNavbar={toggleNavbar}
        />
      )}
    </div>
  );
};

export default NavBarMain;
