"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const TimePicker = dynamic(() => import("react-time-picker"), { ssr: false });

export default function BookingPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    event: "",
    date: "",
    location: "",
    venue: "",
    time: "",
    crowd_strength: "",
    about_couple: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Frontend validation
  const validateForm = () => {
    const newErrors = {};

    // Name: only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(formData.name.trim()))
      newErrors.name = "Name can only contain alphabets and spaces.";

    // Phone: only digits or leading +
    if (!/^\+?\d{9,15}$/.test(formData.phone.trim()))
      newErrors.phone = "Enter a valid phone number (e.g. +999999999).";

    // Length validations (frontend-side mirror of Django)
    if (formData.name.length > 100) newErrors.name = "Name too long (max 100).";
    if (formData.email.length > 100) newErrors.email = "Email too long (max 100).";
    if (formData.phone.length > 15) newErrors.phone = "Phone number too long (max 15).";
    if (formData.city.length > 100) newErrors.city = "City too long (max 100).";
    if (formData.event.length > 100) newErrors.event = "Event too long (max 100).";
    if (formData.location.length > 255) newErrors.location = "Location too long (max 255).";
    if (formData.venue.length > 150) newErrors.venue = "Venue too long (max 150).";
    if (Number(formData.crowd_strength) < 1)
      newErrors.crowd_strength = "Crowd strength must be at least 1.";

    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}event-booking/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ Backend validation errors
        if (typeof data === "object" && data !== null) {
          setErrors(data);
        }
        throw new Error("Failed to submit booking");
      }

      setMessage("✅ Booking submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        event: "",
        date: "",
        location: "",
        venue: "",
        time: "",
        crowd_strength: "",
        about_couple: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (!Object.keys(errors).length)
        setMessage("❌ Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="bg-neutral-800 text-white py-16 rounded-b-[4rem] shadow-md">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Book Us</h1>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Book Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every love story deserves to be told beautifully. Let us capture your moments of laughter,
            joy, and emotion, turning them into timeless memories you’ll cherish forever.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-10 rounded-3xl shadow-lg border border-gray-100"
        >
          {/* Inputs */}
          <Input name="name" placeholder="Name*" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChange} error={errors.phone} />
          <Input name="city" placeholder="City*" value={formData.city} onChange={handleChange} error={errors.city} />
          <Input name="event" placeholder="Select Event*" value={formData.event} onChange={handleChange} error={errors.event} />
          <Input name="date" type="date" value={formData.date} onChange={handleChange} error={errors.date} />
          <Input name="location" placeholder="Location*" value={formData.location} onChange={handleChange} error={errors.location} />
          <Input name="venue" placeholder="Venue*" value={formData.venue} onChange={handleChange} error={errors.venue} />

          {/* TimePicker */}
          <div className="flex flex-col">
            <TimePicker
              onChange={(value) => setFormData({ ...formData, time: value })}
              value={formData.time}
              disableClock={true}
              clearIcon={null}
              format="h:mm a"
              className="w-full rounded-md border border-gray-300 p-3 bg-white text-gray-800 focus:ring-2 focus:ring-pink-400"
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>

          {/* Crowd Strength */}
          <Input
            name="crowd_strength"
            type="number"
            placeholder="Crowd Strength*"
            value={formData.crowd_strength}
            onChange={handleChange}
            min="1"
            error={errors.crowd_strength}
          />

          {/* About Couple */}
          <div className="col-span-2">
            <textarea
              name="about_couple"
              placeholder="Tell us more about the couple and the wedding*"
              value={formData.about_couple}
              onChange={handleChange}
              required
              maxLength="1000"
              className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-400 outline-none min-h-[120px]"
            ></textarea>
            {errors.about_couple && <p className="text-red-500 text-sm mt-1">{errors.about_couple}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden col-span-2 py-3 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-full font-medium transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">
              {loading ? "Submitting..." : "Submit Booking"}
            </span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          </button>
        </form>

        {/* Success/Error message */}
        {message && (
          <p
            className={`mt-8 text-center text-lg font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </div>
  );
}

// ✅ Reusable input component with error support
const Input = ({ name, type = "text", placeholder, value, onChange, error, ...props }) => (
  <div className="flex flex-col">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className={`p-4 border rounded-xl bg-white outline-none transition-all focus:ring-2 ${
        error ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-rose-400"
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
