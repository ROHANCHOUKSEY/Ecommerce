import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {

  const navigate = useNavigate();

  const [verifyOtp, setVerifyOtp] = useState({
    otp: "",
  })

  const [optError, setOtpError] = useState("");

  const handleVerifyOtp = (e) => {
    const { name, value } = e.target;
    setVerifyOtp({...verifyOtp ,[name]: value });
  }

  const handleSubmitVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/user/verifyOtp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(verifyOtp)
      })

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      navigate("/userLogin");


      return data;


    } catch (error) {
      if (error.message) {
        setOtpError(error.message);
      } else {
        console.log("Another Error During Verify Otp: ", error);
      }
    }

  }

  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-70 h-50 flex flex-col justify-center items-center align-middle border-2 border-gray-500 rounded-md'>
          <form onSubmit={handleSubmitVerifyOtp}>
            {<p>{optError}</p>}
            <div className='w-full flex flex-col justify-center items-center gap-4'>
              <h1 className='text-center'>VerifyOTP</h1>
              <div className=''>
                <input className='border-2 border-gray-400 focus:outline-0' type="text" name='otp' value={verifyOtp.otp} onChange={handleVerifyOtp} placeholder='OTP' required />
              </div>
              <button type='submit' className='border-2 border-none bg-green-400 hover:bg-green-500 p-2 rounded-md text-white cursor-pointer'>
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyOtp