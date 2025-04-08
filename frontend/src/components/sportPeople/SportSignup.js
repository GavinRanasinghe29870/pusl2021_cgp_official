import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuthStore } from "../../store/useAuthStore";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
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
      gender: "",
    })

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signup, isSigningUp } = useAuthStore();

    useEffect(() => {
      console.log("Form Data Updated:", formData);
  }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        if (!formData.sportLevel) {
          toast.error("Please select a Sport Level.");
          setLoading(false);
          return;
      }

      if (!formData.firstName || !formData.age || !formData.username || !formData.password ||
        !formData.confirmPassword || !formData.email || !formData.gender) {
        toast.error("All required fields must be filled.");
        setLoading(false);
        return;
    }

       if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
        }
        

        try{
        await signup(formData);
            alert("User Registered Successfully!");
            navigate("/");
      } 
      catch (error) 
      {
        toast.error("Signup failed. Please try again.");
        console.error("Signup Error:", error);
      } 
    finally
    {
        setLoading(false);
    }
  };

    return (
      <div className="bg-blue-100 flex items-center justify-center min-h-screen overflow-hidden">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl h-[96vh]">
          <h1 className="text-center text-2xl font-bold mb-6">Sign Up</h1>

          <div className="flex md:flex-row">
          {/* Logo Section */}
    <div className="flex-1 flex items-center justify-center">
        <img src="/logo512.png" alt="logo" className="h-16 w-16" />
    </div>

    {/* Divider */}

    <div className="border-l border-blue-200 mx-4"></div>
    {/* Sign-up Form */}
    <div className="flex-1 overflow-y-auto max-h-[80vh]"> {/* Scrollable container */}
    <form onSubmit={handleSubmit}>
    {/* First Name */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">First Name</label>
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

    {/* Age */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Age</label>
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

    {/* Username */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Username</label>
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

    {/* Password */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Password</label>
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
        <button type="button" className="absolute right-3 top-2" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
    </div>
    </div>

    {/* Confirm Password */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Confirm Password</label>
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
        <button type="button" className="absolute right-3 top-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
    </div>
    </div>

    {/* Mobile */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Mobile</label>
    <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
        value={formData.mobile}
        onChange={handleChange}
        required
    />
    </div>

    {/* Email */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Email</label>
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

    {/* Address */}
    <div className="mb-3">
    <label className="block text-gray-700 text-sm">Address</label>
    <input
        type="text"
        name="address"
        placeholder="Address"
        className="w-full px-2 py-1 border rounded bg-blue-100 text-sm"
        value={formData.address}
        onChange={handleChange}
        required
    />
    </div>

    {/* Sport Level */}
    <div className="mb-3">
    <select
        name="sportLevel"
        className="w-full bg-blue-900 text-white py-2 px-4 pr-8 rounded text-sm"
        value={formData.sportLevel}
        onChange={handleChange}
    >
        <option value="" disabled>Select Sport Level</option>
        <option value="SportPeople">Sports People</option>
        <option value="Clubs">Clubs</option>
        <option value="Admin">Admin</option>
    </select>
    </div>

    {/* Gender */}
    <div className="mb-2">
    <label className="block text-gray-700 text-sm">Gender</label>
    <div className="flex space-x-4">
        <label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
        </label>
        <label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
        </label>
    </div>
    </div>

    {/* Submit Button */}
    <button
        type="submit"
        className="w-full bg-[#0D1271] text-white py-2 px-4 rounded hover:bg-[#141a88] transition duration-300 col-span-2 text-sm"
        disabled={loading}
    >
        {loading ? "Signing up..." : "Sign Up"}
    </button>
</form>

</div>
     </div>
  </div>
  {/* Toast Container */}
  <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
</div>
        
    );
};
export default SignUp;
    
    















