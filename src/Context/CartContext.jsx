import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

const headers = {
  token: localStorage.getItem("token"),
};
function addToCart(id) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => err);
}

function getLoggedCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
}

function removeProductFromCart(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
}

function clearCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
}

function updateProductQuantity(productId, count) {
  return axios
    .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      count: count,
    }, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export default function CartContextProvider({ children }) {
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedCart,
        removeProductFromCart,
        updateProductQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
