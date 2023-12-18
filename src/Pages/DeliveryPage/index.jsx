import React from "react";
import ItemsOrder from "./components/ItemsOrder";
import UserInformation from "./components/UserInformation";
import { useData } from "../../provider/defaultProvider/dataContext";
import { useAuth } from "../../provider/authProvider";
import Stepper from "./components/Stepper";
import { getCurrentDay } from "../../utils/getCurrentDay";

const DeliveryPage = () => {
  const { data } = useData();
  const { id } = useAuth();
  const [orderList, setOrderList] = React.useState([]);
  const currentDay = getCurrentDay();

  React.useEffect(() => {
    if (data) {
      const orders = data.order.filter(
        (order) => order.user_id == id && order.status != "finish"
      );
      setOrderList(orders);
    }
  }, [data]);

  const handleConfirm = (id) => {
    const newDataOrder = data.order.map((order) =>
      order._id === id ? { ...order, status: "finish", finish_day: currentDay } : order
    );
    const updateData = JSON.stringify({ ...data, order: [...newDataOrder] });
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: updateData,
        });

        const result = response.json();
        console.log("Confirm order successfully", result);
      } catch (error) {
        console.error("Error confirm order", error);
      }
    };
    fetchData();
    location.reload();
  };

  return (
      <div>
        <div className="w-4/5 mx-auto mt-6 text-3xl font-semibold">
          Delivery
        </div>
        <div className="w-4/5 mx-auto mb-6">
          {orderList &&
            orderList.map((order, index) => (
              <div key={index}>
                <UserInformation order={order} onConfirm={handleConfirm} />
                <ItemsOrder data={data} order={order} />
              </div>
            ))}
        </div>
      </div>
  );
};

export default DeliveryPage;
