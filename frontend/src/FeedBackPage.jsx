import React, { useState, useCallback } from "react";
import axios from "axios";
import FeedbackBar from "./components/FeedbackBar";
import FeedBackInput from "./components/FeedBackInput";
import FeedBackInterest from "./components/FeedBackInterest";
import FeedBackThanks from "./components/FeedBackThanks";

const FeedBackPage = () => {
  const [feedbackState, setFeedbackState] = useState(1);
  const [feedbackData, setFeedbackData] = useState({
    rating: null,
    improvementText: "",
    interestedInResearch: null,
    email: "",
  });
  const [progress, setProgress] = useState(0); // Basic progress indicator
  const totalSteps = 3; // Corrected total number of interactive steps

  const updateFeedbackData = useCallback((data) => {
    setFeedbackData((prevData) => ({ ...prevData, ...data }));
  }, []);

  const handleNext = () => {
    if (feedbackState < totalSteps) {
      setFeedbackState((prevState) => prevState + 1);
      setProgress(((feedbackState + 1) / totalSteps) * 100); // Corrected progress calculation
    } else if (feedbackState === totalSteps) {
      // Move to the thank you page after the last interactive step
      setFeedbackState(4);
      setProgress(100);
    }
  };

  const handlePrevious = () => {
    if (feedbackState > 1) {
      setFeedbackState((prevState) => prevState - 1);
      setProgress(((feedbackState - 2) / totalSteps) * 100); // Corrected progress calculation
    }
  };

  const handleFinish = async () => {
    // In a real application, you would submit the feedback here
    try {
      const payload = {
        rating: feedbackData.rating,
        opinion: feedbackData.improvementText || "",
        interestedInResearch: feedbackData.interestedInResearch || false,
        email: feedbackData.email || "",
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/api/feedback",
        payload
      );

      console.log("Submitted:", response.data);
      setFeedbackState(4); // Thank You page
      setProgress(100);
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  const handleStartNewFeedback = () => {
    setFeedbackState(1);
    setFeedbackData({
      rating: null,
      improvementText: "",
      interestedInResearch: null,
      email: "",
    });
    setProgress(0);
  };

  return (
    <div>
      <h4 className="mt-6 text-lg text-gray-300 font-semibold">
        Give feedback
      </h4>
      <p className="text-gray-400 mb-10">
        Help us improve InnoBee for everyone.
      </p>
      <div className="max-w-sm md:max-w-none mx-auto">
        {/* Progress Indicator */}
        {feedbackState < 4 && feedbackState >= 1 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-300 to-pri-color h-2 rounded-full"
              style={{ width: `${(feedbackState / totalSteps) * 100}%` }}
            ></div>
          </div>
        )}

        {feedbackState === 1 && (
          <FeedbackBar
            onNextStep={handleNext}
            updateFeedbackData={updateFeedbackData}
            initialRating={feedbackData.rating} // Pass down the current rating if going back
          />
        )}
        {feedbackState === 2 && (
          <FeedBackInput
            onNextStep={handleNext}
            onPreviousStep={handlePrevious}
            updateFeedbackData={updateFeedbackData}
            initialText={feedbackData.improvementText} // Pass down the current text if going back
          />
        )}
        {feedbackState === 3 && (
          <FeedBackInterest
            onFinish={handleFinish}
            onPreviousStep={handlePrevious}
            updateFeedbackData={updateFeedbackData}
            initialInterest={feedbackData.interestedInResearch} // Pass down the current interest if going back
          />
        )}
        {feedbackState === 4 && (
          <FeedBackThanks onStartNewFeedback={handleStartNewFeedback} />
        )}
      </div>
    </div>
  );
};

export default FeedBackPage;
