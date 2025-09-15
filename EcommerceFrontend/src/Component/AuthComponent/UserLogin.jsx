import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const UserLogin = () => {

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

    const [loginError, setLoginError] = useState("");

    const handleUserLogin = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3002/user/userLogin", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userLogin)
            })
            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            navigate("/homepage");

            return data;
        } catch (error) {
            if (error.message) {
                setLoginError(error.message);
            } else {
                setLoginError("User not login: ", error);
            }
        }

    }

    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='w-80 border-2 border-gray-400 rounded-md'>
                    {<p>{loginError}</p>}
                    <div className='flex flex-col justify-center '>
                        <h1 className='text-center'>User Login</h1>
                        <form onSubmit={handleSubmitLogin}>
                            <div className='flex flex-col justify-center gap-5 p-5'>
                                <input className='border-2 border-gray-400 rounded-md p-2 focus:outline-0' name='email' value={userLogin.email} onChange={handleUserLogin} type="text" placeholder='Email' />
                                <input className='border-2 border-gray-400 rounded-md p-2 focus:outline-0' name='password' value={userLogin.password} onChange={handleUserLogin} type="password" placeholder='Passowrd' />
                                <div className='w-full flex justify-center'>
                                    <button type='submit' className='rounded-md text-white bg-green-400 cursor-pointer p-2'>Login</button>
                                </div>
                                <div className='text-red-500'>
                                    <NavLink to="/resetPassword">Forget Password</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin