"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function ClassicFAQSection2({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // If no FAQs passed, render nothing
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our photography services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon || HelpCircle;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`border-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "border-pink-500 shadow-lg bg-rose-50"
                    : "border-neutral-200 bg-white hover:border-pink-300 hover:shadow-md"
                }`}
              >
                {/* QUESTION */}
                <button
                  className="w-full p-5 sm:p-6 flex items-start gap-4 text-left"
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  aria-expanded={isActive}
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-pink-600 to-rose-500"
                        : "bg-neutral-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-white" : "text-neutral-600"
                      }`}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-lg font-semibold text-neutral-800">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle button */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-pink-600 to-rose-500 rotate-180"
                        : "bg-neutral-200"
                    }`}
                  >
                    {isActive ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-600" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="pl-14 sm:pl-16 border-l-4 border-rose-200">
                      <p className="text-neutral-700 leading-relaxed text-base pl-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
