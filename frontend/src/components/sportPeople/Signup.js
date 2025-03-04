import { useState } from "react";
import axios from "axios";

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        alert(data.message);
      };

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-100 p-10 rounded-lg shadow-lg flex">
        <div className="w-1/3 bg-white flex items-center justify-center">
          <h2 className="text-xl font-bold">LOGO</h2>
        </div>
        <div className="w-2/3 p-5">
          <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="number" name="age" placeholder="Age" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="text" name="username" placeholder="Username" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="password" name="confirmPassword" placeholder="Re-enter Password" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="text" name="mobile" placeholder="Mobile" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" className="p-2 border rounded w-full" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" className="p-2 border rounded w-full" onChange={handleChange} required />
            </div>

            <select name="sportLevel" className="p-2 border rounded w-full" onChange={handleChange} required>
              <option value="">Choose Sport Level</option>
              <option value="SportPeople">SportPeople</option>
              <option value="Admin">Admin</option>
              <option value="Clubs">Clubs</option>
            </select>

            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="gender" value="Male" onChange={handleChange} required />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Female" onChange={handleChange} required />
                <span className="ml-2">Female</span>
              </label>
            </div>

            <button type="submit" className="bg-[#0D1271] text-white px-5 py-2 rounded w-full">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
    
    















