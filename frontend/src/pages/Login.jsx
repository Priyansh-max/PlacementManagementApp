/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useState , useEffect } from "react";
import { Link , useNavigate } from 'react-router-dom';
import ButtonComp from "../components/ButtonComp";
import myimage from '../assets/jklulogo.png';
import axios from "axios";


function Login(){
    const [staySignedIn, setStaySignedIn] = useState(true);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [Error , setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/studentpage");
        }
    }, [navigate]); // Dependency array ensures navigation is stable

    const handleCheckboxChange = () => {
        setStaySignedIn(!staySignedIn);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email == "" || password == ""){
            setError({
                email : email === "" ? "Username is required*" : "",
                password : password === "" ? "Password is required*" : "",
            })
        }
        else{
            setError({})
            setIsLoading(true)
            try{
                const response = await axios.post("http://localhost:3000/api/v1/login", {
                    email,
                    password
                }) 
    
                if(response.status == 200){
                    localStorage.setItem("token", response.data.token);
                    setIsLoading(false);
                    navigate("/studentpage")
                }

    
            }catch(error){
                if (error.response && error.response.data.message) {
                    setError({ message: error.response.data.message });
                } else {
                    setError({ message: "Something went wrong. Please try again later" });
                }
            }finally {
                setIsLoading(false);
            }
        }       
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
            <div className="flex flex-col items-center w-full mt-10">
                <div>
                    <img src={myimage} alt="JKLU" className="rounded-full h-[150px]"></img>
                </div>

                <div className="w-full max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-[380px] px-2 py-5 space-y-4 bg-white rounded-lg shadow-2xl">
                    <Header heading="Login"></Header>
                    <InputField onChange={(e) => {
                        setEmail(e.target.value);
                    }}text="Email" inputplaceholder="name@jklu.edu.in" type="text" error={Error.email}></InputField>
                    <InputField onChange={(e) => {
                        setPassword(e.target.value);
                    }} text="Password" inputplaceholder="*********" type="password" error={Error.password}></InputField>
                    <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0 px-5">
                        <div className="flex items-center space-x-1">
                            <input type="checkbox" checked={staySignedIn} onChange={handleCheckboxChange} className="form-checkbox h-3 w-3 text-blue-600 focus:border-transparent"/>
                            <span className="text-grey text-sm font-semibold space-x-2"> Stay signed in</span>
                        </div>
                        <div>
                        <Link to="/troublesigning" className="font-semibold text-blue-500 text-sm hover:underline duration-300 ease-out-in">Forget password?</Link>
                        </div>
                    </div>
                    <ButtonComp onClick={handleSubmit}
                    text={isLoading ? "Logging in..." : "Login"}>

                    </ButtonComp>
                    {Error.message && <p className="italic text-center text-red-500 text-xs mt-1">{Error.message}</p>}

                    <div className="flex items-center justify-center">
                        <Link to="/signup" className="font-semibold text-blue-500 text-sm hover:underline duration-300 ease-out-in">Create an account</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;

