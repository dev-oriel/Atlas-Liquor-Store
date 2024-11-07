import { products } from "../constants";
import { PopularProductCard } from "../components";
import { useState } from "react";

const PopularProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const matchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matchedProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSearchClick = () => {
    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(matchedProducts);
  };

  return (
    <section id="products" className="max-w-full mx-auto pb-10 px-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Our <span className="text-coral-red">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-1 text-slate-gray text-center px-2 sm:px-0">
          Browse our top-notch quality and the best beers, wines, and accessories
        </p>
       
      </div>

      {/* Horizontal scroll section for products */}
      <div className="mt-8 flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] flex-shrink-0"
            >
              <PopularProductCard {...product} />
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-slate-gray">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
