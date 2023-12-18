import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingIcon from "../../../public/icons/Loading";
import { formatNumber } from "../../utils/formatNumber";
import Input from "../../Components/Input";
import MinusIcon from "../../../public/icons/Minus";
import PlusIcon from "../../../public/icons/Plus";
import Button from "../../Components/Button";
import { useCart } from "../../provider/defaultProvider/cartContext";
import { useAuth } from "../../provider/authProvider";
import { useData } from "../../provider/defaultProvider/dataContext";
import RecommendProduct from "./components/Recommend";

const DetailProductPage = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useCart();
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);

  const handleMinus = () => {
    const value = parseInt(quantity);
    if (value - 1 > 0) {
      setQuantity(value - 1);
    }
  };

  const handlePlus = () => {
    const value = parseInt(quantity);
    if (value + 1 < 10000000) {
      setQuantity(value + 1);
    }
  };

  const handleQuantity = (event) => {
    const value = event.target.value;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (role) {
      const itemAdded = cartItems.find((item) => item.id === id);
      if (cartItems.length > 0 && itemAdded) {
        const newsCart = cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCartItems(newsCart);
      } else {
        const newsCart = { id: id, quantity: quantity };
        setCartItems([...cartItems, newsCart]);
      }
    } else {
      navigate("/login");
    }
  };

  const handleDelete = () => {
    const newProducts = data.products.filter((item) => item.id !== id);
    const updateData = JSON.stringify({ ...data, products: newProducts });
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: updateData,
        });

        const result = await response.json();
        console.log("Delete product successfully", result);
      } catch (error) {
        console.error("Error delete product", error);
      }
    };
    fetchData();
    navigate("/listing");
  };

  React.useEffect(() => {
    if (data) {
      const product = data.products.find((item) => item.id == id);
      setProduct(product);
    }
  }, [id, data]);

  React.useEffect(() => {
    setQuantity(1);
  }, [id])

  return (
    <>
      <div className="flex justify-center p-4 min-h-screen">
        <div className="relative w-full lg:w-4/5 justify-center">
          {product ? (
            <div className="relative md:flex gap-4">
              <div className="w-full md:w-96 h-full">
                <img
                  src={product.images}
                  alt="product_img"
                  className="object-cover rounded"
                />
              </div>
              <div className="flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">{product.name}</div>
                  <div className="text-red-500">5.0 ★★★★★</div>
                  <div className="text-2xl lg:text-3xl text-red-500">
                    ₫{formatNumber(product.price)}
                  </div>
                </div>
                <div className="flex w-fit items-center">
                  <div className="flex w-fit items-center">
                    <div
                      className="border border-gray-300 p-0.5 cursor-pointer"
                      onClick={handleMinus}
                    >
                      <div className="w-6">
                        <MinusIcon />
                      </div>
                    </div>
                    <Input
                      type="number"
                      value={quantity}
                      className="!w-14 py-0.5 px-2 text-center"
                      onChange={handleQuantity}
                    />
                    <div
                      className="border border-gray-300 p-0.5 cursor-pointer"
                      onClick={handlePlus}
                    >
                      <div className="w-6">
                        <PlusIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {role == "admin" ? (
                    <Button className="text-xl" onClick={handleDelete}>
                      Delete this item
                    </Button>
                  ) : (
                    <Button className="text-xl" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-screen bg-white flex justify-center items-center">
              <div className="animate-spin text-xl font-medium">
                <LoadingIcon className="w-20 h-20 text-gray-500" />
              </div>
            </div>
          )}
          <div className="relative py-8">
            <RecommendProduct currentId={id} data={data} navigate={navigate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
