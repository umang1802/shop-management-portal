import React, { useState, useEffect } from "react";
import axios from "axios";



const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/get-categories");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoryName == "") {
      alert("Enter a valid category");
    } else {
      try {
        // Make an API call to insert a new category
        const response = await axios.post("http://localhost:3002/categories", {
          categoryName,
        });
        // Reset the form after successful submission
        setCategoryName("");
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error:", error.message);
      }
    }
  };

 

  return (<>
    <div className="flex justify-center">
      <div className="w-4/5 bg-white rounded-lg overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="text-blue-700 m-4">Category Name </div>
          <input
            class="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5"
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
          <div className="flex justify-center m-8">
            <button
              className="rounded-full border-2 border-orange-400 px-6 py-1 shadow-md text-sm font-semibold text-orange-600 m-2"
              type="submit">
              Cancel
            </button>
            <button
              className="rounded-full border-2 border-green-300 px-6 py-1 shadow-md text-sm font-semibold text-green-600 m-2"
              type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="flex justify-center mt-8">
      <div className="w-4/5 bg-white rounded-lg overflow-hidden shadow-xl border">
    <div class="w-full">
  <table class="table-auto w-full">
    <thead>
      <tr>
        <td class="px- py-2">Category</td>
        <td class="px-2 py-2">Total no of Products</td>
        <td class="px-2 py-2">Action</td>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
          <tr >
          <td class=" px-4 py-2">{item.name}</td>
          <td class=" px-4 py-2">{item.product_count}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    </div>
    </>
  );
};

export default AddCategory;
