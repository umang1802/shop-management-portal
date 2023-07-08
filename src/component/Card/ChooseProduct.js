import React, { useEffect, useState } from "react";
import axios from "axios";

function ChooseProduct() {
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
    </div>
  );
}

export default ChooseProduct;
