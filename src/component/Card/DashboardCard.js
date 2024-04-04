import React from "react";

function DashboardCard({ heading, subHeading, data, isButtonPresent = false, image }) {
  return (
    <div className="w-full sm:w-1/3 md:w-1/5 bg-white rounded-2xl shadow-2xl m-4">
      <div className="bg-gradient-to-b from-purple-800 via-pink-500 to-red-500 text-gray-100 p-4 mt-4 rounded-2xl flex flex-col h-full">
        <div className="px-2 flex-grow">
          <div className="flex justify-between">
            {" "}
            <span className="md:text-sm lg:text-lg font-semibold capitalize">
              {heading}
            </span>
            <span className="capitalize">{subHeading}</span>
          </div>
         {image &&  <div className="flex">
            <img className="border-white border-2 rounded" src={image} alt="Product "/>
          </div>}
          <div className="text-center">
            <label className="text-lg">{data}</label>
          </div>
          {isButtonPresent && (
            <div>
              <button
                className="rounded-full border-2 border-white-600 px-6 py-1 shadow-md text-sm font-semibold bg-white text-black m-4"
                type="submit"
              >
                Completed Add to Stock
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
