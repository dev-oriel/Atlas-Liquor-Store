import { products } from "../constants";
import { PopularProductCard } from "../components";
import { useState } from "react";

const ITEMS_PER_PAGE = 12; // Number of items per "page" (3 rows)

const PopularProducts = () => {
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
    <section id="products" className="max-container max-sm:mt-6 pb-10">
      <div className="flex flex-col items-center justify-center gap-4">
        {" "}
        {/* Reduced gap here */}
        <h2 className="text-4xl font-palanquin font-bold text-center">
          Our <span className="text-coral-red">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-1 font-montserrat text-slate-gray text-center">
          {" "}
          {/* Reduced mt value */}
          Browse our top-notch quality and the best beers, wines, and
          accessories
        </p>
        <div className="relative w-full max-w-md mt-4">
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

      {/* Display the filtered products or a message if none are found */}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-6">
        {" "}
        {/* Adjusted gap */}
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <PopularProductCard key={product.id} {...product} /> // Use unique id for the key
          ))
        ) : (
          <p className="text-center text-xl font-montserrat text-slate-gray col-span-full">
            No products found.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {itemsToShow < filteredProducts.length && (
        <div className="flex justify-center mt-6">
          {" "}
          {/* Adjusted mt value */}
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

export default PopularProducts;
