import React, { useEffect, useState } from "react";
import Content from "../component/Content";
import axios from "axios";
import EmployeeTable from "../component/Table/EmployeeTable";
import AddEmployee from "../component/AddEmployee";

export default function Emplopyees() {
  const [heading, setHeading] = useState("Employees Table");
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [dbData, setdbData] = useState([]);

  const pageSize = 5;

  const initiateAddNewProduct = () => {
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(true);
    setShowInactiveProduct(false);
    setHeading("View Inactive Employees");
  };

  const initiateAddNewCategory = () => {
    setShowProductTable(false);
    setShowAddCategory(true);
    setShowAddProduct(false);
    setShowInactiveProduct(false);
    setHeading("Add New Employees");
  };

  const backToShowProduct = () => {
    setShowProductTable(true);
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowInactiveProduct(false);
    setHeading("Employees Table");
  };

  const initiateShowInactiveProduct = () => {
    setShowInactiveProduct(true);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/employee"
        );
        console.log("response: " + response);
        setdbData(response.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showInactiveProduct]);


  return (
    <div>
      <Content
        button1Text="View Inactive Employees"
        button2Text="Add New Employees"
        showInactiveProduct={showInactiveProduct}
        showAddCategory={showAddCategory}
        showAddProduct={showAddProduct}
        backToShowProduct={backToShowProduct}
        initiateAddNewCategory={initiateAddNewCategory}
        initiateAddNewProduct={initiateAddNewProduct}
        initiateShowInactiveProduct={initiateShowInactiveProduct}
      >{heading}
      </Content>
      {showProductTable && <EmployeeTable data={dbData} pageSize={pageSize} />}
      {showAddCategory && <AddEmployee />}
    </div>
  );
}
