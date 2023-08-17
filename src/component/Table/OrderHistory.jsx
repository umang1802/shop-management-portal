import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";

function OrderHistory() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
   
    setIsModalOpen(true);
    console.log('Modal opened');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const fetchData = () => {
    axios
      .get("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/order/get-orders")
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
                                  <button className="px-4 py-2 text-center hover:cursor-pointer font-extralight" onClick={handleOpenModal}>View Order</button>
                                  <Modal visible={isModalOpen} onOk={handleCloseModal} onCancel={handleCloseModal}>
                                    <h2>Modal Content</h2>
                                    <p>This is the content of the modal.</p>
                                  </Modal>
                              </tr>
                          ))}
                  </tbody>  
              </table>
          </div>
      </div></>
  )
}

export default OrderHistory
