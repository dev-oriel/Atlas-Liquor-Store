import { useState, useEffect, useRef } from "react";
import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import atlasLiquorLogo from "../assets/icons/atlas-liquor-logo.svg";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <header className="padding-x py-8 z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img
            src={atlasLiquorLogo}
            alt="Atlas Liquor Logo"
            className="w-44 h-auto m-0"
          />
        </a>
        {/* Desktop Navigation */}
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Sign In/Sign Up Links */}
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <a href="/">Sign in</a>
          <span>/</span>
          <a href="/">Sign up</a>
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="flex-row hidden max-lg:block">
          <img
            src={hamburger}
            alt="hamburger icon"
            width={25}
            height={25}
            onClick={toggleMenu}
            className="cursor-pointer"
            aria-expanded={isMenuOpen}
          />
        </div>
      </nav>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className={`flex flex-col items-center justify-center bg-white shadow-lg p-4 absolute top-full left-0 right-0 z-20 max-lg:flex transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((item) => (
            <li key={item.label} className="py-2">
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Nav;
