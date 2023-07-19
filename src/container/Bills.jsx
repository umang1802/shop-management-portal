import React, { useState }from 'react'
import ChooseProduct from '../component/Card/ChooseProduct';
import PreviewBill from '../component/Card/PreviewBill';
import RecommendedProduct from '../component/Card/RecommendedProduct'
import Content from '../component/Content';
import ExpenseHistory from '../component/Table/ExpenseHistory';


export default function Bills() {
  const [showProductTable, setShowProductTable] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInactiveProduct, setShowInactiveProduct] = useState(false);
  const [heading, setHeading] = useState("Generate New Bill");

  const [selectedProduct, setSelectedProduct] = useState('');

  const [selectedProductId, setSelectedProductId] = useState(0);

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
  
  return (
    <div>
      <Content
        heading={heading}
        showInactiveProduct={showInactiveProduct}
        showAddCategory={showAddCategory}
        showAddProduct={showAddProduct}
        backToShowProduct={backToShowProduct}
        initiateAddNewCategory={initiateAddNewCategory}
        initiateAddNewProduct={initiateAddNewProduct}
        initiateShowInactiveProduct={initiateShowInactiveProduct}
        subHeading={<div className="ml-auto flex items-center">
         <div
            className="rounded-full bg-white border-2 border-blue-400 m-2 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
          >Bill Formats
          </div>
          <div
            className="rounded-full bg-white border-2 border-blue-400 m-2 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
          >Bill History
          </div>
          <div
            className="rounded-full bg-white border-2 border-blue-400 m-2 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
          >View Today's Bill
          </div>
          </div>
        }
      />
      {showProductTable && (
        <div className="flex flex-wrap justify-">
          <RecommendedProduct selectedProduct={selectedProduct} selectedProductId={selectedProductId} setSelectedProduct={setSelectedProduct} setSelectedProductId={setSelectedProductId}/>
          <ChooseProduct selectedProduct={selectedProduct} selectedProductId={selectedProductId} setSelectedProduct={setSelectedProduct} setSelectedProductId={setSelectedProductId}/>
          <PreviewBill selectedProdut={selectedProduct} selectedProductId={selectedProductId} setSelectedProduct={setSelectedProduct} setSelectedProductId={setSelectedProductId}/>
        </div>
      )}
      {showAddProduct && <></>}
      {showAddCategory && <ExpenseHistory />}
    </div>
  )
}
