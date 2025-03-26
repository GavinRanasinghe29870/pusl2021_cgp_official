import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    sportLevel: "", // Added sportLevel field
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending request with:", formData);

      const response = await axios.post('http://localhost:5000/api/admin/signin', formData); 
        
      localStorage.setItem("token", response.data.token);
      toast.success("Admin Sign In Successful!");
      console.log("Admin Sign in success:", response.data);

      navigate("/");
    } catch (err) {
      console.error("Admin Signin error:", err);
      toast.error(err.response?.data?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-center text-2xl font-bold mb-8">Admin Sign In</h1>
        <div className="flex md:flex-row">
          {/* Logo Section */}
          <div className="flex-1 flex items-center justify-center">
            <img src="/logo512.png" alt="logo" className="h-16 w-16" />
          </div>

          {/* Divider */}
          <div className="w-px bg-blue-200 mx-8"></div>

          {/* Sign-in Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              {/* Role Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700">Select Role</label>
                <select
                  name="sportLevel"
                  className="block w-full bg-blue-900 text-white py-2 px-4 rounded leading-tight focus:outline-none focus:bg-blue-800"
                  value={formData.sportLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Sport Level</option>
                  <option value="SportPeople">Sport People</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Username Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-4 relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {/* Toggle Eye Icon */}
                <button type="button" className="absolute right-3 top-10 text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="mb-4 text-right font-semibold">
                <a href="forgotPassword" className="text-blue-900 font-bold hover:text-gray-800">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0D1271] text-white py-2 px-4 rounded hover:bg-[#141a88] transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Social Sign In */}
            <div className="text-center mb-4">
              <span className="text-gray-700">Or Sign in using</span>
              <div className="flex justify-center space-x-4 mt-2">
                <FaGoogle className="text-2xl text-blue-700 cursor-pointer" />
                <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
                <FaLinkedin className="text-2xl text-blue-700 cursor-pointer" />
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-gray-700">New Member?{" "}
                <a href="signup" className="text-blue-900 font-bold hover:underline">Sign Up</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignin;
