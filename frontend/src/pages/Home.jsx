import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  // Fetch videos once
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []); // ✅ only once

  // Observe videos whenever they change
  useEffect(() => {
    if (!videos.length) return;

    // Ensure refs length matches videos
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    const options = {
      root: null,
      threshold: 0.7, // at least 70% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]); // ✅ only videos dependency

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

          {/* Overlay Content */}
          <div className="absolute bottom-10 left-0 right-0 px-4 text-center">
            <p className="text-white text-sm sm:text-base line-clamp-2 mb-2">
              {video.description}
            </p>
            <Link
              to={video.foodPartner}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
