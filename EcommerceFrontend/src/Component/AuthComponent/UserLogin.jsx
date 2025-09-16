import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState("");
    const [passwordHide, setPasswordHide] = useState(true);


    const handleUserLogin = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
    };

    const handlePasswordHide = () => {
        setPasswordHide(!passwordHide);
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
            });

            const data = await response.json();

            if (!response.ok) throw data;

            navigate("/homepage");
            return data;
        } catch (error) {
            if (error.message) {
                setLoginError(error.message);
            } else {
                setLoginError("User not login: An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Login</h1>

                {loginError && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                        {loginError}
                    </div>
                )}

                <form onSubmit={handleSubmitLogin} className="space-y-5">
                    <div className='relative flex items-center'>
                        <Mail className='absolute left-1 text-gray-400'/>
                        <input
                            className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            value={userLogin.email}
                            onChange={handleUserLogin}
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className='relative flex items-center'>
                        <Lock className='absolute left-1 text-gray-400'/>
                        <input
                            className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="password"
                            value={userLogin.password}
                            onChange={handleUserLogin}
                            type={passwordHide ? "password" : "text"}
                            placeholder="Password"
                            required
                        />
                        {passwordHide ? <Eye className='absolute w-10 right-0 pr-3 cursor-pointer' onClick={handlePasswordHide} /> : <EyeOff className='absolute w-10 right-0 pr-3 cursor-pointer' onClick={handlePasswordHide} />}
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <NavLink to="/resetPassword" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </NavLink>
                </div>

                <div className="mt-6 text-center text-gray-600">
                    <p>
                        Don’t have an account?{' '}
                        <NavLink to="/" className="text-blue-500 hover:underline">
                            Register Now
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
