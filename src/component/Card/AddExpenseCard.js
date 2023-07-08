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
    console.log(description, amount);
    axios
      .post("https://shop-service-fo3n.onrender.com/api/expense/add-expense", {
        description,
        amount,
        outlet_id,
      })
      .then((resp) => {
        console.log("Success");
        setAmount('');
        setDescription('');
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
            <td className="px-4 py-2">
              <div className="text-blue-600">Expense Details</div>
              <input
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5 mt-2 ml-4"
                type="text"
                value={description}
                onChange={handleExpenseChange}
              />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              <div className="text-blue-600">Amount</div>
              <input
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5 mt-2 ml-4"
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
              Save
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddExpenseCard;
