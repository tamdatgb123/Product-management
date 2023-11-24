import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import DetailProductPage from "../Pages/DetailProductPage";
import Layout from "../Layout";
import CartPage from "../Pages/CartPage";
import { useAuth } from "../provider/authProvider";

const Routes = () => {
    const { token } = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Layout>
                    <HomePage /> 
                </Layout>
            ),
        },
        {
            path: "/product-detail/:id",
            element: (
                <Layout>
                    <DetailProductPage />
                </Layout>
            ),
        },
        {
            path: "/cart",
            element: (
                <Layout>
                    <CartPage />
                </Layout>
            ),
        },
        {
            path: "/login",
            element: !token ? <LoginPage /> : <Navigate to="/" />,
        },
    ]);

    return <RouterProvider router={router} />;
}; 

export default Routes;