import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../redux/productSlice';

function ChooseProduct({selectedProduct, selectedProductId}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shop-service-fo3n.onrender.com/api/category/get"
        );
        setCategories(response.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleAddProduct = (q) => {
    dispatch(addProduct({ selectedProductId, q }));
  };
  

  return (
    <div className="w-full lg:w-5/12 bg-white rounded-xl shadow-lg m-3">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Choose Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div className="flex flex-col mt-4 text-center">
              <div className="text-blue-500 font-semibold text-center">Select Category</div>
              <div className="">
              <select
                name="category_id"
                className="py-2 px-2 border border-blue-400 m-2 w-4/6 text-blue-400 rounded-sm text-center">
                {categories.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
      <table className="w-full mt-6">
        <thead className="text-left text-blue-600">
          <tr>
            <th className="px-4 py-2">Selected Product</th>
          </tr>
        </thead>
        <tbody>
          <td className="flex">
            <label className="m-4 w-1/4 text-sm">{selectedProduct}</label>
          <input
          type="number"
          className="border rounded-full px-2 py-2 m-2 w-1/2"
          placeholder='Enter Quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          /><button
          className="rounded-full border-2 w-1/4 border-green-600 px-6 py-1 shadow-md text-sm font-semibold bg-green-600 text-white m-2"
          type="submit"
          onClick={handleAddProduct(quantity)}
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
