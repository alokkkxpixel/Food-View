import { Link, useLocation } from "react-router-dom";
import { Store, User } from "lucide-react";

export default function AuthLayout({ subtitle, children }) {
  const location = useLocation();

  return (
    <div className="dark flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-md">
        {/* Branding */}
        <h1 className="text-2xl font-bold text-center text-white">FoodieHub</h1>
        <p className="text-center text-gray-400">{subtitle}</p>

        {/* Toggle Tabs */}
        <div className="flex justify-center gap-4 mt-4">
          <Link
            to="/user/register"
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${
              location.pathname.includes("user")
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            <User size={16} /> User
          </Link>
          <Link
            to="/foodpartner/register"
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${
              location.pathname.includes("foodpartner")
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            <Store size={16} /> Food Partner
          </Link>
        </div>

        {/* Form Container */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}