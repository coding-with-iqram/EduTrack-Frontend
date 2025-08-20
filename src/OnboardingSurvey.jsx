import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    name: "level",
    label: "1. What is your current level/class?",
    options: ["Admission Test", "Mid Exam", "Diploma Exam"],
  },
  {
    name: "favoriteSubject",
    label: "2. What is your favorite subject?",
    options: ["App Development", "Cyber Security", "English", "Microproccessor"],
  },
  {
    name: "mainGoal",
    label: "3. What is your main goal for using this app?",
    options: [
      "To do well in board exams",
      "Admission test preparation",
      "Job exam preparation",
      "For general learning",
      "Others",
    ],
  },
  {
    name: "studyHours",
    label: "4. How many hours do you study daily?",
    options: ["Less than 1 hour", "1–2 hours", "2–4 hours", "More than 4 hours"],
  },
  {
    name: "learningStyle",
    label: "5. What is your preferred learning style?",
    options: [
      "Quizzes / Model Tests",
      "Notes / Flashcards",
      "Video Tutorials",
      "End-of-chapter revision",
    ],
  },
  {
    name: "contentPreference",
    label: "6. What type of content do you prefer?",
    options: [
      "Text-based (notes/eBooks)",
      "Video tutorials",
      "Audio lectures",
      "Interactive quizzes/games",
      "Live classes or webinars",
    ],
  },
];

const OnboardingSurvey = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const containerRef = useRef(null);

  const currentQuestion = questions[currentStep];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const updatedData = {
      ...formData,
      [currentQuestion.name]: selectedOption,
    };

    setFormData(updatedData);

    const nextStep = currentStep + 1;

    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
      setSelectedOption("");
    } else {
      localStorage.setItem("surveyCompleted", "true");

      if (onComplete) {
        onComplete(updatedData); // ✅ send collected data to parent
      }

      navigate("/thank-you");
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-900 flex flex-col items-center justify-center px-4"
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
        <h2 className="text-lg font-semibold mb-4 text-indigo-700">
          {currentQuestion.label}
        </h2>
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 rounded-lg border text-left ${
                selectedOption === option
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            {currentStep === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSurvey;
