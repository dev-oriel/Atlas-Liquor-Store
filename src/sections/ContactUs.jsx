import React from "react";

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center  min-h-[70vh] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h3 className="text-2xl font-semibold text-center mb-4">
          ABOUT OUR BRANDS OF LIQUOR
        </h3>
        <p className="text-left text-gray-600 mb-6">
          Atlas Liquor Store is a premium store that provides you with all kinds
          of alcoholic and non-alcoholic drinks at an affordable rate.
        </p>
        <p className="text-gray-600 mb-6 text-left">
          Find Us at the Pop Up Market, 1st Floor, Westgate Mall, Westlands,
          Nairobi. We also do deliveries, Give Us a call on 0712 345 678
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-coral-red text-white py-2 px-6 rounded-lg transition duration-300 hover:bg-coral-600">
            Explore
          </button>
          <button className="bg-coral-red text-white py-2 px-6 rounded-lg transition duration-300 hover:bg-coral-600">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
