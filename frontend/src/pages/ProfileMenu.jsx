import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import {
  LogOut,
  User,
  Settings,
  X,
  Bug,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  LogIn,
  UserPlus,
  Github,
  ArrowLeftIcon,
  ArrowRight,
  SquareArrowOutUpRight,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const [foodPartnerOpen, setFoodPartnerOpen] = useState(false);

  const navigate = useNavigate();

  async function LogoutHandle(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/auth/user/logout", {
      withCredentials: true,
    });
    console.log(res);
    navigate("/user/login");
  }

  // ✅ Dropdown wrapper ONLY animates children
  const Dropdown = ({ isOpen, children }) => {
    const ref = useRef();

    useEffect(() => {
      if (isOpen) {
        gsap.to(ref.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(ref.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }, [isOpen]);

    return (
      <div
        ref={ref}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
        className="flex flex-col bg-zinc-900"
      >
        {children}
      </div>
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 h-12 w-12 rounded-md absolute top-0 right-3 text-white"
      >
        <img
          className="h-full w-full object-cover rounded-full bg-amber-600"
          src="https://avatars.githubusercontent.com/u/124599?v=4"
          alt="profile"
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-[100vh] w-80 bg-zinc-900 backdrop-blur-xl text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 my-3 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {user.fullname || "foodPartner"}
              </h2>
              <p className="text-sm text-gray-400">
                {user.email || "partner@email.com"}
              </p>
            </div>
          </div>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col flex-1">
          {/* Account */}
          <div>
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="flex justify-between items-center w-full px-4 py-3 text-base hover:bg-zinc-800 transition"
            >
              <span className="flex items-center gap-3">
                <User className="w-5 h-5" /> Account
              </span>
              {accountOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            <Dropdown isOpen={accountOpen}>
              <button className="w-full text-left px-12 py-3 text-sm text-gray-300 hover:bg-zinc-800">
                Profile
              </button>
              <button className="w-full text-left px-12 py-3 text-sm text-gray-300 hover:bg-zinc-800">
                Security
              </button>
              <button className="w-full text-left px-12 py-3 text-sm text-gray-300 hover:bg-zinc-800">
                Preferences
              </button>
            </Dropdown>
          </div>

          {/* FoodPartner */}
          <div>
            <button
              onClick={() => setFoodPartnerOpen(!foodPartnerOpen)}
              className="flex justify-between items-center w-full px-4 py-3 text-base hover:bg-zinc-800 transition"
            >
              <span className="flex items-center gap-3">
                <User className="w-5 h-5" /> FoodPartner
              </span>
              {foodPartnerOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            <Dropdown isOpen={foodPartnerOpen}>
              <button
                onClick={() => navigate("/foodpartner/login")}
                className="w-full text-left px-12 py-3 flex items-center gap-2 text-sm text-gray-300 hover:bg-zinc-800"
              >
                <LogIn size={16} /> Login
              </button>
              <button
                onClick={() => navigate("/foodpartner/register")}
                className="w-full text-left px-12 py-3 flex items-center gap-2 text-sm text-gray-300 hover:bg-zinc-800"
              >
                <UserPlus size={16} /> Register
              </button>
            </Dropdown>
          </div>

          {/* Developer */}
          <div>
            <button
              onClick={() => setDevOpen(!devOpen)}
              className="flex justify-between items-center w-full px-4 py-3 text-base hover:bg-zinc-800 transition"
            >
              <span className="flex items-center gap-3">
                <Bug className="w-5 h-5" /> Developer Options
              </span>
              {devOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <Dropdown isOpen={devOpen}>
              <a
                href="https://github.com/your-repo-here"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto w-fit font-medium px-6 py-3 my-4 flex items-center justify-center gap-2 
                 bg-white border border-gray-300 rounded-md text-sm text-gray-800 
                 shadow-sm hover:bg-gray-100 hover:shadow transition"
              >
                <Github size={20} className="text-gray-900" />
                <span>View GitHub Repo</span>
                <SquareArrowOutUpRight size={14} className="text-gray-500" />
              </a>
            </Dropdown>
          </div>

          {/* Settings */}
          <button className="flex items-center gap-3 px-4 py-3 w-full text-base hover:bg-zinc-800 transition">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-zinc-700">
          <button
            onClick={LogoutHandle}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-900/40 transition"
          >
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>
      </div>
    </>
  );
}
