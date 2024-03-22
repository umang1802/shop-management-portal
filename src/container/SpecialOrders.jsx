import React, { useState, useEffect } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content";
import OrderHistory from "../component/Table/OrderHistory";
import axios from "axios";
import AddNewOrder from "../component/AddNewOrder";

export default function SpecialOrders() {
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [heading, setHeading] = useState("Special Order");
  const [orders, setOrders] = useState([]);

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
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/order/get-orders?type=special');
            setOrders(response.data.rows);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
},[showProductTable]);

  return (
    <>
      <Content
        button1Text="Order History"
        button2Text="Add New Order"
        showInactiveProduct={showInactiveProduct}
        showAddCategory={showAddCategory}
        showAddProduct={showAddProduct}
        backToShowProduct={backToShowProduct}
        initiateAddNewCategory={initiateAddNewCategory}
        initiateAddNewProduct={initiateAddNewProduct}
        initiateShowInactiveProduct={initiateShowInactiveProduct}
        // subHeading="Special Order"
      >{heading}</Content>
      {showProductTable && (
        <div className="flex flex-wrap justify-">
          {orders.map((item)=>{
             return <Card orderData={item} key={item.id}/>
          })}
        </div>
      )}
      {showAddProduct && <OrderHistory />}
      {showAddCategory && <AddNewOrder/>}
    </>
  );
}
