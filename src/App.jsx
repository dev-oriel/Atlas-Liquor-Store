import React from "react";
import {
  Hero,
  CustomerReviews,
  Footer,
  PopularProducts,
  SpecialOffer,
  ContactUs,
} from "./sections";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import SearchResultsPage from "./pages/SearchResultsPage";
import Checkout from "./components/Checkout";
import OrderComplete from "./components/OrderComplete";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => (
  <main className="relative">
    <Nav />
    {/* Define Routes for different pages */}
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <PopularProducts />
            <SpecialOffer />
            <CustomerReviews />
            <ContactUs />
          </>
        }
      />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-complete" element={<OrderComplete />} />
    </Routes>

    {/* Scroll to Top Button */}
    <ScrollToTopButton />

    {/* Footer */}
    <section className="bg-black padding-x padding-t pb-8 text-white">
      <Footer />
    </section>
  </main>
);

export default App;
