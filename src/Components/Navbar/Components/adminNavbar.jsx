import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.reload("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-4">
      <div className="cursor-pointer" onClick={() => navigate("/admin")}>
        Admin
      </div>
      <div className="cursor-pointer" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default AdminNavbar;
