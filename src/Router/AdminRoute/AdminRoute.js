/** @format */

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../ContextProvider/ContextProvider";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";
import Loading from "../../Pages/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const [isAdmin, isAdminLoading] = useIsAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
