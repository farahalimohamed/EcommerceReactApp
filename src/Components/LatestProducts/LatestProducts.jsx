import { useEffect, useState } from "react";
import styles from "./LatestProducts.module.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const allProducts = response.data.data;

      const randomProducts = allProducts
        .sort(() => 0.5 - Math.random()) 
        .slice(0, 8); 

      setProducts(randomProducts);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row">
      {products.length > 0 ?
        products.map((product) => (
          <div
            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
            key={product.id}
          >
            <ProductItem product={product} />
          </div>
        ))
        : <Loader />
      }
    </div>
  );
}
