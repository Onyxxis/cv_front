import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // ou un spinner

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // rend les routes enfants
};

export default ProtectedRoute;
