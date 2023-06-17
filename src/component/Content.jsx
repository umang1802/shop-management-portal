import React from "react";

function Content(props) {
  return (
   <>
   <div class="block md:flex md:items-center lg:flex lg:items-center xl:flex xl:items-ceter">
            <div className="text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-gray-900 text-left">
              Stocks/Products
            </div>
            <div className="hidden md:block lg:block xl:block ml-auto flex items-center text-gray-400 text-sm font-normal">
              Teusday | 25 Apr 2023 | 8:20 AM
              <div className="ml-8">
                <input type="text" className="border rounded-full px-2 py-2" />
              </div>
            </div>

            {/* <div className="ml-8">
              <img src="./assets/notification.svg" />
            </div> */}
          </div>
          <div className="mt-6 flex">
            {/* <div className="rounded-full border-2 border-gray-400  px-6 py-3 shadow-md text-sm font-semibold text-gray-800">
              Add Inactive Products
            </div> */}
            <div className="ml-auto flex items-center">
              <div onClick={props.initiateAddNewProduct} className="rounded-full bg-white border-2 border-blue-400 px-1 py-1 md:px-4 md:py-2 lg:px-5 lg:py-4 xl:px-6 xl:py-5 shadow-md text-xs md:text-sm lg:text-sm xl:text-sm font-semibold text-gray-800 cursor-pointer hover:bg-blue-200 text-center">
                Add New Products
              </div>
              <div onClick={props.initiateAddNewCategory} className="ml-2 rounded-full bg-white border-2 border-blue-400 px-1 py-1 md:px-4 md:py-2 lg:px-5 lg:py-4 xl:px-6 xl:py-5 shadow-md text-xs md:text-sm lg:text-sm xl:text-sm font-semibold text-gray-800 cursor-pointer hover:bg-blue-200 text-center">
                Add New Category
              </div>
            </div>
          </div>
   </>
  );
}

export default Content;
