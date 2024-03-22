import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import ModalCard from "../Card/ModalCard";

function ExpenseHistory() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedOrders, setSortedOrders] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const fetchData = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/expense/get-all-outlet-expense'
      )
      .then((resp) => {
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const transformData = (expenses) => {
    const transformedData = {};

    // Loop through the expenses and group them based on expense_date and outlet_id
    expenses.forEach((expense) => {
      const { expense_date, outlet_id, total_amount } = expense;

      if (!transformedData[expense_date]) {
        transformedData[expense_date] = {};
      }

      const outletAmountKey = `Outlet_${outlet_id}_Amount`;
      transformedData[expense_date][outletAmountKey] = parseFloat(total_amount);

      if (!transformedData[expense_date]["Total_Expense"]) {
        transformedData[expense_date]["Total_Expense"] = 0;
      }

      transformedData[expense_date]["Total_Expense"] +=
        parseFloat(total_amount);
    });

    // Convert the object into an array
    const transformedArray = Object.entries(transformedData).map(
      ([date, amounts]) => ({
        Expense_Date: date,
        ...amounts,
      })
    );
    return transformedArray;
  };

  // Call the function to transform the expenses data
  const transformedExpenses = transformData(sortedOrders);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sOrders = [...data].sort((a, b) => {
      return b.expense_id - a.expense_id;
    });
    setSortedOrders(sOrders);
  }, [data]);
  return (
    <>
      <div className="flex justify-center bg-white rounded-lg overflow-hidden shadow-xl mt-8 border">
        <div className="w-full">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Expense Date</th>
                <th className="px-4 py-2">Sisendi Bazaar</th>
                <th className="px-4 py-2">Sisendi ByPass</th>
                <th className="px-4 py-2">Total Expense</th>
              </tr>
            </thead>
            <tbody>
              {transformedExpenses &&
                transformedExpenses.map((item) => (
                  <tr>
                    <td className="px-4 py-2 text-center">
                      {new Date(item.Expense_Date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => handleOpenModal()}>
                        {item.Outlet_1_Amount ? item.Outlet_1_Amount : 0}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => handleOpenModal()}>
                        {item.Outlet_2_Amount ? item.Outlet_2_Amount : 0}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.Total_Expense}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={400}
        maskClosable={true}
      >
          {/* <ModalCard/> */}
      </Modal>
    </>
  );
}

export default ExpenseHistory;
