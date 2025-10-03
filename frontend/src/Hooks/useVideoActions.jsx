import { useState, useCallback } from "react";
import axios from "axios";

export function useVideoActions(initialLiked = {}, initialSaved = {}) {
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(initialSaved);

  // Toggle Like
  const toggleLike = useCallback(async (video, setVideos) => {
    try {
      const res = await axios.post(
        "https://food-view-ystf.onrender.com/api/food/like",
        { foodId: video._id },
        { withCredentials: true }
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === video._id
            ? {
                ...v,
                likeCount: res.data.like
                  ? (v.likeCount || 0) + 1
                  : (v.likeCount || 1) - 1,
              }
            : v
        )
      );
      setLiked((prev) => ({ ...prev, [video._id]: res.data.like }));
    } catch (err) {
      console.error("Error liking:", err);
    }
  }, []);

  // Toggle Save
  const toggleSave = useCallback(async (video, setVideos) => {
    try {
      const res = await axios.post(
        "https://food-view-ystf.onrender.com/api/food/save",
        { foodId: video._id },
        { withCredentials: true }
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === video._id
            ? {
                ...v,
                savesCount: res.data.saved
                  ? (v.savesCount || 0) + 1
                  : (v.savesCount || 1) - 1,
              }
            : v
        )
      );
      setSaved((prev) => ({ ...prev, [video._id]: res.data.saved }));
    } catch (err) {
      console.error("Error saving:", err);
    }
  }, []);

  return { liked, saved, toggleLike, toggleSave };
}
