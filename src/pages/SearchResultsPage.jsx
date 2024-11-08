import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../constants";
import { useCart } from "../CartContext";
import CartNotification from "../components/CartNotification";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const query = location.state?.searchQuery || "";
    setSearchQuery(query);

    if (query) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [location.state]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(searchResults.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-screen-lg mx-auto py-6 mt-40">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{searchQuery}"
      </h1>

      {searchResults.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => {
              const whatsappLink = `https://wa.me/+254758997669?text=I'm interested in purchasing the ${product.name}.`;
              return (
                <div
                  key={product.id}
                  className="flex flex-col w-full bg-white rounded-lg shadow-md overflow-hidden p-4"
                >
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="block cursor-pointer"
                  >
                    <div className="flex justify-center items-center h-[200px]">
                      <img
                        src={product.imgURL}
                        alt={product.name}
                        className="w-auto h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-semibold font-palanquin text-gray-800 truncate">
                        {product.name}
                      </h3>
                      <p className="mt-1 font-semibold font-montserrat text-coral-red text-lg">
                        KSh {product.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full px-4 py-2 bg-coral-red text-white font-semibold rounded-md hover:bg-red-500 transition duration-300"
                    >
                      Add to Cart
                    </button>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 text-center"
                    >
                      Order via WhatsApp
                    </a>
                  </div>

                  {/* Cart Notification */}
                  <CartNotification
                    show={showNotification}
                    onClose={closeNotification}
                  />
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <ul className="flex space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`px-4 py-2 rounded ${
                        currentPage === i + 1
                          ? "bg-coral-red text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">
          No products found matching "{searchQuery}".
        </p>
      )}
    </div>
  );
};

export default SearchResultsPage;
