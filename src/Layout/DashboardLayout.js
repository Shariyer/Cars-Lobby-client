/** @format */

import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { authContext } from "../ContextProvider/ContextProvider";
import useIsAdmin from "../Hooks/useIsAdmin/useIsAdmin";
import useIsBuyer from "../Hooks/useIsBuyer/useIsBuyer";
import useIsSeller from "../Hooks/useIsSeller/useIsSeller";
import useTitle from "../Hooks/useTitle";
import Loading from "../Pages/Loading/Loading";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  useTitle("Dashboard");
  const { user } = useContext(authContext);
  const [isAdmin, isAdminLoading] = useIsAdmin(user?.email);
  const [isSeller, isSellerLoading] = useIsSeller(user?.email);
  const [isBuyer, isBuyerLoading] = useIsBuyer(user?.email);

  if (isAdminLoading) {
    return <Loading />;
  }
  if (isSellerLoading) {
    return <Loading />;
  }
  if (isBuyerLoading) {
    return <Loading />;
  }

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
          {/* <Dashboard></Dashboard> */}
          {/* main content */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              {isBuyer && (
                <>
                  <Link to="/dashboard/myOrders">My orders</Link>
                </>
              )}
              {isSeller && (
                <>
                  <Link to="/dashboard/myProducts">My Products</Link>
                  <Link to="/dashboard/addProduct">Add Product</Link>
                </>
              )}
              {isAdmin && (
                <>
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
