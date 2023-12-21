import axios from "axios";
import React, { useState } from "react";

function AddExpenseCard(props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleExpenseChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };
  const outlet_id = props.outlet_id;

  const handleAddExpense = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/expense/add-expense",
        {
          description,
          amount,
          outlet_id,
        }
      )
      .then((resp) => {
        alert("Expense Added Successfully");
        props.dataUpdated();
        setAmount("");
        setDescription("");
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };
  return (
    <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-lg m-4">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">{props.heading}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 flex flex-col items-center">
              <div className="text-blue-600">Expense Details</div>
              <input
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5 mt-2"
                type="text"
                value={description}
                onChange={handleExpenseChange}
              />
            </td>
          </tr>

          <tr>
            <td className="px-4 py-2 flex flex-col items-center">
              <div className="text-blue-600">Amount</div>
              <input
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5 mt-2"
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </td>
          </tr>
          <tr className="text-center">
            <button
              className="rounded-full border-2 border-green-600 px-6 py-1 shadow-md text-sm font-semibold bg-green-600 text-white m-4"
              type="submit"
              onClick={handleAddExpense}
            >
              Add
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddExpenseCard;
