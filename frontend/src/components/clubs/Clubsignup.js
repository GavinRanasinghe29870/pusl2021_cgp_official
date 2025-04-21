import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClubSignup = () => {
  const [formData, setFormData] = useState({
    ClubName: "",
    Clubusername: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    email: "",
    sportLevel: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.sportLevel) {
      toast.error("Please select a Sport Level.", { position: "top-center" });
      setLoading(false);
      return;
    }

    if (!formData.ClubName || !formData.Clubusername || !formData.password ||
      !formData.confirmPassword || !formData.mobile || !formData.email) {
      toast.error("All required fields must be filled.", { position: "top-center" });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ClubAuth/Clubsignup",
        formData
      );

      if (response.status === 201) {
        toast.success("Signup successful!", { position: "top-center" });
        setTimeout(() => navigate("/Clubsignin"), 2000);
      }
    } catch (error) {
      if (error.response) {
        console.error("Signup Error:", error.response.data);
        if (error.response.status === 409) {
          toast.error("Club username or email already exists. Please choose a different one.", { position: "top-center" });
        } else {
          toast.error(`Signup failed: ${error.response.data.message}`, { position: "top-center" });
        }
      } else {
        toast.error("Network error. Please try again later.", { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen p-4">
      <ToastContainer />
      {/* Increased max-width from max-w-md to max-w-xl */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl mx-auto">
        <h1 className="text-center text-2xl font-bold mb-8">Club Sign Up</h1>

        <div className="flex flex-col">
          {/* Logo Section - Moved to the side */}
          <div className="flex items-center justify-center mb-8">
            <img src="/logo512.png" alt="logo" className="h-16 w-16" />
          </div>

          {/* Sign-up Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Club Name</label>
                <input
                  type="text"
                  name="ClubName"
                  placeholder="Club Name"
                  className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                  value={formData.ClubName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Club Username</label>
                <input
                  type="text"
                  name="Clubusername"
                  placeholder="Club Username"
                  className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                  value={formData.Clubusername}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full px-4 py-3 border rounded bg-blue-50 text-sm"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Sport Level */}
              <div className="mb-5">
                <select
                  name="sportLevel"
                  className="w-full bg-blue-900 text-white py-3 px-4 pr-8 rounded text-sm"
                  value={formData.sportLevel}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Sport Level</option>
                  <option value="SportPeople">Sports People</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Forgot Password Link */}
              <div className="mb-2 text-right">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 px-4 rounded hover:bg-blue-800 transition duration-300 text-sm mb-6 mt-4"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>

              {/* Social Login Options */}
              <div className="text-center mb-5">
                <p className="text-sm text-gray-600 mb-3">Or Sign in using</p>
                <div className="flex justify-center space-x-6">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => alert("Google sign-in not implemented")}
                  >
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => alert("Facebook sign-in not implemented")}
                  >
                    <svg className="w-7 h-7" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => alert("LinkedIn sign-in not implemented")}
                  >
                    <svg className="w-7 h-7" fill="#0077B5" viewBox="0 0 24 24">
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Already have an account */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={navigateToSignIn}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSignup;