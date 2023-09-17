import React, { useState, useEffect } from "react";
import axios from "axios";

function InactiveProductTable(props) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/product/get-inactive")
      .then((resp) => {
        setData(resp.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActivateProduct = async (productId) => {
      try {
        // Make an API call to insert a new category
        const response = await axios.post(
          "http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/api/product/activateProduct",
          {
            productId,
          }
        );
        alert('Product Activated Successfully');
        props.backToShowProduct();
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error:", error.message);
      }
      
  };
  return (<>
  <div className="text-2xl text-gray-800">Inactive Product List ({data.length})</div>
    <div className="flex justify-center bg-white rounded-lg overflow-hidden shadow-xl mt-8 border">
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
              ><button className="px-4 py-2 text-center hover:cursor-pointer font-extralight">
                Activate Product</button>
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
