import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useClubAuthStore } from "../../store/useClubAuthStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

const ClubSignIn = () => {
  const [formData, setFormData] = useState({
    Clubusername: "",
    password: "",
    sportLevel: "Clubs",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signin } = useClubAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sportLevel") {
      if (value === "SportPeople") {
        navigate("/Signin");
        return;
      } else if (value === "Clubs") {
        navigate("/Clubsignin");
        return;
      } else if (value === "Admin") {
        navigate("/admin/signin");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.sportLevel) {
      toast.error("Please select a Sport Level", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      const response = await signin(formData);
      if (response?.success) {
        toast.success("Sign in successful!", { position: "top-center" });
        setTimeout(() => navigate("/registrationApproval"), 2000);
      } else {
        toast.error(response?.error || "Sign in failed. Please check credentials.", {
          position: "top-center",
        });
      }
    } catch (err) {
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
    <div className="min-h-screen bg-primary-light flex items-center justify-center font-body py-8">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-screen-lg mx-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Side: Logo + Title */}
          <div className="flex-1 flex flex-col items-center space-y-6 text-center">
            <div className="text-center mb-3">
              <div className="bg-gradient-to-r from-primary to-blue-800 px-6 py-4 rounded-lg shadow-md">
                <h2 className="text-header-02 font-header font-bold text-white">Club Sign In</h2>
                <p className="text-secondary-light font-medium mt-1">Manage Your Sports Organization</p>
              </div>
            </div>
            
            <img 
              src="/logo.png" 
              alt="Sport Nest Logo" 
              className="h-40 w-auto object-contain" 
            />
            <p className="text-gray-600 max-w-xs hidden md:block">
              Access your club dashboard to manage registrations and more
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-96 bg-primary-light"></div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-6">
                <select
                  name="sportLevel"
                  className="block w-full bg-primary text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all duration-300"
                  value={formData.sportLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Sport Level</option>
                  <option value="SportPeople">Sports People</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Club Username</label>
                <input
                  type="text"
                  name="Clubusername"
                  placeholder="Enter club username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  value={formData.Clubusername}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a 
                  href="forgotPassword" 
                  className="text-primary font-semibold hover:underline transition-all duration-300"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-800 transition-all duration-300 font-medium text-lg flex items-center justify-center"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-gray-600 text-sm absolute">Or sign in using</span>
              </div>

              <div className="flex justify-center space-x-6 mb-6">
                <button type="button" className="text-blue-700 hover:scale-110 transition-transform duration-300">
                  <FaGoogle className="text-2xl" />
                </button>
                <button type="button" className="text-blue-700 hover:scale-110 transition-transform duration-300">
                  <FaFacebook className="text-2xl" />
                </button>
                <button type="button" className="text-blue-700 hover:scale-110 transition-transform duration-300">
                  <FaLinkedin className="text-2xl" />
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-gray-700">
                  New Member?{" "}
                  <a
                    href="Clubsignup"
                    className="text-primary font-bold hover:underline transition-all duration-300"
                  >
                    Club Sign Up
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSignIn;