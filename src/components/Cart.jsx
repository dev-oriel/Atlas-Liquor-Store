import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../CartContext";
import { Link, useLocation } from "react-router-dom";
import { recommendedProducts } from "../constants/index";
import removeIcon from "../assets/icons/delete.png";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();
  const location = useLocation();
  const scrollRef = useRef(null); // Ref for scrolling
  const [loadingProductId, setLoadingProductId] = useState(null); // State for tracking loading product
  const [coupon, setCoupon] = useState(""); // State for coupon input
  const [discount, setDiscount] = useState(0); // State for discount

  // Scroll to top whenever the location (URL path) changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingFee = 200; // Example shipping fee
  const total = subtotal + shippingFee - discount; // Apply discount

  const handleApplyCoupon = () => {
    // Example: Fixed discount of Ksh 100 for any coupon
    if (coupon) {
      setDiscount(100);
      setCoupon("");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center text-gray-700 pt-40">
        Your cart is empty.
      </div>
    );
  }

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
  };

  return (
    <div className="p-4 max-w-6xl mx-auto pt-40">
      {/* Progress Bar */}
      <div className="mb-4 flex flex-wrap justify-between">
        <Link
          to="/cart"
          className="flex-grow md:flex-1 h-8 bg-coral-red rounded-l-lg relative"
          style={{ minWidth: "120px" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            Shopping Cart
          </span>
        </Link>
        <Link
          to="/checkout"
          className="flex-grow md:flex-1 h-8 bg-coral-red relative"
          style={{ minWidth: "120px" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            Checkout
          </span>
        </Link>
        <Link
          to="/order-complete"
          className="flex-grow md:flex-1 h-8 bg-coral-red rounded-r-lg relative"
          style={{ minWidth: "120px" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            Order Complete
          </span>
        </Link>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="flex flex-col md:flex-row">
        {/* Products Section */}
        <ul className="flex-1 space-y-4 md:mr-8">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-md rounded-lg p-4 space-y-2 md:space-y-0 md:space-x-4"
            >
              <div className="flex items-center w-full md:w-2/5">
                <img
                  src={item.imgURL}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">Ksh {item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:justify-between w-full md:w-2/5 mr-5 mt-4 md:mt-0">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-100 border border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-700 font-semibold whitespace-nowrap">
                  Total: Ksh {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-end w-full md:w-1/5 mt-2 md:mt-0">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline flex items-center justify-center"
                  aria-label="Remove item from cart"
                >
                  <img src={removeIcon} alt="Remove" className="w-6 h-6 mr-1" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary Section */}
        <div className="mt-8 md:mt-0 w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h3>
          <div className="flex justify-between">
            <p className="text-gray-700">Subtotal:</p>
            <p className="text-gray-700">Ksh {subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping Fee:</p>
            <p className="text-gray-700">Ksh {shippingFee.toFixed(2)}</p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-700">Discount:</p>
              <p className="text-gray-700">- Ksh {discount.toFixed(2)}</p>
            </div>
          )}
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between font-bold">
            <p>Total:</p>
            <p>Ksh {total.toFixed(2)}</p>
          </div>
          <p className="text-gray-600 mt-2">
            Taxes and shipping calculated at checkout
          </p>

          {/* Coupon Section */}
          <div className="mt-4">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full outline-none"
              placeholder="Enter coupon code"
            />
            <button
              onClick={handleApplyCoupon}
              className="mt-2 w-full bg-coral-red text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Apply Coupon
            </button>
          </div>

          <Link
            to="/checkout"
            className="block w-full mt-4 bg-coral-red text-white py-3 text-center rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
      <div className="mt-8 h-16"></div>{" "}
      {/* Spacer for footer differentiation */}
      {/* Recommended Products Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">
        Recommended Products
      </h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-coral-red text-white rounded-full p-2 hover:bg-red-600 transition-colors z-10"
        >
          &lt;
        </button>
        <div className="flex overflow-x-auto no-scrollbar" ref={scrollRef}>
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 m-2 flex-none w-60"
            >
              <img
                src={product.imgURL}
                alt={product.name}
                className="h-40 rounded-md object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600">Ksh {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-coral-red text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-coral-red text-white rounded-full p-2 hover:bg-red-600 transition-colors z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Cart;
