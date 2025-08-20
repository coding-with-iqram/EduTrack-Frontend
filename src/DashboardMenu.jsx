import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AcademicCapIcon,
  PencilIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import { GrMenu } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

export default function DashboardMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const [menuWidth, setMenuWidth] = useState("w-[320px]");

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth < 500 ? "w-[85vw]" : "w-[260px]";
      setMenuWidth(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const menuItems = [
    {
      path: "/quiz",
      icon: <AcademicCapIcon className="w-5 h-5 text-blue-700" />,
      label: "Start Quiz",
    },
    {
      path: "/notes",
      icon: <PencilIcon className="w-5 h-5 text-green-600" />,
      label: "My Notes",
    },
    {
      path: "/previous-questions",
      icon: <BookOpenIcon className="w-5 h-5 text-orange-600" />,
      label: "Previous Questions",
    },
    {
      path: "/suggested-videos",
      icon: <PlayIcon className="w-5 h-5 text-red-600" />,
      label: "Suggested Video",
    },
  ];

  return (
    <>
      {open ? (
        <div>
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="bg-white text-slate-800 border border-black/20 rounded-full px-3 py-3 text-xl cursor-pointer lg:mr-20 z-50"
            title="Close Menu"
          >
           <RxCross2 className="text-xl"></RxCross2>
          </button>

          {/* Menu */}
          <div
            ref={menuRef}
            className={`absolute top-28 right-7 md:right-28 bg-white text-gray-900 p-6 shadow-2xl flex flex-col rounded-3xl ${menuWidth}`}
          >
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li
                    key={item.path}
                    className={`rounded-lg transition-colors duration-150 py-1 ${
                      isActive
                        ? "bg-purple-600"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 px-3 py-1 w-full font-medium no-underline rounded-lg ${
                        isActive ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <span className="flex items-center">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                    
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        // Open Button
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-slate-800 border border-black/20 rounded-full px-3 py-3 text-xl cursor-pointer z-50 lg:mr-20"
          title="Open Dashboard"
        >
          <GrMenu className="text-xl"></GrMenu> 
        </button>
      )}
    </>
  );
}
