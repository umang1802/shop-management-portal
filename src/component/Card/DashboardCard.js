import React from "react";

function DashboardCard({heading, data}) {

  return (
    <div className="w-full sm:w-1/3 md:w-1/5 bg-white rounded-2xl shadow-2xl m-4">
    <div className="bg-gradient-to-b from-purple-800 via-pink-500 to-red-500 text-gray-100 p-4 mt-4 rounded-2xl flex flex-col h-full">
      <div className="p-2 flex-grow">
        <p className="md:text-sm lg:text-lg font-semibold">{heading}</p>
        <label className="text-lg">{data}</label>
      </div>
    </div>
  </div>
  
    )
}

export default DashboardCard;
