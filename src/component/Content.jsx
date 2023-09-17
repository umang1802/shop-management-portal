import React from "react";

function Content(props) {
  return (
    <>
      <div className="block md:flex md:items-center lg:flex lg:items-center xl:flex xl:items-center">
        <div className="text-xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-gray-900 text-left">
          {props.children}
        </div>
        <div className="md:block lg:block xl:block ml-auto flex items-center text-gray-400 text-sm font-normal">
          Teusday | 25 Apr 2023 | 8:20 AM
            <input
              type="text"
              className="border rounded-full px-2 py-2 ml-2"
            />
        </div>
        </div>
        {/* <div className="ml-2">
          <img src="./assets/notification.svg" />
        </div>
      </div> */}
      <div className="mt-6 flex flex-wrap">
        {(props.showAddProduct || props.showAddCategory || props.showInactiveProduct ) ? (
          <div
            onClick={props.backToShowProduct}
            className="rounded-full border-2 border-gray-400 px-6 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2"
          >
            Back
          </div>
        ) : (
        props.button3Text ? 
          <div onClick={props.initiateShowInactiveProduct} className="rounded-full border-2 border-gray-400 px-3 py-3 shadow-md text-sm font-bold text-gray-800 mb-2 mr-2">
            {props.button3Text}
          </div>: <div className="text-gray-600 text-bold">{props.subHeading}</div>
        )}
        <div className="ml-auto flex items-center">
        {props.button1Text &&
          <div
            onClick={props.initiateAddNewProduct}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2 mr-2"
          >
            {props.button1Text}
          </div>}
          {props.button2Text &&
          <div
            onClick={props.initiateAddNewCategory}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2 mr-2"
          >
            {props.button2Text}
          </div>}
          {props.button4Text &&
          <div
            onClick={props.initiateAddNewButtonThird}
            className="rounded-full bg-white border-2 border-blue-400 px-3 py-3 shadow-md text-sm font-bold text-blue-600 cursor-pointer hover:bg-blue-200 mb-2"
          >
            {props.button4Text}
          </div>}
        </div>
      </div>
    </>
  );
}

export default Content;
