import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ redirectTo, children }) => {
  if (true) {
    console.log("Redirecting");
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
