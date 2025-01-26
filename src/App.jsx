import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

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
      <RouterProvider router={routes}></RouterProvider>;
    </TokenContextProvider>
  );
}
