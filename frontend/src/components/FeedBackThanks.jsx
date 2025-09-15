import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

const FeedBackThanks = ({ onStartNewFeedback }) => {
  return (
    <div className=" bg-gray-900 rounded-lg px-6 py-10 border-4 border-gray-200 text-center">
      <div className="flex justify-center mb-4">
        <IoMdCheckmarkCircle size={72} className="text-green-500" />
      </div>

      <h2 className="text-2xl font-bold mb-2">Thanks for your feedback!</h2>
      <p className="text-gray-500 mb-6">
        We’ve received your submission and truly appreciate your time.
      </p>

      <button
        className="bg-gray-500 hover:bg-yellow-500 text-white py-2 px-6 rounded-lg"
        onClick={onStartNewFeedback}
      >
        Send more feedback
      </button>
    </div>
  );
};

export default FeedBackThanks;
