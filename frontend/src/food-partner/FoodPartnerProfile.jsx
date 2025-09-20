import { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Edit2,
  Save,
  Mail,
  Phone,
  MapPin,
  Settings,
  X,
  LogOut,
  User,
  Trash,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function FoodPartnerProfile() {
  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceValue, setPriceValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/food-partner/profile",
          {
            withCredentials: true,
          }
        );
        setPartner(res.data.foodPartner);
        setFoods(res.data.foodPartner.foodItems);
      } catch (err) {
        console.error(
          "Error fetching profile:",
          err.response?.data || err.message
        );
      }
    }
    fetchProfile();
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleDelete(foodId) {
    if (!window.confirm("Delete this food item?")) return;
    try {
      console.log(foodId);
      await axios.delete(`http://localhost:3000/api/food/${foodId}`, {
        withCredentials: true,
      });
      alert("Food deleted successfully!");
      // Update UI by removing deleted food
      setFoods((prev) => prev.filter((f) => f.id !== foodId));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Error deleting food!");
    }
  }
  async function handleFoodPartnerDelete(foodId) {
    if (!window.confirm("Delete your foodPartner Account?")) return;
    try {
      console.log(foodId);
      await axios.delete(
        `http://localhost:3000/api/auth/foodpartner/${foodId}`,
        {
          withCredentials: true,
        }
      );
      alert("FoodPartner deleted successfully!");
      // Update UI by removing deleted food
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Error deleting food!");
    }
  }
  async function handleSavePrice(foodId, newPrice) {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/food/${foodId}/price`,
        { price: newPrice },
        { withCredentials: true }
      );
      console.log(res);

      // ✅ Optimistically update foods array in state
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === foodId ? { ...food, price: newPrice } : food
        )
      );

      setEditingPrice(null); // exit edit mode
    } catch (err) {
      console.error("Price update failed:", err);
      alert("Failed to update price");
    }
  }
  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/foodpartner/logout",
        {},
        { withCredentials: true }
      );
      navigate("/foodpartner/login"); // redirect to login after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  }
  function handleSwitchUser() {
    navigate("/user/login"); // redirect to user login
  }

  if (!partner)
    return (
      <div className="w-full h-[100vh] bg-zinc-950 flex items-center justify-center">
        <p className="text-center mt-10 text-xl text-gray-400">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-4 sm:px-6 py-10">
      {/* Profile Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-md p-6 sm:p-10 flex flex-col gap-6 relative">
        {/* Settings Icon (dropdown trigger) */}
        <div ref={menuRef} className="absolute top-5 right-5">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-400 hover:text-white"
          >
            <Settings size={22} />
          </button>

          {/* Context Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-md bg-zinc-800 border border-zinc-700 shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-zinc-700 rounded-t-md transition"
              >
                <LogOut size={16} /> Logout
              </button>
              <button
                onClick={handleSwitchUser}
                className="flex items-center gap-2 w-full px-3 py-2 text-gray-200 hover:bg-zinc-700 rounded-b-md transition"
              >
                <User size={16} /> Sign in as User
              </button>
              <button
                onClick={() => handleFoodPartnerDelete(partner._id)}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-800 hover:text-white rounded-b-md transition"
              >
                <Trash size={16} /> Delete account
              </button>
            </div>
          )}
        </div>

        {/* Profile Pic + ContactName */}
        <div className="flex items-center gap-4">
          <img
            src={partner.image}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-zinc-700 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{partner.contactName}</h2>
              <span className="text-xl">👋</span>
            </div>
            <h1 className="text-2xl font-bold">{partner.name}</h1>
          </div>
        </div>

        {/* Profile Info with Icons */}
        <div className="flex flex-col gap-2 ml-1">
          <div className="flex items-center gap-2 text-gray-300">
            <Mail size={18} className="text-gray-400" /> {partner.email}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={18} className="text-gray-400" /> {partner.phoneNo}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={18} className="text-gray-400" /> {partner.address}
          </div>
        </div>

        {/* Desktop Add Food Button */}
        <button
          onClick={() => navigate("/create-food")}
          className="hidden sm:flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition self-start"
        >
          <PlusCircle size={20} /> Add Food
        </button>
      </div>

      {/* Foods Heading */}
      <div className="flex justify-between items-center mt-10 mb-4">
        <h2 className="text-xl font-bold text-white">🍴 Foods You Created</h2>
      </div>

      {/* Foods List */}
      {foods.length === 0 ? (
        <p className="text-gray-500">No foods created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow relative"
            >
              {/* Food Video */}
              <video
                src={food.video}
                autoPlay
                muted
                loop
                className="w-full h-64 rounded-md object-cover"
              />

              <h3 className="text-lg font-bold mt-3">{food.name}</h3>
              <p className="text-gray-400">{food.description}</p>

              {/* Price Inline Edit */}
              <div className="flex justify-between items-center mt-3">
                {editingPrice === food._id ? (
                  <>
                    <input
                      type="number"
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      className="px-2 py-1 rounded bg-zinc-800 text-white w-24"
                    />
                    <button
                      onClick={() => handleSavePrice(food._id, priceValue)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Save size={14} /> Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-200 font-semibold">
                      ₹ {food.price}
                    </p>
                    <button
                      onClick={() => {
                        setEditingPrice(food._id);
                        setPriceValue(food.price);
                      }}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                  </>
                )}
              </div>
              {/* Delete Button */}
              <button
                onClick={() => {
                  handleDelete(food._id);
                  // TODO: connect to delete food API
                }}
                className="absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white shadow"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Food (mobile FAB) */}
      <button
        onClick={() => navigate("/create-food")}
        className="sm:hidden fixed sm:bottom-4 bottom-20 right-6 p-3 bg-green-600 hover:bg-green-700 rounded-full shadow-lg text-white"
      >
        <PlusCircle size={20} />
      </button>
    </div>
  );
}
