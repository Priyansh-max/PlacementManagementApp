/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";

function ProfileInputField2({ text, inputplaceholder, onChange, error, type ,step , min , max}) {

  return (
    <div>
        <h1 className="pl-5 pb-1 text-md text-left text-grey font-semibold">{text}</h1>
        <div className="relative pt-1 px-5">
            <input
            min= {min}
            max = {max}
            type={type}
            step={step}
            className="pr-2 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
            placeholder={inputplaceholder}
            />
        </div>
      
    </div>
  );
}
export default ProfileInputField2;
