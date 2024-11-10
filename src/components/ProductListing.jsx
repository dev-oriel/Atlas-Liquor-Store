import React, { useState, useEffect, useRef } from "react";
import { products } from "../constants";
import PopularProductCard from "../components/PopularProductCard";
import { categories } from "../constants";

const ITEMS_PER_PAGE_SMALL = 10;
const ITEMS_PER_PAGE_LARGE = 16;
const productCategories = ["ALL", "BEST SELLERS", "NEW"];

const ProductListing = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleCategorySelect = (category) => setCategoryFilter(category);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Determine the number of items per page based on screen size
  const ITEMS_PER_PAGE =
    window.innerWidth < 1024 ? ITEMS_PER_PAGE_SMALL : ITEMS_PER_PAGE_LARGE;

  const currentProducts = filteredProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const maxPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const applyCategoryFilter = (category) => {
    let filtered = [];
    if (category === "BEST SELLERS") {
      filtered = products.filter((product) => product.isBestSeller);
    } else if (category === "NEW") {
      filtered = products.filter((product) => product.isNew);
    } else {
      filtered = products;
    }
    setFilteredProducts(filtered);
    setCategoryFilter(category);
    setCurrentPage(0);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    applyCategoryFilter("ALL");
  }, []);

  return (
    <section className="max-w-full mx-auto pb-10 px-4 mt-40 mb-20 flex flex-col sm:flex-row gap-6">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`w-3/5 sm:w-1/5 bg-gray-50 rounded-sm p-4 mt-28 transition-all duration-300 ease-in-out fixed top-0 left-0 sm:static sm:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ minHeight: "60vh" }}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 sm:hidden"
        >
          <span className="text-xl font-bold text-coral-red"> &times; </span>
        </button>
        <h3 className="font-semibold mb-4 bg-coral-red text-lg text-white p-3">
          BROWSE CATEGORIES
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index}>
              <button
                onClick={() => toggleCategory(index)}
                className="flex justify-between w-full text-left hover:text-coral-red font-medium bg-gray-100 p-2 rounded-sm focus:outline-none"
              >
                {category.label}
                {category.subcategories.length > 0 && (
                  <span>{expandedCategory === index ? "-" : "+"}</span>
                )}
              </button>
              {expandedCategory === index &&
                category.subcategories.length > 0 && (
                  <div className="pl-4 mt-2 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => handleCategorySelect(subcategory)}
                        className="block text-md text-gray-700 hover:text-coral-red"
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8 relative">
          <div className="w-full sm:w-auto flex justify-center sm:absolute sm:left-0 sm:top-0">
            {/* Hamburger Menu for Small Screens */}
            <button
              className="sm:hidden absolute left-4 top-8"
              onClick={toggleSidebar}
            >
              <div className="w-6 h-1 bg-coral-red mb-2"></div>
              <div className="w-6 h-1 bg-coral-red mb-2"></div>
              <div className="w-6 h-1 bg-coral-red"></div>
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl text-center font-bold mb-2">
            Our <span className="text-coral-red">Products</span>
          </h2>
          <p className="lg:max-w-lg text-slate-gray text-center px-2 sm:px-0">
            Browse our top-notch quality and the best beers, wines, and
            accessories.
          </p>
        </div>

        {/* Category Filters (BEST SELLERS, NEW, ALL) */}
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => applyCategoryFilter(category)}
              className={`text-lg font-semibold transition-all duration-300 ${
                categoryFilter === category
                  ? "underline text-coral-red"
                  : "text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div className="w-[280px] sm:max-w-sm md:max-w-md mx-auto mb-3 ">
                <PopularProductCard key={product.id} {...product} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-slate-gray">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: maxPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-4 py-2 rounded ${
                index === currentPage
                  ? "bg-coral-red text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
