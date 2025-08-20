import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuizAnswerReview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!answers || !questions || answers.length === 0) {
    return <p className="text-center text-red-500 mt-10">No answers found.</p>;
  }

  const item = answers[currentIndex];
  const q = questions[currentIndex];
  const cleanedQuestion = item.question.replace(/^\d+\.\s*/, "");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.1)] p-8">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4 px-1">
          <span className="font-medium">{`Quiz Review`}</span>
          <span>{`Question ${currentIndex + 1} of ${questions.length}`}</span>
        </div>

        {/* Question */}
        <p className="text-base font-semibold mb-10 text-black">
          {`Q.${currentIndex + 1}`} {cleanedQuestion}
        </p>

        {/* Options */}
        <div className="flex flex-col items-center space-y-4 mb-10">
          {q.options.map((option, i) => {
            const isCorrect = option === item.correct;
            const isWrong = option === item.selected && option !== item.correct;

            let style =
              "bg-[#f5f5f5] border border-gray-300 text-gray-800 hover:cursor-default";
            if (isCorrect) {
              style =
                "bg-[#2ecc71] border border-[#2ecc71] text-white font-semibold";
            } else if (isWrong) {
              style =
                "bg-red-600 border border-red-600 text-white font-semibold";
            }

            return (
              <div
                key={i}
                className={`px-3 py-2 text-sm rounded-md w-full max-w-sm flex items-center gap-3 ${style}`}
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {isCorrect && (
                    <span className="w-5 h-5 rounded-sm bg-white border-2 border-[#2ecc71] flex items-center justify-center">
                      <span className="text-[#2ecc71] text-sm font-bold leading-none">
                        ✔
                      </span>
                    </span>
                  )}
                  {isWrong && (
                    <span className="w-5 h-5 rounded-sm bg-white border-2 border-red-600 flex items-center justify-center">
                      <span className="text-red-600 text-sm font-bold leading-none">
                        ✖
                      </span>
                    </span>
                  )}
                  {!isCorrect && !isWrong && (
                    <span className="inline-block w-5 h-5 rounded-sm border border-gray-400"></span>
                  )}
                </span>
                <span>{option.replace(/^[a-d]\)\s*/i, "")}</span>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
            className="w-32 px-4 py-2 rounded-full border border-gray-400 text-gray-800 font-medium hover:bg-gray-100 transition disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              currentIndex === answers.length - 1
                ? navigate("/quiz")
                : setCurrentIndex((prev) => prev + 1)
            }
            className={`w-32 px-4 py-2 rounded-full font-medium transition ${
              currentIndex === answers.length - 1
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {currentIndex === answers.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      {/* Start Quiz Again (Outside the Box) */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/quiz")}
          className="px-6 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 shadow-lg shadow-purple-300 transition"
        >
          Start Quiz Again
        </button>
      </div>
    </div>
  );
}

export default QuizAnswerReview;
