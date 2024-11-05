const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {
  // Update the big shoe image when the card itself is clicked
  const handleCardClick = () => {
    if (bigShoeImg !== imgURL.bigShoe) {
      changeBigShoeImage(imgURL.bigShoe);
    }
  };

  return (
    <div
      className={`border-2 rounded-xl ${
        bigShoeImg === imgURL.bigShoe ? "border-coral-red" : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
      onClick={handleCardClick} // Only updates the main image on card click
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <img
          src={imgURL.thumbnail}
          alt="Shoe Thumbnail"
          width={127}
          height={103}
          className="object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ShoeCard;
