import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import AuthLayout from "./Pages/AuthLayout/AuthLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { Offline } from "react-detect-offline";
import { RiWifiOffLine } from "react-icons/ri";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/AllOrders/AllOrders";
import OrderContextProvider from "./Context/OrderContext";
import Brands from "./Pages/Brands/Brands";
import Wishlist from "./Pages/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:productId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <OrderContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <Offline>
              <div className="offline fixed bottom-2 right-4 bg-[#6456ff] text-white p-3 rounded-md z-50">
                <RiWifiOffLine className="inline" />
                <span className="ml-2">You are offline!</span>
              </div>
            </Offline>
            <Toaster position="bottom-right" />
            <RouterProvider router={routes}></RouterProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </OrderContextProvider>
    </TokenContextProvider>
  );
}
