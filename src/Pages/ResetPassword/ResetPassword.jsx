import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import passImg from "./../../../public/assets/images/forgot.webp";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  async function handleResetPassword(data) {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        data
      );
      setErrorMsg(null);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.response.data.message);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#978eff46]">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={passImg} alt="reset-password" className="mx-auto" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 pb-4">
              Reset Your Password
            </h1>
          </div>
          <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
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
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter new password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.newPassword && formik.touched.newPassword && (
                    <small className="text-red-600">
                      {formik.errors.newPassword}
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
                    className="w-full text-white bg-[#6456FF] hover:bg-[#5647ff] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#6456FF] dark:hover:bg-[#5647ff]"
                    disabled={!formik.isValid || !formik.dirty}
                  >
                    Reset Password
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
