import { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Edit2,
  Save,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerProfile() {
  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceValue, setPriceValue] = useState("");
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

  if (!partner)
    return (
      <p className="text-center mt-10 text-gray-400">Loading profile...</p>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 px-4 sm:px-6 py-6">
      {/* Profile Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-md p-6 sm:p-10 flex flex-col gap-6">
        {/* Profile Pic + ContactName */}
        <div className="flex bg--400 items-center gap-4">
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
                      onClick={() => {
                        // call backend to update food price
                        setEditingPrice(null);
                      }}
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
        className="sm:hidden fixed bottom-6 right-6 p-4 bg-green-600 hover:bg-green-700 rounded-full shadow-lg text-white"
      >
        <PlusCircle size={28} />
      </button>
    </div>
  );
}
