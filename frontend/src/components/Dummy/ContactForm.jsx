'use client'
import { useState, useEffect } from "react";

export default function ContactForm({ service, location }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particles = Array.from({ length: 20 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const section = document.getElementById('contact-section');
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service, location }),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "name", type: "text", placeholder: "Your Name", icon: "user", span: "col-span-1" },
    { name: "email", type: "email", placeholder: "Email Address", icon: "mail", span: "col-span-1" },
    { name: "phone", type: "tel", placeholder: "Phone Number", icon: "phone", span: "col-span-2" },
  ];

  const getIcon = (iconName) => {
    const icons = {
      user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
      message: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    };
    return icons[iconName];
  };

  return (
    <section
      id="contact-section"
      className="relative py-20 px-4 sm:py-24 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></span>
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-purple-500/30 mb-6">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-purple-200 tracking-wider">
              Available 24/7
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200">
            Let's Start a Conversation
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg max-w-xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Service & Location Info */}
          {(service || location) && (
            <div className="bg-slate-800/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg mb-6 border border-purple-500/30">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {service && (
                  <div className="flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full border border-purple-500/30">
                    <span className="text-purple-300 font-semibold">
                      Service:
                    </span>
                    <span className="text-white">{service.title}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full border border-purple-500/30">
                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">{location.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-slate-800/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 border border-purple-500/30">
            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {inputFields.map((field) => {
                const isFocused = focusedField === field.name;
                const hasValue = form[field.name].length > 0;

                return (
                  <div key={field.name} className={field.span}>
                    <div className="relative group">
                      <div
                        className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                          isFocused || hasValue
                            ? "text-pink-400 scale-110"
                            : "text-purple-300/60"
                        }`}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {getIcon(field.icon)}
                        </svg>
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.placeholder}
                        required
                        className={`w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 outline-none text-white placeholder-purple-300/50 bg-slate-900/60 backdrop-blur-sm text-sm sm:text-base ${
                          isFocused
                            ? "border-pink-500/60 shadow-lg shadow-pink-500/20 scale-[1.02]"
                            : "border-purple-500/30 hover:border-purple-400/50"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Textarea */}
            <div className="relative group">
              <div
                className={`absolute left-3 sm:left-4 top-4 transition-all duration-300 ${
                  focusedField === "message" || form.message
                    ? "text-pink-400 scale-110"
                    : "text-purple-300/60"
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {getIcon('message')}
                </svg>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Tell us about your project..."
                rows="4"
                required
                className={`w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 outline-none resize-none text-white placeholder-purple-300/50 bg-slate-900/60 backdrop-blur-sm text-sm sm:text-base ${
                  focusedField === "message"
                    ? "border-pink-500/60 shadow-lg shadow-pink-500/20"
                    : "border-purple-500/30 hover:border-purple-400/50"
                }`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-pink-500/40 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-base sm:text-lg font-black">Sending...</span>
                </>
              ) : (
                <>
                  <span className="text-base sm:text-lg font-black">Send Message</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 p-4 bg-green-900/40 backdrop-blur-sm border-2 border-green-500/50 rounded-xl sm:rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-green-200 font-bold text-sm sm:text-base">
                    Message sent successfully!
                  </p>
                  <p className="text-green-300/80 text-xs sm:text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 bg-red-900/40 backdrop-blur-sm border-2 border-red-500/50 rounded-xl sm:rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-red-200 font-bold text-sm sm:text-base">
                    Oops! Something went wrong.
                  </p>
                  <p className="text-red-300/80 text-xs sm:text-sm">
                    Please try again or contact us directly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-purple-200/70 mb-4">
              Or reach us directly:
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 text-sm sm:text-base text-purple-200 hover:text-pink-300 font-semibold transition-colors duration-300 group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>subalesh@tmstudios.photography</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm sm:text-base text-purple-200 hover:text-pink-300 font-semibold transition-colors duration-300 group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91-7358279252</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
