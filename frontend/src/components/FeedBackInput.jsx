import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const FeedBackInput = ({
  onNextStep,
  onPreviousStep,
  updateFeedbackData,
  initialText,
}) => {
  const [text, setText] = useState(initialText || "");
  const [error, setError] = useState("");

  useEffect(() => {
    updateFeedbackData({ improvementText: text });
  }, [text, updateFeedbackData]);

  const handleNext = () => {
    if (text.length > 500) {
      setError("Opinion cannot exceed 500 characters.");
      return;
    }
    onNextStep();
  };

  return (
    <div className=" bg-gray-900 rounded-lg px-6 py-5 border-4 border-gray-200">
      <div className="flex justify-start items-center mb-2">
        <button
          className="text-pri-color hover:text-pri-color flex items-center gap-2"
          onClick={onPreviousStep}
        >
          <IoArrowBackOutline /> <span style={{ color: "#ffb000" }}>Back</span>
        </button>
      </div>

      <h2 className="font-bold mb-4">Tell us a bit more</h2>
      <p className="text-sm text-gray-500 mb-4">
        What could we improve? You can type up to 500 characters. (Optional)
      </p>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
        maxLength={500}
        rows={5}
        className="w-full p-3 border rounded-lg outline-none text-gray-600 bg-gray-200"
        placeholder="Type your feedback here..."
      />

      <div className="flex justify-between mt-2">
        <p className="text-sm text-gray-400">{text.length}/500</p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <button
        className="bg-gray-500 hover:bg-yellow-500 text-white py-2 px-6 rounded-lg mt-4"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default FeedBackInput;
