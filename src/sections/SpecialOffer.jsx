import React, { useState } from "react";
import { products } from "../constants"; // Assuming you have your products data here
import PopularProductCard from "../components/PopularProductCard";

const ITEMS_PER_PAGE = 4; // Number of items per "page" (3 rows)

const SpecialOffer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matchedProducts);
      setItemsToShow(ITEMS_PER_PAGE); // Reset to initial display when searching
    } else {
      setFilteredProducts(products); // Show all products if search is cleared
      setItemsToShow(ITEMS_PER_PAGE);
    }
  };

  const handleSearchClick = () => {
    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(matchedProducts);
    setItemsToShow(ITEMS_PER_PAGE); // Reset to initial display on search
  };

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_PAGE); // Show more products
  };

  // Limit products displayed based on `itemsToShow`
  const currentProducts = filteredProducts.slice(0, itemsToShow);

  return (
    <section
      id="special-offers"
      className="max-container mt-8 mb-10 max-sm:mt-6 pb-40"
    >
      <h2 className="text-4xl font-palanquin font-bold text-center mb-4">
        Special Offers
      </h2>
      <p className="text-center mb-6 font-montserrat text-slate-gray">
        Don't miss out on our amazing special offers!
      </p>

      <div className="relative w-full max-w-md mt-4 mb-6 mx-auto">
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

      <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <PopularProductCard key={product.name} {...product} />
          ))
        ) : (
          <p className="text-center text-xl font-montserrat text-slate-gray col-span-full">
            No products found.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {itemsToShow < filteredProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-coral-red text-white rounded-lg hover:bg-coral-dark transition duration-200 ease-in-out"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default SpecialOffer;
