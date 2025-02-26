import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import registerImg from "./../../../public/assets/images/shop.webp"; 
import { Helmet } from "react-helmet";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z1-9]{6,10}$/, "Password must be 6-10 characters"),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  async function handleRegister(data) {
    setIsLoading(true);
    const response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((res) => {
        setErrorMsg(null);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setIsLoading(false);
      });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#978eff46]">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex items-center max-w-5xl w-full my-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={registerImg} alt="register" className="mx-auto" />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="text-center pt-8">
            <h1 className="text-2xl font-semibold text-gray-800 pb-4">
              Create an Account
            </h1>
            <p className="text-gray-500">Please register here</p>
          </div>
          <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <small className="text-red-600">{formik.errors.name}</small>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
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
                    <small className="text-red-600">
                      {formik.errors.email}
                    </small>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. +20 125 678 9104"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <small className="text-red-600">
                      {formik.errors.phone}
                    </small>
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
                <div>
                  <label
                    htmlFor="rePassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rePassword && formik.touched.rePassword && (
                    <small className="text-red-600">
                      {formik.errors.rePassword}
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
                    className="w-full text-white flex justify-center items-center bg-[#6456FF] disabled:bg-[#978eff] hover:bg-[#5647ff] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#6456FF] dark:disabled:bg-[#978eff] dark:hover:bg-[#5647ff]"
                  >
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    disabled={!formik.isValid || !formik.dirty}
                  >
                    Register
                  </button>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="font-medium text-[#6456ff] hover:underline dark:text-[#6456ff]"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
