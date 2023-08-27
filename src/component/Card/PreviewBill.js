import React, { useEffect, useState } from "react";

function PreviewBill({ productsForBill }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [customer_name, setCustomerName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");

  useEffect(() => {
    console.log("Preview Bill", productsForBill);

    // Calculate the total price
    const totalPrice = productsForBill.reduce(
      (acc, item) =>
        acc + Number(item.selectedProduct.price) * Number(item.quantity),
      0
    );
    setTotalPrice(totalPrice);
  }, [productsForBill]);

  const handlePrint = () => {
    // Add your logic to print the bill
    console.log("Printing the bill...", customer_name, mobile_number);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Preview Bill</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">
              <input
                type="text"
                className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-black-400"
                placeholder="Customer's Name"
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                className={`border rounded-full text-sm px-4 py-2 mx-2 w-5/6 ${
                  !/^[0-9]{10}$/.test(mobile_number)
                    ? "border-red-500"
                    : "border-blue-400"
                } ${
                  !/^[0-9]{10}$/.test(mobile_number)
                    ? "text-red-500"
                    : "text-blue-400"
                } placeholder:text-black-400`}
                placeholder="Mobile No."
                type="number"
                maxLength="10"
                pattern="[0-9]{10}"
                value={mobile_number}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </td>
          </tr>
          {productsForBill &&
            productsForBill.map((item) => (
              <tr key={item.selectedProduct.id}>
                <td className="flex items-center px-2 py-2 border border-gray-200 shadow-sm">
                  <div className="w-1/2 text-sm font-semibold text-gray-800">
                    {item.selectedProduct.product_name}
                  </div>
                  <div className="w-1/2 text-sm font-semibold text-gray-800">
                    {item.quantity} {item.selectedProduct.unit} {"  "}₹{" "}
                    {Number(item.selectedProduct.price) * Number(item.quantity)}
                  </div>
                </td>
              </tr>
            ))}
          <tr>
            <td className="flex items-center px-2 py-2 border border-gray-200 shadow-sm">
              <div className="w-1/2 text-sm font-semibold text-gray-800">
                Total
              </div>
              <div className="w-1/2 text-sm font-semibold text-gray-800">
                ₹ {totalPrice}
              </div>
            </td>
          </tr>
          <tr>
            <td className="flex justify-center py-4">
              <button
                className="rounded-full border-2 border-green-600 px-6 py-1 shadow-md  font-semibold bg-green-600 text-white m-2"
                type="submit"
                onClick={handlePrint}
              >
                {" "}
                Save & Print
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PreviewBill;
