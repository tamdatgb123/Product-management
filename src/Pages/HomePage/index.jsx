import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import { useData } from "../../provider/defaultProvider/dataContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { data } = useData();

  const navigateToListing = () => {
    navigate("/listing");
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (id) => {
    navigate(`/listing/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full lg:w-4/5">
          <div className="relative mb-10">
            <div className="flex flex-col justify-center items-center h-96 w-full p-10 gap-10">
              <span className="text-4xl md:text-5xl font-semibold text-white">
                Buy mechanical keyboard right here
              </span>
              <div>
                <Button
                  className="text-2xl p-0 bg-inherit hover:text-inherit hover:bg-white"
                  onClick={navigateToListing}
                >
                  Buy Now
                </Button>
              </div>
            </div>
            <div className="absolute top-0 w-full h-full z-[-1] bg-gray-900 opacity-60"></div>
            <img
              src="https://kccshop.vn/media/product/250-3728-318663747_5750529725016272_217157437340606744_n.jpeg"
              alt="bannerImage"
              className="object-cover w-full h-full rounded absolute top-0 z-[-2]"
            />
          </div>
          <div className="w-full h-40">
            <img
              src="https://maytinhdalat.vn/Images/Product/maytinhdalat_gaming-gear-3.jpg"
              alt="bannerImage"
              className="object-cover w-full h-full rounded"
            />
          </div>
          <div className="py-10">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
              <div className="relative w-full h-full">
                <img
                  className="w-full h-full absolute top-0 object-cover z-[-1] rounded"
                  src="https://cdn.shopify.com/s/files/1/0012/4957/4961/files/k596_red_switches_large.JPG?v=1578283039"
                  alt="red switch images"
                />
                <div className="w-full h-full flex justify-center items-center">
                  <span
                    className="text-5xl text-red-900 font-bold drop-shadow-right cursor-pointer
                    hover:scale-125 hover:translate-y-[-2rem] transition duration-1000"
                    onClick={navigateToListing}
                  >
                    Red Switch
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {data &&
                  data.products.slice(0, 4).map((product, index) => (
                    <div
                      key={index}
                      className="w-full h-full cursor-pointer hover:scale-110 transition duration-1000"
                      onClick={() => handleSelectProduct(product.id)}
                    >
                      <img
                        src={product.images}
                        alt="product image"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full h-40">
            <img
              src="https://maytinhdalat.vn/Images/Product/maytinhdalat_gaming-gear-3.jpg"
              alt="bannerImage"
              className="object-cover w-full h-full rounded"
            />
          </div>
          <div className="py-10">
            <div className="w-full flex flex-col flex-col-reverse md:grid md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {data &&
                  data.products.slice(4, 8).map((product, index) => (
                    <div
                      key={index}
                      className="w-full h-full cursor-pointer hover:scale-110 transition duration-1000"
                      onClick={() => handleSelectProduct(product.id)}
                    >
                      <img
                        src={product.images}
                        alt="product image"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
              </div>
              <div className="relative w-full h-full">
                <img
                  className="w-full h-full absolute top-0 object-cover z-[-1] rounded"
                  src="https://thumbs.dreamstime.com/b/selected-focus-narrow-depth-blue-switch-disassembled-mechanical-keyboard-game-narrow-depth-blue-switch-256775617.jpg"
                  alt="blue switch images"
                />
                <div className="w-full h-full flex justify-center items-center">
                  <span
                    className="text-6xl text-blue-900 font-bold drop-shadow-left cursor-pointer
                    hover:scale-125 hover:translate-y-[-2rem] transition duration-1000"
                    onClick={navigateToListing}
                  >
                    Blue Switch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
