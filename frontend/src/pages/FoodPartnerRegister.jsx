import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Camera, X } from "lucide-react";

export default function FoodPartnerRegister() {
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // 👈 profile image file
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null); // 👈 preview URL

  const navigate = useNavigate();

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // instant preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Build form-data
    const formData = new FormData();
    formData.append("name", businessName);
    formData.append("contactName", contactPerson);
    formData.append("phoneNo", phone);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image); // 👈 backend multer/imagekit will pick this up
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registered:", response.data);

      // reset
      setBusinessName("");
      setContactPerson("");
      setPhone("");
      setEmail("");
      setPassword("");
      setAddress("");
      setImage(null);
      setPreview(null);

      navigate("/create-food");
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
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

        {/* Profile Image Upload like Insta/TikTok */}
        <div className="flex flex-col relative items-center gap-2">
          <label className="cursor-pointer relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-600 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera size={40} className="text-gray-400" />
              )}
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Discard Button OUTSIDE */}
          {preview && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setImage(null);
                setPreview(null);
              }}
              className="mt-2 absolute top-0 right-20 px-3 py-1 rounded-md bg--600 text-white text-xs font-medium hover:bg-red-700 transition"
            >
              <X size={23} />
            </button>
          )}
        </div>
        {/* Name + Contact Person */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Phone + Email */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2 border rounded-lg text-sm sm:text-base dark:bg-gray-700 dark:text-white"
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
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {loading ? "Processing..." : "Create Account"}
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