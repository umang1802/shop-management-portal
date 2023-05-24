import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

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

        // Handle the response as per your requirement
        alert("New category added")
        console.log("New category added:", response.data);

        // Reset the form after successful submission
        setCategoryName("");
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input
          type="text"
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
