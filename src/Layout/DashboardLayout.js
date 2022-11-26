/** @format */

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { authContext } from "../ContextProvider/ContextProvider";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(authContext);
  //   const [userType, setUserType] = useState("");
  const { data: userRole } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  //   setUserType(userRole[0].userType);
  //   console.log(userType);
  //   const userType = userRole[0].userType;
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile w-11/12 mx-auto">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          {/* main content */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              {userRole[0].userType === "buyer" && (
                <Link to="/dashboard/myOrders">My orders</Link>
              )}
              {userRole[0].userType === "seller" && (
                <>
                  <Link to="/dashboard/myProducts">My Products</Link>
                  <Link to="/dashboard/addProduct">Add Product</Link>
                </>
              )}

              {userRole[0].userType === "admin" && (
                <>
                  {" "}
                  <Link to="/dashboard/allSellers">All Sellers</Link>
                  <Link to="/dashboard/allBuyers">All Buyers</Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
