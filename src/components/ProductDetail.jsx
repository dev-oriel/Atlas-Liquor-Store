import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../constants";
import RelatedProducts from "./RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((product) => product.id === productId);

  // State for quantity and selected related product
  const [quantity, setQuantity] = useState(1);
  const [selectedRelatedProduct, setSelectedRelatedProduct] = useState(null);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  // Calculate total price
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Link to="/" className="text-blue-500 underline mb-4">
        Back to Products
      </Link>
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={product.imgURL}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300" // Smooth transition for image
          />
        </div>
        {/* Product Details */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-xl font-semibold text-coral-red">
              Ksh {totalPrice} {/* Display total price */}
            </p>
            <p className="mt-2">{product.description}</p>

            {/* Additional product information */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Product Details</h3>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                <li>
                  <strong>Country of Origin:</strong> {product.origin || "N/A"}
                </li>
                <li>
                  <strong>Alcohol Content:</strong>{" "}
                  {product.alcoholContent || "N/A"}%
                </li>
                <li>
                  <strong>Brand:</strong> {product.brand || "N/A"}
                </li>
                <li>
                  <strong>Type:</strong> {product.type || "N/A"}
                </li>
                <li>
                  <strong>Stock Status:</strong>{" "}
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </li>
              </ul>
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex flex-col items-left mt-6">
            <div className="flex items-center mb-4">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="mx-4 text-xl">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button className="bg-coral-red mb-6 text-white px-4 py-2 rounded hover:bg-red-600">
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Additional Description */}
      <div className="mt-20 p-4 border-t border-gray-300">
        <h3 className="text-2xl font-semibold text-center">
          About the Product
        </h3>
        <p className="mt-2">
          {product.name} is a Kenyan liquor classified as craft beer. It
          contains 6.5% ABV (alcohol by volume) and is known for its dark golden
          color and pleasant hoppy aroma of tropical fruits, grapefruit, and
          pine. It has a dry and distinct bitter finish, with heavy hops and
          hints of spice and tropical fruit.
        </p>
        <p className="mt-2">
          Bila Shaka is a classic IPA, produced by Bateleur Beer, an unfiltered
          craft beer made in Kenya. It’s a bottle-conditioned beer with no
          preservatives, no stabilizers, and no sugar added.
        </p>
        <p className="mt-2">
          <strong>Beer Style:</strong> IPA
          <br />
          <strong>Alcohol:</strong> 6.5% ABV
          <br />
          <strong>Bitterness:</strong> 35 IBU
        </p>
      </div>

      {/* Related Products Section */}
      <RelatedProducts 
        currentProductId={productId} 
        selectedRelatedProduct={selectedRelatedProduct} 
        setSelectedRelatedProduct={setSelectedRelatedProduct} 
      />
    </div>
  );
};

export default ProductDetail;
