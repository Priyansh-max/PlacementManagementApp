/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useState } from "react";
import { Link , useNavigate } from 'react-router-dom';
import ButtonComp from "../components/ButtonComp";
import myimage from '../assets/jklulogo.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup(){
    const [staySignedIn, setStaySignedIn] = useState(true);
    const [Email , setEmail] = useState('');
    const [Password , setPassword] = useState('');
    const [ConfirmPassword , setConfirmPassword] = useState('');
    const [Error , setError] = useState({});
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setStaySignedIn(!staySignedIn);
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[380px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Create account"></Header>
                    <InputField onChange={(e) => {
                        setEmail(e.target.value);
                    }}text="Email" inputplaceholder="name@jklu.edu.in" type="text" error={Error.email}></InputField>
                    <InputField onChange={(e) => {
                        setPassword(e.target.value);
                    }}text="Password" inputplaceholder="*********" type="password" error={Error.password}></InputField>
                    <InputField onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}text="Confirm password" inputplaceholder="*********" type="password" error={Error.confirmpassword}></InputField>
                    <div className="flex items-center space-x-1 px-5">
                        <input type="checkbox" checked={staySignedIn} onChange={handleCheckboxChange} className="form-checkbox h-3 w-3 text-blue-600 focus:border-transparent"/>
                        <span className="text-grey text-sm font-semibold space-x-2"> Stay signed in</span>
                    </div>
                    <ButtonComp onClick={async () => {
                        if(Email == "" || Password == "" || ConfirmPassword == ""){
                            setError({
                                email : Email === "" ? "Email is required*" : "",
                                password : Password === "" ? "Password is required" : "",
                                confirmpassword : ConfirmPassword === "" ? "Confirm password is required" : "",
                            })
                        }
                        else{
                            navigate("/studentpage");
                        }
                    }}text="Register your account"></ButtonComp>
                    <div className="flex flex-row justify-center pt-3 px-6 pb-4">
                        <p className="text-sm font-semibold text-center mr-2 text-grey">Already have an account?</p>
                        <Link to="/" className="font-semibold text-blue-500 text-sm hover:underline duration-300 ease-out-in">Sign in</Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Signup;

