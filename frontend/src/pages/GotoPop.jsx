"use client";
import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function GotoPop() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Icon and Title */}
      <div className="flex items-center gap-2 mb-6">
        <User className="w-8 h-8 text-red-500" />
        <h1 className="text-2xl font-semibold">Continue as User</h1>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-center max-w-md mb-6">
        Login to explore food & save your favorite items.
      </p>

      {/* Login Button */}

      <Link to="/user/login">
        <button
          onClick={() => alert("Go to User Login")}
          className="w-full max-w-sm bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          Go to User Login
        </button>
      </Link>
    </div>
  );
}
