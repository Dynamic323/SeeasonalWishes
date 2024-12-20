import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("Auth is loading..."); // Debugging
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("No user found, redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !user.isAdmin) {
    console.log("User is not admin, redirecting...");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
