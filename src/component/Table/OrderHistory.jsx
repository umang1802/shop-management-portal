import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { useLocation } from "react-router-dom";
import ModalCard from "../Card/ModalCard";

function OrderHistory() {
  const [data, setData] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateSearch, setDateSearch] = useState(""); // New state for date search
  const [selectedOrderData, setSelectedOrderData] = useState(null);

  const handleOpenModal = (orderId) => {
    const selectedData = sortedOrders.find((item) => item.order_id === orderId);
    setSelectedOrderId(orderId);
    setSelectedOrderData(selectedData);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };

  const location = useLocation();
  let type = "";
  type = location.pathname === "/bills" ? "normal" : "special";

  const fetchData = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_MICROSERVICE_URL+`api/order/get-orders?type=${type}`
      )
      .then((resp) => {
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    const sOrders = [...data].sort((a, b) => {
      return b.order_id - a.order_id;
    });
    setSortedOrders(sOrders);
  }, [data]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateSearchChange = (event) => {
    setDateSearch(event.target.value);
  };

  // Function to check if a date string contains the search query
  const dateContainsSearchQuery = (date, query) => {
    if (!date || !query) return false;
    const formattedDate = date.slice(0, 10); // Get the date part
    return formattedDate.includes(query);
  };

  // Filter orders based on search query and date search
  const filteredOrders = sortedOrders.filter((item) => {
    const orderNumberMatch =
      item.order_id && item.order_id.toString().includes(searchQuery);
    const mobileNumberMatch =
      item.mobile_number && item.mobile_number.includes(searchQuery);
    const dateMatch = dateContainsSearchQuery(item.order_date, dateSearch);
    return orderNumberMatch || mobileNumberMatch || dateMatch;
  });

  return (
    <>
      <div className="flex bg-white rounded-lg overflow-hidden shadow-xl mt-8 border">
        <div className="w-full">
          <div className="flex">
            <div className="p-4 w-1/2">
              <input
                type="text"
                placeholder="Search by Order Number or Mobile Number"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div className="p-4 w-1/4">
              <input
                type="date"
                value={dateSearch}
                onChange={handleDateSearchChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Order No.</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-center">{item.order_id}</td>
                  <td className="px-4 py-2 text-center">
                    {(item.order_date && item.order_date.slice(0, 10).split('-').reverse().join('/')) ||
                      "2023-01-01"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.customer_name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.mobile_number}
                  </td>
                  <td className="px-4 py-2 text-center">{item.total_amount}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="px-4 py-2 hover:cursor-pointer font-extralight"
                      onClick={() => handleOpenModal(item.order_id)}
                      style={{ display: "block", margin: "0 auto" }}
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={selectedOrderId !== null}
        onCancel={handleCloseModal}
        footer={null} 
        width={400} 
        maskClosable={true}
      >
        {selectedOrderData && (
          <ModalCard orderData={selectedOrderData} key={selectedOrderData.id} />
        )}
      </Modal>
    </>
  );
}

export default OrderHistory;
