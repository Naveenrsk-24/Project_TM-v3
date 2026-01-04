"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../public/Logo/TMlogo.png";
import Mobilenavbar from "../Navbar/Mobilenavbar";

import InstagramIcon from "../../../public/Icons/instagram.png";
import YoutubeIcon from "../../../public/Icons/youtube.png";

const NavBarMain = () => {
  const [mobileNavbarVisible, setMobileNavbarVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const ticking = useRef(false);

  // ✨ Memoized menu items to avoid re-creation on every render
  const menuItems = useMemo(
    () => [
      { name: "Weddings", href: "/weddings" },
      { name: "Baby Shoots", href: "/baby-shoots" },
      { name: "Maternity Shoots", href: "/maternity-shoots" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "About Us", href: "/aboutus" },
    ],
    []
  );

  // ⚡ Ultra-efficient scroll listener using requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 20;

          setShowNavbar((prev) => {
            if (prev !== shouldShow) return shouldShow;
            return prev;
          });

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleNavbar = () => setMobileNavbarVisible((prev) => !prev);

  return (
    <div>
      {!mobileNavbarVisible ? (
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${
            showNavbar
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }
        `}
        >
          <div className="w-full bg-white px-4 shadow-sm bg-opacity-95 backdrop-blur-md">
            <nav className="flex justify-between items-center py-2">
              {/* Logo */}
              <Link
                href="/"
                aria-label="Navigate to homepage"
                className="ml-2.5"
              >
                <Image
                  src={LogoImage}
                  alt="Studio Logo"
                  width={110}
                  height={80}
                  priority
                />
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
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full
                               after:origin-bottom-right after:scale-x-0 after:bg-pink-600 after:transition-transform
                               after:duration-300 hover:after:scale-x-100"
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
                  href="https://www.instagram.com/tmstudios.photography"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <Image
                    src={InstagramIcon}
                    alt="Instagram Icon"
                    width={26}
                    height={26}
                    className="rounded-md hover:opacity-80 transition"
                  />
                </Link>

                {/* YouTube */}
                <Link
                  href="https://www.youtube.com/@tmstudiosphotography"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <Image
                    src={YoutubeIcon}
                    alt="YouTube Icon"
                    width={30}
                    height={30}
                    className="hover:opacity-80 transition"
                  />
                </Link>

                {/* Contact Us Button */}
                <Link
                  href="/booking"
                  aria-label="Book a wedding photography session"
                >
                  <button
                    className={`relative px-4 py-3 bg-gradient-to-r cursor-pointer from-pink-600 to-rose-500 
    inline-block text-white hover:text-black border-2 rounded-full font-semibold text-sm 
    overflow-hidden transition-transform duration-200 ease-in-out transform ${
      isHovered
        ? "scale-105 border-transparent text-black"
        : "border-transparent"
    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span
                      className={`absolute inset-0 bg-white rounded-full transition-transform duration-200 ease-out transform ${
                        isHovered ? "translate-y-0" : "translate-y-full"
                      }`}
                      style={{ transformOrigin: "bottom", zIndex: -1 }}
                    ></span>
                    <span className="relative z-10">Contact Us</span>
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </header>
      ) : (
        <Mobilenavbar toggleNavbar={toggleNavbar} />
      )}
    </div>
  );
};

export default NavBarMain;
