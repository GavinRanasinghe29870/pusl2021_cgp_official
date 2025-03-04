import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/sportPeople/Home';
import ProductList from "./components/sportPeople/ProductList";
import ProductManage from './components/admin/ProductManage';
import Signin from './components/sportPeople/Signin';
import Signup from './components/sportPeople/Signup';
import DonationRequestForm from './components/clubs/donationReq';
import 'react-multi-carousel/lib/styles.css';
import InsertProduct from './pages/admin/InsertProductPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductList/>} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        < Route path="/donationReq" element={<DonationRequestForm/>}/>
        <Route path="/addProduct" element={<InsertProduct />} />
      </Routes>
    </Router>
  );
}

export default App;