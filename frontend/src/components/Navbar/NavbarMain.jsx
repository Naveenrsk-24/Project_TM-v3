"use client";
import React, { useState } from "react";
import LogoImage from "../../../public/Logo/dummylogo.png";
import Image from "next/image";
import Mobilenavbar from "../Navbar/Mobilenavbar";
import Link from "next/link";

const NavBarMain = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileNavbarVisible, setMobileNavbarVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleNavbar = () => {
    setMobileNavbarVisible(!mobileNavbarVisible);
  };

  const Rcdata = [
    {
      id: 1,
      title: "Wedding Photography",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/tamil-weddings",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-wedding",
    },
    {
      id: 2,
      title: "Portrait Sessions",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/portraits",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-portraits",
    },
    {
      id: 3,
      title: "Event Photography",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/EventPhotography",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-events",
    },
    {
      id: 4,
      title: "Product Photography",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/ProductPhotography",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-products",
    },
    {
      id: 5,
      title: "Fashion Photography",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/FashionPhotography",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-fashion",
    },
    {
      id: 6,
      title: "Real Estate Photography",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/RealEstate",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-realestate",
    },
    {
      id: 7,
      title: "Drone Photography & Videography",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/Drone",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-drone",
    },
    {
      id: 8,
      title: "Photo Retouching & Editing",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/PhotoEditing",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-editing",
    },
    {
      id: 9,
      title: "Corporate Headshots",
      imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
      link: "/Section/CorporateHeadshots",
      dataCategory: "photography",
      dataAction: "click-navigation",
      dataLabel: "most-popular-corporate",
    },
  ];
  const Lcdata = [
  {
    id: 1,
    slug: "WeddingPhotography",
    title: "Wedding Photography",
    subtitle: "Capture your special day with timeless photos",
    imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    dataCategory: "",
    dataAction: "click-navigation",
    dataLabel: "wedding-photography",
  },
  {
    id: 2,
    slug: "PreWeddingShoot",
    title: "Pre-Wedding Shoot",
    subtitle: "Beautiful couple portraits before the big day",
    imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    dataCategory: "",
    dataAction: "click-navigation",
    dataLabel: "pre-wedding-shoot",
  },
  {
    id: 3,
    slug: "PortraitPhotography",
    title: "Portrait Photography",
    subtitle: "Studio and outdoor portrait sessions for individuals",
    imageSrc: "/Weddings/beautiful-husband-wife-posing-beach.jpg",
    dataCategory: "",
    dataAction: "click-navigation",
    dataLabel: "portrait-photography",
  },
];


  return (
    <div>
      {!mobileNavbarVisible ? (
        <div
          id="menu-header"
          className="relative z-30  bg-opacity-70 transition-all duration-300"
        >
          <div className="w-full bg-white px-4">
            <nav className="flex justify-between items-center py-2">
              <a href="/" className="text-3xl font-semibold ml-2.5">
                <Image src={LogoImage} alt="LOGO" width={70} height={50} />
              </a>
              <div className="lg:hidden">
                <button
                  className="navbar-burger flex items-center py-3 px-4 bg-black text-white rounded-3xl focus:outline-none"
                  onClick={() => toggleNavbar()}
                >
                  <svg
                    className="fill-current h-4 w-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                  </svg>
                </button>
              </div>

              <ul className="hidden lg:flex lg:items-center lg:space-x-12">
                <li>
                  <a
                    href="/"
                    className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <div className="relative ">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                    >
                      Services
                      <svg
                        className="ml-1 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </li>

                <li>
                  <a
                    href="/portfolio2"
                    className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                  >
                    Portfolio
                  </a>
                </li>

                <li>
                  <a
                    href="/aboutus"
                    className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    href="/blogs"
                    className="relative after:absolute after:bottom-0  after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
      after:bg-sky-700 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                  >
                    Blogs
                  </a>
                </li>
              </ul>
              <div className="hidden lg:block">
                {/* <a
                  href="/careers"
                  className="mr-3 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
                  after:bg-pink-500 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                  Careers
                </a> */}
                <Link href="/booking" aria-label="Book a wedding photography session">
                  <button
                    className={`relative px-4 py-3 bg-gradient-to-r cursor-pointer from-pink-600 to-rose-500 inline-block text-white hover:text-black border-2 rounded-full font-semibold text-sm overflow-hidden transition-transform duration-200 ease-in-out transform ${
                      isHovered
                        ? "scale-105 border-transparent text-black"
                        : "border-transparent"
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ zIndex: 0 }}
                  >
                    <span
                      className={`absolute inset-0 bg-white rounded-full transition-transform duration-200 ease-out transform ${
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
          {dropdownVisible && (
            <div
              className="absolute overflow-hidden dropdown-menu origin-top-right top-[84px] left-0 z-50 w-full bg-white border-t border-brand-section-dashboard divide-y divide-gray-100 transition-opacity ease-linear duration-300 visible opacity-100"
              style={{ boxShadow: "0px 6px 6px 0px rgba(0, 0, 0, 0.02)" }}
              data-nav-dropdown="PhotographyServices"
            >
              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap">
                  {/* Left Column */}
                  <div className="w-5/12 pt-4 pr-3 pb-6">
                    <h4 className="mb-2 text-alternatives-gray text-xs uppercase font-semibold">
                      Popular Packages
                    </h4>

                    <div className="flex flex-wrap -m-1">
                      {Lcdata.map((item) => (
                        <div key={item.id} className="w-full p-1">
                          <Link
                            href={`/Section/${item.slug}`}
                            className="p-3 flex items-center hover:bg-brand-section-light rounded-lg border border-transparent hover:border-gray-200 transition-all duration-300 group"
                            data-category={item.dataCategory}
                            data-action={item.dataAction}
                            data-label={item.dataLabel}
                            previewlistener="true"
                          >
                            <div className="flex items-center justify-center mr-3 flex-shrink-0">
                              <img
                                src={item.imageSrc}
                                alt={item.title
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}
                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 group-hover:border-black transition-all duration-300 transform group-hover:scale-105 shadow-sm"
                              />
                            </div>
                            <div className="inline-block">
                              <p className="mb-1 text-sm font-semibold leading-menu group-hover:text-black transition-colors duration-300">
                                {item.title}
                              </p>
                              <p className="text-xs font-medium text-alternatives-gray">
                                {item.subtitle}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="relative w-7/12 pt-4 pl-3 pb-6 bg-brand-section-light bg-opacity-60 border-l border-brand-section-dashboard">
                    <div className="absolute top-0 h-full w-full bg-brand-section-light bg-opacity-60 -right-full"></div>
                    <h4 className="mb-2 text-alternatives-gray text-xs uppercase font-semibold">
                      Photography Services
                    </h4>

                    <div className="flex flex-wrap -m-1">
                      {Rcdata.map((item) => (
                        <div key={item.id} className="w-1/3 p-1">
                          <Link
                            onClick={toggleDropdown}
                            className="flex items-center group p-3 hover:bg-white border border-transparent hover:border-menu-dropdown rounded-lg transition-all duration-300"
                            href={`/portfolio2/${item.link}`}
                            data-category={item.dataCategory}
                            data-action={item.dataAction}
                            data-label={item.dataLabel}
                            previewlistener="true"
                          >
                            <div className="mr-3 flex-shrink-0">
                              <img
                                src={item.imageSrc}
                                alt={item.title
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 group-hover:border-black transition-all duration-300 transform group-hover:scale-105 shadow-sm"
                              />
                            </div>
                            <div>
                              <h5 className="mb-0 text-sm text-body font-semibold leading-tight flex items-center">
                                <span className="flex items-center">
                                  <span className="leading-none">
                                    {item.title}
                                  </span>
                                </span>
                              </h5>
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
