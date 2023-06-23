import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from './component/SideBar';

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="lg:flex xl:flex">
      <div className="hidden lg:block xl:block top-0 left-0 w-1/5 shadow-lg px-8 py-8 h-screen bg-white">
        <SideBar />
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
      <div className="w-full lg:w-4/5 xl:w-4/5 lg:px-4 xl:py-4 p-2">
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
