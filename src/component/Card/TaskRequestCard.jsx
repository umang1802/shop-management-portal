import axios from "axios";
import React, { useState, useEffect } from "react";

function TaskRequestCard(props) {

  const [requestData, setRequestData] = useState({
    requestorid: JSON.parse(localStorage.getItem('user')).id,
    location: '',
    product: 0,
    quantity: 0,
    type: 'make',
  })
  const handleChange = (e ) => {
    const {name, value} =e.target;
    setRequestData({
      ...requestData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    console.log(requestData);
    const response = await axios.post(process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/request/createRequestTask', requestData );
    if (response) {
      alert("Request Raised");
      setRequestData({
        location: '',
        product: 0,
        quantity: 0,
        type: 'make',
        request_location: 0,
      })
    }
    else{
      console.log('Error Occured');
    }
  }
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL + "api/users/getUsers"
        );
        setUsers(response.data.rows);
        const rwResponse = await axios.get(
          process.env.REACT_APP_BACKEND_MICROSERVICE_URL + "products"
        );
        setProducts(rwResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg m-3 max-h-[700px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-blue-50 rounded-xl">
          <tr>
            <th className="px-4 py-2">Place Product Request</th>
          </tr>
        </thead>
        <tbody>
          <div className="flex">
            <div className="flex flex-col">
              <div className="px-4 py-2 m-4">For Location</div>
              <div className="px-4 py-2 m-4">Product</div>
              <div className="px-4 py-2 m-4">Type</div>
              {requestData.type ==='deliver' && <div className="px-4 py-2 m-4">Deliver To Location</div> }
              <div className="px-4 py-2 m-4">Quantity</div>
            </div>
            <div className="flex flex-col">
              <div>
                <select
                  type="text"
                  name="location"
                  className="border capitalize rounded-md text-sm px-4 py-2 m-4 w-64 border-blue-400 text-blue-400 placeholder:text-black-400"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Warehouse
                  </option>
                  {users.filter(u => u.role !== JSON.parse(localStorage.getItem('user')).role).map(u => {
                    return (
                      <option key={u.id} value={u.id}>
                        {u.location}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select
                  type="text"
                  name="product"
                  className="border capitalize rounded-md text-sm px-4 py-2 m-4 w-64 border-blue-400 text-blue-400 placeholder:text-black-400"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Product
                  </option>
                  {products.map((p) => {
                    return (
                      <option key={p.id} value={p.id}>
                        {p.product_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select
                  type="text"
                  name="type"
                  className="border capitalize rounded-md text-sm px-4 py-2 m-4 w-64 border-blue-400 text-blue-400 placeholder:text-black-400"
                  onChange={handleChange}
                >
                  <option value="make" selected>
                    To Make</option>
                    <option value="deliver">
                    To Delivery</option>
                  
                </select>
              </div>
              {requestData.type ==='deliver' && <div>
                <select
                  type="text"
                  name="request_location"
                  className="border capitalize rounded-md text-sm px-4 py-2 m-4 w-64 border-blue-400 text-blue-400 placeholder:text-black-400"
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Outlet
                  </option>
                  <option>Outlet 1</option>
                  <option>Outlet 2</option>
                </select>
              </div>}
              <div>
                <input
                  type="number"
                  name="quantity"
                  className="border rounded-md text-sm px-4 py-2 m-4 w-64 border-blue-400 text-blue-400 placeholder:text-black-400"
                  placeholder="Enter Quantity"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="rounded-full border-2 border-green-600 px-6 py-1 shadow-md text-sm font-semibold bg-green-600 text-white m-4"
              type="submit"
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </tbody>
      </table>
    </div>
  );
}

export default TaskRequestCard;
