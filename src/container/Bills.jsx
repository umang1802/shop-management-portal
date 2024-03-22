import React, { useState, useEffect } from "react";
import ChooseProduct from "../component/Card/ChooseProduct";
import PreviewBill from "../component/Card/PreviewBill";
import RecommendedProduct from "../component/Card/RecommendedProduct";
import Content from "../component/Content";
import axios from "axios";
import OrderHistory from "../component/Table/OrderHistory";

export default function Bills() {
  const [dbData, setdbData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [productsForBill, setProductForBill] = useState([]);
  const [showBillScreen, setShowBillScreen] = useState(true);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const updateButtons = () =>{
    setShowOrderHistory(true);
    setShowBillScreen(false);
  }
  const updateButtons2 = () =>{
    setShowOrderHistory(false);
    setShowBillScreen(true);
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'products'
        );
        setdbData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProductSelection = (selectedProduct) => {
    setSelectedProducts(selectedProduct);
  };
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
    const index = updatedProducts.indexOf(productToRemove[0]);
    updatedProducts.splice(index, 1);
    setProductForBill(updatedProducts);
  };

  return (
    <div>
      <Content>
        <div className="flex"><h1>Generate New Bill</h1>
        <div onClick={() => updateButtons()} className="rounded-full border-2 border-gray-400 px-3 py-2 mx-4 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2">
          Order History
        </div> <div onClick={() => updateButtons2()} className="rounded-full border-2 border-gray-400 px-3 py-2 shadow-md text-sm font-bold text-gray-800 mb-2">
          Back
        </div></div>
      </Content>
     
        {showOrderHistory && <OrderHistory/>}
        {showBillScreen &&  <div className="flex flex-wrap justify-">
          <RecommendedProduct
            productData={dbData}
            onProductSelect={handleProductSelection}
          />
          <ChooseProduct
            productData={dbData}
            selectedProduct={selectedProducts}
            onProductSelection={AddProductToBill}
          />
          <PreviewBill
            heading="Preview Bill"
            productsForBill={productsForBill}
            removeProduct={removeProduct}
            resetBill={resetBill}
          />
        </div>}
    </div>
  );
}
