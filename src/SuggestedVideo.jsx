import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";

export default function SuggestedVideo() {
  const kotlinVideos = [
    {
      title: "What is Kotlin? Introduction To Kotlin Tutorial | CheezyCode #1",
      url: "https://www.youtube.com/embed/vhfzN69ALpY?si=goOEin9SqGUMLqdR",
    },
    {
      title: "Kotlin - Development Environment Setup | CheezyCode #2",
      url: "https://www.youtube.com/embed/1RuNijeB_yc?si=xLJs6kBBoS4eKYxT",
    },
    {
      title: "Kotlin - Hello World Program | CheezyCode #3",
      url: "https://www.youtube.com/embed/IdeqQE_POXo?si=FhVRHH7lG1rNZjXz",
    },
  ];

  const cppVideos = [
    {
      title: "Lecture 1: Flowchart & Pseudocode | C++ DSA Series",
      url: "https://www.youtube.com/embed/VTLCoHnyACE?si=Q9-CqiqOnQj6V2ZR",
    },
    {
      title: "Lecture 2: Variables, Data Types & Operators | C++ DSA",
      url: "https://www.youtube.com/embed/Dxu7GKtdbnA?si=-j_9ucqlJhQk1KFj",
    },
    {
      title: "Lecture 3: Conditionals & Loops | C++ DSA",
      url: "https://www.youtube.com/embed/qR9U6bKxJ7g?si=v_KhapOgsg3ZEy83",
    },
  ];

  const allVideos = [...kotlinVideos, ...cppVideos];

  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const videoRefs = useRef({});
  const isDesktop = window.innerWidth >= 768;

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - popupPos.x,
      y: e.clientY - popupPos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPopupPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const openPopupNextToVideo = (videoIndex) => {
    const videoElement = videoRefs.current[videoIndex];
    if (videoElement && isDesktop) {
      const rect = videoElement.getBoundingClientRect();
      setPopupPos({
        x: rect.right + 10,
        y: rect.top,
      });
    } else {
      setPopupPos({
        x: window.innerWidth / 2 - 160,
        y: window.innerHeight / 2 - 100,
      });
    }
    setActiveVideo(videoIndex);
  };

  const VideoSection = ({ title, videos, offset }) => (
    <div className="mb-16 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-6 text-center">
        {title}
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, idx) => {
          const videoIndex = offset + idx;
          return (
            <div
              key={videoIndex}
              ref={(el) => (videoRefs.current[videoIndex] = el)}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/video/${videoIndex}`)}
              >
                <div className="w-full h-0 pb-[56.25%] relative">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="text-md font-medium text-gray-800">{video.title}</p>
                </div>
              </div>

              {/* Notes Icon - only for active video */}
              {activeVideo === videoIndex && (
                <div className="px-4 pb-3 flex justify-end gap-4 text-purple-600">
                  <button title="View"><FaEye /></button>
                  <button title="Notes" onClick={() => openPopupNextToVideo(videoIndex)}>
                    <FaPen />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const handlePrevNext = (direction) => {
    setActiveVideo((prev) => {
      const newIndex = direction === "prev" ? prev - 1 : prev + 1;
      if (newIndex >= 0 && newIndex < allVideos.length) {
        openPopupNextToVideo(newIndex);
        return newIndex;
      }
      return prev;
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-purple-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Boost your understanding of Kotlin and C++ with these hand-picked videos.
        </p>
        <VideoSection title="🚀 Kotlin Tutorials" videos={kotlinVideos} offset={0} />
        <VideoSection title="🧠 C++ DSA Series" videos={cppVideos} offset={kotlinVideos.length} />
      </div>

      {/* Notes Popup */}
      {activeVideo !== null && (
        <div
          className="fixed z-50 bg-white border shadow-xl rounded-lg w-[320px] p-4"
          style={{
            top: popupPos.y,
            left: popupPos.x,
            cursor: "move",
          }}
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-semibold mb-2">📝 Notes for Video #{activeVideo + 1}</h3>
          <textarea
            rows={5}
            className="w-full border rounded p-2 text-sm"
            placeholder="Write your notes here..."
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePrevNext("prev")}
              disabled={activeVideo === 0}
              className={`px-4 py-2 rounded-md font-medium transition-transform duration-200 ${
                activeVideo === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:scale-105"
              }`}
            >
              ⬅ Previous
            </button>
            <button
              onClick={() => handlePrevNext("next")}
              disabled={activeVideo === allVideos.length - 1}
              className={`px-4 py-2 rounded-md font-medium transition-transform duration-200 ${
                activeVideo === allVideos.length - 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:scale-105"
              }`}
            >
              Next ➡
            </button>
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setActiveVideo(null)}
              className="text-sm text-red-500 hover:underline"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
