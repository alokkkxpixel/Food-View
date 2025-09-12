import React, { useEffect, useRef } from "react";

const videos = [
  {
    id: 1,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "This is the first demo video showcasing food partner reels UI.",
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/zit5qnqze/d2a17015-f59e-487e-8c76-2cb9850b2727_xNGat2Dyc",
    description: "Another sample video for testing scroll snapping.",
  },
  {
    id: 3,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Third sample video to check snapping and overlay UI.",
  },
];

const Home = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null, // viewport
      threshold: 0.7, // at least 70% visible to trigger play
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

    // Observe each video
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="relative h-screen w-full flex items-center justify-center snap-start"
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.src}
            className="h-full w-full object-cover"
            playsInline
            loop
            muted
          />

          {/* Overlay Content */}
          <div className="absolute bottom-10 left-0 right-0 px-4 text-center">
            <p className="text-white text-sm sm:text-base line-clamp-2 mb-2">
              {video.description}
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Visit Store
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
