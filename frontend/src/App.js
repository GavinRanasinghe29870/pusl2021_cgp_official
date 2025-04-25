import "react-multi-carousel/lib/styles.css";
import ClubMakerPage from "./components/clubs/Clubmaker";
import CheckoutPage from "./components/clubs/Checkout";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import SportPeopleNavbar from "./components/sportPeople/SportPeopleNavbar.js";
import SportPeopleFooter from "./components/sportPeople/SportPeopleFooter.js";
import { useAuthStore } from "./store/useAuthStore.js";
import { useClubAuthStore } from "./store/useClubAuthStore.js";
import Home from "./pages/sportPeople/Home";

//import ProductList from "./pages/clubs/ProductList";
import ProductManage from "./pages/admin/ProductManage.js";
import AboutUs from './pages/sportPeople/AboutUs.js';


import Signin from "./components/sportPeople/SportSignin.js";
import Signup from "./components/sportPeople/SportSignup.js";
import DonationRequestForm from "./components/sportPeople/donation";
import InsertProduct from "./components/admin/InsertProduct.js";
import AdminHome from "./pages/admin/AdminHome";
import ClubHome from "./pages/clubs/ClubHome";
import PersonPortfolio from "./pages/sportPeople/PersonPortfolio";
import ProductPage from "./pages/sportPeople/ProductsPage.js";
import AdPost from "./components/clubs/adposting";
import SportPage from "./components/sportPeople/sportpage02";
import AdminSignin from "./components/admin/AdminSignin.js";
import RequestedMembers from "./components/clubs/ReqMemberView";//
import Cart from "./components/sportPeople/cart";
import ClubPortfolio from "./components/clubs/ClubPortfolio";
import Singleproduct from "./components/sportPeople/SingleProd";
import RegistrationApproval from "./components/clubs/RegistrationApproval";
import DonorPortfolio from "./components/sportPeople/Donorportfolio";
import Clubsignup from "./components/clubs/Clubsignup";
import ClubSignIn from "./components/clubs/Clubsignin";
import ClubChat from "./pages/clubs/ClubChat";
import SalesManage from "./pages/admin/SalesManage.js";
import HelpCenterPage from "./pages/sportPeople/HelpCenter";
import UserProfilePage from "./pages/sportPeople/UserProfilePage";
//import DonatingRequestForm from "./components/sportPeople/donating.js"; //

import DonatingRequestForm from "./components/sportPeople/donating.js";//
import RegisteredClub from "./pages/sportPeople/ReegistedMembers.js"
import FriendChat from './pages/sportPeople/friendChat.js';//
import ClubNavbar from './components/clubs/ClubNavbar.js';
import AdminNavbar from './components/admin/AdminNavbar.js';
import ClubFooter from './components/clubs/ClubFooter.js';
import AdminFooter from './components/admin/AdminFooter.js';



import ClubApprovingPage1 from "./components/admin/ClubApprovingPage1.js";
import ClubApprovingPage2 from "./components/admin/ClubApprovingPage2.js";
import DoneePortfolio from "./components/sportPeople/Doneeportfolio.js";
// import FriendChat from "./components/sportPeople/friendChat.js"; //
// import ClubNavbar from "./components/clubs/ClubNavbar.js";
// import AdminNavbar from "./components/admin/AdminNavbar.js";
// import ClubFooter from "./components/clubs/ClubFooter.js";
// import AdminFooter from "./components/admin/AdminFooter.js";

function App() {
  const { user, checkAuth, onlineUsers } = useAuthStore();
  const { club, checkClubAuth } = useClubAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  console.log({ onlineUsers });

  useEffect(() => {
    Promise.all([checkAuth(), checkClubAuth()]).finally(() => setLoading(false));
  }, [checkAuth, checkClubAuth]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div>
      {[
        "/Signin",
        "/admin/signin",
        "/Clubsignin",
        "/Signup",
        "/Clubsignup",
      ].includes(location.pathname) ? null : [
        "/registrationApproval",
        "/club/home",
        "/club/chat",
        "/ClubPortfolio",
        "/adpost",
        "/RequestMember",
        "/Clubmaker",
      ].includes(location.pathname) ? (
        <ClubNavbar />
      ) : [
        "/admin/home",
        "/admin/productManaging",
        "/salesManage",
        "/ClubApprovingPage1",
        "/ClubApprovingPage2",
      ].includes(location.pathname) ? (
        <AdminNavbar />
      ) : (
        <SportPeopleNavbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ClubPortfolio" element={<ClubPortfolio />} />
        <Route path="/Clubmaker" element={<ClubMakerPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/admin/signin" element={<AdminSignin />} />
        <Route path="/sport" element={<SportPage />} />
        <Route path="/adpost" element={<AdPost />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/PersonPortfolio" element={<PersonPortfolio />} />
        <Route path="/RequestMember" element={<RequestedMembers />} />



        <Route path="/RegisteredClubs" element={<RegisteredClub />} />

        {/* <Route path="/RegisteredClubs" element={<RegisteredClub />} /> */}

        <Route path="/ClubApprovingPage1" element={<ClubApprovingPage1 />} />
        <Route path="/ClubApprovingPage2" element={<ClubApprovingPage2 />} />
        <Route path="/donationReq" element={<DonationRequestForm />} />
        <Route path="/addProduct" element={<InsertProduct />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/club/home" element={<ClubHome />} />

        <Route path="/donatingReq" element={<DonatingRequestForm />} />


        <Route path="/donatingReq" element={<DonatingRequestForm />} />

        <Route path="/donations/:id" element={<DoneePortfolio />} />


        <Route path="/product/:id" element={<Singleproduct />} />
        <Route path="/Clubsignup" element={<Clubsignup />} />
        <Route path="/Clubsignin" element={<ClubSignIn />} />
        <Route path="/ClubApprovingPage1" element={<ClubApprovingPage1 />} />
        <Route path="/ClubApprovingPage2" element={<ClubApprovingPage2 />} />
        <Route path="/salesManage" element={<SalesManage />} />
        <Route path="/profile:id" element={
          user ? <Navigate to={`/profile/${user._id}`} /> : <Navigate to="/Signin" />
        } />
        <Route path="/profile/:id" element={<UserProfilePage />} />


        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/registrationApproval" element={<RegistrationApproval />} />

        <Route path="/Donorportfolio" element={<DonorPortfolio />} />
        <Route path="/club-chat" element={<ClubChat />} />
        <Route path="/club/chat" element={<ClubChat />} />
        <Route path="/helpcenter" element={<HelpCenterPage />} />
        <Route path="/friend-chat" element={<FriendChat />} />


      </Routes>
      {[
        "/Signin",
        "/admin/signin",
        "/Clubsignin",
        "/Signup",
        "/Clubsignup",
        "/club-chat",
        "/club/chat",
      ].includes(location.pathname) ? null : [
        "/club/home",
        "/ClubPortfolio",
        "/adpost",
        "/RequestMember",
        "/Clubmaker",
      ].includes(location.pathname) ? (
        <ClubFooter />
      ) : [
        "/admin/home",
        "/admin/productManaging",
        "/salesManage",
        "/ClubApprovingPage1",
        "/ClubApprovingPage2",
      ].includes(location.pathname) ? (
        <AdminFooter />
      ) : (
        <SportPeopleFooter />
      )}
    </div>
  );
}

export default App;
