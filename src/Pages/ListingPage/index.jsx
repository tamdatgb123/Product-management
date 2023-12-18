import React from "react";
import ProductCard from "../../Components/ProductCard";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";
import { useData } from "../../provider/defaultProvider/dataContext";

const ListingPage = () => {
  const navigate = useNavigate();
  const { data } = useData();

  const categories = [
    {
      id: 1,
      name: "Blue switch",
    },
    {
      id: 2,
      name: "Red switch",
    },
    {
      id: 3,
      name: "Mini",
    },
    {
      id: 4,
      name: "Mechanical",
    },
    {
      id: 5,
      name: "Fake mechanical",
    },
    {
      id: 6,
      name: "Keycaps",
    },
  ];

  return (
    <>
      <div className="w-full flex">
        <div className="hidden lg:block w-96 bg-white rounded shadow p-4 m-4">
          <div className="text-2xl font-medium text-gray-700">Category</div>
          <div className="mt-4">
            <ul className="gap-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="text-gray-700 cursor-pointer py-1"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
          {data &&
            data.products.map((product) => (
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
    </>
  );
};

export default ListingPage;
