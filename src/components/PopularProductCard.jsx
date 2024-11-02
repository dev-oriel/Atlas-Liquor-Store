import React from "react";
import { Link } from "react-router-dom";

const PopularProductCard = ({ id, imgURL, name, price }) => {
    const whatsappLink = `https://wa.me/+254758997669?text=I'm interested in purchasing the ${name}.`;

    return (
        <div className="flex flex-col w-[300px] max-sm:w-full bg-white rounded-lg shadow-md overflow-hidden p-4">
            <Link to={`/product/${id}`} className="block">
                <img src={imgURL} alt={name} className="w-full h-[250px] object-cover rounded-md" />
                
                <div className="mt-4 px-2">
                    <h3 className="text-xl font-semibold font-palanquin text-gray-800 truncate">
                        {name}
                    </h3>
                    <p className="mt-1 font-semibold font-montserrat text-coral-red text-xl">
                        {price}
                    </p>
                </div>
            </Link>

            <div className="mt-4 flex flex-col space-y-2">
                <button className="px-6 py-2 bg-coral-red text-white font-semibold rounded-md hover:bg-red-500 transition duration-300">
                    Add to Cart
                </button>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 text-center"
                >
                    Order via WhatsApp
                </a>
            </div>
        </div>
    );
};

export default PopularProductCard;
