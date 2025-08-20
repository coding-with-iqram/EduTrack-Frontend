import React from "react";
import { useNavigate } from "react-router-dom";

const InlineThankYou = ({ data }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // 🔁 Go to Home page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md text-center">

        {/* ❌ Cross button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
          title="Close"
        >
          ×
        </button>

        <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-700 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-700 text-base sm:text-lg">
          Hello{" "}
          <strong>
            {data?.favoriteSubject || "User"}
          </strong>
          . Welcome to <strong>EduTrack</strong>.<br />
          <span className="block mt-2">
            Progress, not perfection. Stay consistent, and success will follow.
          </span>
        </p>

        {data?.mainGoal && (
          <p className="mt-4 text-sm text-gray-500">
            Your goal: <em>{data.mainGoal}</em>
          </p>
        )}
      </div>
    </div>
  );
};

export default InlineThankYou;
