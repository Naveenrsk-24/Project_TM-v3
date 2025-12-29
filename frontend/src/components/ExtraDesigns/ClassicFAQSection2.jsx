"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function ClassicFAQSection2({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // GPU Parallax refs (instead of React state)
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const parallax = useRef({ x: 0, y: 0 });
  let raf = null;

  useEffect(() => {
    const handleMove = (e) => {
      parallax.current.x = (e.clientX / window.innerWidth - 0.5) * 40;
      parallax.current.y = (e.clientY / window.innerHeight - 0.5) * 40;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (orbRef1.current) {
            orbRef1.current.style.transform = `translate3d(${parallax.current.x * 0.3}px, ${parallax.current.y * 0.3}px, 0)`;
          }
          if (orbRef2.current) {
            orbRef2.current.style.transform = `translate3d(${parallax.current.x * -0.3}px, ${parallax.current.y * -0.3}px, 0)`;
          }
          raf = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!faqs || faqs.length === 0) return null;

  /** Memoized particles (performance fix) */
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">

      {/* FLOAT PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* PARALLAX ORBS (GPU only) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={orbRef1}
          className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full animate-pulse"
          style={{ top: "10%", left: "12%" }}
        />
        <div
          ref={orbRef2}
          className="absolute w-[32rem] h-[32rem] bg-pink-500/20 blur-3xl rounded-full animate-pulse"
          style={{ bottom: "12%", right: "12%", animationDelay: "1s" }}
        />
      </div>

      {/* FAQ CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 mb-6 shadow-lg shadow-pink-500/30">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Find answers to the most common questions about our photography services.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon || HelpCircle;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border-2 backdrop-blur-xl transition-all duration-300 shadow-lg ${
                  isActive
                    ? "border-pink-500 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {/* QUESTION ROW */}
                <button
                  className="w-full p-6 flex items-start gap-4 text-left"
                  onClick={() => setActiveIndex(isActive ? null : index)}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-pink-600 to-rose-500"
                        : "bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-pink-600 to-rose-500 rotate-180"
                        : "bg-white/10"
                    }`}
                  >
                    {isActive ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/70" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="pl-6 border-l-4 border-rose-400/40">
                      <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-40px); opacity: 0.8; }
          100% { transform: translateY(-80px); opacity: 0.2; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
