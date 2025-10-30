"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Server not reachable. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/admin/login-bg.jpg"
        alt="Photography accessories background"
        fill
        priority
        className="object-cover blur-md brightness-75"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-pink-900/30" />

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" />
            <div className="absolute inset-2 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full blur-sm opacity-70 animate-pulse" />
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 text-white"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 text-sm font-medium">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-pink-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-pink-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full py-3 mt-4 bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg font-medium text-white
                      overflow-hidden cursor-pointer transition-all duration-500 ease-out
                      hover:scale-105 active:scale-95 focus:outline-none"
          >
            <span className="relative z-10">
              {loading ? "Logging in..." : "Login"}
            </span>

            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                              translate-x-[-100%] hover:translate-x-[100%]
                              transition-transform duration-700 ease-in-out cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
}
