import React from "react";
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
  const navigate = useNavigate();

  // Example tracking number can be passed as a prop or fetched from context
  const trackingNumber = "123456789";

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex mt-40 flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Complete!</h2>
      <p className="text-gray-700 mb-2">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <p className="text-gray-700 mb-6">
        Your tracking number is:{" "}
        <span className="font-semibold">{trackingNumber}</span>
      </p>
      <button
        onClick={handleReturnHome}
        className="bg-coral-red text-white py-2 px-4 rounded"
      >
        Return to Home
      </button>
    </div>
  );
};

export default OrderComplete;
