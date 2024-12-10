/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// TopBar Component
import React, { useState } from "react";
import { Plus , Menu, ChevronDown } from 'lucide-react';

const TopbarAdmin = ({ onMenuToggle , handleOpenOverlay ,handleOpenOverlayDrive , handleOpenOverlayAccess}) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={onMenuToggle} 
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* Buttons placed at the end */}
      <div className="flex items-center space-x-4 ml-auto mx-10"> {/* ml-auto to push the buttons to the right */}
        {/* Register Company Button */}
        <button
          onClick={handleOpenOverlay} // Add your functionality here
          className="bg-blue-500 hover:bg-blue-700 transition-all duration-300 ease-out-in text-white px-4 py-2 rounded-md"
        >
          Register Company
        </button>

        {/* Create Drive Button */}
        <button
            onClick={handleOpenOverlayDrive} // Add your functionality here
            className="bg-orange-500 hover:bg-orange-700 transition-all duration-300 ease-out-in text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
            <Plus size={16} />
            <span>Create Drive</span> 
        </button>

      </div>

      <div className="relative">
        <button 
          onClick={() => setProfileDropdown(!profileDropdown)}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            AD
          </div>
          <div className="flex flex-row rounded hover:bg-slate-200 transition-colors duration-300 ease-in-out">
            <span>Admin Name</span>
            <ChevronDown />
          </div>
        </button>

        {profileDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <button
              className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleOpenOverlayAccess}
            >
              Edit Access
            </button>
            <button
              className="w-full text-left p-2 hover:bg-red-50 text-red-600 cursor-pointer"
              onClick={() => console.log("Logout clicked")}
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TopbarAdmin;
