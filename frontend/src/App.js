import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/sportPeople/Navbar";
import Footer from "./components/sportPeople/Footer";
import { useAuthStore } from "./store/useAuthStore.js";
import Home from "./pages/sportPeople/Home";
import ProductList from "./pages/clubs/ProductList";
import ProductManage from './pages/admin/ProductManage';
import Signin from "./components/sportPeople/Signin";
import Signup from "./components/sportPeople/Signup";
import DonationRequestForm from "./components/sportPeople/donation";
import InsertProduct from './components/admin/InsertProduct';
import AdminHome from "./pages/admin/AdminHome";
import ClubHome from "./components/clubs/ClubHome";
import PersonPortfolio from "./pages/sportPeople/PersonPortfolio";
import ProductPage from './pages/sportPeople/ProductsPage';
import AdPost from './components/clubs/adposting';
import SportPage from './components/sportPeople/sportpage02';


import AdminSignin from './components/admin/AdminSignin';

import RequestedMembers from "./components/clubs/ReqMemberView";
import Cart from "./components/sportPeople/cart";



import Singleproduct from './components/sportPeople/SingleProd';
import RegistrationApproval from './components/clubs/RegistrationApproval';
import DonorPortfolio from './components/sportPeople/Donorportfolio';

import Clubsignup from "./components/clubs/Clubsignup";
import ClubSignIn from "./components/clubs/Clubsignin";

import ClubChat from "./pages/clubs/ClubChat";




function App() {

  const { authUser, checkAuth, onlineUsers } = useAuthStore()
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  if (loading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/Signin" element={!authUser ? <Signin /> : <Navigate to="/" />} />
        <Route path="/Signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin/signin" element={<AdminSignin />} />
        <Route path="/sport" element={<SportPage/>} />
        <Route path="/adpost" element={<AdPost/>} />

        <Route path="/donationReq" element={<DonationRequestForm />} />
        <Route path="/addProduct" element={<InsertProduct />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/club/home" element={<ClubHome />} />

        <Route path="/product/:id" element={<Singleproduct />} />
        <Route path="/Clubsignup" element={<Clubsignup />} />
        <Route path="/Clubsignin" element={<ClubSignIn />} />



        <Route path="/registrationApproval" element={<RegistrationApproval />} />
        <Route path="/Donorportfolio" element={<DonorPortfolio />} />
        <Route path="/club/chat" element={authUser ? <ClubChat /> : <Navigate to="/Signin" />} />
      </Routes>
      {location.pathname !== "/club/chat" && <Footer />}
    </div>
  );
}

export default App;
