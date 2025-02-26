import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./../../../public/assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { tokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { BsCart3 } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaRegHeart } from "react-icons/fa";
export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItems } = useContext(CartContext);
  const {numOfWishListItems} = useContext(WishlistContext);
  const navigate = useNavigate();
  function logoutUser() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="bg-gray-100 py-3 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-8">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="FreshMarket Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {token && (
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#6456FF] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"products"}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#6456FF] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"categories"}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#6456FF] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"brands"}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#6456FF] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token && (
              <>
                <li>
                  <NavLink
                    to={"cart"}
                    className={({ isActive }) =>
                      isActive
                        ? "relative py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#5647ff] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "relative py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    <BsCart3 className="text-xl" />
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex justify-center items-center bg-red-500 text-white">
                      {numOfCartItems}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"wishlist"}
                    className={({ isActive }) =>
                      isActive
                        ? "relative py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#5647ff] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "relative py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    <FaRegHeart className="text-xl" />
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex justify-center items-center bg-red-500 text-white">
                      {numOfWishListItems}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <div
                    onClick={logoutUser}
                    className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    SignOut
                  </div>
                </li>
              </>
            )}
            {!token && (
              <>
                <li>
                  <NavLink
                    to={"login"}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#6456FF] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"register"}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 text-white font-semibold bg-[#6456FF] rounded md:bg-transparent md:text-[#6456FF] md:p-0 dark:text-white md:dark:text-[#6456FF]"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#6456FF] md:p-0 dark:text-white md:dark:hover:text-[#5647ff] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
