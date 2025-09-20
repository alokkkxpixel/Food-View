import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  ArrowLeft,
  Bookmark,
  Home as HomeIcon,
  BadgePlus,
  CirclePlus,
} from "lucide-react";
import axios from "axios";
import ShinyText from "../components/ShinyText";
import SwitchRolePopup from "./SwitchPop";
import VisitButton from "../components/VisitButton";
import FooterNav from "../components/FooterNav";
import Header from "../components/Header";
import VideoActions from "../components/VideoAction";
import { useVideoActions } from "../Hooks/useVideoActions";
// import { useUser } from "../context/UserContext";

const SavePage = () => {
  const [videos, setVideos] = useState([]);
  // const [liked, setLiked] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { liked, saved, toggleLike, toggleSave } = useVideoActions();
  // const { setUserData } = useUser();
  const [user, setUser] = useState({});
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const videoRefs = useRef([]);
  // const navigate = useNavigate();

  // Load saved videos from backend
  useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/food/savedfood",
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user), console.log(res.data);

        const savedFood = res.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          name: item.food.name,
          price: item.food.price,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
        }));
        setVideos(savedFood);

        if (res.data.length === 0) {
          console.log("No food founf");
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No food found"); // custom message
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSavedVideos();
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

  // // Toggle like
  // const toggleLike = (id) => {
  //   setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

  // Footer navigation
  // const [activeTab, setActiveTab] = useState("saved");
  // const handleNav = (tab) => {
  //   setActiveTab(tab);
  //   if (tab) navigate(`/${tab}`);
  // };

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {/* Header */}
      <Header user={user} header={"Saved Foods"} />

      {/* Feed */}
      {videos.length === 0 ? (
        <div className="h-screen flex flex-col items-center justify-center bg-black/90 text-white text-lg">
          <ShinyText
            text="No Saved Foods 🍕!"
            disabled={false}
            speed={2}
            className="text-2xl font-semibold "
          />
          <p className="text-gray-500 text-xs mt-3 text-center text-wrap max-w-sm">
            Looks like you haven’t saved any food yet. Save your favorite dishes
            to find them quickly later!
          </p>
        </div>
      ) : (
        videos.map((video, index) => (
          <div
            key={video._id}
            className="relative h-screen w-full flex items-center justify-center snap-start"
          >
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

            {/* Right Actions */}
            <div className="absolute right-4 bottom-40">
              <VideoActions
                video={video}
                isLiked={liked[video._id]}
                isSaved={saved[video._id]}
                onToggleLike={(vid) => toggleLike(vid, setVideos)}
                onToggleSave={(vid) => toggleSave(vid, setVideos)}
                showSave={false}
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
        ))
      )}

      {/* Footer Nav */}
      <FooterNav NavData="saved" />
      {/* Popup */}
      {/* <SwitchRolePopup
        role="foodPartner"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      /> */}
    </div>
  );
};

export default SavePage;
