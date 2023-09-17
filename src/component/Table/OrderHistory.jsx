import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { useLocation } from "react-router-dom";

function OrderHistory() {
  const [data, setData] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [sortedOrders, setSortedOrders] = useState([]);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };

  const location = useLocation();
  let type = '';
  type = location.pathname === "/bills" ? "normal" : "special"; // Updated the condition

  const fetchData = () => {
    axios
      .get(
        `http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/order/get-orders?type=${type}`
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
  }, [type]); // Refetch data when type changes

  useEffect(() => {
    const sOrders = [...data].sort((a, b) => {
      // Compare order IDs in descending order
      return b.order_id - a.order_id;
    });
    setSortedOrders(sOrders);
  }, [data]);

  return (
    <>
      <div className="flex bg-white rounded-lg overflow-hidden shadow-xl mt-8 border">
        <div className="w-full">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Order No.</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-center">{item.order_id}</td>
                  <td className="px-4 py-2 text-center">
                    {item.customer_name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.mobile_number}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.total_amount}
                  </td>
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
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <h2>Modal Content</h2>
        <p>This is the content of the modal for order ID {selectedOrderId}</p>
      </Modal>
    </>
  );
}

export default OrderHistory;
