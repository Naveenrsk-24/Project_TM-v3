"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("access");
          router.push("/admin/login");
          return;
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, [router]);

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (!refresh) {
      localStorage.clear();
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      await fetch("http://localhost:8000/api/admin/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh }),
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setLoading(false);
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white text-black shadow-lg rounded-xl p-4 border hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg mb-1">{booking.name}</h3>
            <p className="text-sm mb-1">
              <strong>Email:</strong> {booking.email}
            </p>
            <p className="text-sm mb-1">
              <strong>Phone:</strong> {booking.phone}
            </p>
            <p className="text-sm mb-1">
              <strong>City:</strong> {booking.city}
            </p>
            <p className="text-sm mb-1">
              <strong>Event:</strong> {booking.event}
            </p>
            <p className="text-sm mb-1">
              <strong>Date:</strong>{" "}
              {new Date(booking.date).toLocaleDateString()}
            </p>
            <p className="text-sm mb-1">
              <strong>Venue:</strong> {booking.venue}
            </p>
            <p className="text-sm mb-1">
              <strong>Time:</strong> {booking.time}
            </p>
            <p className="text-sm mb-1">
              <strong>Crowd:</strong> {booking.crowd_strength}
            </p>
            <p className="text-sm mb-1">
              <strong>About Couple:</strong> {booking.about_couple}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Created: {new Date(booking.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {bookings.length === 0 && !error && (
        <p className="text-center text-gray-300 mt-10">
          No event bookings available yet.
        </p>
      )}
    </div>
  );
}
