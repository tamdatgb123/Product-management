import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import AdminNavbar from "./Components/adminNavbar";
import ShoppingCart from "../../../public/icons/ShoppingCart";
import { useCart } from "../../provider/defaultProvider/cartContext";
import CarShipping from "../../../public/icons/CarShipping";
import { useData } from "../../provider/defaultProvider/dataContext";
import UserIcon from "../../../public/icons/User";
import LogoutIcon from "../../../public/icons/Logout";
import Input from "../Input";
import SearchIcon from "../../../public/icons/Search";

const Navbar = () => {
  const navigate = useNavigate();
  const { role, token, id } = useAuth();
  const { data } = useData();
  const { cartItems } = useCart();

  const [numberProduct, setNumberProduct] = React.useState(0);
  const [numberOrder, setNumberOrder] = React.useState(0);
  const [showOption, setShowOption] = React.useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.reload("/");
  };

  React.useEffect(() => {
    if (cartItems) {
      const sumProducts = Object.keys(cartItems).length;
      setNumberProduct(sumProducts);
    }
  }, [cartItems]);

  React.useEffect(() => {
    if (data) {
      const countOrder = data.order.filter((order) => order.user_id == id && order.status != "finish").length;
      setNumberOrder(countOrder);
    }
  }, [data]);

  return (
    <>
      <div className="w-full sticky top-0 z-20">
        {role == "admin" && (
          <div className="w-full">
            <AdminNavbar />
          </div>
        )}
        <div className="w-full h-20 flex justify-center bg-white shadow w-full">
          <div className="w-full lg:w-4/5 flex justify-between items-center py-4 px-4 lg:px-0">
            <div
              className="flex items-center text-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="https://media.istockphoto.com/id/1170794027/id/vektor/ilustrasi-vektor-logo-lucu-yin-yang-panda.jpg?s=2048x2048&w=is&k=20&c=whHouTfdtDkJiTx8f6ZR9EkVIJPkz52HeBWGwm4tsvA="
                alt="logo"
                className="w-5 h-5 mr-2"
              />
              <span>Panda</span>
            </div>
            <div className="hidden w-96 lg:flex justify-between items-center border border-gray-300 rounded-full px-4">
              <Input className="w-full border-none focus:border-0 focus:ring-0 focus:ring-sky-500" />
              <div className="pl-2 border-l">
                <SearchIcon className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-10">
              {!token ? (
                <div
                  className="text-lg cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </div>
              ) : (
                <>
                  {role != "admin" && (
                    <div className="flex items-center cursor-pointer">
                      <div
                        className="relative w-10"
                        onClick={() => navigate("/cart")}
                      >
                        {numberProduct == 0 ? (
                          ""
                        ) : (
                          <div className="flex justify-center items-center absolute w-5 h-4 text-xs bg-white rounded-full top-0 right-0 shadow">
                            {numberProduct}
                          </div>
                        )}
                        <div className="w-6">
                          <ShoppingCart />
                        </div>
                      </div>
                      <div
                        className="relative w-10"
                        onClick={() => navigate("/delivery")}
                      >
                        {numberOrder == 0 ? (
                          ""
                        ) : (
                          <div className="flex justify-center items-center absolute w-5 h-4 text-xs bg-white rounded-full top-0 right-0 shadow">
                            {numberOrder}
                          </div>
                        )}
                        <div className="w-6">
                          <CarShipping />
                        </div>
                      </div>
                      <div className="relative">
                        <div
                          className="w-6"
                          onClick={() => setShowOption(!showOption)}
                        >
                          <UserIcon />
                        </div>
                        {showOption && (
                          <div className="absolute top-12 right-0 bg-white p-4 border rounded-lg z-10">
                            <div
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={logout}
                            >
                              <LogoutIcon className="w-5 h-5" />
                              Logout
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden p-2 bg-white shadow">
          <div className="flex w-full justify-between items-center border border-gray-300 rounded-full px-4">
            <Input className="w-full border-none focus:border-0 focus:ring-0 focus:ring-sky-500" />
            <div className="pl-2 border-l">
              <SearchIcon className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
