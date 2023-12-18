import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import DetailProductPage from "../Pages/DetailProductPage";
import AdminPage from "../Pages/AdminPage";
import Layout from "../Layout";
import CartPage from "../Pages/CartPage";
import { useAuth } from "../provider/authProvider";
import ListingPage from "../Pages/ListingPage";
import CheckoutPage from "../Pages/CheckoutPage";
import { useCart } from "../provider/defaultProvider/cartContext";
import DeliveryPage from "../Pages/DeliveryPage";

const Routes = () => {
  const { token, role } = useAuth();
  const { cartItems } = useCart();

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
      path: "/listing",
      element: (
        <Layout>
          <ListingPage />
        </Layout>
      ),
    },
    {
      path: "/listing/:id",
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
      path: "/checkout",
      element:
        cartItems.length > 0 ? (
          <Layout>
            <CheckoutPage />
          </Layout>
        ) : (
          <Navigate to="/cart" />
        ),
    },
    {
      path: "/delivery",
      element: (
        <Layout>
          <DeliveryPage />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: !token ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: "/admin",
      element: role == "admin" ? <AdminPage /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
