import React, { useState } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content";
import AddCategory from "../component/AddCategory";
import AddProduct from "../component/AddProduct";
import OrderHistory from "../component/Table/OrderHistory";

export default function SpecialOrders() {
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [heading, setHeading] = useState("Special Order");

  const initiateAddNewProduct = () => {
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(true);
    setShowInactiveProduct(false);
    setHeading("Order History");
  };

  const initiateAddNewCategory = () => {
    setShowProductTable(false);
    setShowAddCategory(true);
    setShowAddProduct(false);
    setShowInactiveProduct(false);
    setHeading("Add New Order");
  };

  const backToShowProduct = () => {
    setShowProductTable(true);
    setShowAddProduct(false);
    setShowAddCategory(false);
    setShowInactiveProduct(false);
    setHeading("Special Order");
  };

  const initiateShowInactiveProduct = () => {
    setShowInactiveProduct(true);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
    // setHeading('Inactive Products');
  };

  return (
    <>
      <Content
        heading={heading}
        button1Text="Order History"
        button2Text="Add New Order"
        showInactiveProduct={showInactiveProduct}
        showAddCategory={showAddCategory}
        showAddProduct={showAddProduct}
        backToShowProduct={backToShowProduct}
        initiateAddNewCategory={initiateAddNewCategory}
        initiateAddNewProduct={initiateAddNewProduct}
        initiateShowInactiveProduct={initiateShowInactiveProduct}
      />
      {showProductTable && (
        <div className="flex flex-wrap justify-">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      )}
      {showAddProduct && <OrderHistory />}
      {showAddCategory && <></>}
    </>
  );
}
