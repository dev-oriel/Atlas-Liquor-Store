import React from "react";
import { products } from "../constants/index"; // Ensure this imports your product data

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branches Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Our Branches</h3>
            <div className="mb-4">
              <p>
                Pop Up Market, 1st Floor, Westgate Mall, Westlands, Nairobi.
              </p>
              <a href="#" className="text-coral-400 hover:underline">
                View on Google Maps
              </a>
              <p className="mt-1">
                Phone: <span className="text-coral-400">0700 044 154</span>
              </p>
              <p>Business Hours: Mon – Sun, 10:00am – 20:00pm</p>
              <p>Around Westlands? Order via Uber Eats or Bolt Food</p>
            </div>
            <div>
              <p>Block B, Ground Floor, Warwick Centre, UN Avenue</p>
              <a href="#" className="text-coral-400 hover:underline">
                View on Google Maps
              </a>
              <p className="mt-1">
                Phone: <span className="text-coral-400">0758 997 669</span>
              </p>
              <p>
                Email:{" "}
                <span className="text-coral-400">
                  blackmarksolutions@gmail.com
                </span>
              </p>
              <p>Business Hours: Mon – Sun, 10:00am – 20:00pm</p>
              <p>Around Gigiri? Order via Uber Eats or Bolt Food</p>
            </div>
          </div>

          {/* Recent Products Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Recent Products</h3>
            {products.slice(0, 3).map((product) => (
              <div
                key={product.name}
                className="flex items-center mb-3 hover:text-coral-400 transition duration-300"
              >
                <img
                  src={product.imgURL}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-3" // Adjust size as needed
                />
                <div>
                  <a href="#">
                    {product.name} -{" "}
                    <span className="text-coral-400">KShs {product.price}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Products Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Featured Products</h3>
            {products.slice(3, 6).map((product) => (
              <div
                key={product.name}
                className="flex items-center mb-3 hover:text-coral-400 transition duration-300"
              >
                <img
                  src={product.imgURL}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-3" // Adjust size as needed
                />
                <div>
                  <a href="#">
                    {product.name} -{" "}
                    <span className="text-coral-400">KShs {product.price}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Product Categories Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Product Categories</h3>
            {[
              "Gin",
              "Non-Alcoholic Drinks",
              "Rum",
              "Tequila",
              "Vodka",
              "Whiskies",
              "Wines",
            ].map((category) => (
              <p
                key={category}
                className="hover:text-coral-red cursor-pointer transition duration-300"
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        <p>
          © {new Date().getFullYear()} Atlas Liquor Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
