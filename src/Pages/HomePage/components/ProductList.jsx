import React from "react";
import ProductCard from "../../../Components/ProductCard";
import { formatNumber } from "../../../utils/formatNumber";

const ProductList = ({ data, navigate }) => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-semibold">List Product</div>
        <div
          className="cursor-pointer hover:translate-x-[-0.25rem] transition-transform hover:font-medium"
          onClick={() => navigate("/listing")}
        >
          View more
        </div>
      </div>
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {data &&
          data.products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="w-full cursor-pointer"
              onClick={() => navigate(`/listing/${product.id}`)}
            >
              <ProductCard
                images={product.images}
                name={product.name}
                price={`₫${formatNumber(product.price)}`}
                city={product.city}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
