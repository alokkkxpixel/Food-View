import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

const MotionLink = motion(Link);

export default function LandingPage() {
  const foodIcons = [
    "🍔",
    "🍕",
    "🍜",
    "🥗",
    "🌮",
    "🍣",
    "🥪",
    "🍩",
    "🍟",
    "🍱",
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden">
      {/* --- Liquid Background Blobs (darker + faint) --- */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-red-600 to-orange-500 opacity-10 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-20%] w-[50rem] h-[50rem] rounded-full bg-gradient-to-tr from-green-500 to-lime-400 opacity-10 blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- Branding --- */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <Utensils
            size={44}
            className="text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
          />
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
            FoodieHub
          </h1>
        </div>

        <p className="text-center text-gray-300 max-w-sm mb-12 text-lg drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
          Share and discover amazing food moments 🍔🍕🍣
          <span className="block text-sm text-gray-400">
            “TikTok for Food Lovers”
          </span>
        </p>

        {/* --- Food Icon Marquee --- */}
        <div className="relative w-full overflow-hidden py-6 mb-10">
          <motion.div
            className="flex gap-8 text-4xl whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {[...foodIcons, ...foodIcons].map((icon, idx) => (
              <span key={idx} className="drop-shadow-lg">
                {icon}
              </span>
            ))}
          </motion.div>
        </div>

        {/* --- CTA Get Started --- */}
        <MotionLink
          to="/user/login"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg shadow-lg transition drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]"
        >
          Get Started
        </MotionLink>
      </div>

      {/* --- Mockup Vegetables in Footer Background --- */}
      <div className="absolute bottom-0 w-full flex justify-around items-end pointer-events-none opacity-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/766/766486.png"
          alt="Tomato"
          className="w-20 sm:w-28 animate-bounce"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="Broccoli"
          className="w-20 sm:w-28 animate-pulse"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/2909/2909761.png"
          alt="Carrot"
          className="w-20 sm:w-28 animate-bounce delay-300"
        />
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-gray-400 z-20">
        © {new Date().getFullYear()} FoodieHub. All rights reserved.
      </p>
    </div>
  );
}
