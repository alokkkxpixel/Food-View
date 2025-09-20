import { Heart, Bookmark } from "lucide-react";

export default function VideoActions({
  video,
  isLiked,
  isSaved,
  onToggleLike,
  onToggleSave,
  showSave = true, // allow removing save button in Saved page
  allowLike = true, // allow disabling like if needed
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      {allowLike && (
        <button onClick={() => onToggleLike(video)}>
          <Heart
            size={35}
            className={`transition-all bg-gray-300/10 backdrop-blur-md p-1 rounded-full duration-300 ${
              isLiked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-white hover:scale-110"
            }`}
          />
          <h2 className="mt-1 text-white text-sm">{video.likeCount || 0}</h2>
        </button>
      )}

      {showSave && (
        <button onClick={() => onToggleSave(video)}>
          <Bookmark
            size={32}
            className={`transition-all bg-gray-300/10 backdrop-blur-md p-1 rounded-full duration-300 ${
              isSaved
                ? "fill-white text-white scale-110"
                : "text-white hover:scale-110"
            }`}
          />
          <h2 className="mt-1 text-white text-sm">{video.savesCount || 0}</h2>
        </button>
      )}
    </div>
  );
}
