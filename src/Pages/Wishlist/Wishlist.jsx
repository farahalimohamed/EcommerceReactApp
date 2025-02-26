import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader/Loader";
import EmptyWishlist from "../../../public/assets/images/empty-cart.webp";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const {
    getLoggedWishlist,
    removeProductFromWishlist,
    setNumOfWishListItems,
  } = useContext(WishlistContext);
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);
  const [wishlistData, setWishlistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getWishlist() {
    try {
      let response = await getLoggedWishlist();
      setWishlistData(response.data);
      setNumOfWishListItems(response.count);
    } catch (error) {
      toast.error("Error fetching wishlist data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.status === "success") {
      setNumOfCartItems(response.numOfCartItems);
      setCartId(response.cartId);
      removeProductFromWishlistHandler(id, false);
      toast.success(response.message);
    } else {
      toast.error("Error adding product to cart");
    }
  }

  async function removeProductFromWishlistHandler(productId, showToast = true) {
    let response = await removeProductFromWishlist(productId);
    if (response.status === "success") {
      if (showToast) {
        toast.success(response.message);
      }
      getWishlist();
      setNumOfWishListItems((prev) => prev - 1);
    } else {
      toast.error("Error removing product from wishlist");
    }
  }

  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <Loader />
      ) : wishlistData && wishlistData.length > 0 ? (
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistData.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </th>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.category?.name}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => addProductToCart(item._id)}
                      className="font-medium text-[#6456ff] dark:text-[#6456ff] hover:text-[#5647ff] dark:hover:text-[#5647ff]"
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => removeProductFromWishlistHandler(item._id)}
                      className="font-medium ml-5 text-red-500 dark:text-red-500 hover:text-red-700 dark:hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 my-10">
          <img src={EmptyWishlist} className="h-80" alt="Empty Wishlist" />
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Your wishlist is empty
          </h1>
          <Link
            to="/products"
            className="text-sm text-center px-4 py-2.5 mt-4 font-semibold tracking-wide bg-[#6456ff] hover:bg-[#5647ff] hover:text-white text-white rounded-md"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
