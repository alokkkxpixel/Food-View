import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Camera, Loader2 } from "lucide-react";

export default function UserRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // 👈 store validation errors

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.includes("@")) newErrors.email = "Please enter a valid email";
    if (password.length < 8)
      newErrors.password = "The password must be at least 8 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if errors exist

    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) formData.append("image", image);

    try {
       await axios.post(
         "http://localhost:3000/api/auth/user/register",
         formData,
         {
           withCredentials: true,
           headers: { "Content-Type": "multipart/form-data" },
         }
       );



      // reset
      setFullName("");
      setEmail("");
      setPassword("");
      setImage(null);
      setPreview(null);
      setErrors({});

      navigate("/home");
    } catch (err) {
      console.error("❌ Register failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to discover amazing food"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
            <p className="text-sm text-gray-200">Creating your account...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <h2 className="text-xl font-sans text-center dark:text-gray-400">
          Register as User
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
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
          {preview && (
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              className="mt-2 px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700 transition"
            >
              Discard Image ✕
            </button>
          )}
        </div>

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white
              ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white
              ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

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
        Already have an account?{" "}
        <Link to="/user/login" className="text-red-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}