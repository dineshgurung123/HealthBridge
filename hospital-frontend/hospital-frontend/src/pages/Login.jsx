import { useState } from "react";
import {loginUser} from "../services/authService";

import  {useNavigate} from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => { 
    e.preventDefault();  
    
      try {
            
        const data = await loginUser({email, password})
               
        console.log("Login successful:", data);
        
        localStorage.setItem("token", data.token);

        alert("Login successful!");
        navigate("/")
      } catch (error) {
        alert("Login failed. Please check your credentials.");
      }


  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;