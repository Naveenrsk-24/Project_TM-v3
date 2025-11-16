"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export function ChemicalContactForm({
  title = "WE'RE HERE TO HELP YOU",
  subtitle = "Discuss Your Chemical Solution Needs",
  description = "Are you looking for top-quality event or wedding solutions tailored to your needs? Reach out to us!",
  email = "Webdevrsk@gmail.com",
  phone = "+91 988-789-2345",
  buttonText = "Submit",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    selectevent: "",
    date: "",
    location: "",
    venue: "",
    time: "",
    crowdstrength: "",
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
      // Sanitize and convert form data
      const sanitizedData = {
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        city: formData.city || "",
        selectevent: formData.selectevent || "",
        date: formData.date || null, // send null if empty
        location: formData.location || "",
        venue: formData.venue || "",
        time: formData.time || null, // send null if empty
        crowdstrength: formData.crowdstrength
          ? Number(formData.crowdstrength)
          : null, // convert to number or null
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://outgoing-flowers-4088a64df8.strapiapp.com"}/api/enquiries`,
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
        location: "",
        venue: "",
        time: "",
        crowdstrength: "",
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
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{title}</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{subtitle}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">E-mail</p>
                  <p className="text-gray-900 font-medium">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone number</p>
                  <p className="text-gray-900 font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
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
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Email */}
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
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Phone */}
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
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* City */}
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
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label htmlFor="selectevent" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Event
                  </label>
                  <select
                    id="selectevent"
                    value={formData.selectevent}
                    onChange={(e) => handleInputChange("selectevent", e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-white appearance-none transition duration-150 ease-in-out"
                  >
                    <option value="" disabled>
                      Select Event
                    </option>
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Beach"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Venue */}
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    id="venue"
                    placeholder="Grand Hall"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>

                {/* Crowd Strength */}
                <div>
                  <label htmlFor="crowdstrength" className="block text-sm font-medium text-gray-700 mb-2">
                    Crowd Strength
                  </label>
                  <input
                    type="number"
                    id="crowdstrength"
                    placeholder="150"
                    value={formData.crowdstrength}
                    onChange={(e) => handleInputChange("crowdstrength", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group border border-black hover:shadow-lg transition duration-300 ease-in-out"
                aria-live="polite"
              >
                <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                    <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000"></path>
                    <path
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                      fill="#000000"
                    ></path>
                  </svg>
                </div>
                <p className="translate-x-2">{loading ? "Submitting..." : buttonText}</p>
              </button>

              {/* Status Message */}
              {status && (
                <p
                  className={`text-sm pt-2 ${
                    status.startsWith("✅") ? "text-green-600" : "text-red-500"
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
