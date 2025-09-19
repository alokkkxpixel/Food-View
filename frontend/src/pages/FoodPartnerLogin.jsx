import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodpartner/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    setEmail(""), setPassword("");

    navigate("/food-partner/profile");
  };
  return (
    <AuthLayout
      title="Partner Sign In"
      subtitle="Access your partner dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-sans text-center text-black dark:text-gray-400">
          Partner Sign In
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        New partner?{" "}
        <Link
          to="/foodpartner/register"
          className="text-red-500 hover:underline"
        >
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
}
