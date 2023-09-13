import React, { useEffect, useState } from "react";

function PreviewBill({ productsForBill, removeProduct, resetBill, heading }) {
  const [total_amount, setTotalPrice] = useState(0);
  const [customer_name, setCustomerName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");

  useEffect(() => {
    const totalPrice = productsForBill.reduce(
      (acc, item) =>
        acc + Number(item.selectedProduct.price) * Number(item.quantity),
      0
    );
    setTotalPrice(totalPrice);
  }, [productsForBill]);

  const insertOrderInDatabase = async () => {
    try {
      // Make the POST request to add an order
      const resp = await axios.post(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/order/add-order",
        {
          customer_name,
          mobile_number,
          total_amount,
          type: "normal",
        }
      );

      // Check if the request was successful
      if (resp.status === 200) {
        // Now that the order is inserted, proceed with printing
        handlePrint();
        resetBill();
      } else {
        // Handle error if the request was not successful
        console.error("Error: Unable to add order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePrint = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(
      "<style> .print-container { height: auto; margin: auto; } </style>"
    );
    printWindow.document.write(
      '<div class="print-container" id="bill-content">'
    );

    // Get the rendered HTML content of the displayed bill
    const billContent = document.getElementById("bill-content").innerHTML;
    printWindow.document.write(billContent);
    // ... Sub Total, Tax, Grand Total rows

    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // Wait for images and stylesheets to load before calculating content height
    printWindow.onload = () => {
      const contentHeight = printWindow.document.body.scrollHeight;
      printWindow.document.querySelector(".print-container").style.height = `${
        contentHeight + 20
      }px`;
      printWindow.print();
    };

    // Reset customer details and productsForBill here, if needed
    setCustomerName("");
    setMobileNumber("");
    // setProductsForBill({});
  };

  // Call insertOrderInDatabase when you want to trigger the process

  return (
    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">{heading}</th>
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
                <td className="mt -2 flex items-center px-2 py-2 border border-gray-200 shadow-sm">
                  <div className="w-1/2 text-sm font-semibold text-gray-800">
                    {item.selectedProduct.product_name}
                  </div>
                  <div className="w-1/2 text-sm font-semibold text-gray-800">
                    {item.quantity} {item.selectedProduct.unit} {"  "}₹{" "}
                    {Number(item.selectedProduct.price) * Number(item.quantity)}
                  </div>
                  <button
                    className="remove-button ml-2 text-red-500"
                    onClick={() => removeProduct(item.selectedProduct.id)} // Call a function to remove the product
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td className="flex items-center px-2 py-2 border border-gray-200 shadow-sm">
              <div className="w-1/2 text-sm font-semibold text-gray-800">
                Total
              </div>
              <div className="w-1/2 text-sm font-semibold text-gray-800">
                ₹ {total_amount}
              </div>
            </td>
          </tr>
          <tr>
            <td className="flex justify-center py-4">
              <button
                className="rounded-full border-2 border-green-600 px-6 py-1 shadow-md  font-semibold bg-green-600 text-white m-2"
                type="submit"
                onClick={insertOrderInDatabase}
              >
                {" "}
                Save & Print
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="bill-content" className="hidden">
        <div>
          <img
            src={require("../../assets/images/bill-header.jpg")}
            height="250"
            width="500"
            alt="text"
          />
        </div>
        <label
          style={{
            fontSize: "20px",
            fontFamily: "sans-serif",
            marginLeft: "75px",
          }}
        >
          {customer_name} {mobile_number}{" "}
        </label>
        <table style={{ marginLeft: "50px" }}>
          <thead>
            <tr>
              <th
                style={{
                  fontSize: "20px",
                  padding: "2px",
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
              >
                Item
              </th>
              <th
                style={{
                  fontSize: "20px",
                  padding: "2px",
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  fontSize: "20px",
                  padding: "2px",
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
              >
                Rate (₹)
              </th>
              <th
                style={{
                  fontSize: "20px",
                  padding: "2px",
                  fontFamily: "sans-serif",
                  textAlign: "center",
                }}
              >
                Total (₹)
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
            {productsForBill.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  {item.selectedProduct.product_name}
                </td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "center" }}>
                  {item.selectedProduct.price}
                </td>
                <td style={{ textAlign: "center" }}>
                  {Number(item.quantity) * Number(item.selectedProduct.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          {/* <div className="total-row">
          <span>Sub Total:</span>
          <span>{calculateSubTotal()}</span>
        </div>
        <div className="total-row">
          <span>Tax (10%):</span>
          <span>{calculateTax()}</span>
        </div> */}
          <div
            className="total-row"
            style={{ marginTop: "10px", marginLeft: "100px" }}
          >
            <span style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
              Grand Total:
            </span>
            <span style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
              {total_amount}
            </span>
          </div>
          <div className="mt-4">
            <img
              src={require("../../assets/images/bill-footer.jpg")}
              height="250"
              width="500"
              alt="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBill;
