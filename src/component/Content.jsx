import React from "react";

function Content(props) {
  return (
    <>
      <div className="block md:flex md:items-center lg:flex lg:items-center xl:flex xl:items-center">
        <div className="text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-gray-900 text-left">
          {props.heading}
        </div>
        <div className="hidden md:block lg:block xl:block ml-auto flex items-center text-gray-400 text-sm font-normal">
          Teusday | 25 Apr 2023 | 8:20 AM
          <div className="ml-8">
            <input
              type="text"
              className="border rounded-full px-2 py-2"
            />
          </div>
        </div>
        </div>
        {/* <div className="ml-2">
          <img src="./assets/notification.svg" />
        </div>
      </div> */}
      <div className="mt-6 flex flex-wrap">
        {(props.showAddProduct || props.showAddCategory || props.showInactiveProduct || !props.button3Text) ? (
          <div
            onClick={props.backToShowProduct}
            className="rounded-full border-2 border-gray-400 px-6 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2"
          >
            Back
          </div>
        ) : (
        props.button3Text && 
          <div onClick={props.initiateShowInactiveProduct} className="rounded-full border-2 border-gray-400 px-3 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2">
            {props.button3Text}
          </div>
        )}
        <div className="ml-auto flex items-center">
          <div
            onClick={props.initiateAddNewProduct}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2 mr-2"
          >
            {props.button1Text}
          </div>
          <div
            onClick={props.initiateAddNewCategory}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
          >
            {props.button2Text}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
