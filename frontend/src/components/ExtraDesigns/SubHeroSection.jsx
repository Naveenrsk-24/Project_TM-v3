'use client'

import { useState, useEffect } from 'react';
import { Camera, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function SubHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image Section - Left Side */}
          <div 
            className={`relative transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
            onMouseMove={handleMouseMove}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-rose-400/30 rounded-3xl animate-spin-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-amber-400/30 rounded-full animate-ping-slow"></div>
            
            {/* Floating Icons */}
            <div className="absolute top-10 right-10 animate-bounce-slow">
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
            </div>
            
            <div className="absolute bottom-16 left-8 animate-bounce-delayed">
              <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Camera className="w-7 h-7 text-amber-600" />
              </div>
            </div>

            {/* Main Image Container */}
            <div 
              className="relative group"
              style={{
                transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-amber-400/20 rounded-3xl sm:rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl">
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20"></div>
                
                <img
                  src="/HBD/suit-2.avif"
                  alt="Beautiful Indian wedding ceremony with bride and groom in traditional attire"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-white/40 rounded-tl-2xl"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-white/40 rounded-br-2xl"></div>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl px-6 py-3 flex items-center gap-3 animate-fade-in-up">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-gray-800">500+ Weddings Captured</span>
            </div>
          </div>

          {/* Content Section - Right Side */}
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
              <div className="w-12 h-px bg-gradient-to-r from-rose-400 to-transparent"></div>
              <span className="text-sm sm:text-base font-serif text-gray-600 tracking-wide">What Do We Do?</span>
            </div>

            {/* Main Heading with Pill Background */}
            <div className="relative mb-8 animate-fade-in-up delay-200">
              <div className="inline-block relative">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-rose-50 to-white rounded-full blur-sm animate-pulse-gentle"></div>
                
                {/* Main Heading */}
                <h2 className="relative px-8 py-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-gray-900 bg-transparent shadow-lg border border-gray-100">
                  We take our craft{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
                      seriously.
                    </span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-rose-200 to-amber-200 opacity-50 -z-10"></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* Body Copy */}
            <div className="space-y-6 mb-8 animate-fade-in-up delay-400">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We believe that a wedding should be all about the couple and not only about customs, or what the family wants, or a series of posed pictures with odd lighting. From straightforward coverage to themed documentary style wedding albums, the field of wedding photography and videography in India has changed.
              </p>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                In order to preserve our distinctive fun and offbeat candid style videography, our wedding photographers and cinematographers concentrate on creating simple wedding stories that are inventive yet extraordinary. With the goal of capturing emotions, genuine moments, small, unnoticed moments of how you are in your daily life, authentic and undisguised, we want to chronicle your wedding in the manner of contemporary wedding photography.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-fade-in-up delay-500">
              {[
                { icon: '📸', text: 'Candid Photography' },
                { icon: '🎬', text: 'Cinematic Videos' },
                { icon: '💫', text: 'Authentic Moments' },
                { icon: '🎨', text: 'Creative Storytelling' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                  <span className="text-sm sm:text-base font-medium text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="animate-fade-in-up delay-600">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                
                {/* Button Content */}
                <span className="relative z-10">Explore Wedding Albums</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-200 animate-fade-in-up delay-700">
              {[
                '⚡ 24/7 Support',
                '🎁 Free Consultation',
                '⭐ 5-Star Rated'
              ].map((indicator, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{indicator}</span>
                </div>
              ))}
            </div> */}
          </div>

        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-delayed { animation: bounce-delayed 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
}