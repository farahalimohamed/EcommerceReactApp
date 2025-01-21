import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "categories",
          element: <Categories />
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
  return <RouterProvider router={routes}></RouterProvider>;
}
