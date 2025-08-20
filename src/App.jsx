import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import Quiz from "./Quiz";
import Notes from "./Notes";
import PreviousQuestions from "./PreviousQuestions";
import QuizAnswerReview from "./QuizAnswerReview";
import SuggestedVideo from "./SuggestedVideo";
import Layout from "./Layout";
import Navbar from "./Navbar";
import "./index.css";
import OnboardingSurvey from "./OnboardingSurvey";
import InlineThankYou from "./InlineThankYou";
import VideoPlayer from "./VideoPlayer"; // নতুন ইম্পোর্ট
import BakashiboPage from "./BakashiboPage"; // নতুন পেইজ import

const SurveyWrapper = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleComplete = () => {
    localStorage.setItem("surveyCompleted", "true");
    const result = onComplete();
    console.log("Received from onComplete:", result);
    navigate("/thank-you");
  };

  return <OnboardingSurvey onDone={handleComplete} />;
};

function AppContent() {
  const location = useLocation();
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouData, setThankYouData] = useState(null);

  useEffect(() => {
    fetch("https://exam-preparation.glitch.me").catch((err) =>
      console.log("Server wake-up failed", err)
    );

    const isSurveyComplete = localStorage.getItem("surveyCompleted");
    if (!isSurveyComplete && location.pathname !== "/onboarding") {
      window.location.href = "/onboarding";
    }

    if (location.pathname === "/thank-you") {
      setShowThankYou(true);
    } else {
      setShowThankYou(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="">
        <Routes>
          <Route
            path="/onboarding"
            element={
              <SurveyWrapper
                onComplete={(data) => {
                  setShowThankYou(true);
                  setThankYouData(data);
                  return data;
                }}
              />
            }
          />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="notes" element={<Notes />} />
            <Route path="previous-questions" element={<PreviousQuestions />} />
            <Route path="answers" element={<QuizAnswerReview />} />
            <Route path="suggested-videos" element={<SuggestedVideo />} />
            <Route path="video/:idx" element={<VideoPlayer />} />
            {/* নতুন Bakashibo পেইজ route */}
            <Route path="bakashibo/:year" element={<BakashiboPage />} />
            <Route path="/thank-you" element={<></>} />
          </Route>
        </Routes>
      </div>

      {showThankYou && <InlineThankYou data={thankYouData} />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
