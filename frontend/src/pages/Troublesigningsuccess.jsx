// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../components/Header";
import myimage from '../assets/jklulogo.png'
import ButtonComp from "../components/ButtonComp";
import { useNavigate , useParams } from 'react-router-dom';
import { decryptText } from "../utils/cryptoUtils.js";

function Troublesigningsuccess(){
    const navigate = useNavigate();
    const { encryptedEmail } = useParams();
    const decryptedEmail = encryptedEmail ? decryptText(decodeURIComponent(encryptedEmail)) : "N/A";

    return(
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[380px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Email sent"></Header>
                    <div className="flex flex-col items-center justify-center px-5">
                        <p className="text-center text-md text-gray-400 font-semibold ">A link to reset your password has been sent to you on:</p>
                        <p className="text-center pt-1 text-md text-gray-600 font-semibold ">{decryptedEmail}</p>
                    </div>
                    <ButtonComp onClick={() => {
                        navigate("/");
                    }} text="Return to Sign in"></ButtonComp>
                    <div className="pt-0.5"></div>
                </div>
            </div>
        </div>

    )
}

export default Troublesigningsuccess;