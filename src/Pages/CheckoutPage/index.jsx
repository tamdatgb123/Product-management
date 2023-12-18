import React from "react";
import FormLocation from "./components/FormLocation";
import { useData } from "../../provider/defaultProvider/dataContext";
import { formatNumber } from "../../utils/formatNumber";
import { useCart } from "../../provider/defaultProvider/cartContext";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { getCurrentDay } from "../../utils/getCurrentDay";

const CheckoutPage = () => {
  const { data } = useData();
  const { id } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [productList, setProductList] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [showForm, setShowForm] = React.useState(false);

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

  const [information, setInformation] = React.useState({
    fullname: "",
    phone: "",
    address: "",
    type_address: "",
  });

  const currentDay = getCurrentDay();

  const handlePurchase = () => {
    const newOrderId = (data.order.length + 1).toString();
    const newOrder = {
      _id: newOrderId,
      user_id: id,
      cart: { ...cartItems },
      status: "waiting",
      order_day: currentDay,
      ...information,
    };
    const updateData = JSON.stringify({
      ...data,
      order: [...data.order, newOrder],
    });
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: updateData,
        });

        const result = response.json();
        console.log("Add order successfully", result);
      } catch (error) {
        console.error("Error add order", error);
      }
    };
    fetchData();
    navigate("/listing");
    location.reload();
  };

  const handleShowForm = () => {
    setShowForm(true);
    document.body.classList.add("overflow-hidden");
  };

  React.useEffect(() => {
    if (!(cartItems.length > 0)) {
      navigate("/listing");
    }
    if (Object.values(information).includes("")) {
      handleShowForm();
    }
  }, [cartItems, information]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/5">
          <div className="w-full p-4">
            <div className="flex items-center mb-4 gap-4">
              <div className="text-3xl font-semibold">Checkout</div>
            </div>
            <div className="shadow border border-gray-300 my-2">
              <div className="text-xl text-red-500 px-4 pt-4">
                Delivery address
              </div>
              <div className="w-full flex justify-between items-end gap-4 p-4">
                <div className="flex items-end gap-4">
                  <div className="font-semibold text-xl">
                    <span>{information.fullname} </span>
                    <span>{information.phone} </span>
                  </div>
                  <div className="text-lg">{information.address}</div>
                </div>
                <div
                  className="text-lg text-blue-500 cursor-pointer"
                  onClick={handleShowForm}
                >
                  Change
                </div>
              </div>
            </div>
            <div>
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
                  </div>
                ))}
              </div>

              <div className="w-full flex justify-between items-center border border-gray-300 p-4 bg-white">
                <div className="text-xl">
                  Total payment:{" "}
                  <span className="text-red-500">₫{formatNumber(total)}</span>
                </div>
                <Button onClick={handlePurchase}>Confirm</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForm ? (
        <FormLocation
          formData={information}
          setFormData={setInformation}
          setShowForm={setShowForm}
        />
      ) : null}
    </>
  );
};

export default CheckoutPage;
