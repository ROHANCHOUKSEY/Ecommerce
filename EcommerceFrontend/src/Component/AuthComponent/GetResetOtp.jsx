import React, { useContext, useState } from 'react'
import NewPassword from './NewPassword';
import { AppContext } from '../../Context/ContextProvider';

const GetResetOtp = () => {

  const { resetEmail } = useContext(AppContext);

  const [resetOtp, setResetOtp] = useState({
    resetotp: "",
  })

  const [newPasswordError, setNewPassowrdError] = useState("");

  const [newPassword, setNewPassword] = useState(false);

  const handleResetOtp = (e) => {
    const { name, value } = e.target;
    setResetOtp({ ...resetOtp, [name]: value })
  }

  if (newPassword === true) {
    return <NewPassword />
  }

  const handleSubmitResetOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/user/newPassword", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail, resetotp: resetOtp.resetotp })
      })
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setNewPassword(true);

      return data;
    } catch (error) {
      if (error.message) {
        setNewPassowrdError(error.message);
      } else {
        setNewPassowrdError("Not Get ResetOtp: ", error);
      }
    }
  }

  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-70 h-60 border-2 border-gray-600 rounded-md'>
          <p>{newPasswordError}</p>
          <form onSubmit={handleSubmitResetOtp}>
            <div className='w-full flex flex-col justify-center p-5 gap-10'>
              <h1 className='text-center'>Reset OTP</h1>
              <input className='border-2 border-gray-400 p-2 focus:outline-0' name='resetotp' value={resetOtp.resetotp} onChange={handleResetOtp} type="text" placeholder='Enter Otp' required />
              <div className='w-full flex justify-center'>
                <button type='submit' className='text-white bg-green-400 hover:bg-green-500 rounded-md cursor-pointer p-2'>Submit Otp</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default GetResetOtp