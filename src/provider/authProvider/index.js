import React, { useContext } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    return (
        <AuthContext.Provider
            value={{ id, token }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};