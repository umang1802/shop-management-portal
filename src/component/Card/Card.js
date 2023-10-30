import React, { useState, useEffect } from "react";
import axios from "axios";

function Card(props) {
  function limit(string = "", limit = 0) {
    return string.substring(0, limit);
  }
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);

  const handleOptionChange = (e) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
  };
  useEffect(() => {
    // Define your API URL here
    const apiUrl = "https://example.com/api"; // Replace with your API URL

    // Make an API call when the selected option changes
    axios
      .get(apiUrl, { params: { status: selectedOption } })
      .then((response) => {
        // Handle the API response here
        setData(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, [selectedOption]);

  return (
    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-25% bg-white rounded-2xl shadow-2xl m-4">
      <div className="flex p-4">
        <div>
          <h2 className="text-xl font-bold">
            {props.orderData && props.orderData.customer_name}
          </h2>
          <p className="text-sm font-bold">
            {props.orderData && props.orderData.mobile_number}{" "}
            <span className="capitalize">
              {props.orderData && props.orderData.customer_address}{" "}
            </span>
          </p>
        </div>
        <div className="ml-auto">
          <select
            className="w-full px-2 py-1 border rounded text-sm text-green-700 focus:outline-none focus:ring focus:border-blue-300"
            value={props.orderData && props.orderData.status}
            onChange={handleOptionChange}
          >
            {props.orderData && props.orderData.status === "completed" ? (
              <option value="completed">Completed</option>
            ) : (
              <>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </>
            )}
          </select>
        </div>
      </div>
      <div className="flex justify-between px-4">
        <label className="justify-left">Delivery Date</label>
        <label className="justify-right">Delivery Time</label>
      </div>
      <div className="flex justify-between px-4">
        <label className="justify-left">
          {props.orderData && limit(props.orderData.delivery_date, 10)} |{""}
        </label>
        <label className="justify-right mr-8">
          {" "}
          {props.orderData && props.orderData.delivery_time} | {""}
        </label>
      </div>
      <div className="bg-gradient-to-b from-purple-800 via-pink-500 to-red-500 text-gray-100 p-4 mt-4 rounded-2xl">
        {props.orderData &&
          props.orderData.order_items &&
          props.orderData.order_items.map((orderItem) => {
            return (
              <div className="p-2">
                <p className="md:text-sm lg:text-lg font-semibold">
                  {orderItem && orderItem.product_name}
                </p>
                <label>
                  {orderItem && orderItem.quantity}{" "}
                  {orderItem && orderItem.product_unit}
                </label>{" "}
                <label className="text-sm ml-4">
                  {orderItem && orderItem.category_name}
                </label>
              </div>
            );
          })}
        <div className="bg-white rounded-2xl text-black text-sm mt-8">
          <div className="flex flex-col items-center">
            <p className="text-center">
              Total Amount : {props.orderData.total_amount}
            </p>
            <p className="text-center">
              Advance : {props.orderData.advance_amount}
            </p>
            <p className="text-center">Discount : {props.orderData.discount}</p>
            <p className="text-center">
              Pending Amount : {props.orderData.pending_amount}
            </p>
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
  );
}

export default Card;
