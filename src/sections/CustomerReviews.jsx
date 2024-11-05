import React, { useEffect, useState } from "react";
import { reviews } from "../constants";

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalReviews = reviews.length;

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the animation
      setIsAnimating(true);
      setTimeout(() => {
        // Update the current index to the next review after the slide-out animation
        setCurrentIndex((prevIndex) => (prevIndex + 2) % totalReviews); // Move to next two reviews
        setIsAnimating(false); // Reset animation state after update
      }, 500); // Duration of the slide-out animation
    }, 5000); // Change the review every 5 seconds

    return () => clearInterval(interval);
  }, [totalReviews]);

  // Get the current reviews to display
  const currentReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % totalReviews],
  ];

  return (
    <div className=" overflow-hidden p-6 bg-gray-100">
      {" "}
      {/* Added padding and background color */}
      <h2 className="text-center text-xl font-bold mb-4">Customer Reviews</h2>
      <div
        className={`flex flex-col md:flex-row transition-transform duration-500 ${
          isAnimating ? "animate-slide-out" : "animate-slide-in"
        }`}
      >
        {currentReviews.map((review, index) => (
          <div
            key={index}
            className="review-box flex-1 p-4 md:min-h-48 md:h-48 flex flex-col justify-between" // Set min-h and fixed height
          >
            <img
              src={review.imgURL}
              alt={`${review.customerName}'s profile`}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="font-bold">{review.customerName}</h3>
            <p className="text-sm flex-1 overflow-hidden">
              {review.feedback}
            </p>{" "}
            {/* Added flex-1 for text area */}
            <p className="text-yellow-500">
              {"★".repeat(Math.floor(review.rating))}
              {"☆".repeat(5 - Math.floor(review.rating))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
