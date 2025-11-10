'use client'
import { useState, useEffect } from "react";
import { Send, Mail, Phone, User, MessageSquare, CheckCircle, XCircle, MapPin } from "lucide-react";

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

  useEffect(() => {
    setIsVisible(true);
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
    { name: "name", type: "text", placeholder: "Your Name", icon: User, span: "col-span-1" },
    { name: "email", type: "email", placeholder: "Email Address", icon: Mail, span: "col-span-1" },
    { name: "phone", type: "tel", placeholder: "Phone Number", icon: Phone, span: "col-span-2" },
  ];

  return (
    <section
      className="py-12 px-4 sm:py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden"
      id="contact"
    >
      {/* Ambient glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-64 h-64 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-neutral-700">
              Available 24/7
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Let's Start a Conversation
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
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
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md mb-6 border border-rose-100">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {service && (
                  <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-full">
                    <span className="text-pink-700 font-semibold">
                      Service:
                    </span>
                    <span className="text-neutral-700">{service.title}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-neutral-700">{location.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 border border-neutral-100">
            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {inputFields.map((field, index) => {
                const Icon = field.icon;
                const isFocused = focusedField === field.name;
                const hasValue = form[field.name].length > 0;

                return (
                  <div key={field.name} className={field.span}>
                    <div className="relative group">
                      <div
                        className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                          isFocused || hasValue
                            ? "text-pink-600 scale-110"
                            : "text-neutral-400"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                        className={`w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 outline-none text-sm sm:text-base ${
                          isFocused
                            ? "border-pink-400 bg-amber-50/50 shadow-lg scale-[1.02]"
                            : "border-neutral-200 hover:border-neutral-300 bg-neutral-50"
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
                    ? "text-pink-600 scale-110"
                    : "text-neutral-400"
                }`}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className={`w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 outline-none resize-none text-sm sm:text-base ${
                  focusedField === "message"
                    ? "border-rose-400 bg-amber-50/50 shadow-lg"
                    : "border-neutral-200 hover:border-neutral-300 bg-neutral-50"
                }`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-semibold py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-rose-300/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-base sm:text-lg">Sending...</span>
                </>
              ) : (
                <>
                  <span className="text-base sm:text-lg">Send Message</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold text-sm sm:text-base">
                    Message sent successfully!
                  </p>
                  <p className="text-green-600 text-xs sm:text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-semibold text-sm sm:text-base">
                    Oops! Something went wrong.
                  </p>
                  <p className="text-red-600 text-xs sm:text-sm">
                    Please try again or contact us directly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-600 mb-3">
              Or reach us directly:
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 text-sm sm:text-base text-rose-700 hover:text-rose-800 font-medium transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>hello@example.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm sm:text-base text-rose-700 hover:text-rose-800 font-medium transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
