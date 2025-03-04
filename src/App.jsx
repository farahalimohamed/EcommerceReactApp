import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import AuthLayout from "./Pages/AuthLayout/AuthLayout";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { Offline } from "react-detect-offline";
import { RiWifiOffLine } from "react-icons/ri";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import OrderContextProvider from "./Context/OrderContext";
import WishlistContextProvider from "./Context/WishlistContext";
import NotFound from "./Pages/NotFound/NotFound";

export default function App() {
  const Home = lazy(() => import("./Pages/Home/Home"));
  const Products = lazy(() => import("./Pages/Products/Products"));
  const Cart = lazy(() => import("./Pages/Cart/Cart"));
  const Categories = lazy(() => import("./Pages/Categories/Categories"));
  const Brands = lazy(() => import("./Pages/Brands/Brands"));
  const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
  const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
  const AllOrders = lazy(() => import("./Pages/AllOrders/AllOrders"));
  const ProductDetails = lazy(() =>
    import("./Pages/ProductDetails/ProductDetails")
  );
  const ForgotPassword = lazy(() =>
    import("./Pages/ForgotPassword/ForgotPassword")
  );
  const Login = lazy(() => import("./Pages/Login/Login"));
  const Register = lazy(() => import("./Pages/Register/Register"));
  const routes = createBrowserRouter(
    [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "products",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Products />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "productdetails/:productId",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <ProductDetails />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "cart",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "checkout",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Checkout />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "allorders",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <AllOrders />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "categories",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Categories />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "brands",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Brands />
                </ProtectedRoutes>
              </Suspense>
            ),
          },
          {
            path: "wishlist",
            element: (
              <Suspense>
                <ProtectedRoutes>
                  <Wishlist />
                </ProtectedRoutes>
              </Suspense>
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
            element: (
              <Suspense>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "register",
            element: (
              <Suspense>
                <Register />
              </Suspense>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <Suspense>
                <ForgotPassword />
              </Suspense>
            ),
          },
        ],
      },
    ],
    {
      basename: "/",
    }
  );
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
