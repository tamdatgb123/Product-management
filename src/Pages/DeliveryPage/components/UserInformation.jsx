import React from "react";
import Button from "../../../Components/Button";

const UserInformation = ({ order, onConfirm }) => {
  return (
    <>
      {order && (
        <div className="w-full border border-gray-300 shadow p-4 mt-4">
          <div className="flex justify-between items-center">
            <div>{order.fullname}</div>
            <div>{order.address}</div>
            <div>{order.phone}</div>
            <div>{order.status}</div>
            <div>
              {order.status == "waiting" ? null : (
                <Button onClick={() => onConfirm(order._id)}>Confirm</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInformation;
