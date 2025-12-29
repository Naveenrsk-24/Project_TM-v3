"use client";

import Image from "next/image";

export default function WeddingGallerySection2() {
  return (
    <section className="relative bg-gradient-to-b from-black via-purple-950 to-black py-36 px-6 lg:px-24 overflow-hidden">

      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.25),transparent_55%)]" />

      <div className="relative max-w-[1500px] mx-auto">

        {/* HEADER */}
        <div className="relative mb-32">
          <div className="absolute -left-12 top-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -right-12 top-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                💍
              </div>
              <span className="text-purple-300 text-sm font-semibold tracking-[0.3em] uppercase">
                Wedding Photography
              </span>
            </div>

            <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.95] mb-8">
              Turning Love<br />
              Stories{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Into Timeless
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
              </span>
              <br />
              Memories
            </h2>

            <div className="flex items-start gap-6">
              <div className="hidden lg:block w-1 h-24 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mt-2" />
              <p className="text-xl text-purple-100/90 leading-relaxed max-w-2xl">
                We document weddings as they unfold — honest emotions, quiet
                glances, and moments that live far beyond the day itself.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 mt-10 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-lg">🎬</span>
                </div>
                <span className="text-purple-200">Cinematic Style</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <span className="text-purple-200">Natural Moments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-lg">💝</span>
                </div>
                <span className="text-purple-200">Timeless Elegance</span>
              </div>
            </div>
          </div>
        </div>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-12 gap-6 mb-20">

          {/* Left Column - Tall Portrait */}
          <div className="col-span-12 lg:col-span-5 relative group">
            <div className="relative h-[600px] overflow-hidden rounded-3xl">
              <Image
                src="/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-109.jpg"
                alt="Wedding portrait"
                width={600}
                height={900}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Right Column - Stacked Content */}
          <div className="col-span-12 lg:col-span-7 space-y-6">

            {/* Wide Image */}
            <div className="relative group overflow-hidden rounded-3xl h-[280px]">
              <Image
                src="/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-103.jpg"
                alt="Wedding moment"
                width={900}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 mix-blend-multiply opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Authentic. Unscripted. Yours.
                </h3>
                <p className="text-white/90 text-sm lg:text-base">
                  We capture the real moments between the planned ones
                </p>
              </div>
            </div>

            {/* Bottom Split */}
            <div className="grid grid-cols-2 gap-6">

              {/* Text Card */}
              <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                    💍
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Your Story, Beautifully Told
                  </h3>
                  <p className="text-purple-100/80 text-sm leading-relaxed">
                    Every couple has a unique rhythm. We blend into your day, capturing genuine emotions and fleeting moments.
                  </p>
                </div>
              </div>

              {/* Square Image */}
              <div className="relative group overflow-hidden rounded-3xl h-[280px]">
                <Image
                  src="/Weddings/Rajasekar-Nithya/Rajasekar-Nithya-102.jpg"
                  alt="Wedding detail"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">

          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-3xl h-[400px]">
            <Image
              src="/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-102.jpg"
              alt="Candid moments"
              width={500}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl mb-4">
                🎬
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cinematic Storytelling</h3>
              <p className="text-white/80 text-sm">Editorial-style captures that feel like film stills</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-3xl h-[400px]">
            <Image
              src="/Weddings/Rajasekar-Nithya/Rajasekar-Nithya-102.jpg"
              alt="Intimate details"
              width={500}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl mb-4">
                💝
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Intimate Moments</h3>
              <p className="text-white/80 text-sm">The quiet glances and stolen moments that matter most</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-3xl h-[400px]">
            <Image
              src="/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-109.jpg"
              alt="Natural portraits"
              width={500}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl mb-4">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Timeless Elegance</h3>
              <p className="text-white/80 text-sm">Images that feel as beautiful decades from now</p>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL SECTION */}
        <div className="relative rounded-3xl overflow-hidden mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12 p-12 lg:p-16">

            <div className="flex flex-col justify-center">
              <div className="text-6xl mb-6">"</div>
              <p className="text-xl lg:text-2xl text-white font-light leading-relaxed mb-6">
                They didn't just photograph our wedding—they captured the essence of who we are as a couple. Every image tells our story.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <div>
                  <p className="text-white font-semibold">Arul & Vijayalakshmi</p>
                  <p className="text-purple-200/60 text-sm">Married December 2024</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-109.jpg"
                    alt="Wedding photo 1"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/Weddings/Rajasekar-Nithya/Rajasekar-Nithya-102.jpg"
                    alt="Wedding photo 2"
                    width={300}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/Weddings/Jalaludeen-Shain/Jalaludeen-Shain-102.jpg"
                    alt="Wedding photo 3"
                    width={300}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/Weddings/Arul-Vijayalakshmi/Arul-Vijayalakshmi-103.jpg"
                    alt="Wedding photo 4"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-12 lg:p-16 text-center">
            <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Let's Create Magic Together
            </h3>
            <p className="text-purple-100/80 text-lg mb-8 max-w-2xl mx-auto">
              Every wedding is unique, and your story deserves to be told beautifully.
              Let's discuss how we can capture your special day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 flex items-center gap-2">
                  ✨ Book Your Wedding
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all">
                View Full Portfolio
              </button>
            </div>
            <p className="text-purple-200/60 text-sm mt-6">
              Limited bookings for 2025 • Inquire now to secure your date
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}