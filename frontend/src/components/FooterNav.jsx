import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwitchRolePopup from "../pages/SwitchPop";
import { Bookmark, CirclePlus, HomeIcon } from "lucide-react";

const FooterNav = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  // Footer navigation
  const [activeTab, setActiveTab] = useState("saved");
  const handleNav = (tab) => {
    setActiveTab(tab);
    if (tab) navigate(`/${tab}`);
  };
  return (
    <>
      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-black/10 backdrop-blur-sm border-t border-white/20 z-50">
        <button
          onClick={() => handleNav(`home`)}
          className={`flex flex-col items-center text-sm ${
            activeTab === "home" ? "text-red-500" : "text-white"
          }`}
        >
          <HomeIcon size={23} />
          <span>Home</span>
        </button>

        {/* Plus Button -> Opens Popup */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex flex-col items-center text-white"
        >
          <CirclePlus className="w-6 h-6" />
          <span className="text-xs">Add</span>
        </button>
        <button
          onClick={() => handleNav(`savedfood`)}
          className={`flex flex-col items-center text-sm ${
            activeTab === "saved" ? "text-red-500" : "text-white"
          }`}
        >
          <Bookmark size={23} />
          <span>Saved</span>
        </button>
      </div>
      {/* Popup */}
      <SwitchRolePopup
        role="foodPartner"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default FooterNav;
