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
        <div className="bg-blue-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-center text-2xl font-bold mb-8">Sign In</h1>
        <div className="flex md:flex-row">
          {/* Logo Section */}
          <div className="flex-1 flex items-center justify-center">
            <img src="/logo512.png" alt="logo" className="h-16 w-16" />
          </div>

    
            {/* Divider */}
          <div className="w-px bg-blue-200 mx-8"></div>

{/* Sign-in Form */}
<div className="flex-1">
  <form onSubmit={handleSubmit}>
    {/* Role Dropdown */}
    <div className="mb-4">
      <select
        name="role"
        className="block w-full bg-blue-900 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-blue-800"
        value={role}
        onChange={handleChange}>
        
        <option value="SportPeople">Sports People</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Username Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </div>

             {/* Password Input */}
             <div className="mb-4 relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded bg-blue-100"
                  value={password}
                  onChange={handleChange}
                  required
                />
              
              {/* Toggle Eye Icon */}
              <button type="button" className="absolute right-3 top-10 text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
    
              {/* Forgot Password */}
              <div className="mb-4 text-right font-semibold">
                <a href="forgotPassword" className="text-blue-900 font-bold hover:text-gray-800">
                  Forgot Password?
                </a>
              </div>
    
              {/* Sign In Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-[#0D1271] text-white py-2 px-4 rounded hover:bg-[#141a88] transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
            
    
            {/* Social Sign In */}
            <div className="text-center mb-4">
              <span className="text-gray-700">Or Sign in using</span>
            <div className="flex justify-center space-x-4 mt-2">
              <FaGoogle className="text-2xl text-blue-700 cursor-pointer" />
              <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
              <FaLinkedin className="text-2xl text-blue-700 cursor-pointer" />
            </div>
            </div>
    
            {/* Sign Up Link */}
            <div className="text-center">
            <span className="text-gray-700">New Member?{" "}
              <a href="signup" className="text-blue-900  font-bold hover:underline">Sign Up
              </a>
            </span>
            </div>
            </div>
            </div>
            </div>
          </div>
          
    

        
       

      
      )
}
  
    
    
  
    


export default Signin