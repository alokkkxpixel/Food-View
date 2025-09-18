"use client";
import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function GotoPop() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <User className="w-6 h-6 text-red-500" />
          <h2 className="text-lg font-semibold">Continue as User</h2>
        </div>
        <p className="mt-2 text-gray-600">
          Login to explore food & save favorites.
        </p>
        <Link to={"/user/login"}>
          <button className="mt-4 w-full bg-red-500 text-white rounded-lg py-2">
            Go to User Login
          </button>
        </Link>
      </div>
    </div>
  );
}
