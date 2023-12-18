import React from "react";
import ProductCard from "../../../Components/ProductCard";
import { formatNumber } from "../../../utils/formatNumber";

const RecommendProduct = ({ currentId, data, navigate }) => {
  return (
    <>
      <div className="text-2xl mb-4 font-semibold">Recommend</div>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {data &&
          data.products.filter(product => product.id != currentId).slice(0,4).map((product, index) => (
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
    </>
  );
};

export default RecommendProduct;
