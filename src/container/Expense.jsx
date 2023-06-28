import React, { useState } from "react";
import Content from "../component/Content";
import ExpenseCard from "../component/Card/ExpenseCard";
import AddExpenseCard from "../component/Card/AddExpenseCard";
import ExpenseHistory from "../component/Table/ExpenseHistory";

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

  // Define an array of month names
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Format the date in "dd-mmm-yyyy" format
  const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;


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
        subHeading={formattedDate}
      />
      {showProductTable && (
        <div className="flex flex-wrap justify-">
          <ExpenseCard firstHeading="Expense Details" secondHeading="Amount"/>
          <AddExpenseCard heading="Add New Expense"/>
          
        </div>
      )}
      {showAddProduct && <></>}
      {showAddCategory && <ExpenseHistory/>}
    </>
  );
}
