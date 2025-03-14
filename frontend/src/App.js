

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/sportPeople/Home";
import ProductList from "./pages/clubs/ProductList";
import ProductManage from './pages/admin/ProductManage';
import Signin from "./components/sportPeople/Signin";
import Signup from "./components/sportPeople/Signup";
import DonationRequestForm from "./components/sportPeople/donation";
import "react-multi-carousel/lib/styles.css";
import InsertProduct from './components/admin/InsertProduct';
import AdminHome from "./pages/admin/AdminHome";
import ClubHome from "./components/clubs/ClubHome";
import PersonPortfolio from "./pages/sportPeople/PersonPortfolio";
import ProductPage from './pages/sportPeople/ProductsPage';

import AdminSignin from './components/admin/AdminSignin';

import RequestedMembers from "./components/clubs/ReqMemberView";


import Singleproduct from './components/sportPeople/SingleProd';
import RegistrationApproval from './components/clubs/RegistrationApproval';
import DonorPortfolio from './components/sportPeople/Donorportfolio';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/Signin" element={<Signin />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/admin/signin" element={ <AdminSignin />} />

        <Route path="/donationReq" element={<DonationRequestForm />} />
        <Route path="/addProduct" element={<InsertProduct />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/club/home" element={<ClubHome />} />
        <Route path="editprofile" element={<PersonPortfolio/>} />
        <Route path="/RMview"element={<RequestedMembers/>}/>

        <Route path="/product/:id" element={<Singleproduct />} />

        <Route path="/registrationApproval" element={<RegistrationApproval/>} />
        <Route path="/Donorportfolio" element={<DonorPortfolio/>} />
      </Routes>
    </Router>
  );
}

export default App;
