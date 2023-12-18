import React from "react";
import { formatNumber } from "../../../../../utils/formatNumber";

const ItemsOrder = ({ data, order }) => {
  const [productList, setProductList] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const cartItems = Object.values(order.cart);
    const productId = cartItems.map((item) => item.id);
    const productsInCart = data.products.filter((product) =>
      productId.includes(product.id)
    );

    const newTotal = productsInCart.reduce(
      (total, product) => total + (product.price ? parseInt(product.price) : 0),
      0
    );
    setTotal(newTotal);

    setProductList(productsInCart);
  }, [order, data.products]);

  return (
    <div className="bg-white">
      <div className="p-4 border-x">
        {productList &&
          productList.map((item, index) => (
            <div
              key={index}
              className="w-full md:flex justify-between items-center py-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-10">
                  <img src={item.images} alt="itemImage" />
                </div>
                <div className="w-40 md:w-60 lg:w-[32rem] whitespace-nowrap h-10 flex items-center overflow-hidden text-lg">
                  {item.name}
                </div>
              </div>
              <div className="text-red-500 text-base">
                ₫{formatNumber(item.price)}
              </div>
              <div>
                <div>{item.quantity}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full md:flex justify-end items-center p-4 border">
        <div className="text-xl">
          <div>
            Total: <span className="text-red-500">{formatNumber(total)}</span>
          </div>
          {order.status == "waiting" ? (
            <div>
              Day order: <span>{order.order_day}</span>
            </div>
          ) : order.status == "delivering" ? (
            <div>
              Day delivering: <span>{order.delivering_day}</span>
            </div>
          ) : (
            <div>
              Day received: <span>{order.finish_day}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsOrder;
