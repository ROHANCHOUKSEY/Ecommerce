import React, { useContext, useState } from 'react';
import GetResetOtp from './GetResetOtp';
import { Mail } from "lucide-react";
import { AppContext } from '../../Context/AppContext';

const ChangePassword = () => {
  const [forgetPassword, setForgetPassword] = useState({ email: "" });
  const { setResetEmail } = useContext(AppContext);
  const [forgetPassErr, setForgetPassErr] = useState("");
  const [isResetOtpsent, setIsResetOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isResetOtpsent === true) {
    return <GetResetOtp />;
  }

  const handleForgetPassword = (e) => {
    const { name, value } = e.target;
    setForgetPassword({ ...forgetPassword, [name]: value });
  };

  const SubmitForgetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/user/resetPassword", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forgetPassword)
      });

      const data = await response.json();

      if (!response.ok) throw data;

      setResetEmail(forgetPassword.email);
      setIsResetOtpSent(true);

      return data;
    } catch (error) {
      if (error.message) {
        setForgetPassErr(error.message);
      } else {
        setForgetPassErr("Failed to send reset OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Forgot Your Password?
          </h1>

          {forgetPassErr && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
              {forgetPassErr}
            </div>
          )}

          <form onSubmit={SubmitForgetPassword} className="space-y-5">
            <p className="text-gray-600 text-center">
              Enter the email associated with your account and we'll send you a reset OTP.
            </p>

            <div className='relative flex items-center'>
              <Mail className='absolute left-1 text-gray-400' />
              <input
                className="w-full p-3 pl-[35px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                value={forgetPassword.email}
                onChange={handleForgetPassword}
                placeholder="Your email address"
                required
              />
            </div>

            {
              loading ? (<span className="flex items-center justify-center bg-blue-600 py-3 rounded-lg text-white">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing....
              </span>) :
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
                >
                  Send Reset OTP
                </button>
            }
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Remember your password?{' '}
            <a href="/userLogin" className="text-blue-500 hover:underline">
              Login Here
            </a>
          </p>
        </div>
      </div >
    </>
  );
};

export default ChangePassword;
