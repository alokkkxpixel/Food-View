import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

  await axios.post(
    "http://localhost:3000/api/auth/user/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );



    setEmail(""), setPassword("");
    navigate("/home");
  };

  return (
    <AuthLayout title="Sign In" subtitle="Access your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-sans text-center dark:text-gray-400">
          Login as User
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        {/* Password */}
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
        New user?{" "}
        <Link to="/user/register" className="text-red-500 hover:underline">
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
}
