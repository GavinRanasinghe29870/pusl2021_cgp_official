import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    sportLevel: "Admin",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Redirect if other roles selected
    if (name === "sportLevel") {
      if (value === "SportPeople") navigate("/Signin");
      else if (value === "Clubs") navigate("/Clubsignin");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, sportLevel } = formData;

    if (!username || !password || !sportLevel) {
      toast.error("Please fill in all fields!", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/signin", {
        username,
        password,
        sportLevel,
      });

      console.log("Admin Signin response:", res);

      // Check if the response is successful
      if (res?.status === 200 && res.data?.message === "Login successful") {
        toast.success("Admin Sign-in successful!", { position: "top-center" });
        setTimeout(() => navigate("/admin/home"), 2000); // Redirect after 2 seconds
      } else {
        toast.error(
          res?.data?.message ||
            "Admin Sign-in failed. Please check credentials.",
          {
            position: "top-center",
          }
        );
      }
    } catch (err) {
      console.error("Admin Sign in error:", err);

      // Special handling for network errors
      if (err.message === "Network Error") {
        toast.error(
          "Network error: Unable to connect to the server. Please check if the server is running.",
          { position: "top-center" }
        );
      } else {
        toast.error(
          err?.response?.data?.message ||
            "Admin Sign-in failed. Please try again.",
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
        <h1 className="text-center text-3xl font-bold mb-8 transition-all duration-800 ease-out transform hover:scale-110">
          Welcome Back Admin!
        </h1>
        <div className="flex md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className="h-70 w-auto object-contain"
            />
          </div>

          <div className="w-px bg-blue-200 mx-8"></div>

          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <select
                  name="sportLevel"
                  className="block w-full bg-blue-900 text-white py-2 px-4 rounded"
                  value={formData.sportLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="SportPeople">SportPeople</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Admin Username"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Admin Password"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-[38px] text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mb-4 text-right font-semibold">
                <a
                  href="/forgotPassword"
                  className="text-blue-900 font-bold hover:text-gray-800"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0D1271] text-white font-medium mb-1 py-2 px-4 rounded hover:bg-[#141a88] text-md"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;
