"use client";

import { ArrowRight } from "lucide-react";

// Sample experts data
const experts = [
  { id: 1, name: "Ethan Hughes", title: "Green Building Advisor", image: "/Home/Parallax1.avif" },
  { id: 2, name: "Olivia Bennett", title: "Sustainable Housing Consultant", image: "/Home/Parallax1.avif" },
  { id: 3, name: "Sophia Rivera", title: "Sustainable Housing Consultant", image: "/Home/Parallax1.avif" },
  { id: 4, name: "Liam Carter", title: "Commercial Real Estate Agent", image: "/Home/Parallax1.avif" },
  { id: 5, name: "James Callahan", title: "Luxury Property Specialist", image: "/Home/Parallax1.avif" },
  { id: 6, name: "Sarah Mitchell", title: "Investment Property Advisor", image: "/Home/Parallax1.avif" },
  { id: 7, name: "Michael Chen", title: "Residential Property Expert", image: "/Home/Parallax1.avif" },
  { id: 8, name: "Emma Thompson", title: "Property Development Consultant", image: "/Home/Parallax1.avif" },
];

// Glass-morphism button
function GlassButton({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-8 py-3 text-sm font-medium bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

// Simple Card component
function Card({ children, className = "" }) {
  return (
    <div
      className={`flex-shrink-0 w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${className}`}
    >
      {children}
    </div>
  );
}

export function ExpertsSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
         <h1> <GlassButton className="mb-6">Meet Our Experts</GlassButton> </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            <span className="text-foreground">PERSONALIZED GUIDANCE,</span>
            <br />
            <span className="text-muted-foreground">PROVEN EXPERTISE</span>
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-6 w-max">
            {/* First set of cards */}
            {experts.map((expert) => (
              <Card key={expert.id}>
                <div className="p-6">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.title}</p>
                  </div>
                </div>
              </Card>
            ))}
            {/* Duplicate set for seamless loop */}
            {experts.map((expert) => (
              <Card key={`duplicate-${expert.id}`}>
                <div className="p-6">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-card-foreground mb-1">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div className="text-center mt-12">
          <GlassButton>
            View All Expert Agents
            <ArrowRight className="ml-2 h-4 w-4 inline-block group-hover:translate-x-1 transition-transform" />
          </GlassButton>
        </div>
      </div>

      {/* Tailwind CSS keyframes for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
