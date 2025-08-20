import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

// const commonBackground = "bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#c7d2fe]";
// const commonBackground = "bg-[#ffff]";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [animateQuestion, setAnimateQuestion] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetch(
          "https://exam-preparation.glitch.me/api/quizzes"
        );
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Quiz load failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, []);

  useEffect(() => {
    if (showScore) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [showScore]);

  useEffect(() => {
    if (showScore || isLoading || questions.length === 0) return;

    let start = Date.now();
    const duration = 10000; // 10 seconds
    const tickInterval = 50; // update every 50ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        handleAnswer(null);
      }
    }, tickInterval);

    return () => clearInterval(interval);
  }, [currentQuestion, showScore, isLoading]);

  useEffect(() => {
    const previous = answers[currentQuestion]?.selected || null;
    setSelectedOption(previous);
  }, [currentQuestion]);

  const handleAnswer = (selected) => {
    const currentQ = questions[currentQuestion];
    const isCorrect =
      selected &&
      selected.trim().toLowerCase() ===
        currentQ.correctAnswer.trim().toLowerCase();

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = {
        question: currentQ.question,
        selected,
        correct: currentQ.correctAnswer,
      };
      return updated;
    });

    if (
      isCorrect &&
      answers[currentQuestion]?.selected?.trim().toLowerCase() !==
        currentQ.correctAnswer.trim().toLowerCase()
    ) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(next);
        setTimeLeft(10);
        setAnimateQuestion(true);
      }, 300);
    } else {
      setTimeout(() => setShowScore(true), 300);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
    setSelectedOption(null);
    setTimeLeft(10);
    setAnimateQuestion(true);
  };

  const currentQ = questions[currentQuestion];
  const progress =
    ((currentQuestion + (answers[currentQuestion]?.selected ? 1 : 0)) /
      questions.length) *
    100;
  // const timerProgress = (timeLeft / 10) * 100;

  if (isLoading || questions.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-screen`}>
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-indigo-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 `}
    >
      <div className="max-w-xl w-full font-sans">
        {!showScore && (
          <div className="w-full h-2 bg-indigo-100 rounded mt-[2px] mb-4">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                backgroundColor: "#6366f1",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
          {showScore ? (
            <>
              <div className="flex justify-center">
                <img
                  src="/icon.jpg"
                  alt="Score Icon"
                  className="w-60 sm:w-72 mb-4 rounded-lg"
                />
              </div>

              <div className="w-full max-w-[120px] mx-auto bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-md px-2.5 py-2 text-center mb-6 border border-indigo-300">
                <p className="text-xs font-bold text-white tracking-wide uppercase drop-shadow-sm">
                  Your Score
                </p>
                <h2 className="text-3xl font-extrabold text-white mt-1 drop-shadow">
                  {score} / {questions.length}
                </h2>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  onClick={() =>
                    navigate("/answers", { state: { answers, questions } })
                  }
                  className="px-4 py-1.5 border border-indigo-500 bg-white text-black font-semibold rounded-full hover:bg-indigo-50 transition"
                >
                  See Correct Answer
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={restartQuiz}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Start Again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start mb-2 text-indigo-700 text-xs font-medium">
                <span>
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span>Time: {Math.ceil(timeLeft)}s</span>
              </div>

              <div className="w-full h-2 bg-pur-100 rounded mb-6">
                <div
                  className="h-full transition-all duration-100"
                  style={{
                    width: `${(timeLeft / 10) * 100}%`,
                    backgroundColor: "#A855F7",
                  }}
                />
              </div>

              <h3
                className={`text-lg font-bold mb-6 pl-4 text-indigo-900 transition-opacity duration-500 ${
                  animateQuestion ? "opacity-100" : "opacity-0"
                }`}
                onAnimationEnd={() => setAnimateQuestion(false)}
              >
                {currentQ.question}
              </h3>

              <div className="flex flex-col items-center space-y-3 mt-4">
                {currentQ.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`w-full max-w-xs flex items-center gap-4 px-3 py-1.5 border rounded-md cursor-pointer transition text-sm ${
                      selectedOption === option
                        ? "bg-indigo-100 border-indigo-400"
                        : "bg-white border-gray-300 hover:bg-indigo-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="form-checkbox text-indigo-600 h-4 w-4 transition-transform duration-200"
                    />
                    <span className="text-gray-800">
                      {option.replace(/^[a-d]\)\s*/i, "")}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  disabled={currentQuestion === 0}
                  className="w-[120px] px-6 py-2 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleAnswer(selectedOption)}
                  disabled={!selectedOption}
                  className={`w-[120px] px-6 py-2 rounded-full transition font-medium ${
                    selectedOption
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 animate-pulse"
                      : "bg-indigo-300 text-white opacity-60 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
