import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import passImg from "./../../../public/assets/images/pay.webp";
import { Helmet } from "react-helmet";

export default function VerifyResetCode({ email, onSubmit }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    resetCode: "",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d{6}$/, "Reset code must be exactly 6 digits"),
  });

  async function handleVerifyResetCode(data) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { ...data, email }
      );
      setErrorMsg(null);
      setIsLoading(false);
      onSubmit();
    } catch (err) {
      setErrorMsg(err.response.data.message);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleVerifyResetCode,
  });

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#978eff46]">
      <Helmet>
        <title>Verify Reset Code</title>
      </Helmet>
      <div className="flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={passImg} alt="verify-reset-code" className="mx-auto" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 pb-4">
              Verify Reset Code
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
                    htmlFor="resetCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reset Code
                  </label>
                  <input
                    type="text"
                    name="resetCode"
                    id="resetCode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter reset code"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.resetCode && formik.touched.resetCode && (
                    <small className="text-red-600">
                      {formik.errors.resetCode}
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
                    Verify
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
