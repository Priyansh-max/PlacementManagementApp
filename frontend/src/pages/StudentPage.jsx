/* eslint-disable no-unused-vars */
import React from "react";
import myimage from '../assets/jklulogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function StudentPage(){
    return(
        
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
        <div className="flex fixed top-0 left-0 right-0 w-full h-[70px] bg-orange-50 text-white shadow-lg z-50">
            <div className="overflow-hidden h-[70px] w-[130px] flex items-center justify-center mt-1 mx-4">
                <img src={myimage} alt="JKLU" className="h-[130px] w-[130px]"></img>
            </div>

            <div className="flex mx-28 items-center">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-[550px] placeholder:italic text-black h-10 px-4 rounded-2xl border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                    />

                    <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                </div>             
            </div>

            <div className="flex justify-end items-center absolute right-8 top-1/2 transform -translate-y-1/2">
                <div className="relative">
                    <p className="text-black">Hello Username</p>
                </div>
                <div className="relative">
                    <p className="text-black">Hello Username</p>
                </div>   
                <div className="relative">
                    <p className="text-black">Hello Username</p>
                </div>                
            </div>

        </div>

      {/* Main Content Area */}
      <div className="flex-1 w-[calc(100%-80px)] mt-24 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Page Content</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. 
          Nulla
          quis sem at 
          nibh 
          elementum 
          imperdiet.
        </p>
        <p>
          Suspendisse in 
          justo eu magna luctus suscipit. Sed lectus. Integer
          euismod lacus luctus 
          magna. Quisque cursus,
           metus vitae pharetra
          auctor, sem massa 
          mattis sem, at interdum
           magna augue eget diam.
        </p>
        <div className="mt-20">
          <p>
            Scroll down to see how the top bar stays fixed while the content
            scrolls.
          </p>
        </div>
        <div className="h-[1000px]">
          {/* This extra content ensures scrollability */}
          <p>More content here to demonstrate scrolling...</p>
        </div>
      </div>
    </div>
    )
}

export default StudentPage;