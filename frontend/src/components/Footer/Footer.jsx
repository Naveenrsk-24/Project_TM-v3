"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../public/Logo/tmslogo2.png";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Image
              src={LogoImage}
              alt="Logo"
              width={180}
              height={180}
              className="w-36 h-28"
            />

            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              {/* social icons remain unchanged */}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>
            <ul className="mt-6 space-y-4">
              {["About", "Features", "Works", "Career"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Quick Links
            </p>
            <ul className="mt-6 space-y-4">
              {/* NEW LINKS ADDED AT THE TOP */}
              <li>
                <Link
                  href="/weddings/all-locations"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600"
                >
                  Weddings
                </Link>
              </li>
              <li>
                <Link
                  href="/baby-shoots/all-locations"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600"
                >
                  Baby Shoots 
                </Link>
              </li>
              <li>
                <Link
                  href="/maternity-shoots/all-locations"
                  className="flex text-base text-black transition-all duration-200 hover:text-blue-600"
                >
                  Maternity Shoots
                </Link>
              </li>

              {/* ORIGINAL LINKS */}
              {["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to newsletter
            </p>
            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>

              <button
                type="submit"
                className={`relative px-6 py-4 mt-3 bg-gradient-to-r from-pink-600 to-rose-500 inline-block text-white hover:text-black border-2 rounded-full font-semibold text-sm overflow-hidden transition-transform duration-200 ease-in-out transform ${
                  isHovered ? "scale-105 border-transparent text-black" : "border-transparent"
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
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />
        <p className="text-sm text-center text-gray-600">
          © Copyright 2021, All Rights Reserved by TM
        </p>
      </div>
    </section>
  );
}
