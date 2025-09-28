import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";

const AdminRegistration = () => {
    const [adminregistration, setAdminregistration] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const [registrationError, setRegistrationError] = useState([]);
    const [showPassword, setShowPassoword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassoword] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUserRegistration = (e) => {
        const { name, value } = e.target;
        setAdminregistration({ ...adminregistration, [name]: value });
    }

    const handleShowPassword = () => {
        setShowPassoword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassoword(!showConfirmPassword);
    }


    const handle_SubmitRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3002/admin/adminregistration", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...adminregistration })
            })

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            navigate("/adminlogin");
            return data;
        } catch (error) {
            if (error.errors) {
                setRegistrationError(error.errors.map((err) => err.msg));
            } else if (error.message) {
                setRegistrationError([error.message])
            } else {
                setRegistrationError(["An unexpected error occurred"]);
            }
        } finally {
            setLoading(false);
        }


    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Registration</h1>

                    {registrationError.length > 0 &&
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {registrationError.map((error, idx) => (
                                <ul>
                                    <li key={idx} className="text-sm">{error}</li>
                                </ul>
                            ))}
                        </div>
                    }

                    <form onSubmit={handle_SubmitRegistration} className="space-y-5">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className='relative flex items-center'>
                                <User className='absolute left-1 text-gray-400' />
                                <input
                                    className="w-full flex-1 p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="firstname"
                                    value={adminregistration.firstname}
                                    onChange={handleUserRegistration}
                                    type="text"
                                    placeholder="First Name"
                                    required
                                />
                            </div>

                            <div className='relative flex items-center'>
                                <User className='absolute left-1 text-gray-400' />
                                <input
                                    className="w-full flex-1 p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="lastname"
                                    value={adminregistration.lastname}
                                    onChange={handleUserRegistration}
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>

                        </div>

                        <div className='relative flex items-center'>
                            <Mail className='absolute left-1 text-gray-400' />
                            <input
                                className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="email"
                                value={adminregistration.email}
                                onChange={handleUserRegistration}
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div className='relative flex items-center'>
                            <Lock className='absolute left-1 text-gray-400' />
                            <input
                                className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="password"
                                value={adminregistration.password}
                                onChange={handleUserRegistration}
                                type={showPassword ? "password" : "text"}
                                placeholder="Password"
                                required
                            />
                            {showPassword ? <Eye className='absolute w-10  right-0 pr-3 flex items-center cursor-pointer text-gray-500' onClick={handleShowPassword} /> : <EyeOff className='absolute w-10 inset-y-3 right-0 pr-3 flex items-center cursor-pointer text-gray-500' onClick={handleShowPassword} />}
                        </div>

                        <div className='relative flex items-center'>
                            <Lock className='absolute left-1 text-gray-400' />
                            <input
                                className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="confirm_password"
                                value={adminregistration.confirm_password}
                                onChange={handleUserRegistration}
                                type={showConfirmPassword ? "password" : "text"}
                                placeholder="Confirm Password"
                                required
                            />
                            {showConfirmPassword ? <Eye className='absolute w-10 right-0 pr-3 flex items-center cursor-pointer text-gray-500' onClick={handleShowConfirmPassword} /> : <EyeOff className='absolute w-10 right-0 inset-y-3 pr-3 flex items-center cursor-pointer text-gray-500' onClick={handleShowConfirmPassword} />}
                        </div>
                        {loading ? (<span className="flex items-center justify-center bg-blue-600 py-3 rounded-lg text-white">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing....
                        </span>) : <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
                        >
                            Register
                        </button>}
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <NavLink to="/adminlogin" className="text-blue-600 hover:underline">
                            Login Now
                        </NavLink>
                    </p>

                    <p className="text-center text-gray-400 text-sm mt-4">
                        By registering, you agree to our <span className="text-blue-500 cursor-pointer">Terms of Service</span> and <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </>
    )
}

export default AdminRegistration