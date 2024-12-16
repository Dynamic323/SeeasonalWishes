import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  // const { user, loading } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  // if (requireAdmin && !user.isAdmin) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default ProtectedRoute;