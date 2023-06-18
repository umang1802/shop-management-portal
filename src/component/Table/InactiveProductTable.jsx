import React, { useState, useEffect } from "react";
import axios from "axios";

function InactiveProductTable() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get("https://shop-service-fo3n.onrender.com/api/product/get-inactive")
      .then((resp) => {
        console.log("rowsss---->", resp.data.rows);
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActivateProduct = () => {};
  return (<>
  <div className="text-2xl text-gray-800">Inactive Product List ({data.length})</div>
    <div className="flex justify-center bg-white rounded-lg overflow-hidden shadow-xl mt-8">
  <div className="w-full sm:w-4/5 md:w-3/5">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-center">{item.product_name}</td>
              <td className="px-4 py-2 text-center">{item.category_name}</td>
              <td
                className="px-4 py-2 text-center cursor-pointer"
                onClick={() => handleActivateProduct(item.id)}
              >
                Activate Product
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>
</>
  );
}

export default InactiveProductTable;
