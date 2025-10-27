"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/admin/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid credentials");
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Server not reachable. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-6 text-black"
      >
        <h2 className="text-2xl font-bold text-center text-black">
          Admin Login
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div>
          <label className="block text-black mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-black mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border border-gray-400 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
