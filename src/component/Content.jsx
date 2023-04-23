import React from "react";

function Content(props) {
  return (
    <div>
      <button class="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow">
        View Active Products
      </button>
      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow">
        Add New Product
      </button>
      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow">
        Add New Category
      </button>
      <div>Active Product List</div>
      <div>Table</div>
    </div>
  );
}

export default Content;
