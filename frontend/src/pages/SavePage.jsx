import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ArrowLeft,
  Bookmark,
  Home as HomeIcon,
} from "lucide-react";

const SavePage = () => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const [showHeader, setShowHeader] = useState(true);

  const lastScrollY = useRef(0);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  // Load saved videos from localStorage
  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setVideos(savedVideos);
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
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle like
  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Footer navigation
  const [activeTab, setActiveTab] = useState("saved");
  const handleNav = (tab) => {
    setActiveTab(tab);
    if (tab === "home") navigate("/home");
  };

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-center px-4 py-3 transition-transform duration-300 z-50 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link to="/" className="absolute left-4 text-white">
          <ArrowLeft size={26} />
        </Link>
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
          <Bookmark size={24} /> Saved Reels
        </h1>
      </div>

      {/* Feed */}
      {videos.length === 0 ? (
        <div className="h-screen flex items-center justify-center text-white text-lg">
          No saved reels yet.
        </div>
      ) : (
        videos.map((video, index) => (
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

            {/* Dish Name */}
            <div className="absolute top-15 left-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {video.name}
              </h2>
              <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white">
                ₹{video.price}
              </h2>
            </div>

            {/* Right Actions */}
            <div className="absolute right-4 bottom-45 flex flex-col items-center gap-6">
              {/* Like */}
              <button onClick={() => toggleLike(video._id)}>
                <Heart
                  size={35}
                  className={`transition-all bg-gray-300/10 backdrop-blur-md p-1 rounded-full duration-300 ${
                    liked[video._id]
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-white hover:scale-110"
                  }`}
                />
                <h2 className="mt-1 text-white text-sm">
                  {liked[video._id] ? "1" : "0"}
                </h2>
              </button>
            </div>

            {/* Description + Button */}
            <div className="absolute bottom-20 left-6 flex flex-col items-start gap-2">
              <p className="text-white text-wrap text-sm sm:text-base max-w-xs leading-snug">
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
        ))
      )}

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 bg-black/10 backdrop-blur-sm border-t border-white/20 z-50">
        <button
          onClick={() => handleNav("home")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "home" ? "text-red-500" : "text-white"
          }`}
        >
          <HomeIcon size={23} />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav("saved")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "saved" ? "text-red-500" : "text-white"
          }`}
        >
          <Bookmark size={23} />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );
};

export default SavePage;
