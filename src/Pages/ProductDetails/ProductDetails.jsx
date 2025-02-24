import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";
import { BsCart3 } from "react-icons/bs";
export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { productId } = useParams();
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);
  const { addToWishlist, setNumOfWishListItems } = useContext(WishlistContext);
  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => setDetails(res.data.data))
      .catch((err) => console.log(err));
  }

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.status === "success") {
      setNumOfCartItems(response.numOfCartItems);
      setCartId(response.cartId);
      toast.success(response.message);
    } else {
      toast.error("Error adding product to cart");
    }
  }
  async function addProductToWishlist(id) {
    setIsInWishlist(true);
    let response = await addToWishlist(id);
    if (response.status === "success") {
      toast.success(response.message);
      setNumOfWishListItems(response.data.length);
    } else {
      toast.error("Error adding product to wishlist");
    }
    setTimeout(() => {
      setIsInWishlist(false);
    }, 2000);
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <div className="container">
        <Helmet>
          <title>{details.title}</title>
        </Helmet>
        <div className="mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={details.imageCover}
                alt="Product"
                className="w-full h-[500px] object-contain mb-4"
                id="mainImage"
              />
              <div className="flex gap-2 space-x-4 py-4 justify-center overflow-x-auto hide-scrollbar">
                {details.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product"
                    className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer hover:opacity-100 transition duration-300 ${
                      index === activeImage
                        ? "opacity-100 border-2"
                        : "opacity-60"
                    }`}
                    onClick={() => {
                      document
                        .getElementById("mainImage")
                        .setAttribute("src", image);
                      setActiveImage(index);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{details.title}</h2>
              <p className="text-gray-600 mb-4">{details.category?.name}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  {details.priceAfterDiscount
                    ? details.priceAfterDiscount
                    : details.price}{" "}
                  EGP
                </span>
                {details.priceAfterDiscount && (
                  <span className="text-gray-500 line-through">
                    {details.price} EGP
                  </span>
                )}
              </div>
              <div className="flex items-center mb-4">
                <FaStar className="size-6 text-yellow-300" />
                <span className="ml-2 text-gray-600">
                  {details.ratingsAverage} ({details.ratingsQuantity} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">{details.description}</p>
              <div className="mb-6 flex items-center">
                <p className="block text-base font-bold text-gray-700">
                  Brand:
                </p>
                <span className="ms-1">{details.brand?.name}</span>
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => {
                    addProductToCart(details._id);
                  }}
                  className="bg-[#6456ff] hover:bg-[#5647ff] flex gap-2 items-center text-white px-6 py-2 rounded-md"
                >
                  <BsCart3 />
                  Add to Cart
                </button>
                <button
                  onClick={() => addProductToWishlist(details._id)}
                  className={`bg-pink-100 hover:bg-pink-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md ${
                    isInWishlist ? "animate-pulse" : ""
                  }`}
                >
                  {isInWishlist ? (
                    <FaHeart className="text-pink-600" />
                  ) : (
                    <FaRegHeart className="text-pink-600" />
                  )}
                  Wishlist
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Industry-leading noise cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Touch sensor controls</li>
                  <li>Speak-to-chat technology</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
