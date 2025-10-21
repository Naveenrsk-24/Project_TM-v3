"use client"
import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState('right');

  const testimonials = [
    {
      id: 1,
      name: "Priya & Arjun",
      role: "Wedding Couple",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
      rating: 5,
      text: "Absolutely phenomenal! They captured every emotion beautifully. Our wedding album is a masterpiece that we'll treasure forever. The candid moments they caught were simply magical.",
      event: "Traditional Wedding, Chennai",
      date: "December 2024"
    },
    {
      id: 2,
      name: "Aishwarya & Karthik",
      role: "Pre-Wedding Shoot",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
      rating: 5,
      text: "The creativity and professionalism exceeded all our expectations. Every frame tells a story. They made us feel comfortable and the results are absolutely stunning!",
      event: "Beach Pre-Wedding, Mahabalipuram",
      date: "October 2024"
    },
    {
      id: 3,
      name: "Divya & Rajesh",
      role: "Destination Wedding",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      rating: 5,
      text: "From the first consultation to the final delivery, everything was perfect. They understood our vision and brought it to life. The attention to detail is remarkable!",
      event: "Resort Wedding, Goa",
      date: "January 2025"
    },
    {
      id: 4,
      name: "Ananya & Vikram",
      role: "Engagement Ceremony",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      rating: 5,
      text: "Their team is incredibly talented and professional. They captured the essence of our celebration perfectly. We couldn't be happier with the results!",
      event: "Garden Engagement, Bangalore",
      date: "September 2024"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 py-20 px-4 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <span className="text-white text-sm font-semibold tracking-wider">CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-gray-600 text-lg">Real stories from real couples</p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image Section */}
              <div className="md:col-span-2 relative h-64 md:h-auto">
                <div 
                  className={`absolute inset-0 transition-all duration-700 ${
                    direction === 'right' ? 'animate-[slideInRight_0.7s_ease-out]' : 'animate-[slideInLeft_0.7s_ease-out]'
                  }`}
                >
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                </div>

                {/* Floating Quote Icon */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div 
                  className={`transition-all duration-700 ${
                    direction === 'right' ? 'animate-[fadeInUp_0.7s_ease-out]' : 'animate-[fadeInDown_0.7s_ease-out]'
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                        style={{ 
                          animation: `starPop 0.5s ease-out ${i * 0.1}s both`
                        }}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                    "{currentTestimonial.text}"
                  </p>

                  {/* Client Info */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-purple-600 font-medium mb-2">
                      {currentTestimonial.role}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span className="px-3 py-1 bg-purple-100 rounded-full">
                        {currentTestimonial.event}
                      </span>
                      <span className="px-3 py-1 bg-pink-100 rounded-full">
                        {currentTestimonial.date}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Dots */}
                  <div className="flex gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > activeIndex ? 'right' : 'left');
                          setActiveIndex(index);
                          setIsAutoPlay(false);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeIndex === index 
                            ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Thumbnail Preview */}
        <div className="flex justify-center gap-4 mt-12 overflow-x-auto pb-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => {
                setDirection(index > activeIndex ? 'right' : 'left');
                setActiveIndex(index);
                setIsAutoPlay(false);
              }}
              className={`flex-shrink-0 transition-all duration-300 ${
                activeIndex === index
                  ? 'scale-110 opacity-100'
                  : 'scale-90 opacity-50 hover:opacity-75'
              }`}
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes starPop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;