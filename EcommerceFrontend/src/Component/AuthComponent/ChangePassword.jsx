import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/ContextProvider';
import GetResetOtp from './GetResetOtp';

const ChangePassword = () => {

    const [forgetPassword, setForgetPassword] = useState({
        email: ""
    })

    const{setResetEmail} = useContext(AppContext);

    const [forgetPassErr, setForgetPassErr] = useState("");

    const [isResetOtpsent, setIsResetOtpSent] = useState(false);

    if (isResetOtpsent === true) {
        return <GetResetOtp />
    }

    const handleForgetPassword = (e) => {
        const { name, value } = e.target;
        setForgetPassword({ ...forgetPassword, [name]: value });
    }

    const SubmitForgetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3002/user/resetPassword", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(forgetPassword)
            })
            const data = await response.json();

            if (!response.ok) {
                throw data;
            }
            
            setResetEmail(forgetPassword.email);
            setIsResetOtpSent(true);

            return data;
        } catch (error) {
            if (error.message) {
                setForgetPassErr(error.message)
            } else {
                setForgetPassErr("Not Get ResetOtp: ", error);
            }
        }

        console.log(forgetPassErr);
    }

    return (
        <>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='w-70 h-50 flex flex-col justify-center border-2 border-gray-600 rounded-md'>
                    <form onSubmit={SubmitForgetPassword}>
                        <div className='flex flex-col px-6 gap-5 p-5'>
                            {<p>{forgetPassErr}</p>}
                            <h1 className='text-center'>Enter Your Email</h1>
                            <input className='border-2 border-gray-400 rounded-md focus:outline-0 p-2' type="email" name='email' value={forgetPassword.email} onChange={handleForgetPassword} placeholder='Email' />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type='submit' className='text-white p-2 rounded-md bg-green-400 hover:bg-green-500 cursor-pointer'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword