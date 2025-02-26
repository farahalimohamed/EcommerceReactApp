import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  async function getCategories() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="py-8">
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="max-w-sm bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg h-[200px] object-center w-full"
                src={category.image}
                alt={category.name}
              />
              <div className="p-5 h-[90px] border-b border-r border-l border-gray-200 rounded-b-lg">
                <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
