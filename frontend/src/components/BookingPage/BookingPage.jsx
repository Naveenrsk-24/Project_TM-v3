"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const TimePicker = dynamic(() => import("react-time-picker"), {
  ssr: false, // ✅ disables server-side rendering for this component
});

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}event-booking/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit booking");

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
      setMessage("❌ Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="bg-neutral-800 text-white py-16 rounded-b-[4rem] shadow-md">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Book Us</h1>
        </div>
      </section>

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
          <Input name="name" placeholder="Name*" value={formData.name} onChange={handleChange} />
          <Input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleChange} />
          <Input name="phone" placeholder="Phone*" value={formData.phone} onChange={handleChange} />
          <Input name="city" placeholder="City*" value={formData.city} onChange={handleChange} />
          <Input name="event" placeholder="Select Event*" value={formData.event} onChange={handleChange} />
          <Input name="date" type="date" value={formData.date} onChange={handleChange} />
          <Input name="location" placeholder="Location*" value={formData.location} onChange={handleChange} />
          <Input name="venue" placeholder="Venue*" value={formData.venue} onChange={handleChange} />
          <TimePicker
            onChange={(value) => setFormData({ ...formData, time: value })}
            value={formData.time}
            disableClock={true}
            clearIcon={null}
            format="h:mm a"
            className="w-full rounded-md border border-gray-300 p-3 bg-white text-gray-800 focus:ring-2 focus:ring-pink-400"
          />


          <Input
            name="crowd_strength"
            type="number"
            placeholder="Crowd Strength*"
            value={formData.crowd_strength}
            onChange={handleChange}
            min="1"
          />

          <textarea
            name="about_couple"
            placeholder="Tell us more about the couple and the wedding*"
            value={formData.about_couple}
            onChange={handleChange}
            required
            className="col-span-2 p-4 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-400 outline-none min-h-[120px]"
          ></textarea>

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

const Input = ({ name, type = "text", placeholder, value, onChange, ...props }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    className="p-4 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-400 outline-none transition-all"
    {...props}
  />
);