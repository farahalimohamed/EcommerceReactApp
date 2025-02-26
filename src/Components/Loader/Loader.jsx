import React from "react";
import { RiShoppingCartFill } from "react-icons/ri";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <RiShoppingCartFill className="animate-pulse duration-1000 text-[#6456ff] text-7xl m-5" />
    </div>
  );
}
