'use client';
import React, { useEffect, useState } from 'react';
import { Camera, Heart, Award, Sparkles, Image as ImageIcon, CheckCircle, Star, Users, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-amber-50 via-white to-rose-50 overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] pointer-events-none" />

      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-amber-200 rounded-full opacity-20" />
      <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-rose-200 rounded-full opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">


          <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>


            <div className="inline-block mb-6">
              <div className="relative">
                <p className="uppercase tracking-[0.3em] text-rose-600 font-bold text-sm bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border-2 border-rose-200 shadow-sm">
                  Why Choose Us
                </p>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.15] mb-4">
                Crafting Timeless Stories, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600">
                  One Frame at a Time
                </span>
              </h2>
              <div className="flex items-center gap-2 mt-6">
                <div className="w-20 h-0.5 bg-gradient-to-r from-rose-600 to-transparent" />
                <div className="w-2 h-2 bg-rose-600 rounded-full" />
                <div className="w-12 h-0.5 bg-gradient-to-r from-rose-600 to-transparent" />
              </div>
            </div>

            <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed mb-12 max-w-2xl">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-rose-600 first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                Every wedding is a universe of emotions waiting to be captured. At Shot Memories, we don't just take photos—we curate visual poetry that echoes through generations.
              </p>

              <p className="pl-4 border-l-4 border-amber-200">
                With <span className="font-semibold text-gray-900">40–50 dedicated hours</span> of post-production magic per wedding, including editing, color grading, and bespoke album design, we ensure every moment is preserved with artistic excellence and meticulous care.
              </p>
            </div>


            <div className="grid grid-cols-2 gap-5 mb-12">
              {[
                { icon: <Star className="w-6 h-6" />, num: '10+', label: 'Years Experience' },
                { icon: <Users className="w-6 h-6" />, num: '500+', label: 'Happy Couples' },
                { icon: <Camera className="w-6 h-6" />, num: '50K+', label: 'Moments Captured' },
                { icon: <Clock className="w-6 h-6" />, num: '24/7', label: 'Dedicated Support' }
              ].map((stat, idx) => (
                <div key={idx} className="group relative bg-white rounded-[2rem] p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50 overflow-hidden">

                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.15]">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-xl" />
                    <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full" />
                  </div>

                  <div className="relative mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                      {stat.icon}
                    </div>
                  </div>

                  <div className="relative text-3xl font-bold text-gray-900 mb-1.5 tracking-tight">
                    {stat.num}
                  </div>

                  <div className="relative text-xs text-gray-500 font-medium tracking-wide">{stat.label}</div>

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {[
                {
                  icon: <Camera className="w-6 h-6" />,
                  title: 'Cinematic Storytelling',
                  desc: 'Blending documentary authenticity with editorial elegance to create frames that feel alive.',
                  iconBg: 'from-rose-400 via-pink-400 to-rose-500'
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: 'Emotion-Driven Approach',
                  desc: 'We capture the tears, laughter, and whispers—the real, raw, unscripted magic of love.',
                  iconBg: 'from-pink-400 via-rose-400 to-pink-500'
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: 'Recognized Excellence',
                  desc: 'Featured in leading publications and celebrated for pushing creative boundaries.',
                  iconBg: 'from-purple-400 via-pink-400 to-purple-500'
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: 'Luxury Finishing',
                  desc: 'Museum-quality prints, heirloom albums, and high-resolution digital galleries included.',
                  iconBg: 'from-rose-500 via-purple-400 to-pink-500'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 p-7 border border-gray-50 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.12]">
                    <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-rose-200 via-pink-100 to-purple-100 rounded-full blur-2xl" />
                    <div className="absolute top-4 right-8 w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-100 rounded-full blur-xl" />
                    <div className="absolute top-12 right-2 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full" />
                  </div>

                  <div className="relative mb-5">
                    <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${item.iconBg} text-white items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300`}>
                      {item.icon}
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="text-base font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed tracking-wide">
                      {item.desc}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 p-5 rounded-2xl border-2 border-dashed border-amber-300 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <CheckCircle className="w-12 h-12 text-amber-600" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-ping" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-base md:text-lg mb-1">
                      Trusted by Couples Worldwide
                    </p>
                    <p className="text-gray-600 text-sm">
                      A decade of excellence in preserving love stories forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>

            <div className="relative h-[900px]">

              <div className="absolute top-0 left-0 w-72 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer z-30">
                <div className="bg-white p-4 shadow-2xl rounded-sm">
                  <img
                    src="/Weddings/wed-image-1.jpg"
                    alt="Wedding Memory 1"
                    className="w-full h-64 object-cover"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-serif text-sm text-gray-600 italic">Captured Moments</p>
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 left-1/4 w-20 h-7 bg-rose-300/40 backdrop-blur-sm transform -rotate-12" />
              </div>

              <div className="absolute top-12 right-0 w-64 transform rotate-6 hover:rotate-3 hover:scale-105 transition-all duration-500 cursor-pointer z-20">
                <div className="bg-white p-4 shadow-2xl rounded-sm">
                  <img
                    src="/Weddings/wed-image-1.jpg"
                    alt="Wedding Memory 2"
                    className="w-full h-56 object-cover"
                  />
                  <div className="mt-3">
                    <p className="font-handwriting text-lg text-purple-950 italic">Grateful</p>
                  </div>
                </div>
                <div className="absolute -top-2 right-1/3 w-24 h-6 bg-amber-300/40 backdrop-blur-sm transform rotate-6" />
              </div>

              <div className="absolute top-[280px] left-8 w-80 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer z-40">
                <div className="bg-white p-4 shadow-2xl rounded-sm">
                  <img
                    src="/Weddings/wed-image-1.jpg"
                    alt="Wedding Memory 3"
                    className="w-full h-72 object-cover"
                  />
                  <div className="mt-3 text-center">
                    <p className="font-serif text-base text-gray-700 italic">"Forever Starts Here"</p>
                  </div>
                </div>
                <div className="absolute -top-3 left-1/4 w-20 h-7 bg-pink-300/40 backdrop-blur-sm transform -rotate-6" />
                <div className="absolute -top-3 right-1/4 w-20 h-7 bg-purple-300/40 backdrop-blur-sm transform rotate-12" />
              </div>

              <div className="absolute bottom-12 left-0 w-56 transform -rotate-6 hover:-rotate-3 hover:scale-105 transition-all duration-500 cursor-pointer z-30">
                <div className="bg-white p-3 shadow-2xl rounded-sm">
                  <img
                    src="/Weddings/wed-image-1.jpg"
                    alt="Wedding Memory 4"
                    className="w-full h-48 object-cover"
                  />
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 left-1/2 w-16 h-6 bg-amber-300/40 backdrop-blur-sm transform -rotate-12" />
              </div>

              <div className="absolute bottom-0 right-8 w-68 transform rotate-4 hover:rotate-2 hover:scale-105 transition-all duration-500 cursor-pointer z-20">
                <div className="bg-white p-4 shadow-2xl rounded-sm">
                  <img
                    src="/Weddings/wed-image-1.jpg"
                    alt="Wedding Memory 5"
                    className="w-full h-60 object-cover"
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-rose-500" />
                    <p className="font-serif text-xs text-gray-600">Shot Memories</p>
                  </div>
                </div>
                <div className="absolute -top-3 left-1/3 w-24 h-7 bg-rose-300/40 backdrop-blur-sm transform rotate-3" />
              </div>

              <div className="absolute top-[620px] right-4 transform rotate-6 z-10">
                <p className="font-handwriting text-5xl text-amber-500/30">love</p>
              </div>

              <div className="absolute top-[240px] left-4 transform -rotate-12 z-10">
                <p className="font-handwriting text-4xl text-rose-400/30">joy</p>
              </div>
            </div>

            <div className="mt-8 relative">
              <div className="bg-gradient-to-br from-amber-50 to-rose-50 p-6 rounded-2xl border-2 border-amber-200 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-amber-300">
                    <ImageIcon className="w-8 h-8 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-gray-800 text-lg mb-1">Premium Albums</h4>
                    <p className="text-gray-600 text-sm">Custom-designed keepsakes that last generations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation)); }
          50% { transform: translateY(-10px) rotate(var(--rotation)); }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;