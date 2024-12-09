import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  // Afa josh na here you go for run the middleware for admin route
  return children;
};

export default ProtectedRoute;
