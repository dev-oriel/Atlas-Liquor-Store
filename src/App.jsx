import {
  Hero,
  CustomerReviews,
  Footer,
  PopularProducts,
  SpecialOffer,
  ContactUs,
} from "./sections";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route here
import ProductDetail from "./components/ProductDetail"; // Ensure you have a ProductDetail component

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
    </Routes>

    {/* Footer is outside the Routes but will always render */}
    <section className="bg-black padding-x padding-t pb-8 text-white">
      <Footer />
    </section>
  </main>
);

export default App;
