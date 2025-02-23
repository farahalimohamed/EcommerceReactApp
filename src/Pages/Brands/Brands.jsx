import { useEffect, useState } from 'react';
import styles from './Brands.module.css'
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Brands() {
    const [brands, setBrands] = useState([]);

    async function getBrands() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
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
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {brands.map((brand) => (
          <div key={brand._id} className="flex items-center md:justify-center">
            <img
              src={brand.image}
              alt={brand.name}
              className="h-20 hover:text-gray-900 dark:hover:text-white"
            />
          </div>
        ))}
      </div>
    </>
  );
}
