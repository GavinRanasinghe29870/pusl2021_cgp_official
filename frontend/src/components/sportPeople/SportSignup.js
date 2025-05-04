import { useState, useEffect } from "react";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SportSignUp = () => {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const sportCategories = [
    "Cricket",
    "Badminton",
    "Volleyball",
    "Basketball",
    "Table Tennis",
    "Tennis",
    "Football",
    "Chess",
    "Netball",
    "Swimming",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    age: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    email: "",
    sportLevel: "",
    sportcategory: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "sportLevel") {
      if (value === "SportPeople") {
        navigate("/Signup");
      } else if (value === "Clubs") {
        navigate("/Clubsignup");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.firstName ||
      !formData.age ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email ||
      !formData.sportLevel ||
      !formData.sportcategory ||
      !formData.gender
    ) {
      toast.error("All required fields must be filled.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await signup(formData);
      console.log("Signup response:", response);

      if (response?.success) {
        toast.success("Sign Up Successful!", { position: "top-center" });
        setTimeout(() => navigate("/Signin"), 2000);
      } else {
        toast.error(
          response?.error || "Sign up failed. Please check credentials.",
          {
            position: "top-center",
          }
        );
      }
    } catch (err) {
      console.error("Sign up error:", err);

      if (err.message === "Network Error") {
        toast.error(
          "Network error: Unable to connect to the server. Please check if the server is running.",
          { position: "top-center" }
        );
      } else {
        toast.error(
          err?.response?.data?.error || "Sign up failed. Please try again.",
          { position: "top-center" }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen overflow-hidden">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl h-[96vh]">
        <h1 className="text-center text-3xl font-bold mb-8 transition-all duration-800 ease-out transform hover:scale-110">Create Account!</h1>

        <div className="flex md:flex-row">
          {/* Logo Section */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className="h-70 w-auto object-contain"
            />
          </div>

          {/* Divider */}
          <div className="border-l border-blue-200 mx-4"></div>

          {/* Sign-up Form */}
          <div className="flex-1 overflow-y-auto max-h-[80vh]">
            <form onSubmit={handleSubmit}>
              {/* ... (rest of your form fields remain the same) ... */}
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">
                  Sport Level
                </label>
                <select
                  name="sportLevel"
                  className="w-full bg-blue-900 text-white py-2 px-4 pr-8 rounded text-sm"
                  value={formData.sportLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Sport Level
                  </option>
                  <option value="SportPeople">SportPeople</option>
                  <option value="Clubs">Clubs</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">
                  Sport Category
                </label>
                <select
                  name="sportcategory"
                  className="w-full bg-blue-900 text-white py-2 px-4 pr-8 rounded text-sm"
                  value={formData.sportcategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Sport Category</option>
                  {sportCategories.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">Gender</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      checked={formData.gender === "Male"}
                      required
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      checked={formData.gender === "Female"}
                      required
                    />{" "}
                    Female
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0D1271] text-white font-medium mb-1 py-2 px-4 rounded hover:bg-[#141a88] transition duration-300 col-span-2 text-md"
                disabled={loading || isSigningUp}
              >
                {loading || isSigningUp ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      {/* //<ToastContainer position="top-right" autoClose={2000} hideProgressBar /> */}
    </div>
  );
};

export default SportSignUp;
