import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/sportPeople/Home';
import ProductList from "./components/sportPeople/ProductList";
import ProductManage from './components/admin/ProductManage';
import Signin from './components/sportPeople/Signin';
import 'react-multi-carousel/lib/styles.css';
import SingleProduct from './components/sportPeople/Singleproduct';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductList/>} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path='/singleproduct' element={<SingleProduct />} />
      </Routes>
    </Router>
  );
}

export default App;