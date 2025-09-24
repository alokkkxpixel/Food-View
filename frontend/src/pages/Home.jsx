import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  MoreVertical,
  ArrowLeft,
  Utensils,
  Bookmark,
  Home as HomeIcon,
  BadgePlus,
  CirclePlus,
  Store,
} from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import SwitchRolePopup from "./SwitchPop";
import ShinyText from "../components/ShinyText";
import ThemeToggle from "../components/ThemeToggle";
import VisitButton from "../components/VisitButton";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import FooterNav from "../components/FooterNav";
import VideoActions from "../components/VideoAction";
import { useVideoActions } from "../Hooks/useVideoActions";

const Home = () => {
  const [videos, setVideos] = useState([]);
  // const [liked, setLiked] = useState({});
  // const [saved, setSaved] = useState({});
  const { liked, saved, toggleLike, toggleSave } = useVideoActions();
  // const [user, setUser] = useState({});
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState({});
  const videoRefs = useRef([]);
  // const navigate = useNavigate();
  const { setUserData } = useUser();
  // Fetch videos
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
        setUser(response.data.user);
        setUserData(response.data.user);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, [setUserData]);

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

  // // Toggle Like + Update Backend
  // const toggleLike = async (item) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/food/like",
  //       { foodId: item._id },
  //       { withCredentials: true }
  //     );

  //     if (response.data.like) {
  //       // Video liked
  //       setVideos((prev) =>
  //         prev.map((v) =>
  //           v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
  //         )
  //       );
  //       setLiked((prev) => ({ ...prev, [item._id]: true }));
  //     } else {
  //       // Video unliked
  //       setVideos((prev) =>
  //         prev.map((v) =>
  //           v._id === item._id ? { ...v, likeCount: (v.likeCount || 1) - 1 } : v
  //         )
  //       );
  //       setLiked((prev) => ({ ...prev, [item._id]: false }));
  //     }
  //   } catch (err) {
  //     console.error("Error liking video:", err);
  //   }
  // };

  // // Toggle Save + Update Backend
  // // Frontend toggleSave function without localStorage
  // const toggleSave = async (item) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/food/save",
  //       { foodId: item._id },
  //       { withCredentials: true }
  //     );

  //     console.log(response.data);

  //     if (response.data.saved) {
  //       // Video saved
  //       setVideos((prev) =>
  //         prev.map((v) =>
  //           v._id === item._id
  //             ? { ...v, savesCount: (v.savesCount || 0) + 1 }
  //             : v
  //         )
  //       );
  //       setSaved((prev) => ({ ...prev, [item._id]: true }));
  //     } else {
  //       // Video unsaved
  //       setVideos((prev) =>
  //         prev.map((v) =>
  //           v._id === item._id
  //             ? { ...v, savesCount: (v.savesCount || 1) - 1 }
  //             : v
  //         )
  //       );
  //       setSaved((prev) => ({ ...prev, [item._id]: false }));
  //     }
  //   } catch (err) {
  //     console.error("Error saving video:", err);
  //   }
  // };

  // Footer navigation
  // const [activeTab, setActiveTab] = useState("home");
  // const handleNav = (tab) => {
  //   setActiveTab(tab);
  //   if (tab) navigate(`/${tab}`);
  // };

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* Header */}
      <Header header={"FoodieHub"} user={user} />

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
          <div className="absolute top-15 left-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-[6px] h-[6px] bg-red-500 p-1 rounded-full"></span>
              {video.name}
            </h2>
            <h2 className="mt-2 text-lg sm:text-xl font-semibold text-white">
              ₹{video.price}
            </h2>
          </div>

          {/* Right Actions */}
          <div className="absolute right-4 bottom-40">
            <VideoActions
              video={video}
              isLiked={liked[video._id]}
              isSaved={saved[video._id]}
              onToggleLike={(vid) => toggleLike(vid, setVideos)}
              onToggleSave={(vid) => toggleSave(vid, setVideos)}
              showSave={true}
              allowLike={true}
            />
          </div>

          {/* Description + Button */}
          <div className="absolute bottom-20 left-6 flex flex-col items-start gap-2">
            <p className="text-white text-wrap text-sm sm:text-base max-w-xs leading-snug">
              {video.description}
            </p>
            <Link to={`/food-partner/${video.foodPartner}`}>
              <VisitButton />
            </Link>
          </div>
        </div>
      ))}

      {/* Footer Nav */}
      <FooterNav NavData="home" />

      {/* Popup */}
      {/* <SwitchRolePopup
        role="foodPartner"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(sfalse)}
      /> */}
    </div>
  );
};

export default Home;
