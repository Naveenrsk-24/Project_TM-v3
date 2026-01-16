"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../public/Logo/TMlogo.png";
// import FacebookLogo from "../../../public/Logo/facebook.svg";
// import TwitterLogo from "../../../public/Logo/twitter.svg";
import InstagramLogo from "../../../public/Icons/instagram.png";
import YoutubeLogo from "../../../public/Icons/youtube.png";


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
              TM Studios is a Chennai-based premium studio capturing Wedding,
              Baby, and Maternity moments with soulful, cinematic artistry.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              {/* social icons remain unchanged */}
            </ul>
          </div>

         <div>
  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
    Socials
  </p>

  <ul className="mt-6 space-y-4">

    {/* Facebook */}
    {/* <li>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 relative after:absolute after:bottom-0  
        after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
        after:bg-pink-600 after:transition-transform after:duration-300 
        hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-black"
      >
        <Image src={FacebookLogo} alt="Facebook" className="h-4 w-4" />
        Facebook
      </a>
    </li> */}

    {/* Twitter */}
    {/* <li>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 relative after:absolute after:bottom-0  
        after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0
        after:bg-pink-600 after:transition-transform after:duration-300 
        hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-black"
      >
        <Image src={TwitterLogo} alt="Twitter" className="h-4 w-4" />
        Twitter
      </a>
    </li> */}

    {/* Instagram */}
    <li>
      <a
        href="https://www.instagram.com/tmstudios.photography"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 relative"
      >
        <Image src={InstagramLogo} alt="Instagram" className="h-5 w-5" />
        Instagram
      </a>
    </li>

    {/* Youtube*/}
    <li>
      <a
        href="https://www.youtube.com/@tmstudiosphotography"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 relative"
      >
        <Image src={YoutubeLogo} alt="Youtube" className="h-5 w-5" />
        Youtube
      </a>
    </li>

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
                  href="/weddings"
                  className="flex text-base text-black transition-all duration-200 hover:text-pink-600"
                >
                  Weddings
                </Link>
              </li>
              <li>
                <Link
                  href="/baby-shoots"
                  className="flex text-base text-black transition-all duration-200 hover:text-pink-600"
                >
                  Baby Shoots
                </Link>
              </li>
              <li>
                <Link
                  href="/maternity-shoots"
                  className="flex text-base text-black transition-all duration-200 hover:text-pink-600"
                >
                  Maternity Shoots
                </Link>
              </li>
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
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />
        <p className="text-sm text-center text-gray-600">
          © Copyright 2025, All Rights Reserved by TM Studios
        </p>
      </div>
    </section>
  );
}
