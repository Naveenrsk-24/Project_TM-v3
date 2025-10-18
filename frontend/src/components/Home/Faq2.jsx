"use client";
import React, { useState } from "react";

const FAQ2 = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      title: "How do I book a photography session?",
      content:
        "You can easily book your session online through our website or by contacting us directly via phone or WhatsApp. A small advance payment confirms your booking date and time.",
    },
    {
      id: 2,
      title: "How far in advance should I schedule my shoot?",
      content:
        "We recommend booking at least 2–3 weeks in advance to secure your preferred date, especially for weddings and weekend sessions.",
    },
    {
      id: 3,
      title: "Do you travel for destination shoots?",
      content:
        "Yes! We love destination photography. Our team travels across cities and even internationally. Travel and accommodation costs are discussed and finalized beforehand.",
    },
    {
      id: 4,
      title: "When will I receive my photos or videos?",
      content:
        "Edited photos are usually delivered within 10–14 days after the shoot. For wedding albums and videos, delivery time may vary between 3–5 weeks depending on the project size.",
    },
    {
      id: 5,
      title: "Can I get the raw images from the shoot?",
      content:
        "We generally provide only professionally edited images to maintain our quality standards. However, raw files can be shared upon special request and additional cost.",
    },
    {
      id: 6,
      title: "What happens if I need to reschedule or cancel?",
      content:
        "You can reschedule your shoot up to 72 hours before the session without any extra charge. In case of cancellations, 50% of the advance may be retained as a booking fee.",
    },
    {
      id: 7,
      title: "Do you offer customized packages or discounts?",
      content:
        "Yes, we offer tailor-made photography packages for weddings, events, and branding projects. We occasionally run seasonal offers — keep an eye on our website or social media!",
    },
  ];

  const faq = faqs.slice(0, 2);
  const faqv = faqs.slice(2);

  return (
    <div className="lg:flex-[1_1_500px] w-full flex-none py-10">
      <div className="px-10 md:lg:px-16">
        <div className="grid grid-cols-1 md:lg:grid-cols-2">
          <div className="pt-3 w-9/12">
            <h1 className="text-base text-[#7b071e] md:lg:text-6xl">
              Got questions? We’re here to help!
            </h1>
          </div>
          <div>
            {faq.map((faq) => (
              <div className="px-1" key={faq.id}>
                <div
                  className={` mb-6 w-full overflow-hidden p-5 rounded-md transition-colors duration-300 ${
                    openFAQ === faq.id
                      ? "bg-gradient-to-br from-pink-300 to-pink-500"
                      : "bg-gradient-to-br from-pink-300 to-pink-500"
                  }`}
                >
                  <div
                    className="flex cursor-pointer items-start justify-between"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <p
                      className={`text-sm md:lg:text-lg font-bold transition-colors duration-300 ${
                        openFAQ === faq.id ? "text-black" : "text-black"
                      }`}
                    >
                      {faq.title}
                    </p>
                    <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                      <div
                        className={`absolute h-5 w-0.5 transition-transform duration-300 ${
                          openFAQ === faq.id
                            ? "rotate-90 bg-red-600"
                            : "bg-black"
                        }`}
                      ></div>
                      <div
                        className={`h-0.5 w-5  ${
                          openFAQ === faq.id ? "" : "bg-black"
                        }`}
                      ></div>
                    </div>
                  </div>
                  {openFAQ === faq.id && (
                    <div className="w-full overflow-hidden mb-4 max-w-2xl lg:max-w-4xl">
                      <p
                        className={`text-sm md:lg:text-base pt-3 transition-colors duration-300 ${
                          openFAQ === faq.id ? "text-black" : "text-black"
                        }`}
                      >
                        {faq.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:lg:grid-cols-2">
          {faqv.map((faq) => (
            <div className="px-1" key={faq.id}>
              <div
                className={` mb-6 w-full overflow-hidden p-5 rounded-md transition-colors duration-300 ${
                  openFAQ === faq.id
                    ? "bg-gradient-to-br from-pink-300 to-pink-500"
                      : "bg-gradient-to-br from-pink-300 to-pink-500"
                }`}
              >
                <div
                  className="flex cursor-pointer items-start justify-between"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <p
                    className={`text-sm md:lg:text-lg font-bold transition-colors duration-300 ${
                      openFAQ === faq.id ? "text-black" : "text-black"
                    }`}
                  >
                    {faq.title}
                  </p>
                  <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                    <div
                      className={`absolute h-5 w-0.5 transition-transform duration-300 ${
                        openFAQ === faq.id ? "rotate-90 bg-white" : "bg-black"
                      }`}
                    ></div>
                    <div
                      className={`h-0.5 w-5 ${
                        openFAQ === faq.id ? " bg-white" : "bg-black"
                      }`}
                    ></div>
                  </div>
                </div>
                {openFAQ === faq.id && (
                  <div className="w-full overflow-hidden mb-4 max-w-2xl lg:max-w-4xl">
                    <p
                      className={`text-sm md:lg:text-base pt-3 transition-colors duration-300 ${
                        openFAQ === faq.id ? "text-black" : "text-black"
                      }`}
                    >
                      {faq.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ2;
