import React, { useEffect, useState } from "react";
import axios from "axios"; 
import mainImg from "../../../public/assets/images/girl-shopping.webp";
import { Link } from "react-router-dom";
export default function Hero() {
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div className="content-center justify-self-start md:col-span-7 md:text-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
            We Delivered
            <br />
            to your Doorstep
          </h1>
          <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">
            Fresh groceries, household essentials, and more delivered to your
            door within 1 hour!
          </p>
          <Link
            to={"/products"}
            className="inline-block rounded-lg bg-[#6456FF] px-6 py-3.5 text-center font-medium text-white hover:text-white hover:bg-[#5647ff] dark:bg-[#6456FF] dark:hover:bg-[#5647ff]"
          >
            Shop Now
          </Link>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <img
            className="dark:hidden"
            src={mainImg}
            alt="shopping illustration"
          />
          <img
            className="hidden dark:block"
            src={mainImg}
            alt="shopping illustration"
          />
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="flex items-center md:justify-center"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-20 hover:text-gray-900 dark:hover:text-white"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
