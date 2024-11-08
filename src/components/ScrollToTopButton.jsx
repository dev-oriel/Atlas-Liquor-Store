import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-coral-red text-white p-2 md:p-3 shadow-lg transition-opacity ${
        isVisible ? "opacity-80" : "opacity-0"
      }`}
      style={{
        transition: "opacity 0.5s ease",
        backgroundColor: "rgba(255, 127, 80, 0.8)",
        backdropFilter: "blur(5px)",
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
