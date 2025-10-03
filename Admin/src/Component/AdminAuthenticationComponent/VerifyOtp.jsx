import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {

    const [verifyotp, setVerifyotp] = useState({
        otp: ""
    });

    const[otpError, setOtpError] = useState("");

    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleVerifyOtp = (e) => {
        const { name, value } = e.target;
        setVerifyotp({ ...verifyotp, [name]: value });
    }

    const handleSubmitVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3002/admin/admin_otpverify", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(verifyotp)
            })
            const data = await response.json();
            if(!response.ok){
                throw data;
            }

            navigate("/adminlogin");
            return data;
        } catch (error) {
            if(error.message){
                setOtpError(error.message);
            }else{
                setOtpError("Error to verify otp");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        OTP Verification
                    </h1>

                    <p className="text-gray-600 text-center mb-4">
                        Please enter the OTP sent to your email to verify your account.
                    </p>

                    {otpError && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                            {otpError}
                        </div>
                    )}

                    <form onSubmit={handleSubmitVerifyOtp} className="space-y-5">
                        <input
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="otp"
                            value={verifyotp.otp}
                            onChange={handleVerifyOtp}
                            placeholder="Enter OTP"
                            required
                        />

                        {loading ? (
                            <span className="flex items-center justify-center bg-blue-600 py-3 rounded-lg text-white">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                            >
                                Verify OTP
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default VerifyOtp 