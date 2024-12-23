import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Example tracking number (could be passed as a prop or fetched from context)
  const trackingNumber = "123456789";

  const handleReturnHome = () => {
    setIsLoading(true);
    // Delay navigation by a short amount of time to show loading
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="flex mt-20 sm:mt-40 flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
        Order Complete!
      </h2>
      <p className="text-gray-700 mb-2 text-center text-sm sm:text-base">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <p className="text-gray-700 mb-6 text-center text-sm sm:text-base">
        Your tracking number is:{" "}
        <span className="font-semibold">{trackingNumber}</span>
      </p>
      <button
        onClick={handleReturnHome}
        className="bg-coral-red text-white py-2 px-6 sm:px-4 rounded text-sm sm:text-base"
      >
        Return to Home
      </button>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="loader w-12 h-12 border-4 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OrderComplete;
