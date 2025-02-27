import{b as o,u as g,j as e,L as x,e as b}from"./index-C6SzbBKQ.js";import{c as p,a,b as f,u as y,A as w}from"./index-BN9X0MpP.js";import{H as k}from"./Helmet-BVGOygXr.js";const j="/assets/shop-LQawcl8t.webp";function C(){const[t,d]=o.useState(null),[i,s]=o.useState(!1),n=g(),m={name:"",email:"",password:"",rePassword:"",phone:""},c=p({name:a().required("Name is required").min(3,"Name must be at least 3 characters").max(20,"Name must be at most 20 characters"),email:a().email("Invalid email format").required("Email is required"),phone:a().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"Invalid phone number"),password:a().required("Password is required").matches(/^[A-Za-z1-9]{6,10}$/,"Password must be 6-10 characters"),rePassword:a().required("Confirm password is required").oneOf([f("password"),null],"Passwords must match")});async function u(h){s(!0),await b.post("https://ecommerce.routemisr.com/api/v1/auth/signup",h).then(l=>{d(null),s(!1),n("/login")}).catch(l=>{d(l.response.data.message),s(!1)})}const r=y({initialValues:m,validationSchema:c,onSubmit:u});return e.jsxs("section",{className:"flex items-center justify-center min-h-screen bg-[#978eff46]",children:[e.jsx(k,{children:e.jsx("title",{children:"Register"})}),e.jsxs("div",{className:"flex items-center max-w-5xl w-full my-8 bg-white shadow-lg rounded-lg overflow-hidden",children:[e.jsx("div",{className:"hidden md:block md:w-1/2",children:e.jsx("img",{src:j,alt:"register",className:"mx-auto"})}),e.jsxs("div",{className:"w-full md:w-1/2 p-2",children:[e.jsxs("div",{className:"text-center pt-8",children:[e.jsx("h1",{className:"text-2xl font-semibold text-gray-800 pb-4",children:"Create an Account"}),e.jsx("p",{className:"text-gray-500",children:"Please register here"})]}),e.jsx("div",{className:"w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",children:e.jsx("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:e.jsxs("form",{className:"space-y-4 md:space-y-6",onSubmit:r.handleSubmit,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Your Name"}),e.jsx("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Enter your name",value:r.values.name,onChange:r.handleChange,onBlur:r.handleBlur}),r.errors.name&&r.touched.name&&e.jsx("small",{className:"text-red-600",children:r.errors.name})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email Address"}),e.jsx("input",{type:"email",name:"email",id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"name@company.com",value:r.values.email,onChange:r.handleChange,onBlur:r.handleBlur}),r.errors.email&&r.touched.email&&e.jsx("small",{className:"text-red-600",children:r.errors.email})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"phone",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Phone Number"}),e.jsx("input",{type:"tel",name:"phone",id:"phone",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"e.g. +20 125 678 9104",value:r.values.phone,onChange:r.handleChange,onBlur:r.handleBlur}),r.errors.phone&&r.touched.phone&&e.jsx("small",{className:"text-red-600",children:r.errors.phone})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),e.jsx("input",{type:"password",name:"password",id:"password",placeholder:"••••••••",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",value:r.values.password,onChange:r.handleChange,onBlur:r.handleBlur}),r.errors.password&&r.touched.password&&e.jsx("small",{className:"text-red-600",children:r.errors.password})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"rePassword",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Confirm Password"}),e.jsx("input",{type:"password",name:"rePassword",id:"rePassword",placeholder:"••••••••",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",value:r.values.rePassword,onChange:r.handleChange,onBlur:r.handleBlur}),r.errors.rePassword&&r.touched.rePassword&&e.jsx("small",{className:"text-red-600",children:r.errors.rePassword})]}),t&&e.jsx("div",{className:"bg-red-300 p-3 rounded-md",children:t}),i?e.jsx("button",{type:"submit",disabled:!0,className:"w-full text-white flex justify-center items-center bg-[#6456FF] disabled:bg-[#978eff] hover:bg-[#5647ff] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#6456FF] dark:disabled:bg-[#978eff] dark:hover:bg-[#5647ff]",children:e.jsx(w,{className:"animate-spin"})}):e.jsx("button",{type:"submit",className:"btn",disabled:!r.isValid||!r.dirty,children:"Register"}),e.jsx("div",{className:"flex justify-between items-center",children:e.jsxs("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["Already have an account?"," ",e.jsx(x,{to:"/login",className:"font-medium text-[#6456ff] hover:underline dark:text-[#6456ff]",children:"Login here"})]})})]})})})]})]})]})}export{C as default};
