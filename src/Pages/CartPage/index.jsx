import React from "react";
import { useCart } from "../../provider/defaultProvider/cartContext";
import Button from "../../Components/Button";
import { formatNumber } from "../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { useData } from "../../provider/defaultProvider/dataContext";
import ShoppingBag from "../../../public/icons/ShoppingBag";
import RecommendProduct from "./components/Recommend";

const CartPage = () => {
  const navigate = useNavigate();
  const { data } = useData();
  const { cartItems, setCartItems } = useCart();
  const [productList, setProductList] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (cartItems.length > 0) {
      let newProductList = [];
      for (const item of cartItems) {
        const product = data.products.find((product) => product.id == item.id);
        newProductList = [
          ...newProductList,
          { ...product, quantity: item.quantity },
        ];
      }
      setProductList(newProductList);
    }
  }, [cartItems]);

  React.useEffect(() => {
    let result = 0;
    for (const item of productList) {
      result = result + item.price * item.quantity;
    }
    setTotal(result);
  }, [productList]);

  const handleDeleteItem = (id) => {
    const newCart = productList.filter((item) => item.id !== id);
    if (newCart.length > 0) {
      setCartItems(newCart);
    } else {
      setCartItems([]);
      setProductList([]);
    };
  };

  const handlePurchase = () => {
    navigate("/checkout");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="w-full flex justify-center my-8">
        <div className="w-full lg:w-4/5 xl:w-3/5">
          {productList.length > 0 ? (
            <div>
              <div className="flex items-center mb-4 gap-4">
                <ShoppingBag className="w-8" />
                <div className="text-3xl font-semibold">Cart</div>
              </div>
              <div className="h-[32rem] overflow-y-scroll border border-gray-300 divide-y divide-gray-300 p-4">
                {productList.map((item, index) => (
                  <div
                    key={index}
                    className="w-full md:flex justify-between items-center py-2"
                  >
                    <div className="flex gap-4">
                      <div className="w-20">
                        <img src={item.images} alt="itemImage" />
                      </div>
                      <div className="w-60 md:w-96 h-20 flex overflow-hidden text-lg">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-red-500 text-lg">
                      ₫{formatNumber(item.price)}
                    </div>
                    <div>
                      <div>{item.quantity}</div>
                    </div>
                    <Button onClick={() => handleDeleteItem(item.id)}>
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-between items-center border border-gray-300 p-4 bg-white">
                <div className="text-xl">
                  Total payment:{" "}
                  <span className="text-red-500">₫{formatNumber(total)}</span>
                </div>
                <Button onClick={handlePurchase}>Purchase</Button>
              </div>
            </div>
          ) : (
            <div className="my-8">
              <div className="flex justify-center">
                <ShoppingBag className="w-1/12" />
              </div>
              <div className="flex justify-center text-xl">
                Your shopping cart is empty
              </div>
              <div className="my-8">
                <RecommendProduct data={data} navigate={navigate} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
