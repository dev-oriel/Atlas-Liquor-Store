import React, { useState } from "react";
import { products } from "../constants"; // Assuming you have your products data here
import { PopularProductCard } from "../components";

const SpecialOffer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matchedProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSearchClick = () => {
    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(matchedProducts);
  };

  return (
    <section id="special-offers" className="max-w-full mx-auto pb-10 px-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Our <span className="text-coral-red">Special</span> Offers
        </h2>
        <p className="lg:max-w-lg mt-1 text-slate-gray text-center px-2 sm:px-0">
          Don't miss out on our amazing special offers!
        </p>
        <div className="relative w-full max-w-md mt-4 px-2 sm:px-0">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-red"
            />
            <button
              onClick={handleSearchClick}
              className="ml-2 px-4 py-2 bg-coral-red text-white rounded-lg hover:bg-coral-dark transition duration-200 ease-in-out"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll section for special offers */}
      <div className="mt-8 flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] flex-shrink-0">
              <PopularProductCard {...product} />
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-slate-gray">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default SpecialOffer;
