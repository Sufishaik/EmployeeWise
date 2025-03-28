import React, { useEffect, useState } from 'react'
import LoginLogo from '../../assets/LoginLogo'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const validateFunc = () => {
        if (!email) {
            return toast.error("Enter mail please")
        }
        if (!password) {
            return toast.error("Enter password please")
        }
    }
    const handleSubmit = async () => {
        try {
            if (validateFunc()) {
                return
            }
            else {
                const resp = await fetch('https://reqres.in/api/login', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                const data = await resp.json();
                if (resp.ok) {
                    console.log("Login successful:", data);
                    localStorage.setItem("authToken", data.token);
                    toast.success("Login Successfully")

                    navigate("/");
                    // Store token in localStorage
                } else {
                    return toast.error("Invalid Email and password")
                }
            }

        } catch (err) {
            console.log("Error")
            return toast.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='bg-white mt-[7rem] flex w-[80vw] sm:w-[35vw] lg:w-[25vw] flex-col h-[500px] rounded-[1rem]'>
                <div className='flex flex-col mt-[4rem] items-center gap-[4rem]'>
                    <div className='flex flex-col items-center gap-4 '>
                        <p className='text-[28px] text-center'>We are <span className='font-bold'>Login</span></p>
                        <LoginLogo />
                    </div>

                    <div className='flex flex-col gap-5 w-[60vw]  sm:w-[20vw] lg:w-[20vw]'>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border-b-[1px] px-1 py-2 outline-none' />
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='border-b-[1px] px-1 py-2 outline-none' />
                        <button className='bg-[#a64bf4] p-2 rounded-[1rem] text-white' onClick={handleSubmit}>LOG IN</button>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
