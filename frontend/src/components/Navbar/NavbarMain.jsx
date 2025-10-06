"use client";
import React, { useState } from 'react';
import LogoImage from '../../../public/Logo/dummylogo.png';
import Image from 'next/image';
import Mobilenavbar from '../Navbar/Mobilenavbar';
import Link from 'next/link';






const NavBarMain = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileNavbarVisible, setMobileNavbarVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  const toggleNavbar = () => {
    setMobileNavbarVisible(!mobileNavbarVisible);
  }


  const data = [
  {
    id: 1,
    title: "Wedding Photography",
    imageSrc: "/NavIcons/wedding-photography.png",
    link: "/Section/WeddingPhotography",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-wedding"
  },
  {
    id: 2,
    title: "Portrait Sessions",
    imageSrc: "/NavIcons/portrait-sessions.png",
    link: "/Section/Portraits",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-portraits"
  },
  {
    id: 3,
    title: "Event Photography",
    imageSrc: "/NavIcons/event-photography.png",
    link: "/Section/EventPhotography",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-events"
  },
  {
    id: 4,
    title: "Product Photography",
    imageSrc: "/NavIcons/product-photography.png",
    link: "/Section/ProductPhotography",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-products"
  },
  {
    id: 5,
    title: "Fashion Photography",
    imageSrc: "/NavIcons/fashion-photography.png",
    link: "/Section/FashionPhotography",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-fashion"
  },
  {
    id: 6,
    title: "Real Estate Photography",
    imageSrc: "/NavIcons/real-estate-photography.png",
    link: "/Section/RealEstate",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-realestate"
  },
  {
    id: 7,
    title: "Drone Photography & Videography",
    imageSrc: "/NavIcons/drone-photography.png",
    link: "/Section/Drone",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-drone"
  },
  {
    id: 8,
    title: "Photo Retouching & Editing",
    imageSrc: "/NavIcons/photo-editing.png",
    link: "/Section/PhotoEditing",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-editing"
  },
  {
    id: 9,
    title: "Corporate Headshots",
    imageSrc: "/NavIcons/corporate-headshots.png",
    link: "/Section/CorporateHeadshots",
    dataCategory: "photography",
    dataAction: "click-navigation",
    dataLabel: "most-popular-corporate"
  }
];



  return (
    <div>
      {
        !mobileNavbarVisible ? <div id="menu-header" className="relative z-30  bg-opacity-70 transition-all duration-300">
          <div className="w-full bg-white px-4">
            <nav className="flex justify-between items-center py-2">
              <a href="/" className="text-3xl font-semibold">
                {/* <img src="/vendor/shuffle/img/brand/logo-shuffle-full-dark.svg" alt="Shuffle" className="h-8 w-auto" /> */}
                <Image src={LogoImage} width={100} height={100} />
              </a>
              <div className="lg:hidden">
                <button className="navbar-burger flex items-center py-3 px-4 bg-black text-white rounded-3xl focus:outline-none" onClick={() => toggleNavbar()}>
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                  </svg>
                </button>
              </div>


              <ul className="hidden lg:flex lg:items-center lg:space-x-12">
                <li>
                  <a href="/" className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Weddings</a>
                </li>


                <li>
                  <a href="/About" className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Toddlers</a>
                </li>
                <li>
                  <div className="relative ">
                    <button onClick={toggleDropdown} className="flex items-center relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                      Services
                      <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>


                  </div>
                </li>
                <li>
                  <a href="/portfolio" className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Portfolio</a>
                </li>
                <li>
                  <a href="/blogs" className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Blogs</a>
                </li>
              </ul>
              <div className="hidden lg:block">
                <a href="/careers" className="mr-3  relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Careers</a>
                <a href="/Contacts">
                  <button
                    className={`relative px-4 py-3 bg-sky-900 inline-block text-white hover:text-black border-2 rounded-full font-semibold text-sm overflow-hidden transition-transform duration-200 ease-in-out transform ${isHovered ? 'scale-105 border-transparent text-black' : "border-transparent"
                      }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ zIndex: 0 }}
                  >
                    <span
                      className={`absolute inset-0 bg-white rounded-full transition-transform duration-200 ease-out transform ${isHovered ? 'translate-y-0' : 'translate-y-full'
                        }`}
                      style={{ transformOrigin: 'bottom', zIndex: -1 }}
                    ></span>
                    Contact Us
                  </button>
                </a>
              </div>
            </nav>
          </div>
          {dropdownVisible && (
            <div className=" absolute  overflow-hidden dropdown-menu origin-top-right  top-[84px] left-0 z-50 w-full bg-white border-t border-brand-section-dashboard divide-y divide-gray-100 transition-opacity ease-linear duration-300 visible opacity-100" style={{ boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.02)' }} data-nav-dropdown="Services">
              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap">
                  <div className="w-5/12 pt-4 pr-3 pb-6">
                    <h4 className="mb-2 text-alternatives-gray text-xs uppercase font-semibold">Shuffle’s design systems</h4>
                    <div className="flex flex-wrap -m-1">
                      <div className="w-full p-1">
                        <a className="p-3 flex items-center hover:bg-brand-section-light rounded shuffle-click" href="/Section/AllServices" data-category="" data-action="click-navigation" data-label="browse-libraries" previewlistener="true">
                          <div className="flex items-center justify-center w-10 h-10 mr-2 rounded bg-menu-icon-item bg-opacity-10">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/service.png" alt="service" />
                          </div>
                          <div className="inline-block">
                            <p className="mb-1 text-sm font-semibold leading-menu">All Services</p>
                            <p className="text-xs font-medium text-alternatives-gray">Browse 11,000+ UI components grouped by frameworks</p>
                          </div>
                        </a>
                      </div>
                      <div className="w-full p-1">
                        <a className="p-3 flex items-center hover:bg-brand-section-light rounded shuffle-click" href="/marketplace" data-category="" data-action="click-navigation" data-label="browse-libraries" previewlistener="true">
                          <div className="flex items-center justify-center w-10 h-10 mr-2 rounded bg-menu-icon-item bg-opacity-10">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/idea-sharing.png" alt="idea-sharing" />
                          </div>
                          <div className="inline-block">
                            <p className="mb-1 text-sm font-semibold leading-menu">Front-end UI libraries</p>
                            <p className="text-xs font-medium text-alternatives-gray">Browse 50+ UI libraries available in the Shuffle Editor</p>
                          </div>
                        </a>
                      </div>
                      <div className="w-full p-1">
                        <a className="p-3 flex items-center hover:bg-brand-section-light rounded shuffle-click" href="/Section/client" data-category="" data-action="click-navigation" data-label="browse-libraries" previewlistener="true">
                          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 mr-2 rounded bg-menu-icon-item bg-opacity-10">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/trust--v1.png" alt="trust--v1" />
                          </div>
                          <div className="inline-block">
                            <p className="mb-1 text-sm font-semibold leading-menu">Clients Reviews</p>
                            <p className="text-xs font-medium text-alternatives-gray">Ready-to-use, fully-coded templates for the Shuffle Editor</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="relative w-7/12 pt-4 pl-3 pb-6 bg-brand-section-light bg-opacity-60 border-l border-brand-section-dashboard">
                    <div class="absolute top-0 h-full w-full bg-brand-section-light bg-opacity-60 -right-full"></div>
                    <h4 class="mb-2 text-alternatives-gray text-xs uppercase font-semibold">Most popular ui libraries</h4>


                    <div class="flex flex-wrap -m-1">
                      {data.map(item => (
                        <div key={item.id} className="w-1/3 p-1">
                          <Link onClick={toggleDropdown}
                            className="flex items-center group p-3 hover:bg-white border border-transparent hover:border-menu-dropdown rounded-lg"
                            href={`/Section/Digitalmarket/${item.id}`}
                            data-category={item.dataCategory}
                            data-action={item.dataAction}
                            data-label={item.dataLabel}
                            previewlistener="true"
                          >
                            <div className="mr-2">
                              <img width="68" height="68" src={item.imageSrc} alt={item.title.replace(/\s+/g, '-').toLowerCase()} />
                            </div>
                            <div>
                              <h5 className="mb-0 text-sm text-body font-semibold leading-tight flex items-center">
                                <span className="flex items-center">
                                  <span className="leading-none">{item.title}</span>
                                </span>
                              </h5>
                              {/* <span className="text-alternatives-gray font-medium text-xs">Additional Info</span> */}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          )}
        </div>
          :
          <Mobilenavbar
            setMobileNavbarVisible={setMobileNavbarVisible}
            toggleNavbar={toggleNavbar}
          />
      }
    </div>
  );
};


export default NavBarMain;



 