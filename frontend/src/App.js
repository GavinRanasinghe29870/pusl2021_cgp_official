import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/sportPeople/Home';
import ProductList from "./components/sportPeople/ProductList";
import Signin from './components/sportPeople/Signin';
import 'react-multi-carousel/lib/styles.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductList/>} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;