import React from "react";
import Content from "./Content";
import Header from "./Header";

function Main(props) {
  return (
    <>
      <div class="grid grid-col-12 grid-flow-col gap-2">
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
      </div>
    </>
  );
}

export default Main;
