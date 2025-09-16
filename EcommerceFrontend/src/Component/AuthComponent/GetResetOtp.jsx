import React, { useContext, useState } from 'react';
import NewPassword from './NewPassword';
import { AppContext } from '../../Context/ContextProvider';

const GetResetOtp = () => {
  const { resetEmail } = useContext(AppContext);
  const [resetOtp, setResetOtp] = useState({ resetotp: "" });
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetOtp = (e) => {
    const { name, value } = e.target;
    setResetOtp({ ...resetOtp, [name]: value });
  };

  if (newPassword === true) {
    return <NewPassword />;
  }

  const handleSubmitResetOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/user/verifyResetOtp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, resetotp: resetOtp.resetotp })
      });

      const data = await response.json();
      if (!response.ok) throw data;

      setLoading(false);
      setNewPassword(true);
      return data;
    } catch (error) {
      if (error.message) {
        setNewPasswordError(error.message);
      } else {
        setNewPasswordError("Failed to verify OTP. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Enter Reset OTP
        </h1>

        <p className="text-gray-600 text-center mb-4">
          We sent a reset OTP to <span className="font-medium text-blue-600">{resetEmail}</span>. Please enter it below.
        </p>

        {newPasswordError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {newPasswordError}
          </div>
        )}

        <form onSubmit={handleSubmitResetOtp} className="space-y-5">
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="resetotp"
            value={resetOtp.resetotp}
            onChange={handleResetOtp}
            placeholder="Enter OTP"
            required
          />
          {loading && (!newPasswordError) ?  (<span className="flex items-center justify-center bg-blue-600 py-3 rounded-lg text-white">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing....
          </span>) : <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Submit OTP
          </button>}
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Didn’t receive the OTP?{' '}
          <button onClick={() => window.location.reload()} className="text-blue-500 hover:underline">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default GetResetOtp;
