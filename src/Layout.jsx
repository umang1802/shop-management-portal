import React, { useState } from "react";
import SideBar from "./component/SideBar";

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="lg:flex xl:flex relative h-screen overflow-hidden">
      {!isCollapsed && (
        <div className="hidden lg:block xl:block top-0 left-0 w-1/5 shadow-lg px-8 py-8 h-screen bg-white">
          <SideBar />
        </div>
      )}
      <div className="flex flex-row justify-between items-start text-center">
        <span className="ml-auto" onClick={handleCollapse}>
          <svg
            className="w-6 h-6 cursor-pointer m-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isCollapsed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
        </span>
      </div>
      <div className="flex lg:hidden xl:hidden py-6 shadow-md px-6 bg-white">
        <div className="mr-auto">Ram Shiv</div>
        <div className="ml-auto">
          <div onClick={toggleMenu}>
            {!showMenu ? (
              <span className="mr-2">Menu</span>
            ) : (
              <span className="mr-2">Close</span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-full xl:py-4 h-screen overflow-y-auto ${
          isCollapsed ? "" : "lg:w-4/5 xl:w-4/5"
        }`}
      >
        <div>{children}</div>
      </div>
      {showMenu && (
        <div className="lg:hidden xl:hidden fixed top-0 left-0 w-full h-screen bg-white z-10">
          <div className="px-8 py-8">
            <SideBar />
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={toggleMenu}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
