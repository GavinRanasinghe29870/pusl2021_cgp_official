import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure axios globally
axios.defaults.withCredentials = true;
// Ensure base URL is configured correctly - uncomment and adjust if needed
// axios.defaults.baseURL = 'http://localhost:5000';

const SportSignin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    sportLevel: "", // Start with an empty value
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signin } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Navigate based on selected sportLevel
    if (name === "sportLevel") {
      if (value === "SportPeople") {
        navigate("/Signin");
      } else if (value === "Clubs") {
        navigate("/Clubsignin");
      } else if (value === "Admin") {
        navigate("/admin/signin");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if sportLevel is selected, if not show an error
    if (!formData.sportLevel) {
      toast.error("Please select a Sport Level", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting to sign in with:", {
        username: formData.username,
        sportLevel: formData.sportLevel,
      });

      const response = await signin(formData);
      console.log("Signin response:", response);

      if (response?.success) {
        toast.success("Sign in successful!", { position: "top-center" });
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(
          response?.error || "Sign in failed. Please check credentials.",
          {
            position: "top-center",
          }
        );
      }
    } catch (err) {
      console.error("Sign in error:", err);

      // Special handling for network errors
      if (err.message === "Network Error") {
        toast.error(
          "Network error: Unable to connect to the server. Please check if the server is running.",
          { position: "top-center" }
        );
      } else {
        toast.error(
          err?.response?.data?.error || "Sign in failed. Please try again.",
          { position: "top-center" }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-center text-3xl font-bold mb-8 transition-all duration-800 ease-out transform hover:scale-110">Welcome to SportNest!</h1>
        <div className="flex md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className="h-70 w-auto object-contain"
            />
          </div>

          <div className="w-px bg-blue-200 mx-8"></div>

          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <select
                  name="sportLevel"
                  className="block w-full bg-blue-900 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-blue-800"
                  value={formData.sportLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Sport Level</option>{" "}
                  {/* No default selection */}
                  <option value="SportPeople">SportPeople</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mb-4 text-right font-semibold">
                <a
                  href="forgotPassword"
                  className="text-blue-900 font-bold hover:text-gray-800"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0D1271] text-white font-medium mb-1 py-2 px-4 rounded hover:bg-[#141a88] transition duration-300 text-md"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            <div className="text-center mb-4">
              <span className="text-gray-700">Or Sign in using</span>
              <div className="flex justify-center space-x-4 mt-2">
                <FaGoogle className="text-2xl text-blue-700 cursor-pointer" />
                <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
                <FaLinkedin className="text-2xl text-blue-700 cursor-pointer" />
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-700">
                New Member?{" "}
                <a
                  href="signup"
                  className="text-blue-900 font-bold hover:underline"
                >
                  Sign Up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportSignin;
