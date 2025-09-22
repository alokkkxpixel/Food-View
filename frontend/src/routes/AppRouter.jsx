import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import Home from "../pages/Home";
import CreateFood from "../food-partner/CreateFood";
import Profile from "../food-partner/Profile";
import SavePage from "../pages/SavePage";
import SwitchRolePopup from "../pages/SwitchPop";
import GotoPop from "../pages/GotoPop";
import FoodPartnerProfile from "../food-partner/FoodPartnerProfile";
import LandingPage from "../pages/LandingPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/savedfood" element={<SavePage />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/goto" element={<GotoPop />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/food-partner/profile" element={<FoodPartnerProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
