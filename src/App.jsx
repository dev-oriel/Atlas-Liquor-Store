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

const App = () => (
  <main className="relative">
    <Nav />

    {/* Define Routes for different pages */}
    <Routes>
      {/* Home Route */}
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
      {/* Product Detail Route */}
      <Route path="/product/:id" element={<ProductDetail />} />
      {/* Shopping Cart Route */}
      <Route path="/cart" element={<Cart />} /> {/* Add this line */}
      {/* Search result Route */}
      <Route path="/search-results" element={<SearchResultsPage />} />
      {/* Checkout page Route */}
      <Route path="/checkout" element={<Checkout />} />
      {/* Order Complete page Route */}
      <Route path="/order-complete" element={<OrderComplete />} />
    </Routes>

    {/* Footer is outside the Routes but will always render */}
    <section className="bg-black padding-x padding-t pb-8 text-white">
      <Footer />
    </section>
  </main>
);

export default App;
