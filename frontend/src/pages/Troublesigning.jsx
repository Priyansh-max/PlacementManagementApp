/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import myimage from '../assets/jklulogo.png'
import ButtonComp from "../components/ButtonComp";
import { Link } from 'react-router-dom';

function Troublesigning(){
    return (

        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[380px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Reset your password"></Header>
                    <div className="flex items-center justify-center px-5">
                        <p className="text-center text-md text-gray-400 font-semibold ">Chill out!! enter your email address below, and we'll send you a link to reset your password</p>
                    </div>
                    <InputField text="Email" inputplaceholder="name@jklu.edu.in" type="text"></InputField>
                    <ButtonComp text="Submit"></ButtonComp>
                    <div className="flex flex-row justify-center px-6">
                        <p className="text-sm font-semibold text-center mr-2 text-grey">Return to </p>
                        <Link to="/" className="font-semibold text-blue-500 text-sm hover:underline duration-300 ease-out-in">Sign in</Link>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Troublesigning;