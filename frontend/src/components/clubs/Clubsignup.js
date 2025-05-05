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
    sportCategory: "",
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
    
    if (!formData.sportCategory) {
      toast.error("Please select a Sport Category.", { position: "top-center" });
      setLoading(false);
      return;
    }

    if (!formData.ClubName || !formData.Clubusername || !formData.password ||
      !formData.confirmPassword || !formData.mobile || !formData.email) {
      toast.error("All required fields must be filled.", { position: "top-center" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.", { position: "top-center" });
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
    navigate("/Clubsignin");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-primary-light flex items-center justify-center min-h-screen p-4">
      <ToastContainer />
      
      {/* Abstract shapes removed */}
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-xl mx-auto z-10 relative">
        {/* Header section with decorative bar */}
        <div className="bg-primary h-3 w-full"></div>
        
        <div className="p-8">
          {/* Logo moved to the top with increased size */}
          <div className="flex items-center justify-center mb-5">
            <div className="bg-primary-light p-4 rounded-full shadow-md">
              <img src="/logo.png" alt="logo" className="h-20 w-20" />
            </div>
          </div>

          {/* Club Sign Up title with header font and primary color */}
          <h1 className="text-center font-header text-header-03 font-bold mb-6 text-primary">Club Sign Up</h1>
          
          <p className="text-center text-gray-600 mb-8">Join our sports community and start managing your club today</p>

          <div className="flex flex-col">
            {/* Sign-up Form */}
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="mb-3">
                    <label className="block text-primary font-medium mb-2 text-header-06">Club Name</label>
                    <input
                      type="text"
                      name="ClubName"
                      placeholder="Club Name"
                      className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={formData.ClubName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-primary font-medium mb-2 text-header-06">Club Username</label>
                    <input
                      type="text"
                      name="Clubusername"
                      placeholder="Club Username"
                      className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={formData.Clubusername}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="mb-3">
                    <label className="block text-primary font-medium mb-2 text-header-06">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password (min 6 characters)"
                        className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {formData.password && formData.password.length < 6 && (
                      <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label className="block text-primary font-medium mb-2 text-header-06">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Re-enter Password"
                        className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-primary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Mobile */}
                  <div className="mb-3">
                    <label className="block text-primary font-medium mb-2 text-header-06">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Mobile"
                      className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="block text-primary font-medium mb-2 text-header-06">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-5">
                  <label className="block text-primary font-medium mb-2 text-header-06">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full px-4 py-3 border rounded bg-blue-50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Sport Level */}
                <div className="mb-5">
                  <label className="block text-primary font-medium mb-2 text-header-06">Sport Level</label>
                  <select
                    name="sportLevel"
                    className="w-full bg-primary text-white py-3 px-4 pr-8 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={formData.sportLevel}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Sport Level</option>
                    <option value="SportPeople">Sports People</option>
                    <option value="Clubs">Clubs</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                
                {/* Sport Category */}
                <div className="mb-5">
                  <label className="block text-primary font-medium mb-2 text-header-06">Sport Category</label>
                  <select
                    name="sportCategory"
                    className="w-full bg-primary text-white py-3 px-4 pr-8 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={formData.sportCategory}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Sport Category</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Table Tennis">Table Tennis</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Football">Football</option>
                    <option value="Chess">Chess</option>
                    <option value="Netball">Netball</option>
                    <option value="Swimming">Swimming</option>
                  </select>
                </div>

                {/* Forgot Password Link */}
                <div className="mb-2 text-right">
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 text-sm"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded hover:bg-primary/80 transition duration-300 text-sm mb-6 mt-4 shadow-md flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing up...
                    </>
                  ) : "Sign Up"}
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center mb-5">
                  <div className="border-t border-gray-300 w-full"></div>
                  <span className="bg-white px-3 text-gray-500 text-sm relative">Or Sign in using</span>
                  <div className="border-t border-gray-300 w-full"></div>
                </div>

                {/* Social Login Options */}
                <div className="flex justify-center space-x-6 mb-6">
                  <button
                    type="button"
                    className="p-3 rounded-full hover:bg-gray-100 transition-all shadow-sm border border-gray-200"
                    onClick={() => alert("Google sign-in not implemented")}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                    className="p-3 rounded-full hover:bg-gray-100 transition-all shadow-sm border border-gray-200"
                    onClick={() => alert("Facebook sign-in not implemented")}
                  >
                    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full hover:bg-gray-100 transition-all shadow-sm border border-gray-200"
                    onClick={() => alert("LinkedIn sign-in not implemented")}
                  >
                    <svg className="w-6 h-6" fill="#0077B5" viewBox="0 0 24 24">
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                    </svg>
                  </button>
                </div>

                {/* Already have an account */}
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:text-primary/80 font-medium"
                      onClick={navigateToSignIn}
                    >
                      Club Sign In
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer section with decorative bar */}
        <div className="bg-primary-light h-6 w-full"></div>
      </div>
    </div>
  );
};

export default ClubSignup;