import React from "react";
import UserInformation from "./components/UserInformation";
import ItemsOrder from "./components/ItemsOrder";
import { getCurrentDay } from "../../../../utils/getCurrentDay";

const OrderTab = ({data}) => {
    const currentDay = getCurrentDay();

    const handleConfirm = (id) => {
        const newDataOrder = data.order.map(order => order._id === id ? { ...order, status: "delivering", delivering_day: currentDay} : order);
        const updateData = JSON.stringify({ ...data , order: [...newDataOrder]});
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/data", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: updateData,
                });
        
                const result = response.json();
                console.log('Confirm order successfully', result);
            }
            catch (error) {
                console.error("Error confirm order", error);
            }
        }
        fetchData();
        location.reload();
    }

    return (
        <div className="p-8">
            {data && data.order.map((order, index) => (
                <div key={index}>
                    <UserInformation order={order} onConfirm={handleConfirm} />
                    <ItemsOrder data={data} order={order} />
                </div>
            ))}
        </div>
    )
}

export default OrderTab;