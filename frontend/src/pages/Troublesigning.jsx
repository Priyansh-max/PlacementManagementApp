/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import myimage from '../assets/jklulogo.png'
import ButtonComp from "../components/ButtonComp";
import { Link , useNavigate } from 'react-router-dom';
import { encryptText } from "../utils/cryptoUtils.js";
import axios from "axios";

function Troublesigning(){
    const [Email , setEmail] = useState("");
    const [Error , setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function validateEmail(email) {
        const emailRegex = /^([a-zA-Z0-9._%+-]+)@jklu\.edu\.in$/;
        return emailRegex.test(email);
    }

    const handleEncryptAndNavigate = async () => {
        try {
          // Check if the email field is empty
          if (Email === "") {
            setError({
              email: Email === "" ? "Email is required*" : "",
            });
            return; // Stop execution if email is empty
          }

          if(Email !== "" && validateEmail(Email) === false){
            setError({
                invalid: validateEmail(Email) === false ? "Email should be of the form @jklu.edu.in*" : "",
              });
              return;
          }

          setIsLoading(true);
      
          // Clear previous errors if validation passes
          setError({
            email: "",
            invalid : ""
          });
      
          // Encrypt the email using the encryptText function
          const encryptedEmail = encryptText(Email);

          const response = await axios.post("http://localhost:3000/api/v1/forgetpassword", {
            email: Email,
          });
    
          if (response.status === 200) {
            console.log("Forget password request successful:", response.data);
            navigate(`/troublesigningsuccess/${encodeURIComponent(encryptedEmail)}`)
          }

        } catch (error) {
          console.error("Error during email encryption or navigation:", error);
          setError({
            general: "An unexpected error occurred. Please try again later.",
          });
        }finally {
            // Stop loading after the API call completes
            setIsLoading(false);
        }
    };
      

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
                    <InputField onChange={(e) => {
                        setEmail(e.target.value);
                    }}text="Email" inputplaceholder="name@jklu.edu.in" type="text" error={`${Error.email || ""} ${Error.invalid || ""}`.trim()}></InputField>
                    <ButtonComp onClick={handleEncryptAndNavigate}
                    text={isLoading ? "Processing..." : "Submit"} disabled={isLoading}></ButtonComp>
                    {Error.general && <p className="italic text-center text-red-500 text-xs mt-1">{Error.general}</p>}

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