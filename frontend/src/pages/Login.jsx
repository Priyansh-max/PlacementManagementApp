/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useState } from "react";
import { Link } from 'react-router-dom';
import ButtonComp from "../components/ButtonComp";
import myimage from '../assets/jklulogo.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Login(){
    const [staySignedIn, setStaySignedIn] = useState(true);

    const handleCheckboxChange = () => {
        setStaySignedIn(!staySignedIn);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[360px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Login"></Header>
                    <InputField text="Email" inputplaceholder="name@jklu.edu.in" type="text"></InputField>
                    <InputField text="Password" inputplaceholder="*********" type="password"></InputField>
                    <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0 px-5">
                        <div className="flex items-center space-x-1">
                            <input type="checkbox" checked={staySignedIn} onChange={handleCheckboxChange} className="form-checkbox h-3 w-3 text-blue-600 focus:border-transparent"/>
                            <span className="text-grey text-sm font-semibold space-x-2"> Stay signed in</span>
                        </div>
                        <div>
                            <p className="text-blue-500 text-sm">Forget password?</p>
                        </div>
                    </div>

                    <ButtonComp text="Login"></ButtonComp>

                    <div className="flex items-center justify-center">
                        <p className="font-semibold text-blue-500 text-sm">Create an account</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;

