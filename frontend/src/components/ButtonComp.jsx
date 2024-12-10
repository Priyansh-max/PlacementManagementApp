/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

function ButtonComp({text , onClick , disabled}){

    return(    
        <div>
            <div className="pt-2 px-5">
                <button onClick={onClick} disabled={disabled} className="bg-orange-500 text-white font-semibold text-sm rounded w-full h-[35px] py-1 hover:bg-orange-700 transition-all duration-300 ease-out-in">
                    {text}
                </button>
            </div>
        </div>
    )
}

export default ButtonComp