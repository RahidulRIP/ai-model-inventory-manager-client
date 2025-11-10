import { useContext } from "react";
import { AuthContext } from "../Providers/Context/AuthContext";
import Loader from "../Components/Shared/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  if (user?.email) {
    return children;
  }

  return <Navigate to={"/signIn"} state={location.pathname}></Navigate>;
};

export default PrivateRoute;
