import React from "react";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import ProductTable from "./Table/ProductTable";

function Main(props) {
  return (
    <>
    <div className="flex">
    <div className="top-0 left-0 w-1/5 shadow-lg px-8 py-8 h-screen bg-white">
      <div className="tex-center text-4xl font-seminold">Ram Shiv</div>
      <div className="mt-10">
        <div className="flex items-center justify-center px-4 py-4 hover:bg-gray-300  rounded-r-full cursor-pointer">
          <img src="./assets/dashboard.svg" />
          <div class="ml-4 text-xl font-semibold text-gray-800 hover:text-blue-400">Dashboard</div>
        </div>
        <div className="flex items-center justify-center px-4 py-4 hover:bg-gray-300  rounded-r-full cursor-pointer">
          <img src="./assets/dashboard.svg" />
          <div class="ml-4 text-xl font-semibold text-gray-800 hover:text-blue-400">Dashboard</div>
        </div>
        <div className="flex items-center justify-center px-4 py-4 hover:bg-gray-300  rounded-r-full cursor-pointer">
          <img src="./assets/dashboard.svg" />
          <div class="ml-4 text-xl font-semibold text-gray-800 hover:text-blue-400">Dashboard</div>
        </div>
        <div className="flex items-center justify-center px-4 py-4 hover:bg-gray-300  rounded-r-full cursor-pointer">
          <img src="./assets/dashboard.svg" />
          <div class="ml-4 text-xl font-semibold text-gray-800 hover:text-blue-400">Dashboard</div>
        </div>
        <div className="flex items-center justify-center px-4 py-4 hover:bg-gray-300  rounded-r-full cursor-pointer">
          <img src="./assets/dashboard.svg" />
          <div class="ml-4 text-xl font-semibold text-gray-800 hover:text-blue-400">Dashboard</div>
        </div>
      </div>
      

    </div>
      <div className="w-4/5 px-4 py-4">
        <div class="flex items-center"> 
        <div className="text-4xl font-bold text-gray-900 text-left">Stocks/Products</div>
        <div className="ml-auto flex items-center text-gray-400 text-sm font-normal">Teusday | 25 Apr 2023 | 8:20 AM
        <div className="ml-8">
          <input type="text" className="border rounded-full px-2 py-2" />
        </div>
        </div>
       
        <div className="ml-8">
          <img src='./assets/notification.svg' />
        </div>
        </div>
        <div className="mt-6 flex">
          <div className="rounded-full border-2 border-gray-400  px-6 py-3 shadow-md text-sm font-semibold text-gray-800">View Inactive Products</div>
          <div className="ml-auto flex items-center">
          <div className="rounded-full bg-white border-2 border-blue-400 px-6 py-3 shadow-md text-sm font-semibold text-gray-800">View Inactive Products</div>
          <div className="ml-4 rounded-full bg-white border-2 border-blue-400 px-6 py-3 shadow-md text-sm font-semibold text-gray-800">View Inactive Products</div>
          </div>
        </div>
        <div className="mt-10">
          <ProductTable />
        </div>
        <AddCategory/>
        {/* <AddProduct /> */}
      </div>
    </div>
    
      {/* <div class="grid grid-col-12 grid-flow-col gap-2">
        <div class="col-span-2 border border-black-800">
         <div className='font-semibold text-center text-4xl'>Ram Shiv</div>
         <div className="mt-16">
            <div className="m-4 border border-black-800">Dashboard</div>
            <div className="m-4 border border-black-800">Stock and Products</div>
         </div>
        </div>
        <div class="col-span-10 border border-black-800">
            <Header heading="Stocks/Products"/>
            <Content/>
        </div>
      </div> */}
    </>
  );
}

export default Main;
