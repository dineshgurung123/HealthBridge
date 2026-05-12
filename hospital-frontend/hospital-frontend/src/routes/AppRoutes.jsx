import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Doctors from "../pages/Doctors";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import BookAppointment from "../pages/BookAppointment";
import MyAppointments from "../pages/MyAppointments";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
     
     
        <Route path="/doctors" element={ <ProtectedRoutes> <Doctors /> </ProtectedRoutes> } />
          
          <Route
          path="/book-appointment/:doctorId"
          element = {
            <ProtectedRoutes>
              <BookAppointment/>
            </ProtectedRoutes>
          }
          >   

          </Route>
      

 <Route
  path="/my-appointments"
  element={
    <ProtectedRoutes>
      <MyAppointments />
    </ProtectedRoutes>
  }
/>

<Route
  path="/my-appointments"
  element={
    <ProtectedRoutes>
      <MyAppointments />
    </ProtectedRoutes>
  }
/>

{/* Admin Routes */}
<Route
  path="/admin"
  element={
    <AdminRoutes>
      <AdminDashboard />
    </AdminRoutes>
  }
/>
 

      </Route>
      
      
      {/* Auth ROute */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
