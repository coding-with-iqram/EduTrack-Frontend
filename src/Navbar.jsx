import React from "react";
import { Link } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";
import InstallPrompt from "./InstallPrompt";

const Navbar = ({ hideMenu = false }) => {
  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo linked to home */}
      <div>
        <Link
          to="/"
          className="logo flex items-center lg:ml-16 transition-all duration-300 ease-out hover:scale-110"
        >
          <img
            src="/mortarboard.png"
            alt="EduTrack Logo"
            className="logo-icon w-10 h-10"
          />
          <span className="logo-text text-2xl font-bold text-indigo-700 ml-2">
            EduTrack
          </span>
        </Link>
      </div>

      {/* Conditional menu toggle button */}
      {!hideMenu && (
        <div className="flex items-center gap-4 lg:gap-6">
          <InstallPrompt></InstallPrompt>
          <DashboardMenu />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
