import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const [numOfWishListItems, setNumOfWishListItems] = useState(0);
  const headers = {
    token: localStorage.getItem("token"),
  };
  function addToWishlist(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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

  function getLoggedWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }

  function removeProductFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }

  async function getWishlistData() {
    let response = await getLoggedWishlist();
    setNumOfWishListItems(response.count);
  }

  useEffect(() => {
    getWishlistData();
  }, [])
  

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getLoggedWishlist,
        removeProductFromWishlist,
        numOfWishListItems,
        setNumOfWishListItems
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
