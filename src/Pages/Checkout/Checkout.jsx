import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const { cashOnDelivery, setNumOfCartItems, setCartId, onlinePayment } =
    useContext(CartContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  console.log(state);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };
  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    city: Yup.string().required("City is required"),
  });

  async function handleSubmit(data) {
    if (state == "online") {
      let response = await onlinePayment({ shippingAddress: data });
      if (response.status === "success") {
        setNumOfCartItems(0);
        setCartId(null);
        window.location.href = response.session.url;
      }
    } else {
      let res = await cashOnDelivery({ shippingAddress: data });
      if (res.status === "success") {
        setNumOfCartItems(0);
        setCartId(null);
        navigate("/allorders");
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="details"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Details
                  </label>
                  <input
                    type="text"
                    id="details"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.details && formik.touched.details && (
                    <small className="text-red-600">
                      {formik.errors.details}
                    </small>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="+1 (555) 1234-567"
                    name="phone"
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
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your city
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="eg. New York"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.city && formik.touched.city && (
                    <small className="text-red-600">{formik.errors.city}</small>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    $8,094.00
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Savings
                  </dt>
                  <dd className="text-base font-medium text-green-500">0</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Store Pickup
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    $99
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    $199
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    $8,392.00
                  </dd>
                </dl>
              </div>
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
