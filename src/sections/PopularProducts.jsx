import React, { useState, useEffect, useRef } from "react";
import { products } from "../constants";
import PopularProductCard from "../components/PopularProductCard";

const ITEMS_PER_PAGE_LARGE = 8;

const PopularProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(
    products.filter((product) => product.popular === true)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_LARGE);
  const [isVisible, setIsVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sectionRef = useRef(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const matchedProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) &&
          product.popular === true
      );
      setFilteredProducts(matchedProducts);
      setCurrentPage(0);
    } else {
      setFilteredProducts(products.filter((product) => product.popular === true));
      setCurrentPage(0);
    }
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 640) {
        setItemsPerPage(filteredProducts.length); // Display all products on smaller screens
      } else {
        setItemsPerPage(ITEMS_PER_PAGE_LARGE);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [filteredProducts]);

  const maxPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < maxPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="max-w-full mx-auto pb-10 px-4 mb-20"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Our <span className="text-coral-red">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-1 text-slate-gray text-center px-2 sm:px-0">
          Browse our top-notch quality and the best beers, wines, and accessories
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center flex-col md:flex-row">
        {windowWidth > 640 && isVisible && currentPage > 0 && (
          <button
            onClick={goToPreviousPage}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-4 text-white hover:bg-coral-dark transition-opacity backdrop-blur-3xl z-10"
          >
            ←
          </button>
        )}

        <div
          className={`${
            windowWidth <= 640
              ? "flex overflow-x-auto space-x-4  p-4"
              : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
          }`}
          style={{
            overflowX: windowWidth <= 640 ? "auto" : "unset",
            maxWidth: windowWidth <= 640 ? "100%" : "unset",
          }}
        >
          {windowWidth <= 640
            ? filteredProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0">
                  <PopularProductCard {...product} />
                </div>
              ))
            : currentProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0">
                  <PopularProductCard {...product} />
                </div>
              ))}
        </div>

        {windowWidth > 640 && isVisible && currentPage < maxPages - 1 && (
          <button
            onClick={goToNextPage}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-4 text-white hover:bg-coral-dark transition-opacity backdrop-blur-3xl z-10"
          >
            →
          </button>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
