import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  const { isUserLoading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isUserLoading === false && isAuthenticated === false) {

      const currentPath = location.pathname + location.search;

      if (location.pathname !== "/signin") {
        if (location.pathname === "/share") {
          navigate(`/signin?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          navigate("/signin");
        }
      }
    }
  }, [isAuthenticated, isUserLoading, navigate]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return <>{isAuthenticated ? <Outlet /> : <></>}</>;
};

export default ProtectedRoute;
