
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import Loading from "./Loading";
import { AppContext } from "../../context/AppContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;