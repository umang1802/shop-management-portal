import React from "react";

function Content(props) {
  return (
    <>
      <div className="flex items-center">
        <div className="text-4xl font-bold text-gray-900 text-left">
          Stocks/Products
        </div>
        <div className="ml-auto flex items-center text-gray-400 text-sm font-normal">
          Teusday | 25 Apr 2023 | 8:20 AM
          <div className="ml-2">
            <input
              type="text"
              className="border rounded-full px-2 py-2"
            />
          </div>
        </div>

        <div className="ml-2">
          <img src="./assets/notification.svg" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap">
        {(props.showAddProduct || props.showAddCategory) ? (
          <div
            onClick={props.backToShowProduct}
            className="rounded-full border-2 border-gray-400 px-6 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2"
          >
            Back
          </div>
        ) : (
          <div className="rounded-full border-2 border-gray-400 px-3 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2">
            Add Inactive Products
          </div>
        )}
        <div className="ml-auto flex items-center">
          <div
            onClick={props.initiateAddNewProduct}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2 mr-2"
          >
            Add New Products
          </div>
          <div
            onClick={props.initiateAddNewCategory}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
          >
            Add New Category
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
