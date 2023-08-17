import React, { useState } from "react";
import Content from "../component/Content";
import ExpenseCard from "../component/Card/ExpenseCard";
import AddExpenseCard from "../component/Card/AddExpenseCard";
import ExpenseHistory from "../component/Table/ExpenseHistory";
import axios from "axios";
import { useEffect } from "react";

export default function Expense() {
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [heading, setHeading] = useState("Daily Expense");

  const initiateAddNewProduct = () => {
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(true);
    setShowInactiveProduct(false);
    setHeading("Edit Today's Expense");
  };

  const initiateAddNewCategory = () => {
    setShowProductTable(false);
    setShowAddCategory(true);
    setShowAddProduct(false);
    setShowInactiveProduct(false);
    setHeading("Expense History");
  };

  const backToShowProduct = () => {
    setShowProductTable(true);
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowInactiveProduct(false);
    setHeading("Daily Expense");
  };

  const initiateShowInactiveProduct = () => {
    setShowInactiveProduct(true);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
    // setHeading('Inactive Products');
  };
  const currentDate = new Date();
  const day = currentDate.getDate(); // Get the day of the month
  const monthIndex = currentDate.getMonth(); // Get the month index (0-11)
  const year = currentDate.getFullYear(); // Get the full year
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;

  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/outlet/get-outlets")
      .then((resp) => {
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dbDate = `${year}-${month}-${day}`;

  const [selectedOutlet, setSelectedOutlet] = useState(1);

  const [outeletData, setOutletData] = useState([]);

  const handleOutletChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOutlet(selectedOption);
  };
  useEffect(()=>{
    axios
      .post("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/expense/get-outlet-expense",{selectedOutlet,dbDate})
      .then((resp) => {
        setOutletData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  },[selectedOutlet])

  return (
    <>
      <Content
        heading={heading}
        button1Text="Edit Today's Expense"
        button2Text="Expense History"
        showInactiveProduct={showInactiveProduct}
        showAddCategory={showAddCategory}
        showAddProduct={showAddProduct}
        backToShowProduct={backToShowProduct}
        initiateAddNewCategory={initiateAddNewCategory}
        initiateAddNewProduct={initiateAddNewProduct}
        initiateShowInactiveProduct={initiateShowInactiveProduct}
        subHeading={
          <>
            {formattedDate}
            <select
              className="border-blue-500 m-2 p-2 border rounded"
              onChange={handleOutletChange}
            >
              {data &&
                data.map((item) => {
                  return (
                    <option key={item.outlet_id} value={item.outlet_id}>
                      {item.outlet_name}
                    </option>
                  );
                })}
            </select>
          </>
        }
      />
      {showProductTable && (
        <div className="flex flex-wrap justify-">
          <ExpenseCard firstHeading="Expense Details" secondHeading="Amount" data={outeletData}/>
          <AddExpenseCard heading="Add New Expense" outlet_id={selectedOutlet}/>
        </div>
      )}
      {showAddProduct && <></>}
      {showAddCategory && <ExpenseHistory />}
    </>
  );
}
