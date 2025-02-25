import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { tokenContext } from "../../Context/TokenContext";
import passImg from "./../../../public/assets/images/forgot.webp";
import { Helmet } from "react-helmet";
import VerifyResetCode from "../VerifyResetCode/VerifyResetCode";
import ResetPassword from "../ResetPassword/ResetPassword";
export default function ForgotPassword() {
  const [currentView, setCurrentView] = useState("forgotPassword");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (email) => {
    setEmail(email);
    setCurrentView("verifyResetCode");
  };

  const handleResetCodeSubmit = () => {
    setCurrentView("resetPassword");
  };

  const handlePasswordReset = () => {
    navigate("/login");
  };

  return (
    <>
      {currentView === "forgotPassword" && (
        <ForgotPasswordForm onSubmit={handleEmailSubmit} />
      )}
      {currentView === "verifyResetCode" && (
        <VerifyResetCode email={email} onSubmit={handleResetCodeSubmit} />
      )}
      {currentView === "resetPassword" && (
        <ResetPassword email={email} onSubmit={handlePasswordReset} />
      )}
    </>
  );
}

function ForgotPasswordForm({ onSubmit }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  async function handleForgotPassword(data) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        data
      );
      setErrorMsg(null);
      setIsLoading(false);
      onSubmit(data.email);
    } catch (err) {
      setErrorMsg(err.response.data.message);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#978eff46]">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={passImg} alt="forgot-password" className="mx-auto" />
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
                    Email Me
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
