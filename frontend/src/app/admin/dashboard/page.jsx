"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchPhotos = async () => {
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
        setPhotos(data);
      } catch (err) {
        setError("Failed to load photos.");
      }
    };

    fetchPhotos();
  }, [router]);

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (!refresh) {
      // Just clear and redirect if no refresh found
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
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-lg">{photo.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {photo.description || "No description"}
            </p>
            <p className="text-gray-400 text-xs">
              Uploaded: {new Date(photo.uploaded_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {photos.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-10">No photos uploaded yet.</p>
      )}
    </div>
  );
}
