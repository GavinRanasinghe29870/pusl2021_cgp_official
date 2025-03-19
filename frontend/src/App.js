import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/sportPeople/Home';
import ProductList from "./components/sportPeople/ProductList";
import Signin from './components/sportPeople/Signin';
import ClubPortfolio from "./components/clubs/ClubPortfolio";
import 'react-multi-carousel/lib/styles.css';
import ClubMakerPage from './components/clubs/Clubmaker';
import CheckoutPage  from './components/clubs/Checkout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductList/>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/ClubPortfolio" element={<ClubPortfolio />}/>
        <Route path="/Clubmaker" element={<ClubMakerPage />}/>
        <Route path="/Checkout" element={<CheckoutPage />}/>
      </Routes>
    </Router>
  );
}

export default App;