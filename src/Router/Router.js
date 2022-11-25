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
import ProductCategories from "../Pages/Home/ProductCategories/ProductCategories";
import Products from "../Pages/Home/ProductCategories/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/category/:category",
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/cars?categoryName=${params.category}`),
        element: (
          <PrivateRouter>
            <Products />
          </PrivateRouter>
        ),
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
        element: <MyOrders />,
      },
      {
        path: "/dashboard/myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/allSellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/allBuyers",
        element: <AllBuyers></AllBuyers>,
      },
    ],
  },
]);
export default router;
