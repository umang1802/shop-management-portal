import React, { useState, useEffect } from "react";
import ProductTable from "../component/Table/ProductTable";
import AddCategory from "../component/AddCategory";
import AddProduct from "../component/AddProduct";
import Content from "../component/Content";
import axios from "axios";
import InactiveProductTable from "../component/Table/InactiveProductTable";
import AddRawMaterialCard from "../component/Card/AddRawMaterialCard";
import Products from "./Products";

const pageSize = 5;

export default function Dashboard() {
  const [dbData, setdbData] = useState([]);
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [showButtonThirdContent, setShowButtonThirdContent] = useState(false);
  const [heading, setHeading] = useState("Stocks/Product");
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/products"
        );
        console.log("response: " + response);
        setdbData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showInactiveProduct]);

  const initiateAddNewProduct = () => {
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(true);
    setShowInactiveProduct(false);
    setShowButtonThirdContent(false);
    setShowPriceUpdate(false);
    setHeading("Add New Product");
  };

  const initiateAddNewCategory = () => {
    setShowProductTable(false);
    setShowAddCategory(true);
    setShowAddProduct(false);
    setShowInactiveProduct(false);
    setShowButtonThirdContent(false);
    setShowPriceUpdate(false);
    setHeading("Add New Category");
  };

  const backToShowProduct = () => {
    setShowProductTable(true);
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowInactiveProduct(false);
    setShowButtonThirdContent(false);
    setShowPriceUpdate(false);
    setHeading("Stocks/Product");
  };

  const initiateShowInactiveProduct = () => {
    setShowInactiveProduct(true);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
    setShowButtonThirdContent(false);
    setShowPriceUpdate(false);
    setHeading("Inactive Products");
  };

  const initiateAddNewButtonThird = () => {
    setShowButtonThirdContent(true);
    setShowInactiveProduct(false);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
    setShowPriceUpdate(false);
    setHeading("Add New Raw Material");
  };

  const initiateAddNewButtonFifth = () => {
    setShowPriceUpdate(true);
    setShowButtonThirdContent(false);
    setShowInactiveProduct(false);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
    setHeading("Update Product Price");
  }

  return (
    <div>
      <div className="mt-4">
        <Content
          heading={heading}
          button4Text="Add Raw Material"
          button1Text="Add New Product"
          button2Text="Add New Category"
          button3Text="View Inacitve Products"
          button5Text="Price Update"
          showInactiveProduct={showInactiveProduct}
          showAddCategory={showAddCategory}
          showAddProduct={showAddProduct}
          showPriceUpdate={showPriceUpdate}
          showButtonThirdContent={showButtonThirdContent}
          backToShowProduct={backToShowProduct}
          initiateAddNewCategory={initiateAddNewCategory}
          initiateAddNewProduct={initiateAddNewProduct}
          initiateShowInactiveProduct={initiateShowInactiveProduct}
          initiateAddNewButtonThird={initiateAddNewButtonThird}
          initiateAddNewButtonFifth={initiateAddNewButtonFifth}
        >
          <h1>{heading}</h1>
        </Content>
        {showProductTable && <ProductTable data={dbData} pageSize={pageSize} />}
        {showAddProduct && <AddProduct />}
        {showAddCategory && <AddCategory />}
        {showInactiveProduct && (
          <InactiveProductTable backToShowProduct={backToShowProduct} />
        )}
        {showButtonThirdContent && <AddRawMaterialCard />}
        {showPriceUpdate && <Products/>}
      </div>
    </div>
  );
}
