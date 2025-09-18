"use client";
import { Dialog } from "@headlessui/react";
import { User, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function RolePopup({ isOpen, onClose, role }) {
  // role prop should be either "user" or "foodPartner"

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Popup Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
          {/* Content based on role */}
          {role === "user" && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <User className="w-6 h-6 text-red-500" />
                <h2 className="text-lg font-semibold">Continue as User</h2>
              </div>
              <p className="mt-2 text-gray-600">
                Login to explore food & save favorites.
              </p>
              <button
                onClick={() => alert("Go to User Login")}
                className="mt-4 w-full bg-red-500 text-white rounded-lg py-2"
              >
                Go to User Login
              </button>
            </div>
          )}

          {role === "foodPartner" && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Store className="w-6 h-6 text-red-500" />
                <h2 className="text-lg font-semibold">
                  Continue as Food Partner
                </h2>
              </div>
              <p className="mt-2 text-gray-600">
                Register to add and manage your food items.
              </p>

              <Link to="/foodpartner/login">
                <button className="mt-4 w-full bg-red-500 text-white rounded-lg py-2">
                  Go to Partner Register
                </button>
              </Link>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
