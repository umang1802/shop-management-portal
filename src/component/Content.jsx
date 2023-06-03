import React from "react";

function Content(props) {
  return (
   <>
   <div class="flex items-center">
            <div className="text-4xl font-bold text-gray-900 text-left">
              Stocks/Products
            </div>
            <div className="ml-auto flex items-center text-gray-400 text-sm font-normal">
              Teusday | 25 Apr 2023 | 8:20 AM
              <div className="ml-8">
                <input type="text" className="border rounded-full px-2 py-2" />
              </div>
            </div>

            <div className="ml-8">
              <img src="./assets/notification.svg" />
            </div>
          </div>
          <div className="mt-6 flex">
            <div className="rounded-full border-2 border-gray-400  px-6 py-3 shadow-md text-sm font-semibold text-gray-800">
              Add Inactive Products
            </div>
            <div className="ml-auto flex items-center">
              <div onClick={props.initiateAddNewProduct} className="rounded-full bg-white border-2 border-blue-400 px-6 py-3 shadow-md text-sm font-semibold text-gray-800 cursor-pointer hover:bg-blue-200">
                Add New Products
              </div>
              <div onClick={props.initiateAddNewCategory} className="ml-2 rounded-full bg-white border-2 border-blue-400 px-6 py-3 shadow-md text-sm font-semibold text-gray-800 cursor-pointer hover:bg-blue-200">
                Add New Category
              </div>
            </div>
          </div>
   </>
  );
}

export default Content;
