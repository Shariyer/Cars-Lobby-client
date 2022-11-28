/** @format */

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../ContextProvider/ContextProvider";
import Loading from "../../Pages/Loading/Loading";
import useIsSeller from "../../Hooks/useIsSeller/useIsSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const [isSeller, isSellerLoading] = useIsSeller(user?.email);
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loading></Loading>;
  }
  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
