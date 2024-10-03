/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

function ButtonComp({text , onClick}){

    return(    
        <div>
            <div className="pt-2 px-5">
                <button onClick={onClick} className="bg-orange-600 text-white font-semibold text-sm rounded w-full h-[35px] py-2 hover:bg-orange-800">
                    {text}
                </button>
            </div>
        </div>
    )
}

export default ButtonComp