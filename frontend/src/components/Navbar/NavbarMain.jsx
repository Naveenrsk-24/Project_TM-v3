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
  const [showNavbar, setShowNavbar] = useState(true);

  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const menuItems = useMemo(
    () => [
      { name: "Weddings", href: "/weddings" },
      { name: "Baby Shoots", href: "/baby-shoots" },
      { name: "Maternity Shoots", href: "/maternity-shoots" },
      { name: "About Us", href: "/aboutus" },
    ],
    []
  );

  // Scroll direction detection
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const isScrollingDown = currentScroll > lastScrollY.current;

          // Hide on scroll down, show on scroll up
          setShowNavbar(!isScrollingDown);

          lastScrollY.current = currentScroll <= 0 ? 0 : currentScroll;
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
          className={`
            fixed top-0 left-0 w-full z-50
            transition-all duration-500 ease-[cubic-bezier(0.4,0.0,0.2,1)]
            ${showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
          `}
        >
          <div
            className="
              w-full px-4 py-2 bg-white/75 backdrop-blur-none shadow-sm
              transition-all duration-500
            "
          >
            <nav className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" aria-label="Navigate to homepage" className="ml-2.5">
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
                  onClick={toggleNavbar}
                  className="navbar-burger flex items-center py-3 px-4 
                  bg-black text-white rounded-3xl shadow-sm transition hover:opacity-80"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
                      className="
                        relative text-black 
                        after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full
                        after:origin-bottom-right after:scale-x-0
                        after:bg-pink-600 after:transition-transform after:duration-300
                        hover:after:scale-x-100
                      "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons + Contact */}
              <div className="hidden lg:flex items-center space-x-5">
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
                    className="rounded-md hover:opacity-70 transition"
                  />
                </Link>

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
                    className="hover:opacity-70 transition"
                  />
                </Link>

                {/* Contact Button */}
                <Link href="/contactus" aria-label="Book a photography session">
                  <button
                    className={`
                      relative px-5 py-3 bg-gradient-to-r from-pink-600 to-rose-500 
                      text-white rounded-full font-semibold text-sm overflow-hidden 
                      transition-transform duration-200 transform
                      ${isHovered ? "scale-105" : ""}
                    `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span
                      className={`
                        absolute inset-0 bg-white rounded-full 
                        transition-transform duration-300 ease-out 
                        ${isHovered ? "translate-y-0" : "translate-y-full"}
                      `}
                      style={{ zIndex: -1 }}
                    />
                    <span className="relative z-10 text-black group-hover:text-black">
                      Contact Us
                    </span>
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
