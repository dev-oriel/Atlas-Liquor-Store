import React, { useState, useRef, useEffect } from "react";
import { products } from "../constants";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ currentProductId, selectedRelatedProduct, setSelectedRelatedProduct }) => {
  const initialRelatedProducts = products.filter((product) => product.id !== currentProductId);
  const [relatedProducts, setRelatedProducts] = useState(initialRelatedProducts);
  const scrollRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRelatedProduct) {
      // Update related products by removing the selected product
      setRelatedProducts((prev) => prev.filter((product) => product.id !== selectedRelatedProduct.id));
      // Navigate to the selected product detail view
      navigate(`/product/${selectedRelatedProduct.id}`); // Adjust the path based on your routing
      setSelectedRelatedProduct(null); // Reset selected related product
    }
  }, [selectedRelatedProduct, navigate, setSelectedRelatedProduct]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -scrollRef.current.offsetWidth : scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
              onClick={() => setSelectedRelatedProduct(product)} // Set clicked product as selected
              className="w-56 h-72 bg-white rounded-lg shadow-md p-4 flex-shrink-0 flex flex-col justify-between cursor-pointer transition-transform transform hover:scale-105"
            >
              <img 
                src={product.imgURL} 
                alt={product.name} 
                className="h-full w-32 object-cover rounded mb-2"
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
