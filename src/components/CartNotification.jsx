import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

const CartNotification = ({ show, onClose }) => {
  const { cartItems } = useCart();

  // Calculate the subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Close the notification when clicking outside of it
  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for clicking outside */}
      {show && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        ></div>
      )}

      <div
        className={`fixed xxs:top-10 xxs:-right-5 md:top-2 xxs:h-3/4 md:h-full max-w-[400px] sm:max-w-[350px] md:w-[320px] lg:w-[300px] bg-white shadow-xl rounded-l-lg transform ${
          show ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-hidden`}
      >
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Item Added to Cart
          </h2>
          <div className="flex-grow overflow-y-auto space-y-4 max-h-[70vh]">
            {cartItems.length === 0 ? (
              <p className="text-center text-xl text-slate-gray">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <img
                    src={item.imgURL}
                    alt={item.name}
                    className="w-16 h-16 rounded-md mr-4 object-cover"
                  />
                  <div className="text-gray-700">
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    <p className="text-coral-red font-semibold">
                      Ksh {item.price}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal Display */}
          <div className="mt-4 border-t pt-4">
            <p className="text-lg font-bold text-gray-900">
              Subtotal:{" "}
              <span className="text-coral-red">Ksh {subtotal.toFixed(2)}</span>
            </p>
          </div>

          <Link
            to="/cart"
            className="mt-4 bg-coral-red text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-red-600 transition-colors duration-300"
            onClick={onClose}
          >
            Proceed to Cart
          </Link>
          <button
            onClick={onClose}
            className="mt-2 text-gray-500 text-sm hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default CartNotification;
