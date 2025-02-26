import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader/Loader"; 

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  async function getBrands() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="mx-auto py-5 grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {isLoading ? ( 
          <div className="col-span-full flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          brands.map((brand) => (
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
          ))
        )}
      </div>
    </>
  );
}
