import notfoundImg from '../../../public/assets/images/404.webp'
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96 my-10">
      <img src={notfoundImg} className="h-80" />
      <h1 className="text-2xl font-bold text-gray-800 mt-2">
        404 - Page Not Found
      </h1>
      <Link
        to="/"
        className="text-sm text-center px-4 py-2.5 mt-4 font-semibold tracking-wide bg-[#6456ff] hover:bg-[#5647ff] hover:text-white text-white rounded-md"
      >
        Go to Home
      </Link>
    </div>
  );
}
