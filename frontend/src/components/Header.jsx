import React from "react";
import ProfileMenu from "../pages/ProfileMenu";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Bookmark, Utensils } from "lucide-react";
import { useUser } from "../context/UserContext";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const { userData } = useUser();

  useEffect(() => {
    console.log("User data in context now:", userData);
  }, [userData]);
  // Show/hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current) {
        setShowHeader(false);
      } else if (currentY < lastScrollY.current) {
        setShowHeader(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-center  bg-black/10 backdrop-blur-sm  px-4 py-2 transition-transform duration-300 z-50 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
          <Utensils size={24} /> {"FoodieHub"}
        </h1>

        {/* Profile */}
        <ProfileMenu user={userData} />
      </div>
    </div>
  );
};

export default Header;
