import React, { useState, useEffect } from "react";
import ChooseProduct from "./Card/ChooseProduct";
import axios from "axios";
import OrderDetails from "./Card/OrderDetails";
import PreviewBill from "./Card/PreviewBill";

function AddNewOrder() {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [productsForBill, setProductForBill] = useState([]);
  const [dbData, setdbData] = useState([]);
  const [orderData, setOrderData] = useState({
    customer_name: "",
    customer_address: "",
    mobile_number: "",
    delivery_date: "",
    delivery_time: "",
    total_amount: "",
    discount: "",
    note: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/products"
        );
        setdbData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const AddProductToBill = (selectedProduct) => {
    const productForBilling = [...productsForBill, selectedProduct];
    setProductForBill(productForBilling);
  };

  const resetBill = () => {
    setProductForBill([]);
    setSelectedProducts({});
  };

  const removeProduct = (id) => {
    const updatedProducts = [...productsForBill];
    const productToRemove = updatedProducts.filter(
      (product) => product.selectedProduct.id === id
    );
    const index = updatedProducts.indexOf(productToRemove);
    updatedProducts.splice(index, 1);
    // const updatedProducts = productsForBill.filter((_, index) => index !== indexToRemove);
    setProductForBill(updatedProducts);
  };
  return (
    <div>
      {" "}
      <div className="flex flex-wrap justify-">
        <ChooseProduct
          productData={dbData}
          selectedProduct={selectedProducts}
          onProductSelection={AddProductToBill}
        />
        <OrderDetails orderData={orderData} setOrderData={setOrderData} />
        <PreviewBill
          heading="Preview"
          productsForBill={productsForBill}
          removeProduct={removeProduct}
          resetBill={resetBill}
          orderData={orderData}
        />
      </div>
    </div>
  );
}

export default AddNewOrder;
