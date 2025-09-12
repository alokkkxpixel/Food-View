import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FoodPartnerRegister() {
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodpartner/register",
      {
        name: businessName,
        contactName: contactPerson,
        phoneNo: phone,
        address,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    setEmail(""), setPassword("");
    setAddress("");
    setBusinessName(""), setContactPerson(""), setPhone("");
    navigate("/create-food");
  };

  return (
    <AuthLayout
      title="Join as Partner"
      subtitle="Start your food business journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-sans text-center dark:text-gray-400">
          Register as Partner
        </h2>

        {/* Name + Contact Person */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="flex-1 min-w-0 w-full px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="flex-1 min-w-0 w-full px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Phone + Email */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 min-w-0 w-full px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 w-full px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Address full width */}
        <input
          type="text"
          placeholder="Business Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
        />

        {/* Password full width */}
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Register as Partner
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Already a partner?{" "}
        <Link to="/foodpartner/login" className="text-red-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
