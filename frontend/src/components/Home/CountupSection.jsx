"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const NewCountUp = () => {
  const jsonData = {
    title: "Our Creative Milestones",
    description:
      "With years of passion and artistry behind the lens, we’ve captured thousands of unforgettable moments. From intimate portraits to grand wedding celebrations, our journey has been built on creativity, trust, and client happiness. Every frame we shoot tells a story worth remembering.",
    items: [
      { label: "Client Satisfaction", value: 100, suffix: "%" },
      { label: "Happy Clients", value: 1, suffix: "K+" },
      { label: "Projects Completed", value: 850, suffix: "+" },
    ],
  };

  const { title, description, items } = jsonData;

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-r from-black via-gray-900 to-black rounded-lg p-8 lg:px-8 lg:py-20 flex flex-col-reverse lg:flex-row items-center lg:items-start lg:gap-8"
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 w-full h-16 py-8 bg-[#f5c518] pt-5 rounded-t-lg"></div>

      {/* Text Section */}
      <div className="flex-1 z-10 py-8 ml-0 lg:ml-10">
        <h3 className="text-[#f5c518] font-semibold lg:mt-10 mt-0 tracking-widest">
          WHY CHOOSE US
        </h3>
        <h2 className="md:text-5xl text-3xl font-black mt-2 text-white">
          {title}
        </h2>
        <p className="text-gray-200 mt-4 leading-relaxed">{description}</p>

        {/* Achievements Section */}
        <div className="flex flex-wrap mt-5 md:mt-8 gap-5 lg:gap-12">
          {items.map((item, index) => (
            <div key={index} className="text-left">
              <h3 className="md:text-6xl text-5xl font-bold mb-1 text-[#f5c518]">
                {inView && (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2}
                    suffix={item.suffix}
                  />
                )}
              </h3>
              <p className="font-semibold text-gray-100">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="relative flex-1 flex justify-center items-center z-10">
        <motion.div
          className="relative lg:absolute mt-0 -top-7 lg:mt-8 lg:-top-24 xl:left-24 lg:w-96 lg:h-96 md:h-80 md:w-80 w-64 h-64 rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 1, y: -80 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/Weddings/beautiful-husband-wife-posing-beach.jpg"
            alt="Photographer capturing moments"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default NewCountUp;
