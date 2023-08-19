import React, { useEffect, useState } from 'react'
import axios from 'axios';

function PreviewBill({productsForBill}) {
    // const [dbData, setdbData] = useState([]);
    // const [billingproducts, setBillingProducts] = useState([]);


    useEffect(() => {
      console.log("Preview Bill", productsForBill)
    }, [productsForBill])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://ubuntu@ec2-3-138-100-165.us-east-2.compute.amazonaws.com:3001/products");
    //             setdbData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // },[]);
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
    {productsForBill && productsForBill.map((item)=>{
        return <tr>
            <td className="flex items-center px-2 py-2 border border-gray-200 shadow-sm">
                <div className='w-1/2 text-sm font-semibold text-gray-800'>{item.selectedProduct.product_name}</div>
                <div className='w-1/2 text-sm font-semibold text-gray-800'>{item.quantity} { ' '} { 'kg' }</div>
            </td>
        </tr>
    })}
  </tbody>
</table>

    </div>
  )
}

export default PreviewBill
