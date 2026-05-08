import { useState } from "react";
import { RegisterUSer } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {

     const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    age: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await RegisterUSer(formData);

      console.log("Register Success:", data);

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        {/* Role */}
        <select
          name="role"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        {/* Gender */}
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;