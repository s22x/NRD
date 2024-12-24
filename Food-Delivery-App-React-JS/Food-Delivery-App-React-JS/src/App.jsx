import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import RegistrationList from "./pages/RegistrationList/RegistrationList";

const App = () => {
  const location = useLocation();
  return (
    <>
      <div className="app">
        {location.pathname !== "/login" && <Navbar />}
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="list" element={<RegistrationList />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      {location.pathname !== "/login" && <Footer />}
    </>
  );
};

export default App;
