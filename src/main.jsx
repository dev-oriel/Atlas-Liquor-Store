import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./CartContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <CartProvider>
        {" "}
        {/* Wrap App with CartProvider */}
        <App />
      </CartProvider>
    </Router>
  </StrictMode>
);
