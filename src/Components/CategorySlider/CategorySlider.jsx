import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

function NextArrow(props) {
  return (
    <div
      className="absolute top-[-30px] right-[-10px] transform -translate-y-1/2 bg-[#6456FF] hover:bg-[#5647ff] text-white p-3 rounded-md cursor-pointer z-10"
      onClick={props.onClick}
    >
      <FaArrowRight />
    </div>
  );
}

function PrevArrow(props) {
  return (
    <div
      className="absolute top-[-30px] right-[50px] transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-black p-3 rounded-md cursor-pointer z-10"
      onClick={props.onClick}
    >
      <FaArrowLeft />
    </div>
  );
}

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-8 px-10">
      <h2 className="text-2xl font-bold mb-5">Shop by Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="flex flex-col items-center p-3 -space-x-3">
            <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden shadow-md transition duration-300 transform hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-center"
              />
            </div>
            <div className="mt-3 w-full text-center">
              <span className="text-lg font-medium">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
