import React, { useState } from "react";
import Content from "../component/Content";
import ExpenseCard from "../component/Card/ExpenseCard";
import AddExpenseCard from "../component/Card/AddExpenseCard";
import ExpenseHistory from "../component/Table/ExpenseHistory";
import axios from "axios";
import { useEffect } from "react";
import { getDate } from "../util/getDate";
import AddEmployeeExpenseCard from '../component/Card/AddEmployeeExpenseCard'

export default function Expense() {
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [heading, setHeading] = useState("Daily Expense");
  const [isCategoryAdded, setCategoryAdded] = useState(false);

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

  const [formattedDate, day, month, year] = getDate();

  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/outlet/get-outlets"
      )
      .then((resp) => {
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isCategoryAdded]);

  const dbDate = `${year}-${month}-${day}`;

  const [selectedOutlet, setSelectedOutlet] = useState(1);

  const [outeletData, setOutletData] = useState([]);

  const handleOutletChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOutlet(selectedOption);
  };
  useEffect(() => {
    axios
      .post(
        "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/expense/get-outlet-expense",
        { selectedOutlet, dbDate }
      )
      .then((resp) => {
        setOutletData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [dbDate, selectedOutlet,isCategoryAdded]);

  return (
    <>
      <Content
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
      >
        {heading}
      </Content>
      {showProductTable && (
        <>
        <div className="flex flex-wrap justify-center">
        <AddEmployeeExpenseCard
          heading="Add Employee Expense"
          outlet_id={selectedOutlet}
          dataUpdated={() => setCategoryAdded(true)}
        />
          <AddExpenseCard
            heading="Add New Expense"
            outlet_id={selectedOutlet}
            dataUpdated={() => setCategoryAdded(true)}
          />
        </div>
        <div className="flex flex-wrap justify-center">
        <ExpenseCard
            firstHeading="Expense Details"
            secondHeading="Amount"
            thirdHeading="Type"
            data={outeletData}
          />
        
      </div></>
      )}
      {showAddProduct && <></>}
      {showAddCategory && <ExpenseHistory />}
    </>
  );
}
