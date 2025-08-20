import React from "react";
import { useParams } from "react-router-dom";
import { VeryShortQuestions, ShortQuestions, BroadQuestions } from "./prevques";

function BakashiboPage() {
  const { year } = useParams();
  const selectedYear = parseInt(year);

  // filter questions by year
  const filterByYear = (questions) =>
    questions.filter((q) => q.years.includes(selectedYear));

  const veryShort = filterByYear(VeryShortQuestions);
  const short = filterByYear(ShortQuestions);
  const broad = filterByYear(BroadQuestions);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Bakashibo {year}
      </h1>

      {/* Very Short Questions */}
      {veryShort.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Very Short Questions</h3>
          {veryShort.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded shadow-sm">
              <p className="font-medium">Q{index + 1}. {q.question}</p>
              <p className="text-gray-700 whitespace-pre-line mt-1">Answer: {q.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Short Questions */}
      {short.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Short Questions</h3>
          {short.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded shadow-sm">
              <p className="font-medium">Q{index + 1}. {q.question}</p>
              <p className="text-gray-700 whitespace-pre-line mt-1">Answer: {q.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Broad Questions */}
      {broad.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Broad Questions</h3>
          {broad.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded shadow-sm">
              <p className="font-medium">Q{index + 1}. {q.question}</p>
              <p className="text-gray-700 whitespace-pre-line mt-1">Answer: {q.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BakashiboPage;
