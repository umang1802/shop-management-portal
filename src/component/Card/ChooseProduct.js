import React, { useEffect, useState } from "react";
import axios from "axios";

function ChooseProduct({productData, selectedProduct, selectedProductId, setSelectedProductId, onProductSelection}) {
  const [categories, setCategories] = useState([]);
  const [filteredList, setFilteredProductList] = useState([]);
  const [selectedProd, setSelectedProduct] = useState({})

  useEffect(() => {
    setSelectedProduct(selectedProduct)
  }, [selectedProduct])

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/category/get"
        );
        setCategories(response.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [quantity, setQuantity] = useState(0);

  const handleAddProduct = () => {
   //  dispatch(addProduct({ selectedProductId, q }));
   if(quantity && quantity >0) {
    onProductSelection({
      selectedProduct: selectedProd,
      quantity: quantity
    })
   }
  };

  const handleProductClick = (item, id) => {
    setSelectedProduct(item);
    setSelectedProductId(id);
  };

  const filterProductByCategories = (id) => {
    const filteredProductList = productData.filter(product => product.category.category_id == id);
    setFilteredProductList(filteredProductList)
  }
  

  return (
    <div className="w-full lg:w-5/12 bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Choose Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div className="flex flex-col mt-4 text-center">
              <div className="text-blue-500 font-semibold text-center">
                Select Category
              </div>
              <div className="">
              <select
               onChange={(e) => {filterProductByCategories(e.target.value)}}
                name="category_id"
                className="py-2 px-2 border border-blue-400 m-2 w-4/6 text-blue-400 rounded-sm text-center">
                {categories.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
               
              </select>
              </div>
            </div>
          </tr>
          {/* <td className="flex flex-col mt-4 text-center">
            {product.length === 0 ? (
              <label>No Products for this category</label>
            ) : (
              product.map((item) => (
                <label
                  key={item.id}
                  onClick={() => handleProductClick(item, item.id)}
                >
                  {item.product_name}
                </label>
              ))
            )}
          </td> */}
        </tbody>
      </table>
      {
        filteredList.length > 0 && <div className="h-96 overflow-y-auto">
          {
            filteredList.map(item => {
              return(
                <div className="px-4 py-4 bg-white text-lg text-gray-700 font-semibold border border-gray-200" onClick={() => setSelectedProduct(item)}>
                  {item.product_name}
                </div>
              )
            })
          }
        </div>
      }
      <table className="w-full mt-6">
        <thead className="text-left text-blue-600">
          <tr>
            <th className="px-4 py-2">Selected Product</th>
          </tr>
        </thead>
        <tbody>
          <td className="flex px-4 py-6 border border-gray-200">
            <label className="m-4 w-1/4 text-md">{selectedProd?.product_name}</label>
          <input
          type="number"
          className="border rounded-full px-2 py-2 m-2 w-1/2"
          placeholder='Enter Quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          />
          <button>{selectedProd?.unit}</button>
          <button
          className="rounded-full border-2 w-1/4 border-green-600 px-6 py-1 shadow-md text-sm font-semibold bg-green-600 text-white m-2"
          type="submit"
          onClick={handleAddProduct}
        >
          Save 
        </button>
          </td>
        </tbody>
      </table>
    </div>
  );
}

export default ChooseProduct;
