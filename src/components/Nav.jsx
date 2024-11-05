import { useState, useEffect, useRef } from "react";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import atlasLiquorLogo from "../assets/icons/atlas-liquor-logo.svg";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto px-4 py-2">
        <a href="/" className="flex-shrink-0">
          <img
            src={atlasLiquorLogo}
            alt="Atlas Liquor Logo"
            className="w-24 h-24 object-contain" // Adjusted size and maintain aspect ratio
          />
        </a>

        <div className="flex items-center flex-1 justify-between md:justify-end">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="flex md:hidden mx-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-coral-red transition duration-200 w-full max-w-[150px]"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-coral-red text-white rounded-lg hover:bg-coral-dark transition duration-200"
            >
              Search
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex flex-1 justify-center items-center gap-10">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat text-lg text-slate-700 hover:text-coral-red transition duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center mx-4"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-coral-red transition duration-200 w-48"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-coral-red text-white rounded-lg hover:bg-coral-dark transition duration-200"
            >
              Search
            </button>
          </form>

          {/* Sign In / Sign Up Links */}
          <div className="hidden md:flex gap-4 text-lg font-medium">
            <a
              href="/"
              className="text-slate-700 hover:text-coral-red transition duration-200"
            >
              Sign in
            </a>
            <span>/</span>
            <a
              href="/"
              className="text-slate-700 hover:text-coral-red transition duration-200"
            >
              Sign up
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex md:hidden">
            <img
              src={hamburger}
              alt="Hamburger icon"
              width={30}
              height={30}
              onClick={toggleMenu}
              className="cursor-pointer"
              aria-expanded={isMenuOpen}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-16 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-start p-4">
            {navLinks.map((item) => (
              <li key={item.label} className="py-2 w-full text-left">
                <a
                  href={item.href}
                  className="font-montserrat text-lg text-slate-700 hover:text-coral-red transition duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start p-4 border-t border-gray-200">
            <a
              href="/"
              className="text-lg text-slate-700 hover:text-coral-red transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </a>
            <span>/</span>
            <a
              href="/"
              className="text-lg text-slate-700 hover:text-coral-red transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
