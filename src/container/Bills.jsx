import React, { useState, useEffect }from 'react'
import ChooseProduct from '../component/Card/ChooseProduct';
import PreviewBill from '../component/Card/PreviewBill';
import RecommendedProduct from '../component/Card/RecommendedProduct'
import Content from '../component/Content';
import ExpenseHistory from '../component/Table/ExpenseHistory';
import axios from 'axios';


export default function Bills() {
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [dbData, setdbData] = useState([])
  const [heading, setHeading] = useState("Generate New Bill");
  const [selectedProducts, setSelectedProducts] = useState({})
  const [productsForBill, setProductForBill] = useState([]);

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

  

  const [selectedProduct, setSelectedProduct] = useState('');

  const [selectedProductId, setSelectedProductId] = useState(0);

  const handleProductSelection = (selectedProduct) => {
    setSelectedProducts(selectedProduct)
    //setSelectedProducts((prevProduct) => [...prevProduct, selectedProduct])
  }

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
    setHeading("Generate New Bill");
  };

  const initiateShowInactiveProduct = () => {
    setShowInactiveProduct(true);
    setShowProductTable(false);
    setShowAddCategory(false);
    setShowAddProduct(false);
    // setHeading('Inactive Products');
  };

  const AddProductToBill = (selectedProduct) => {
    const productForBilling = [...productsForBill, selectedProduct]
    setProductForBill(productForBilling)
  }
  
  return (
    <div>
      <Content
        heading={heading}
        // showInactiveProduct={showInactiveProduct}
        // showAddCategory={showAddCategory}
        // showAddProduct={showAddProduct}
        // backToShowProduct={backToShowProduct}
        // initiateAddNewCategory={initiateAddNewCategory}
        // initiateAddNewProduct={initiateAddNewProduct}
        // initiateShowInactiveProduct={initiateShowInactiveProduct}
        // subHeading={<div className="ml-auto flex items-center">
        //  <div
        //     className="rounded-full bg-white border-2 border-blue-400 m-2 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
        //   >Bill Formats
        //   </div>
        //   <div
        //     className="rounded-full bg-white border-2 border-blue-400 m-2 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
        //   >Bill History
        //   </div>
        //   <div
        //     className="rounded-full bg-white border-2 border-blue-400 m-2 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
        //   >View Today's Bill
        //   </div>
        //   </div>
        // }
      />
      {showProductTable && (
        <div className="flex flex-wrap justify-">
          {/* <RecommendedProduct productData={dbData} selectedProduct={selectedProduct} selectedProductId={selectedProductId} setSelectedProduct={(value) => {console.log("productValue", value);setSelectedProduct(value)}} setSelectedProductId={(id) => {setSelectedProductId(id); console.log('id', id)}}/> */}
          <RecommendedProduct productData={dbData} onProductSelect={handleProductSelection}/>
          {/* <ChooseProduct selectedProduct={selectedProduct} selectedProductId={selectedProductId} setSelectedProduct={setSelectedProduct} setSelectedProductId={setSelectedProductId}/> */}
          <ChooseProduct  productData={dbData} selectedProduct={selectedProducts} onProductSelection={AddProductToBill} />
          {/* <PreviewBill selectedProdut={selectedProduct} selectedProductId={selectedProductId} setSelectedProduct={setSelectedProduct} setSelectedProductId={setSelectedProductId}/> */}
          <PreviewBill productsForBill={productsForBill} />
        </div>
      )}
      {showAddProduct && <></>}
      {showAddCategory && <ExpenseHistory />}
    </div>
  )
}
