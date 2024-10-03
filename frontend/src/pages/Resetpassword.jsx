/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import myimage from '../assets/jklulogo.png'
import ButtonComp from "../components/ButtonComp";

function Resetpassword(){
    const [password, setPassword] = useState('')

    return (

        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[380px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Reset your password"></Header>
                    <div className="flex items-center justify-center px-5">
                        <p className="text-center text-md text-gray-400 font-semibold ">Enter your new password</p>
                    </div>
                    <InputField text="New password" inputplaceholder="********" type="password" onChange={(e) => setPassword(e.target.value)}></InputField>
                    <InputField text="Confirm new password" inputplaceholder="********" type="password" onChange={(e) => setPassword(e.target.value)}></InputField>


                    <ButtonComp text="Reset Password"></ButtonComp>
                    <div className="pt-1"></div>

                </div>


            </div>
        </div>


    )
}

export default Resetpassword;