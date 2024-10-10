import React, { useState } from 'react'
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

const Signup = () => {
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const handleRagister = async (e) => {
    e.preventDefault();
    // Send data to the server

    try {
        const { data } = await axios.post(
            "http://localhost:2000/user/signup",
            {
                username,
                email,
                password,
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        toast.success(data.message || "Signup successful!"); // Display success message
        navigateTo('/login')
        localStorage.setItem("jwt",data.token)
        setUsername("");
        setEmail("");
        setPassword("");
    } catch (error) {
      
        // Corrected typo here and improved alert message
        toast.error(error.response?.data?.errors || "User failed to signup!"); 
    }
};



  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-[80%] sm:w-[60%] md:w-[40%] lg:w-[27%]  mx-auto p-6 border-2 rounded-md bg-[#62cff4] shadow-lg '>
        <h1 className='text-center text-3xl mb-3'>Sign Up</h1>
        <form onSubmit={handleRagister} className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">UserName</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" autoComplete="name"  className='py-1 pl-1 outline-none focus:none rounded-sm text-[14px] text-gray-700' placeholder='enter your username' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" autoComplete="email"  className='py-1 pl-1 outline-none focus:none rounded-sm text-[14px] text-gray-700' placeholder='enter your eamil' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password"  className='py-1 pl-1 outline-none focus:none rounded-sm text-[14px] text-gray-700' placeholder='enter your password' />
          </div>

          <button type='submit' className='mt-3 md:mt-5 bg-blue-700 rounded-sm p-1 text-xl'>Sign up</button>
          <p className='mt-3 md:mt-5 text-center text-sm'>Already have an account? <Link className='text-blue-700 hover:underline text-[16px] font-medium' to={"/login"}>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup