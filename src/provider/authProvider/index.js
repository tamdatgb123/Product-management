import React from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  return (
    <AuthContext.Provider value={{ id, role, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
