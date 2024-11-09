import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, iconURL }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
    // Delay navigation by a short amount of time to show loading
    setTimeout(() => {
      navigate("/products");
    }, 1000); // 1 second delay for loading effect
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-column justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-coral-red rounded-full text-white border-x-coral-red relative z-10"
      >
        {label}
        <img
          src={iconURL}
          alt="arrow right icon"
          className="ml-2 rounded-full w-5 h-5"
        />
      </button>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="loader w-12 h-12 border-4 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default Button;
