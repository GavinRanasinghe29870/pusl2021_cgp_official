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
    sportLevel: "Admin", // Default role set to Admin
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Redirect based on selected role
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
    const { username, password, sportLevel } = formData;

    if (!username || !password || !sportLevel) {
      toast.error("Please fill in all fields!", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/signin",
        formData
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Admin Sign In Successful!", { position: "top-center" });

      setTimeout(() => {
        navigate("/admin/home");
      }, 2000);
    } catch (err) {
      console.error("Admin Signin error:", err);
      toast.error(
        err.response?.data?.message || "Network error. Please try again.",
        { position: "top-center" }
      );
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

          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Select Sport Level
                </label>
                <select
                  name="sportLevel"
                  className="block w-full bg-blue-900 text-white py-2 px-4 rounded"
                  value={formData.sportLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="SportPeople">Sport People</option>
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

              <div className="mb-4 text-right">
                <a
                  href="/forgotPassword"
                  className="text-blue-900 font-semibold hover:text-gray-800"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0D1271] text-white py-2 px-4 rounded hover:bg-[#141a88]"
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
