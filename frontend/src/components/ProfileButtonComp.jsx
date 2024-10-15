/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

function ProfileButtonComp({text , onClick}){

    return(    
        <div>
            <div className="pt-2 px-5">
                <button onClick={onClick} className="w-[150px] bg-orange-500 text-white font-semibold text-sm rounded h-[35px] py-1 hover:bg-orange-700 transition-all duration-300 ease-out-in">
                    {text}
                </button>
            </div>
        </div>
    )
}

export default ProfileButtonComp