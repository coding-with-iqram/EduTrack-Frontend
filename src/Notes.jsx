import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [viewNote, setViewNote] = useState(null);

  const API_BASE = "https://edu-track-backend-jade.vercel.app";

  const fetchNotes = () => {
    fetch(`${API_BASE}/notes`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to fetch notes:", err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    const { title, description } = newNote;
    if (!title || !description) return;

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_BASE}/note/${editingId}`
      : `${API_BASE}/note`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then(() => {
        fetchNotes();
        setEditingId(null);
        setNewNote({ title: "", description: "" });
      })
      .catch((err) =>
        console.error(editingId ? "Failed to update note:" : "Failed to add note:", err)
      );
  };

  const handleDeleteNote = (id) => {
    fetch(`${API_BASE}/note/${id}`, { method: "DELETE" })
      .then(() => fetchNotes())
      .catch((err) => console.error("Failed to delete note:", err));
  };

  const handleEditNote = (note) => {
    setNewNote({ title: note.title, description: note.description });
    setEditingId(note._id);
  };

  const handleViewNote = (note) => {
    setViewNote(note);
  };

  const closeViewModal = () => {
    setViewNote(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        My Notes
      </h2>

      {/* Input Box */}
      <div className="bg-gray-50 p-6 rounded-xl shadow space-y-4 mb-8 w-full sm:w-2/4 mx-auto">
        <input
          type="text"
          placeholder="Note title"
          value={newNote.title}
          onChange={(e) =>
            setNewNote({ ...newNote, title: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          placeholder="Note description"
          value={newNote.description}
          onChange={(e) =>
            setNewNote({ ...newNote, description: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-center">
          <button
            onClick={handleAddNote}
            className="bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700 transition font-semibold"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`p-4 rounded-xl border bg-white hover:shadow-md transition flex flex-col justify-between ${
                editingId === note._id ? "ring-2 ring-indigo-300" : ""
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                  {note.description}
                </p>
              </div>

              {/* Right-Aligned Oval Buttons */}
              <div className="mt-4 flex justify-end gap-2 flex-wrap">
                {/* View - Full Purple */}
                <button
                  onClick={() => handleViewNote(note)}
                  className="flex items-center gap-2 px-4 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition text-sm"
                >
                  <FaEye /> View
                </button>

                {/* Edit - Icon Only, Blue */}
                <button
                  onClick={() => handleEditNote(note)}
                  className="p-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                  title="Edit"
                >
                  <FaEdit />
                </button>

                {/* Delete - Icon Only, Red */}
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="p-2 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Note Modal */}
      {viewNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {viewNote.title}
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {viewNote.description}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;