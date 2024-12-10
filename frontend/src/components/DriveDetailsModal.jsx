/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

//********* responsible for showing information of each drive when an drivecard info button is clicked *********

import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function DriveDetailModal({ drive, onClose }){

  console.log(drive);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-grey opacity-80"></div> {/* Background Dim Effect */}
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{drive.companyName}</h2>
        <p className="text-lg mb-2"><strong>Deadline:</strong> {drive.deadline}</p>
        <p className="text-gray-700">{drive.imgUrl}</p>
      </div>
    </div>
  );
};

export default DriveDetailModal;

