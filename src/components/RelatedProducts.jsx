import React, { useState, useRef } from "react";
import { products } from "../constants";

const RelatedProducts = ({ currentProductId }) => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Stores the clicked product for detailed view
  const relatedProducts = products.filter((product) => product.id !== currentProductId); // Exclude the current product
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -scrollRef.current.offsetWidth : scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Display detailed view for selected product
  if (selectedProduct) {
    return (
      <div className="mt-10 p-4 border-t border-gray-300">
        <button onClick={() => setSelectedProduct(null)} className="mb-4 text-blue-500 hover:text-blue-700">
          &#10094; Back to Related Products
        </button>
        <div className="bg-white rounded-lg shadow-md p-6">
          <img src={selectedProduct.imgURL} alt={selectedProduct.name} className="w-full h-80 object-cover rounded mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{selectedProduct.name}</h3>
          <p className="text-gray-700 mb-4">KShs {selectedProduct.price}</p>
          <p className="text-gray-600">Description: {selectedProduct.description}</p>
          {/* Add any additional product details here */}
        </div>
      </div>
    );
  }

  // Display the related products list
  return (
    <div className="mt-10 p-4 border-t border-gray-300">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Related Products</h3>
      <div className="relative flex items-center">
        
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll("left")} 
          className="absolute left-0 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        >
          &#10094;
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto scrollbar-hide space-x-4 px-10"
        >
          {relatedProducts.slice(0, 6).map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)} // Set clicked product as selected
              className="w-56 h-72 bg-white rounded-lg shadow-md p-4 flex-shrink-0 flex flex-col justify-between cursor-pointer"
            >
              <img 
                src={product.imgURL} 
                alt={product.name} 
                className="h-32 w-full object-cover rounded mb-2"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-800 truncate">{product.name}</h4>
                <p className="text-gray-600">KShs {product.price}</p>
              </div>
              <button className="mt-2 bg-coral-red text-white px-3 py-1 rounded hover:bg-red-600">
                View Product
              </button>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll("right")} 
          className="absolute right-0 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;
