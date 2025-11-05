'use client'
// components/ContactForm.js
"use client";
import { useState } from "react";

export default function ContactForm({ service, location }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your form backend endpoint
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...form, service, location }),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Get in Touch
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="border p-3 rounded-lg w-full"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="border p-3 rounded-lg w-full"
          ></textarea>

          {service && (
            <p className="text-sm text-gray-500">
              You’re enquiring about: <strong>{service.title}</strong>
              {location && ` in ${location.name}`}
            </p>
          )}

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
          >
            Send Message
          </button>

          {status === "success" && (
            <p className="text-green-600 text-center mt-4">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center mt-4">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
