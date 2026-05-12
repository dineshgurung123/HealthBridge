import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
 console.log("AdminRoute - token:", token);
 console.log("AdminRoute - role:", role);

  // if not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // if not admin
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  // allow admin
  return children;
};

export default AdminRoute;