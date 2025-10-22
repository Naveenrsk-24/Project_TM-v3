'use client'

import { useState } from 'react';
import { Plus, Minus, HelpCircle, Lightbulb, Shield, Clock, Headphones, CreditCard, Award } from 'lucide-react';

export default function ClassicFAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What makes your service different from competitors?",
      answer: "We combine cutting-edge AI technology with human expertise to deliver results that are 10x faster and more accurate. Our platform is built on enterprise-grade infrastructure with 99.9% uptime, featuring real-time collaboration tools and advanced analytics that give you actionable insights instantly.",
      icon: Lightbulb
    },
    {
      question: "How quickly can I get started?",
      answer: "You can be up and running in under 60 seconds! Our streamlined onboarding process requires no credit card, no complex setup, and no technical knowledge. Simply sign up, choose your plan, and start creating immediately with our intuitive drag-and-drop interface.",
      icon: Clock
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use bank-level AES-256 encryption for all data at rest and in transit. Our infrastructure is SOC 2 Type II certified, GDPR compliant, and regularly audited by third-party security firms. We never sell your data, and you maintain complete ownership of all content.",
      icon: Shield
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 premium support via live chat, email, and phone. All plans include access to our comprehensive knowledge base, video tutorials, and community forum. Enterprise customers get dedicated account managers and priority support with response times under 1 hour.",
      icon: Headphones
    },
    {
      question: "Can I cancel or change my plan anytime?",
      answer: "Yes! We offer complete flexibility with no long-term contracts. Upgrade, downgrade, or cancel anytime with just one click. If you cancel, you'll have access until the end of your billing period, and we'll even help you export all your data in multiple formats.",
      icon: CreditCard
    },
    {
      question: "Do you offer refunds or free trials?",
      answer: "We offer a risk-free 14-day trial with full access to all premium features—no credit card required. If you're not completely satisfied within 30 days of purchase, we'll provide a full refund, no questions asked. Plus, we offer a 60-day money-back guarantee for annual plans.",
      icon: Award
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
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
                    ? 'border-blue-600 shadow-lg bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
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
                    isActive ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>

                  {/* Question Text */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                      isActive ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Button */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 rotate-180'
                      : 'bg-gray-200'
                  }`}>
                    {isActive ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-600" />
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
                    <div className="pl-14 sm:pl-16 border-l-4 border-blue-200">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-12 sm:mt-16 text-center p-8 sm:p-10 bg-gray-50 rounded-lg border-2 border-gray-200">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Our support team is ready to assist you
          </p>
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            Contact Support
          </button>
        </div> */}

        {/* Trust Indicators */}
        {/* <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>30-Day Money Back</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}