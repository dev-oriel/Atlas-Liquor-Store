import { arrowRight } from "../assets/icons";
import Button from "../components/Button";
import { statistics } from "../constants";

const Hero = () => {
  return (
    <section
      id="home"
      className="border-2 border-red-600 p-4 w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container "
    >
      <div className="border-2 border-blue-600 relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p>Alcoholic Products</p>
        <h1>
          <span>DISCOVER OUR PRODUCTS</span>
          <br />
          <span>BEST </span>
          <span>IN TOWN</span>
        </h1>
        <p>A Premium Store for Unique Alcoholic Products in Nairobi, Kenya</p>
        <Button label="Shop now" iconURL={arrowRight} />
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p>{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
