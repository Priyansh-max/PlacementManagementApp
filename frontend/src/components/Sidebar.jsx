/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Users, Briefcase, Building, X, LogOut } from "lucide-react";

const Sidebar = ({ isOpen, onClose, onMenuSelect }) => {
  const menuItems = [
    { icon: <Users />, label: "Users", view: "users" },
    { icon: <Briefcase />, label: "Drives", view: "drives" },
    { icon: <Building />, label: "Companies", view: "companies" },
  ];

  return (
    <div
      className={`
        fixed 
        top-0 
        left-0 
        h-full 
        bg-white 
        shadow-lg 
        z-50 
        transition-transform 
        duration-300 
        ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64
        overflow-y-auto
      `}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X size={24} />
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              onMenuSelect(item.view); // Trigger view update
              onClose(); // Close sidebar
            }}
            className="
              flex 
              items-center 
              p-3 
              hover:bg-gray-100 
              rounded 
              transition 
              group
              w-full
              text-left
            "
          >
            {item.icon}
            <span className="ml-3 group-hover:text-blue-600">{item.label}</span>
          </button>
        ))}
        <div className="mt-4 pt-4 border-t">
          <button
            className="
              w-full 
              flex 
              items-center 
              p-3 
              hover:bg-red-50 
              rounded 
              text-red-600 
              hover:text-red-800
            "
          >
            <LogOut />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
