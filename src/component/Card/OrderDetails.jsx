import React from "react";

function OrderDetails({ orderData, setOrderData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({
          ...orderData,
          [name]: value,
        });
      };
  return (
    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Order Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">
              <input
                type="text"
                name="customer_name"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Customer's Name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="customer_address"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Address"
                onChange={handleChange}
              />
              <input
                type="tel"
                name="mobile_number"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Mobile"
                onChange={handleChange}
              />
              <input
                type="date"
                name="delivery_date"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Delivery Date"
                onChange={handleChange}
              />
               <input
                type="time"
                name="delivery_time"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Delivery Time"
                onChange={handleChange}
              />
              <input
                type="number"
                name="advance_amount"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Advance Amount"
                onChange={handleChange}
              />
              <input
                type="number"
                name="discount"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Discount"
                onChange={handleChange}
              />
              <textarea
                cols="40" rows="5"
                name="note"
                className="border rounded-2xl text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Note"
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
