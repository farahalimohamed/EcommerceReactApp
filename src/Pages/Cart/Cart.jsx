import { Helmet } from "react-helmet";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../../Components/Loader/Loader";
import EmptyCart from "../../../public/assets/images/empty-cart.png";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedCart,
    removeProductFromCart,
    updateProductQuantity,
    clearCart,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  async function getData() {
    let data = await getLoggedCart();
    console.log(data);
    setCartData(data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function removeProduct(id) {
    let data = await removeProductFromCart(id);
    setCartData(data.data);
  }

  async function updateQuantity(id, count) {
    let data = await updateProductQuantity(id, count);
    setCartData(data.data);
  }

  async function clearAll() {
    let data = await clearCart();
    setCartData({ ...data.data, products: [] });
  }

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartData ? (
        cartData.products && cartData.products.length > 0 ? (
          <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Shopping Cart
            </h1>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="md:col-span-2 space-y-4">
                {cartData.products.map((product) => (
                  <div
                    key={product._id}
                    className="grid grid-cols-3 items-start gap-4"
                  >
                    <div className="col-span-2 flex items-start gap-4">
                      <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                        <img
                          src={product.product?.imageCover}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-base font-bold text-gray-800">
                          {product.product?.title}
                        </h3>
                        <p className="text-xs font-semibold text-gray-500 mt-0.5">
                          Brand: {product.product?.brand?.name}
                        </p>
                        <button
                          onClick={() => removeProduct(product.product?._id)}
                          className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 fill-current inline"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                              data-original="#000000"
                            />
                            <path
                              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                              data-original="#000000"
                            />
                          </svg>
                          REMOVE
                        </button>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
                        {product.price} EGP
                      </h4>
                      <div className="flex items-center gap-4 mt-6">
                        <button
                          disabled={product.count === 1}
                          onClick={() =>
                            updateQuantity(
                              product.product?._id,
                              product.count - 1
                            )
                          }
                          type="button"
                          className="mt-1 flex items-center px-3 py-1.5 disabled:opacity-50 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2.5 fill-current"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            />
                          </svg>
                        </button>
                        <span className="mx-2 font-bold">{product.count}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.product?._id,
                              product.count + 1
                            )
                          }
                          type="button"
                          className="mt-1 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2.5 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => clearAll()}
                    className="mt-6 font-semibold text-red-500 uppercase flex items-center gap-1 shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 fill-current inline"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      />
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      />
                    </svg>
                    Clear Cart
                  </button>
                </div>
              </div>
              <div className="bg-gray-100 rounded-md p-4 h-max">
                <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
                  Order Summary
                </h3>
                <ul className="text-gray-800 mt-6 space-y-3">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal{" "}
                    <span className="ml-auto font-bold">
                      {cartData.totalCartPrice
                        ? cartData.totalCartPrice
                        : "0.00"}{" "}
                      EGP
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Shipping <span className="ml-auto font-bold">0.00</span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Tax <span className="ml-auto font-bold">0.00</span>
                  </li>
                  <hr className="border-gray-300" />
                  <li className="flex flex-wrap gap-4 text-sm font-bold">
                    Total{" "}
                    <span className="ml-auto">
                      {cartData.totalCartPrice
                        ? cartData.totalCartPrice
                        : "0.00"}{" "}
                      EGP
                    </span>
                  </li>
                </ul>
                <div className="mt-6 flex flex-col space-y-3">
                  <Link
                    to="/checkout"
                    className="text-sm text-center px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-700 hover:bg-blue-800 hover:text-white text-white rounded-md"
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/products"
                    className="text-sm text-center px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 my-10">
          <img src={EmptyCart} className="h-80" />
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Your cart is empty
          </h1>
          <Link
            to="/products"
            className="text-sm text-center px-4 py-2.5 mt-4 font-semibold tracking-wide bg-blue-700 hover:bg-blue-800 hover:text-white text-white rounded-md"
          >
            Continue Shopping
          </Link>
        </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}
