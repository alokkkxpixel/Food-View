import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Camera, X } from "lucide-react";

export default function UserRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // 👈 Profile image file
  const [preview, setPreview] = useState(null); // 👈 Preview image

  const navigate = useNavigate();

  // handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Registered user:", response.data);

      // reset
      setFullName("");
      setEmail("");
      setPassword("");
      setImage(null);
      setPreview(null);

      navigate("/home");
    } catch (err) {
      console.error("❌ Register failed:", err.response?.data || err.message);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to discover amazing food"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-sans text-center dark:text-gray-400">
          Register as User
        </h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col  relative items-center gap-2">
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
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              className="mt-2 p-1 absolute top-0 right-20 rounded-full bg-zinc-500/90 text-white text-xs font-medium hover:bg-red-700 transition"
            >
              <X />
            </button>
          )}
        </div>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

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
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/user/login" className="text-red-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}