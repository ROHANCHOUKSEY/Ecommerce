import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import { useNavigate } from "react-router-dom"


const NewPassword = () => {

    const { resetEmail } = useContext(AppContext);

    const [userNewPassword, setUsernewPassword] = useState({
        newPassword: "",
    })

    const[newPasswordError, setNewPasswordError] = useState([]);

    const navigate = useNavigate();

    const handleuserNewPassword = (e) => {
        const{name, value} = e.target;
        setUsernewPassword({...userNewPassword, [name] : value})
    }

    const hanldeSubmitNewPassword = async (e) => {

        try {
            e.preventDefault();
            const response = await fetch("http://localhost:3002/user/newPassword", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: resetEmail,
                    newPassword: userNewPassword.newPassword
                })
            })
            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            navigate("/userLogin");

            return data;

        } catch (error) {
            if(error.message){
                setNewPasswordError(error.message.map((err) => err.msg));
            }else {
                setregisteredError(["An unexpected error occurred"]);
            }
        }


    }

    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='w-60 h-auto border-2 border-gray-500 rounded-2xl  py-10'>
                    {newPasswordError.map((error) => (
                        <p>{error}</p>
                    ))}
                    <form onSubmit={hanldeSubmitNewPassword}>
                        <div className='flex flex-col justify-center px-2 gap-5'>
                            <h1 className='text-center'>New Password</h1>
                            <input className='border-2 border-gray-400 p-2 focus:outline-0' name="newPassword" value={userNewPassword.newPassword} onChange={handleuserNewPassword} type="password" placeholder='New Password' required />
                            <div className='w-full flex justify-center'>
                                <button type='submit' className='text-white bg-green-400 hover:bg-green-500 p-2 cursor-pointer rounded-md  '>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPassword