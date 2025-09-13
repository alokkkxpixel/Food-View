import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import Home from "../pages/Home";
import CreateFood from "../food-partner/CreateFood";
import Profile from "../food-partner/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
