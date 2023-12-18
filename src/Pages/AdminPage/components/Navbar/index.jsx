import React from "react";
import ShoppingCart from "../../../../../public/icons/ShoppingCart";
import UserIcon from "../../../../../public/icons/User";

const Navbar = ({ renderPage, setRenderPage }) => {
  return (
    <div className="w-60 h-screen fixed bg-blue-400 shadow-lg">
      <div
        onClick={() => setRenderPage("order")}
        className={`w-full h-20 flex items-center border border-gray-400 
                gap-4 p-4 cursor-pointer hover:bg-gray-300 ${
                  renderPage == "order" ? "bg-gray-700 text-white" : ""
                }`}
      >
        <div className="w-8">
          <ShoppingCart />
        </div>
        <div className="text-3xl">Order</div>
      </div>
      <div
        onClick={() => setRenderPage("user")}
        className={`w-full h-20 flex items-center border border-gray-400 
                gap-4 p-4 cursor-pointer hover:bg-gray-300 ${
                  renderPage == "user" ? "bg-gray-700 text-white" : ""
                }`}
      >
        <div className="w-8">
          <UserIcon />
        </div>
        <div className="text-3xl">User</div>
      </div>
    </div>
  );
};

export default Navbar;
