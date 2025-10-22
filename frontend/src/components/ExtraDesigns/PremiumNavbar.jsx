"use client"

import { useState, useEffect } from 'react';
import { Menu, X, Camera, ChevronDown, Phone, Mail, Instagram, Facebook, Youtube, Search, User, Heart, Calendar } from 'lucide-react';

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      title: 'Services',
      hasDropdown: true,
      items: [
        { name: 'Wedding Photography', icon: '💑', desc: 'Capture your special day' },
        { name: 'Pre-Wedding Shoots', icon: '💕', desc: 'Romantic outdoor sessions' },
        { name: 'Candid Photography', icon: '📸', desc: 'Natural & authentic moments' },
        { name: 'Cinematic Videos', icon: '🎬', desc: 'Movie-style storytelling' },
        { name: 'Drone Coverage', icon: '🚁', desc: 'Aerial perspectives' },
        { name: 'Album Design', icon: '📖', desc: 'Premium coffee table books' }
      ]
    },
    {
      title: 'Portfolio',
      hasDropdown: true,
      items: [
        { name: 'Wedding Gallery', icon: '💒', desc: 'Our finest work' },
        { name: 'Pre-Wedding', icon: '🌅', desc: 'Romantic captures' },
        { name: 'Candid Moments', icon: '✨', desc: 'Real emotions' },
        { name: 'Video Showcase', icon: '🎥', desc: 'Watch our films' }
      ]
    },
    { title: 'About Us', link: '#about' },
    { title: 'Pricing', link: '#pricing' },
    { title: 'Blog', link: '#blog' }
  ];

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className={`hidden lg:block bg-gradient-to-r from-rose-600 to-pink-600 text-white transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden' : 'h-auto'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-rose-100 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:hello@photography.com" className="flex items-center gap-2 hover:text-rose-100 transition-colors">
                <Mail className="w-4 h-4" />
                <span>hello@photography.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-rose-100">Follow Us:</span>
              <a href="#" className="hover:text-rose-100 transition-colors hover:scale-110 transform duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-rose-100 transition-colors hover:scale-110 transform duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-rose-100 transition-colors hover:scale-110 transform duration-200">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
          : 'bg-white/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 group">
              <a href="#" className="flex items-center gap-3">
                <div className="relative">
                  {/* Animated Ring */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-gentle"></div>
                  
                  {/* Logo Container */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Sparkle Effect */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </div>
                
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    DreamFrame
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Photography Studio</p>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.link || '#'}
                    className="flex items-center gap-1 text-gray-700 font-medium hover:text-rose-600 transition-colors duration-300 py-2 relative group"
                  >
                    <span>{item.title}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.title ? 'rotate-180' : ''
                      }`} />
                    )}
                    
                    {/* Animated Underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </a>

                  {/* Mega Dropdown */}
                  {item.hasDropdown && (
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ${
                      activeDropdown === item.title 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                    }`}>
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                      
                      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[400px] mt-2">
                        <div className="grid grid-cols-1 gap-2">
                          {item.items.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href="#"
                              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 group/item"
                            >
                              <span className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                                {subItem.icon}
                              </span>
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover/item:text-rose-600 transition-colors">
                                  {subItem.name}
                                </h4>
                                <p className="text-sm text-gray-500 mt-0.5">{subItem.desc}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-300 group"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600 group-hover:text-rose-600 transition-colors" />
              </button>

              {/* Wishlist */}
              {/* <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-300 group relative" aria-label="Wishlist">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-rose-600 group-hover:fill-rose-600 transition-all" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button> */}

              {/* Account */}
              {/* <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-300 group" aria-label="Account">
                <User className="w-5 h-5 text-gray-600 group-hover:text-rose-600 transition-colors" />
              </button> */}

              {/* Book Now Button */}
              <a
                href="#contact"
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden relative"
              >
                <span className="relative z-10">Book Now</span>
                <Calendar className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 transition-all duration-300 ${
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for services, packages, or galleries..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-rose-500 focus:outline-none text-gray-700 transition-colors"
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-3 bg-gray-50 border-t border-gray-100">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.link || '#'}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white transition-colors font-medium text-gray-700"
                  onClick={(e) => {
                    if (item.hasDropdown) {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.title ? null : item.title);
                    }
                  }}
                >
                  <span>{item.title}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`} />
                  )}
                </a>
                
                {item.hasDropdown && (
                  <div className={`ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.title ? 'max-h-96' : 'max-h-0'
                  }`}>
                    {item.items.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition-colors"
                      >
                        <span className="text-xl">{subItem.icon}</span>
                        <span className="text-sm text-gray-600">{subItem.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg mt-4"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Session</span>
            </a>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.75; }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}