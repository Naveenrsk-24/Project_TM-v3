'use client'

import { useState } from 'react';
import { Plus, Minus, HelpCircle, Clock,Camera,Package,LocateIcon, Video } from 'lucide-react';
export default function ClassicFAQSection2() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How much does wedding photography cost in Chennai?",
      answer: "Wedding photography in Chennai typically starts from ₹30,000 for basic coverage and can go up to ₹2,00,000+ depending on hours, number of events, and deliverables.",
      icon: Camera
    },
    {
      question: "What do you cover in a wedding photography package?",
      answer: "Our packages usually include candid photography, traditional photography, full-event coverage, couple portraits, edited images, and an online gallery. Albums, cinematic films, and drone coverage can be added on request.",
      icon: Package
    },
    {
      question: "Do you provide candid wedding photography in Chennai?",
      answer: "Absolutely. We specialize in candid wedding photography and cover all Chennai areas including ECR, OMR, Velachery, Tambaram, Anna Nagar, and more.",
      icon: LocateIcon
    },
    {
      question: "How early should we book our wedding photographer?",
      answer: "We recommend booking 2–4 months in advance, especially during peak wedding seasons (November–February and June–July) to ensure availability.",
      icon: Clock
    },
    {
      question: "Do you provide wedding cinematography or videography?",
      answer: "Yes, we offer cinematic wedding films, traditional videography, teaser edits, drone coverage, and multi-camera setups based on the event’s requirement.",
      icon: Video
    },
  ];

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`border-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'border-pink-500 shadow-lg bg-rose-50'
                    : 'border-neutral-200 bg-white hover:border-pink-300 hover:shadow-md'
                }`}
              >
                {/* Question Section */}
                <button
                  className="w-full p-5 sm:p-6 flex items-start gap-4 text-left"
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'bg-gradient-to-r from-pink-600 to-rose-500' : 'bg-neutral-100'
                  }`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-white' : 'text-neutral-600'}`} />
                  </div>

                  {/* Question Text */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                      isActive ? 'text-neutral-800' : 'text-neutral-800'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Button */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-pink-600 to-rose-500 rotate-180'
                      : 'bg-neutral-200'
                  }`}>
                    {isActive ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-600" />
                    )}
                  </div>
                </button>

                {/* Answer Section - Animated */}
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive ? 'max-h-96' : 'max-h-0'
                  }`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="pl-14 sm:pl-16 border-l-4 border-rose-200">
                      <p className="text-neutral-700 leading-relaxed text-sm sm:text-base pl-4">
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