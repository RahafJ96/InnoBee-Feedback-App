import React, { useState, useEffect } from "react";

const FeedbackBar = ({ onNextStep, updateFeedbackData, initialRating }) => {
  const [rating, setRating] = useState(initialRating || null);

  useEffect(() => {
    if (rating !== null) {
      updateFeedbackData({ rating });
    }
  }, [rating, updateFeedbackData]);

  const handleSelect = (value) => {
    setRating(value);
  };

  const handleNext = () => {
    if (rating !== null) {
      onNextStep();
    } else {
      alert("Please select a rating before continuing.");
    }
  };

  return (
    <div className=" bg-gray-900 rounded-lg px-6 py-5 border-4 border-gray-200">
      <h2 className="font-bold mb-4">How was your experience?</h2>
      <p className="text-sm text-gray-500 mb-6">
        Select a rating from 1 (poor) to 5 (excellent).
      </p>

      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold border-2  bg-gray-900
              ${
                rating === num
                  ? "bg-yellow-400 text-white border-yellow-500"
                  : "bg-gray-400 border-gray-300 hover:bg-gray-600"
              }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        className="bg-gray-500 hover:bg-yellow-500 text-white py-2 px-6 rounded-lg"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default FeedbackBar;
