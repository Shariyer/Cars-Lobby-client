/** @format */

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../ContextProvider/ContextProvider";
import Loading from "../../Pages/Loading/Loading";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(authContext);
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
