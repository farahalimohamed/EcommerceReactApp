import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const { productId } = useParams();
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);
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
      toast.error('Error adding product to cart');
    }
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
        <div className="mx-auto px-4 py-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={details.imageCover}
                alt="Product"
                className="w-full h-[60%] object-contain mb-4"
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
                <p
                  className="block text-base font-bold text-gray-700"
                >
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className="bg-pink-100 hover:bg-pink-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    className="fill-pink-600 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    />
                  </svg>
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
