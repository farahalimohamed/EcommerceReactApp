import styles from "./Hero.module.css";
import lightImg from "../../../public/assets/images/girl-shopping-list.svg";
import darkImg from "../../../public/assets/images/girl-shopping-list-dark.svg";
import { Link } from "react-router-dom";
import {
  FaServer,
  FaShoppingBag,
  FaMobileAlt,
  FaHeadphones,
  FaTv,
  FaMagic,
  FaSmile,
  FaStore,
} from "react-icons/fa";

export default function Hero() {
  const categories = [
    { icon: FaServer, label: "Servers" },
    { icon: FaShoppingBag, label: "Fashion" },
    { icon: FaMobileAlt, label: "Electronics" },
    { icon: FaHeadphones, label: "Gaming" },
    { icon: FaTv, label: "TV/Projectors" },
    { icon: FaMagic, label: "Toys" },
    { icon: FaSmile, label: "Sport" },
    { icon: FaStore, label: "Grocery" },
  ];
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <div className="content-center justify-self-start md:col-span-7 md:text-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
            Limited Time Offer!
            <br />
            Up to 50% OFF!
          </h1>
          <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">
            Don't Wait - Limited Stock at Unbeatable Prices!
          </p>
          <Link
            to={"/products"}
            className="inline-block rounded-lg bg-blue-700 px-6 py-3.5 text-center font-medium text-white hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Shop Now
          </Link>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <img
            className="dark:hidden"
            src={lightImg}
            alt="shopping illustration"
          />
          <img
            className="hidden dark:block"
            src={darkImg}
            alt="shopping illustration"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 px-8 flex gap-10">
          {categories.map(({ icon: Icon, label }, index) => (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <div className="p-5 rounded-lg border dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                <Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </div>
              <span className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
