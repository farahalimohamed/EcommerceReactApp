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
              <Products />,
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:productId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />,
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />,
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />,
            </ProtectedRoutes>
          ),
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
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <Offline>
        <div className="offline fixed bottom-2 right-4 bg-blue-500 text-white p-3 rounded-md z-50">
          <RiWifiOffLine className="inline" />
          <span className="ml-2">You are offline!</span>
        </div>
      </Offline>
      <RouterProvider router={routes}></RouterProvider>
    </TokenContextProvider>
  );
}
