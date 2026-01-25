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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Email failed");

      setStatus("✅ Form submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        selectevent: "",
        date: "",
      });
    } catch (error) {
      setStatus("❌ Failed to send. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT TEXT CONTENT */}
          <div className="space-y-8">
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{title}</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{subtitle}</h1>
            <p className="text-gray-600 text-lg">{description}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="text-gray-900 font-medium">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone number</p>
                  <p className="text-gray-900 font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {input("Name", "text", "name", formData, handleInputChange, true)}
                {input("Email", "email", "email", formData, handleInputChange, true)}
                {input("Phone", "text", "phone", formData, handleInputChange, true)}
                {input("City", "text", "city", formData, handleInputChange)}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Event</label>
                  <select
                    value={formData.selectevent}
                    onChange={(e) => handleInputChange("selectevent", e.target.value)}
                    required
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 bg-white"
                  >
                    <option value="" disabled hidden>Select Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                  </select>
                </div>

                {input("Date", "date", "date", formData, handleInputChange)}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : buttonText}
              </button>

              {status && (
                <p className={`text-sm pt-2 ${status.startsWith("✅") ? "text-pink-600" : "text-red-500"}`}>
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

function input(label, type, name, formData, handleInputChange, required = false) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        placeholder={label}
        value={formData[name]}
        onChange={(e) => handleInputChange(name, e.target.value)}
        required={required}
        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 text-black"
      />
    </div>
  );
}
