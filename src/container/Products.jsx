import React, { useEffect, useState } from "react";
import Content from "../component/Content";
import axios from "axios";

export default function Products() {
  const [dbData, setdbData] = useState({});
  const [id, setId] = useState(0);
  const [price, setPrice] = useState(0);

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
  }, []);

  const handlePriceUpdate = async () => {
    const response = await axios.post(
      "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/product/updateProductPrice",
      {id, price}
    );
    if(response){
      alert('Price update Successful');
    }
  }

  return (
    <div>
      <Content>Product Price Update</Content>
      <div className="w-full lg:w-5/12 bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto p-4">
        <table className="w-full">
          <thead className="bg-blue-50 rounded-xl">
            <tr>
              <th className="px-4 py-2">Update Product Price</th>
            </tr>
          </thead>

          <tbody>
            <select
              onChange={(e) => {
                setId(e.target.value);
              }}
              name="category_id"
              className="py-2 px-2 border border-blue-400 m-2 w-4/6 text-blue-400 rounded-sm text-center"
            >
              {dbData?.length > 0 &&
                dbData.map((item) => (
                  <option value={item.id}>{item.product_name}</option>
                ))}
            </select>
            <input
              type="number"
              className="border rounded-full px-2 py-2 m-2 w-1/2"
              placeholder="Enter New Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            /><button
            className="rounded-full border-2 w-1/4 border-green-600 px-6 py-1 shadow-md text-sm font-semibold bg-green-600 text-white m-2"
            type="submit"
            onClick={handlePriceUpdate}
          >
            Save 
          </button>
          </tbody>
        </table>
      </div>
    </div>
  );
}
