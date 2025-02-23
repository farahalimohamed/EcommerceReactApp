import { useEffect, useState } from 'react';
import styles from './Categories.module.css'
import axios from 'axios';
export default function Categories() {
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
    }, [])
    
  return (
    <section className="py-8">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 dark:text-gray-400 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6 px-4">
        {categories.map((category) => (
            <div
              key={category._id}
              class="max-w-sm bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                class="rounded-t-lg h-[200px] object-center w-full"
                src={category.image}
                alt={category.name}
              />
              <div class="p-5 h-[90px] border-b border-r border-l border-gray-200 rounded-b-lg">
                <p class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.name}
                </p>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
