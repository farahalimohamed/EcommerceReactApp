import styles from "./Hero.module.css";
import img from "../../../public/assets/images/img3.png";
import star from "../../../public/assets/images/star.png";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="mx-auto py-8 min-h-screen">
      <div className="flex items-center justify-between bg-gray-100 p-8 pb-0 rounded-t-2xl shadow-sm">
        <div className="max-w-lg ms-16">
          <h1 className="text-4xl font-extrabold leading-tight">
            LET’S EXPLORE{" "}
            <span className="bg-yellow-300 px-2">UNIQUE</span> FINDS.
          </h1>
          <p className="text-gray-600 mt-3">
            Discover the best products for every lifestyle!
          </p>
          <Link
            to="/products"
            className="mt-5 inline-block bg-black text-white py-2 px-6 rounded-md text-lg font-semibold transition duration-300 hover:bg-white hover:text-black hover:shadow-md"
          >
            SHOP NOW
          </Link>
        </div>

        <div className="w-1/2 relative">
          <img
            src={img}
            alt="Fashion Model"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute top-0 left-32">
            <img src={star} alt="Star" className="stars" />
          </div>
        </div>
      </div>
    </div>
  );
}
