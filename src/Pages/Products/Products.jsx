import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import Loader from "../../Components/Loader/Loader";
import ProductItem from "../../Components/ProductItem/ProductItem";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);
  const { addToWishlist, setNumOfWishListItems } = useContext(WishlistContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); 

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

  async function addProductToWishlist(id) {
    let response = await addToWishlist(id);
    if (response.status === "success") {
      toast.success(response.message);
      setNumOfWishListItems(response.data.length);
    } else {
      toast.error("Error adding product to wishlist");
    }
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="p-4 lg:max-w-6xl md:max-w-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id}>
                <ProductItem
                  product={product}
                  addProductToCart={addProductToCart}
                  addProductToWishlist={addProductToWishlist}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-screen">
              <Loader />
            </div>
          )}
        </div>
        {/* Pagination */}
        <nav
          className="mt-6 flex items-center justify-center"
          aria-label="Page navigation example"
        >
          <ul className="flex h-8 items-center -space-x-px text-sm">
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                }
                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-4 w-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m15 19-7-7 7-7"
                  />
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => paginate(page)}
                  className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === page
                      ? "z-10 bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-white"
                      : ""
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-4 w-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
