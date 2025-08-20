import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaEdit, FaTrashAlt } from "react-icons/fa";

// সব ভিডিও একত্রে
const allVideos = [
  // Kotlin Videos
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

  // C++ Videos
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

export default function VideoPlayer() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const videoIndex = parseInt(idx, 10);
  const video = allVideos[videoIndex];

  const [showNotePopup, setShowNotePopup] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" });
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const [dragPos, setDragPos] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleDragStart = e => {
    setDragging(true);
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    dragOffset.current = {
      x: clientX - (dragPos.x ?? window.innerWidth / 2),
      y: clientY - (dragPos.y ?? 120),
    };
    document.body.style.userSelect = "none";
  };

  const handleDrag = e => {
    if (!dragging) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    setDragPos({
      x: clientX - dragOffset.current.x,
      y: clientY - dragOffset.current.y,
    });
  };

  const handleDragEnd = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDrag);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [dragging]);

  const saveNote = () => {
    if (!note.title.trim()) return;
    const isEdit = notes.includes(note);
    if (isEdit) {
      setNotes(prev => prev.map(n => (n === note ? { ...note } : n)));
    } else {
      setNotes(prev => [...prev, note]);
    }
    setNote({ title: "", description: "" });
    setShowNotePopup(false);
  };

  const deleteNote = target => {
    setNotes(prev => prev.filter(n => n !== target));
    setSelectedNote(null);
  };

  if (!video) return <div className="p-8 text-center">Video not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 relative">

      {/* View Note Popup */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90vw] max-w-sm shadow-lg">
            <h4 className="text-xl font-semibold text-black mb-2">{selectedNote.title}</h4>
            <p className="text-gray-600 whitespace-pre-line mb-4">{selectedNote.description}</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                onClick={() => {
                  setNote(selectedNote);
                  setShowNotePopup(true);
                  setSelectedNote(null);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => deleteNote(selectedNote)}
              >
                <FaTrashAlt />
              </button>
              <button
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 text-sm"
                onClick={() => setSelectedNote(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Popup */}
      {showNotePopup && (
        <div
          className="fixed top-28 left-1/2 -translate-x-1/2 w-[90vw] max-w-xs bg-white rounded-xl shadow-lg p-5 z-50 flex flex-col gap-3"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Take Note</span>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 text-xl font-bold"
              onClick={() => setShowNotePopup(false)}
            >
              ×
            </button>
          </div>
          <input
            type="text"
            placeholder="Note title"
            value={note.title}
            onChange={e => setNote({ ...note, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            placeholder="Note description"
            value={note.description}
            onChange={e => setNote({ ...note, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={4}
          />
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-full mx-auto mt-4 hover:bg-indigo-700 transition font-semibold"
            onClick={saveNote}
          >
            Save Note
          </button>
        </div>
      )}

      {/* Video Player */}
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center relative">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">{video.title}</h2>
        <div className="w-full h-0 pb-[56.25%] relative mb-6 rounded-lg overflow-hidden shadow">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Floating Pencil Icon */}
          <button
            className="hidden md:flex absolute top-4 right-4 bg-white border border-indigo-600 rounded-full p-3 shadow items-center justify-center transition-all duration-200 hover:scale-110 z-20"
            onClick={() => setShowNotePopup(prev => !prev)}
          >
            <FaPencilAlt className="text-indigo-600 text-2xl" />
          </button>

          <button
            className="md:hidden fixed bottom-6 right-6 bg-indigo-600 border border-indigo-600 rounded-full p-3 shadow flex items-center justify-center z-30 transition-all duration-200
                      hover:scale-110"
          onClick={() => setShowNotePopup(prev => !prev)}
          >
            <FaPencilAlt className="text-white text-2xl" />
          </button>
        </div>

        {/* Previous / Next Buttons */}
        <div className="flex justify-between w-full mt-6">
          <button
            disabled={videoIndex === 0}
            onClick={() => navigate(`/video/${videoIndex - 1}`)}
            className={`px-6 py-2 rounded-full border transition-transform duration-200 ${
              videoIndex === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-purple-700 hover:bg-purple-700 hover:text-white hover:scale-110"
            }`}
          >
            Previous
          </button>
          <button
            disabled={videoIndex === allVideos.length - 1}
            onClick={() => navigate(`/video/${videoIndex + 1}`)}
            className={`px-6 py-2 rounded-full border transition-transform duration-200 ${
              videoIndex === allVideos.length - 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-purple-700 hover:bg-purple-700 hover:text-white hover:scale-110"
            }`}
          >
            Next
          </button>
        </div>

        {/* Back Button */}
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-2 bg-white border border-purple-700 text-purple-700 rounded-full font-semibold hover:bg-purple-700 hover:text-white transition-transform duration-200 hover:scale-110"
          >
            Back
          </button>
        </div>
      </div>

      {/* Notes Section */}
      {notes.length > 0 && (
        <div className="w-full max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">Your Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((n, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h4 className="text-md font-bold text-black mb-4">{n.title}</h4>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 text-sm"
                    onClick={() => setSelectedNote(n)}
                    aria-label="View Note"
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    onClick={() => {
                      setNote(n);
                      setShowNotePopup(true);
                    }}
                    aria-label="Edit Note"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={() => deleteNote(n)}
                    aria-label="Delete Note"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
