"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  // ✅ Fetch bookings
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("access");
          router.push("/admin/login");
          return;
        }

        const data = await res.json();
        setBookings(data);
      } catch {
        setError("⚠️ Failed to load bookings. Please try again.");
      } finally {
        setLoadingPage(false);
      }
    };

    fetchBookings();
  }, [router]);

  // ✅ Logout
  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (!refresh) {
      localStorage.clear();
      router.push("/admin/login");
      return;
    }

    try {
      setLoadingLogout(true);
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
      localStorage.clear();
      setLoadingLogout(false);
      router.push("/admin/login");
    }
  };

  // ✅ Last 6 months overview
  const monthlyData = useMemo(() => {
    const now = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString("default", { month: "short" });
      months.push({ month: monthName, count: 0 });
    }

    bookings.forEach((b) => {
      const bookingDate = new Date(b.date);
      const monthName = bookingDate.toLocaleString("default", { month: "short" });
      const match = months.find((m) => m.month === monthName);
      if (match) match.count += 1;
    });

    return months;
  }, [bookings]);

  // ✅ Quick stats
  const totalBookings = bookings.length;
  const thisMonth = new Date().getMonth();
  const thisMonthBookings = bookings.filter(
    (b) => new Date(b.date).getMonth() === thisMonth
  ).length;
  const avgCrowd =
    totalBookings > 0
      ? Math.round(
          bookings.reduce((sum, b) => sum + (b.crowd_strength || 0), 0) /
            totalBookings
        )
      : 0;

  // ✅ Pagination
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return bookings.slice(start, end);
  }, [bookings, currentPage]);

  // ✅ Smart page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // pages before/after current
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === 2 ||
        i === totalPages ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        i === 3 && currentPage - delta > 4 ||
        i === totalPages - 2 && currentPage + delta < totalPages - 3
      ) {
        pages.push("...");
      }
    }
    // remove consecutive duplicate ellipsis
    return pages.filter((v, i, a) => !(v === "..." && a[i - 1] === "..."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-pink-400 tracking-wide">
          📸 Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          disabled={loadingLogout}
          className="bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-2 rounded-lg font-medium text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loadingLogout ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Loader */}
      {loadingPage && (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loadingPage && (
        <>
          {/* Error Message */}
          {error && <p className="text-red-400 text-center mb-6">{error}</p>}

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "Total Bookings", value: totalBookings },
              { title: "This Month", value: thisMonthBookings },
              { title: "Avg. Crowd", value: avgCrowd },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-pink-500/10 transition-all"
              >
                <h3 className="text-pink-300 text-sm uppercase tracking-wider mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mb-10 shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-4 text-pink-300">
              Monthly Booking Overview
            </h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="count" fill="#ec4899" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white/10 border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 text-pink-200 uppercase text-sm">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Venue</th>
                  <th className="px-4 py-3 text-center">Crowd</th>
                  <th className="px-4 py-3 text-center">About Couple</th>
                </tr>
              </thead>

              <tbody>
                {paginatedBookings.map((b) => (
                  <React.Fragment key={b.id}>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition">
                      <td className="px-4 py-3">{b.name}</td>
                      <td className="px-4 py-3">{b.email}</td>
                      <td className="px-4 py-3 capitalize">{b.event}</td>
                      <td className="px-4 py-3">
                        {new Date(b.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{b.city}</td>
                      <td className="px-4 py-3">{b.venue}</td>
                      <td className="px-4 py-3 text-center">{b.crowd_strength}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            setExpandedId(expandedId === b.id ? null : b.id)
                          }
                          className="text-pink-400 hover:text-pink-300 transition-all underline underline-offset-2"
                        >
                          {expandedId === b.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {expandedId === b.id && (
                      <tr className="bg-black/40 border-b border-white/10 transition-all duration-300">
                        <td colSpan="8" className="p-6">
                          <div className="text-gray-200 text-sm leading-relaxed">
                            <h4 className="text-pink-400 font-semibold mb-2">
                              About Couple
                            </h4>
                            <p className="text-base">{b.about_couple}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {bookings.length === 0 && !error && (
              <p className="text-center text-gray-400 py-8">
                No event bookings available yet.
              </p>
            )}

            {/* Pagination Controls */}
            {bookings.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-3 mt-4 mb-1 flex-wrap">
                {/* Left Arrow */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 bg-pink-600 text-white rounded disabled:opacity-50"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((p, idx) =>
                  p === "..." ? (
                    <span key={idx} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(p)}
                      className={`px-3 py-1 rounded ${
                        currentPage === p
                          ? "bg-pink-500 text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                {/* Right Arrow */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 bg-pink-600 text-white rounded disabled:opacity-50"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
