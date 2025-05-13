import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// Layout Components
import SportPeopleNavbar from "./components/sportPeople/SportPeopleNavbar.js";
import SportPeopleFooter from "./components/sportPeople/SportPeopleFooter.js";
import ClubNavbar from "./components/clubs/ClubNavbar.js";
import AdminNavbar from "./components/admin/AdminNavbar.js";
import ClubFooter from "./components/clubs/ClubFooter.js";
import AdminFooter from "./components/admin/AdminFooter.js";

// Auth Stores
import { useAuthStore } from "./store/useAuthStore.js";
import { useClubAuthStore } from "./store/useClubAuthStore.js";

// Pages and Components
import Home from "./pages/sportPeople/Home";
import AboutUs from './pages/sportPeople/AboutUs.js';
import HelpCenterPage from "./pages/sportPeople/HelpCenter";
import UserProfilePage from "./pages/sportPeople/UserProfilePage";
import FriendChat from './pages/sportPeople/friendChat.js';
import RegisteredClub from "./pages/sportPeople/ReegistedMembers.js";
import PersonPortfolio from "./pages/sportPeople/PersonPortfolio";
import DonorPortfolio from "./components/sportPeople/Donorportfolio";
import DoneePortfolio from "./components/sportPeople/Doneeportfolio.js";
import SportPage01 from "./components/sportPeople/sportspage01";
import SportPage02 from "./components/sportPeople/sportpage02";
import Cart from "./components/sportPeople/cart";
import ProductPage from "./pages/sportPeople/ProductsPage.js";
import Singleproduct from "./pages/sportPeople/SingleProd";
import SportsPage from "./pages/sportPeople/Sportpage03.js";

// Auth Pages
import Signin from "./components/sportPeople/SportSignin.js";
import Signup from "./components/sportPeople/SportSignup.js";
import AdminSignin from "./components/admin/AdminSignin.js";
import Clubsignup from "./components/clubs/Clubsignup";
import ClubSignIn from "./components/clubs/Clubsignin";

// Club Pages
import ClubHome from "./pages/clubs/ClubHome";
import ClubPortfolio from "./components/clubs/ClubPortfolio";
import ClubMakerPage from "./components/clubs/Clubmaker";
import CheckoutPage from "./components/clubs/Checkout";
import RequestedMembers from "./components/clubs/ReqMemberView";
import AdPost from "./components/clubs/adposting";
import RegistrationApproval from "./components/clubs/RegistrationApproval";
import ClubChat from "./pages/clubs/ClubChat";

// Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import ProductManage from "./pages/admin/ProductManage.js";
import InsertProduct from "./components/admin/InsertProduct.js";
import SalesManage from "./pages/admin/SalesManage.js";
import ClubApprovingPage1 from "./components/admin/ClubApprovingPage1.js";
import ClubApprovingPage2 from "./components/admin/ClubApprovingPage2.js";

// Donation Pages
import DonationRequestForm from "./components/sportPeople/donation";
import DonatingRequestForm from "./components/sportPeople/donating.js";
import RegClubs from "./pages/sportPeople/RegisteredClubs.js";

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
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
          role="status"
        ></div>
      </div>
    );
  }

  const path = location.pathname;

  const noNavbarPaths = ["/Signin", "/admin/signin", "/Clubsignin", "/Signup", "/Clubsignup"];
  const clubPaths = ["/registrationApproval", "/club/home", "/club-chat", "/ClubPortfolio", "/adpost", "/RequestMember", "/Clubmaker"];
  const adminPaths = ["/admin/home", "/admin/productManaging", "/salesManage", "/admin/club-requests", "/admin/club-approvals"];

  const renderNavbar = () => {
    if (noNavbarPaths.includes(path)) return null;
    if (clubPaths.includes(path)) return <ClubNavbar />;
    if (adminPaths.includes(path)) return <AdminNavbar />;
    return <SportPeopleNavbar />;
  };

  const renderFooter = () => {
    if (noNavbarPaths.includes(path) || path === "/chat") return null;
    if (clubPaths.includes(path)) return <ClubFooter />;
    if (adminPaths.includes(path)) return <AdminFooter />;
    return <SportPeopleFooter />;
  };

  return (
    <div>
      {renderNavbar()}
      <Routes>
        <Route
          path="/"
          element={club ? <Navigate to="/club/home" /> : <Home />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/helpcenter" element={<HelpCenterPage />} />
        <Route path="/friend-chat" element={<FriendChat />} />
        <Route path="/PersonPortfolio" element={<PersonPortfolio />} />
        <Route path="/Donorportfolio" element={<DonorPortfolio />} />
        <Route path="/donations/:id" element={<DoneePortfolio />} />
        <Route path="/sport01" element={<SportPage01 />} />
        <Route path="/sport02" element={<SportPage02 />} />
        <Route path="/sportpage3" element={<SportsPage />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/product/:id" element={<Singleproduct />} />
        <Route path="/donationReq" element={<DonationRequestForm />} />
        <Route path="/donatingReq" element={<DonatingRequestForm />} />
        <Route path="/addProduct" element={<InsertProduct />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/salesManage" element={<SalesManage />} />
        <Route path="/admin/club-requests" element={<ClubApprovingPage1 />} />
        <Route path="/admin/club-approvals" element={<ClubApprovingPage2 />} />
        <Route path="/registrationApproval" element={<RegistrationApproval />} />
        <Route
          path="/profile:id"
          element={user ? <Navigate to={`/profile/${user._id}`} /> : <Navigate to="/Signin" />}
        />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        {/* Club-only routes */}
        {club ? (
          <>
            <Route path="/club-chat" element={<ClubChat />} />
            <Route path="/RequestMember" element={<RequestedMembers />} />
            <Route path="/ClubPortfolio/:id" element={<ClubPortfolio />} />
            <Route path="/Clubmaker" element={<ClubMakerPage />} />
            <Route path="/club/home" element={<ClubHome />} />
            <Route path="/adpost" element={<AdPost />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {/* User-only routes */}
        {user ? (
          <>
            <Route path="/RegisteredClubs" element={<RegisteredClub />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/chat" element={<ClubChat />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/regclubs" element={<RegClubs />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {/* Public routes */}
        {!user && !club && (
          <>
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/admin/signin" element={<AdminSignin />} />
            <Route path="/Clubsignup" element={<Clubsignup />} />
            <Route path="/Clubsignin" element={<ClubSignIn />} />
          </>
        )}
      </Routes>
      {renderFooter()}
    </div>
  );
}

export default App;
