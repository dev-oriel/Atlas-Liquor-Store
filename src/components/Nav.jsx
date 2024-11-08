import { useState, useEffect, useRef } from "react";
import { hamburger, cartIcon, userIcon } from "../assets/icons";
import { navLinks } from "../constants";
import atlasLiquorLogo from "../assets/icons/atlas-liquor-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext"; // Import the custom hook to use cart context

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Access cart items from context
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total count based on cart items

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate("/search-results", { state: { searchQuery } });
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto px-4 py-2">
        <img
          src={atlasLiquorLogo}
          alt="Atlas Liquor Logo"
          className="w-24 h-24 object-contain"
        />

        <form onSubmit={handleSearch} className="relative mx-2 w-full max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-coral-red transition duration-200 w-full"
          />
          <button
            type="submit"
            className="absolute right-0 px-4 py-2 bg-coral-red text-white rounded-r-lg hover:bg-red-500 transition duration-200"
          >
            Search
          </button>

          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul>
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setShowSuggestions(false);
                    }}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
              {searchResults.length === 5 && (
                <div className="text-center p-2 border-t border-gray-200">
                  <button
                    onClick={() => navigate("/search-results")}
                    className="text-coral-red hover:underline"
                  >
                    View More Results
                  </button>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-montserrat text-lg text-slate-700 hover:text-coral-red transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Cart and User Icons with Cart Count */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" className="relative">
            <img src={cartIcon} alt="Cart" className="w-full h-10" />
            {cartCount > 0 && (
              <span className="absolute top-[-5px] right-[-5px] rounded-full bg-coral-red text-white text-xs px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/user-profile">
            <img src={userIcon} alt="User" className="w-16 h-16" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex md:hidden relative">
          <img
            src={hamburger}
            alt="Hamburger icon"
            width={40}
            height={40}
            onClick={toggleMenu}
            className="cursor-pointer"
            aria-expanded={isMenuOpen}
            tabIndex="0"
            onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
          />
          {cartCount > 0 && (
            <span className="absolute top-[-5px] right-[-5px] rounded-full bg-coral-red text-white text-xs px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-16 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform"
        >
          <ul className="flex flex-col items-start p-4">
            <li>
              <Link to="/user-profile">
                <img src={userIcon} alt="User" className="w-8 h-8" />
              </Link>
            </li>
            {navLinks.map((item) => (
              <li key={item.label} className="py-2 w-full text-left">
                <Link
                  to={item.href}
                  className="font-montserrat text-lg text-slate-700 hover:text-coral-red transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {/* Cart Icon for Mobile */}
            <li className="flex gap-4 mt-4">
              <Link to="/cart" className="relative">
                <img src={cartIcon} alt="Cart" className="w-full h-8" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 rounded-full bg-coral-red text-white text-xs px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
