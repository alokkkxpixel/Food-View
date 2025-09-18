import React, { useState } from "react";
import { Upload, Trash2, RefreshCcw, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setVideoFile(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    // Handle drag and drop
    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        setVideoFile(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    const handleDragOver = (e) => e.preventDefault();

    // Remove video
    const handleDeleteVideo = () => {
      setVideoFile(null);
      setPreview(null);
    };

    // Change video (trigger file input)
    const handleChangeVideo = () => {
      document.getElementById("videoUpload").click();
    };

    // Submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("video", videoFile);

      const response = await axios.post(
        "http://localhost:3000/api/food/",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Form Submitted:", response.data);

      // Fake delay for loading state
      setTimeout(() => {
        setIsSubmitting(false);
        // alert("Food Item Created ✅");
        handleDeleteVideo();
        setName("");
        setDescription("");
        setPrice("");
      }, 2000);

      navigate("/goto");
    };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 text-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Create Food Item</h2>

        {/* Video Upload Section */}
        <div
          className="border-2 border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="videoUpload"
          />

          {!preview ? (
            <label
              htmlFor="videoUpload"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Upload className="w-10 h-10 text-gray-400" />
              <p className="text-gray-400 text-sm">
                Drag & drop your video here or{" "}
                <span className="text-red-400">browse</span>
              </p>
            </label>
          ) : (
            <div className="w-full relative space-y-2">
              {/* Video Preview */}
              <video
                src={preview}
                controls
                className="rounded-xl w-full h-60 object-cover"
              />

              {/* File info */}
              <div className="flex justify-between text-sm text-gray-400 px-1">
                <span>{videoFile?.name}</span>
                <span>{(videoFile?.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleChangeVideo}
                  className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition"
                >
                  <RefreshCcw className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={handleDeleteVideo}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Food Name */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food name"
            className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
            rows="3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-lg font-semibold flex justify-center items-center disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Food"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
