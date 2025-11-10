"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// Main Navbar Component
export const Navbar2 = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

// Desktop Navbar Component
const DesktopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const services = [
    'Weddings',
    'Baby Shoots',
    'Pre-Wedding',
    'Corporate',
    'Fashion',
    'Events'
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hideNav ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-light tracking-[0.3em] bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
              TM STUDIOS
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <a
              href="#home"
              className="group text-white/90 hover:text-white text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 relative"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-amber-200 to-rose-300 group-hover:w-full transition-all duration-500"></span>
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button className="group flex items-center space-x-1 text-white/90 hover:text-white text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 relative">
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-amber-200 to-rose-300 group-hover:w-full transition-all duration-500"></span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 transition-all duration-300 ${
                  showServices
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                  {services.map((service, idx) => (
                    <a
                      key={service}
                      href={`#${service.toLowerCase().replace(' ', '-')}`}
                      className="block px-6 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-amber-900/20 hover:to-rose-900/20 text-sm tracking-wider transition-all duration-300"
                      style={{
                        animation: showServices ? `fadeInDown 0.3s ease-out ${idx * 0.05}s both` : 'none'
                      }}
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#gallery"
              className="group text-white/90 hover:text-white text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 relative"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-amber-200 to-rose-300 group-hover:w-full transition-all duration-500"></span>
            </a>

            <a
              href="#testimonials"
              className="group text-white/90 hover:text-white text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 relative"
            >
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-amber-200 to-rose-300 group-hover:w-full transition-all duration-500"></span>
            </a>

            <a
              href="#contact"
              className="group text-white/90 hover:text-white text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 relative"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-amber-200 to-rose-300 group-hover:w-full transition-all duration-500"></span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className="relative px-8 py-3 text-sm tracking-[0.2em] uppercase font-light text-white overflow-hidden group rounded-full border border-white/20">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-amber-400/20"></span>
              <span className="relative z-10">Book a Shoot</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400"></span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

// Mobile Navbar Component
const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const services = [
    'Weddings',
    'Baby Shoots',
    'Pre-Wedding',
    'Corporate',
    'Fashion',
    'Events'
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <h1 className="text-xl font-light tracking-[0.3em] bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            TM STUDIOS
          </h1>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 w-full h-0.5 bg-gradient-to-r from-amber-200 to-rose-300 transition-all duration-300 ${
                  isOpen ? 'top-1/2 rotate-45' : 'top-1'
                }`}
              ></span>
              <span
                className={`absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-amber-200 to-rose-300 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`absolute left-0 w-full h-0.5 bg-gradient-to-r from-amber-200 to-rose-300 transition-all duration-300 ${
                  isOpen ? 'top-1/2 -rotate-45' : 'bottom-1'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl"></div>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 py-20">
          <div className="w-full max-w-md space-y-2">
            {/* Home */}
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="block py-4 text-2xl text-white/80 hover:text-white tracking-[0.2em] uppercase font-light transition-all duration-300 hover:translate-x-2"
              style={{
                animation: isOpen ? 'slideInLeft 0.5s ease-out 0.1s both' : 'none'
              }}
            >
              Home
            </a>

            {/* Services with Submenu */}
            <div
              style={{
                animation: isOpen ? 'slideInLeft 0.5s ease-out 0.2s both' : 'none'
              }}
            >
              <button
                onClick={() => setShowServices(!showServices)}
                className="w-full flex items-center justify-between py-4 text-2xl text-white/80 hover:text-white tracking-[0.2em] uppercase font-light transition-all duration-300"
              >
                <span>Services</span>
                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${showServices ? 'rotate-180' : ''}`} />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showServices ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-6 space-y-2">
                  {services.map((service, idx) => (
                    <a
                      key={service}
                      href={`#${service.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-lg text-white/60 hover:text-white tracking-wider transition-all duration-300"
                      style={{
                        animation: showServices ? `fadeIn 0.3s ease-out ${idx * 0.05}s both` : 'none'
                      }}
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <a
              href="#gallery"
              onClick={() => setIsOpen(false)}
              className="block py-4 text-2xl text-white/80 hover:text-white tracking-[0.2em] uppercase font-light transition-all duration-300 hover:translate-x-2"
              style={{
                animation: isOpen ? 'slideInLeft 0.5s ease-out 0.3s both' : 'none'
              }}
            >
              Gallery
            </a>

            {/* Testimonials */}
            <a
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className="block py-4 text-2xl text-white/80 hover:text-white tracking-[0.2em] uppercase font-light transition-all duration-300 hover:translate-x-2"
              style={{
                animation: isOpen ? 'slideInLeft 0.5s ease-out 0.4s both' : 'none'
              }}
            >
              Testimonials
            </a>

            {/* Contact */}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block py-4 text-2xl text-white/80 hover:text-white tracking-[0.2em] uppercase font-light transition-all duration-300 hover:translate-x-2"
              style={{
                animation: isOpen ? 'slideInLeft 0.5s ease-out 0.5s both' : 'none'
              }}
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <button
            className="mt-12 px-12 py-4 text-sm tracking-[0.3em] uppercase font-light text-white rounded-full border border-white/20 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-amber-400/20 hover:from-amber-400/40 hover:via-rose-400/40 hover:to-amber-400/40 transition-all duration-500 shadow-lg hover:shadow-amber-500/25"
            onClick={() => setIsOpen(false)}
            style={{
              animation: isOpen ? 'fadeInUp 0.5s ease-out 0.6s both' : 'none'
            }}
          >
            Book a Shoot
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

// Demo Page
// export default function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section id="home" className="min-h-screen flex items-center justify-center px-6">
//         <div className="text-center">
//           <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] text-white mb-6">
//             CAPTURING
//             <span className="block bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 bg-clip-text text-transparent">
//               TIMELESS MOMENTS
//             </span>
//           </h1>
//           <p className="text-white/60 text-lg tracking-wider max-w-2xl mx-auto">
//             Professional photography services that tell your unique story
//           </p>
//         </div>
//       </section>

//       {/* Demo Sections */}
//       <section id="gallery" className="min-h-screen flex items-center justify-center px-6">
//         <h2 className="text-4xl text-white tracking-[0.3em] uppercase font-light">Gallery</h2>
//       </section>

//       <section id="testimonials" className="min-h-screen flex items-center justify-center px-6">
//         <h2 className="text-4xl text-white tracking-[0.3em] uppercase font-light">Testimonials</h2>
//       </section>

//       <section id="contact" className="min-h-screen flex items-center justify-center px-6">
//         <h2 className="text-4xl text-white tracking-[0.3em] uppercase font-light">Contact</h2>
//       </section>
//     </div>
//   );
// }