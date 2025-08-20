import React, { useState } from "react";
import { ShortQuestions, VeryShortQuestions, BroadQuestions } from "./prevques";

function PreviousQuestions() {
  const [selectedType, setSelectedType] = useState("veryshort");
  const [selectedYear, setSelectedYear] = useState(null);
  const [showAnswers, setShowAnswers] = useState({});

  const handleToggleAnswer = (index) => {
    setShowAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderQuestionCard = (q, index) => (
    <div
      key={index}
      className="question-card-custom p-6 border rounded-xl mb-6 shadow-md bg-white min-h-[140px] flex flex-col justify-between relative"
    >
      {/* Desktop/Tablet Bakashibo */}
      <span className="hidden sm:block absolute top-7 right-4 text-sm font-semibold text-black bg-white-600 px-2 py-1 rounded">
        [Bakashibo- {q.years.join(", ")}]
      </span>

      {/* Question */}
      <p className="font-semibold text-lg mb-2">
        Q{index + 1}. {q.question}{" "}
        {/* Mobile Bakashibo at the end of question */}
        <span className="sm:hidden text-sm font-semibold text-black bg-white-600 px-2 py-1 rounded">
          [Bakashibo- {q.years.join(", ")}]
        </span>
      </p>

      {/* Answer */}
      {showAnswers[index] && (
        <p className="text-gray-700 whitespace-pre-line mt-4 mb-2">
          Answer: {q.answer}
        </p>
      )}

      {/* See Answer Button */}
      <div
        className="see-answer-btn self-end flex items-center gap-1 cursor-pointer select-none mt-2"
        onClick={() => handleToggleAnswer(index)}
      >
        <span className="see-answer-text font-medium text-black">
          See Answer
        </span>
        <span className="see-answer-arrow">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M5 7L9 11L13 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );

  // প্রশ্ন ফিল্টার করা
  const getFilteredQuestions = (questions) => {
    if (!selectedYear) return questions;
    return questions.filter((q) => q.years.includes(selectedYear));
  };

  // Dynamic years list (prevques থেকে সব বছর একত্রিত করা)
  const allYears = Array.from(
    new Set(
      [...VeryShortQuestions, ...ShortQuestions, ...BroadQuestions].flatMap(
        (q) => q.years
      )
    )
  ).sort();

  return (
    <div className="previous-questions p-4 max-w-3xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-2 text-center">
        Previous Questions
      </h2>
      <p className="mb-6 text-gray-700 text-center">
        Here you can view all your previous questions and answers categorized by
        type.
      </p>

      {/* Year Select Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {allYears.map((year) => (
          <button
            key={year}
            className={`px-6 py-2 rounded-full transition-all duration-300
              ${
                selectedYear === year
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }
              hover:shadow-xl hover:scale-110 hover:-translate-y-1 transform
            `}
            onClick={() => setSelectedYear(year)}
          >
            Bakashibo {year}
          </button>
        ))}
      </div>

      {/* Type Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300
            ${
              selectedType === "veryshort"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }
            hover:shadow-xl hover:scale-110 hover:-translate-y-1 transform
          `}
          onClick={() => setSelectedType("veryshort")}
        >
          Very Short
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300
            ${
              selectedType === "short"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }
            hover:shadow-xl hover:scale-110 hover:-translate-y-1 transform
          `}
          onClick={() => setSelectedType("short")}
        >
          Short
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-all duration-300
            ${
              selectedType === "broad"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }
            hover:shadow-xl hover:scale-110 hover:-translate-y-1 transform
          `}
          onClick={() => setSelectedType("broad")}
        >
          Broad
        </button>
      </div>

      {/* Sections */}
      {selectedType === "veryshort" && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Very Short Questions</h3>
          {getFilteredQuestions(VeryShortQuestions).map(renderQuestionCard)}
        </section>
      )}

      {selectedType === "short" && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Short Questions</h3>
          {getFilteredQuestions(ShortQuestions).map(renderQuestionCard)}
        </section>
      )}

      {selectedType === "broad" && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Broad Questions</h3>
          {getFilteredQuestions(BroadQuestions).map(renderQuestionCard)}
        </section>
      )}
    </div>
  );
}

export default PreviousQuestions;
