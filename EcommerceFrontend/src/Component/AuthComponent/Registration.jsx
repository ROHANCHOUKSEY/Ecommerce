import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Registration = () => {

    const [userRegistered, setUserRegistered] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [registeredError, setregisteredError] = useState([]);


    const navigate = useNavigate();

    const handleUserRegistration = (e) => {
        const { name, value } = e.target;
        setUserRegistered({ ...userRegistered, [name]: value })
    }

    const handle_SubmitRegistration = async (e) => {
        e.preventDefault();  // Prevent page refresh

        try {
            const response = await fetch("http://localhost:3002/user/userRegistration", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userRegistered })
            });
            const data = await response.json();

            if (!response.ok) {
                throw data;
            }   

            //send verification otp
            const sendOtp = await fetch("http://localhost:3002/user/sendotp", {
                method: "POST",
                credentials:"include",
            })

            const otpData = await sendOtp.json();

            if (!sendOtp.ok) {
                throw otpData
            }

            await navigate("/verifyOtp");

            return data;
            
        } catch (error) {
            if (error.error) {
                // Validation errors
                setregisteredError(error.error.map(err => err.msg));
            } else if (error.message) {
                // Other errors like "user is already registered"
                setregisteredError([error.message]);
            } else {
                setregisteredError(["An unexpected error occurred"]);
            }
        }
    }

    return (
        <>
            <div className='md:min-h-screen flex justify-center items-center m-5'>
                <div className='w-full md:w-100 border-2 border-gray-700 rounded-2xl'>
                    <div className='flex flex-col justify-center mt-5'>
                        {registeredError.map((error) => (
                            <div className='flex w-100'>
                                <p className='font-light text-red-500 text-center m-0'>{error}</p>
                            </div>
                        ))}
                        <h1 className='text-2xl font-bold text-center'>𝖱𝖤𝖦𝖨𝖲𝖳𝖱𝖠𝖳𝖨𝖮𝖭</h1>
                        <form onSubmit={handle_SubmitRegistration}>
                            <div className='flex flex-col justify-center px-4 md:px-10 py-4 md:py-6 gap-6'>
                                <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="firstname" value={userRegistered.firstname} onChange={handleUserRegistration} type="text" placeholder='First Name' required />
                                <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="lastname" value={userRegistered.lastname} onChange={handleUserRegistration} type="text" placeholder='Last Name' required />
                                <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="email" value={userRegistered.email} onChange={handleUserRegistration} type="email" placeholder='Email' required />
                                <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="password" value={userRegistered.password} onChange={handleUserRegistration} type="password" placeholder='Password' required />
                                <input className='border-2 h-10 md:h-15 border-gray-600 rounded-md md:rounded-lg focus:outline-0 p-3' name="confirm_password" value={userRegistered.confirm_password} onChange={handleUserRegistration} type="password" placeholder='Conform Password' required />
                                <div className='flex justify-center'>
                                    <button type='submit' className='flex justify-center border-2 border-gray-600 rounded-2xl focus:outline-0 p-3 w-40 cursor-pointer'>Registered</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration 