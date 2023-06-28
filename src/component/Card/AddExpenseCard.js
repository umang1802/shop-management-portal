import React, {useState}from "react";

function AddExpenseCard(props) {
    const [expense, setExpense] = useState('');
    const [amount, setAmount] = useState('');

    const handleExpenseChange = (event) => {
        setExpense(event.target.value);
      };

      const handleAmountChange = (event) => {
        setAmount(event.target.value);
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
                value={expense}
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
                type="submit">
                Save
              </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddExpenseCard;
