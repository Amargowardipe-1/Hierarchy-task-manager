import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRoles
}) {

  const { user } =
    useContext(AuthContext);

  
  const token =
    localStorage.getItem("token");

  

  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role.toLowerCase())
  ) {

    return (
      <Navigate
        to="/error"
        replace
      />
    );

  }


  return children;

}

export default ProtectedRoute;