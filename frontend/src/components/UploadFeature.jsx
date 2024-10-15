/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function UploadFeature({validm , filenamem , filechange , error , inputId }){
    return (
        <div>
            <div className={`mx-2 flex flex-row items-center justify-between w-[400px] h-[80px] border-2 rounded p-2 px-4 bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-out-in
                ${validm ? "border-dashed border-gray-400" : "border-dashed border-red"}`}>
              <div className={`text-gray-500 ${!validm ? "text-red-500" : ""}`}>
                {filenamem !== "No file chosen" ? filenamem : "PDF, DOC"}
              </div>
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={filechange}
                  className="hidden"
                  id={inputId}
                />
                <label htmlFor={inputId} className="cursor-pointer">
                  <FontAwesomeIcon icon={faUpload} size="lg" />
                </label>
              </div>

            </div>

            {!validm && (
                <div className="text-red text-sm mt-1 pl-2 italic">
                  {error}
                </div>
            )}
        </div>

    )

}

export default UploadFeature;