import { FaStar } from 'react-icons/fa';
import styles from './ProductItem.module.css'
export default function ProductItem({ product }) {
  return (
    <div className="inner product p-2 border border-transparent rounded-md">
      <img src={product.imageCover} className="w-full" alt="" />
      <small className="text-green-600">{product.category.name}</small>
      <h5 className="font-semibold my-3">
        {product.title.split(" ").splice(0, 3).join(" ")}
      </h5>
      <div className="flex justify-between">
        <p>{product.price} EGP</p>
        <p className="flex items-center gap-1">
          <FaStar className="text-yellow-300" />
          {product.ratingsAverage}
        </p>
      </div>
      <button
        type="button"
        class="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
