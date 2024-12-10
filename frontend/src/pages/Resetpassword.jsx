/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import myimage from '../assets/jklulogo.png'
import ButtonComp from "../components/ButtonComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Resetpassword(){
    const [Password , setPassword] = useState('');
    const [ConfirmPassword , setConfirmPassword] = useState('');
    const [Error , setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
          // Input validation
          if (Password === "" || ConfirmPassword === "") {
            setError({
              password: Password === "" ? "Password is required*" : "",
              confirmpasswordreq: ConfirmPassword === "" ? "Confirm password is required*" : "",
            });
            return;
          }
      
          if (Password !== ConfirmPassword) {
            setError({
              password: "",
              confirmpasswordreq : "",
              confirmpassword: "Passwords do not match*",
            });
            return; // Stop execution if passwords do not match
          }
      
          if (Password.length < 6 || ConfirmPassword < 6) {
            setError({
              password: "",
              confirmpasswordreq : "",
              passwordlen: "Password must be at least 6 characters long*",
            });
            return;
          }
      
          setError({
            password: "",
            confirmpassword: "",
            confirmpasswordreq: "",
          });
      
          // Extract token from the current URL
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get("token");
      
          if (!token) {
            setError({ general: "Invalid or missing token. Please try again." });
            return;
          }
      
          // Prepare the updated password data
          const updatedPassword = { password: Password };
      
          // API call to reset the password
          const response = await axios.post(
            `http://localhost:3000/api/v1/resetpassword?token=${encodeURIComponent(token)}`,
            updatedPassword
          );
      
          if (response.status === 200) {
            Swal.fire({
                title: 'Success!',
                text: 'Password has been successfully updated.',
                icon: 'success',
                confirmButtonText: 'Okay',
            });
            navigate("/login");
          }
        } catch (error) {
          console.error("Error during password reset:", error);
      
          // Handle specific error responses
          if (error.response?.data?.error) {
            setError({
              general: error.response.data.error,
            });
          } else {
            setError({
              general: "An unexpected error occurred. Please try again later.",
            });
          }
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
                        <p className="text-center text-md text-gray-400 font-semibold ">Enter your new password</p>
                    </div>
                    <InputField text="New password" inputplaceholder="********" type="password" onChange={(e) => setPassword(e.target.value)} error={Error.password}></InputField>
                    <InputField text="Confirm new password" inputplaceholder="********" type="password" onChange={(e) => setConfirmPassword(e.target.value)} error={Error.confirmpasswordreq}></InputField>


                    <ButtonComp text="Reset Password" onClick={handleSubmit}></ButtonComp>
                    <div className="pt-1"></div>
                    {Error.confirmpassword && <p className="italic text-center text-red-500 text-xs mt-1">{Error.confirmpassword}</p>}
                    {Error.passwordlen && <p className="italic text-center text-red-500 text-xs mt-1">{Error.passwordlen}</p>}
                    {Error.general && <p className="italic text-center text-red-500 text-xs mt-1">{Error.general}</p>}

                </div>


            </div>
        </div>


    )
}

export default Resetpassword;