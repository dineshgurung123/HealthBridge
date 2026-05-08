import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Doctors from "../pages/Doctors";
import MainLayout from "../layouts/MainLayout";
import ProtetedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
     
     
        <Route path="/doctors" element={ <ProtetedRoutes> <Doctors /> </ProtetedRoutes> } />
      </Route>
      
      
      {/* Auth ROute */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
