// src/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  const location = useLocation();

  // নিচের লাইনটি কমেন্ট করে দিলাম, এখন Navbar সব জায়গায় দেখা যাবে
  // const hideNavbarRoutes = ["/onboarding"];
  // const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-900 transition-colors duration-300">
      {/* Navbar সব রুটে দেখাবে */}
      {/* {!hideNavbar && <Navbar />} */}
      <Navbar />

      <main className="px-4 py-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
