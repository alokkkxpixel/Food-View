import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  MoreVertical,
  ArrowLeft,
  Utensils,
} from "lucide-react";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const videoRefs = useRef([]);

  // Fetch videos
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => setVideos(response.data.foodItems))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  // Play/Pause on scroll
  useEffect(() => {
    if (!videos.length) return;
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { root: null, threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  // Show/hide header on scroll
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current) {
        // Scrolling down → hide header
        setShowHeader(false);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up → show header
        setShowHeader(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle like
  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-center px-4 py-3 transition-transform duration-300 z-50 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Back Arrow */}
        <Link to="/" className="absolute left-4 text-white">
          <ArrowLeft size={26} />
        </Link>

        {/* App Name + Icon */}
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
          <Utensils size={24} /> FoodApp
        </h1>
      </div>

      {/* Feed */}
      {videos.map((video, index) => (
        <div
          key={video._id}
          className="relative h-screen w-full flex items-center justify-center snap-start"
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.video}
            className="h-full w-full object-cover"
            playsInline
            loop
            muted
            preload="metadata"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Dish Name + Price */}
          <div className="absolute top-6 left-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-[6px] h-[6px] bg-red-500 p-1 rounded-full"></span>
              {video.name}
            </h2>
            <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white">
              ₹{video.price}
            </h2>
          </div>

          {/* Right Actions */}
          <div className="absolute right-4 bottom-40 flex flex-col items-center gap-6">
            <button
              onClick={() => toggleLike(video._id)}
              className="focus:outline-none"
            >
              <Heart
                size={32}
                className={`transition-all duration-300 ${
                  liked[video._id]
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-white hover:scale-110"
                }`}
              />
            </button>
            <button className="focus:outline-none">
              <MoreVertical
                size={28}
                className="text-white hover:text-gray-300 transition"
              />
            </button>
          </div>

          {/* Description + Button (Bottom Left) */}
          <div className="absolute bottom-10 left-6 flex flex-col items-start gap-2">
            <p className="text-white text-sm sm:text-base max-w-xs leading-snug">
              {video.description}
            </p>

            <Link
              to={`/food-partner/${video.foodPartner}`}
              className="group flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300"
            >
              Visit Store
              <ArrowRight
                className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300"
                size={18}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
