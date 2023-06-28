import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get("https://shop-service-fo3n.onrender.com/api/category/get")
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
        const response = await axios.post(
          "https://shop-service-fo3n.onrender.com/api/category/add",
          {
            categoryName,
          }
        );
        // Reset the form after successful submission
        setCategoryName("");
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-4/5 bg-white rounded-lg overflow-hidden shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="text-blue-700 m-4 font-semibold text-lg">
                Category Name
              </div>
            </div>
            <div className="flex justify-center">
              <input
                className="rounded text-blue-500 border border-blue-500 border-solid p-2 w-3/5"
                type="text"
                value={categoryName}
                onChange={handleCategoryNameChange}
              />
            </div>
            <div className="flex justify-center m-8">
              <button
                className="rounded-full border-2 border-orange-400 px-6 py-1 shadow-md text-sm font-semibold text-orange-600 m-2"
                type="submit"
              >
                Cancel
              </button>
                <button
                  className="rounded-full border-2 border-green-300 px-6 py-1 shadow-md text-sm font-semibold text-green-600 m-2"
                  type="submit"
                >
                  Save
                </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-4/5 bg-white rounded-lg overflow-hidden shadow-xl border py-2">
          <div class="w-full">
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
                      <td className="px-4 py-2 text-center">{item.name}</td>
                      <td className="px-4 py-2 text-center">
                        {item.product_count}
                      </td>
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
