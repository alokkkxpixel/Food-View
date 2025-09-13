import React from "react";

const FoodPartnerPage = () => {
  const foodPartner = {
    name: "Business Name",
    address: "123 Food Street, City",
    totalMeals: 43,
    customersServed: "15K",
    videos: [
      "video1.mp4",
      "video2.mp4",
      "video3.mp4",
      "video4.mp4",
      "video5.mp4",
      "video6.mp4",
      "video7.mp4",
      "video8.mp4",
      "video9.mp4",
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 border-b border-gray-800">
        {/* Profile Pic */}
        <div className="w-24 h-24 rounded-full bg-gray-700"></div>

        {/* Name + Address */}
        <h2 className="mt-3 text-xl font-semibold">{foodPartner.name}</h2>
        <p className="text-sm text-gray-400">{foodPartner.address}</p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold">{foodPartner.totalMeals}</p>
            <p className="text-sm text-gray-400">Meals</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{foodPartner.customersServed}</p>
            <p className="text-sm text-gray-400">Customers</p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-1 mt-2">
        {foodPartner.videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-800 h-40 flex items-center justify-center text-sm"
          >
            video
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPartnerPage;
