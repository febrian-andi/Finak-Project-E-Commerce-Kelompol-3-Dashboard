
// FormOTP.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const FormOTP = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if value is entered
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpString = otp.join('');
      console.log('Verifying OTP:', otpString, 'for email:', email);
      // Here you would make an API call to verify the OTP
      // On success, redirect to reset password page
      navigate('/reset-password');
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium mb-1 text-center sm:text-left">Input OTP</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center sm:text-left">
        We sent you a one-time password (OTP) on the email
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors duration-200"
        >
          Verify OTP
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
        <Link
          to="/login"
          className="text-red-500 hover:text-red-600"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default FormOTP