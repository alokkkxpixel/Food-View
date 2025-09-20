import React, { useEffect, useRef, useState } from "react";
import { Heart, Bookmark, ArrowRight } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterNav from "./FooterNav";
import SwitchRolePopup from "../pages/SwitchPop";
import ProfileMenu from "../pages/ProfileMenu";

const VideoFeed = ({
  endpoint,
  headerLeft, // let parent override left side of header
  showSave = true,
  allowLike = true,
  activeTab,
}) => {
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const videoRefs = useRef([]);

  // fetch feed + user if included
  useEffect(() => {
    axios
      .get(endpoint, { withCredentials: true })
      .then((res) => {
        setVideos(res.data.foodItems || res.data.savedFoods || []);
        if (res.data.user) setUser(res.data.user); // ✅ capture user
      })
      .catch((err) => console.error("Error fetching:", err));
  }, [endpoint]);

  // play/pause observer…
  useEffect(() => {
    if (!videos.length) return;
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) v.play();
          else v.pause();
        });
      },
      { threshold: 0.7 }
    );
    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => videoRefs.current.forEach((v) => v && observer.unobserve(v));
  }, [videos]);

  // like + save handlers omitted for brevity…
  // Toggle Like + Update Backend
  const toggleLike = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      if (response.data.like) {
        // Video liked
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
          )
        );
        setLiked((prev) => ({ ...prev, [item._id]: true }));
      } else {
        // Video unliked
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: (v.likeCount || 1) - 1 } : v
          )
        );
        setLiked((prev) => ({ ...prev, [item._id]: false }));
      }
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  // Toggle Save + Update Backend
  // Frontend toggleSave function without localStorage
  const toggleSave = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      console.log(response.data);

      if (response.data.saved) {
        // Video saved
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: (v.savesCount || 0) + 1 }
              : v
          )
        );
        setSaved((prev) => ({ ...prev, [item._id]: true }));
      } else {
        // Video unsaved
        setVideos((prev) =>
          prev.map((v) =>
            v._id === item._id
              ? { ...v, savesCount: (v.savesCount || 1) - 1 }
              : v
          )
        );
        setSaved((prev) => ({ ...prev, [item._id]: false }));
      }
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 backdrop-blur bg-black/20 z-50">
        {/* Left slot provided by parent */}
        <div className="flex items-center">{headerLeft}</div>
        {/* Right = ProfileMenu with user data */}
        {user && <ProfileMenu user={user} />}
      </div>

      {/* Feed */}
      {videos.map((v, i) => (
        <div key={v._id} className="relative h-screen w-full flex snap-start">
          <video
            ref={(el) => (videoRefs.current[i] = el)}
            src={v.video}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
          <div className="absolute bottom-24 left-4">
            <h2 className="font-bold text-xl text-white">{v.name}</h2>
            <p className="text-white text-sm max-w-xs">{v.description}</p>
            <Link
              to={`/food-partner/${v.foodPartner}`}
              className="inline-flex mt-2 bg-red-500 px-3 py-1 rounded-full text-white"
            >
              Visit Store <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          <div className="absolute right-4 bottom-40 flex flex-col gap-4">
            {allowLike && (
              <button onClick={() => toggleLike(v)}>
                <Heart
                  size={32}
                  className={
                    liked[v._id] ? "fill-red-500 text-red-500" : "text-white"
                  }
                />
                <p className="text-white">{v.likeCount || 0}</p>
              </button>
            )}
            {showSave && (
              <button onClick={() => toggleSave(v)}>
                <Bookmark
                  size={32}
                  className={
                    saved[v._id] ? "fill-white text-white" : "text-white"
                  }
                />
                <p className="text-white">{v.savesCount || 0}</p>
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Footer */}
      <FooterNav
        activeTab={activeTab}
        onOpenPopup={() => setIsPopupOpen(true)}
      />

      {/* Popup */}
      <SwitchRolePopup
        role="foodPartner"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default React.memo(VideoFeed);
