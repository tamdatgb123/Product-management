import React from "react";

const ProductCard = ({ images, name, price, city }) => {
  return (
    <div className="w-full min-w-[6rem] max-w-[20rem] bg-white shadow rounded-sm gap-4">
      <div className="w-full h-1/2">
        <img src={images} alt="images" className="rounded-t" />
      </div>
      <div className="grid grid-rows-3 content-between items-center p-2">
        <div className="text-xl truncate">{name}</div>
        <div className="text-xl text-red-500">{price}</div>
        <div className="text-xs">{city}</div>
      </div>
    </div>
  );
};

export default ProductCard;
