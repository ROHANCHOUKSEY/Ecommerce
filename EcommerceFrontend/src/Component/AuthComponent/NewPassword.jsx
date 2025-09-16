import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/ContextProvider';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from 'lucide-react';

const NewPassword = () => {
    const { resetEmail } = useContext(AppContext);
    const [userNewPassword, setUsernewPassword] = useState({ newPassword: "" });
    const [newPasswordError, setNewPasswordError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [passwordHide, setPasswordHide] = useState(true);

    const navigate = useNavigate();

    const handleHidePassword = () => {
        setPasswordHide(!passwordHide);
    }

    const handleuserNewPassword = (e) => {
        const { name, value } = e.target;
        setUsernewPassword({ ...userNewPassword, [name]: value });
    };

    const hanldeSubmitNewPassword = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3002/user/newPassword", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: resetEmail,
                    newPassword: userNewPassword.newPassword
                })
            });

            const data = await response.json();
            if (!response.ok) throw data;

            navigate("/userLogin");
            return data;
        } catch (error) {
            if (error.message) {
                setNewPasswordError(error.message.map((err) => err.msg));
            } else {
                setNewPasswordError(["An unexpected error occurred. Please try again."]);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Set New Password
                </h1>

                <p className="text-gray-600 text-center mb-4">
                    Please enter your new password for the account: <span className="font-medium text-blue-600">{resetEmail}</span>
                </p>

                {newPasswordError.length > 0 && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                        {newPasswordError.map((error, idx) => (
                            <p key={idx}>{error}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={hanldeSubmitNewPassword} className="space-y-5">
                    <div className='relative flex items-center'>
                        <Lock className='absolute left-1 text-gray-400' />
                        <input
                            className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type={passwordHide ? "password" : "text"}
                            name="newPassword"
                            value={userNewPassword.newPassword}
                            onChange={handleuserNewPassword}
                            placeholder="New Password"
                            required
                        />
                        {passwordHide ? <Eye className='w-10 absolute right-0' onClick={handleHidePassword} /> : <EyeOff className='w-10 absolute right-0' onClick={handleHidePassword} />}
                    </div>

                    {loading  ? (<span className="flex items-center justify-center bg-blue-600 py-3 rounded-lg text-white">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing....
                    </span>) : <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
                    >
                        Submit New Password
                    </button>}
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Remembered your password?{' '}
                    <a href="/userLogin" className="text-blue-500 hover:underline">
                        Login Now
                    </a>
                </p>
            </div>
        </div>
    );
};

export default NewPassword;
