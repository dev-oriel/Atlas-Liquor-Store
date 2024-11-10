import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  // Calculate subtotal, shipping fee, discount, and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 100; // This can be dynamically calculated based on delivery location
  const discount = 0; // Add logic here to apply discount
  const total = subtotal + shippingFee - discount;
  const location = useLocation();
  const [step, setStep] = useState(2); // Current step of checkout progress
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    phoneNumber: "",
    email: "",
    mpesaPhone: "",
    mpesaCode: "",
    paypalEmail: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    setFormData((prevState) => {
      let updatedFormData = { ...prevState };

      if (selectedPaymentMethod === "mpesa") {
        updatedFormData = {
          ...updatedFormData,
          mpesaPhone: "",
          mpesaCode: "",
        };
      } else if (selectedPaymentMethod === "paypal") {
        updatedFormData = { ...updatedFormData, paypalEmail: "" };
      } else if (selectedPaymentMethod === "card") {
        updatedFormData = {
          ...updatedFormData,
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        };
      }

      return updatedFormData;
    });
  }, [selectedPaymentMethod]);

  // Form validation
  const validateForm = () => {
    const errors = [];
    const requiredFields = [
      "firstName",
      "lastName",
      "location",
      "phoneNumber",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(field);
      }
    });

    if (selectedPaymentMethod === "mpesa") {
      if (!formData.mpesaPhone || !formData.mpesaCode) {
        errors.push("mpesaPhone", "mpesaCode");
      }
    } else if (selectedPaymentMethod === "paypal") {
      if (!formData.paypalEmail) {
        errors.push("paypalEmail");
      }
    } else if (selectedPaymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        errors.push("cardNumber", "expiryDate", "cvv");
      }
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  // Update form data on field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Check if there are items in the cart
  if (!cartItems || cartItems.length === 0) {
    return <div className="text-center p-6">Your cart is empty!</div>;
  }
  const handlePlaceOrder = () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    alert("Order placed successfully!");
    navigate("/order-complete");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto mt-40 mb-40">
      {/* Progress Bar */}
      <div className="mb-4 flex flex-wrap justify-between">
        <Link
          to="/cart"
          className={`flex-grow md:flex-1 h-8 ${
            step >= 1 ? "bg-coral-red" : "bg-gray-200"
          } rounded-l-lg relative`}
          style={{ minWidth: "120px" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            Shopping Cart
          </span>
        </Link>
        <Link
          to="/checkout"
          className={`flex-grow md:flex-1 h-8 ${
            step >= 2 ? "bg-coral-red" : "bg-gray-200"
          } relative`}
          style={{ minWidth: "120px" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            Checkout
          </span>
        </Link>
        <Link
          to="/order-complete"
          className={`flex-grow md:flex-1 h-8 ${
            step >= 3 ? "bg-coral-red" : "bg-gray-200"
          } rounded-r-lg relative`}
          style={{ minWidth: "120px" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            Order Complete
          </span>
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
      {/* Error Messages */}
      {formErrors.length > 0 && (
        <div className="mb-6 bg-red-100 text-red-600 p-4 rounded-md">
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>
                {error === "mpesaPhone" &&
                  "Phone number for Mpesa is required."}
                {error === "mpesaCode" && "Mpesa transaction code is required."}
                {error === "paypalEmail" && "PayPal email address is required."}
                {error === "cardNumber" && "Card number is required."}
                {error === "firstName" && "First Name is required."}
                {error === "lastName" && "Last Name is required."}
                {error === "location" && "Location is required."}
                {error === "phoneNumber" && "Phone Number is required."}
                {error === "email" && "Email address is required."}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Billing Details Section */}
        <div className="flex-1 md:mr-8 p-6 bg-white rounded-lg shadow-md mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Billing & Shipping Details
          </h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`border ${
                  formErrors.includes("firstName")
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2 rounded w-full outline-none`}
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`border ${
                  formErrors.includes("lastName")
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2 rounded w-full outline-none`}
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full outline-none"
                placeholder="Enter your country"
                value="Kenya"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Street Address</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full outline-none"
                placeholder="Enter your street address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Location / Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`border ${
                  formErrors.includes("location")
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2 rounded w-full outline-none`}
                placeholder="Enter your location or area"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`border ${
                  formErrors.includes("phoneNumber")
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2 rounded w-full outline-none`}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border ${
                  formErrors.includes("email")
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2 rounded w-full outline-none`}
                placeholder="Enter your email"
              />
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
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
          {/* Payment Options */}
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Payment Methods
          </h3>
          <div className="flex flex-col space-y-4">
            {/* Mpesa Option */}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                id="mpesa"
                checked={selectedPaymentMethod === "mpesa"}
                onChange={() => setSelectedPaymentMethod("mpesa")}
              />
              <label htmlFor="mpesa" className="text-gray-700">
                Lipa na Mpesa
              </label>
            </div>
            {selectedPaymentMethod === "mpesa" && (
              <div>
                <p className="text-gray-600 text-sm">
                  Pay with Mpesa using the Till number: <strong>8712672</strong>{" "}
                  (Oriel Kiplangat). Please provide your phone number and Mpesa
                  transaction code.
                </p>
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700">
                    Phone Number for Mpesa{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mpesaPhone"
                    value={formData.mpesaPhone}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700">
                    Transaction Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mpesaCode"
                    value={formData.mpesaCode}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full outline-none"
                    placeholder="Enter Mpesa transaction code"
                    required
                  />
                </div>
              </div>
            )}
            {/* PayPal Option */}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                checked={selectedPaymentMethod === "paypal"}
                onChange={() => setSelectedPaymentMethod("paypal")}
              />
              <label htmlFor="paypal" className="text-gray-700">
                PayPal
              </label>
            </div>
            {selectedPaymentMethod === "paypal" && (
              <div>
                <p className="text-gray-600 text-sm">
                  You will be redirected to PayPal to complete your payment.
                  Please make sure your PayPal account is linked.
                </p>
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700">
                    PayPal Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="paypalEmail"
                    value={formData.paypalEmail}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full outline-none"
                    placeholder="Enter your PayPal email address"
                    required
                  />
                </div>
              </div>
            )}
            {/* Credit/Debit Card Option */}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                id="card"
                checked={selectedPaymentMethod === "card"}
                onChange={() => setSelectedPaymentMethod("card")}
              />
              <label htmlFor="card" className="text-gray-700">
                Credit/Debit Card
              </label>
            </div>
            {selectedPaymentMethod === "card" && (
              <div>
                <p className="text-gray-600 text-sm">
                  Enter your card details to proceed with payment.
                </p>
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full outline-none"
                    placeholder="Enter your card number"
                    required
                  />
                </div>
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full outline-none"
                    required
                  />
                </div>
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full outline-none"
                    placeholder="Enter your card CVV"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Place Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handlePlaceOrder}
              className="bg-coral-red text-white p-3 rounded-lg font-semibold w-full"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
