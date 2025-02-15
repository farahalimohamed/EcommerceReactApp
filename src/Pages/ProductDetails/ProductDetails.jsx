import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const { productId } = useParams();
  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => setDetails(res.data.data))
      .catch((err) => console.log(err));
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
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
            {/* Product Details */}
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
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  defaultValue={1}
                  className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex space-x-4 mb-6">
                <button className="bg-blue-700 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
                <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
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
