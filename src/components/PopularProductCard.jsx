import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import CartNotification from "./CartNotification"; // Import the new component

const PopularProductCard = ({ id, imgURL, name, price }) => {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, imgURL, name, price, quantity: 1 });
    setShowNotification(true); // Show the notification when an item is added
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const whatsappLink = `https://wa.me/+254758997669?text=I'm interested in purchasing the ${name}.`;

  return (
    <div className="flex flex-col w-[300px] max-sm:w-full bg-white rounded-lg shadow-md overflow-hidden p-4 h-full">
      <Link to={`/product/${id}`} className="block h-full">
        <div className="flex justify-center items-center h-[300px]">
          <img
            src={imgURL}
            alt={name}
            className="w-auto h-full max-w-full object-contain"
          />
        </div>

        <div className="mt-4 px-2 text-center">
          <h3 className="text-lg sm:text-xl font-semibold font-palanquin text-gray-800 truncate">
            {name}
          </h3>
          <p className="mt-1 font-semibold font-montserrat text-coral-red text-lg sm:text-xl">
            Ksh {price}
          </p>
        </div>
      </Link>

      <div className="mt-4 flex flex-col space-y-2">
        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-2 bg-coral-red text-white font-semibold rounded-md hover:bg-red-500 transition duration-300 text-sm sm:text-base"
        >
          Add to Cart
        </button>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 text-center text-sm sm:text-base"
        >
          Order via WhatsApp
        </a>
      </div>

      {/* Cart Notification */}
      <CartNotification show={showNotification} onClose={closeNotification} />
    </div>
  );
};

export default PopularProductCard;
