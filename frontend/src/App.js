import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/sportPeople/Home';
import ProductList from "./pages/clubs/ProductList";
import ProductManage from './pages/admin/ProductManage';
import Signin from './components/sportPeople/Signin';
import DonationRequestForm from './components/clubs/donationReq';
import 'react-multi-carousel/lib/styles.css';
import InsertProduct from './components/admin/InsertProduct';
import ProductPage from './pages/sportPeople/ProductsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/Signin" element={<Signin />} />
        < Route path="/donationReq" element={<DonationRequestForm/>}/>
        <Route path="/addProduct" element={<InsertProduct />} />
      </Routes>
    </Router>
  );
}

export default App;