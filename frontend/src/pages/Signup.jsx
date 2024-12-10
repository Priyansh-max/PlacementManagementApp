/* eslint-disable no-unused-vars */
import React  from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useState} from "react";
import { Link , useNavigate } from 'react-router-dom';
import ButtonComp from "../components/ButtonComp";
import myimage from '../assets/jklulogo.png'
import { FaTimes } from 'react-icons/fa'
import OtpInput from 'react-otp-input';
import axios from "axios"
import InputFieldEmail from "../components/InputFieldEmail";

function Signup(){
    const [staySignedIn, setStaySignedIn] = useState(true);
    const [Email , setEmail] = useState('');
    const [Password , setPassword] = useState('');
    const [ConfirmPassword , setConfirmPassword] = useState('');
    const [Error , setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isVerified , setIsVerified] = useState(false);
    const [OTP , setOTP] = useState('');
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setStaySignedIn(!staySignedIn);
    };

    function validateEmail(email) {
        const emailRegex = /^([a-zA-Z0-9._%+-]+)@jklu\.edu\.in$/;
        return emailRegex.test(email);
    }


    const handleVerifyClick = async () => {
        setOTP('')
        if(Email == "" || validateEmail(Email) == false){
            setError({OTP : "Please enter a valid email of the form @jklu.edu.in"})
        }
        else{
            setIsOverlayVisible(true)
            setError({})
            try{
                const response = await axios.post("http://localhost:3000/api/v1/send-verification-email" , {
                    email : Email
                })

                setIsLoading(true);

                if(response.status == 200){
                    setIsLoading(false);

                }

            }catch(error){
                if (error.response && error.response.data.message) {
                    setError({ message: error.response.data.message });
                } else {
                    setError({ message: "Something went wrong. Please try again later." });
                }

            }
        } 
    };

    const handleCloseOverlay = () => {
        setIsOverlayVisible(false);
    };

    const handleOtpSubmit = async (e) => {
        console.log(OTP)
        e.preventDefault();
        
        // Check if OTP is empty
        if (OTP === "") {
            setError({ message : "Enter an OTP" });
            return; // Exit early if OTP is not provided
        }
        
        setError({}); 
        
        try {
            const response = await axios.post("http://localhost:3000/api/v1/verify-code", {
                email: Email,
                code: OTP,
            });
    
            if (response.status === 200) {
                setIsVerified(true);
                setIsOverlayVisible(false);
            }
        } catch (error) {
            const apiError = error.response?.data?.error || "Something went wrong. Please try again.";
            setError({ message : apiError });
        } finally {
            setIsLoading(false); 
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
          // Input validation
          if (!isVerified || Password === "" || ConfirmPassword === "" || Email === "") {
            setError({
              email : Email === "" ? "Email is must*" : "",
              password: Password === "" ? "Password is required*" : "",
              verified: !isVerified ? "Please verify your email by clicking on the ! mark*" : "",
              confirmpasswordreq: ConfirmPassword === "" ? "Confirm password is required*" : "",
            });
            return; // Stop execution if any field is empty
          }
      
          if (Password !== ConfirmPassword) {
            setError({
              email: "",
              password: "",
              confirmpassword: "Passwords do not match*",
            });
            return; // Stop execution if passwords do not match
          }
      
          // Clear errors if all validations pass
          setError({ email: "", password: "", confirmpassword: ""  , verified : "" , confirmpasswordreq : ""});
      
          // Prepare signup data
          const signupData = {
            email: Email,
            password: Password,
          };
      
          const response = await axios.post("http://localhost:3000/api/v1/signup", signupData);
      
          if (response.status === 201) {
            localStorage.setItem("token", response.data.token);
            navigate("/profile");
          } 

         }catch (error) {
          console.error("Signup error:", error);
      
          // Handle API or network errors
          setError({
            email: "",
            password: "",
            confirmpassword: "",
            general: "Password must be alleast 6 character long.",
          });
        }
      };
      

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[380px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Create account"></Header>
                    <InputFieldEmail onChange={(e) => {
                        setEmail(e.target.value);
                    }}text="Email" inputplaceholder="name@jklu.edu.in" type="text" error={`${Error.OTP || ""} ${Error.email || ""}`.trim()} handleVerifyClick={handleVerifyClick} verified={isVerified}></InputFieldEmail>
                    <InputField onChange={(e) => {
                        setPassword(e.target.value);
                    }}text="Password" inputplaceholder="*********" type="password" error={Error.password}></InputField>
                    <InputField onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}text="Confirm password" inputplaceholder="*********" type="password" error={Error.confirmpasswordreq}></InputField>
                    <div className="flex items-center space-x-1 px-5">
                        <input type="checkbox" checked={staySignedIn} onChange={handleCheckboxChange} className="form-checkbox h-3 w-3 text-blue-600 focus:border-transparent"/>
                        <span className="text-grey text-sm font-semibold space-x-2"> Stay signed in</span>
                    </div>
                    <ButtonComp onClick={handleSignup} text="Register your account"></ButtonComp>
                    {Error.confirmpassword && <p className="italic text-center text-red-500 text-xs mt-1">{Error.confirmpassword}</p>}
                    {Error.verified && <p className="italic text-center text-red-500 text-xs mt-1">{Error.verified}</p>}
                    {Error.errormessage && <p className="italic text-center text-red-500 text-xs mt-1">{Error.errormessage}</p>}
                    {Error.general && <p className="italic text-center text-red-500 text-xs mt-1">{Error.general}</p>}
                    <div className="flex flex-row justify-center pt-3 px-6 pb-4">
                        <p className="text-sm font-semibold text-center mr-2 text-grey">Already have an account?</p>
                        <Link to="/" className="font-semibold text-blue-500 text-sm hover:underline duration-300 ease-out-in">Sign in</Link>
                    </div>
                </div>
            </div>

            {isOverlayVisible && (
                <div
                className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                onClick={handleCloseOverlay}
                >
                {/* Prevent closing when clicking inside the form */}
                    <div
                        className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                        onClick={handleCloseOverlay}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                        <FaTimes size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
                        <h2 className="text-sm mb-4">An email at <span className="text-red-500">{Email}</span> with an otp has been sent to you</h2>
                        <form onSubmit={handleOtpSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter Otp</label>
                                <OtpInput
                                    id="otp-input"
                                    value={OTP}
                                    onChange={setOTP}
                                    numInputs={4}
                                    separator={<span>|</span>}
                                    renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="m-2 h-6 text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    />
                                    )}
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleOtpSubmit}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Submit
                            </button>
                            {Error.message && <p className="italic text-center text-red-500 text-xs mt-1">{Error.message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signup;

