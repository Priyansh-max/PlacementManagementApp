// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../components/Header";
import myimage from '../assets/jklulogo.png'
import myimage2 from '../assets/complete.png'
import ButtonComp from "../components/ButtonComp";

function Resetpasswordsuccess(){
    return(
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[430px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <div className="flex items-center justify-center">
                        <img  src={myimage2} alt="JKLU" className="w-[220px] h-[230px]"></img>
                    </div>
                    
                    <Header heading="Your password has been reset!"></Header>
                    <div className="flex flex-col items-center justify-center px-5">
                        <p className="text-center text-md text-gray-400 font-semibold ">Sign in again with your new password</p>
                        
                    </div>
                    <ButtonComp text="Return to Sign in"></ButtonComp>
                    <div className="pt-2"></div>
                </div>
            </div>
        </div>

    )
}

export default Resetpasswordsuccess;