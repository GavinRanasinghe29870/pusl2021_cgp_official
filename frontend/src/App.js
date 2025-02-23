import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/sportPeople/Home';
import ProductList from "./components/sportPeople/ProductList";
import ProductManage from './components/admin/ProductManage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductList/>} />
        <Route path="/admin/productManaging" element={<ProductManage />} />
      </Routes>
    </Router>
  );
}

export default App;