// ✅ Home.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  PencilIcon,
  BookOpenIcon,
  PlayIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-16 px-1 flex items-center justify-center">
      {/* 🔹 Fixed Dashboard Toggle Button */}

      {/* 🔸 Main Content Cards */}
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center drop-shadow-md">
          Let’s Get Started ✨
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link
            to="/quiz"
            className="bg-white/80 backdrop-blur-lg border border-blue-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
          >
            <AcademicCapIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-blue-700 mb-1">
              Start Quiz
            </h2>
            <p className="text-gray-700 text-sm">
              Sharpen your skills with interactive tests.
            </p>
          </Link>

          <Link
            to="/notes"
            className="bg-white/80 backdrop-blur-lg border border-green-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
          >
            <PencilIcon className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-1">
              My Notes
            </h2>
            <p className="text-gray-700 text-sm">
              Save summaries, formulas, or concepts in your own style.
            </p>
          </Link>

          <Link
            to="/previous-questions"
            className="bg-white/80 backdrop-blur-lg border border-yellow-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
          >
            <BookOpenIcon className="w-12 h-12 text-yellow-600 mb-4" />
            <h2 className="text-xl font-semibold text-yellow-700 mb-1">
              Previous Questions
            </h2>
            <p className="text-gray-700 text-sm">
              Practice with actual past board questions to gain confidence.
            </p>
          </Link>

          <Link
            to="/suggested-videos"
            className="bg-white/80 backdrop-blur-lg border border-orange-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
          >
            <PlayIcon className="w-12 h-12 text-orange-600 mb-4" />
            <h2 className="text-xl font-semibold text-orange-700 mb-1">
              Suggested Video
            </h2>
            <p className="text-gray-700 text-sm">
              Watch selected videos to boost your concept.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}