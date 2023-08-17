import React, { useEffect, useState } from 'react'
import axios from 'axios';

function PreviewBill() {
    const [dbData, setdbData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/products");
                setdbData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[]);
  return (
    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg m-3">
      <table className="w-full">
  <thead className="bg-blue-50 rounded-xl">
    <tr>
      <th className="px-4 py-2">Preview Bill</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="text-center">
        <input
          type="text"
          className="border rounded-full text-sm px-4 py-2 m-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-blue-400"
          placeholder="Customer's Name"
        />
        <input
          type="text"
          className="border rounded-full text-sm px-4 py-2 mx-2 w-5/6 border-blue-400 text-blue-400 placeholder:text-blue-400"
          placeholder='Mobile No.'
        />
      </td>
    </tr>
    {/* {dbData.map((item)=>{
        return <tr>
            <td className="text-center text-2xl capitalize hover:cursor-pointer">
                {item.product_name}
            </td>
        </tr>
    })} */}
  </tbody>
</table>

    </div>
  )
}

export default PreviewBill
