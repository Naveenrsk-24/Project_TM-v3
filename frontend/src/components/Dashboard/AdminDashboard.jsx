"use client";

import { useState } from "react";

export default function AdminDashboard() {
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
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "black",
        }}
      >
        💍 TM Wedding Event Booking Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "10px",
          color: "black",
        }}
      >
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required style={inputStyle} />
        <input name="event" placeholder="Select Event" value={formData.event} onChange={handleChange} required style={inputStyle} />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required style={inputStyle} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={inputStyle} />
        <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required style={inputStyle} />
        <input name="time" type="time" value={formData.time} onChange={handleChange} required style={inputStyle} />
        <input
          name="crowd_strength"
          type="number"
          placeholder="Crowd Strength"
          value={formData.crowd_strength}
          onChange={handleChange}
          required
          min="1"
          style={inputStyle}
        />
        <textarea
          name="about_couple"
          placeholder="Tell us more about the couple and the wedding"
          value={formData.about_couple}
          onChange={handleChange}
          style={{
            ...inputStyle,
            gridColumn: "span 2",
            minHeight: "100px",
            resize: "vertical",
          }}
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          style={{
            gridColumn: "span 2",
            padding: "10px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  border: "1px solid #d1d5db",
  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
};
