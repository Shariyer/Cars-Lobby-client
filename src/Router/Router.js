/** @format */

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AboutUs from "../Pages/Home/AboutUs/AboutUs";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import Register from "../Pages/Register/Register";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import DashboardLayout from "../Layout/DashboardLayout";
import Products from "../Pages/Home/ProductCategories/Products/Products";
import ReportedProducts from "../Pages/Dashboard/ReportedProducts/ReportedProducts";
import Blog from "../Pages/Blog/Blog";
import Error from "../Pages/Error/Error";
import AdminRoute from "./AdminRoute/AdminRoute";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import SellerRoute from "./SellerRoute/SellerRoute";
// import AdminRoute from "./AdminRoute/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        errorElement: <Error></Error>,
      },
      {
        path: "/register",
        element: <Register></Register>,
        errorElement: <Error></Error>,
      },
      {
        path: "/login",
        element: <Login></Login>,
        errorElement: <Error></Error>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
        errorElement: <Error></Error>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
        errorElement: <Error></Error>,
      },
      {
        path: "/category/:category",
        loader: async ({ params }) =>
          fetch(
            `https://b612-used-products-resale-server-side-shariyer.vercel.app/cars?categoryName=${params.category}`
          ),
        element: (
          <PrivateRouter>
            <Products />
          </PrivateRouter>
        ),
        errorElement: <Error></Error>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/myOrders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/dashboard/addProduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/dashboard/allSellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/dashboard/allBuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "/dashboard/reportedProducts",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
        errorElement: <Error></Error>,
      },
    ],
  },
]);
export default router;
