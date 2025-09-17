import { useState } from "react";
import { LogOut, User, Settings, CreditCard, Bell, X } from "lucide-react";

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md bg-zinc-800 text-white"
      >
        Open Menu
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-[100vh] w-80 bg-zinc-900/90 text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with close */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <img
              src={user.profilePic}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.fullname}</h2>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-6 p-6 flex-1">
          <button className="flex items-center gap-3 text-base hover:text-red-400 transition">
            <User className="w-5 h-5" /> Account
          </button>
          <button className="flex items-center gap-3 text-base hover:text-red-400 transition">
            <CreditCard className="w-5 h-5" /> Billing
          </button>
          <button className="flex items-center gap-3 text-base hover:text-red-400 transition">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="flex items-center gap-3 text-base hover:text-red-400 transition">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-zinc-700">
          <button className="flex items-center gap-3 w-full text-red-400 hover:text-red-500 transition">
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>
      </div>
    </>
  );
}
