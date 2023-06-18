import React from "react";

function Card() {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-25% bg-white rounded-2xl shadow-lg m-4">
      <div className="flex p-4">
        <div>
          <h2 className="text-xl font-bold">Nitin Gupta</h2>
          <p className="text-sm font-bold">1234567890 | Lucknow</p>
        </div>
      </div>
      <div className="flex justify-between px-4">
        <label className="justify-left">Delivery Date</label>
        <label className="justify-right">Delivery Time</label>
      </div>
      <div className="flex justify-between px-4">
        <label className="justify-left">02-Mar-2024</label>
        <label className="justify-right mr-8"> 12:15 PM</label>
      </div>
      <div className="bg-gradient-to-r from-purple-800 via-pink-500 to-red-500 text-gray-100 p-4 mt-4 rounded-2xl">
        <div className="p-2">
          <p className="md:text-sm lg:text-lg font-semibold">Gulab Jamun</p>
          <label>50 Piece</label> <label className="text-sm ml-4">Khoya</label>
        </div>
        <div className=" p-2">
          <p className="md:text-sm lg:text-lg  font-semibold">Gulab Jamun</p>
          <label>50 Piece</label> <label className="text-sm ml-4">Khoya</label>
        </div>
        <div className=" p-2">
          <p className="md:text-sm lg:text-lg font-semibold">Gulab Jamun</p>
          <label>50 Piece</label> <label className="text-sm ml-4">Khoya</label>
        </div>
        <div className=" p-2">
          <p className="md:text-sm lg:text-lg  font-semibold">Gulab Jamun</p>
          <label>50 Piece</label> <label className="text-sm ml-4">Khoya</label>
        </div>
        <div className="bg-white rounded-2xl text-black text-sm mt-8">
          <div className="flex flex-col items-center">
            <p className="text-center">Total Amount :</p>
            <p className="text-center">Advance :</p>
            <p className="text-center">Discount :</p>
            <p className="text-center">Pending Amount :</p>
          </div>
          <hr className="mt-4 mx-4" />
          <div className="flex justify-center">
            <label className="font-bold">Note</label>
          </div>
          <div className="flex justify-center">
            <label className="text-xs mb-2">Packing in the red box with the ribbon</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
