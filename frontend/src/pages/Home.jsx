import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const [videos, setVideos] = useState([]);
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

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
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

          {/* Bottom Gradient Overlay (dark only at bottom) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Dish Name - Top Left */}
          <div className="absolute top-6  left-3">
            <h2 className="text-xl  flex  items-center gap-2 sm:text-2xl font-bold text-white whitespace-normal drop-shadow-lg">
              <span className="w-[5px] h-[5px] bg-red-500 p-1 rounded-full block"></span>{" "}
              {video.name}
            </h2>
          </div>
          <div className="absolute top-10 mt-5 left-3">
            <h2 className="text-xl  flex  items-center gap-2 sm:text-2xl font-bold text-white whitespace-normal drop-shadow-lg">
              {`₹${video.price}`}
            </h2>
          </div>

          {/* Bottom Left Content (Description + Button) */}
          <div className="absolute bottom-10 left-6 flex flex-col items-start gap-2">
            <p className="text-white text-sm sm:text-base max-w-xs drop-shadow-md leading-snug">
              {video.description}
            </p>

            {/* Visit Store Button with Hover Arrow */}
            <Link
              to={`/food-partner/${video.foodPartner}`}
              className="group flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300"
            >
              Visit Store
              <ArrowRight className="  transition-all duration-300" size={18} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
