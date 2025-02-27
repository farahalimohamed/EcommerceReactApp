import{b as t,u as f,t as b,j as e,L as i,e as p}from"./index-CtlE6Ll6.js";import{c as y,a as o,u as w,A as k}from"./index-D4dAPS0W.js";import{H as j}from"./Helmet-CwZ9N303.js";const N="/EcommerceReactApp/assets/online-shopping-CXNwN93t.webp";function C(){const[l,d]=t.useState(null),[n,r]=t.useState(!1),m=f(),{setToken:c}=t.useContext(b),u={email:"",password:""},x=y({email:o().email("Invalid email format").required("Email is required"),password:o().required("Password is required").matches(/^[A-Za-z1-9]{6,10}$/,"Password must be 6-10 characters")});async function g(h){r(!0),await p.post("https://ecommerce.routemisr.com/api/v1/auth/signin",h).then(s=>{c(s.data.token),localStorage.setItem("token",s.data.token),d(null),r(!1),m("/")}).catch(s=>{d(s.response.data.message),r(!1)})}const a=w({initialValues:u,validationSchema:x,onSubmit:g});return e.jsxs("section",{className:"flex items-center justify-center min-h-screen bg-[#978eff46]",children:[e.jsx(j,{children:e.jsx("title",{children:"Login"})}),e.jsxs("div",{className:"flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden",children:[e.jsx("div",{className:"hidden md:block md:w-1/2",children:e.jsx("img",{src:N,alt:"login",className:"mx-auto"})}),e.jsxs("div",{className:"w-full md:w-1/2 p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h1",{className:"text-2xl font-semibold text-gray-800 pb-4",children:"Welcome Back"}),e.jsx("p",{className:"text-gray-500",children:"Please login here"})]}),e.jsx("div",{className:"w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",children:e.jsx("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:e.jsxs("form",{className:"space-y-4 md:space-y-6",onSubmit:a.handleSubmit,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email Address"}),e.jsx("input",{type:"email",name:"email",id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"name@company.com",value:a.values.email,onChange:a.handleChange,onBlur:a.handleBlur}),a.errors.email&&a.touched.email&&e.jsx("small",{className:"text-red-600",children:a.errors.email})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),e.jsx("input",{type:"password",name:"password",id:"password",placeholder:"••••••••",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",value:a.values.password,onChange:a.handleChange,onBlur:a.handleBlur}),a.errors.password&&a.touched.password&&e.jsx("small",{className:"text-red-600",children:a.errors.password})]}),l&&e.jsx("div",{className:"bg-red-300 p-3 rounded-md",children:l}),n?e.jsx("button",{type:"submit",disabled:!0,className:"w-full text-white flex justify-center items-center bg-[#6456FF] disabled:bg-[#978eff] hover:bg-[#5647ff] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#6456FF] dark:disabled:bg-[#978eff] dark:hover:bg-[#5647ff]",children:e.jsx(k,{className:"animate-spin"})}):e.jsx("button",{type:"submit",className:"btn",disabled:!a.isValid||!a.dirty,children:"Login"}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["Don't have account?"," ",e.jsx(i,{to:"/register",className:"font-medium text-[#6456ff] hover:underline dark:text-[#6456ff]",children:"Register here"})]}),e.jsx(i,{to:"/forgot-password",className:"text-sm font-medium text-[#6456ff] hover:underline dark:text-[#6456ff]",children:"Forgot Password?"})]})]})})})]})]})]})}export{C as default};
