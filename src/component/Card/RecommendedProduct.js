import React, { useEffect, useState } from "react";
import axios from "axios";

function RecommendedProduct({ setSelectedProduct, setSelectedProductId }) {
  const [dbData, setdbData] = useState([]);

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

  const handleProductClick = (name, id) => {
    setSelectedProduct(name);
    setSelectedProductId(id);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg m-3">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Recommended Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">
              <input
                type="text"
                className="border rounded-full px-2 py-2 m-2 w-5/6"
                placeholder="Search"
              />
            </td>
          </tr>
          {dbData.map((item) => {
            return (
              <tr>
                <td
                  className="text-center text-md capitalize hover:cursor-pointer"
                  onClick={() => handleProductClick(item.product_name, item.id)}
                >
                  {item.product_name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecommendedProduct;
