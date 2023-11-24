import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const Navbar = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("id");
        window.location.reload("/");
    };

    return (
        <div className="flex justify-between items-center bg-blue-400 p-4">
            <div
                className="text-xl cursor-pointer"
                onClick={() => navigate("/")}
            >
                Home
            </div>
            <div className="flex gap-10">
                <div
                    className="text-xl cursor-pointer"
                    onClick={() => navigate("/cart")}
                >
                    Cart
                </div>
                {!token ? 
                <div
                    className="text-xl cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Login
                </div> : <div
                    className="text-xl cursor-pointer"
                    onClick={logout}
                >
                    Logout
                </div>}
            </div>
        </div>
    )
}

export default Navbar;