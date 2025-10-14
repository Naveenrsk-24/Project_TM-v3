"use client";
import Image from "next/image";
import { Phone, Play } from "lucide-react";

export default function WeddingHero() {
  return (
    <section className="w-full bg-[#F1F7F3] py-12 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12 max-h-screen">
        {/* Left Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="rounded-tr-lg rounded-bl-lg overflow-hidden h-[600px] md:h-[500px]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/Weddings/beautiful-husband-wife-posing-beach.jpg')",
                WebkitMaskImage:
                  "radial-gradient(circle at center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 90%)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "cover",
                maskImage:
                  "radial-gradient(circle at center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 90%)",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "cover",
              }}
            ></div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left bg-[#F1F7F3]">
          <p className="text-sm text-rose-500 font-medium">
            Planned to perfection
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900">
            Extraordinary Weddings Don’t Just Happen, It’s Planned
          </h1>
          <p className="text-gray-500 max-w-md mx-auto md:mx-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition font-medium shadow-md">
              <Phone size={18} />
              (406) 555-0120
            </button>

            <button className="flex items-center justify-center gap-2 border border-rose-500 text-rose-500 hover:bg-rose-50 px-6 py-3 rounded-lg transition font-medium">
              <Play size={18} />
              play video
            </button>
          </div>

          {/* Thumbnail Row */}
          {/* <div className="flex items-center justify-center md:justify-start gap-3 pt-6">
  {[1, 2, 3, 4].map((num) => (
    <div
      key={num}
      className="w-20 h-14 rounded-lg overflow-hidden border border-gray-200"
    >
      <img
        src={`/Weddings/thumb${num}.jpg`}  // 👈 place your own file names here
        alt={`thumbnail ${num}`}
        className="object-cover w-full h-full"
      />
    </div>
  ))}
</div> */}

          {/* Slider Pagination */}
          {/* <div className="flex items-center justify-center md:justify-start gap-2 pt-4">
            <span className="text-gray-400 text-sm">1</span>
            <div className="h-[2px] w-16 bg-emerald-500"></div>
            <span className="text-gray-400 text-sm">2</span>
            <span className="text-gray-400 text-sm">3</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
