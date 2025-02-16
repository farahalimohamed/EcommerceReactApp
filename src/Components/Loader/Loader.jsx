import React from "react";
import styles from "./Loader.module.css";
import { RiShoppingCartFill } from "react-icons/ri";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-96">
      <RiShoppingCartFill className="animate-pulse duration-1000 text-blue-600 text-7xl mx-auto m-5" />
    </div>
  );
}
