import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">
        Health Bridge
      </h1>

      {/* Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/doctors" className="hover:text-gray-200">Doctors</Link>
        <Link to="/login" className="hover:text-gray-200">Login</Link>
        <Link to="/register" className="hover:text-gray-200">Register</Link>
      </div>

    </nav>
  );
};

export default Navbar;