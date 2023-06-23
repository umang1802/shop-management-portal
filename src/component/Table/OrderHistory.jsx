import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderHistory() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get("https://shop-service-fo3n.onrender.com/api/order/get-orders")
      .then((resp) => {
        console.log("rowsss---->", resp.data.rows);
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <><div className="flex justify-center bg-white rounded-lg overflow-hidden shadow-xl mt-8 border">
          <div className="w-full">
              <table className="table-auto w-full">
                  <thead className="bg-gray-100">
                      <tr>
                          <th className="px-4 py-2">Order No.</th>
                          <th className="px-4 py-2">Order Delivery Date</th>
                          <th className="px-4 py-2">Customer Name</th>
                          <th className="px-4 py-2">Mobile</th>
                          <th className="px-4 py-2">Address</th>
                          <th className="px-4 py-2">Amount</th>
                          <th className="px-4 py-2">View</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data &&
                          data.map((item) => (
                              <tr key={item.id}>
                                  <td className="px-4 py-2 text-center">{item.order_id}</td>
                                  <td className="px-4 py-2 text-center">{item.delivery_date}</td>
                                  <td className="px-4 py-2 text-center">{item.customer_name}</td>
                                  <td className="px-4 py-2 text-center">{item.mobile_number}</td>
                                  <td className="px-4 py-2 text-center">{item.customer_address}</td>
                                  <td className="px-4 py-2 text-center">{item.total_amount}</td>
                                  <td className="px-4 py-2 text-center hover:cursor-pointer font-extralight">View Order</td>
                              </tr>
                          ))}
                  </tbody>
              </table>
          </div>
      </div></>
  )
}

export default OrderHistory
