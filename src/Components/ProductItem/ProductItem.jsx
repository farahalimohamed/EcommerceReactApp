import { FaStar } from 'react-icons/fa';
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom';
export default function ProductItem({ product }) {
  return (
    <div className="inner product p-2 border border-transparent rounded-md">
      <Link to={`/productdetails/${product._id}`}>
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
      </Link>
      <button
        type="button"
        className="btn"
      >
        Add to Cart
      </button>
    </div>
  );
}
