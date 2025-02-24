import { useState } from "react"
//import axios from "axios"
import { FaGoogle,FaFacebook,FaLinkedin } from 'react-icons/fa'
import { Eye, EyeOff } from "lucide-react"; // Import eye icons


const Signin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('SportPeople')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
      const { name, value } = e.target
      if (name === "username") setUsername(value)
      if (name === "password") setPassword(value)
      if (name === "role") setRole(value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        console.log("Submitted:",{username,password,role})

        try {
          const response = await fetch("http://localhost:5000/api/auth/signin",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role }),
          })

          const data = await response.json()
          console.log("Response:",data)

          if(response.ok) {
            localStorage.setItem("token",data.token)
            alert("Signin Successful!")
            //Redirect to dashboard if needed
            //navigate("/dashboard")
          }
          else
          {
            alert(data.message || "Signin Failed!")
          }
        } 
        catch (error) {
          console.error("Signin Error:",error);
        }
      setLoading(false)
    
    }
      return (
        <div
        className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/signin.jpg')" }} >

       

        {/* Centered Sign-in Container */}
        <div className="relative flex w-[700px] bg-white bg-opacity-30 background-color (255,255,255,0.9) background-filter blur(10px) border-radius 1rem p-6 rounded-xl shadow-lg">

     {/* Left Side - Logo Section */}
     <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-100 bg-opacity-65 p-6 rounded-l-l ">
          <img src="/logo192.png" alt="Logo" className="w-32 h-32 object-cover border border-gray-300 rounded-md" /> {/* Replace with actual logo */}
        </div>
    
         {/* Right Side - Sign-in Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-black-700">Sign In</h2>
    
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Role Dropdown */}
              <select
                name="role"
                className="w-full p-3 bg-gray-200 rounded-md outline-none cursor-pointer"
                value={role}
                onChange={handleChange}
              >
                <option value="SportPeople">Sports People</option>
                <option value="Clubs">Clubs</option>
                <option value="Admin">Admin</option>
              </select>
    
              {/* Username Input */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                value={username}
                onChange={handleChange}
                required
              />
    
              {/* Password Input */}
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                value={password}
                onChange={handleChange}
                required
              />

              {/* Toggle Eye Icon */}
              <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
    
              {/* Forgot Password */}
              <div className="text-right font-semibold text-sm">
                <a href="forgotPassword" className="text-black-600 hover:text-gray-800">
                  Forgot Password?
                </a>
              </div>
    
              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-[#0D1271] text-white font-bold p-3 rounded-md hover:bg-[#141a88] transition duration-300"
              >
                Sign In
              </button>
            </form>
    
            {/* Social Sign In */}
            <div className="text-center font-semibold text-sm mt-4">Or Sign in using</div>
            <div className="flex justify-center gap-4 mt-2">
              <FaGoogle className="text-red-500 text-2xl cursor-pointer" />
              <FaFacebook className="text-blue-500 text-2xl cursor-pointer" />
              <FaLinkedin className="text-blue-700 text-2xl cursor-pointer" />
            </div>
    
            {/* Sign Up Link */}
            <p className="text-center font-semibold text-sm mt-4 text-black-600">
              New Member?{" "}
              <a href="signup" className="text-blue-700  font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        </div>
        </div>
      
      )
}
  
    
    
  
    


export default Signin