/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

function Header({heading}){
    return (
        <div>
            <h1 className="text-pure-black text-2xl text-center font-medium">{heading}</h1>
        </div>
    )

}

export default Header;