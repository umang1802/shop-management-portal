import React from "react";

function Card(props) {
  function limit(string = "", limit = 0) {
    return string.substring(0, limit);
  }

  return (
    props.orderData.type === "special" && (
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-25% bg-white rounded-2xl shadow-2xl m-4">
        <div className="flex p-4">
          <div>
            <h2 className="text-xl font-bold">
              {props.orderData && props.orderData.customer_name}
            </h2>
            <p className="text-sm font-bold">
              {props.orderData && props.orderData.mobile_number} |{" "}
              {props.orderData && props.orderData.customer_address}
            </p>
          </div>
        </div>
        <div className="flex justify-between px-4">
          <label className="justify-left">Delivery Date</label>
          <label className="justify-right">Delivery Time</label>
        </div>
        <div className="flex justify-between px-4">
          <label className="justify-left">
            {props.orderData && limit(props.orderData.delivery_date, 10)}
          </label>
          <label className="justify-right mr-8">
            {" "}
            {props.orderData && props.orderData.delivery_time}
          </label>
        </div>
        <div className="bg-gradient-to-b from-purple-800 via-pink-500 to-red-500 text-gray-100 p-4 mt-4 rounded-2xl">
          <div className="p-2">
            <p className="md:text-sm lg:text-lg font-semibold">Gulab Jamun</p>
            <label>50 Piece</label>{" "}
            <label className="text-sm ml-4">Khoya</label>
          </div>
          <div className=" p-2">
            <p className="md:text-sm lg:text-lg  font-semibold">Gulab Jamun</p>
            <label>50 Piece</label>{" "}
            <label className="text-sm ml-4">Khoya</label>
          </div>
          <div className=" p-2">
            <p className="md:text-sm lg:text-lg font-semibold">Gulab Jamun</p>
            <label>50 Piece</label>{" "}
            <label className="text-sm ml-4">Khoya</label>
          </div>
          <div className=" p-2">
            <p className="md:text-sm lg:text-lg  font-semibold">Gulab Jamun</p>
            <label>50 Piece</label>{" "}
            <label className="text-sm ml-4">Khoya</label>
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
              <label className="text-xs mb-2">
                Packing in the red box with the ribbon
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
