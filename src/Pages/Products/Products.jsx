import { useContext, useEffect, useState } from 'react';
import styles from './Products.module.css'
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import Loader from '../../Components/Loader/Loader';
import ProductItem from '../../Components/ProductItem/ProductItem';
import { Helmet } from 'react-helmet';
import toast from "react-hot-toast";
export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.status === "success") {
      setNumOfCartItems(response.numOfCartItems);
      setCartId(response.cartId);
      toast.success(response.message);
    } else {
      toast.error("Error adding product to cart");
    }
  }
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="p-4 lg:max-w-6xl md:max-w-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id}>
                <ProductItem
                  product={product}
                  addProductToCart={addProductToCart}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-screen">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
