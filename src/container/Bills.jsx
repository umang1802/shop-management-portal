import React, { useState, useEffect }from 'react'
import ChooseProduct from '../component/Card/ChooseProduct';
import PreviewBill from '../component/Card/PreviewBill';
import RecommendedProduct from '../component/Card/RecommendedProduct'
import Content from '../component/Content';
import axios from 'axios';


export default function Bills() {
  const [dbData, setdbData] = useState([])
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

  const handleProductSelection = (selectedProduct) => {
    setSelectedProducts(selectedProduct)
  }
  const AddProductToBill = (selectedProduct) => {
    const productForBilling = [...productsForBill, selectedProduct]
    setProductForBill(productForBilling)
  }

  const resetBill = () => {
    setProductForBill([]);
    setSelectedProducts({});
  }

  const removeProduct = (id) => {
    const updatedProducts = [...productsForBill]
    const productToRemove = updatedProducts.filter(product => product.selectedProduct.id == id);
    const index = updatedProducts.indexOf(productToRemove[0])
    updatedProducts.splice(index, 1)
    setProductForBill(updatedProducts);
  };
  
  return (
    <div>
      <Content
        heading="Generate New Bill"
      />
        <div className="flex flex-wrap justify-">
          <RecommendedProduct productData={dbData} onProductSelect={handleProductSelection}/>
          <ChooseProduct  productData={dbData} selectedProduct={selectedProducts} onProductSelection={AddProductToBill} />
          <PreviewBill heading="Preview Bill" productsForBill={productsForBill} removeProduct={removeProduct} resetBill={resetBill}/>
        </div>
    </div>
  )
}
