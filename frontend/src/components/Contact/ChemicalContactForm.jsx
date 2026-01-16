"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export function ChemicalContactForm({
  title = "LET’S CREATE TIMELESS MEMORIES",
  subtitle = "Book Your Photography Session",
  description = "Planning a wedding, baby shoot, or maternity session? Share your details and let TM Studios capture your story with soulful, cinematic artistry.",
  email = "subalesh@tmstudios.photography",
  phone = "+91-7358279252",
  buttonText = "Enquiry",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    selectevent: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const sanitizedData = {
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        city: formData.city || "",
        selectevent: formData.selectevent || "",
        date: formData.date || null,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL ||
          "https://outgoing-flowers-4088a64df8.strapiapp.com"}/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: sanitizedData }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error?.message || "Failed to submit form");
      }

      setStatus("✅ Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        selectevent: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {title}
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {subtitle}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">E-mail</p>
                  <p className="text-gray-900 font-medium">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Phone number
                  </p>
                  <p className="text-gray-900 font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Bride/Groom Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John & Jane"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 transition duration-150 ease-in-out"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 transition duration-150 ease-in-out"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 transition duration-150 ease-in-out"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Chennai"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 transition duration-150 ease-in-out"
                  />
                </div>

                <div>
                  <label htmlFor="selectevent" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Event
                  </label>
                  <select
                    id="selectevent"
                    value={formData.selectevent}
                    onChange={(e) => handleInputChange("selectevent", e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 bg-white appearance-none transition duration-150 ease-in-out"
                  >
                    <option value="" disabled>Select Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              {/* Classic Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 rounded-lg font-semibold text-white
                bg-gradient-to-r from-pink-600 to-rose-500
                hover:opacity-90 transition duration-200 ease-in-out
                disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : buttonText}
              </button>

              {status && (
                <p
                  className={`text-sm pt-2 ${
                    status.startsWith("✅")
                      ? "text-pink-600"
                      : "text-red-500"
                  } font-medium`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
