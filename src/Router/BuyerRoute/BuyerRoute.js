/** @format */

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../ContextProvider/ContextProvider";
import useIsBuyer from "../../Hooks/useIsBuyer/useIsBuyer";
import Loading from "../../Pages/Loading/Loading";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const [isBuyer, isBuyerLoading] = useIsBuyer(user?.email);
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loading></Loading>;
  }
  if (user && isBuyer) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
