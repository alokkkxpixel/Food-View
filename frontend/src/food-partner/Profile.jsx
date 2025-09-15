import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [id]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 border-b border-gray-800">
        {/* Profile Pic */}
        <div className="w-24 h-24  rounded-full bg-gray-700 overflow-hidden">
          <img
            className="w-full h-full object-center object-cover "
            src="https://images.unsplash.com/photo-1548534988-7c20f8a8a783?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        {/* Name + Address */}
        <h2 className="my-3 text-xl font-semibold">{profile.name}</h2>
        <p className="text-sm px-2 text-center text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
          exercitationem amet nostrum, at error eius. Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Sequi, quaerat?
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold">{profile.totalMeals || 0}</p>
            <p className="text-sm text-gray-400">Meals</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{profile.customers || 0}</p>
            <p className="text-sm text-gray-400">Customers</p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-1 mt-2">
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div
              key={index}
              className="bg-gray-800 h-40 flex items-center justify-center"
            >
              <video
                src={video.video}
                className="w-full h-full object-cover"
                // controls
                muted
              />
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400 py-6">
            No videos available
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
