import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z1-9]{6,10}$/, "Password must be 6-10 characters"),
  });
  async function handleLogin(data) {
    setIsLoading(true);
    const response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((res) => {
        setErrorMsg(null);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setIsLoading(false);
      });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900 pb-10 pt-5">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
          Register Now
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <small className="text-red-600">{formik.errors.email}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <small className="text-red-600">
                    {formik.errors.password}
                  </small>
                )}
              </div>
              {errorMsg && (
                <div className="bg-red-300 p-3 rounded-md">{errorMsg}</div>
              )}
              {isLoading ? (
                <button
                  type="submit"
                  disabled
                  className="w-full text-white text-center flex justify-center items-center bg-[#0AAD0A] disabled:bg-[#87d387] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-[#0AAD0A] disabled:bg-[#87d387] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={!formik.isValid && formik.dirty}
                >
                  Login
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have account?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
