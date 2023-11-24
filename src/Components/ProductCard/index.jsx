import React from "react";

const ProductCard = ({
    images, 
    name, 
    price, 
    city
}) => {
    return (
        <div className="w-full min-w-[15rem] min-h-[24rem] bg-white shadow rounded-sm gap-4">
            <div className="w-full h-1/2">
                <img src={images} alt="images" />
            </div>
            <div className="grid grid-rows-3 content-between items-center p-2">
                <div className="h-12 overflow-hidden">
                    {name}
                </div>
                <div className="text-xl text-red-500">
                    {price}
                </div>
                <div className="text-xs">
                    {city}
                </div>
            </div>
        </div>
    )
}

export default ProductCard;

