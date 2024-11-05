import { arrowRight } from "../assets/icons";
import { bigShoe1 } from "../assets/images";
import Button from "../components/Button";
import ShoeCard from "../components/ShoeCard";
import { shoes, statistics } from "../constants";
import { useState } from "react";

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1); // State to manage the big shoe image

  return (
    <section
      id="home"
      className="p-4 mt-28 w-full flex flex-col xl:flex-row justify-center min-h-screen gap-6 sm:gap-10 max-container mb-10 sm:mb-20"
    >
      {/* Left Section */}
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full px-4 pt-10 sm:pt-28">
        <p className="text-lg sm:text-xl font-montserrat text-coral-red">
          Alcoholic Products
        </p>
        <h1 className="mt-4 sm:mt-10 font-palanquin text-5xl sm:text-8xl max-sm:text-[40px] max-sm:leading-[50px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-4 sm:pr-10">
            Discover our Products
          </span>
          <br />
          <span className="text-coral-red inline-block mt-2 sm:mt-3">
            Best{" "}
          </span>
          <span> in Town</span>
        </h1>
        <p className="font-montserrat text-gray-600 text-base sm:text-lg leading-7 sm:leading-8 mt-4 sm:mt-6 mb-8 sm:mb-14 max-w-xs sm:max-w-sm">
          A Premium Store for Unique Alcoholic Products in Nairobi, Kenya
        </p>
        <Button label="Shop now" iconURL={arrowRight} />
        <div className="flex justify-start items-start flex-wrap w-full mt-12 sm:mt-20 gap-8 sm:gap-16">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-palanquin font-bold">
                {stat.value}
              </p>
              <p className="text-base sm:text-lg leading-6 sm:leading-7 font-montserrat text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen bg-primary bg-hero bg-cover bg-center py-10 sm:py-40">
        <img
          src={bigShoeImg}
          alt="Shoe Collection"
          className="object-contain relative z-10 rotate-12 mb-20 sm:mb-48 ml-0 sm:ml-20 max-w-xs sm:max-w-lg"
        />
        <div className="flex gap-2 sm:gap-6 absolute -bottom-[10%] sm:-bottom-[5%] left-0 right-0 px-4 sm:px-6 overflow-x-auto">
          {shoes.map((shoe) => (
            <ShoeCard
              key={shoe.id}
              imgURL={shoe}
              changeBigShoeImage={setBigShoeImg}
              bigShoeImg={bigShoeImg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
