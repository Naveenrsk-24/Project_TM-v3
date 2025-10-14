"use client"
import React, { useState, useEffect, useRef } from "react";

const NumbersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, projects: 0, team: 0 });
  const sectionRef = useRef(null);

  // Target values
  const targets = {
    years: 6,
    projects: 4821,
    team: 37
  };

  // Animation durations in milliseconds
  const durations = {
    years: 2000,
    projects: 3000,
    team: 2500
  };

  // Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;

    const animateCounter = (key, target, duration) => {
      const startTime = Date.now();
      const startValue = 0;

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

        setCounts(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    // Start all animations with slight delays for a staggered effect
    setTimeout(() => animateCounter('years', targets.years, durations.years), 200);
    setTimeout(() => animateCounter('projects', targets.projects, durations.projects), 400);
    setTimeout(() => animateCounter('team', targets.team, durations.team), 600);
  }, [isVisible]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section ref={sectionRef} className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Numbers tell our story
            </h2>
            <p className="mt-4 text-lg text-gray-600 sm:mt-6 font-pj">
              Watch our achievements come to life as we continue to grow and deliver excellence.
            </p>
          </div>

          <div className="relative mt-10 md:mt-16">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3 text-center">
              <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105">
                <h3 className="text-7xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                    {counts.years}+
                  </span>
                </h3>
                <p className="mt-4 text-xl font-medium text-gray-900 font-pj">
                  Years in business
                </p>
                <p className="mt-1 text-base text-gray-500 font-pj">
                  Creating the successful path
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105">
                <h3 className="text-7xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                    {formatNumber(counts.projects)}
                  </span>
                </h3>
                <p className="mt-4 text-xl font-medium text-gray-900 font-pj">
                  Projects delivered
                </p>
                <p className="mt-1 text-base text-gray-500 font-pj">
                  In last 6 years
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105">
                <h3 className="text-7xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                    {counts.team}+
                  </span>
                </h3>
                <p className="mt-4 text-xl font-medium text-gray-900 font-pj">
                  Team members
                </p>
                <p className="mt-1 text-base text-gray-500 font-pj">
                  Working for your success
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;